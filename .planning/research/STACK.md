# Technology Stack

**Project:** Dev Studio Portfolio
**Researched:** 2026-04-01
**Overall confidence:** HIGH

## Existing Stack (Keep As-Is)

The current foundation is solid and should NOT be replaced. These are locked decisions.

| Technology | Installed Version | Latest | Purpose | Status |
|------------|-------------------|--------|---------|--------|
| Next.js | 15.5.12 | 15.5.12 | Framework, SSR/SSG, routing | KEEP |
| React | 19.0.0 | 19.0.0 | UI library | KEEP |
| TypeScript | 5.6.3 | ~5.8 | Type safety | KEEP (upgrade optional) |
| GSAP | ^3.14.2 | 3.14.2 | Animation engine | KEEP |
| Lenis | ^1.3.18 | 1.3.21 | Smooth scrolling | KEEP (bump to ^1.3.21) |
| Tailwind CSS | ^4.0.0 | 4.x | Utility-first styling | KEEP |
| @tailwindcss/postcss | ^4.0.0 | 4.x | PostCSS integration | KEEP |
| shadcn/ui | N/A (components) | latest | UI component library | KEEP |
| Lucide React | ^0.577.0 | latest | Icons | KEEP |
| Vercel | (hosting) | N/A | Deployment | KEEP |

**Note on Tailwind v4:** The project has both a `tailwind.config.ts` (v3-style) AND `@tailwindcss/postcss` (v4-style). Tailwind v4 moves configuration into CSS via `@theme` directives and `@import "tailwindcss"`. The v3-style config file is likely vestigial or partially migrated. During implementation, verify which config is actually being consumed and consolidate to v4's CSS-first approach if possible. LOW priority -- it works as-is.

## New Libraries to Add

### 1. @gsap/react (useGSAP hook)

| Field | Value |
|-------|-------|
| **Package** | `@gsap/react` |
| **Version** | `^2.1.2` (latest) |
| **Confidence** | HIGH |
| **Purpose** | Drop-in replacement for useEffect/useLayoutEffect for GSAP animations |
| **Why** | The existing codebase registers `ScrollTrigger` in every component with manual `gsap.context()` cleanup. The `useGSAP` hook automates this -- all GSAP animations, ScrollTriggers, and SplitText instances created inside the hook are automatically reverted on unmount. It also handles SSR correctly (uses `useIsomorphicLayoutEffect` internally). This is the official GSAP recommendation for React projects. |
| **Peer deps** | `gsap >=3.12.5`, `react >=17` -- both satisfied |
| **Migration effort** | Low. Replace each `useEffect(() => { const ctx = gsap.context(...) ... return () => ctx.revert() })` pattern with `useGSAP(() => { ... }, { scope: containerRef })`. The existing code already follows the context pattern, so this is a 1:1 swap with less boilerplate. |

