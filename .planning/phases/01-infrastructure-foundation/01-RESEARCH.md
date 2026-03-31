# Phase 1: Infrastructure Foundation - Research

**Researched:** 2026-04-01
**Domain:** Data layer extraction, GSAP/Lenis scroll architecture, Next.js App Router routing
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical foundation for transforming a single-page portfolio into a multi-page studio site. The work divides into three independent streams: (1) extracting hardcoded content from 5 components into a typed `data/` layer, (2) fixing GSAP and Lenis scroll/animation bugs that break under multi-page routing, and (3) creating the `/case-studies` route skeleton with proper Next.js 15 async params.

The existing codebase has a clear, consistent pattern: every section component is a `'use client'` component that imports `gsap` and `ScrollTrigger` directly, registers the plugin inline with `typeof window` guards, and uses `gsap.context()` inside `useEffect` with `ctx.revert()` cleanup. This pattern must be migrated to the centralized `lib/gsap.ts` + `useGSAP` hook pattern. The Lenis SmoothScrollProvider has a concrete bug: the `gsap.ticker.remove()` call in cleanup creates a new anonymous function instead of removing the original, causing a leak on every mount/unmount cycle.

**Primary recommendation:** Execute in three parallel streams (data layer, GSAP/scroll fixes, routing skeleton) since they have minimal coupling, merging at the end when Navigation needs both route-awareness and data imports.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Flat TypeScript interfaces per entity (`Project`, `CaseStudy`, `TeamMember`) in a single `data/types.ts`
- Case study content as structured objects with typed section fields (challenge, techStack, architecture, results) -- enables type-safe rendering in Phase 3
- Union literal field `type: "client" | "co-built" | "internal"` on Project interface for client vs internal labeling (supports STUD-07)
- One file per entity: `data/projects.ts`, `data/team.ts`, `data/case-studies.ts` plus shared `data/types.ts`
- Single `lib/gsap.ts` module that registers all plugins and re-exports gsap -- components import from here, not from `gsap` directly (INFRA-05)
- Refactor ALL existing components (Hero, About, Experience, Projects, Contact) to `@gsap/react` `useGSAP` hook -- consistent pattern, better cleanup guarantees
- Named function reference stored in a variable for proper `removeEventListener` -- targeted fix for Lenis cleanup bug (INFRA-07)
- `usePathname` hook to detect route changes, kill all ScrollTrigger instances, and call `ScrollTrigger.refresh()` for route-aware scroll management (INFRA-08)
- `case-studies/layout.tsx` with navigation + footer chrome (ROUT-04) -- footer extracted as shared component
- Programmatic hash link navigation -- detect hash links on non-home routes, use `router.push('/#section')` for proper Next.js route change + scroll (ROUT-05)
- Structured placeholder template on case study detail pages with real section headings (Hero, Challenge, Architecture, etc.) with "Content coming in Phase 3" placeholders -- validates layout skeleton
- Flat sitemap route list with `changeFrequency` and `priority` -- `/`, `/case-studies`, `/case-studies/gleemeet`, etc. (removes hash fragments per ROUT-07)

