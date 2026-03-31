# Architecture Patterns

**Domain:** Dev studio portfolio -- expanding from single-page to multi-page
**Researched:** 2026-04-01
**Confidence:** HIGH (based on codebase analysis + official Next.js/Lenis/GSAP docs)

## Current Architecture (As-Is)

```
app/
  layout.tsx          -- RootLayout: fonts, metadata, JSON-LD, GTM, SmoothScrollProvider
  page.tsx            -- Home: Navigation + Hero + About + Experience + Projects + Contact
  globals.css
  manifest.ts / robots.ts / sitemap.ts

components/
  Navigation.tsx      -- Fixed header, hash links (#about, #experience, #projects, #contact)
  Hero.tsx            -- GSAP entrance animations + scroll-linked parallax
  About.tsx           -- Word-by-word scroll reveal, skill groups
  Experience.tsx      -- Timeline with GSAP stagger animations
  Projects.tsx        -- Project list with scramble hover, hardcoded array of 4 projects
  Contact.tsx         -- Contact form + footer, mailto submission
  SmoothScrollProvider.tsx  -- Lenis init + GSAP ScrollTrigger integration
  Analytics.tsx       -- Analytics wrapper
  ui/                 -- shadcn/ui primitives (40+ components, most unused)

lib/utils.ts          -- cn() helper
config/
  design-system.ts    -- Color + typography tokens
  analytics.ts        -- Analytics config
```

### Current Data Pattern

All content is hardcoded **inside components** as const arrays:
- `Projects.tsx`: `const projects = [...]` (4 items)
- `Experience.tsx`: `const experiences = [...]` (5 items)
- `About.tsx`: `const skillGroups = [...]` (4 groups)
- `Hero.tsx`: `const STACK = [...]` (tech marquee)

There is **no data layer**. Each component owns its own data.

### Current Scroll Architecture

`SmoothScrollProvider` wraps the entire app in `layout.tsx`. It initializes a single Lenis instance that:
1. Creates Lenis with `duration: 1.2` and custom easing
2. Connects Lenis to GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
3. Drives Lenis via `gsap.ticker.add()`

Every section component independently registers its own GSAP ScrollTrigger animations in its `useEffect`, cleaning up via `gsap.context().revert()`.

### Problems to Solve

1. **No routing** -- everything is one page with `#hash` links
2. **Data is trapped in components** -- Projects.tsx has 4 projects with thin data (title, subtitle, url, tech, description). Case studies need far richer data (problem, architecture, implementation, results, metrics)
3. **SmoothScrollProvider has no route awareness** -- no scroll reset on navigation, no pathname detection
4. **Navigation only has hash links** -- needs to support both hash (landing page sections) and route links (/case-studies)
5. **Sitemap lists hash fragments as URLs** -- invalid for real multi-page SEO

---

## Recommended Architecture (To-Be)

### High-Level Structure

```
app/
  layout.tsx              -- RootLayout (shared: fonts, metadata base, providers)
  page.tsx                -- Landing page (Hero + About + Team + Projects + Contact)
  case-studies/
    page.tsx              -- Case studies index page (/case-studies)
    [slug]/
      page.tsx            -- Individual case study (/case-studies/gleemeet)
  sitemap.ts              -- Updated: real routes, not hash fragments
  robots.ts
  manifest.ts
  globals.css

data/
  projects.ts             -- All project data (shared between landing + case studies)
  team.ts                 -- Team member data (Abhishek + Vatsal)
  case-studies/
    gleemeet.ts           -- Rich case study content
    careerbox.ts          -- Rich case study content
    zorova.ts             -- Rich case study content
    index.ts              -- Barrel export + lookup helpers

components/
  layout/
    Navigation.tsx        -- Route-aware nav (hash links on /, route links elsewhere)
    Footer.tsx            -- Extracted from Contact.tsx, shared across pages
  landing/
    Hero.tsx
    About.tsx
    Team.tsx              -- New: two-person team showcase
    Experience.tsx
    ProjectShowcase.tsx   -- Renamed from Projects.tsx, consumes data/projects.ts
    Contact.tsx           -- Without footer (footer now in layout)
  case-studies/
    CaseStudyCard.tsx     -- Card for index page
    CaseStudyHero.tsx     -- Individual case study header
    CaseStudySection.tsx  -- Reusable section block (Problem, Architecture, etc.)
    TechStackDisplay.tsx  -- Visual tech stack component
    MetricsDisplay.tsx    -- Results/metrics visualization
    BackButton.tsx        -- Navigation back to /case-studies or /
  shared/
    SmoothScrollProvider.tsx  -- Route-aware Lenis + GSAP integration
    SectionAnimation.tsx      -- Reusable GSAP scroll-reveal wrapper
  ui/                     -- shadcn/ui (unchanged)

lib/utils.ts
config/
  design-system.ts
  analytics.ts
  navigation.ts           -- Nav items config (avoids hardcoding in component)
```

