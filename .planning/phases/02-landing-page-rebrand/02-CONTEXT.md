# Phase 2: Landing Page Rebrand - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Transform the homepage from a single-person portfolio into a professional dev studio identity. Visitors should see two named co-founders, a clear methodology, and a 6-project portfolio — no remnants of personal branding. This phase modifies existing landing page sections and adds new ones; it does NOT touch case study pages (Phase 3) or animations beyond content swaps (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- **D-01:** Professional & Clean tone — understated confidence, not bold/audacious or developer-centric. Less visual clutter, more whitespace-friendly.
- **D-02:** Studio metrics as stats: "6+ Products Shipped", "3+ Years Building Together", "2 Founders" — replaces personal stats (corporate clients, freelance, projects).
- **D-03:** Keep existing scramble text and character animation behavior — only change the text content (studio name placeholder, studio tagline, studio description). Do not tone down or remove the signature animations.
- **D-04:** Use placeholder studio name throughout (user will decide final name later — site structure must not depend on it).

### Claude's Discretion (Hero)
- CTA buttons: Claude decides the best combination (e.g., "View Our Work" + "Get in Touch", "Read Case Studies" + "Contact", or single CTA). Pick what fits the professional tone and conversion flow.
- Hero subtitle/tagline copy — Claude writes what fits the "professional & clean" direction.

### Team Section (replaces About)
- **D-05:** Merge into the existing About section position — rewrite personal bio into studio narrative + team cards. Do NOT add a separate section.
- **D-06:** Side-by-side equal-billing cards for Abhishek and Vatsal. Each card: initials avatar (styled, not photos), name, role, skills, GitHub + LinkedIn links. Data sourced from `data/team.ts`.
- **D-07:** Use styled initials (AV, VZ) as avatars for now. Layout must support swapping to real photos later without restructuring.
- **D-08:** Include a brief shared history narrative (GEC Modasa alumni, built together at X-Byte and Screenplay) above or integrated with the cards.

### Experience Section → Shared Timeline
- **D-09:** Convert the personal work history timeline into a shared journey timeline. Milestones: GEC Modasa (college) → X-Byte Solutions → Screenplay → Studio launch. All projects are joint work — present as a partnership story, not individual career paths.
- **D-10:** Keep the existing alternating slide animation pattern but with shared milestone data instead of personal job entries.

### Methodology Section ("How We Work")
- **D-11:** 4 numbered steps: 01 Discover → 02 Build MVP → 03 Iterate → 04 Scale. Each step has a title and 1-2 line description.
- **D-12:** Horizontal layout on desktop, stacked on mobile. Clean numbered format (matches existing section numbering convention: `01 /`, `02 /`, etc.).
- **D-13:** Placement: after Team/About section, before Projects. Page flow becomes: Hero → Team (About) → Experience (Shared Timeline) → How We Work → Projects → Contact.

### Project Showcase
- **D-14:** Keep the existing list-row layout with hover scramble effect — it's a signature interaction. Extend from 4 hardcoded projects to all 6 sourced from `data/projects.ts`.
- **D-15:** Add subtle color-coded pill badges for project type: Client (orange), Co-built (pink), Internal (cyan). Use existing `.pill` utility class from `globals.css`.
- **D-16:** On expanded project detail, show "Read Case Study →" link for projects where `hasCaseStudy: true`. Links to `/case-studies/[slug]`.

### Contact & Footer
- **D-17:** Update Contact section copy from personal framing ("reach out to me") to studio framing ("let's build together" or similar). Claude's discretion on exact copy.
- **D-18:** Footer already extracted as shared Server Component in Phase 1. Update copyright text if still showing personal name (currently shows "Abhishek Vaghela & Vatsal Zinzuvadiya" — may need studio name placeholder).

### Metadata & SEO
- **D-19:** Update all metadata/titles from "Abhishek Vaghela" to studio placeholder name. Includes: `<title>`, OG tags, Twitter cards, JSON-LD description. Schema.org migration from Person to Organization happens in Phase 5 — this phase just updates text content.

### UI Execution
- **D-20:** Use the `frontend-design` skill for all UI component work to ensure high design quality and avoid generic AI aesthetics.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data Layer (Phase 1 output)
- `data/types.ts` — TypeScript interfaces for Project, CaseStudy, TeamMember
- `data/projects.ts` — All 6 projects with slug, type, tech, hasCaseStudy fields
- `data/team.ts` — Both team members with roles, skills, social links
- `data/case-studies.ts` — Case study content (referenced for hasCaseStudy linking)

### Design System
- `config/design-system.ts` — Color palette and typography tokens
- `app/globals.css` — CSS custom properties, utility classes (`.pill`, `.heading-brutal`, `.dev-mono`, `.magnetic-btn`)

### Components Being Modified
- `components/Hero.tsx` — Current personal hero with scramble animation (rewrite content, keep animations)
- `components/About.tsx` — Current personal bio (replace with team section)
- `components/Experience.tsx` — Current personal timeline (convert to shared journey)
- `components/Projects.tsx` — Current hardcoded 4-project list (refactor to data-driven 6 projects)
- `components/Contact.tsx` — Current personal contact (update copy)
- `components/Footer.tsx` — Current shared footer (update if needed)

### Page Composition
- `app/page.tsx` — Home page component composition order
- `app/layout.tsx` — Root layout with metadata (needs title/description update)

### Prior Context
- `.planning/phases/01-infrastructure-foundation/01-CONTEXT.md` — Phase 1 decisions (data layer structure, GSAP patterns, routing)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `data/projects.ts` — Ready to consume, has all 6 projects with `type` field for labels
- `data/team.ts` — Ready to consume, has both members with skills and social links
- `.pill` CSS class in `globals.css` — Ready for type badges
- `lib/gsap.ts` — Centralized GSAP registration (import from here)
- `@gsap/react` `useGSAP` hook — All animated components already migrated
- 49 shadcn/ui components available (Card, Badge, Button, etc.)
- `lucide-react` icons library installed

### Established Patterns
- Client components with `'use client'` for anything using GSAP
- Section numbering: `01 / About`, `02 / Experience` — update labels for new sections
- GSAP animation: `useGSAP(() => { ... }, { scope: sectionRef })` pattern
- Section structure: `useRef` for section element, GSAP ScrollTrigger for reveals
- Design tokens: CSS custom properties `--violet`, `--pink`, `--cyan`, `--lime`, `--orange`

### Integration Points
- `app/page.tsx` — Component order needs updating (add Methodology section)
- `components/Navigation.tsx` — Nav items array needs section label updates
- `app/layout.tsx` — Metadata export needs studio branding

</code_context>

<specifics>
## Specific Ideas

- User explicitly stated: all projects since college are shared/joint work between Abhishek and Vatsal — the timeline should reflect this partnership story
- Scramble text animation is a signature element — preserve it across the rebrand
- Photos will be added later — build avatar layout to be swappable
- Studio name is a placeholder — all references must be easy to find-and-replace when final name is decided

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-landing-page-rebrand*
*Context gathered: 2026-04-01*
