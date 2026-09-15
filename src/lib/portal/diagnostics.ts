import "server-only";

type Stage = "proxy" | "render" | "route" | "action" | "admin-login";
type PrivateRoute = "/portal" | "/portal/*" | "/invite" | "/access" | "/partner-login";

const errorNames = new Set(["Error", "TypeError", "RangeError", "ReferenceError", "SyntaxError",
  "MissingBlobsEnvironmentError", "BlobsConsistencyError", "InvalidBlobsRegionError", "BlobsInternalError"]);
const errorCodes = new Set(["ENOENT", "EACCES", "EPERM", "EROFS", "ENOSPC", "EMFILE",
  "ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "ENOTFOUND", "EAI_AGAIN",
  "UND_ERR_CONNECT_TIMEOUT", "UND_ERR_HEADERS_TIMEOUT", "UND_ERR_SOCKET"]);

// Never record URL queries or dynamic path segments (they may contain an invite).
export function privateRoute(path: string): PrivateRoute | null {
  const pathname = path.split(/[?#]/, 1)[0];
  if (pathname === "/portal") return "/portal";
  if (pathname.startsWith("/portal/")) return "/portal/*";
  for (const route of ["/invite", "/access", "/partner-login"] as const) {
    if (pathname === route || pathname.startsWith(`${route}/`)) return route;
  }
  return null;
}

function field(error: unknown, key: string): unknown {
  try {
    return error && typeof error === "object" ? (error as Record<string, unknown>)[key] : undefined;
  } catch {
    return undefined;
  }
}

export function isExpectedNavigation(error: unknown): boolean {
  const digest = field(error, "digest");
  return typeof digest === "string" &&
    /^(NEXT_REDIRECT|NEXT_HTTP_ERROR_FALLBACK);/.test(digest);
}

function describe(error: unknown) {
  const name = field(error, "name");
  const code = field(error, "code");
  const message = field(error, "message");
  const stack = field(error, "stack");
  let category = "unexpected-server-error";
  if (name === "MissingBlobsEnvironmentError") category = "missing-netlify-blobs-context";
  else if (name === "BlobsInternalError") category = "netlify-blobs-request-failed";
  else if (name === "BlobsConsistencyError" || name === "InvalidBlobsRegionError") category = "invalid-netlify-blobs-configuration";
  else if (name === "SyntaxError") category = "invalid-data-or-syntax";
  else if (typeof code === "string" && errorCodes.has(code)) category = "filesystem-or-network-error";
  else if (typeof message === "string") {
    if (message.includes("[unenv]") && message.includes("not implemented")) category = "unsupported-runtime-operation";
    else if (message === "Storage did not provide a version.") category = "missing-storage-version";
    else if (message === "Security storage is busy; retry the request.") category = "storage-write-conflict";
    else if (message === "Security storage is locked; retry the request.") category = "storage-lock-timeout";
    else if (message === "INVITE_SECRET must have at least 32 characters." ||
      message === "Admin access is not configured." ||
      message === "SITE_ORIGIN must be a trusted HTTPS origin without a path.") category = "invalid-portal-configuration";
  }
  // Keep code locations only: no raw message, function arguments, absolute home
  // paths, error causes, SDK request objects, credentials, or recipient data.
  const frames = typeof stack === "string" ? stack.split("\n").slice(1, 16).flatMap((line) => {
    const match = line.match(/(?:^|\/)((?:src|\.next|\.netlify|node_modules)\/[A-Za-z0-9_./@()[\]-]+\.(?:[cm]?js|tsx?):\d+:\d+)(?:\)|$)/);
    return match && match[1].length <= 240 ? [match[1]] : [];
  }).slice(0, 5) : [];
  return {
    category,
    type: typeof name === "string" && errorNames.has(name) ? name : "UnknownError",
    ...(typeof code === "string" && errorCodes.has(code) ? { code } : {}),
    frames,
  };
}

export function reportPortalError(error: unknown, context: { stage: Stage; route: PrivateRoute }): string {
  const digest = field(error, "digest");
  // Next.js supplies a numeric digest to production error pages. Reuse it for
  // correlation; proxy failures get a fresh ID, never an incoming header value.
  const reference = typeof digest === "string" && /^\d{1,16}$/.test(digest)
    ? digest : globalThis.crypto.randomUUID();
  const errors = [];
  let current = error;
  for (let depth = 0; depth < 3 && current != null; depth++) {
    errors.push(describe(current));
    current = field(current, "cause");
  }
  try {
    console.error("[portal-error] " + JSON.stringify({
      timestamp: new Date().toISOString(), reference, ...context, errors,
    }));
  } catch {
    // An unavailable log sink must not change the access decision.
  }
  return reference;
}