### Component Boundaries

| Component | Responsibility | Consumes Data From | Communicates With |
|-----------|---------------|-------------------|-------------------|
| `RootLayout` | Fonts, base metadata, providers (SmoothScrollProvider, Analytics) | -- | All pages via children |
| `Navigation` | Fixed header, route-aware links, mobile menu | `config/navigation.ts` | Lenis (for hash scrollTo on landing page) |
| `Footer` | Footer bar shared across all pages | -- | -- |
| `Landing page` (app/page.tsx) | Composes all landing sections | -- | Section components |
| `ProjectShowcase` | Project cards on landing page | `data/projects.ts` | Links to `/case-studies/[slug]` |
| `CaseStudyCard` | Card on /case-studies index | `data/projects.ts` + `data/case-studies/` | Links to `/case-studies/[slug]` |
| `Case study page` | Full case study rendering | `data/case-studies/[slug].ts` | Back to /case-studies |
| `SmoothScrollProvider` | Lenis lifecycle, scroll reset on route change, GSAP ticker | `usePathname()` | GSAP ScrollTrigger |

---

## Data Architecture

### Why TypeScript Data Files (Not JSON, Not CMS)

Use `.ts` files in a `data/` directory because:

1. **Type safety** -- TypeScript interfaces enforce structure. If a case study is missing `metrics`, the build fails.
2. **Imports are first-class** -- `import { gleemeet } from '@/data/case-studies'` works in both Server Components and Client Components.
3. **Colocation of related content** -- Each case study is its own file, easy to find and edit.
4. **Static analysis** -- IDE autocomplete, refactoring support, dead code detection.
5. **No runtime cost** -- Data is resolved at build time for Server Components. No JSON parsing, no fetch overhead.
6. **Matches project constraint** -- PROJECT.md says "All data remains hardcoded in components (no CMS needed at this scale)." This moves data out of components but keeps it hardcoded in the codebase.

JSON would lose type safety. A CMS is overkill for 6 projects and 2 team members.

### Data Types

```typescript
// data/types.ts

export interface TeamMember {
  name: string;
  slug: string;
  role: string;
  bio: string;
  experience: string;          // "5+ years"
  skills: string[];
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  companies: string[];         // ["CareerBox.in", "Screenplay", "X-Byte", ...]
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  url: string;
  accent: 'violet' | 'pink' | 'cyan' | 'lime';
  tech: string[];
  description: string;         // Short, for landing page card
  hasCaseStudy: boolean;       // true = link to /case-studies/[slug]
  featured: boolean;           // true = show on landing page
  builders: string[];          // ["abhishek", "vatsal"] or ["abhishek"]
}

export interface CaseStudy {
  slug: string;                // matches Project.slug
  title: string;
  subtitle: string;
  heroImage?: string;          // optional hero image path
  accent: 'violet' | 'pink' | 'cyan' | 'lime';

  // Structured content sections
  overview: string;            // 2-3 sentence summary
  problem: {
    description: string;
    painPoints: string[];
  };
  architecture: {
    description: string;
    diagram?: string;          // optional ASCII or image path
    components: Array<{
      name: string;
      tech: string;
      role: string;
    }>;
  };
  techStack: Array<{
    category: string;          // "Frontend", "Backend", "Database", etc.
    items: Array<{
      name: string;
      purpose: string;         // "Primary database" or "Search engine with BERT vectors"
    }>;
  }>;
  implementation: Array<{
    title: string;             // "Redis Caching Layer", "OpenSearch Integration"
    description: string;
    highlight?: string;        // Key metric or insight
  }>;
  results: {
    description: string;
    metrics: Array<{
      label: string;           // "Query Response Time"
      before?: string;         // "450ms"
      after: string;           // "12ms"
      improvement?: string;    // "97% reduction"
    }>;
  };

  // Metadata
  builders: string[];          // team member slugs
  completedDate?: string;
  liveUrl?: string;
  seo: {
    title: string;
    description: string;
  };
}
```

