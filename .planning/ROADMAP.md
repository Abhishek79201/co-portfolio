# Roadmap: Dev Studio Portfolio

## Overview

Transform an existing single-page personal portfolio into a two-person dev studio website with multi-page routing, deep technical case studies, and a rebranded studio identity. The build sequence follows the dependency chain: data layer and scroll infrastructure first (everything else consumes it), then landing page rebrand (establishes visual identity for new pages), then case study pages (the primary conversion tool), then animation polish (premium feel), then SEO verification (final checklist before launch).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Infrastructure Foundation** - Data layer, GSAP/Lenis fixes, routing skeleton, dependency cleanup
- [x] **Phase 2: Landing Page Rebrand** - Studio identity, team section, project showcase, methodology (completed 2026-04-01)
- [ ] **Phase 3: Case Study Pages** - Index page, detail template, 3 deep-dive case studies with architecture diagrams
- [ ] **Phase 4: Animation & Polish** - SplitText, scroll reveals, diagram animations, mobile performance
- [ ] **Phase 5: SEO & Verification** - Schema migration, OG images, URL checks, Core Web Vitals
- [ ] **Phase 6: Studio Sections** - About rewrite, Team section, Methodology section (gap closure)
- [ ] **Phase 7: Landing Page Polish** - Contact studio framing, project labels, footer cleanup (gap closure)

## Phase Details

### Phase 1: Infrastructure Foundation
**Goal**: All content data is typed and centralized, scroll/animation bugs are fixed for multi-page routing, and the case studies route skeleton exists and renders
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07, INFRA-08, INFRA-09, ROUT-01, ROUT-02, ROUT-03, ROUT-04, ROUT-05, ROUT-06, ROUT-07
**Success Criteria** (what must be TRUE):
  1. All project, team, and case study data is importable from `data/` with full TypeScript type safety -- no content lives inside components
  2. Navigating between the landing page and `/case-studies` resets scroll position correctly and does not leak ScrollTrigger instances (verified by `ScrollTrigger.getAll().length` not growing)
  3. `/case-studies` renders a page with project cards and `/case-studies/[slug]` renders placeholder content for each of the 3 case study slugs
  4. Navigation links work correctly from any route -- hash links on non-homepage routes navigate back to the landing page sections
  5. The sitemap contains real routes (no hash fragments) and `@supabase/supabase-js` is removed from dependencies
**Plans**: 3 plans in 2 waves

Plans:
- [x] 01-01: Data layer extraction + dependency cleanup (INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-09)
- [x] 01-02: GSAP centralization + scroll/Lenis fixes (INFRA-05, INFRA-06, INFRA-07, INFRA-08)
- [x] 01-03: Case studies routing skeleton + navigation + sitemap (ROUT-01 through ROUT-07)

### Phase 2: Landing Page Rebrand
**Goal**: Visitors landing on the homepage see a professional dev studio with two named founders, a clear methodology, and a 6-project portfolio -- not a personal portfolio
**Depends on**: Phase 1
**Requirements**: STUD-01, STUD-02, STUD-03, STUD-04, STUD-05, STUD-06, STUD-07, STUD-08, STUD-09
**Success Criteria** (what must be TRUE):
  1. The hero and about sections communicate "two devs, one studio" positioning -- no remnants of single-person branding remain anywhere on the page
  2. A team section displays both Abhishek and Vatsal with equal billing, including roles, skills, and social links
  3. The project showcase displays all 6 projects sourced from `data/projects.ts`, with client vs. internal labels (Zorova = "Client", GleeMeet = "Co-built")
  4. A "How we work" methodology section explains the MVP-first approach in 3-4 steps
  5. The footer is a shared component visible on all pages, and all metadata/titles reflect studio branding
**Plans**: TBD
**UI hint**: yes

Plans:
- [x] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Case Study Pages
**Goal**: Prospective clients can read deep technical case studies that demonstrate architecture thinking, see system design diagrams, and understand the quantified impact of the studio's work
**Depends on**: Phase 2
**Requirements**: CASE-01, CASE-02, CASE-03, CASE-04, CASE-05, CASE-06, CASE-07, CASE-08, CASE-09, CASE-10
**Success Criteria** (what must be TRUE):
  1. The case studies index page at `/case-studies` displays filterable/browsable project cards that link to individual case study detail pages
  2. Each case study detail page follows the full template: Hero, Challenge, Architecture diagram, Tech Rationale, Implementation highlights, Results/metrics, Team attribution, and CTA
  3. All 3 priority case studies (GleeMeet, CareerBox, Zorova) have complete written content with architecture SVG diagrams showing system design
  4. The shared Redis + OpenSearch pattern is a visible narrative thread woven across case studies, and each case study ends with a "Want similar results? Let's talk" CTA
**Plans**: 4 plans in 3 waves
**UI hint**: yes

Plans:
- [x] 03-01-PLAN.md -- Expand CaseStudy types + author all 3 case study content (CASE-03, CASE-04, CASE-05, CASE-07, CASE-08, CASE-09)
- [x] 03-02-PLAN.md -- Index page redesign with pattern intro + rich cards (CASE-01, CASE-08)
- [x] 03-03-PLAN.md -- Architecture SVG diagrams for GleeMeet, CareerBox, Zorova (CASE-06)
- [x] 03-04-PLAN.md -- Detail page 8-section template + PatternSpotlight component (CASE-02, CASE-07, CASE-08, CASE-09, CASE-10)