### Claude's Discretion
- Internal implementation details for GSAP plugin registration order
- Exact TypeScript interface field names and optional vs required designations
- Error page implementation (`not-found.tsx`) if needed for case study routes

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INFRA-01 | Data layer extracted into `data/` directory with TypeScript interfaces | Data layer architecture patterns, TypeScript interface design |
| INFRA-02 | All 6 projects defined in `data/projects.ts` with full metadata | Existing project data extracted from `Projects.tsx` (4 projects) + 2 more needed |
| INFRA-03 | Team data defined in `data/team.ts` for Abhishek and Vatsal | TeamMember interface design |
| INFRA-04 | Case study content files in `data/case-studies.ts` for GleeMeet, CareerBox, Zorova | CaseStudy structured type with section fields |
| INFRA-05 | GSAP registration centralized in `lib/gsap.ts` | `@gsap/react` v2.1.2 useGSAP hook docs, centralized registration pattern |
| INFRA-06 | `@gsap/react` adopted -- all animated components use `useGSAP` hook | useGSAP API: scope, dependencies, revertOnUpdate, contextSafe |
| INFRA-07 | Lenis cleanup bug fixed (anonymous function reference leak) | Identified exact bug in SmoothScrollProvider.tsx line 41-43 |
| INFRA-08 | SmoothScrollProvider is route-aware (scroll reset + ScrollTrigger.refresh) | Lenis route change patterns, usePathname integration |
| INFRA-09 | Remove unused `@supabase/supabase-js` dependency | Confirmed: listed in package.json but NOT imported anywhere |
| ROUT-01 | Case studies index page at `/case-studies` | Next.js App Router page conventions |
| ROUT-02 | Individual case study pages at `/case-studies/[slug]` with generateStaticParams + dynamicParams: false | Next.js 15 async params pattern (verified from official docs) |
| ROUT-03 | Next.js 15 async params handled correctly | `params: Promise<{ slug: string }>`, `await params` pattern |
| ROUT-04 | `case-studies/layout.tsx` provides shared navigation + footer chrome | Footer extraction from Contact.tsx, layout nesting |
| ROUT-05 | Navigation is route-aware -- hash links become `/#section` links on non-homepage routes | usePathname + router.push pattern |
| ROUT-06 | "Case Studies" link added to navigation menu | Navigation.tsx modification |
| ROUT-07 | Sitemap updated with real routes (no hash fragments) | Current sitemap uses hash-based URLs, needs complete rewrite |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Current Version | Purpose | Why Standard |
|---------|----------------|---------|--------------|
| `next` | 15.5.12 | App Router framework | Already installed, generates static params for case study routes |
| `react` | 19.0.0 | UI library | Already installed |
| `gsap` | 3.14.2 | Animation engine | Already installed, all 5 section components use it |
| `lenis` | 1.3.18 | Smooth scrolling | Already installed, wraps entire app |
| `typescript` | 5.6.3 | Type safety | Already installed, strict mode enabled |

### New Dependency
| Library | Version | Purpose | Why Needed |
|---------|---------|---------|------------|
| `@gsap/react` | 2.1.2 | useGSAP hook for automatic cleanup | INFRA-05/06 require centralized GSAP + useGSAP migration; peer deps: gsap ^3.12.5, react >=17 (both satisfied) |

### Dependency to Remove
| Library | Version | Reason |
|---------|---------|--------|
| `@supabase/supabase-js` | ^2.98.0 | INFRA-09: listed in package.json but NOT imported in any source file |

**Installation:**
```bash
npm install @gsap/react
npm uninstall @supabase/supabase-js
```

## Architecture Patterns

### Data Layer Structure
```
data/
  types.ts          # All interfaces: Project, CaseStudy, TeamMember
  projects.ts       # 6 project records with full metadata
  team.ts           # 2 team member records
  case-studies.ts   # 3 case study structured content objects
```

### Route Structure (New)
```
app/
  page.tsx                          # Landing page (unchanged)
  layout.tsx                        # Root layout (unchanged)
  sitemap.ts                        # Rewritten: real routes, no hash fragments
  case-studies/
    page.tsx                        # Index: project cards listing
    layout.tsx                      # Shared nav + footer chrome
    [slug]/
      page.tsx                      # Detail: placeholder sections
      not-found.tsx                 # 404 for invalid slugs (optional)
```

### Shared Component Extraction
```
components/
  Footer.tsx                        # Extracted from Contact.tsx footer section
  Navigation.tsx                    # Extended: route-aware, "Case Studies" link added
  SmoothScrollProvider.tsx          # Fixed: Lenis cleanup + route awareness
```

### GSAP Centralization
```
lib/
  gsap.ts                          # Central: registers plugins, re-exports gsap
  utils.ts                         # Existing cn() utility (unchanged)
```