### Data Flow

```
data/projects.ts ──────────────> app/page.tsx (Server Component)
  │                                  └─> ProjectShowcase (Client Component, receives props)
  │
  ├──────────────────────────────> app/case-studies/page.tsx (Server Component)
  │                                  └─> CaseStudyCard[] (Client Component, receives props)
  │
  └── data/case-studies/index.ts
        ├── gleemeet.ts ─────────> app/case-studies/[slug]/page.tsx (Server Component)
        ├── careerbox.ts ────────>   └─> CaseStudyHero, CaseStudySection[], etc.
        └── zorova.ts ──────────>        (Client Components, receive props via page)

data/team.ts ──────────────────> app/page.tsx -> Team component (landing page)
                                  app/case-studies/[slug]/page.tsx -> builder attribution

config/navigation.ts ──────────> Navigation component (used on all pages)
```

**Data flow direction:** Always top-down. Server Components in `app/` import from `data/`, then pass data as props to Client Components. Client Components never import from `data/` directly -- this keeps the Server/Client boundary clean and enables static generation.

### Static Generation with generateStaticParams

```typescript
// app/case-studies/[slug]/page.tsx

import { getAllCaseStudySlugs, getCaseStudyBySlug } from '@/data/case-studies';

// Generate all case study pages at build time
export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

// Prevent 404 for unknown slugs from being rendered at runtime
export const dynamicParams = false;

// Per-page SEO metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.seo.title,
    description: caseStudy.seo.description,
    openGraph: {
      title: caseStudy.seo.title,
      description: caseStudy.seo.description,
      type: 'article',
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) { notFound(); }
  // Render case study sections, passing data as props to client components
}
```

This produces fully static HTML at build time. Zero runtime data fetching. Optimal for Vercel deployment and SEO.

---

## Scroll Architecture (Critical)

### The Problem

