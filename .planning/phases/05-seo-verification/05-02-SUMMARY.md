---
phase: 05-seo-verification
plan: 02
subsystem: seo
tags: [nextjs, typescript, robots, sitemap, image-optimization, project-data]

# Dependency graph
requires:
  - phase: 05-seo-verification
    provides: SEO context, research on URL liveness, dead link policy decisions
provides:
  - GleeMeet URL typo fixed (gleemeet.com not gleemet.com)
  - liveUrl field on Project interface for dead-link policy enforcement
  - Conditional link rendering in Projects.tsx (4 clickable, 2 non-clickable)
  - Next.js image optimization re-enabled (unoptimized flag removed)
  - Clean robots.txt without phantom disallow rules
  - Zero raw img tags confirmed (D-10 audit)
affects: [future-project-additions, seo-audit, image-optimization]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Dead link policy: liveUrl optional field on Project, rendered as <a> when truthy and <div> when falsy"
    - "Projects.tsx imports from data/projects.ts (centralized data) instead of inline hardcoded array"

key-files:
  created: []
  modified:
    - data/types.ts
    - data/projects.ts
    - components/Projects.tsx
    - next.config.js
    - app/robots.ts

key-decisions:
  - "liveUrl optional field on Project interface — set only for verified-live sites, undefined renders non-clickable card (dead link policy D-08)"
  - "Projects.tsx refactored to import from data/projects.ts — eliminates stale inline copy of project data"
  - "ArrowUpRight icon only rendered for live projects — non-clickable cards have no affordance for links"
  - "robots.txt phantom disallows removed — /private/ and /admin/ never existed, listing implies existence"

patterns-established:
  - "Dead link rendering: use liveUrl? field + dynamic Tag variable for conditional <a>/<div> in project cards"
  - "D-10 img audit: run grep before removing images.unoptimized flag to confirm safe"

requirements-completed: [SEO-04, SEO-05, SEO-07]

# Metrics
duration: 6min
completed: 2026-04-02
---

# Phase 05 Plan 02: URL Verification & Image Optimization Summary

**Dead-link policy enforced via liveUrl field: 4 live project links clickable, 2 unreachable sites (Zorova, Huslemad) rendered as non-clickable cards; GleeMeet typo fixed (gleemet.com -> gleemeet.com); image optimization re-enabled; robots.txt cleaned of phantom disallow rules**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-02T10:24:52Z
- **Completed:** 2026-04-02T10:31:00Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Fixed GleeMeet URL typo (gleemet.com -> gleemeet.com, missing 'e') and added liveUrl field to Project interface
- Implemented conditional link rendering: 4 live projects render as clickable `<a>` tags, Zorova and Huslemad render as non-clickable `<div>` cards
- Refactored Projects.tsx to import from centralized data/projects.ts (eliminating stale inline copy of 4 projects)
- Removed `images: { unoptimized: true }` from next.config.js — D-10 audit confirmed zero raw `<img>` tags, safe to re-enable Next.js image optimization
- Cleaned robots.ts: removed `disallow: ['/private/', '/admin/']` — these paths do not exist and listing them implies their existence to crawlers
- Verified sitemap.ts is complete: includes /, /case-studies, dynamic case study routes via caseStudies import

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix GleeMeet URL, add liveUrl field, conditional link rendering** - `56aadba` (feat)
2. **Task 2: Audit img tags, remove image unoptimized flag, clean robots.txt** - `85ca611` (fix)

**Plan metadata:** see final docs commit

## Files Created/Modified

- `data/types.ts` - Added `liveUrl?: string` optional field to Project interface
- `data/projects.ts` - Fixed GleeMeet URL, added liveUrl for 4 live sites, added type badge, Empire Investment Bank and Zorova entries updated
- `components/Projects.tsx` - Imports from data/projects.ts, conditional Tag rendering based on liveUrl, ArrowUpRight only for live projects
- `next.config.js` - Removed images: { unoptimized: true } flag (image optimization re-enabled)
- `app/robots.ts` - Removed disallow rules for non-existent /private/ and /admin/ paths

## Decisions Made

- Dead link policy: `liveUrl` optional field on Project interface. Set only for verified-live URLs. When undefined, project card renders as `<div>` with no href — no disabled state, no tooltip, no visual indicator (per D-08: silent removal).
- ArrowUpRight icon only shown for live (clickable) projects — non-clickable cards have no link affordance
- Projects.tsx now imports from `data/projects.ts` instead of maintaining its own inline copy — this was required to access the new `liveUrl` field and keeps data in sync with the rest of the app

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Projects.tsx had stale inline data out of sync with data/projects.ts**

- **Found during:** Task 1 (reviewing Projects.tsx)
- **Issue:** Projects.tsx maintained its own hardcoded array of 4 projects (missing Zorova and Empire Investment Bank), independent of `data/projects.ts`. The plan's required `project.liveUrl` conditional logic could not be applied without switching to the centralized data source.
- **Fix:** Refactored Projects.tsx to import `projects` from `@/data/projects`, removing the inline array entirely. Now renders all 6 projects with conditional link rendering.
- **Files modified:** `components/Projects.tsx`
- **Verification:** TypeScript compiles cleanly, build passes, all 6 projects visible
- **Committed in:** 56aadba (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug: stale inline data)
**Impact on plan:** Required fix to achieve the plan's conditional link rendering goal. The inline copy was missing Zorova and Empire Investment Bank. Switching to centralized data was necessary, not scope creep.

## Issues Encountered

None — D-10 audit confirmed zero raw `<img>` tags at execution time (consistent with research). TypeScript compiled cleanly after both tasks. Build succeeded with all 11 static pages generated.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All project URLs are now accurately represented with the dead-link policy enforced
- Image optimization re-enabled — Next.js will automatically serve WebP/AVIF with proper srcset and lazy loading
- Robots.txt is clean and accurate for crawlers
- Plan 03 can proceed with schema.org JSON-LD migration (Organization type) and OG image implementation

## Self-Check: PASSED

- SUMMARY.md: FOUND at .planning/phases/05-seo-verification/05-02-SUMMARY.md
- data/types.ts: FOUND (liveUrl optional field added)
- data/projects.ts: FOUND (GleeMeet URL fixed, 4 liveUrl fields set)
- components/Projects.tsx: FOUND (imports from data/projects.ts, conditional rendering)
- next.config.js: FOUND (unoptimized flag removed)
- app/robots.ts: FOUND (phantom disallows removed)
- Commit 56aadba: FOUND (Task 1)
- Commit 85ca611: FOUND (Task 2)

---
*Phase: 05-seo-verification*
*Completed: 2026-04-02*
