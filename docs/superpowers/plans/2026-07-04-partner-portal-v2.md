# Partner Portal v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Lunasat gated portal into Tarek's 13-section Tier-1 spec, add a name/email + NDA access gate on both sites, and render technology partners as logos (not names) on both sites.

**Architecture:** Two independent Next.js App Router repos (`lunasat`, `al-saad-telecom`) on branch `ma/feat/log-in-logo`. Portal pages are server components wrapped by `PortalShell` (data-driven sidebar from `src/lib/portal/nav.ts`); the gate is a `portal_session` cookie checked by `middleware.ts`. All new pages follow the existing SCSS-module + `TextReveal` defense-tech idiom.

**Tech Stack:** Next.js 16 / React 19 (`useActionState` for forms), TypeScript, SCSS modules, no new dependencies.

## Global Constraints

- Copy source of truth: Tarek's spec quoted in `docs/superpowers/specs/2026-07-04-partner-portal-v2-design.md`. No invented clients, metrics, or programs; anonymized wording only in Tier 1.
- Spec numbers win: 30+ years, 90% engineers, FSR since 2007, 10+ Centers of Excellence, Level 3+ maintenance, 57,000+ radios, 6,000+ VSAT, 2,000+ microwave links, 200+ projects, 5,800+ personnel trained, Iraq 20+ years, Lebanon a decade+, ITAR · FCPA · UKBA · TRACE.
- Visual idiom: dark (#0a0a0a) backgrounds, mono-style labels with `//` and `[ ]` markers, `TextReveal` on headings, SCSS variables from `src/styles/_variables.scss`. Match existing portal pages' look (read `src/app/portal/compliance/page.tsx` + `.module.scss` as the exemplar before writing any page).
- Logos on dark backgrounds: `<img>` with CSS `filter: brightness(0) invert(1); opacity: 0.85;` — never a broken image; fall back to a text span with the vendor name if no logo path.
- No new npm packages. Do not touch `src/middleware.ts`. Do not run `next dev` or `next build` (integration phase does); verify types with `npx tsc --noEmit`.
- Each task commits only its own files with a focused message ending in the Claude co-author trailer.
- Repo roots: `/Users/mateo_akel/Documents/ventneuf/repositories/tarek-website/lunasat` and `/Users/mateo_akel/Documents/ventneuf/repositories/tarek-website/al-saad-telecom`.

---

### Task 1: Logo assets in both repos

**Files:**
- Create (in BOTH repos): `public/images/partners/cisco.svg`, `nokia.svg`, `rohde-schwarz.svg`, `flir.svg`, `frequentis.svg`, `genasys.svg`, `l3harris.svg`
- Source (downloaded, valid SVGs): `/private/tmp/claude-501/-Users-mateo-akel-Documents-ventneuf-repositories-tarek-website/6141ed0d-b105-49c2-a0b2-276340d71e37/scratchpad/logos/{cisco,nokia,rohde-schwarz}.svg`

**Interfaces:**
- Produces: logo files at `/images/partners/<id>.svg` for ids `cisco`, `nokia`, `rohde-schwarz`, `flir`, `frequentis`, `genasys`, `l3harris`; existing `leidos.png`, `microchip.png`, `teledyne.png`, `rs-authorized-distributor.png` stay.

- [ ] **Step 1: Copy downloaded SVGs into both repos' `public/images/partners/`.**
- [ ] **Step 2: Craft the 4 missing wordmarks** with this template (adjust text + width; fill `#F2F2F2`; font stack `'Arial Black', 'Helvetica Neue', Arial, sans-serif`; weight 900; letter-spacing wide):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 48" role="img" aria-label="FLIR">
  <text x="0" y="36" font-family="'Arial Black','Helvetica Neue',Arial,sans-serif" font-size="34" font-weight="900" letter-spacing="6" fill="#F2F2F2">FLIR</text>
</svg>
```
Wordmark texts: `FLIR` (viewBox width 130), `FREQUENTIS` (300), `GENASYS` (240), `L3HARRIS` (250).
- [ ] **Step 3: Verify** every file starts with `<svg` or `<?xml`: `head -c 60 public/images/partners/*.svg`.
- [ ] **Step 4: Commit in each repo:** `git add public/images/partners && git commit -m "Add partner logo assets (Cisco, Nokia, R&S official; FLIR, Frequentis, Genasys, L3Harris wordmark placeholders)"`.

### Task 2: Lunasat shared scaffolding (types, actions, nav, shell)

**Files (lunasat):**
- Modify: `src/lib/portal/types.ts`, `src/lib/portal/actions.ts`, `src/lib/portal/nav.ts`, `src/components/portal/PortalShell/PortalShell.tsx` (+ `.module.scss`)

**Interfaces:**
- Produces (consumed by Tasks 3–11):

```ts
// types.ts — extend PartnerSession
export interface PartnerSession {
  email: string;
  fullName?: string;
  organizationName?: string;
  ndaAcceptedAt?: string; // ISO timestamp
  authenticated: boolean;
}

// actions.ts
export interface AccessFormState { error?: string }
export async function enterPortal(prevState: AccessFormState, formData: FormData): Promise<AccessFormState>
// reads formData: "fullName", "email", "organization", "ndaAccepted"
// errors: "Full name is required." / "A valid work email is required." (regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/) / "You must acknowledge the confidentiality terms." (ndaAccepted !== "on")
// success: cookie payload {email, fullName, organizationName?, ndaAcceptedAt: new Date().toISOString(), authenticated:true}, same cookie options as today, then redirect("/portal")

export interface InquiryFormState { ok?: boolean; error?: string }
export async function submitPartnerInquiry(prevState: InquiryFormState, formData: FormData): Promise<InquiryFormState>
// reads: "fullName","email","organization","domain","country","principal","message"
// validate fullName/email as above; on success console.log("[partner-inquiry]", JSON.stringify({...all fields, at: new Date().toISOString()})) and return { ok: true }

// nav.ts
export interface NavItem { label: string; href: string; index?: string; badge?: string }
export interface NavGroup { label: string; items: NavItem[] }
```

- Keep `enterDemoPortal` deleted — Task 3 replaces its only call site. Keep `signOut` unchanged.
- New `portalNav` exactly:

```ts
export const portalNav: NavGroup[] = [
  { label: "Briefing", items: [
    { index: "00", label: "Hub", href: "/portal" },
    { index: "01", label: "Overview", href: "/portal/overview" },
    { index: "02", label: "Why Lunasat", href: "/portal/why-lunasat" },
  ]},
  { label: "Capabilities", items: [
    { index: "03", label: "Secured Communications", href: "/portal/capabilities/secured-communications" },
    { index: "03", label: "Security & Surveillance", href: "/portal/capabilities/security-surveillance" },
    { index: "03", label: "Telecommunications", href: "/portal/capabilities/telecommunications" },
    { index: "03", label: "Airspace & Control", href: "/portal/capabilities/airspace-control" },
  ]},
  { label: "Proof", items: [
    { index: "04", label: "Proven Delivery", href: "/portal/proven-delivery" },
    { index: "05", label: "Programs", href: "/portal/programs" },
    { index: "06", label: "Regional Footprint", href: "/portal/footprint" },
    { index: "07", label: "Technology Partners", href: "/portal/technology-partners" },
  ]},
  { label: "Operations", items: [
    { index: "08", label: "Compliance & Governance", href: "/portal/compliance" },
    { index: "09", label: "Support & Sustainment", href: "/portal/support-sustainment" },
    { index: "10", label: "Solutions by Sector", href: "/portal/sectors" },
  ]},
  { label: "Resources", items: [
    { index: "11", label: "Document Library", href: "/portal/documents" },
    { index: "12", label: "Become a Partner", href: "/portal/become-a-partner" },
  ]},
  { label: "Tier 2", items: [
    { label: "Deal Rooms", href: "/portal/deal-rooms", badge: "PROVISIONED" },
  ]},
];
```

- [ ] **Step 1:** Apply types/actions/nav changes above.
- [ ] **Step 2:** In `PortalShell.tsx` nav rendering, before the label render, show `item.index` in a muted mono span (new class `navIndex`), and after the label render show `item.badge` in a small bordered chip (new class `navBadge`) when present. Add both classes to `PortalShell.module.scss` (11px, `$color-text-secondary`; badge: 1px solid `$color-border`, padding 1px 6px, letter-spacing 1px).
- [ ] **Step 3:** `npx tsc --noEmit` — expect only errors in `partner-login/page.tsx` (references removed `enterDemoPortal`; Task 3 fixes). Anything else must be fixed now.
- [ ] **Step 4:** Commit: `"Extend portal session, add access/inquiry actions, new 13-section nav"`.

### Task 3: Lunasat access gate (partner-login)

**Files (lunasat):**
- Modify: `src/app/partner-login/page.tsx`, `src/app/partner-login/page.module.scss`
- Create: `src/app/partner-login/AccessForm.tsx` (client component)

**Interfaces:**
- Consumes: `enterPortal`, `AccessFormState` from `@/lib/portal/actions`.

- [ ] **Step 1:** Build `AccessForm.tsx`: `"use client"`, `const [state, formAction, pending] = useActionState(enterPortal, {})`. Fields (styled to match existing minimal-outline inputs): `fullName` (text, label `FULL NAME *`), `email` (email, label `WORK EMAIL *`), `organization` (text, label `ORGANIZATION`), checkbox `ndaAccepted` with label: *"I acknowledge that Tier-1 portal content is confidential, shared for partner evaluation only, and not for redistribution."* Submit button `[ ENTER THE BRIEFING ROOM → ]` (disabled while pending). Render `state.error` in a red-tinted mono error line (`#ff6b6b`).
- [ ] **Step 2:** Rework `page.tsx`: keep `RESTRICTED // PARTNER ACCESS` strip and invitation copy ("Partners receive a single-use sign-in link by email… no public sign-up"), then a divider labeled `IDENTIFY YOURSELF`, then `<AccessForm />`, replacing the whole DEMO MODE block. Keep the Get-in-Touch link below the form.
- [ ] **Step 3:** `npx tsc --noEmit` — expect clean.
- [ ] **Step 4:** Commit: `"Gate portal entry behind name/email capture + NDA acknowledgment"`.

### Task 4: Lunasat hub rework (`/portal`)

**Files (lunasat):** Modify `src/app/portal/page.tsx`, `src/app/portal/page.module.scss`.

**Interfaces:** Consumes `portalNav` from `@/lib/portal/nav` (render cards from it — single source of truth), `requirePartnerSession`.

- [ ] **Step 1:** Rebuild the hub as the "briefing room" cover: keep session strip; hero = Lunasat wordmark SVG (reuse the inline SVG from `PortalShell.tsx`) + one line of positioning: *"Your regional channel into Iraq, Lebanon and the wider region — a certified integrator you plug into, not a market you build."* Below: card grid generated from `portalNav` (skip the Hub item itself): each card shows `index`, group label as eyebrow, item label, and a one-line summary from a local `Record<string, string>` keyed by href (write a one-sentence summary per section from the spec bullets; e.g. `/portal/overview`: "What a principal gets by appointing Lunasat as its regional channel."). Deal Rooms card shows a `[ TIER 2 // PROVISIONED PER RELATIONSHIP ]` chip instead of `[ ENTER → ]`.
- [ ] **Step 2:** Show the visitor's NDA state in the session strip when `session.ndaAcceptedAt` exists: `NDA ACK: <date>`.
- [ ] **Step 3:** `npx tsc --noEmit`; commit `"Rebuild portal hub as briefing-room cover with full section grid"`.

### Task 5: Overview + Why Lunasat pages

**Files (lunasat):** Create `src/app/portal/overview/page.tsx` + `page.module.scss`, `src/app/portal/why-lunasat/page.tsx` + `page.module.scss`.

- [ ] **Step 1 — Overview (`01`):** header "The local-partner thesis" + spec copy: Lunasat framed **as your regional channel, not a vendor**; certified integrator; 30+ years; 90% engineers; leads with different vendors in different countries; plain statement of what a principal gets by appointing Lunasat. Structure: PillarHeader-style header, 2-col prose block, 4 fact tiles (30+ YRS · 90% ENGINEERS · CERTIFIED INTEGRATOR · MULTI-VENDOR BY DESIGN).
- [ ] **Step 2 — Why Lunasat (`02`):** header "Why partner with Lunasat" framed at the principal: de-risking market entry. Six proof blocks: In-country FSR since 2007 · Government relationships · 10+ Centers of Excellence · Level 3+ local maintenance · ITAR / FCPA / UKBA / TRACE compliance · Emergency delivery in active environments. Closing banner: *"You don't build a region. You plug into one that already exists."*
- [ ] **Step 3:** `npx tsc --noEmit`; commit `"Add Overview and Why Lunasat briefing pages"`.

### Task 6: Proven Delivery + Regional Footprint pages

**Files (lunasat):** Create `src/app/portal/proven-delivery/page.tsx` + `.module.scss`, `src/app/portal/footprint/page.tsx` + `.module.scss`.

- [ ] **Step 1 — Proven Delivery (`04`):** stat wall (large mono numerals): 57,000+ radios delivered · 6,000+ VSAT terminals · 2,000+ microwave links · 200+ projects delivered · 5,800+ personnel trained. Beside it an "in-country depth" column: forward-deployed FSR teams, in-country test benches, Level 3+ maintenance, 24/7 support posture.
- [ ] **Step 2 — Footprint (`06`):** Iraq 20+ years · Lebanon a decade+ (two large region blocks), then sector split as three columns: Armed Forces / Interior & Border Security / Critical Infrastructure. Explicit note: client names are disclosed in Tier-2 deal rooms only.
- [ ] **Step 3:** `npx tsc --noEmit`; commit `"Add Proven Delivery stat wall and Regional & Sector Footprint pages"`.

### Task 7: Programs page (six clusters)

**Files (lunasat):** Create `src/data/portal/programs.ts`, `src/app/portal/programs/page.tsx` + `.module.scss`.

**Interfaces:**

```ts
// programs.ts
export interface ProgramCluster {
  id: string; title: string; summary: string;
  cards: { title: string; scope: string; stack: string }[]; // 2–3 cards per cluster
}
export const programClusters: ProgramCluster[]; // exactly 6, in spec order
```

- [ ] **Step 1:** Build `programs.ts` by CURATING existing material only — `src/data/portal/case-studies.ts` and the `caseStudies` arrays inside `src/data/portal/capabilities.ts`. Cluster order/titles exactly: Communications & C2 · Special Operations & Tactical · Infrastructure & Sustainment · Government & Critical Infrastructure · Security & Surveillance · Tactical Integration & Training. Suggested mapping (adjust only if the source text clearly fits better elsewhere): C2 ← "Tactical Brigade Communications Refresh", "Government Secure Network", "Multi-Site SD-WAN Backbone…"; SpecOps/Tactical ← "Tactical Brigade Communications", "Public Safety Mission-Critical"; Infra & Sustainment ← "Long-Haul Microwave Backbone…", "Enterprise SD-WAN Backbone", "Private 5G for Industrial Site"; Gov & CI ← "Perimeter Protection for a National Energy Operator", "Government Campus Protection", "Citywide Mass Notification…"; Security & Surveillance ← "Critical Infrastructure Perimeter", "Port & Coastal Surveillance", "Private 5G for Container Port Operations"; Integration & Training ← "Military Air Traffic Services Modernization", "En-Route Control Center", "Tower Modernization". `scope`/`stack` come from the source entries (shorten, don't embellish).
- [ ] **Step 2:** Page (`05`): intro line "Six program clusters, anonymized — proof, not a data dump."; render clusters as sections with 2–3 `CaseStudyCard`-style cards (reuse `src/components/portal/CaseStudyCard` if its props fit, else local card markup).
- [ ] **Step 3:** `npx tsc --noEmit`; commit `"Add Programs page: six anonymized clusters curated from existing case studies"`.

### Task 8: Technology Partners page + vendors data fix

**Files (lunasat):** Modify `src/data/portal/vendors.ts`; Create `src/app/portal/technology-partners/page.tsx` + `.module.scss`.

**Interfaces:** `PartnerVendor` keeps shape; `logo` paths become real files from Task 1.

- [ ] **Step 1:** In `vendors.ts`: fix logos → `/images/partners/rohde-schwarz.svg`, `/images/partners/cisco.svg`, `/images/partners/flir.svg`, `/images/partners/genasys.svg`, `/images/partners/nokia.svg`, `/images/partners/frequentis.svg`. Append three entries with public-site partners: Leidos (`/images/partners/leidos.png`, domains: Secured Communications), Microchip (`/images/partners/microchip.png`, Telecommunications), Teledyne (`/images/partners/teledyne.png`, Security & Surveillance) — blurbs one factual sentence each, `applicableTo` scope: "MENA region: partner ecosystem member." (keep it thin; no invented authorizations).
- [ ] **Step 2:** Page (`07`): framing line *"You'd be in good company."* + grid of vendor cards: white-filtered logo (the Global Constraints CSS), vendor name under it in small mono, and domain chips derived from `applicableTo` capability slugs (map slug → short label). Present ecosystem membership only — NO client/deployment claims.
- [ ] **Step 3:** `npx tsc --noEmit`; commit `"Render technology partners as logo grid with domain coverage"`.

### Task 9: Compliance rework + Support & Sustainment

**Files (lunasat):** Modify `src/app/portal/compliance/page.tsx` + `.module.scss`; Create `src/app/portal/support-sustainment/page.tsx` + `.module.scss`; Delete `src/app/portal/services/` (route replaced; its 3 content blocks fold into the new page).

- [ ] **Step 1 — Compliance (`08`):** top section becomes governance-first: four large tiles ITAR · FCPA · UKBA · TRACE with one-line explanations (trade/export controls, anti-bribery US/UK, TRACE due-diligence membership) + an "export-control posture" paragraph: Lunasat operates under principal export-control regimes, maintains end-use documentation discipline, and screens transactions. Existing ISO + vendor authorization content moves below under `[ CERTIFICATIONS ]`.
- [ ] **Step 2 — Support & Sustainment (`09`):** lifecycle rail Design → Supply → Install → Train → Maintain (numbered steps, connected line), then three depth blocks reusing `services.ts` content (Engineers on the Ground / Preventive Not Reactive / Training That Lasts) + a 24/7 + forward-deployed FSR + in-country test benches strip. Closing line: *"This is what separates a partner from a box-mover."* Delete the old services route dir.
- [ ] **Step 3:** `grep -rn "portal/services" src` → must return nothing.
- [ ] **Step 4:** `npx tsc --noEmit`; commit `"Elevate compliance to governance-first; replace services with Support & Sustainment lifecycle"`.

### Task 10: Solutions by Sector

**Files (lunasat):** Create `src/app/portal/sectors/page.tsx` + `.module.scss`, `src/app/portal/sectors/airports/page.tsx` + `.module.scss`.

- [ ] **Step 1 — Index (`10`):** five sector cards: Airports (live, links to `/portal/sectors/airports`), Ports, Borders, Energy, Telecom (each rendered dimmed with chip `[ IN PRODUCTION ]`, not links).
- [ ] **Step 2 — Airports template:** sections: Operational picture (airport as layered security + comms environment) · What Lunasat integrates (pull airport-relevant items from `capabilities.ts`: ATC voice/VCS + tower systems from airspace-control; perimeter/PTZ from security-surveillance; trunked radio/private LTE from telecom) · Delivery model (reuse lifecycle line) · CTA to `/portal/become-a-partner`. Add a visible mono note at the top: `[ TEMPLATE PAGE — AWAITING AIRPORT SOLUTIONS DECK CONTENT ]`.
- [ ] **Step 3:** `npx tsc --noEmit`; commit `"Add Solutions by Sector with Airports template page"`.

### Task 11: Documents reframe + Become a Partner + Deal Rooms

**Files (lunasat):** Modify `src/app/portal/documents/page.tsx` (+ `.module.scss` if needed); Create `src/app/portal/become-a-partner/page.tsx` + `.module.scss` + `InquiryForm.tsx` (client), `src/app/portal/deal-rooms/page.tsx` + `.module.scss`.

**Interfaces:** Consumes `submitPartnerInquiry`, `InquiryFormState` from `@/lib/portal/actions`.

- [ ] **Step 1 — Documents (`11`):** add a header notice block: *"Downloads are provisioned per recipient and watermarked. Files in this preview are placeholders."* Ensure the four spec categories read clearly in the filter labels (company profile, sector line cards, capability statements, compliance one-pager can be a highlighted "core pack" row at top linking to matching docs if present in `documents.ts`).
- [ ] **Step 2 — Become a Partner (`12`):** `InquiryForm.tsx` with `useActionState(submitPartnerInquiry, {})`: selects `domain` (the 4 capability domains + "Multiple"), `country` (Iraq, Lebanon, Regional / Multi-country, Other), text `principal` (label `PRINCIPAL / OEM`), plus fullName, email, organization, message textarea; success state replaces form with `[ LOGGED ]` confirmation: *"Your inquiry has been logged and routed. Expect contact from the relevant desk."*
- [ ] **Step 3 — Deal Rooms (Tier 2):** locked page: `[ TIER 2 // RESTRICTED ]` header, copy: per-relationship deal rooms with named logins provisioned individually per principal or pursuit; hold named clients & programs, deployment photography, co-branded material, pipeline and pricing; *"Access is provisioned individually. Contact your Lunasat counterpart."* Static lock glyph (inline SVG), no form.
- [ ] **Step 4:** `npx tsc --noEmit`; commit `"Reframe documents as watermarked library; add partner intake and Tier-2 deal rooms"`.

### Task 12: Fold spectrum into Telecom capability

**Files (lunasat):** Modify `src/data/portal/capabilities.ts` (telecommunications entry only).

- [ ] **Step 1:** Rename telecom layer "Assurance & measurement" → **"Spectrum Monitoring & Management"** and rewrite its `summary` to cover spectrum monitoring, interference hunting, RF test & measurement, and regulatory spectrum management (source: existing R&S telecom scope text in `vendors.ts`). Keep all other layers/domains untouched. Verify no capability anywhere is named "Intelligence": `grep -in "intelligence" src/data/portal/capabilities.ts` → no domain title hit.
- [ ] **Step 2:** `npx tsc --noEmit`; commit `"Fold spectrum work into Telecom as Spectrum Monitoring & Management"`.

### Task 13: AST access gate (mirror of Task 3)

**Files (al-saad-telecom):**
- Modify: `src/lib/portal/types.ts` (add `ndaAcceptedAt?: string`), `src/lib/portal/actions.ts` (replace `enterDemoPortal` with `enterPortal` exactly as the Task 2 signature/behavior, demo email domain `@alsaadtelecom.com` removed — cookie now stores the visitor's real inputs), `src/app/partner-login/page.tsx`
- Create: `src/app/partner-login/AccessForm.tsx`

- [ ] **Step 1:** Same action semantics as lunasat Task 2 `enterPortal` (same field names, same error strings, same cookie payload + options, redirect `/portal`).
- [ ] **Step 2:** Same form/page treatment as lunasat Task 3, but styled with AST's conventions (lucide icons allowed; keep `LoginBackground`). NDA copy identical.
- [ ] **Step 3:** `npx tsc --noEmit`; commit `"Gate AST portal entry behind name/email capture + NDA acknowledgment"`.

### Task 14: AST vendor logos instead of initials

**Files (al-saad-telecom):**
- Modify: `src/data/portal/vendors.ts`, `src/components/portal/PartnerProductCard/PartnerProductCard.tsx` + `.module.scss`

- [ ] **Step 1:** `vendors.ts` logo paths: nokia → `/images/partners/nokia.svg`, rs → `/images/partners/rohde-schwarz.svg`, flir → `/images/partners/flir.svg`, genasys → `/images/partners/genasys.svg`, l3harris → `/images/partners/l3harris.svg`, leidos/microchip/teledyne keep their PNGs. Remove `// placeholder` comments.
- [ ] **Step 2:** `PartnerProductCard.tsx`: replace the `vendorInitials` box with `<img src={vendor.logo} alt={vendor.name} className={styles.vendorLogo} />` (white-filter CSS per Global Constraints, max-height ~28px, width auto) and keep the initials render ONLY as fallback when `vendor.logo` is falsy. Keep vendor name text beside/below at reduced prominence.
- [ ] **Step 3:** `npx tsc --noEmit`; commit `"Show partner logos on portal vendor cards"`.

### Task 15: Integration — builds, previews, visual QA (main session, serialized)

**Files:** Create `/Users/mateo_akel/Documents/ventneuf/repositories/tarek-website/.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "lunasat", "runtimeExecutable": "npm", "runtimeArgs": ["--prefix", "lunasat", "run", "dev", "--", "-p", "4310"], "port": 4310 },
    { "name": "al-saad-telecom", "runtimeExecutable": "npm", "runtimeArgs": ["--prefix", "al-saad-telecom", "run", "dev", "--", "-p", "4311"], "port": 4311 }
  ]
}
```

- [ ] **Step 1:** `npm run build` in lunasat → exit 0. `npm run build` in al-saad-telecom → exit 0. Fix anything broken.
- [ ] **Step 2:** `preview_start` both; walk the full flow on each: `/partner-login` (submit with missing fields → errors; complete + NDA → lands on `/portal`), every one of the 13 lunasat sections + deal rooms, AST portal pages. Screenshot each; `preview_inspect` logo elements (naturalWidth > 0 via eval where needed).
- [ ] **Step 3:** Fix visual issues found (spacing, contrast, logo sizing) until the walkthrough is clean; commit fixes per repo.

### Task 16: Deliverables

- [ ] Final report: preview links, what changed, user TODO list (magic-link infra, watermarking, real documents, Tier-2 build-out, airport deck, official FLIR/Frequentis/Genasys/L3Harris logo files, deploy target, 30+ vs 25+ years copy confirmation for public sites). Write session memories.

## Self-Review

- Spec coverage: sections 0–12 → Tasks 4,5,5,12+existing,6,7,6,8,9,9,10,11,11; access gate → 3/13; Tier 2 → 11; logos both sites → 1,8,14. ✓
- Placeholders: none (all copy specified or sourced-by-file+field). ✓
- Type consistency: `NavItem.index/badge` (T2↔T4 shell/hub), `enterPortal`/`AccessFormState` (T2↔T3/T13), `submitPartnerInquiry`/`InquiryFormState` (T2↔T11), `ProgramCluster` self-contained (T7), `PartnerVendor.logo` paths (T1↔T8/T14). ✓
