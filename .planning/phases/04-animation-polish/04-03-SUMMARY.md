---
phase: 04-animation-polish
plan: "03"
subsystem: animations
tags: [gsap, matchMedia, accessibility, mobile, reduced-motion]
dependency_graph:
  requires: [04-01]
  provides: [experience-matchmedia, contact-matchmedia, projects-matchmedia]
  affects: [components/Experience.tsx, components/Contact.tsx, components/Projects.tsx]
tech_stack:
  added: []
  patterns: [gsap.matchMedia, useGSAP, centralized-gsap-registration]
key_files:
  created:
    - lib/gsap.ts
  modified:
    - components/Experience.tsx
    - components/Contact.tsx
    - components/Projects.tsx
decisions:
  - "Experience row rotation removed -- rotate: ±1.5deg imperceptible, x + opacity only is cleaner"
  - "Contact form clip direction changed to right-to-left (inset(0 100% 0 0)) matching label clip for editorial consistency"
  - "Projects rotate: 0.5 removed from rows -- same rationale as Experience, adds complexity without visual payoff"
  - "gsap.matchMedia pattern applied to all three components matching Plan 01 Hero+About approach"
  - "lib/gsap.ts created as Rule 3 prerequisite -- required since @/lib/gsap import pattern used in all plan actions"
metrics:
  duration: "6 minutes"
  completed_date: "2026-04-02"
  tasks_completed: 3
  files_modified: 4
---

# Phase 04 Plan 03: Experience/Contact/Projects matchMedia Summary

matchMedia wrapping + easing overhaul applied to Experience, Contact, and Projects -- all five landing page sections now have mobile-simplified and reduced-motion-instant variants.

## What Was Built

All three remaining landing page components (Experience.tsx, Contact.tsx, Projects.tsx) were refactored from the old `useEffect` + `gsap.context` pattern to `useGSAP` + `gsap.matchMedia`. Each component now has three animation contexts:

1. **Desktop** (`min-width: 768px`) -- full durations, offsets, scale effects
2. **Mobile** (`max-width: 767px`) -- reduced offsets (30px vs 60px), shorter durations (0.4s max), no scale/rotation
3. **Reduced motion** -- instant final state via `gsap.set` + `clearProps: 'all'`, no animations whatsoever

Additionally, rotation was removed from Experience rows and Projects rows (both were `±1.5deg` / `0.5deg` -- imperceptible at small angles, added jank on mobile), and the Contact form clip direction was changed from bottom-up to right-to-left for editorial consistency with the label reveal pattern.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Experience.tsx easing overhaul + matchMedia | 926d65f | components/Experience.tsx, lib/gsap.ts |
| 2 | Contact.tsx easing overhaul + matchMedia | f8960f9 | components/Contact.tsx |
| 3 | Projects.tsx easing overhaul + matchMedia | 61dceee | components/Projects.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created lib/gsap.ts (prerequisite from Plan 01)**

- **Found during:** Task 1 setup
- **Issue:** Plan's action code uses `import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'` but `lib/gsap.ts` did not exist in this worktree (Plan 01, which created it, executed on a different worktree branch). Without this file, TypeScript imports would fail.
- **Fix:** Created `lib/gsap.ts` with centralized plugin registration (`ScrollTrigger`, `SplitText`, `DrawSVGPlugin`, `useGSAP`) matching the main branch implementation.
- **Files modified:** `lib/gsap.ts` (new file)
- **Commit:** 926d65f

**2. [Plan scope] useEffect + gsap.context to useGSAP migration**

- **Observed:** All three components were still using the old `useEffect` + `gsap.context` pattern (not yet migrated by Plan 01 in this worktree).
- **Action:** Applied the `useGSAP` pattern as specified in the plan actions -- this is what the plan intended, even though the plan's "interfaces" section showed the old code as current context. The plan's action blocks use `useGSAP` throughout, so the migration was applied as planned.

## Verification Results

1. `npx tsc --noEmit` -- PASS (no TypeScript errors across all three tasks)
2. `npm run build` -- PASS (all 7 pages generated, no build errors)
3. Experience.tsx: no rotation in animations, has matchMedia with all three conditions
4. Contact.tsx: form clip is right-to-left `inset(0 100% 0 0)`, has matchMedia with all three conditions
5. Projects.tsx: has matchMedia with all three conditions, scramble hover (`handleRowHover`, `SCRAMBLE_CHARS`) preserved
6. All components preserve existing JSX, data arrays, and non-animation functionality

## Known Stubs

None. All animation changes are complete and fully wired.

## Self-Check: PASSED

Files created/modified:
- FOUND: lib/gsap.ts
- FOUND: components/Experience.tsx
- FOUND: components/Contact.tsx
- FOUND: components/Projects.tsx

Commits:
- FOUND: 926d65f (feat(04-03): Experience.tsx easing overhaul + matchMedia)
- FOUND: f8960f9 (feat(04-03): Contact.tsx easing overhaul + matchMedia)
- FOUND: 61dceee (feat(04-03): Projects.tsx easing overhaul + matchMedia)