### Pattern 1: Centralized GSAP Module (`lib/gsap.ts`)
**What:** Single module that imports gsap, registers all needed plugins (ScrollTrigger, useGSAP), and re-exports them. All components import from `@/lib/gsap` instead of `gsap` directly.
**When to use:** Every component that uses GSAP animations.
**Example:**
```typescript
// lib/gsap.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register all plugins once
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```
Source: GSAP official docs (https://gsap.com/resources/React/) recommend centralized registration.

### Pattern 2: useGSAP Hook Migration
**What:** Replace all `useEffect` + `gsap.context()` + `ctx.revert()` patterns with `useGSAP` hook.
**When to use:** Every animated client component.
**Before (current pattern in all 5 components):**
```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations...
  }, sectionRef);
  return () => ctx.revert();
}, []);
```
**After:**
```typescript
useGSAP(() => {
  // animations — cleanup is automatic
}, { scope: sectionRef });
```
Source: @gsap/react docs -- useGSAP automatically creates an internal gsap.context(), records all animations/ScrollTriggers created within, and reverts them on unmount.

**contextSafe for event handlers:**
```typescript
const { contextSafe } = useGSAP({ scope: containerRef });
const onHover = contextSafe(() => {
  gsap.to('.element', { scale: 1.1 });
});
```
Source: GSAP React docs -- event-driven animations created outside the useGSAP callback must be wrapped with `contextSafe()` to be included in cleanup.

### Pattern 3: Next.js 15 Async Params for Dynamic Routes
**What:** In Next.js 15, `params` is a Promise that must be awaited in server components or unwrapped with `use()` in client components.
**Example (server component -- preferred for case study pages):**
```typescript
// app/case-studies/[slug]/page.tsx
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: 'gleemeet' },
    { slug: 'careerbox' },
    { slug: 'zorova' },
  ];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  // render case study content
}
```
Source: Next.js official docs (https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) -- verified 2026-03-31.

### Pattern 4: Route-Aware Navigation with Hash Links
**What:** Navigation links that use hash anchors (`#about`, `#projects`) must navigate to the homepage first when on non-homepage routes.
**Example:**
```typescript
'use client';
import { usePathname, useRouter } from 'next/navigation';

// Inside Navigation component:
const pathname = usePathname();
const router = useRouter();

const handleNavClick = (e: React.MouseEvent, href: string) => {
  if (href.startsWith('#') && pathname !== '/') {
    e.preventDefault();
    router.push(`/${href}`);
  }
  // On homepage, default anchor behavior + Lenis smooth scroll handles it
};
```

### Pattern 5: Route-Aware SmoothScrollProvider
**What:** Detect route changes via `usePathname`, reset scroll position, and kill stale ScrollTrigger instances.
**Example:**
```typescript
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SmoothScrollProvider({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    // Store named reference for proper cleanup
    const rafCallback = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback); // Same reference — proper cleanup
    };
  }, []);

  // Route change handler
  useEffect(() => {
    // Kill all ScrollTrigger instances from previous route
    ScrollTrigger.getAll().forEach(st => st.kill());
    // Reset scroll position
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    // Refresh after DOM settles
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return <>{children}</>;
}
```

### Anti-Patterns to Avoid
- **Anonymous function in gsap.ticker.remove():** The current `SmoothScrollProvider.tsx` creates a new anonymous function in the cleanup, which never matches the original added function. Store the callback in a variable.
- **Per-component GSAP plugin registration:** Currently every component does `gsap.registerPlugin(ScrollTrigger)` with a `typeof window` guard. Centralize in `lib/gsap.ts` and import from there.
- **Importing gsap directly:** After this phase, no component should `import { gsap } from 'gsap'`. Always use `import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'`.
- **Synchronous params access in Next.js 15:** Do not use `params.slug` directly. Must use `const { slug } = await params` (server) or `const { slug } = use(params)` (client).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| GSAP cleanup in React | Manual `gsap.context()` + `ctx.revert()` in useEffect | `useGSAP` hook from `@gsap/react` | Handles React 18 Strict Mode double-execution, SSR safety, automatic context tracking |
| Static route generation | Manual route matching logic | `generateStaticParams` + `dynamicParams: false` | Built into Next.js, handles build-time generation, 404s for invalid slugs |
| Scroll position on route change | Custom scroll restoration logic | Lenis `scrollTo(0, { immediate: true })` + `ScrollTrigger.refresh()` | Lenis already manages scroll state; just needs route-change trigger |
| Hash navigation from sub-routes | Manual history manipulation | `next/navigation` `router.push('/#section')` | Next.js handles the route change; Lenis handles the scroll to hash |

## Common Pitfalls

### Pitfall 1: Anonymous Function Cleanup Leak (INFRA-07)
**What goes wrong:** `gsap.ticker.remove()` is called with a new anonymous function that doesn't match the one added with `gsap.ticker.add()`. The original callback is never removed and accumulates on each mount/unmount cycle.
**Why it happens:** JavaScript identity comparison -- `(time) => { lenis.raf(time * 1000) }` creates a new function object every time.
**How to avoid:** Store the callback in a variable: `const rafCallback = (time: number) => { lenis.raf(time * 1000); }; gsap.ticker.add(rafCallback);` then `gsap.ticker.remove(rafCallback);`.
**Warning signs:** `ScrollTrigger.getAll().length` grows after each navigation, page gets progressively laggier.
**Exact location:** `components/SmoothScrollProvider.tsx` lines 33-43.

### Pitfall 2: ScrollTrigger Instance Leaks on Route Change
**What goes wrong:** When navigating from `/` to `/case-studies`, ScrollTrigger instances from the homepage components persist because the SmoothScrollProvider doesn't kill them on route change.
**Why it happens:** The current SmoothScrollProvider has no route awareness -- it initializes once and never resets.
**How to avoid:** Add a `useEffect` that depends on `pathname` (from `usePathname()`) which calls `ScrollTrigger.getAll().forEach(st => st.kill())` and then `ScrollTrigger.refresh()`.
**Warning signs:** Verify with `console.log(ScrollTrigger.getAll().length)` -- should return 0 after a route change before new components mount.

### Pitfall 3: Next.js 15 Params Promise Type Mismatch
**What goes wrong:** Build fails with TypeScript error about `params` type being `Promise<{ slug: string }>` instead of `{ slug: string }`.
**Why it happens:** Next.js 15 changed `params` from synchronous to asynchronous (Promise-based). Old patterns break.
**How to avoid:** Always type params as `Promise<{ slug: string }>` and use `await params` in async server components. For client components, use React's `use()` function or the `useParams()` hook.
**Warning signs:** TypeScript errors during `npm run typecheck` mentioning Promise type.

### Pitfall 4: Lenis Scroll Position Carryover Between Routes
**What goes wrong:** Navigating to `/case-studies` while Lenis is still animating causes the new page to render midway down.
**Why it happens:** Lenis animation hasn't completed when the route changes; the scroll position carries over.
**How to avoid:** On route change, call `lenis.scrollTo(0, { immediate: true })` (not animated -- immediate) before the new route renders.
**Warning signs:** New pages start partway down instead of at the top.

### Pitfall 5: Footer Extraction Breaking Contact Section Layout
**What goes wrong:** Extracting the footer from `Contact.tsx` breaks the visual spacing of the contact section.
**Why it happens:** The footer is currently inside the contact section's padding/margin container. Extracting it changes the layout flow.
**How to avoid:** When extracting, ensure the Contact section retains its bottom padding, and the Footer component gets its own top border/margin. Test on both landing page and case studies pages.
**Warning signs:** Visual regression at the bottom of the landing page.

### Pitfall 6: generateStaticParams Must Not Return Empty Array with dynamicParams: false
**What goes wrong:** Build failure if `generateStaticParams` returns an empty array alongside `dynamicParams: false`.
**Why it happens:** Next.js requires at least one param when dynamic params are disabled.
**How to avoid:** Always return the full list of case study slugs from the data layer: `[{ slug: 'gleemeet' }, { slug: 'careerbox' }, { slug: 'zorova' }]`.
**Warning signs:** Build error mentioning empty generateStaticParams.

## Code Examples

### Data Layer Types (`data/types.ts`)
```typescript
// Source: Derived from existing component data + CONTEXT.md decisions

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  accent: 'violet' | 'pink' | 'cyan' | 'lime' | 'orange';
  tech: string[];
  type: 'client' | 'co-built' | 'internal';
  hasCaseStudy: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  email: string;
  photo?: string; // placeholder for Phase 2
  skills: string[];
}

export interface CaseStudySection {
  heading: string;
  content: string; // placeholder text for Phase 1, real content in Phase 3
}

export interface CaseStudy {
  slug: string;
  projectSlug: string; // links to Project
  title: string;
  tagline: string;
  challenge: CaseStudySection;
  techStack: {
    category: string;
    items: string[];
  }[];
  architecture: CaseStudySection;
  results: CaseStudySection;
  team: string[]; // team member names
}
```

### Extracting Project Data from Components
The existing `Projects.tsx` has 4 projects hardcoded (CareerBox, Gleemeet, Huslemad, Impactoverse). Per INFRA-02, 6 projects are needed. The missing two (Zorova, EmpireInvestmentBank) must be added. The existing data per project:
```typescript
// Currently in Projects.tsx:
{ title: 'CareerBox', subtitle: 'Career & Job Platform', url: 'https://careerbox.in', accent: 'violet',
  tech: ['Next.js', 'Node.js', 'MongoDB', 'AWS'] }
{ title: 'Gleemeet', subtitle: 'Dating Application', url: 'https://gleemet.com', accent: 'pink',
  tech: ['Next.js', 'Redux', 'Tailwind CSS', 'AWS'] }
{ title: 'Huslemad', subtitle: 'Productivity Platform', url: 'https://huslemad.com', accent: 'cyan',
  tech: ['React.js', 'Node.js', 'Express', 'MongoDB'] }
{ title: 'Impactoverse', subtitle: 'Social Impact Platform', url: 'https://impactoverse.com', accent: 'lime',
  tech: ['React.js', 'GSAP', 'Tailwind CSS'] }
// Needs adding:
// Zorova - home spa service (client project) per SEO-04 url: zorova.in
// EmpireInvestmentBank - per SEO-04 url: empireinvestmentbank.com
```

### Sitemap Rewrite
```typescript
// Source: Next.js sitemap convention + ROUT-07 requirement
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abhishekvaghela.dev';

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/case-studies/gleemeet`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/case-studies/careerbox`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/case-studies/zorova`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
```

### Case Study Index Page
```typescript
// app/case-studies/page.tsx
import { projects } from '@/data/projects';

export default function CaseStudiesPage() {
  const caseStudyProjects = projects.filter(p => p.hasCaseStudy);

  return (
    <main>
      <h1>Case Studies</h1>
      {caseStudyProjects.map(project => (
        <a key={project.slug} href={`/case-studies/${project.slug}`}>
          {project.title} -- {project.subtitle}
        </a>
      ))}
    </main>
  );
}
```

### Case Study Detail Page with Async Params
```typescript
// app/case-studies/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/case-studies';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const caseStudy = caseStudies.find(cs => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main>
      <section>{/* Hero */}</section>
      <section>{/* Challenge -- placeholder */}</section>
      <section>{/* Architecture -- placeholder */}</section>
      <section>{/* Tech Rationale -- placeholder */}</section>
      <section>{/* Results -- placeholder */}</section>
      <section>{/* Team -- placeholder */}</section>
      <section>{/* CTA -- placeholder */}</section>
    </main>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useEffect` + `gsap.context()` | `useGSAP` hook from `@gsap/react` | 2024 (GSAP 3.12+) | Automatic cleanup, SSR-safe, Strict Mode compatible |
| Sync `params` in page components | Async `params: Promise<{}>` with `await` | Next.js 15 (Oct 2024) | Must await params; sync access deprecated |
| `@studio-freight/lenis` | `lenis` (renamed package) | 2024 | Old package deprecated; current project already uses `lenis` |
| Per-component ScrollTrigger registration | Centralized plugin registration module | Community best practice | Prevents duplicate registration, single source of truth |

**Deprecated/outdated:**
- `@studio-freight/lenis` and `@studio-freight/react-lenis`: Use `lenis` directly (project already does this correctly)
- Synchronous `params` access in Next.js 15: Works but deprecated, will be removed

## Open Questions

1. **Zorova and EmpireInvestmentBank project metadata**
   - What we know: URLs are `zorova.in` and `empireinvestmentbank.com` (from SEO-04). Zorova is a client project for home spa service.
   - What's unclear: Full metadata (subtitle, tech stack, description, accent color) for these two projects not present in current codebase.
   - Recommendation: Create reasonable placeholder data based on project descriptions from REQUIREMENTS.md. Mark as needing user review. Use existing accent colors not yet taken (orange for one).

2. **Case study slug for GleeMeet**
   - What we know: The project URL in current code is `https://gleemet.com` (one 'e' in meet). The REQUIREMENTS.md refers to it as "GleeMeet".
   - What's unclear: Whether the slug should be `gleemeet` or `gleemet`.
   - Recommendation: Use `gleemeet` as the slug (matching the product name). The URL typo in the existing code (`gleemet.com`) may be the actual domain.

3. **SmoothScrollProvider scope with case-studies layout**
   - What we know: SmoothScrollProvider wraps `{children}` in root layout. Case studies pages will be nested under a separate layout.
   - What's unclear: Whether Lenis smooth scrolling should apply to case study pages or only the landing page.
   - Recommendation: Keep SmoothScrollProvider in root layout so smooth scrolling applies everywhere. The route-aware cleanup handles the ScrollTrigger leak concern.

## Project Constraints (from CLAUDE.md)

- **Tech stack locked:** Next.js + React + Tailwind + GSAP -- no alternative frameworks
- **No CMS:** All data remains hardcoded in TypeScript files
- **Dark aesthetic:** Keep existing design -- improve, don't replace
- **Vercel deployment:** Must build successfully with `next build`
- **URL verification:** Every project link must be verified as live before being added (SEO-04, but actual verification deferred to Phase 5)
- **ESLint ignored during builds:** `eslint.ignoreDuringBuilds: true` in next.config.js
- **TypeScript strict mode:** enabled in tsconfig.json
- **Path alias:** `@/*` maps to project root
- **No test framework:** No tests exist; nyquist_validation is disabled in config

## Sources

### Primary (HIGH confidence)
- Next.js official docs -- Dynamic Routes (https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes) -- async params pattern, generateStaticParams, dynamicParams: false. Verified 2026-03-31.
- Next.js official docs -- generateStaticParams (https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- return type, usage patterns, build behavior.
- GSAP official docs -- React integration (https://gsap.com/resources/React/) -- useGSAP hook API, contextSafe, cleanup behavior.
- npm registry -- `@gsap/react` v2.1.2 (current), peer deps: gsap ^3.12.5, react >=17.
- npm registry -- `gsap` v3.14.2 (current, matches installed version).
- npm registry -- `lenis` v1.3.21 (latest; installed v1.3.18, minor update available but not required).
- Existing codebase -- all 5 section components, SmoothScrollProvider, Navigation, layout, sitemap, package.json read and analyzed.

### Secondary (MEDIUM confidence)
- Lenis GitHub issue #319 (https://github.com/darkroomengineering/lenis/issues/319) -- scroll position carryover during navigation. Confirmed pattern: use `scrollTo(0, { immediate: true })` on route change.
- Medium article by Thomas Augot (https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) -- centralized GSAP config pattern for Next.js 15.
- GSAP forum thread (https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/) -- ScrollTrigger + useGSAP integration patterns.

### Tertiary (LOW confidence)
- None. All findings verified against official sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed, only @gsap/react to add, versions verified against npm registry
- Architecture: HIGH -- patterns derived from official Next.js and GSAP docs, verified against current codebase
- Pitfalls: HIGH -- Lenis cleanup bug identified by direct code reading (line 41-43), ScrollTrigger leak pattern well-documented in GSAP community
- Data layer: HIGH -- straightforward TypeScript interfaces, existing data extracted from components

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable libraries, well-established patterns)
