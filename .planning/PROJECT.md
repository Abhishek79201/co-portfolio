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

### Active

<!-- Current scope. Building toward these. -->

- [ ] Rebrand from personal portfolio to startup studio identity (placeholder name)
- [ ] Add team section showcasing both Abhishek and Vatsal with roles/skills
- [ ] Update hero/about to reflect "two devs, one studio" positioning
- [x] Add case studies page (`/case-studies`) with individual case study views (`/case-studies/[slug]`) — routing skeleton done in Phase 1, content in Phase 3
- [ ] Case study format: Problem → Architecture diagram → Tech stack → Implementation highlights → Results/metrics
- [x] Showcase 6 projects: GleeMeet, CareerBox, Zorova (client), EmpireInvestmentBank, Huslemad, Impactoverse — data layer complete in Phase 1
- [x] Add Zorova.in as new project — home spa service, MERN + Redis + OpenSearch (client project) — added in Phase 1 data layer
- [x] Add EmpireInvestmentBank.com — banking broker, 4 regions, investment banking services — added in Phase 1 data layer
- [ ] Deep case studies for key projects (GleeMeet, CareerBox, Zorova) highlighting Redis/OpenSearch/DynamoDB architecture
- [ ] Improve animation fluidity across all sections — smoother transitions, better scroll-linked effects
- [ ] URL validation — verify all project URLs (gleemeet.com, careerbox.in, zorova.in, empireinvestmentbank.com, huslemad.com, impactoverse.com) are live before linking
- [ ] Update metadata/SEO from personal branding to startup studio branding
- [ ] Update schema.org JSON-LD from Person to Organization

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
*Last updated: 2026-04-01 after Phase 1 completion*