The current `SmoothScrollProvider` blindly initializes Lenis once and never responds to route changes. When a user navigates from `/` to `/case-studies/gleemeet`, Lenis will not reset scroll position. If the user was mid-scroll on the landing page, the case study page starts at that scroll offset. This is a known issue documented in [lenis#319](https://github.com/darkroomengineering/lenis/issues/319).

Additionally, GSAP ScrollTrigger instances created by landing page components may persist and cause stale triggers on the new route.

### The Solution: Route-Aware SmoothScrollProvider

```typescript
// components/shared/SmoothScrollProvider.tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Initialize Lenis once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      // Immediate scroll to top (no smooth animation)
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Allow a frame for DOM to update, then recalculate triggers
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return <>{children}</>;
}
```

**Key behaviors:**
1. Lenis initializes **once** (not on every route change) -- prevents flicker
2. On `pathname` change, scroll resets to top **immediately** (no smooth animation)
3. After scroll reset, `ScrollTrigger.refresh()` recalculates all trigger positions for the new page
4. Component-level GSAP cleanup is handled by each component's own `gsap.context().revert()` in its useEffect cleanup (already the existing pattern)

### Hash Navigation on Landing Page

When a user clicks a hash link (e.g., "Projects" -> `#projects`) while on the landing page, `next/link` with `href="#projects"` works natively with Lenis because Lenis intercepts anchor clicks by default.

When a user is on `/case-studies/gleemeet` and clicks "Projects" in the nav, the link should be `/#projects`. Next.js will navigate to `/` and the browser will handle the hash scroll.

### Navigation Component: Route-Aware Links

```typescript
// Simplified logic for Navigation link behavior
const pathname = usePathname();
const isLandingPage = pathname === '/';

const landingLinks = [
  { name: 'About', href: isLandingPage ? '#about' : '/#about' },
  { name: 'Projects', href: isLandingPage ? '#projects' : '/#projects' },
  { name: 'Contact', href: isLandingPage ? '#contact' : '/#contact' },
];

const routeLinks = [
  { name: 'Case Studies', href: '/case-studies' },
];
```

When on the landing page, hash links use in-page smooth scroll (Lenis handles it). When on any other page, hash links point to `/#section` which triggers a full page navigation back to landing page, then browser scrolls to the hash target.

---

## GSAP Animation Architecture

### Current Pattern (Keep)

Each section component owns its animations via `useEffect` + `gsap.context()`:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations with ScrollTrigger
  }, sectionRef);
  return () => ctx.revert();
}, []);
```

This pattern is correct and should be preserved. The `gsap.context().revert()` cleanup ensures animations are properly destroyed when the component unmounts during route changes. No global animation registry needed.

### Recommended Improvement: useGSAP Hook

The `@gsap/react` package provides a `useGSAP` hook that is a drop-in replacement for this useEffect pattern. It handles cleanup automatically and uses `useIsomorphicLayoutEffect` for SSR safety. However, this is an optional improvement -- the existing pattern works correctly.

### Case Study Page Animations

Case study pages should use the same GSAP + ScrollTrigger pattern as landing page sections. The key difference: case study sections are rendered in a Server Component page and composed from multiple Client Components, each owning their own scroll animations.

```
app/case-studies/[slug]/page.tsx  (Server Component - no animations, composes layout)
  |-- CaseStudyHero              (Client Component - entrance animation)
  |-- CaseStudySection[problem]  (Client Component - scroll reveal)
  |-- CaseStudySection[arch]     (Client Component - scroll reveal)
  |-- CaseStudySection[impl]     (Client Component - scroll reveal)
  |-- CaseStudySection[results]  (Client Component - scroll reveal + counter animations)
```

---

## SEO Architecture

### Metadata Strategy

| Page | Metadata Type | Source |
|------|--------------|--------|
| `/` (landing) | Static `export const metadata` | Hardcoded in `app/page.tsx` or `app/layout.tsx` |
| `/case-studies` | Static `export const metadata` | Hardcoded in `app/case-studies/page.tsx` |
| `/case-studies/[slug]` | Dynamic `generateMetadata()` | From `data/case-studies/[slug].ts` |

### Structured Data (JSON-LD)

The root layout currently has a `Person` schema. This needs to become `Organization` for the studio rebrand (per PROJECT.md). Each case study page should add its own `Article` or `CreativeWork` schema:

```typescript
// app/case-studies/[slug]/page.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: caseStudy.title,
  description: caseStudy.overview,
  author: caseStudy.builders.map(slug => ({
    '@type': 'Person',
    name: getTeamMember(slug).name,
  })),
  datePublished: caseStudy.completedDate,
  url: `https://[domain]/case-studies/${caseStudy.slug}`,
};
```

### Sitemap

Replace the current hash-fragment sitemap with real routes:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://[domain]';
  const caseStudySlugs = getAllCaseStudySlugs();

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...caseStudySlugs.map((slug) => ({
      url: `${baseUrl}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