### Phase 4: Animation & Polish
**Goal**: The site feels premium and fluid -- animations enhance comprehension of case study content and perform well on mobile devices with reduced-motion support
**Depends on**: Phase 3
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06, ANIM-07
**Success Criteria** (what must be TRUE):
  1. Hero and About text animations use GSAP SplitText instead of manual character/word splitting, with visibly smoother results
  2. Case study pages have scroll-triggered section reveals, architecture diagram trace animations, and metric counter animations that fire on scroll entry
  3. All animations respect `prefers-reduced-motion` in both CSS and GSAP, and mobile devices get simplified animation variants via `gsap.matchMedia()`
  4. Overall animation fluidity across existing landing page sections is noticeably improved compared to current state
**Plans**: 3 plans in 2 waves

Plans:
- [x] 04-01-PLAN.md -- Register SplitText + DrawSVGPlugin, migrate Hero + About to SplitText with matchMedia + easing overhaul (ANIM-01, ANIM-05, ANIM-06, ANIM-07)
- [x] 04-02-PLAN.md -- Case study page animations: section reveals, DrawSVG diagram tracing, metric card stagger + accent flash (ANIM-02, ANIM-03, ANIM-04, ANIM-05, ANIM-06)
- [x] 04-03-PLAN.md -- Experience + Contact + Projects easing overhaul + matchMedia for mobile + reduced motion (ANIM-05, ANIM-06, ANIM-07)

### Phase 5: SEO & Verification
**Goal**: The site is discoverable by search engines with correct structured data, all external links are verified live, and Core Web Vitals are green
**Depends on**: Phase 4
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07
**Success Criteria** (what must be TRUE):
  1. Schema.org JSON-LD uses Organization type with founder array, and each case study page has unique `generateMetadata` output (title, description)
  2. Dynamic OG images are generated per case study via `opengraph-image.tsx` and render correctly when shared on social platforms
  3. All 6 project URLs (gleemeet.com, careerbox.in, zorova.in, empireinvestmentbank.com, huslemad.com, impactoverse.com) are verified as live before being linked
  4. Core Web Vitals (LCP, CLS, INP) are green on both the landing page and at least one case study page, with `next/image` used properly (no `unoptimized: true`)
  5. Robots.txt and sitemap.xml are correct for all routes
**Plans**: TBD

Plans:
- [x] 05-01: TBD

### Phase 6: Studio Sections
**Goal**: The landing page has a rewritten About section with shared history, a Team section with equal-billing cards for both founders, and a "How we work" methodology section — completing the studio identity rebrand
**Depends on**: Phase 5
**Requirements**: STUD-02, STUD-03, STUD-05
**Gap Closure**: Closes 3 requirements + 3 integration issues + 1 flow issue from v1.0 audit
**Success Criteria** (what must be TRUE):
  1. About section communicates shared history (GEC Modasa → X-Byte → Screenplay) with studio framing — no "About me" personal language remains
  2. A #team section displays both Abhishek and Vatsal with equal billing, including roles, skills, and social links (GitHub, LinkedIn)
  3. A #methodology section explains the MVP-first → scale approach in 3-4 steps
  4. Navigation scroll-spy activates correctly for all nav items including Team and How We Work
  5. Hero scroll indicator points to a valid anchor
**Plans**: 2 plans in 1 wave
**UI hint**: yes

Plans:
- [x] 06-01-PLAN.md -- About.tsx full rewrite: studio narrative + stats counters + team cards (STUD-02, STUD-03)
- [ ] 06-02-PLAN.md -- New Methodology.tsx component + page.tsx insertion (STUD-05)

### Phase 7: Landing Page Polish
**Goal**: All remaining landing page sections reflect studio identity — project cards show type labels, Contact section uses studio voice, and only one footer landmark exists on the page
**Depends on**: Phase 6
**Requirements**: STUD-04, STUD-07, STUD-08
**Gap Closure**: Closes 3 requirements + 1 integration issue from v1.0 audit
**Success Criteria** (what must be TRUE):
  1. Project cards display type labels (Client, Co-built, Internal) sourced from `data/projects.ts` type field
  2. Contact section copy uses studio framing ("we" not "I") — no first-person singular remains
  3. Contact.tsx embedded `<footer role="contentinfo">` is removed — only Footer.tsx renders the contentinfo landmark
  4. Footer.tsx reflects studio identity (studio name, both founders in copyright)
**Plans**: TBD

Plans:
- [ ] 07-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure Foundation | 3/3 | Complete | 2026-04-01 |
| 2. Landing Page Rebrand | 1/1 | Complete | 2026-04-01 |
| 3. Case Study Pages | 4/4 | Complete | 2026-04-01 |
| 4. Animation & Polish | 3/3 | Complete | 2026-04-02 |
| 5. SEO & Verification | 1/1 | Complete | 2026-04-02 |
| 6. Studio Sections | 1/2 | In Progress|  |
| 7. Landing Page Polish | 0/0 | Not started | - |
