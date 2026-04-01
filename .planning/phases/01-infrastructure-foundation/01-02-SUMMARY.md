---
phase: 01-infrastructure-foundation
plan: 02
subsystem: infra
tags: [gsap, gsap-react, useGSAP, lenis, smooth-scroll, animations, route-awareness]

# Dependency graph
requires: []
provides:
  - "lib/gsap.ts: centralized GSAP plugin registration module exporting gsap, ScrollTrigger, useGSAP"
  - "All 5 animated components migrated to useGSAP hook for automatic cleanup"
  - "SmoothScrollProvider with named rafCallback fix and route-aware ScrollTrigger cleanup"
affects: [03-case-studies, 02-routing-skeleton, all animated components]

# Tech tracking
tech-stack:
  added: ["@gsap/react ^2.1.2 (useGSAP hook)"]
  patterns:
    - "Centralized GSAP module: single registerPlugin call in lib/gsap.ts, all components import from @/lib/gsap"
    - "useGSAP over useEffect+gsap.context: automatic context creation and revert on unmount"
    - "Named function reference for event cleanup: prevents anonymous function leak in gsap.ticker.remove"
    - "Route-aware scroll provider: usePathname triggers ScrollTrigger.kill + Lenis.scrollTo(0, immediate) + refresh"

key-files:
  created:
    - "lib/gsap.ts (centralized GSAP plugin registration and re-exports)"
  modified:
    - "components/SmoothScrollProvider.tsx (Lenis cleanup bug fix + route awareness)"
    - "components/Hero.tsx (useGSAP migration, separate mouse event useEffect)"
    - "components/About.tsx (useGSAP migration, IntersectionObserver kept separate)"
    - "components/Experience.tsx (useGSAP migration, removed useEffect import)"
    - "components/Projects.tsx (useGSAP migration, hover scramble uses setInterval not GSAP)"
    - "components/Contact.tsx (useGSAP migration, form state handlers unchanged)"
    - "package.json (added @gsap/react dependency)"

key-decisions:
  - "useGSAP scope: passed sectionRef to { scope: sectionRef } option instead of second arg to gsap.context -- matches @gsap/react API"
  - "Hero mouse parallax handler stays in separate useEffect (adds DOM event listener, not GSAP setup) -- only GSAP animation timeline moves to useGSAP"
  - "Projects hover scramble kept as useCallback (uses setInterval, not GSAP) -- no contextSafe needed"
  - "About IntersectionObserver stays in separate useEffect -- not GSAP, manages React state counters"
  - "No typeof window guard in lib/gsap.ts -- @gsap/react handles SSR internally, Next.js tree-shakes server-side"

patterns-established:
  - "Pattern GSAP-01: All GSAP imports come from @/lib/gsap, never from gsap or gsap/ScrollTrigger directly"
  - "Pattern GSAP-02: useGSAP({ scope: sectionRef }) replaces useEffect + gsap.context + ctx.revert"
  - "Pattern GSAP-03: Non-GSAP side effects (DOM listeners, IntersectionObserver) stay in separate useEffects"
  - "Pattern GSAP-04: Named function references required for any add/remove event or ticker pattern"
  - "Pattern GSAP-05: Route changes kill all ScrollTriggers, reset Lenis to 0 (immediate), refresh after rAF"

requirements-completed: [INFRA-05, INFRA-06, INFRA-07, INFRA-08]

# Metrics
duration: 25min
completed: 2026-04-01
---

# Phase 01 Plan 02: GSAP Centralization and Component Migration Summary

**Centralized GSAP registration into lib/gsap.ts, migrated all 5 animated components from useEffect+gsap.context to @gsap/react useGSAP hook, and fixed the anonymous function leak in SmoothScrollProvider while adding route-aware scroll reset.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-04-01T00:00:00Z
- **Completed:** 2026-04-01T00:25:00Z
- **Tasks:** 3 completed
- **Files modified:** 8 (1 created, 7 modified)

## Accomplishments