**Source:** [GSAP Official React Guide](https://gsap.com/resources/React/), [npm @gsap/react](https://www.npmjs.com/package/@gsap/react)

### 2. GSAP SplitText (now free, bundled with gsap)

| Field | Value |
|-------|-------|
| **Package** | Included in `gsap` (import from `gsap/SplitText`) |
| **Version** | Bundled with gsap 3.14.2 |
| **Confidence** | HIGH |
| **Purpose** | Split text into characters/words/lines for animation |
| **Why** | As of GSAP 3.13.0, ALL previously-paid Club GreenSock plugins are now 100% free, including SplitText, MorphSVG, ScrollSmoother, DrawSVG, and more. The existing codebase has hand-rolled character splitting in Hero.tsx (the `CharLine` component that manually maps `text.split('')`) and word splitting in About.tsx (manual `innerHTML` replacement). SplitText handles this properly with automatic resizing, line detection, and built-in masking. It eliminates the fragile manual splitting code. |
| **Migration effort** | Low. Replace manual `text.split('')` and `innerHTML` word splitting with `SplitText.create()` calls inside `useGSAP`. |

**Source:** [Codrops: GSAP Free Plugins](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/), [GSAP npm](https://www.npmjs.com/package/gsap)

### 3. GSAP Flip Plugin (bundled with gsap, now free)

| Field | Value |
|-------|-------|
| **Package** | Included in `gsap` (import from `gsap/Flip`) |
| **Version** | Bundled with gsap 3.14.2 |
| **Confidence** | MEDIUM |
| **Purpose** | Animate between layout states (e.g., project grid to case study detail) |
| **Why** | For case study pages, a common pattern is transitioning from a project card on the homepage to the full case study page. GSAP Flip captures element state, applies a layout change, then animates between the two states. Useful for the project showcase to case study transition. May not be needed if using simple page transitions instead, but good to have available. |
| **Migration effort** | N/A -- new feature, additive only. |

### 4. next-transition-router

| Field | Value |
|-------|-------|
| **Package** | `next-transition-router` |
| **Version** | `^0.2.11` (latest) |
| **Confidence** | MEDIUM |
| **Purpose** | Animated page transitions between routes in Next.js App Router |
| **Why** | The site is adding multi-page routing (`/case-studies`, `/case-studies/[slug]`). Without transition handling, navigation between the homepage and case study pages will be jarring -- the Lenis smooth scroll and GSAP animations only operate within a single page. `next-transition-router` provides `leave` and `enter` callbacks where GSAP timelines can drive the transition animation. It supports React 18.2+ and Next.js 14+, both satisfied. The alternative is Next.js experimental `viewTransition` (added in 15.2), but that is browser-limited (Chrome/Edge/Safari 18+ only) and still experimental -- not production-ready. |
| **Peer deps** | `next >=14.0.0`, `react >=18.2.0`, `react-dom >=18.2.0` -- all satisfied |
| **Caveat** | This is a 0.x library (pre-1.0). API may change. If transitions aren't critical for v1, skip it and add polish later. Simple CSS fade transitions are a lighter alternative. |

**Source:** [GitHub: next-transition-router](https://github.com/ismamz/next-transition-router), [StackBlitz example](https://stackblitz.com/edit/next-transition-router-gsap-lzlbyzog)

### 5. next/og (bundled with Next.js)

| Field | Value |
|-------|-------|
| **Package** | Built into `next` (import from `next/og`) |
| **Version** | Bundled with Next.js 15.5.12 |
| **Confidence** | HIGH |
| **Purpose** | Dynamic OG image generation for case study pages |
| **Why** | Each case study page (`/case-studies/[slug]`) needs unique social sharing images for SEO. Next.js's built-in `ImageResponse` API generates OG images server-side using JSX and CSS -- no external service needed. Create an `opengraph-image.tsx` file inside the case study route to auto-generate per-slug OG images at 1200x630. This replaces the current static `/og-image.png`. |
| **Migration effort** | Additive. Create route-level `opengraph-image.tsx` files alongside each page. |

**Source:** [Next.js Metadata Docs](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), [Dynamic OG Guide](https://www.buildwithmatija.com/blog/complete-guide-dynamic-og-image-generation-for-next-js-15)

## Libraries Considered but NOT Recommended

| Library | Why Considered | Why NOT |
|---------|---------------|---------|
| **Framer Motion** | Popular React animation library | Already invested heavily in GSAP across every component. Adding Framer Motion creates two animation systems -- more bundle, more mental overhead, no benefit. GSAP does everything Framer Motion does and more. |
| **GSAP ScrollSmoother** | Now free, replaces Lenis for smooth scrolling | Lenis is already integrated and working well. ScrollSmoother is 26KB, more rigid about DOM structure (requires wrapper divs), and doesn't offer meaningful advantages for this use case. Switching would break existing scroll integration for no gain. Keep Lenis. |
| **Locomotive Scroll** | Smooth scroll alternative | Heavier than Lenis, more opinionated, known issues with native APIs (IntersectionObserver, CSS Sticky). Lenis is the better choice and already in place. |
| **Mermaid.js** | Architecture diagrams in case studies | Heavy library (~800KB+) for rendering diagrams that could be pre-rendered SVGs. For 6 case studies with static architecture diagrams, hand-crafted SVGs or pre-exported images are lighter, more visually consistent with the dark theme, and fully controllable with GSAP animation. Use Mermaid to AUTHOR diagrams in development, then export as SVG and embed statically. |
| **react-mermaid** | React wrapper for Mermaid | Same issue as above -- runtime rendering adds bundle weight for static content. Export SVGs instead. |
| **next-view-transitions / experimental viewTransition** | Native browser View Transitions API | Experimental in Next.js 15.2+, limited browser support (no Firefox), API may change. Not production-ready. Use `next-transition-router` + GSAP for reliable cross-browser transitions. |
| **Contentlayer / MDX** | CMS-like content management for case studies | PROJECT.md explicitly states "content is hardcoded, manageable at this scale" -- 6 case studies, 2 team members. MDX or a content layer adds tooling complexity (build pipelines, schemas) for a problem that doesn't exist yet. Hardcoded TypeScript data objects are the right call. |
| **Supabase** | Already in package.json (`@supabase/supabase-js`) | Appears unused in the codebase (no imports found). Likely a leftover from a contact form experiment. Should be removed to reduce bundle size unless there's a contact form backend using it. |

## Architecture Decisions (Stack-Related)

### Case Study Data Pattern: TypeScript Data Objects

Use typed TypeScript arrays/objects for case study content, not MDX or a CMS. The project has 6 projects and won't grow rapidly. Keep data co-located and strongly typed.

```typescript
// lib/case-studies.ts
interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  client: string;  // "Internal" | "Client Project"
  accent: 'violet' | 'pink' | 'cyan' | 'lime';
  tech: string[];
  problem: string;
  architecture: ArchitectureDiagram;  // SVG path or component reference
  implementation: ImplementationHighlight[];
  results: Metric[];
  team: ('abhishek' | 'vatsal')[];
}
```

**Rationale:** The existing `projects` array in `Projects.tsx` follows this pattern. Extending it to full case study data is natural. `generateStaticParams` reads from this array to pre-render all slug routes at build time. `generateMetadata` reads from it for per-page SEO. Zero infrastructure cost.

### Routing: Next.js App Router File-Based

```
app/
  page.tsx                          # Landing page (existing, refactored)
  layout.tsx                        # Root layout (existing, updated metadata)
  case-studies/
    page.tsx                        # Case studies index
    [slug]/
      page.tsx                      # Individual case study
      opengraph-image.tsx           # Dynamic OG image
```

**Use `generateStaticParams`** to pre-render all 6 case study pages at build time. Zero runtime cost on Vercel. **Use `generateMetadata`** per slug for unique title/description/OG per case study.

### Animation Pattern: Centralized GSAP Registration

Instead of the current pattern where every component does:
```typescript
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

Centralize GSAP plugin registration once in a shared module:
```typescript
// lib/gsap.ts
'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
```

Components import from `lib/gsap.ts` instead of directly from `gsap`. Single registration point, no duplicated guards, cleaner imports.

### Image Strategy: Enable Next.js Image Optimization

The current `next.config.js` has `images: { unoptimized: true }` -- this disables all image optimization. For a portfolio site with case study screenshots, architecture diagrams, and team photos, this should be changed to leverage Vercel's built-in image optimization:

```javascript
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};
```

Use `<Image>` component with `priority` for hero/above-fold images, and standard lazy loading for case study content images.

## Installation

```bash
# New dependencies
npm install @gsap/react

# No other new packages needed -- SplitText, Flip are in gsap already
# next-transition-router is optional (add if page transitions are prioritized)
# npm install next-transition-router

# Cleanup: remove unused dependency
# npm uninstall @supabase/supabase-js  (verify not in use first)
```

**That's it.** The power of this stack is that almost everything needed is already installed or bundled free with GSAP 3.14. The main addition is `@gsap/react` for proper hook-based animation lifecycle management.

## Version Verification Summary

| Package | Claimed Version | Verified Via | Confidence |
|---------|----------------|--------------|------------|
| @gsap/react | 2.1.2 | `npm view` (live registry check) | HIGH |
| gsap | 3.14.2 | `npm view` + package.json | HIGH |
| lenis | 1.3.21 (latest) | `npm view` (live registry check) | HIGH |
| next-transition-router | 0.2.11 | `npm view` (live registry check) | HIGH |
| Next.js | 15.5.12 | package.json | HIGH |
| React | 19.0.0 | package.json | HIGH |
| Tailwind CSS | 4.x | package.json | HIGH |
| SplitText free | Since GSAP 3.13.0 | Multiple sources (Codrops, GSAP GitHub, npm) | HIGH |

## Sources

- [GSAP Official React Integration Guide](https://gsap.com/resources/React/)
- [@gsap/react on npm](https://www.npmjs.com/package/@gsap/react)
- [GSAP on npm](https://www.npmjs.com/package/gsap)
- [Codrops: Free GSAP Plugins (SplitText, MorphSVG)](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)
- [next-transition-router GitHub](https://github.com/ismamz/next-transition-router)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Dynamic OG Images](https://www.buildwithmatija.com/blog/complete-guide-dynamic-og-image-generation-for-next-js-15)
- [Next.js viewTransition (experimental)](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition)
- [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- [ScrollSmoother vs Lenis Comparison](https://zuncreative.com/blog/smooth_scroll_meditation/)
- [Tailwind v4 + Next.js 15 Setup](https://dev.to/darshan_bajgain/setting-up-2025-nextjs-15-with-shadcn-tailwind-css-v4-no-config-needed-dark-mode-5kl)
- [GSAP + Next.js 15 Best Practices](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Setting Up GSAP with Next.js 2025 Edition](https://javascript.plainenglish.io/setting-up-gsap-with-next-js-2025-edition-bcb86e48eab6)
