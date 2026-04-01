---
phase: 02-landing-page-rebrand
plan: 01
subsystem: ui
tags: [next.js, react, gsap, tailwind, metadata, seo, navigation, hero]

# Dependency graph
requires:
  - phase: 01-infrastructure-foundation
    provides: Route-aware Navigation foundation, centralized GSAP lib, typed data layer

provides:
  - Studio-branded Hero section with preserved CharLine/scramble/blob/counter animations
  - Studio metadata in title, OG tags, Twitter cards, JSON-LD name/description
  - Updated Navigation with Team/Journey/How We Work/Projects/Case Studies/Contact links and route-aware scroll-spy

affects:
  - 02-02 (About/Team section — uses #team section ID established here)
  - 02-03 (Experience section — uses #experience ID, scroll-spy array already updated)
  - 02-04 (Methodology section — #methodology already in scroll-spy array)
  - 02-05+ (Any plan touching metadata or Navigation)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "usePathname for route-aware Navigation active state detection"
    - "handleNavClick for cross-page hash navigation from non-homepage routes"
    - "TODO comments mark all studio name placeholder occurrences for easy find-and-replace"

key-files:
  created: []
  modified:
    - components/Hero.tsx
    - app/layout.tsx
    - components/Navigation.tsx

key-decisions:
  - "Use 'Dev Studio' as two-word placeholder (fits CharLine two-line hero display per Pitfall 2 character count concern)"
  - "Navigation now uses usePathname for Case Studies route-aware active state (Rule 2: missing critical functionality)"
  - "handleNavClick added to support cross-page hash navigation when on /case-studies route"
  - "JSON-LD @type stays 'Person' — schema migration to Organization is Phase 5 (SEO-01)"
  - "worksFor removed from JSON-LD — studio IS the entity, not employed by someone"

patterns-established:
  - "TODO: Replace 'Dev Studio' comment marks all placeholder occurrences — find-and-replace friendly"
  - "Navigation scroll-spy array in reverse DOM order: ['contact', 'projects', 'methodology', 'experience', 'team']"

requirements-completed: [STUD-01, STUD-09]

# Metrics
duration: 12min
completed: 2026-04-01
---

# Phase 02 Plan 01: Hero, Metadata, Navigation Rebrand Summary

**Studio identity established across Hero, site metadata, and Navigation — "Dev Studio" placeholder with preserved GSAP animations and route-aware navigation for Case Studies link**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-04-01T13:30:00Z
- **Completed:** 2026-04-01T13:42:19Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Hero section rewritten as studio identity with "Dev Studio" placeholder, DEV STUDIO scramble, studio description, and 3 studio metrics (6+ Products Shipped, 3+ Yrs Building Together, 2 Founders) — all GSAP animations preserved unchanged
- Site metadata fully rebranded to "Dev Studio" across title, description, keywords, authors, OG tags, Twitter cards, and JSON-LD name/jobTitle — JSON-LD @type remains Person for Phase 5 migration
- Navigation updated with 6 items (Team, Journey, How We Work, Projects, Case Studies, Contact), scroll-spy tracking all 5 homepage sections, and route-aware active state for Case Studies

## Task Commits

Each task was committed atomically:

1. **Task 1: Rebrand Hero section for studio identity** - `df2e7e7` (feat)
2. **Task 2: Update site metadata for studio branding** - `7e3154b` (feat)
3. **Task 3: Update Navigation for new section labels and scroll-spy** - `4785a89` (feat)

## Files Created/Modified
- `components/Hero.tsx` - Studio-branded hero with Dev/Studio CharLine, DEV STUDIO scramble, studio description, renamed stat vars (productsCount/yearsCount/foundersCount), updated CTAs and scroll link
- `app/layout.tsx` - Studio metadata across all fields, JSON-LD with Dev Studio name, worksFor removed
- `components/Navigation.tsx` - 6 nav items, updated scroll-spy array, usePathname for route-aware Case Studies active state

## Decisions Made
- Used "Dev Studio" as placeholder name — fits two-line CharLine display and keeps character count similar to original (Pitfall 2 avoided)
- Added `usePathname` to Navigation for Case Studies active state — this link goes to `/case-studies` route, not a hash link, and needs pathname-based detection
- Added `handleNavClick` to handle cross-page navigation (clicking hash links while on `/case-studies` route)
- Kept `worksFor` removed from JSON-LD — the studio is the entity itself, not an employee of another organization

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added route-aware Case Studies active state and cross-page hash navigation**
- **Found during:** Task 3 (Navigation update)
- **Issue:** Plan added "Case Studies" nav item linking to `/case-studies` (a route, not a hash). Without `usePathname`, the active state check (which only compares `active === item.href.slice(1)`) would always be false for this item. Additionally, clicking hash links while on the `/case-studies` page would not navigate back to the homepage — the link would just change the hash in the current URL.
- **Fix:** Added `usePathname` import and import from `next/navigation`. Updated `useEffect` to check `pathname !== '/'` before running scroll-spy (homepage-only). Added `handleNavClick` that triggers `window.location.href = '/' + href` for hash links when on non-homepage routes. Updated active state logic to use `pathname.startsWith(item.href)` for non-hash links.
- **Files modified:** `components/Navigation.tsx`
- **Verification:** TypeScript check passes with zero errors; build completes successfully
- **Committed in:** `177fed7` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical functionality)
**Impact on plan:** Auto-fix necessary for Case Studies link to function correctly as a route link with active state. No scope creep.

## Known Stubs

The following intentional stubs exist — they are placeholder markers, not blocking stubs:

1. `components/Hero.tsx` line 1: `// TODO: Replace "Dev Studio" with final studio name when decided`
2. `components/Navigation.tsx` line 8: `// TODO: Replace "Dev Studio" with final studio name when decided`
3. `app/layout.tsx` line 34: `// TODO: Replace "Dev Studio" with final studio name when decided`

These TODOs are required by the plan (D-04) and mark all placeholder occurrences. They enable easy find-and-replace when the final studio name is decided. They do NOT prevent the plan's goal from being achieved.

## Issues Encountered
- First `npm run build` run (background process) returned a transient "SyntaxError: Unexpected end of JSON input" — this was a race condition from two background build processes. Second synchronous run completed successfully with all 7 pages generated.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- Hero section ready for visual verification — "Dev Studio" placeholder visible, all GSAP animations preserved
- Metadata ready — search engines will index studio branding on next crawl
- Navigation ready — scroll-spy will activate when corresponding section IDs (team, experience, methodology) are implemented in their respective plans
- Note: `#team`, `#experience`, `#methodology` section IDs are referenced in scroll-spy but the actual sections still have old IDs — these will be updated in plans 02-02 (About/Team) and 02-03 (Experience)

---
*Phase: 02-landing-page-rebrand*
*Completed: 2026-04-01*
