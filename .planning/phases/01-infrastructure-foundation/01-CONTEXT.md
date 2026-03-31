# Phase 1: Infrastructure Foundation - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the data layer, fix GSAP/Lenis scroll bugs for multi-page routing, create the case studies route skeleton, and clean up unused dependencies. This phase delivers the technical foundation that all subsequent phases (landing rebrand, case studies, animations, SEO) depend on.

</domain>

<decisions>
## Implementation Decisions

### Data Layer Organization
- Flat TypeScript interfaces per entity (`Project`, `CaseStudy`, `TeamMember`) in a single `data/types.ts`
- Case study content as structured objects with typed section fields (challenge, techStack, architecture, results) — enables type-safe rendering in Phase 3
- Union literal field `type: "client" | "co-built" | "internal"` on Project interface for client vs internal labeling (supports STUD-07)
- One file per entity: `data/projects.ts`, `data/team.ts`, `data/case-studies.ts` plus shared `data/types.ts`

### GSAP & Scroll Architecture
- Single `lib/gsap.ts` module that registers all plugins and re-exports gsap — components import from here, not from `gsap` directly (INFRA-05)
- Refactor ALL existing components (Hero, About, Experience, Projects, Contact) to `@gsap/react` `useGSAP` hook — consistent pattern, better cleanup guarantees
- Named function reference stored in a variable for proper `removeEventListener` — targeted fix for Lenis cleanup bug (INFRA-07)
- `usePathname` hook to detect route changes, kill all ScrollTrigger instances, and call `ScrollTrigger.refresh()` for route-aware scroll management (INFRA-08)

### Routing & Navigation
- `case-studies/layout.tsx` with navigation + footer chrome (ROUT-04) — footer extracted as shared component
- Programmatic hash link navigation — detect hash links on non-home routes, use `router.push('/#section')` for proper Next.js route change + scroll (ROUT-05)
- Structured placeholder template on case study detail pages with real section headings (Hero, Challenge, Architecture, etc.) with "Content coming in Phase 3" placeholders — validates layout skeleton
- Flat sitemap route list with `changeFrequency` and `priority` — `/`, `/case-studies`, `/case-studies/gleemeet`, etc. (removes hash fragments per ROUT-07)

### Claude's Discretion
- Internal implementation details for GSAP plugin registration order
- Exact TypeScript interface field names and optional vs required designations
- Error page implementation (`not-found.tsx`) if needed for case study routes

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/utils.ts` — `cn()` class merge utility (keep as-is)
- `config/design-system.ts` — color palette and typography tokens (reference for new components)
- `components/Navigation.tsx` — existing nav with scroll-spy (extend for route-awareness)
- `components/SmoothScrollProvider.tsx` — Lenis provider (fix and extend for multi-route)
- `components/Contact.tsx` — contains footer content (extract into shared Footer component)
- 49 shadcn/ui components available in `components/ui/` (unused but available)

### Established Patterns
- Client components with `'use client'` for anything using GSAP or browser APIs
- Server components for layout and page shells
- GSAP animation setup: `useEffect` → `gsap.context()` → `return () => ctx.revert()` (will migrate to `useGSAP`)
- Per-component GSAP plugin registration with `typeof window` guard (will centralize)
- Section numbering convention: `01 / About`, `02 / Experience`, etc.

### Integration Points
- `app/layout.tsx` — root layout wraps with SmoothScrollProvider + AnalyticsProvider
- `app/page.tsx` — composes all section components (no changes needed)
- `app/sitemap.ts` — currently generates hash-based URLs (needs rewrite for real routes)
- `package.json` — `@supabase/supabase-js` to remove, `@gsap/react` to add

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for all implementation details.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>
