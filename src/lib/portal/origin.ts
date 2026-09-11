import "server-only";

// Use deployment configuration, never attacker-controlled forwarded/Host headers.
export async function getOrigin(): Promise<string> {
  const configured = process.env.SITE_ORIGIN || process.env.DEPLOY_PRIME_URL || process.env.URL;
  const value = configured || (process.env.NODE_ENV === "production" ? "https://lunasat.com" : "http://localhost:3000");
  const url = new URL(value);
  const local = process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if ((url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
      url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_ORIGIN must be a trusted HTTPS origin without a path.");
  }
  return url.origin;
}