```

---

## Patterns to Follow

### Pattern 1: Server Component Pages, Client Component Sections

**What:** Page files in `app/` are Server Components that import data and compose Client Component sections. Data flows top-down via props.

**When:** Always. Every page in this project.

**Why:** Maximizes static generation. Data is resolved at build time. Client Components only ship the JavaScript needed for animations and interactivity.

```typescript
// app/case-studies/[slug]/page.tsx -- Server Component
import { getCaseStudyBySlug } from '@/data/case-studies';
import CaseStudyHero from '@/components/case-studies/CaseStudyHero';
import CaseStudySection from '@/components/case-studies/CaseStudySection';

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudyBySlug(params.slug);
  return (
    <>
      <Navigation />
      <main>
        <CaseStudyHero title={cs.title} subtitle={cs.subtitle} accent={cs.accent} />
        <CaseStudySection title="The Problem" content={cs.problem} />
        <CaseStudySection title="Architecture" content={cs.architecture} />
        {/* ... */}
      </main>
      <Footer />
    </>
  );
}
```

### Pattern 2: Shared Layout Shell for Non-Landing Pages

**What:** Case study pages share a consistent layout (Navigation at top, Footer at bottom, breadcrumb trail) distinct from the landing page's full-bleed immersive design.

**When:** All pages under `/case-studies/`.

**Why:** The landing page has a unique full-viewport hero with no visible footer until the user scrolls to the bottom. Case study pages need clear navigation chrome (back button, breadcrumbs) from the start.

**Implementation:** Use a route group or a `case-studies/layout.tsx`:

```typescript
// app/case-studies/layout.tsx
export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="pt-20"> {/* Account for fixed nav */}
        {children}
      </main>
      <Footer />
    </>
  );
}
```

Then `app/case-studies/page.tsx` and `app/case-studies/[slug]/page.tsx` don't need to repeat Navigation/Footer.

### Pattern 3: Extracted Data Layer with Lookup Functions

**What:** A `data/` directory with typed data files and barrel exports with helper functions.

**When:** From the start of the multi-page migration.

**Why:** Avoids scattering data across components. Makes it trivial to add new projects or case studies. Single source of truth.

```typescript
// data/case-studies/index.ts
import { gleemeet } from './gleemeet';
import { careerbox } from './careerbox';
import { zorova } from './zorova';
import type { CaseStudy } from '../types';

