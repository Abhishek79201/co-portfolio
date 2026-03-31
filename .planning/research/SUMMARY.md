# Research Summary

**Project:** Dev Studio Portfolio (Abhishek + Vatsal)
**Synthesized:** 2026-04-01
**Overall Confidence:** HIGH

---

## 1. Executive Summary

This project transitions an existing single-page personal portfolio into a two-person dev studio site with multi-page routing, deep case study pages, and a rebranded studio identity. The research is clear on approach: the existing stack (Next.js 15, React 19, GSAP 3.14, Lenis, Tailwind v4) is sound and should not be replaced — the work is additive refactoring, not a rewrite. The single most important architectural decision is extracting content data out of components into a typed `data/` layer before building any new pages; this is the linchpin that all case study routing, static generation, and SEO depend on.

The biggest risks are scroll-related bugs that already exist in the codebase but are masked by the current single-page architecture. Specifically, the `SmoothScrollProvider` has a pre-existing Lenis cleanup bug (anonymous function reference leak) that will cause real degradation the moment multi-page routing is added. These must be addressed in the first phase, not retrofitted. The recommended build sequence is: data layer and scroll infrastructure first, then routing, then landing page rebrand, then case study pages, then SEO and polish.

The site's primary conversion tool is the case study pages — particularly architecture diagrams, tech rationale, and quantified metrics. Most small studios show screenshots; this studio's differentiator is showing system design thinking (Redis + OpenSearch + primary DB patterns, BERT vector embeddings, async job queues). The case studies should be written as technical narratives, not spec documents, and every claim should be backed by a number.

---

## 2. Stack Recommendations

**Source file:** `.planning/research/STACK.md` | **Confidence:** HIGH

### Keep As-Is (Locked)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.5.12 | Framework, SSR/SSG, routing |
| React | 19.0.0 | UI library |
| TypeScript | 5.6.3 | Type safety |
| GSAP | ^3.14.2 | Animation engine |
| Lenis | ^1.3.18 (bump to 1.3.21) | Smooth scrolling |
| Tailwind CSS | ^4.0.0 | Styling |
| shadcn/ui | N/A | UI components |
| Vercel | hosting | Deployment |

### Add

| Package | Version | Why |
|---------|---------|-----|
| `@gsap/react` | `^2.1.2` | `useGSAP` hook automates GSAP cleanup — mandatory for multi-page routing |
| `gsap/SplitText` | bundled in gsap | Free since GSAP 3.13; replaces fragile manual character/word splitting in Hero and About |
| `gsap/Flip` | bundled in gsap | Useful for card-to-case-study transitions; additive only |
| `next/og` | bundled in Next.js | Dynamic OG image generation per case study slug |
| `next-transition-router` | `^0.2.11` | Optional — animated page transitions; defer to v2 if not critical for v1 |

### Remove

- `@supabase/supabase-js` — no imports found anywhere; leftover from an experiment. Verify first, then remove to reduce bundle.

### Do Not Add

- Framer Motion — GSAP already handles everything; two animation systems is overhead with no benefit
- MDX / Contentlayer — 6 projects; TypeScript data files are the correct choice at this scale
- GSAP ScrollSmoother — Lenis is already working; switching breaks existing integration for no gain
- Mermaid.js at runtime — author diagrams in development, export as SVG, embed statically

### One Config Issue to Watch

The project has both a `tailwind.config.ts` (v3-style) AND `@tailwindcss/postcss` (v4-style). It works as-is. Low priority to consolidate, but flag for Phase 1 cleanup to avoid styling surprises.

---

## 3. Feature Landscape

**Source file:** `.planning/research/FEATURES.md` | **Confidence:** MEDIUM-HIGH

### Table Stakes (Must Have — Ship in v1)

| # | Feature | Notes |
|---|---------|-------|
| 1 | Studio identity hero | Rewrite copy: "two devs, one studio, we build things" — not a personal pitch |
| 2 | Team section (2 cards) | Headshots, roles, bios, GitHub/LinkedIn links |
| 3 | Project showcase grid (6 projects) | Restructure from existing 4-project list; add Zorova, EmpireInvestmentBank |
| 4 | Case study index page (`/case-studies`) | New route; cards linking to individual case studies |
| 5 | Case study detail pages (`/case-studies/[slug]`) | Highest-value conversion tool — see anatomy below |
| 6 | Responsive, fast-loading | Already handled by Next.js + Vercel; verify after adding new pages |
| 7 | Contact CTA / inquiry form | 3 fields max; update copy from personal to studio framing |
| 8 | SEO: Organization schema, OG images, meta tags | Migrate from Person to Organization schema |
| 9 | Route-aware navigation | Current hash-only nav breaks on any non-homepage route |
| 10 | Footer | Extract from Contact.tsx; shared across all pages |

