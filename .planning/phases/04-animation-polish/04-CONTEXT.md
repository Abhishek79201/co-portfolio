# Phase 4: Animation & Polish - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the site feel premium and fluid. Replace manual text splitting with GSAP SplitText, add scroll-triggered animations to case study pages (section reveals, diagram path tracing, metric card reveals), implement `gsap.matchMedia()` for mobile-simplified and reduced-motion variants, and improve animation timing/easing across all existing landing page sections. This phase touches animation behavior only -- no content changes, no layout restructuring, no new pages.

</domain>

<decisions>
## Implementation Decisions

### SplitText Migration
- **D-01:** Replace manual `text.split('')` in Hero.tsx and `text.split(' ')` in About.tsx with GSAP SplitText (`gsap/SplitText`). Register SplitText in `lib/gsap.ts` alongside ScrollTrigger and useGSAP.
- **D-02:** The scramble text effect in Hero.tsx and Projects.tsx is a signature animation (Phase 2 D-03) -- preserve the scramble behavior. SplitText may be used internally for the character splitting, but the scramble logic itself stays.

### Architecture Diagram Animations
- **D-03:** SVG path tracing style -- arrows draw themselves along their paths using stroke-dashoffset animation, then boxes/nodes fade and scale in at endpoints. Premium portfolio-worthy effect.
- **D-04:** Scroll-triggered once -- diagram animates when scrolled into view via ScrollTrigger. Replays if user navigates away and returns to the page. Matches the editorial reading flow.
- **D-05:** All 3 existing diagram components (`GleeMeetDiagram.tsx`, `CareerBoxDiagram.tsx`, `ZorovaDiagram.tsx`) get the same animation treatment. They're currently static SVG Server Components -- will need client wrappers or conversion for GSAP animation.

### Case Study Page Section Reveals
- **D-06:** Extend the landing page scroll-triggered reveal pattern to case study detail pages. Each of the 8 sections (Hero, Challenge, Architecture, Tech Rationale, Implementation, Results, Team, CTA) gets a scroll-triggered entrance animation.
- **D-07:** Case study pages are currently Server Components. Animated sections need client component wrappers -- keep the page shell as a Server Component for SEO, wrap animated sections in client boundary components.

### Metric Card Animations
- **D-08:** Staggered card reveal -- each metric card fades up + slides in with a stagger delay. The metric value highlights with a brief accent color flash on entrance. Clean and editorial style.
- **D-09:** Metrics are qualitative text (Phase 3 D-03), not numbers. No counter/counting animations needed. If any metrics have embedded numbers in future, the design should accommodate swapping in counter animations later.

### Landing Page Fluidity
- **D-10:** Timing/easing overhaul across all existing sections (Hero, About, Experience, Projects, Contact). Current issue: animations feel choppy with abrupt starts/stops. Fix easing curves, improve stagger timing, ensure natural motion flow.
- **D-11:** Add scroll-linked (scrub) animations where appropriate -- parallax effects, opacity shifts, progress indicators. Claude picks where scrub improves the feel vs. where discrete triggers work better.
- **D-12:** Claude audits all landing page sections and prioritizes improvements by visual impact. No specific section is called out as worst -- full pass needed.