### Task 1: Install @gsap/react and create lib/gsap.ts centralized module (commit: 4115843)

Installed `@gsap/react@^2.1.2` and created `lib/gsap.ts` as the single source of truth for GSAP plugin registration. The file imports `gsap`, `ScrollTrigger`, and `useGSAP`, calls `gsap.registerPlugin(ScrollTrigger, useGSAP)` once, and re-exports all three. No `typeof window` guard is needed because `@gsap/react` handles SSR internally.

### Task 2: Fix SmoothScrollProvider -- Lenis cleanup bug + route awareness (commit: 67ab79c)

Fixed INFRA-07 (anonymous function leak): the original code called `gsap.ticker.remove()` with a new anonymous function that never matched the one added, causing a memory leak on every mount/unmount. Fixed by storing `rafCallback` as a named const and passing the same reference to both `gsap.ticker.add()` and `gsap.ticker.remove()`.

Implemented INFRA-08 (route awareness): added `usePathname` from `next/navigation` and a second `useEffect` that runs on pathname changes, killing all ScrollTrigger instances (`ScrollTrigger.getAll().forEach(st => st.kill())`), resetting Lenis scroll position to 0 with `{ immediate: true }`, and calling `ScrollTrigger.refresh()` after a `requestAnimationFrame`.

### Task 3: Migrate all 5 section components to useGSAP (commit: e0106cf)

Mechanically transformed all 5 section components (Hero, About, Experience, Projects, Contact):
- Replaced `import { gsap } from 'gsap'` and `import { ScrollTrigger } from 'gsap/ScrollTrigger'` with `import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'`
- Removed `if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }` blocks
- Converted `useEffect + gsap.context(() => { ... }, sectionRef) + return () => ctx.revert()` to `useGSAP(() => { ... }, { scope: sectionRef })`

Component-specific decisions:
- **Hero**: Mouse parallax handler stays in a separate `useEffect` (it's a DOM event listener, not GSAP setup). Counter setIntervals moved inside `useGSAP` since they're part of the animation initialization.
- **About**: IntersectionObserver kept in a separate `useEffect` (manages React state, not GSAP animations).
- **Experience**: Straightforward conversion, removed `useEffect` import entirely.
- **Projects**: `handleRowHover` uses `setInterval` for text scramble (not GSAP), so it stays as `useCallback` without `contextSafe`.
- **Contact**: Straightforward conversion, form state handlers and `handleSubmit` are pure React.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

### Files Exist
- `lib/gsap.ts` — FOUND
- `components/SmoothScrollProvider.tsx` — FOUND (modified)
- `components/Hero.tsx` — FOUND (modified)
- `components/About.tsx` — FOUND (modified)
- `components/Experience.tsx` — FOUND (modified)
- `components/Projects.tsx` — FOUND (modified)
- `components/Contact.tsx` — FOUND (modified)

### Commits Exist
- `4115843` — feat(01-02): install @gsap/react and create centralized lib/gsap.ts module
- `67ab79c` — fix(01-02): fix Lenis cleanup bug and add route-awareness to SmoothScrollProvider
- `e0106cf` — feat(01-02): migrate all 5 section components from useEffect+gsap.context to useGSAP hook

### Acceptance Criteria Verified
- All 5 components import from `@/lib/gsap` (not `from 'gsap'` directly) — PASS
- No component has `gsap.registerPlugin` — PASS
- No component has `typeof window` — PASS
- All 5 components have `useGSAP(` — PASS
- No component has `ctx.revert()` — PASS
- No component has `gsap.context(` — PASS
- `lib/gsap.ts` is the only file with `gsap.registerPlugin` — PASS
- `SmoothScrollProvider` uses named `rafCallback` reference — PASS
- `SmoothScrollProvider` has `ScrollTrigger.getAll().forEach` in pathname-dependent useEffect — PASS
- No GSAP-related TypeScript errors — PASS

## Self-Check: PASSED

## Known Stubs

None. All animation behavior is preserved from the original components. No hardcoded placeholder values introduced.
