# Lunasat — Setup & Security Operations

This Next.js application requires a Node server and HTTPS in production.
The public website runs without portal secrets. Deployed partner portals remain
locked until invitation access is configured; they never fall back to public sign-up.

## Install and run

```bash
npm ci
npm run test:security
npm run build
npm start
```

## Required portal configuration

Set these **server-only** variables in the hosting provider or a git-ignored `.env.local`:

- `INVITE_SECRET`: at least 32 characters, generated randomly, for example with
  `openssl rand -base64 48`. Use a different secret for each site.
- `ADMIN_PASSPHRASE`: at least 16 characters; use a unique, randomly generated
  passphrase stored in a password manager.
- `SITE_ORIGIN`: the trusted HTTPS origin used in invitation links, without a
  path, query, or trailing content (for example `https://lunasat.com`).
  Netlify's `DEPLOY_PRIME_URL` or `URL` is used when this is absent; otherwise
  the site's canonical production domain is used. Request headers are never trusted.

Set secrets in Netlify's Functions/runtime scope. Keep secrets out of client
variables, public files, build logs, and static assets. Restart after changes.
Removing either credential or configuring a weak credential locks the portal.

## Access and sessions

Visit `/invite`, sign in, and create an invitation for 7, 14, 30, or 90 days.
Recipients open `/access?token=…` and acknowledge confidentiality before entering.
Links are reusable bearer credentials until expiry or revocation; possession of a
link grants access. They are not single-use links and do not prove email ownership.
Share them privately. No email is sent automatically.

Partner and admin cookies are signed, HttpOnly, SameSite=Lax, Secure in production,
and expire server-side after seven days. Partner cookies contain an invite ID and
NDA timestamp; identity is loaded from the server ledger. Revocation and invite
expiry are checked on each portal request, including client navigation requests.
Already delivered content cannot be recalled from a recipient's browser.

The proxy performs a storage-free signed-cookie check. The application server
checks the current invitation on every portal page and protected action before
returning private data, including expiry and revocation. Netlify runs the proxy
separately from that server, so the proxy must not read invitation storage.

Deploying this security update signs out existing users and administrators.
Existing invite links remain usable if their ledger entry is active and the
signing secret remains unchanged. Rotating `INVITE_SECRET` invalidates all links
and sessions. Changing `ADMIN_PASSPHRASE` invalidates existing admin sessions.

Admin sign-in accepts at most 10 attempts per 15-minute window across all clients
and server instances. This protects the shared administrator account; a burst of
failed attempts can temporarily prevent its owner from signing in too. Put the
site behind a trusted reverse proxy with request-size, connection, and IP rate
limits for additional traffic protection.

## Development preview

For local development only, set `NODE_ENV=development`, `PORTAL_PREVIEW_MODE=true`,
and a random `INVITE_SECRET` of at least 32 characters. Leave `ADMIN_PASSPHRASE`
unset. Run `npm run dev`. This opens the name/email/NDA preview gate.
The same setting is ignored by production builds, including deployed previews.
Use real invitations for deployed previews.

## Persistent security storage

On Netlify, the `invites` Blobs store retains the existing `ledger` key. Writes use
strong reads and conditional versions so concurrent requests cannot restore a
revoked invite from an old copy. The `admin-login` key stores the login budget.

On a Node server, preserve the git-ignored `var/` directory across deployments.
It contains `invites.json` and `admin-login.json`. Files use restrictive permissions,
exclusive write locks, and atomic replacement. All processes must share this same
persistent directory. Do not use ephemeral function filesystems or independent
per-instance directories for security state. Storage errors deny access.

If the Node process is killed during a write, a `*.json.lock` file may remain.
Stop all instances, confirm no writer is active, remove only the stale lock file,
and restart. Never remove a lock while another process can be writing. Keep
backups of the ledger and do not discard corrupt storage to recover service.

## Browser and deployment protections

Sensitive routes use a nonce-based script CSP, no-store directives for browsers
and CDNs, no-referrer, and noindex. Public static pages allow Next.js inline
hydration scripts; they still restrict script origins, disallow inline event
handlers, objects, framing, and cross-origin form submissions. Inline styles are
allowed for the existing animation libraries. HTTPS responses include HSTS.
The Next.js version includes the August 2026 security fixes; AST also disables
AVIF output explicitly.

Keep confidential files out of `public/`; that directory is always public.
Portal data modules are marked server-only. Any future file-download or data
endpoint must perform its own `requirePartnerSession()` check.

CI runs security regression tests, an audit that rejects high/critical dependency
advisories, and a production build. Dependabot merges are bound to the exact
commit that passed CI. Continue reviewing updates and rerunning audits.

Before launch, deploy the changes, configure the runtime variables and durable
storage, verify HTTPS/security headers on the actual host, and test one invite
through acceptance, navigation, and revocation. Local validation does not verify
the hosting account, CDN configuration, backups, or production secrets.

## Diagnosing private-access failures

Unexpected proxy failures return HTTP 503 and a safe `Reference` on the page
(and in the `X-Portal-Error-ID` response header). The matching server-side line
starts with `[portal-error]`. Unhandled private-page, route and server-action
failures are logged through `src/instrumentation.ts`; when Next.js supplies a
production error digest, the log uses that digest as its reference. Storage
failures that refuse administrator sign-in are logged with stage `admin-login`.

No new environment variable or external logging service is needed. Redeploy the
source changes to enable these logs. In Netlify, select the affected site and
production deployment, then open its Functions logs for application errors or
Edge Functions logs for proxy errors. Search for `[portal-error]` or the page's
reference, with a time range covering the failure and the correct timezone.
Log delivery can lag behind the request; refresh if the entry is not visible yet.
Capture the full structured error line, site/domain, deployment ID and timestamp.
Execution duration and memory entries alone do not contain the application error.

The record includes UTC time, reference, route group, execution stage, error
category/type, known OS/network codes, and available code locations. For example,
`missing-netlify-blobs-context` indicates missing storage runtime configuration;
`unsupported-runtime-operation` indicates an unavailable runtime API; and
`invalid-data-or-syntax` identifies a parsing/syntax failure. Up to three nested
causes are classified. Unknown errors retain their safe type and code locations;
the log may still require investigation rather than identify an exact root cause.

These structured records deliberately omit raw exception messages, request
headers/bodies, query strings, invitation tokens, credentials and recipient data.
Code locations omit absolute user-directory prefixes. Ordinary rejected, expired
and revoked sessions are access decisions, not application errors. A logging
failure does not grant access. This covers application failures reached by the
running code; startup failures or platform outages require Netlify platform logs.
Log retention follows the site's Netlify plan, so capture a report promptly.
