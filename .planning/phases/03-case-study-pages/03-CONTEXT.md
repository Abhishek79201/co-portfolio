# Phase 3: Case Study Pages - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the case study content system: a rich index page at `/case-studies` with preview cards and a shared architecture pattern intro, plus full long-form editorial detail pages for GleeMeet, CareerBox, and Zorova. Each case study demonstrates architecture thinking to technical decision-makers with system design diagrams, tech rationale, implementation highlights, and qualitative impact metrics. The shared Redis + OpenSearch + DB pattern is the narrative thread across all three.

</domain>

<decisions>
## Implementation Decisions

### Detail Page Layout
- **D-01:** Long-form editorial layout — full-width sections flowing vertically. Big hero, then alternating text/visual sections. Immersive reading experience matching the "deep dive" positioning.
- **D-02:** Section order: Hero (title + tagline + tech pills + accent backdrop) → Challenge (narrative) → Architecture Diagram (full-width SVG) → Tech Rationale → Implementation Highlights → Results/Metrics → Team Attribution → CTA.
- **D-03:** Qualitative metrics only — descriptive impact statements (no estimated ranges or fake numbers). Designed so exact numbers can be swapped in later when measured.

### Data Model
- **D-04:** Structured TypeScript objects for all case study sections — not markdown strings. Each section has typed fields (e.g., results as array of `{metric, description}`, implementation as array of `{title, detail}`, techRationale as array of `{technology, problem, solution}`). Enables component-level rendering and full type safety.
- **D-05:** The existing `CaseStudy` interface in `data/types.ts` must be expanded significantly. Current flat `{heading, content}` sections are replaced with rich structured types.

### Architecture Diagrams
- **D-06:** High-level system overview diagrams — 5-8 boxes per diagram showing major layers (Client → API → Cache → Search → Database) with arrows showing data flow. Enough to impress a CTO without overwhelming.

### Claude's Discretion
- Architecture diagram implementation approach — Claude picks between React SVG components, static SVG files, or CSS/HTML block diagrams based on what balances quality with implementation effort.
- Tech Rationale section format — Claude picks between before/after comparison cards, narrative prose, or a hybrid per case study.

### Index Page
- **D-07:** Rich preview cards — each case study gets a large card with title, tagline, key tech pills, project type badge. Visually rich to make 3 studies feel substantial. No filtering needed with only 3 items.
- **D-08:** Brief Redis + OpenSearch pattern intro section above the cards — establishes the shared architecture narrative before readers dive into individual studies. A visual/textual block: "Our projects share a common architecture pattern..."

### Content & Tone
- **D-09:** Primary audience is technical decision-makers (CTOs, VPs of Engineering, tech leads). They want to see architecture thinking, not code snippets. The question they're answering: "Can these devs design systems?"
- **D-10:** 5-7 minute read per case study (~1200-1800 words of content plus diagrams). Each section is substantial but scannable.
- **D-11:** Recurring "Pattern Spotlight" callout block in each case study's Architecture section — a visually distinct block showing how the shared Redis + OpenSearch + DB pattern is applied differently in that specific project. Creates visual consistency and reinforces the studio's signature approach.

### Carried Forward
- Professional & Clean tone from Phase 2 (D-01)
- Placeholder studio name pattern (Phase 2 D-04)
- `frontend-design` skill for all UI work (Phase 2 D-20)
- Structured TypeScript data layer from Phase 1 — components import from `data/`, never inline content

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data Layer (Phase 1 output)
- `data/types.ts` — Current CaseStudy interface (needs expansion per D-04/D-05)
- `data/case-studies.ts` — Current placeholder content (needs full content per CASE-03/04/05)
- `data/projects.ts` — Project metadata with hasCaseStudy, type, accent fields
- `data/team.ts` — Team member data for team attribution sections

### Existing Route Skeleton (Phase 1 output)
- `app/case-studies/page.tsx` — Current index page (server component, simple list — needs redesign per D-07/D-08)
- `app/case-studies/[slug]/page.tsx` — Current detail skeleton (needs full template per D-01/D-02)
- `app/case-studies/layout.tsx` — Shared layout with Navigation + Footer chrome

### Design System
- `config/design-system.ts` — Color palette and typography tokens
- `app/globals.css` — CSS custom properties, utility classes (`.pill`, `.heading-brutal`, `.heading-lg`, `.dev-mono`, `.magnetic-btn`, `.text-body`)

### Prior Phase Context
- `.planning/phases/01-infrastructure-foundation/01-CONTEXT.md` — Data layer structure, GSAP patterns, routing decisions
- `.planning/phases/02-landing-page-rebrand/02-CONTEXT.md` — Design tone (Professional & Clean), UI skill directive, placeholder name pattern

### Requirements
- `.planning/REQUIREMENTS.md` — CASE-01 through CASE-10 requirements mapped to this phase

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/case-studies/page.tsx` — Server component index page (needs redesign but routing is in place)
- `app/case-studies/[slug]/page.tsx` — Detail page with `generateStaticParams`, `generateMetadata`, `dynamicParams: false` already set up
- `app/case-studies/layout.tsx` — Shared Navigation + Footer chrome
- `.pill` CSS class variants (pill-violet, pill-pink, pill-cyan, pill-orange) — ready for tech stack pills and type badges
- `.heading-lg`, `.heading-brutal`, `.dev-mono`, `.text-body` — typography utilities
- `.magnetic-btn` — CTA button style (already used in detail page CTA)
- `lib/gsap.ts` — Centralized GSAP registration (for any animated components)
- `@gsap/react` `useGSAP` hook — for client components with animations
- 49 shadcn/ui components available (Card, Badge, etc.)
- `lucide-react` icons library

### Established Patterns
- Server components for page shells, client components for GSAP-animated elements
- Section numbering convention: `01 /`, `02 /` etc.
- Data imports: `import { caseStudies } from '@/data/case-studies'`
- GSAP animation: `useGSAP(() => { ... }, { scope: sectionRef })` pattern
- CSS variables for accent colors: `var(--violet)`, `var(--pink)`, `var(--cyan)`, etc.

### Integration Points
- `data/types.ts` — CaseStudy interface expansion (most critical — all content rendering depends on this)
- `data/case-studies.ts` — Content population (all 3 case studies)
- `app/case-studies/page.tsx` — Index page redesign (rich cards + pattern intro)
- `app/case-studies/[slug]/page.tsx` — Detail page template (long-form editorial)
- New: Architecture diagram components (location TBD by planner)

</code_context>

<specifics>
## Specific Ideas

- The Redis + OpenSearch + DB pattern is the studio's signature — the "Pattern Spotlight" callout should be visually distinctive and consistent across all 3 case studies
- Each case study should feel like it could stand alone as a pitch to a CTO evaluating the studio
- The index page pattern intro sets expectations before readers choose which study to read
- Qualitative metrics are designed to be upgradeable — when exact numbers are measured later, they should slot in without restructuring

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-case-study-pages*
*Context gathered: 2026-04-01*