### Case Study Page Anatomy (Priority Order Within a Case Study)

1. Hero with result-focused headline (e.g., "How we cut DynamoDB costs 60% while scaling to 50K users")
2. Project snapshot: client, timeline, team, tech badges, live link
3. The Challenge — narrative, not a spec document
4. Architecture diagram (static SVG preferred) — THE differentiator for a backend-focused studio
5. Tech stack rationale — "why Redis, not Memcached; why OpenSearch, not Elasticsearch alone"
6. Implementation highlights — 2-3 specific technical decisions
7. Results and metrics — quantified, before/after
8. Team attribution
9. CTA — "Want similar results? Let's talk."

### Differentiators (Ship These — They Create "These Guys Are Legit" Moments)

| Feature | Complexity | Value |
|---------|------------|-------|
| Architecture diagrams per case study | Med | THE key differentiator vs. screenshot-heavy studios |
| Shared technical pattern narrative (Redis + OpenSearch applied across projects) | Low | Signals methodology, not one-off work |
| Metric callout cards (large numbers: "60% cost reduction", "3x query speed") | Low | Visual anchors and social proof |
| "How we work" methodology section (landing page) | Low | Shows process maturity beyond "we write code" |
| Client vs. internal project labels | Low | Shows range: studio both builds products and takes client work |
| Tech stack grouping by layer (Frontend / Backend / Database / Search) | Low | Shows architectural thinking in how you present tools |

### Deliberately Defer (Anti-Features — Do Not Build)

- Blog — stale blog is worse than no blog; case studies ARE the content
- Testimonials — none ready; absence looks worse than section not existing
- Pricing page — limits negotiation; attract qualified leads via conversation
- Services page — the work IS the services page
- CMS / admin panel — 6 projects; TypeScript files are enough; revisit at 20+
- Individual team member portfolio pages — splits the brand
- Dark/light mode toggle — dark aesthetic IS the brand; light mode doubles design surface for zero conversion benefit
- Loading/splash screens — anti-patterns that hide slow sites; make the site fast instead
- Live chat — two people cannot staff it; unanswered chat hurts more than no chat

---

## 4. Architecture Approach

**Source file:** `.planning/research/ARCHITECTURE.md` | **Confidence:** HIGH

### Current Architecture Problems to Solve

1. No routing — everything is one page with `#hash` links
2. Data is trapped inside components (projects array in Projects.tsx, skills in About.tsx, etc.)
3. `SmoothScrollProvider` has no route awareness — scroll position is not reset on navigation
4. Navigation uses hash-only links that break on any non-homepage route
5. Sitemap lists hash fragments as URLs — invalid for real multi-page SEO

### Target Directory Structure

```
app/
  layout.tsx                    -- Root layout (providers, base metadata)
  page.tsx                      -- Landing page
  case-studies/
    layout.tsx                  -- Shared chrome (Nav + Footer) for all case study pages
    page.tsx                    -- Case studies index
    [slug]/
      page.tsx                  -- Individual case study (Server Component, async)
      opengraph-image.tsx       -- Dynamic OG image per slug

data/
  types.ts                      -- TypeScript interfaces (Project, CaseStudy, TeamMember)
  projects.ts                   -- All 6 projects
  team.ts                       -- Abhishek + Vatsal
  case-studies/
    gleemeet.ts
    careerbox.ts
    zorova.ts
    index.ts                    -- Barrel export + lookup helpers (getCaseStudyBySlug, etc.)

components/
  layout/       Navigation.tsx, Footer.tsx
  landing/      Hero, About, Team, Experience, ProjectShowcase, Contact
  case-studies/ CaseStudyCard, CaseStudyHero, CaseStudySection, TechStackDisplay, MetricsDisplay
  shared/       SmoothScrollProvider (route-aware), SectionAnimation
  ui/           shadcn/ui (unchanged)

lib/
  gsap.ts                       -- Single GSAP registration point (must have 'use client')
```

