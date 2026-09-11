# Partner Portal v2 — Design (Lunasat + Al Saad Telecom)

Date: 2026-07-04
Status: Approved autonomously (user explicitly delegated all decisions; unavailable for questions)
Source of truth: Tarek's updated Tier-1/Tier-2 spec (pasted 2026-07-04) + existing `ma/feat/log-in-logo` branch code in both repos.

## Goal

Restructure the Lunasat gated partner portal into Tarek's new Tier-1 information
architecture (13 sections), upgrade the access gate to capture name/email + NDA
acknowledgment, and switch technology-partner displays from text names to logos on
**both** websites (Lunasat + Al Saad Telecom). Deliverable: working dev previews.

## Context (what exists on the branch)

- Both repos are Next.js (App Router, SCSS modules), dark defense-tech aesthetic,
  and share the same portal pattern: `middleware.ts` gates `/portal/*` on a
  `portal_session` cookie; `partner-login` page has a demo-mode button
  (`enterDemoPortal`) that sets a hardcoded session; production intent (comment
  only) is Supabase single-use magic links.
- Lunasat portal: hub + 4 capability pages + experience + services + compliance +
  documents. Nav is data-driven (`src/lib/portal/nav.ts` → `PortalShell` sidebar).
- Lunasat `src/data/portal/vendors.ts` references `/vendors/*.svg` files that do
  not exist; no component renders vendor logos (text only).
- AST portal: hub + 2 domains + experience + training + documents. 8 vendors in
  `src/data/portal/vendors.ts` with placeholder logo paths; `PartnerProductCard`
  ignores the `logo` field and renders text initials.
- Real logo PNGs exist in both repos: leidos, microchip, teledyne,
  rs-authorized-distributor (`public/images/partners/`).
- Downloaded official SVGs (Wikimedia): Cisco, Nokia, Rohde & Schwarz.
  Not available: FLIR, Frequentis, Genasys, L3Harris → craft white wordmark SVG
  placeholders; user swaps in official files later.

## Decisions

1. **Scope split.** Lunasat gets the full Tier-1 restructure (the spec is
   Lunasat-specific). AST gets: logo rendering in portal vendor cards, fixed
   vendor logo paths, and the same upgraded access gate (its portal was built in
   lockstep). AST's section structure stays as-is.
2. **Access gate (both sites).** Replace the bare demo button with an identity
   gate on `partner-login`: full name (required), work email (required),
   organization (optional), NDA-acknowledge checkbox (required, light
   confidentiality wording). Server action validates, stores
   `{email, fullName, organizationName, ndaAcceptedAt, authenticated}` in the
   existing `portal_session` cookie, redirects to `/portal`. Invitation-only /
   magic-link messaging stays; real magic-link infra remains a user TODO.
   Middleware unchanged (cookie presence).
3. **Lunasat Tier-1 IA** (sidebar numbered 00–12, briefing-room style):
   - 00 Hub `/portal` — dark cover: wordmark, one line of positioning, cards
     linking to every section below.
   - 01 Overview `/portal/overview` — local-partner thesis (certified
     integrator, 30+ yrs, 90% engineers, leads with different vendors in
     different countries; "your regional channel, not a vendor").
   - 02 Why Partner `/portal/why-lunasat` — de-risk market entry: in-country FSR
     since 2007, government relationships, 10+ Centers of Excellence, Level 3+
     local maintenance, ITAR/FCPA/UKBA/TRACE, emergency delivery in active
     environments. Message: "you don't build a region, you plug into one that
     already exists."
   - 03 Capabilities — keep existing 4 domain pages. No fifth domain. Fold
     spectrum into Telecom as a "Spectrum Monitoring & Management" layer.
   - 04 Proven Delivery `/portal/proven-delivery` — stat wall (57,000+ radios,
     6,000+ VSAT, 2,000+ microwave links, 200+ projects, 5,800+ trained) +
     in-country depth column.
   - 05 Programs `/portal/programs` — six anonymized clusters (Communications &
     C2 · Special Operations & Tactical · Infrastructure & Sustainment ·
     Government & Critical Infrastructure · Security & Surveillance · Tactical
     Integration & Training), 2–3 cards each, **curated from existing
     case-study/program data only** (no new invented programs).
   - 06 Regional & Sector Footprint `/portal/footprint` — Iraq 20+ yrs, Lebanon
     decade+, sector split (armed forces / interior & border / critical
     infrastructure). No client names in Tier 1.
   - 07 Technology Partners `/portal/technology-partners` — logo grid + the
     domain(s) each OEM covers ("you'd be in good company" framing, not "who we
     did what for"). Vendors: Rohde & Schwarz, Cisco, FLIR, Genasys, Nokia,
     Frequentis, Leidos, Microchip, Teledyne.
   - 08 Compliance & Governance `/portal/compliance` — rework: ITAR / FCPA /
     UKBA / TRACE + export-control posture get top billing; ISO certs and vendor
     authorizations below.
   - 09 Support & Sustainment `/portal/support-sustainment` — lifecycle model
     design → supply → install → train → maintain; 24/7; forward-deployed FSR;
     in-country test benches. Replaces `/portal/services` (route removed from
     nav; old content folded in).
   - 10 Solutions by Sector `/portal/sectors` — Airports page built as the
     template (`/portal/sectors/airports`); Ports / Borders / Energy / Telecom
     as "in production" stub cards. Airport deck content unavailable → structure
     with clearly-sourced capability content, flagged for user.
   - 11 Document Library `/portal/documents` — keep; reframe with per-recipient
     watermark notice and category set (company profile, sector line cards,
     capability statements, compliance one-pager). Files remain placeholders.
   - 12 Become a Partner `/portal/become-a-partner` — routed intake form
     (domain, country, principal, message) via server action; logs the inquiry
     server-side; real CRM routing is a user TODO.
   - Tier 2 `/portal/deal-rooms` — locked page: per-relationship rooms, named
     logins, provisioned individually. Nav entry marked as restricted.
4. **Logos instead of names.**
   - Normalize all vendor logos into `public/images/partners/` in both repos
     (SVGs recolored/rendered white via CSS `filter` on dark backgrounds).
   - Lunasat: fix `vendors.ts` paths; new Technology Partners page renders
     logos; capability pages may reference vendors by logo chip.
   - AST: `PartnerProductCard` renders the logo image (initials fallback only if
     the file is absent); fix the 4 placeholder paths (Nokia, FLIR, Genasys,
     L3Harris) to real/crafted assets.
5. **Content discipline.** All Tier-1 copy comes from Tarek's message or data
   already in the repos. Numbers from the spec win over stale site copy (e.g.,
   30+ yrs vs 25+). Public-site copy is out of scope except logos.
6. **Verification.** No test infra exists in either repo and none is added
   (content-site scope). Verification = `next build` passing in both repos +
   full visual QA of every portal section via the dev preview (screenshots +
   DOM inspection), including the logo rendering audit.

## Error handling

- Login action: inline field errors (missing name/email/NDA) returned via form
  state; no throw. Email format sanity-checked.
- Intake action: same pattern; success state shown in place.
- Missing logo file: card falls back to text name (never a broken image).

## Out of scope (goes to the user TODO list)

Real magic-link auth (Supabase + email), per-recipient PDF watermarking, real
document files, Tier-2 rooms (named-login auth, deployment photos, co-branded
decks, pipeline/pricing), airport deck content, official brand SVGs for FLIR /
Frequentis / Genasys / L3Harris, production deployment.
