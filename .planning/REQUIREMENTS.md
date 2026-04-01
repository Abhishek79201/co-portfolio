# Requirements: Dev Studio Portfolio

**Defined:** 2026-04-01
**Core Value:** Two developers who've shipped together prove they can ship for you — the case studies are the proof, the site is the pitch.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Infrastructure

- [x] **INFRA-01**: Data layer extracted into `data/` directory with TypeScript interfaces (Project, CaseStudy, TeamMember)
- [x] **INFRA-02**: All 6 projects defined in `data/projects.ts` with full metadata (slug, tech stack, description, URL, type)
- [x] **INFRA-03**: Team data defined in `data/team.ts` for Abhishek and Vatsal (equal billing)
- [x] **INFRA-04**: Case study content files in `data/case-studies/` for GleeMeet, CareerBox, Zorova
- [x] **INFRA-05**: GSAP registration centralized in `lib/gsap.ts` — no per-component registration
- [x] **INFRA-06**: `@gsap/react` adopted — all animated components use `useGSAP` hook
- [x] **INFRA-07**: Lenis cleanup bug fixed (anonymous function reference leak in SmoothScrollProvider)
- [x] **INFRA-08**: SmoothScrollProvider is route-aware (scroll reset + ScrollTrigger.refresh on navigation)
- [x] **INFRA-09**: Remove unused `@supabase/supabase-js` dependency

### Routing

- [ ] **ROUT-01**: Case studies index page at `/case-studies` renders project cards
- [ ] **ROUT-02**: Individual case study pages at `/case-studies/[slug]` with `generateStaticParams` + `dynamicParams: false`
- [ ] **ROUT-03**: Next.js 15 async params handled correctly (`await params` pattern)
- [ ] **ROUT-04**: `case-studies/layout.tsx` provides shared navigation + footer chrome
- [ ] **ROUT-05**: Navigation is route-aware — hash links become `/#section` links on non-homepage routes
- [ ] **ROUT-06**: "Case Studies" link added to navigation menu
- [ ] **ROUT-07**: Sitemap updated with real routes (no hash fragments)

### Studio Identity

- [ ] **STUD-01**: Hero section rewritten for studio identity — "two devs, one studio" positioning
- [ ] **STUD-02**: About section updated with shared history narrative (GEC Modasa → Screenplay → X-Byte)
- [ ] **STUD-03**: Team section with equal-billing cards for Abhishek and Vatsal (photo, role, skills, GitHub, LinkedIn)
- [ ] **STUD-04**: Footer component extracted and shared across all pages (studio name, email, social links, copyright)
- [ ] **STUD-05**: "How we work" methodology section on landing page (MVP-first → scale approach, 3-4 steps)
- [ ] **STUD-06**: Project showcase section refactored to consume `data/projects.ts` with 6 projects
- [ ] **STUD-07**: Client vs internal project labels on project cards (Zorova = "Client", GleeMeet = "Co-built")
- [ ] **STUD-08**: Contact section copy updated from personal to studio framing
- [ ] **STUD-09**: Metadata/title updated from "Abhishek Vaghela" to studio branding (placeholder name)

### Case Studies

- [ ] **CASE-01**: Case study index page with filterable/browsable project cards
- [ ] **CASE-02**: Case study detail page template with sections: Hero → Challenge → Architecture → Tech Rationale → Implementation → Results → Team → CTA
- [ ] **CASE-03**: GleeMeet case study — dating app, Redis + OpenSearch + DynamoDB, BERT vector matching, real-time features
- [ ] **CASE-04**: CareerBox case study — career platform, MongoDB + Redis + OpenSearch, MVP-to-scale methodology
- [ ] **CASE-05**: Zorova case study — home spa service (client project), MERN + Redis + OpenSearch, marketplace architecture
- [ ] **CASE-06**: Architecture SVG diagrams per case study showing system design (services, databases, caching layers, data flow)
- [ ] **CASE-07**: Metric callout cards with qualitative impact descriptions (since exact numbers not available yet)
- [ ] **CASE-08**: Shared Redis + OpenSearch pattern narrative woven across case studies
- [ ] **CASE-09**: Team attribution per case study (who worked on what)
- [ ] **CASE-10**: "Want similar results? Let's talk" CTA at the bottom of each case study

### Animation

- [ ] **ANIM-01**: GSAP SplitText replaces manual character/word splitting in Hero and About
- [ ] **ANIM-02**: Scroll-triggered section reveals on case study pages (extend existing pattern)
- [ ] **ANIM-03**: Architecture diagram reveal animations (trace arrows, fade in components)
- [ ] **ANIM-04**: Metric counter animations on scroll entry
- [ ] **ANIM-05**: `gsap.matchMedia()` for reduced-motion variants on mobile
- [ ] **ANIM-06**: `prefers-reduced-motion` respected in both CSS and GSAP
- [ ] **ANIM-07**: Overall animation fluidity improvement across existing sections