### Key Architectural Decisions

**1. TypeScript data files, not MDX or CMS**
6 projects, 2 team members. TypeScript data objects give type safety, IDE support, and zero runtime cost. The build enforces structure — a missing `metrics` field fails at compile time. Revisit at 20+ projects.

**2. Server Component pages, Client Component sections**
Page files in `app/` are Server Components. They import from `data/`, call `generateStaticParams` and `generateMetadata`, and pass data as props to Client Components. Client Components never import from `data/` directly. All data is resolved at build time; zero runtime data fetching.

**3. Route-aware `SmoothScrollProvider`**
Lenis initializes ONCE (not on every route change). On `usePathname()` change: call `lenis.scrollTo(0, { immediate: true })` to reset scroll position, then `ScrollTrigger.refresh()` after a single `requestAnimationFrame`. This prevents the scroll desync bug documented in lenis#319.

**4. Route-aware Navigation**
When on `/`: hash links use in-page smooth scroll (Lenis intercepts). When on any other route: hash links point to `/#section` to navigate back to landing page. "Case Studies" is a full route link always.

**5. Centralized GSAP registration**
All components import from `lib/gsap.ts`, which holds the single `gsap.registerPlugin()` call. No per-component registration guards scattered across components.

**6. `case-studies/layout.tsx` for shared chrome**
Landing page has a full-bleed immersive layout. Case study pages need consistent navigation chrome and footer from the top. Use Next.js nested layouts to keep these concerns separate.

**7. `template.tsx` for case study detail animations**
Use `template.tsx` (not `layout.tsx`) inside `[slug]/` if animations need to re-initialize when navigating between different case study pages. `layout.tsx` persists state across sibling routes — entry animations would only fire once and never replay.

**8. Static generation with `generateStaticParams`**
All 6 case study pages are pre-rendered at build time. Set `dynamicParams = false` to prevent unknown slugs from rendering at runtime. Zero runtime cost on Vercel.

**9. Next.js 15 async params**
`params` in dynamic routes is a `Promise` in Next.js 15. Page and `generateMetadata` functions must be `async` and `await params` before destructuring. This is a breaking change from Next.js 14 patterns.

### Data Flow Direction (Always Top-Down)

```
data/*.ts
  └── app/**/page.tsx (Server Components)  -- data resolved at build time
        └── components/** (Client Components)  -- receive data as serializable props
```

---

## 5. Critical Pitfalls

**Source file:** `.planning/research/PITFALLS.md` | **Confidence:** HIGH

### Pitfall 1: ScrollTrigger Memory Leaks on Route Changes [CRITICAL — Phase 1]

Stale ScrollTrigger instances from unmounted components accumulate with each navigation. Memory grows 10-50MB per navigation cycle; animations fire at wrong positions; eventual tab crash on mobile.

**Fix:** Adopt `@gsap/react`'s `useGSAP` hook to replace all manual `useEffect + gsap.context()` patterns. Call `ScrollTrigger.refresh()` after route change via `requestAnimationFrame`. Verify by running `ScrollTrigger.getAll().length` in DevTools after each navigation — the count must not grow.

### Pitfall 2: Pre-Existing Lenis Cleanup Bug [CRITICAL — Fix Immediately, Before Any Routes]

`SmoothScrollProvider.tsx` passes a new anonymous function to `gsap.ticker.remove()` instead of the original callback reference. JavaScript identity comparison means the ticker callback is never actually removed. On a single-page site this is masked; with routing, it leaks on every navigation and calls `raf()` on a destroyed Lenis instance.

**Fix:** Store the ticker callback in a `useRef`. Pass the exact same reference to both `gsap.ticker.add()` and `gsap.ticker.remove()`.

### Pitfall 3: Lenis Scroll Position Desync After Navigation [CRITICAL — Phase 1]

Without route awareness, Lenis retains the scroll position from the previous page when navigating. Case study pages open at random scroll positions; ScrollTrigger fires incorrectly; animations appear frozen.

**Fix:** On `usePathname()` change, call `lenis.scrollTo(0, { immediate: true })` then `ScrollTrigger.refresh()` after one `requestAnimationFrame`.

### Pitfall 4: Navigation Hash Links Break on Non-Homepage Routes [CRITICAL — Phase 1]