### Mobile Animation Strategy
- **D-13:** Simplified animation variants on mobile via `gsap.matchMedia()`. Fewer staggered children, no parallax effects, simpler easing. Not CSS-only -- still uses GSAP but with reduced complexity.
- **D-14:** Breakpoint strategy: use `gsap.matchMedia()` with a mobile breakpoint (likely 768px or matching Tailwind's `md`). Desktop gets full animations, mobile gets simplified variants.

### Reduced Motion / Accessibility
- **D-15:** `prefers-reduced-motion` must be respected in both CSS (already partially handled in globals.css:296-304) and GSAP. Extend GSAP animations to check reduced-motion preference via `gsap.matchMedia()`.

### Claude's Discretion
- Reduced-motion implementation approach -- Claude decides between "instant final state with no motion" vs "gentle fades only" vs a hybrid. Pick the most accessible standard approach.
- Per-section scrub vs trigger decisions -- Claude judges which sections benefit from scroll-linked scrub and which work better with discrete enter-once triggers.
- Easing curve choices -- Claude selects appropriate easing functions (power2, power3, elastic, etc.) per animation type.
- Client component wrapper architecture for case study page animations -- Claude decides granularity (one wrapper per section vs shared animation provider).

### Carried Forward
- Professional & Clean tone (Phase 2 D-01)
- Scramble text is a signature animation -- preserve behavior (Phase 2 D-03)
- `frontend-design` skill for all UI work (Phase 2 D-20)
- GSAP centralized in `lib/gsap.ts` (Phase 1)
- Qualitative metrics, not numbers (Phase 3 D-03)
- Architecture diagrams use CSS custom properties in SVG attributes (Phase 3)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### GSAP Animation System
- `lib/gsap.ts` -- Current GSAP registration (ScrollTrigger, useGSAP). Must add SplitText registration here.
- `components/Hero.tsx` -- Manual character splitting at line 13 (`text.split('')`) and scramble at line 38. SplitText target.
- `components/About.tsx` -- Manual word splitting at line 38 (`innerHTML = text.split(' ')`). SplitText target.
- `components/Projects.tsx` -- Scramble effect at line 46 (`split('')`). Signature animation, preserve behavior.
- `components/Experience.tsx` -- Timeline with alternating slide animations. Easing/timing polish target.
- `components/Contact.tsx` -- Contact section. Easing/timing polish target.

### Case Study Page Components
- `app/case-studies/[slug]/page.tsx` -- Detail page (Server Component). Needs client wrappers for animated sections.
- `components/diagrams/GleeMeetDiagram.tsx` -- Static SVG, needs path tracing animation.
- `components/diagrams/CareerBoxDiagram.tsx` -- Static SVG, needs path tracing animation.
- `components/diagrams/ZorovaDiagram.tsx` -- Static SVG, needs path tracing animation.
- `components/PatternSpotlight.tsx` -- Server Component for Redis+OpenSearch callouts. May need animation wrapper.

### Accessibility / Reduced Motion
- `app/globals.css` lines 296-304 -- Existing CSS `prefers-reduced-motion` rules. GSAP must complement these.

### Design System
- `config/design-system.ts` -- Color palette and typography tokens (accent colors for metric flash effect)
- `app/globals.css` -- CSS custom properties (--violet, --pink, --cyan, --lime, --orange)

### Prior Phase Context
- `.planning/phases/01-infrastructure-foundation/01-CONTEXT.md` -- GSAP patterns, useGSAP hook, scroll architecture
- `.planning/phases/02-landing-page-rebrand/02-CONTEXT.md` -- Design tone, signature animations, UI skill directive
- `.planning/phases/03-case-study-pages/03-CONTEXT.md` -- Case study data structure, diagram approach, qualitative metrics

### Research (pre-existing)
- `.planning/research/STACK.md` -- SplitText migration guidance, free since GSAP 3.13, import from `gsap/SplitText`
- `.planning/research/SUMMARY.md` -- Animation strategy overview
- `.planning/research/PITFALLS.md` -- Plugin registration pitfalls

### Requirements
- `.planning/REQUIREMENTS.md` -- ANIM-01 through ANIM-07 requirements mapped to this phase

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/gsap.ts` -- Centralized GSAP registration. Add SplitText here (no new packages needed -- bundled with gsap since 3.13).
- `@gsap/react` `useGSAP` hook -- Already used in all landing page components. Extend to case study animation wrappers.
- `.pill` CSS class variants -- Available for animated tech pill reveals if desired.
- `components/SmoothScrollProvider.tsx` -- Lenis smooth scroll already connected to GSAP ScrollTrigger ticker.

### Established Patterns
- Client components with `'use client'` for GSAP-animated elements
- `useGSAP(() => { ... }, { scope: sectionRef })` -- Standard animation hook pattern
- ScrollTrigger for scroll-linked animations (used in Hero, About, Experience)
- CSS custom properties for accent colors in SVG attributes (Phase 3 diagrams)
- Section numbering convention: `01 /`, `02 /` labels

### Integration Points
- `lib/gsap.ts` -- Register SplitText plugin
- `components/Hero.tsx` -- Replace manual split with SplitText, improve easing
- `components/About.tsx` -- Replace manual split with SplitText, improve easing
- `app/case-studies/[slug]/page.tsx` -- Add client wrappers around animated sections
- `components/diagrams/*.tsx` -- Convert to client components or wrap for GSAP path tracing
- All landing page components -- Easing/timing audit and improvements

</code_context>

<specifics>
## Specific Ideas

- SVG path tracing on diagrams should feel like the system is "coming to life" -- arrows trace first, then nodes appear at endpoints
- The accent color flash on metric cards ties back to the per-case-study accent colors (pink for GleeMeet, violet for CareerBox, orange for Zorova)
- Scrub animations should enhance the reading flow, not distract from content -- subtle parallax and opacity shifts, not dramatic transforms
- SplitText migration should result in visibly smoother character/word reveals compared to the current manual approach

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>

---

*Phase: 04-animation-polish*
*Context gathered: 2026-04-02*
