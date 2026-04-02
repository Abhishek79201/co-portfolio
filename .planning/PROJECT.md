# Dev Studio Portfolio

## What This Is

A two-person dev startup studio website for Abhishek Vaghela and Vatsal Zinzuvadiya — two full-stack developers who've been building together since their time at Screenplay and X-Byte Solutions (both GEC Modasa alumni). The site positions them as a tech partner team that takes on projects, builds MVPs, and scales them up. It features deep technical case studies showcasing their architecture decisions (Redis + OpenSearch optimizations, DynamoDB cost reduction, MVP-to-scale methodology) alongside a project portfolio.

## Core Value

Two developers who've shipped together prove they can ship for you — the case studies are the proof, the site is the pitch.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Single-page portfolio with smooth scroll — existing
- ✓ Dark UI aesthetic with accent colors (violet, pink, cyan, lime) — existing
- ✓ GSAP + Lenis animation system — existing
- ✓ SEO setup with structured data — existing
- ✓ Responsive, accessible design — existing
- ✓ Project showcase section — existing
- ✓ Contact section with form — existing
- ✓ Typed data layer for projects, team, case studies — Validated in Phase 1: Infrastructure Foundation
- ✓ Centralized GSAP registration with useGSAP hook migration — Validated in Phase 1
- ✓ Route-aware SmoothScrollProvider with proper cleanup — Validated in Phase 1
- ✓ Case studies routing skeleton (`/case-studies`, `/case-studies/[slug]`) — Validated in Phase 1
- ✓ Route-aware Navigation with cross-page hash links — Validated in Phase 1
- ✓ Shared Footer component — Validated in Phase 1
- ✓ Clean sitemap with real routes (no hash fragments) — Validated in Phase 1
- ✓ @supabase/supabase-js removed — Validated in Phase 1
- ✓ Case studies index page with browsable project cards — Validated in Phase 3: Case Study Pages
- ✓ Case study detail page template (8 sections: Hero, Challenge, Architecture, Tech Rationale, Implementation, Results, Team, CTA) — Validated in Phase 3
- ✓ Deep case studies for GleeMeet, CareerBox, Zorova with full written content — Validated in Phase 3
- ✓ Architecture SVG diagrams for all 3 case studies — Validated in Phase 3
- ✓ Redis + OpenSearch pattern narrative woven across case studies — Validated in Phase 3
- ✓ Team attribution per case study for both founders — Validated in Phase 3
- ✓ "Want similar results?" CTA on every case study — Validated in Phase 3
- ✓ PatternSpotlight shared component for Redis+OpenSearch+DB callouts — Validated in Phase 3
- ✓ Organization JSON-LD with two-founder array — Validated in Phase 5: SEO & Verification
- ✓ Dynamic OG images for all case studies — Validated in Phase 5
- ✓ Per-page openGraph and twitter card metadata — Validated in Phase 5
- ✓ Dead link policy (liveUrl field, conditional rendering) — Validated in Phase 5
- ✓ Image optimization re-enabled — Validated in Phase 5
- ✓ Clean robots.txt without phantom disallows — Validated in Phase 5
- ✓ Core Web Vitals green — Validated in Phase 5

### Active

<!-- Current scope. Building toward these. -->

- [x] Rebrand from personal portfolio to startup studio identity (placeholder name) — Hero, metadata, and Navigation rebranded in Phase 2 Plan 01
- [ ] Add team section showcasing both Abhishek and Vatsal with roles/skills
- [ ] Update hero/about to reflect "two devs, one studio" positioning
- [ ] Improve animation fluidity across all sections — smoother transitions, better scroll-linked effects
- [x] URL validation — verified live URLs, dead links render as non-clickable cards — Validated in Phase 5
- [x] Update metadata/SEO from personal branding to startup studio branding — Validated in Phase 2
- [x] Update schema.org JSON-LD from Person to Organization — Validated in Phase 5

### Out of Scope

- Blog/content section — not needed for v1, case studies serve the content purpose
- Individual team member portfolio pages — the studio is the brand, not individuals
- Client testimonials — no testimonials infrastructure needed yet
- Pricing page — not quoting publicly
- Authentication/login — static site, no user accounts
- CMS/admin panel — content is hardcoded, manageable at this scale
- Mobile app — web only

## Context

**Existing codebase:** Next.js 15 + React 19 single-page app deployed on Vercel. Uses GSAP 3.14 for animations, Lenis for smooth scroll, Tailwind CSS 4 for styling, shadcn/ui components. All project data is hardcoded in components. Dark theme with custom Flagfies display font.

**Team background:**
- **Abhishek Vaghela** — Full Stack Developer, 5+ years. React, Node.js, TypeScript, MongoDB, AWS, Docker. Currently at CareerBox.in, previously Screenplay, X-Byte, Simform, Impactoverse.
- **Vatsal Zinzuvadiya** — Full Stack Developer, 3+ years. Node.js, TypeScript, DynamoDB, Redis, OpenSearch, GraphQL, Kafka, Microservices, Docker, AWS ECS. Currently at Screenplay, previously X-Byte, Cognisun.

**Shared history:** Both worked at Screenplay (current) and X-Byte Solutions. Both alumni of GEC Modasa. Both built GleeMeet together (dating app with Redis + OpenSearch + DynamoDB). This shared experience is the foundation of the startup pitch.

**Key technical differentiator:** Their architecture pattern of combining Redis caching + OpenSearch for search/analytics + primary DB (DynamoDB or MongoDB) to reduce query costs and server load. Applied this pattern across GleeMeet, CareerBox, and Zorova.

**Projects detail:**
1. **GleeMeet.com** — Dating app. Node.js, AWS, DynamoDB, Firebase, OpenSearch with BERT vector embeddings + KNN for matching, Redis + Bull Queue. Both Abhishek and Vatsal built this.
2. **CareerBox.in** — Career/job platform. MongoDB + Redis + OpenSearch. MVP-first approach, then scaled. Abhishek currently working here.
3. **Zorova.in** — Home spa service (client project). MERN stack + Redis + OpenSearch. Zeel-competitor-style marketplace for India.
4. **EmpireInvestmentBank.com** — Banking/investment broker used across 4 regions.
5. **Huslemad.com** — Productivity platform (existing showcase).
6. **Impactoverse.com** — Social impact platform (existing showcase).

## Constraints

- **Tech stack**: Must stay on Next.js + React + Tailwind + GSAP — existing proven stack
- **Hosting**: Vercel deployment (existing infrastructure)
- **Design**: Keep existing dark aesthetic — improve, don't replace
- **Content**: All data remains hardcoded in components (no CMS needed at this scale)
- **URLs**: Every project link must be verified as live before being added to the site

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Case studies as separate route (`/case-studies`) | Gives each project the depth it deserves without cluttering the landing page | -- Pending |
| Keep all 6 projects (old + new) | Shows breadth of experience; Huslemad and Impactoverse still demonstrate range | -- Pending |
| Placeholder startup name | User wants to decide the name later; site structure shouldn't depend on final name | -- Pending |
| Hardcoded content (no CMS) | Only 2 team members and 6 projects — CMS is overkill, adds complexity | -- Pending |
| Zorova positioned as client work | Demonstrates the startup takes on client projects, not just internal products | -- Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-02 after Phase 5 completion*