`<Link href="#projects">` does nothing on a case study page because there is no `#projects` DOM element on that page. Active-state detection also breaks.

**Fix:** Prefix all landing-section links with `/` when not on the homepage. `href={isLandingPage ? '#projects' : '/#projects'}`.

### Pitfall 5: Next.js 15 Dynamic Route `params` Is a Promise [CRITICAL — Case Study Phase]

Next.js 15 changed `params` from synchronous to asynchronous. Destructuring `{ params: { slug } }` synchronously silently yields `undefined` — pages render empty, metadata is wrong.

**Fix:**
```typescript
type Props = { params: Promise<{ slug: string }> };

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  // ...
}
```

### Additional Pitfalls (Moderate Priority)

| # | Pitfall | Phase | Fix |
|---|---------|-------|-----|
| 6 | `layout.tsx` vs `template.tsx` confusion — animations don't replay between sibling case studies | Case study build | Use `template.tsx` for animated content, or key the animated component on `pathname` |
| 7 | CLS from GSAP setting elements to hidden state before JS runs | Animation work | Set initial hidden state in CSS (not GSAP); use `gsap.from()` not `gsap.fromTo()` with explicit hidden start |
| 8 | `images: { unoptimized: true }` in `next.config.js` — no lazy loading, no WebP, poor LCP | Case study build | Remove the flag; use `next/image` for all case study content images with explicit dimensions |
| 9 | ~40 unused Radix UI packages + `@supabase/supabase-js` bloating install/compile | Cleanup phase | Audit with `depcheck`; remove unused shadcn components and Supabase |
| 10 | `gsap.registerPlugin()` scattered across every component | Phase 1 | Consolidate into `lib/gsap.ts`; all components import from there |
| 11 | Schema.org `Person` not migrated to `Organization` | SEO phase | Use `Organization` with `founder` array; validate with Google Rich Results Test |
| 12 | Same generic OG image on all case study pages | SEO phase | `opengraph-image.tsx` per slug with project name, key metric, studio brand |
| 13 | Animation performance on mid-range Android devices | Polish phase | `gsap.matchMedia()` for reduced-motion mobile variants; profile with CPU throttling |
| 14 | Back-navigation replays entry animations from scratch | Polish phase | Session flag (`sessionStorage` or React context) to skip entry animations on subsequent mount |

---

## 6. Recommended Phase Order

This sequence is derived from the dependency chain identified across all four research files. Each phase must be substantially complete before the next begins (partial exceptions noted).

### Phase 1: Infrastructure Foundation

**Rationale:** The data model is the linchpin — everything else consumes it. The scroll and animation bugs exist today but are masked; they must be fixed before routing is added, or they will cause regressions impossible to untangle later.

**Deliverables:**
- `data/types.ts` — TypeScript interfaces (`Project`, `CaseStudy`, `TeamMember`)
- `data/projects.ts` — Migrate + expand from Projects.tsx (add all 6 projects)
- `data/team.ts` — Abhishek and Vatsal data
- `data/case-studies/*.ts` — Stub files per case study (full content comes later)
- `lib/gsap.ts` — Centralized GSAP registration; migrate all components to import from here
- Fix `SmoothScrollProvider` Lenis cleanup bug (anonymous function reference leak)
- Add route-awareness to `SmoothScrollProvider` (usePathname, scroll reset, ScrollTrigger.refresh)
- Migrate all animated components from `useEffect + gsap.context()` to `useGSAP` hook
- `app/case-studies/layout.tsx` — Layout shell (Navigation + Footer)
- `app/case-studies/page.tsx` — Skeleton route (can render placeholder content)
- `app/case-studies/[slug]/page.tsx` — Skeleton dynamic route with `generateStaticParams`
- Update `app/sitemap.ts` — Real routes replacing hash fragments
- Remove `@supabase/supabase-js` (verify no usage first); remove unused shadcn/ui components

**Pitfalls addressed:** #1, #2, #3, #4, #10

**Research flag:** Standard patterns. No additional research needed.

---

### Phase 2: Landing Page Rebrand

**Rationale:** The landing page is the existing product. Rebrand it for the studio context before building new pages. This unblocks copywriting and visual identity decisions that case study pages depend on. Phases 1 and 2 can partially overlap once the data layer is in place.