### SEO & Verification

- [ ] **SEO-01**: Schema.org JSON-LD migrated from Person to Organization with founder array
- [ ] **SEO-02**: `generateMetadata` per case study page (unique title, description)
- [ ] **SEO-03**: Dynamic OG images per case study via `opengraph-image.tsx`
- [ ] **SEO-04**: All 6 project URLs verified as live before linking (gleemeet.com, careerbox.in, zorova.in, empireinvestmentbank.com, huslemad.com, impactoverse.com)
- [ ] **SEO-05**: `images: { unoptimized: true }` removed from next.config.js; `next/image` used properly
- [ ] **SEO-06**: Core Web Vitals green on landing page and case study pages (LCP, CLS, INP)
- [ ] **SEO-07**: Robots.txt verified correct for new routes

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Content

- **CONT-01**: Blog/articles section for technical writing
- **CONT-02**: Client testimonials section (once real quotes are available)
- **CONT-03**: Exact quantified metrics for case studies (when measured)
- **CONT-04**: Case studies for EmpireInvestmentBank, Huslemad, Impactoverse (shallow case studies for now, deep-dive later)

### Enhanced UI

- **UI-01**: Page transition animations via `next-transition-router`
- **UI-02**: GSAP Flip plugin for card-to-case-study transitions
- **UI-03**: Session-aware animation state (skip entry animations on back-navigation)

### Infrastructure

- **INFR-01**: Production domain setup (currently placeholder)
- **INFR-02**: Contact form backend (replace mailto with actual form submission)
- **INFR-03**: Unused shadcn/ui component audit and cleanup

## Out of Scope

| Feature | Reason |
|---------|--------|
| Pricing page | Limits negotiation; qualify leads through conversation |
| Services page | The case studies ARE the services page -- let the work demonstrate capabilities |
| Individual team member portfolio pages | Splits the brand; the studio is the entity prospects hire |
| Dark/light mode toggle | Dark aesthetic IS the brand identity; doubles design surface for zero benefit |
| CMS / admin panel | 6 projects, 2 team members -- hardcoded TypeScript is manageable; revisit at 20+ |
| Live chat widget | Two people can't staff it; unanswered chats hurt more than no chat |
| Loading/splash screen | Anti-pattern that hides slow sites; make the site fast instead |
| Complex contact form | Long forms kill conversion; 3 fields max, qualify in email |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| INFRA-04 | Phase 1 | Pending |
| INFRA-05 | Phase 1 | Complete |
| INFRA-06 | Phase 1 | Complete |
| INFRA-07 | Phase 1 | Complete |
| INFRA-08 | Phase 1 | Complete |
| INFRA-09 | Phase 1 | Pending |
| ROUT-01 | Phase 1 | Pending |
| ROUT-02 | Phase 1 | Pending |
| ROUT-03 | Phase 1 | Pending |
| ROUT-04 | Phase 1 | Pending |
| ROUT-05 | Phase 1 | Pending |
| ROUT-06 | Phase 1 | Pending |
| ROUT-07 | Phase 1 | Pending |
| STUD-01 | Phase 2 | Pending |
| STUD-02 | Phase 2 | Pending |
| STUD-03 | Phase 2 | Pending |
| STUD-04 | Phase 2 | Pending |
| STUD-05 | Phase 2 | Pending |
| STUD-06 | Phase 2 | Pending |
| STUD-07 | Phase 2 | Pending |
| STUD-08 | Phase 2 | Pending |
| STUD-09 | Phase 2 | Pending |
| CASE-01 | Phase 3 | Pending |
| CASE-02 | Phase 3 | Pending |
| CASE-03 | Phase 3 | Pending |
| CASE-04 | Phase 3 | Pending |
| CASE-05 | Phase 3 | Pending |
| CASE-06 | Phase 3 | Pending |
| CASE-07 | Phase 3 | Pending |
| CASE-08 | Phase 3 | Pending |
| CASE-09 | Phase 3 | Pending |
| CASE-10 | Phase 3 | Pending |
| ANIM-01 | Phase 4 | Pending |
| ANIM-02 | Phase 4 | Pending |
| ANIM-03 | Phase 4 | Pending |
| ANIM-04 | Phase 4 | Pending |
| ANIM-05 | Phase 4 | Pending |
| ANIM-06 | Phase 4 | Pending |
| ANIM-07 | Phase 4 | Pending |
| SEO-01 | Phase 5 | Pending |
| SEO-02 | Phase 5 | Pending |
| SEO-03 | Phase 5 | Pending |
| SEO-04 | Phase 5 | Pending |
| SEO-05 | Phase 5 | Pending |
| SEO-06 | Phase 5 | Pending |
| SEO-07 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 49 total
- Mapped to phases: 49
- Unmapped: 0

---
*Requirements defined: 2026-04-01*
*Last updated: 2026-04-01 after roadmap creation*
