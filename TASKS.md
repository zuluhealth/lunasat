# Visual Refactoring - Defense Tech Aesthetic

Refactoring the landing page to a modern defense-tech style (Palantir/Anduril inspiration). High-contrast, monochromatic/limited palette, technical typography, dither effects, and data/pixel animations.

## Completed Tasks

- [x] Analyze existing codebase and design system
- [x] Research design elements (Dither, Glitch, Reveal animations)
- [x] Implement global design updates (Fonts, Colors in `_variables.scss`)
- [x] Create/Update Utility Components (Text Reveal, Dither Image wrapper)
- [x] Refactor `Header` (Minimalist, technical)
- [x] Refactor `Hero` (High impact, video/dither background, typewriter/scramble text)
- [x] Refactor `IntroSection` & `StatsSection` (Data visualization style)
- [x] Refactor `SolutionsSection` & `TechnologySection` (Grid layouts, technical diagrams)
- [x] Refactor `ValuesSection`
- [x] Refactor `ContactSection`
- [x] Refactor `Footer`

## Refinements (User Feedback)

- [x] Shorten animation duration for TextReveal
- [x] Anchor Hero title to bottom left
- [x] Ensure Hero title fits on 2 lines
- [x] Fix animation "jumping" (preserve spaces, stabilize characters)

## Implementation Details

We adopted a strict, technical aesthetic.
- **Typography**: `Funnel Display` for headers (uppercase), `JetBrains Mono`/`Courier` for technical details.
- **Colors**: Black/Dark Gray background (`#0a0a0a`), White/Light Gray text.
- **Effects**:
    - `TextReveal` component handles random letter reveal animations on load and hover.
    - `DitherBackground` provides a noisy, high-contrast overlay for images.
    - Grid lines and crosshairs added to sections for a tactical feel.
    - Buttons and inputs are now minimal outlines with monospace text.

### Relevant Files

- `src/app/page.tsx` - Main landing page.
- `src/styles/_variables.scss` - Design tokens (Dark mode palette).
- `src/components/TextReveal/*` - New animation component.
- `src/components/DitherBackground/*` - New background component.
- `src/components/*` - All section components updated to new style.