**Deliverables:**
- Rewrite `Hero` — studio identity framing ("two devs, one studio")
- Refactor `ProjectShowcase` — consume `data/projects.ts`, link to `/case-studies/[slug]` for eligible projects
- Add `Team` section — consume `data/team.ts`, two cards (headshots, roles, bios, links)
- Update `About` — studio framing, shared history narrative
- Update `Contact` — studio framing, persistent CTA
- Update `Navigation` — route-aware links, add "Case Studies" link
- Extract `Footer` from `Contact.tsx` into shared component
- Add "How we work" methodology section (3-4 steps)
- Update JSON-LD: `Person` -> `Organization` with `founder` array
- Remove `images: { unoptimized: true }` from `next.config.js`; use `next/image`

**Pitfalls addressed:** #7 (CLS), #11 (schema migration), image optimization

**Research flag:** Standard. No additional research needed.

---

### Phase 3: Case Study Pages

**Rationale:** The highest-value conversion asset. Build after the data layer and landing page rebrand are stable. Start with the 3 case studies with the strongest technical stories (GleeMeet, CareerBox, Zorova) as they share the Redis + OpenSearch architectural pattern.

**Deliverables:**
- Case study components: `CaseStudyCard`, `CaseStudyHero`, `CaseStudySection`, `TechStackDisplay`, `MetricsDisplay`, `BackButton`
- Metric callout cards (reusable; also used on landing page for aggregate stats)
- Wire up `app/case-studies/page.tsx` — consume `data/projects.ts`, render `CaseStudyCard` grid
- Wire up `app/case-studies/[slug]/page.tsx` — `async` page, `await params`, render full case study
- Write case study content for 3 priority projects: GleeMeet, CareerBox, Zorova
- Create architecture SVG diagrams for each (design in Mermaid/Figma, export as static SVG)
- Add JSON-LD `Article` schema per case study page
- `generateMetadata` per slug for unique title, description, OG
- `opengraph-image.tsx` per slug

**Pitfalls addressed:** #5 (async params), #6 (layout vs template), #8 (image optimization), #12 (OG images)

**Research flag:** Architecture diagram design may benefit from a targeted research spike on what makes backend system diagrams legible at a glance. The `next-transition-router` integration (if included) also needs a small spike to validate it works with the existing Lenis + GSAP setup.

---

### Phase 4: Animation and Polish

**Rationale:** The GSAP infrastructure is clean from Phase 1. This phase adds the premium animated feel to case study pages and ensures performance does not regress on mobile.

**Deliverables:**
- GSAP SplitText integration: replace manual character/word splitting in `Hero` and `About`
- Scroll-triggered section reveals on case study pages (extend existing `useGSAP` pattern)
- Architecture diagram reveal animations (trace arrows, fade in components)
- Metric counter animations (`MetricsDisplay` counting up on scroll entry)
- `gsap.matchMedia()` reduced-motion variants for mobile
- `prefers-reduced-motion` CSS and GSAP respect
- Performance audit: Chrome DevTools CPU throttle (4x), Lighthouse CLS/LCP checks
- Session-aware animation state (skip entry animations on back-navigation)
- Page transition animations with `next-transition-router` (if prioritized in Phase 3 spike)
- GSAP Flip plugin for card-to-case-study transition (optional)

**Pitfalls addressed:** #7 (CLS), #13 (mobile performance), #14 (back-navigation replay)

**Research flag:** `next-transition-router` animated transitions need a small spike if not already spiked in Phase 3. Standard patterns otherwise.

---

### Phase 5: SEO and Verification

**Rationale:** After all content is live, do a final SEO pass. This is a checklist phase — no new features, only validation.

**Deliverables:**
- Verify all generated OG images render correctly (Facebook Sharing Debugger, Twitter Card Validator)
- Validate structured data (Google Rich Results Test) for Organization + Article schemas
- Check Google Search Console for structured data errors post-deploy
- Verify `sitemap.xml` lists all real routes (no hash fragments)
- Confirm `robots.txt` is correct
- Verify all project live URLs in `data/projects.ts` are functional
- Core Web Vitals check on landing page AND a case study page (LCP, CLS, INP)
- Verify `generateStaticParams` pre-renders all case study slugs at build time

**Pitfalls addressed:** #11 (schema), #12 (OG images), #5 (static gen verification)

**Research flag:** No additional research needed. Standard checklist.

---

## 7. Open Questions

