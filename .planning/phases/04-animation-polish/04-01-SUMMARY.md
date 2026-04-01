---
phase: 04-animation-polish
plan: 01
subsystem: animation
tags: [gsap, splittext, matchmedia, accessibility, easing]
dependency_graph:
  requires: []
  provides: [lib/gsap.ts#SplitText, lib/gsap.ts#DrawSVGPlugin, Hero#matchMedia, About#matchMedia]
  affects: [components/Hero.tsx, components/About.tsx, app/globals.css]
tech_stack:
  added: [SplitText (gsap/SplitText), DrawSVGPlugin (gsap/DrawSVGPlugin)]
  patterns: [gsap.matchMedia responsive animation, SplitText autoSplit onSplit callback, reduced-motion instant final state]
key_files:
  created: []
  modified:
    - lib/gsap.ts
    - components/Hero.tsx
    - components/About.tsx
    - app/globals.css
decisions:
  - SplitText autoSplit+onSplit pattern chosen over manual querySelectorAll for resize-safe, font-load-safe char/word splitting
  - gsap.matchMedia over media query listeners for animation context isolation per media condition
  - DrawSVGPlugin registered now for Plan 02 path-tracing diagrams (no extra install needed, bundled in gsap 3.14)
  - word-reveal CSS classes retired; SplitText handles word styling via direct opacity/color properties
metrics:
  duration: 5 minutes
  completed: 2026-04-02
  tasks: 3
  files_modified: 4
---

# Phase 04 Plan 01: SplitText Migration + matchMedia Animation Polish Summary

## One-liner

SplitText-based character/word animation with gsap.matchMedia for mobile-simplified and reduced-motion variants, replacing fragile manual DOM splitting and elastic bounce easings.

## What Was Built

**Task 1 — lib/gsap.ts plugin registration**
- Added `SplitText` and `DrawSVGPlugin` imports and registrations to the centralized GSAP module
- Both plugins are bundled in gsap ^3.14.2, no additional npm install needed
- All downstream components import from `@/lib/gsap` per existing project convention

**Task 2 — Hero.tsx migration**
- Removed `CharLine` component that pre-rendered character `<span>` elements manually
- Replaced with plain text `<span>` elements; SplitText handles char wrapping on hydration
- Name char animation: `elastic.out(1, 0.55)` -> `back.out(2.5)`, duration 1.2s -> 1.0s, stagger 0.025 -> 0.02
- Name parallax: `y: -180` -> `y: -100`, `scrub: 0.6` -> `scrub: 0.8` (less aggressive)
- Full `gsap.matchMedia()` wrapper with `isDesktop`, `isMobile`, `reduceMotion` conditions
- Mobile path: no rotation, y:'80%' (vs 140%), duration 0.4s, stagger 0.015, `power2.out`
- Reduced-motion path: `gsap.set` to instant final state on all animated elements; scramble still runs (text content, not motion)
- Scroll-linked parallax locked to `isDesktop` condition only
- Role scramble effect preserved exactly (D-02 requirement)

**Task 3 — About.tsx migration + CSS cleanup**
- Replaced raw `innerHTML` mutation + CSS class toggling with `SplitText.create(introRef.current, { type: 'words', autoSplit: true, onSplit })`
- Word reveal uses `opacity`/`color` properties in `gsap.fromTo` instead of className switching
- Word stagger reduced from 0.08 to 0.04 per UI-SPEC
- Stats easing: `elastic.out(1, 0.5)` -> `power3.out`; scale start `0.3` -> `0.85`; y `40` -> `20`; duration `0.8` -> `0.6`
- Skill pills stagger capped: `i * 0.025` -> `Math.min(i, 8) * 0.015`
- Full `gsap.matchMedia()` with `isDesktop`, `isMobile`, `reduceMotion` conditions
- Mobile path: shorter durations and offsets for all entry animations
- Reduced-motion path: `gsap.set` instant final state on all animated elements
- Removed `.word-reveal-dim` and `.word-reveal-lit` CSS classes from `app/globals.css` (both main and `prefers-reduced-motion` block)

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None. All animation logic is wired to actual DOM elements. No placeholder data.

## Self-Check: PASSED

**Files exist:**
- lib/gsap.ts: FOUND
- components/Hero.tsx: FOUND
- components/About.tsx: FOUND
- app/globals.css: FOUND

**Commits exist:**
- ab845b8 (Task 1 - lib/gsap.ts)
- 13e201d (Task 2 - Hero.tsx)
- 0902893 (Task 3 - About.tsx + globals.css)
