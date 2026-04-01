---
phase: 04-animation-polish
plan: 02
subsystem: ui
tags: [gsap, drawsvg, scroll-trigger, animation, case-studies, svg-diagrams]

# Dependency graph
requires:
  - phase: 04-01
    provides: lib/gsap.ts with DrawSVGPlugin and SplitText registered; useGSAP hook pattern established
  - phase: 03-case-study-pages
    provides: components/diagrams/ Server Components, app/case-studies/[slug]/page.tsx Server Component
provides:
  - CaseStudyAnimations client wrapper for section reveals and metric card animations
  - All 3 architecture diagram components converted to client components with DrawSVG path tracing
  - gsap.matchMedia with mobile simplification and reduced-motion instant final state across all new components
affects: [04-03-animation-polish, 05-seo-metadata]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "DrawSVGPlugin path-tracing: lines draw first, then rects appear with back.out(2), then texts fade"
    - "Server Component page shell wrapping a single Client Component for animations (CaseStudyAnimations pattern)"
    - "gsap.matchMedia per component with isDesktop/isMobile/reduceMotion conditions inside useGSAP"
    - "Selector-based animation targets (.cs-section, .metric-card) instead of ref forwarding"
    - "Layer label exclusion via :not([y=...]) attribute selectors on SVG text elements"

key-files:
  created:
    - components/case-studies/CaseStudyAnimations.tsx
  modified:
    - app/case-studies/[slug]/page.tsx
    - components/diagrams/GleeMeetDiagram.tsx
    - components/diagrams/CareerBoxDiagram.tsx
    - components/diagrams/ZorovaDiagram.tsx

key-decisions:
  - "CaseStudyAnimations uses selector-based targeting (.cs-section, .metric-card) rather than ref forwarding — simpler and avoids prop-drilling through Server Component boundaries"
  - "Metric card accent flash is desktop-only (boxShadow glow skipped on mobile for performance)"
  - "Layer labels excluded from node animation via :not([y=...]) attribute selectors — pre-specified per diagram to avoid animating static layer labels"
  - "accentRgb fallback is '168,85,247' (violet) when project accent is undefined"

patterns-established:
  - "Server Component page shell + single Client wrapper: page.tsx stays Server Component; CaseStudyAnimations is the only client boundary for animations"
  - "DrawSVG animation sequence: gsap.set lines to drawSVG:0, rects to opacity:0+scale:0.85, texts to opacity:0 — then timeline draws lines → fades in rects → fades in texts"
  - "Per-diagram texts selector: query with :not([y=layerLabelY]) to exclude static layer labels"

requirements-completed: [ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06]

# Metrics
duration: 7min
completed: 2026-04-01
---

# Phase 4 Plan 02: Animation Polish — Case Study Animations Summary

**CaseStudyAnimations client wrapper + DrawSVG path-tracing on 3 architecture diagram components with gsap.matchMedia mobile/reduced-motion support**

## Performance

- **Duration:** 7 min
- **Started:** 2026-04-01T21:12:05Z
- **Completed:** 2026-04-01T21:19:00Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Created `components/case-studies/CaseStudyAnimations.tsx` client wrapper — all 8 sections fade up on scroll with `.cs-section`, metric cards stagger in with accent color glow flash on desktop
- Converted all 3 diagram components (GleeMeetDiagram, CareerBoxDiagram, ZorovaDiagram) from Server to Client Components with DrawSVGPlugin path-tracing animations
- gsap.matchMedia in every new component handles desktop (full animations), mobile (simplified: shorter durations, tighter stagger, no accent flash), and reduced-motion (instant final state via clearProps)
- Case study page shell remains a Server Component — generateStaticParams and generateMetadata intact; build produces SSG output for all 3 slugs

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CaseStudyAnimations wrapper + update page.tsx** - `2d5caf8` (feat)
2. **Task 2: Convert 3 diagram components to client + add DrawSVG animations** - `95afd99` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `components/case-studies/CaseStudyAnimations.tsx` - New client component; wraps case study article body; applies cs-section scroll reveals and metric-card stagger + accent flash with gsap.matchMedia
- `app/case-studies/[slug]/page.tsx` - Added CaseStudyAnimations import and wrapper; added cs-section to all 8 sections; added metric-card to result card divs; passes accentRgb prop
- `components/diagrams/GleeMeetDiagram.tsx` - Converted to client component; added DrawSVG animation (arrows draw → nodes appear → labels fade); excludes y="20" and y="260" layer labels
- `components/diagrams/CareerBoxDiagram.tsx` - Converted to client component; added DrawSVG animation; excludes y="30" and y="230" layer labels
- `components/diagrams/ZorovaDiagram.tsx` - Converted to client component; added DrawSVG animation; excludes y="20" and y="260" layer labels

## Decisions Made

- CaseStudyAnimations uses selector-based targeting (`.cs-section`, `.metric-card`) rather than ref-forwarding because it works cleanly across the Server/Client boundary — the client wrapper queries its own DOM after mount
- Metric card accent flash (box-shadow glow) is desktop-only; skipped on mobile for performance as specified in UI-SPEC
- accentRgb fallback is `'168,85,247'` (violet) when `project.accent` is not in the accentRgbMap — preserves visual consistency across all case studies
- Layer label exclusion selectors (`:not([y=...])`) are per-diagram as pre-specified from source code analysis of each SVG's y-coordinate layout

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None — TypeScript compilation and `npm run build` both passed on first attempt.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Case study pages now have premium scroll-triggered animations matching the quality bar set by the landing page
- All 3 diagram components are client-ready with DrawSVG path tracing
- gsap.matchMedia pattern established across new components, consistent with pattern from Plan 01
- Phase 4 Plan 03 (landing page easing overhaul — Hero, About, Experience, Contact) can proceed immediately

---
*Phase: 04-animation-polish*
*Completed: 2026-04-01*
