---
phase: 01-infrastructure-foundation
plan: 03
subsystem: routing
tags: [next.js, routing, navigation, case-studies, footer, sitemap, gsap]

# Dependency graph
requires:
  - phase: 01-infrastructure-foundation/01-01
    provides: data/ directory with typed Project, CaseStudy, TeamMember interfaces
  - phase: 01-infrastructure-foundation/01-02
    provides: lib/gsap.ts centralized GSAP module, useGSAP-migrated components
provides:
  - Case studies route skeleton (/case-studies and /case-studies/[slug])
  - Shared Footer component extracted from Contact
  - Route-aware Navigation with Case Studies link and hash-nav from any page
  - Rewritten sitemap with real routes (no hash fragments)
affects: [phase-02-content, phase-03-case-studies, phase-04-animation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Next.js 15 async params pattern: params: Promise<{ slug: string }> awaited in Server Components"
    - "dynamicParams = false with generateStaticParams for static-only dynamic routes"
    - "Route-aware navigation: usePathname + useRouter for cross-route hash link handling"
    - "Server Component Footer: no use client needed, renders outside layout"

key-files:
  created:
    - components/Footer.tsx
    - app/case-studies/layout.tsx
    - app/case-studies/page.tsx
    - app/case-studies/[slug]/page.tsx
  modified:
    - components/Contact.tsx
    - components/Navigation.tsx
    - app/page.tsx
    - app/sitemap.ts

key-decisions:
  - "Footer extracted as Server Component with max-w wrapper so it works standalone outside section containers"
  - "Footer rendered in both app/page.tsx and app/case-studies/layout.tsx rather than in Contact.tsx"
  - "dynamicParams = false ensures invalid slugs return 404 without needing custom not-found page"
  - "Separate scroll effects in Navigation: global scrolled state (all routes) + homepage-only scroll-spy"
  - "Sitemap data-driven via caseStudies import so new case studies auto-appear"

patterns-established:
  - "Pattern: Nested layout for sub-routes (app/case-studies/layout.tsx) provides consistent chrome without duplicating root layout"
  - "Pattern: Route-aware hash navigation checks pathname before deciding push vs default anchor"

requirements-completed: [ROUT-01, ROUT-02, ROUT-03, ROUT-04, ROUT-05, ROUT-06, ROUT-07]

# Metrics
duration: 25min
completed: 2026-04-01
---

# Phase 01 Plan 03: Case Studies Routing Skeleton Summary

**Multi-page routing structure with shared Footer, route-aware Navigation (usePathname + useRouter), and data-driven sitemap — all 3 case study slugs statically generated at build time**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-04-01T00:00:00Z
- **Completed:** 2026-04-01
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Created complete case studies routing skeleton: index page listing 3 projects with hasCaseStudy, detail pages with Next.js 15 async params and generateStaticParams
- Extracted shared Footer component (now includes both founders in copyright); removed embedded footer from Contact.tsx
- Made Navigation route-aware: hash links from /case-studies route push to /#section, Case Studies link added, active state works on all routes
- Rewrote sitemap.ts: replaced hash fragment URLs with real routes (/case-studies and /case-studies/[slug] for all 3 slugs)
- Build generates 11 static pages including all 3 case study routes; typecheck passes

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract Footer and create case studies route skeleton** - `46a4d0d` (feat)
2. **Task 2: Make Navigation route-aware and rewrite sitemap** - `740a60c` (feat)

**Prerequisites commit:** `cefb591` (chore: apply prerequisite changes from plans 01-01 and 01-02)

## Files Created/Modified
- `components/Footer.tsx` - New shared Server Component with both founders in copyright and max-w container
- `components/Contact.tsx` - Removed embedded footer element (footer now rendered via page/layout)
- `components/Navigation.tsx` - Added usePathname, useRouter, handleNavClick, Case Studies link, route-aware active/scroll state
- `app/page.tsx` - Added Footer import and render after Contact
- `app/case-studies/layout.tsx` - New nested layout with Navigation and Footer chrome
- `app/case-studies/page.tsx` - Index page filtering projects by hasCaseStudy, linking to detail routes
- `app/case-studies/[slug]/page.tsx` - Detail page with async params, dynamicParams=false, generateStaticParams, structured sections
- `app/sitemap.ts` - Rewritten to include /case-studies and /case-studies/[slug] routes from data layer, no hash fragments

## Decisions Made
- Footer as Server Component with its own max-w wrapper so it renders correctly in both landing page and case studies layout
- `dynamicParams = false` means invalid slugs get 404 without needing a custom not-found.tsx
- Navigation uses two separate useEffect hooks: one for global scroll state (all routes), one for homepage-only scroll-spy
- Sitemap imports from data/case-studies.ts so adding new case studies in data automatically updates the sitemap

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written.

## Known Stubs

The case study detail pages render content from `data/case-studies.ts` which contains placeholder content for challenge, architecture, and results sections (e.g., "Content coming in Phase 3"). This is intentional — the routing skeleton is correct; content will be filled in Phase 3 (case-studies-content plan). The routing, params, 404 handling, and section structure are all production-ready.

## Self-Check

Files verified:
- `components/Footer.tsx` — exists, contains role="contentinfo", both founders in copyright
- `components/Contact.tsx` — no longer contains `<footer` element
- `app/case-studies/layout.tsx` — exists, imports Navigation and Footer
- `app/case-studies/page.tsx` — exists, imports from @/data/projects, filters hasCaseStudy
- `app/case-studies/[slug]/page.tsx` — exists, dynamicParams=false, async params, generateStaticParams, caseStudies import
- `components/Navigation.tsx` — contains usePathname, useRouter, handleNavClick, Case Studies link
- `app/sitemap.ts` — no hash fragments, imports caseStudies from data layer
- Build: 11 static pages generated, typecheck passes