const caseStudies: Record<string, CaseStudy> = {
  gleemeet,
  careerbox,
  zorova,
};

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudies(): CaseStudy[] {
  return Object.values(caseStudies);
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client Components Importing Data Directly

**What:** Having `CaseStudyHero` import from `@/data/case-studies` inside a `'use client'` component.

**Why bad:** Breaks the Server/Client boundary. Data that could be resolved at build time gets bundled into client JavaScript. Increases bundle size. Makes components harder to test (they depend on the data module).

**Instead:** Server Component page imports data, passes it as serializable props to Client Components.

### Anti-Pattern 2: Reinitializing Lenis on Every Route Change

**What:** Destroying and recreating the Lenis instance when pathname changes.

**Why bad:** Causes visible scroll flicker. Breaks any in-flight ScrollTrigger calculations. Expensive (Lenis initialization measures DOM, sets up event listeners).

**Instead:** Initialize Lenis once. Reset scroll position with `scrollTo(0, { immediate: true })` on route change. Call `ScrollTrigger.refresh()` after the new page DOM is ready.

### Anti-Pattern 3: Putting Case Study Content in MDX Files

**What:** Using MDX for case study content because "it's content."

**Why bad:** Adds a build pipeline dependency (MDX compiler, remark/rehype plugins). Case studies here are structured data (problem, architecture, metrics), not free-form prose. TypeScript data files give you type-checked structure. MDX gives you flexibility you don't need and type safety you lose.

**Instead:** TypeScript data files with strong interfaces. If prose sections need rich formatting later, use a simple markdown-to-JSX renderer for specific string fields only.

### Anti-Pattern 4: Single Mega Layout With Conditional Rendering

**What:** Having one layout.tsx that conditionally renders different navigation and footer based on the route.

**Why bad:** Bundles all layout variations into every page. Makes the layout component complex. Next.js has nested layouts specifically to solve this.

**Instead:** Use the nested layout capability. Root layout handles shared providers. `case-studies/layout.tsx` handles the case-studies-specific chrome (breadcrumbs, back button, footer).

---

## Scalability Considerations

| Concern | Now (6 projects) | At 20 projects | At 50+ projects |
|---------|-------------------|----------------|-----------------|
| Data management | TS files in `data/` | Still fine -- each is a small file | Consider a headless CMS at this point |
| Build time | Near-instant (static) | Still fast (<30s) | Still fast -- these are just static pages |
| Bundle size | Minimal -- data in Server Components | No change (data isn't in client bundle) | No change |
| Navigation | Flat list | May need categories/filters on index | Need search/filter on index |
| SEO | generateMetadata per page | Same pattern scales | Same pattern scales |

This architecture scales cleanly to ~50 projects without any structural changes. Beyond that, a CMS would reduce the toil of editing TypeScript files, but the architecture pattern (data layer -> Server Components -> Client Components) stays the same.

---

## Suggested Build Order

Dependencies between components determine the order. Build in this sequence:

### Phase A: Data Layer Foundation

**Build first because everything depends on it.**

1. `data/types.ts` -- TypeScript interfaces (Project, CaseStudy, TeamMember)
2. `data/projects.ts` -- Migrate project data from `Projects.tsx` + add new projects (Zorova, EmpireInvestmentBank)
3. `data/team.ts` -- Team member data
4. `data/case-studies/*.ts` -- Individual case study content files
5. `data/case-studies/index.ts` -- Barrel export with lookup functions

**No visual changes yet.** This is pure data extraction.

### Phase B: Routing Infrastructure

**Build second because pages need routes before they need content.**

1. `app/case-studies/page.tsx` -- Skeleton case studies index (can be empty initially)
2. `app/case-studies/[slug]/page.tsx` -- Skeleton dynamic route with `generateStaticParams`
3. `app/case-studies/layout.tsx` -- Layout shell for case study pages
4. Update `app/sitemap.ts` -- Real routes instead of hash fragments

### Phase C: Scroll and Navigation Layer

**Build third because both landing page and case study pages need correct scroll/nav.**

1. Update `SmoothScrollProvider` -- Add route-awareness (usePathname, scrollTo reset, ScrollTrigger.refresh)
2. Update `Navigation` -- Route-aware links (hash on /, full paths elsewhere), add "Case Studies" link
3. Extract `Footer` from `Contact.tsx` -- Shared across pages
4. Update `app/page.tsx` -- Use Navigation and Footer as separate concerns

### Phase D: Landing Page Refactor

**Build fourth -- updates existing page to consume data layer.**

1. Refactor `ProjectShowcase` -- Consume from `data/projects.ts` instead of inline array. Link to `/case-studies/[slug]` for projects with case studies.
2. Add `Team` section -- Consume from `data/team.ts`
3. Update `Hero`, `About`, `Experience` -- Rebrand content from personal to studio

### Phase E: Case Study Pages

**Build last because they depend on everything above.**

1. `CaseStudyCard` component -- For the /case-studies index page
2. `CaseStudyHero` component -- Individual case study header
3. `CaseStudySection` component -- Reusable content sections with GSAP animations
4. `TechStackDisplay` component -- Visual tech stack
5. `MetricsDisplay` component -- Before/after metrics
6. Wire up `app/case-studies/page.tsx` and `app/case-studies/[slug]/page.tsx`
7. Add JSON-LD structured data per case study page
8. Update generateMetadata for SEO

**Critical dependency chain:**

```
Data Layer (A) -> Routing (B) -> Scroll/Nav (C) -> Landing Refactor (D) -> Case Studies (E)
                                                          \                    /
                                                           \------ both consume data layer ------/
```

Phases D and E can partially overlap once C is complete, but D should lead because the landing page is the existing product and shouldn't break during the migration.

---

## Sources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
- [Lenis GitHub Repository](https://github.com/darkroomengineering/lenis)
- [Lenis Issue #319: ReactLenis begins halfway on navigation](https://github.com/darkroomengineering/lenis/issues/319)
- [GSAP React Integration Guide](https://gsap.com/resources/React/)
- [GSAP ScrollTrigger in Next.js with useGSAP](https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/)
- [Optimizing GSAP Animations in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Next.js App Router Best Practices 2025](https://medium.com/better-dev-nextjs-react/inside-the-app-router-best-practices-for-next-js-file-and-directory-structure-2025-edition-ed6bc14a8da3)
- [Next.js App Router Patterns 2026](https://dev.to/teguh_coding/nextjs-app-router-the-patterns-that-actually-matter-in-2026-146)