These are unresolved items that require decisions before or during implementation.

| # | Question | Blocks | Notes |
|---|----------|--------|-------|
| 1 | **What is the production domain?** | Sitemap, OG images, JSON-LD base URL | Placeholder `[domain]` used throughout architecture docs; must be set in an env var or `lib/constants.ts` before SEO work |
| 2 | **Which 6 projects have case studies, and which 3 get full deep-dives?** | `data/projects.ts`, `generateStaticParams`, Phase 3 scope | Research mentions GleeMeet, CareerBox, Zorova, EmpireInvestmentBank; 2 more needed to reach 6 |
| 3 | **Equal billing for both team members, or one primary face?** | Hero copy, Team section design, case study attribution | Affects how studio identity is written; important to decide before Phase 2 |
| 4 | **Are quantified metrics available for each case study?** | Case study Results sections | Rough numbers beat no numbers; someone must supply them before Phase 3 content work |
| 5 | **Do architecture diagrams already exist, or must they be created from scratch?** | Phase 3 timeline | Creating 3+ readable SVG architecture diagrams adds non-trivial design time |
| 6 | **Is the contact form backend live, or is `mailto:` the intentional final solution?** | Contact section | Current code uses `mailto:` — was Supabase being used or planned for this? Confirm before removing it |
| 7 | **Should page transitions (`next-transition-router`) be in v1 or deferred?** | Phase 3/4 scope | It is a 0.x library; CSS fade transitions are a safer, lighter default for v1 |
| 8 | **Tailwind v3 `tailwind.config.ts` vs. v4 CSS-first: which is canonical?** | Styling consistency in Phase 1 | The dual-config situation should be resolved in Phase 1 cleanup to avoid surprises |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified via npm registry. Only 1 new package (`@gsap/react`) is required. Free GSAP plugins confirmed from multiple independent sources. |
| Features | MEDIUM-HIGH | Table stakes for dev studio sites are well-documented. Case study anatomy is synthesized from multiple agency/portfolio research sources. Specific content (metrics, diagrams) depends on team input. |
| Architecture | HIGH | Next.js App Router patterns, `generateStaticParams`, server/client component split are all official, well-established. Lenis route-change behavior confirmed via GitHub issue tracker. |
| Pitfalls | HIGH | ScrollTrigger lifecycle issues are extensively documented in GSAP official forums and GitHub. Lenis integration patterns confirmed against official docs and known issues. Next.js 15 async params is an official breaking change. |

---

## Sources (Aggregated)

- [GSAP Official React Integration Guide](https://gsap.com/resources/React/)
- [GSAP ScrollTrigger Tips and Mistakes (Official)](https://gsap.com/resources/st-mistakes/)
- [@gsap/react on npm](https://www.npmjs.com/package/@gsap/react)
- [GSAP on npm](https://www.npmjs.com/package/gsap)
- [Codrops: Free GSAP Plugins — SplitText, MorphSVG](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)
- [next-transition-router GitHub](https://github.com/ismamz/next-transition-router)
- [Lenis GitHub Repository](https://github.com/darkroomengineering/lenis)
- [Lenis Issue #319: ReactLenis begins halfway on navigation](https://github.com/darkroomengineering/lenis/issues/319)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Dynamic OG Images](https://www.buildwithmatija.com/blog/complete-guide-dynamic-og-image-generation-for-next-js-15)
- [Next.js 15 Dynamic Routes Params Promise Pattern](https://fortifiedhq.com/blog/next-js-15-dynamic-routes-params-promise)
- [Optimizing GSAP Animations in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Shopify: How to Write a Web Design Case Study](https://www.shopify.com/partners/blog/87782278-how-to-write-a-web-design-case-study-that-lands-new-clients)
- [Webflow: Write the Perfect Case Study](https://webflow.com/blog/write-the-perfect-case-study)
- [Articulate Marketing: Effective Case Study Sections](https://www.articulatemarketing.com/blog/how-to-design-an-effective-case-study-section-for-your-website)
- [Core Web Vitals Optimization for Next.js 2025](https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025)
- [Next.js SEO Pitfalls (FocusReactive)](https://focusreactive.com/typical-next-js-seo-pitfalls-to-avoid-in-2024/)
- [GSAP GitHub: App crashes with ScrollTrigger + Next.js navigation #440](https://github.com/greensock/GSAP/issues/440)
