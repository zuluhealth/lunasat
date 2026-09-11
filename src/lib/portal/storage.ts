import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";

function netlify(): boolean {
  return process.env.NETLIFY === "true" || Boolean(process.env.NETLIFY_BLOBS_CONTEXT);
}

function filePath(key: string): string {
  if (!/^[a-z-]+$/.test(key)) throw new Error("Invalid storage key.");
  return path.join(process.cwd(), "var", `${key === "ledger" ? "invites" : key}.json`);
}

async function readFile<T>(file: string, initial: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(initial);
    throw error; // Never silently overwrite corrupt or unreadable security data.
  }
}

export async function readStored<T>(key: string, initial: T): Promise<T> {
  if (netlify()) {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: "invites", consistency: "strong" });
    return (await store.get(key, { type: "json" })) ?? structuredClone(initial);
  }
  return readFile(filePath(key), initial);
}

export async function updateStored<T, R>(key: string, initial: T, update: (value: T) => R): Promise<R> {
  if (netlify()) {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: "invites", consistency: "strong" });
    for (let attempt = 0; attempt < 20; attempt++) {
      const current = await store.getWithMetadata(key, { type: "json" });
      if (current && !current.etag) throw new Error("Storage did not provide a version.");
      const value = current?.data ?? structuredClone(initial);
      const result = update(value);
      const write = await store.setJSON(key, value, current ? { onlyIfMatch: current.etag! } : { onlyIfNew: true });
      if (write.modified) return result;
      await delay(10 + Math.random() * 40);
    }
    throw new Error("Security storage is busy; retry the request.");
  }

  const file = filePath(key);
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const lockPath = `${file}.lock`;
  let lock;
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      lock = await fs.open(lockPath, "wx", 0o600);
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      await delay(20);
    }
  }
  if (!lock) throw new Error("Security storage is locked; retry the request.");
  const temp = `${file}.${crypto.randomUUID()}.tmp`;
  try {
    const value = await readFile(file, initial);
    const result = update(value);
    await fs.writeFile(temp, JSON.stringify(value, null, 2), { mode: 0o600 });
    await fs.rename(temp, file);
    return result;
  } finally {
    await fs.rm(temp, { force: true });
    await lock.close();
    await fs.unlink(lockPath);
  }
}
