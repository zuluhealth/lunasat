import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { PORTAL_SESSION_COOKIE } from "@/lib/portal/auth";
import { getPartnerSessionClaims } from "@/lib/portal/session-claims";
import { privateRoute, reportPortalError } from "@/lib/portal/diagnostics";
import { contentSecurityPolicy } from "@/lib/security-headers";

export async function proxy(request: NextRequest) {
  const nonce = crypto.randomBytes(16).toString("base64");
  const csp = contentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  // Next reads this request header and adds the nonce to its generated scripts.
  requestHeaders.set("Content-Security-Policy", csp);
  let response: NextResponse;

  if (request.nextUrl.pathname === "/portal" || request.nextUrl.pathname.startsWith("/portal/")) {
    try {
      // Verify the signed cookie here without opening invitation storage.
      // Each portal page/action performs the full active-invite check on the server.
      const session = getPartnerSessionClaims(request.cookies.get(PORTAL_SESSION_COOKIE)?.value);
      response = session
        ? NextResponse.next({ request: { headers: requestHeaders } })
        : NextResponse.redirect(new URL("/partner-login", request.url));
    } catch (error) {
      const reference = reportPortalError(error, { stage: "proxy", route: privateRoute(request.nextUrl.pathname)! });
      response = new NextResponse(`Partner access is temporarily unavailable.\nReference: ${reference}`, {
        status: 503,
        headers: { "X-Portal-Error-ID": reference, "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  } else {
    response = NextResponse.next({ request: { headers: requestHeaders } });
  }

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Netlify-CDN-Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/portal/:path*", "/partner-login/:path*", "/access/:path*", "/invite/:path*"],
};
