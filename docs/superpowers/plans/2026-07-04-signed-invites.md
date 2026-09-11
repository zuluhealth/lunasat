# Signed Invite Links + Revocable Ledger — Implementation Plan

Applies IDENTICALLY to both repos (lunasat, al-saad-telecom), adjusted only for each site's visual conventions. No new npm dependencies (node:crypto + fs only).

**Goal:** Single-recipient, expiring, individually revocable magic links with a passphrase-protected admin page, self-contained on the client's own Node server. Preview-mode form remains when the feature is unconfigured.

## Mode switch

`inviteModeEnabled()` = both `process.env.INVITE_SECRET` and `process.env.ADMIN_PASSPHRASE` are non-empty. When disabled: everything behaves exactly as today (preview form). When enabled: preview form hidden; entry ONLY via valid invite link; portal sessions without a valid inviteId are signed out.

## New module: `src/lib/portal/invites.ts` (server-only; Node runtime)

```ts
export interface Invite {
  id: string;            // 10-char base64url random
  name: string;
  email: string;
  organization?: string;
  createdAt: string;     // ISO
  expiresAt: string;     // ISO
  status: "active" | "revoked";
  opens: number;
  lastOpenedAt?: string;
}
```

- Ledger file: `path.join(process.cwd(), "var", "invites.json")` — array of Invite; create dir/file lazily; read+write synchronously per operation (tiny file, no cache).
- `inviteModeEnabled(): boolean`
- `createInvite(input: {name; email; organization?; days: number}): Invite` (crypto.randomBytes id)
- `listInvites(): Invite[]` (newest first)
- `revokeInvite(id): void` / `reactivateInvite(id): void`
- `recordOpen(id): void` (opens++, lastOpenedAt=now)
- `getActiveInvite(id): Invite | null` — exists && status==="active" && expiresAt > now
- Token: `makeToken(id)` → `${id}.${base64url(HMAC_SHA256(INVITE_SECRET, id))}`; `verifyToken(token): string | null` — constant-time compare (`crypto.timingSafeEqual`), returns id or null.
- `makeInviteUrl(id, origin)` → `${origin}/access?token=${makeToken(id)}`
- Admin cookie helpers: cookie `portal_admin` value `makeToken("admin-session")`; `isAdminAuthed()` verifies it; passphrase check via timingSafeEqual against ADMIN_PASSPHRASE.

## Session shape

Add `inviteId?: string` to `PartnerSession` (types.ts), write it in the new accept action, parse it in session.ts.

## Route: `/access` (`src/app/access/page.tsx` + scss + `AcceptForm.tsx` client)

- Server page reads `searchParams.token`; `verifyToken` + `getActiveInvite`.
- Invalid/expired/revoked → render "LINK NO LONGER VALID" state: mono strip, one paragraph ("This access link has expired or been withdrawn. Contact your <Company> counterpart."), GET IN TOUCH link. HTTP 200 page, `robots noindex`.
- Valid → NDA acceptance screen: greets recipient by name, shows email (read-only text, NOT editable), the exact NDA checkbox label already used on partner-login, button `[ ENTER THE BRIEFING ROOM → ]`.
- `AcceptForm` posts server action `acceptInvite(prev, formData)` with hidden `token` field: re-verify token+active, require ndaAccepted==="on", set portal_session cookie {email, fullName: invite.name, organizationName: invite.organization, inviteId: invite.id, ndaAcceptedAt: now, authenticated: true} (same cookie options as enterPortal), `recordOpen(id)`, redirect `/portal`. Error strings match existing style.

## Route: `/invite` (admin; `src/app/invite/page.tsx` + scss + client components)

- `robots: noindex`. If `!inviteModeEnabled()` → render "INVITE MODE NOT CONFIGURED" note (list required env vars). 
- If not admin-authed → passphrase form → server action `adminLogin` (timingSafeEqual; on success set `portal_admin` httpOnly cookie, maxAge 7d, then refresh).
- Authed view: (a) create form — name*, email*, organization, validity select (7/14/30/90 days) → server action `createInviteAction` → on success show the new link in a read-only input with a copy button (client component using navigator.clipboard, label `[ COPY LINK ]` → `[ COPIED ]`); (b) table of invites: name, email, expiry date, status chip, opens count, lastOpenedAt, per-row `[ COPY LINK ]` + `[ REVOKE ]` (or `[ REACTIVATE ]` when revoked) buttons via server actions; (c) `[ SIGN OUT ]` clearing the admin cookie. Origin for links: derive from request headers (`headers().get("host")` + proto) — implement `getOrigin()` in the page via `headers()`.
- Styling: match the site's dark mono idiom (lunasat: portal exemplar; AST: its conventions).

## Enforcement changes

1. `partner-login/page.tsx`: when `inviteModeEnabled()` → render invitation-only copy + GET IN TOUCH only (no AccessForm, no divider). Else unchanged.
2. `src/app/portal/layout.tsx`: after `requirePartnerSession()`, if `inviteModeEnabled()`: session must have `inviteId` AND `getActiveInvite(inviteId)` must return non-null; otherwise delete the session cookie and `redirect("/partner-login")`. (Layout is Node runtime; middleware untouched.)

## Docs

`SETUP.md` at each repo root: run with Node (`npm install && npm run build && npm start`); to enable invite links create `.env` with `INVITE_SECRET=<long random string>` and `ADMIN_PASSPHRASE=<passphrase>`; admin page at `/invite`; keep `var/invites.json` across updates; without the env vars the site runs in open preview mode. Add `var/` to `.gitignore`.

## Verification contract

`npx tsc --noEmit` clean. No `next build`/`dev` (controller does E2E: with `.env.local` set → create invite via /invite, open link, NDA, land in portal, revoke, confirm kick + link dies; then remove `.env.local`, confirm preview form returns).

## Constraints

Dark mono visual idiom per site; verbatim NDA label reuse; no invented copy beyond specified strings; commit only your own files; co-author trailer; work on `main` (both repos are on main now, merged and pushed).
