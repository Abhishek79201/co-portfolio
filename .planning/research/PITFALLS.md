# Domain Pitfalls

**Domain:** Dev Studio Portfolio (Next.js 15 + GSAP + Lenis brownfield upgrade to multi-page)
**Researched:** 2026-04-01

---

## Critical Pitfalls

Mistakes that cause rewrites, broken production deploys, or severe UX regressions.

### Pitfall 1: ScrollTrigger Memory Leaks on Route Changes

**What goes wrong:** Navigating between the homepage and `/case-studies/[slug]` pages creates new ScrollTrigger instances on each mount, but stale instances from the previous page remain alive. After a few navigations, dozens of orphaned triggers accumulate, firing at wrong scroll positions, consuming memory, and causing animation jank.

**Why it happens:** Every component in the current codebase (Hero, About, Experience, Projects, Contact) creates its own `gsap.context()` in a `useEffect` and returns `ctx.revert()` on cleanup. This pattern works for unmounting, but the timing of Next.js App Router unmount/remount during soft navigation can leave a window where old triggers fire before cleanup completes. Furthermore, GSAP's `gsap.context()` approach requires careful scoping; if any animation is created outside the context (e.g., in a callback or timeout), it escapes cleanup entirely.

**Consequences:** Scroll position jumps, animations trigger at wrong positions, browser tab memory grows 10-50MB per navigation cycle, eventual tab crash on mobile.

**Prevention:**
1. Replace manual `useEffect` + `gsap.context()` with the official `@gsap/react` `useGSAP` hook. It handles cleanup automatically, including in React 18/19 Strict Mode double-mount.
2. Centralize GSAP plugin registration in a single `lib/gsap.ts` file instead of the current pattern where every component calls `gsap.registerPlugin(ScrollTrigger)` independently.
3. After route change, call `ScrollTrigger.refresh()` once all new page content has rendered (use `requestAnimationFrame` to defer).
4. Test the full navigation cycle: Home -> Case Studies listing -> Case Study detail -> browser Back -> Home. Run `ScrollTrigger.getAll().length` in DevTools after each step; the count should match only the triggers on the current page.

**Detection:** Open DevTools console after navigating between pages a few times. Run `ScrollTrigger.getAll().length`. If it grows with each navigation, there's a leak.

**Phase:** Must be addressed in the very first phase that introduces new routes. Retrofitting cleanup is harder than building it correctly from the start.

---

### Pitfall 2: Existing Lenis Cleanup Bug (Anonymous Function Leak)

**What goes wrong:** The current `SmoothScrollProvider.tsx` has a bug in its cleanup function that will become a real problem once multi-page routing is added. The cleanup creates a *new* anonymous arrow function instead of removing the original one:

```typescript
// Current code (lines 41-43 of SmoothScrollProvider.tsx)
return () => {
  lenis.destroy();
  gsap.ticker.remove((time) => {     // <-- NEW function, not the original
    lenis.raf(time * 1000);
  });
};
```

The `gsap.ticker.remove()` call passes a freshly created anonymous function that has no reference equality with the original function added via `gsap.ticker.add()`. The original callback is never actually removed from GSAP's ticker.

**Why it happens:** JavaScript identity comparison. `(time) => lenis.raf(time * 1000)` creates a new function object each time. `gsap.ticker.remove(fn)` compares by reference, so it silently does nothing.

**Consequences:** On a single-page site, this is masked because the component never unmounts. With routing, every navigation potentially leaks a ticker callback. Each leaked callback calls `raf()` on a destroyed Lenis instance, causing errors or silent performance degradation.

**Prevention:**
Store the callback in a ref or variable:
```typescript
const rafCallback = useRef<((time: number) => void) | null>(null);

useEffect(() => {
  const lenis = new Lenis({ duration: 1.2, ... });
  lenisRef.current = lenis;

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => lenis.raf(time * 1000);
  rafCallback.current = raf;
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    if (rafCallback.current) gsap.ticker.remove(rafCallback.current);
    lenis.destroy();
  };
}, []);
```

**Detection:** Add `console.log` inside the ticker callback and observe if it keeps firing after navigation.

**Phase:** Fix immediately in the first phase, before adding any routes. This is a pre-existing bug.

---

### Pitfall 3: Lenis Scroll Position Desync After Navigation

**What goes wrong:** User scrolls halfway down the homepage, clicks a link to `/case-studies/gleemeet`, and the case study page opens at a random scroll position (or worse, partway down). Navigating back to the homepage lands at position 0 instead of restoring where they were, breaking the "browsing flow" feel.

**Why it happens:** The `SmoothScrollProvider` initializes Lenis once in the root layout and never re-initializes it on route change. Lenis maintains its own internal scroll position that can diverge from the browser's native scroll position during soft navigation. When the page content changes (new route), Lenis's cached document height, scroll position, and velocity are all stale.

**Consequences:** New pages start at wrong scroll positions. ScrollTrigger animations (which get their position from Lenis via `lenis.on('scroll', ScrollTrigger.update)`) fire incorrectly or not at all. Users see content "jump" or animations appear frozen.

**Prevention:**
1. Listen to route changes via `usePathname()` from `next/navigation`. On change, call `lenis.scrollTo(0, { immediate: true })` to reset, then `ScrollTrigger.refresh()` after a single `requestAnimationFrame` delay.
2. Expose the Lenis instance via React Context so any component can call `lenis.resize()` when dynamic content loads (e.g., images in case studies).
3. For browser back/forward navigation, consider whether scroll restoration is desired. If yes, save scroll position in `sessionStorage` keyed by pathname and restore it on popstate. If no, always reset to top.

**Detection:** Navigate to a case study, scroll down, press browser Back. If the homepage scroll position doesn't match where you left off, Lenis restoration is broken. Navigate to a case study from partway down the homepage; if it doesn't start at the top, Lenis reset is broken.

**Phase:** Must be solved in the routing infrastructure phase, before building case study pages.

---

### Pitfall 4: Navigation Anchor Links Break Across Routes

**What goes wrong:** The current `Navigation.tsx` uses hash-based anchor links (`#about`, `#experience`, `#projects`, `#contact`). These work on the single-page homepage because the target sections exist in the DOM. On a case study page, clicking "Projects" in the nav does nothing because there's no `#projects` element on that page.

**Why it happens:** Next.js `<Link href="#projects">` only scrolls to an element on the *current* page. It does not navigate to `/` and then scroll to `#projects`. This is a fundamental difference between single-page anchor navigation and multi-page routing.

**Consequences:** Navigation appears broken on every page except the homepage. Users on case study pages cannot get back to specific homepage sections. The nav "active" state detection (which uses `getBoundingClientRect` on section IDs) also breaks because those elements don't exist.

**Prevention:**
1. Change nav links from `#about` to `/#about` (prefixed with the homepage route). Next.js will navigate to `/` first, then scroll to the anchor.
2. Implement conditional logic: if already on `/`, use smooth scroll to the section. If on another route, navigate to `/#section`.
3. Add a "Case Studies" link to the nav for the new route.
4. Update the active-section detection to be route-aware: highlight nav items based on both the current route AND scroll position (only on homepage).

**Detection:** Navigate to any non-homepage route and try clicking the nav links. If they do nothing or scroll within the current page, this pitfall has occurred.

**Phase:** Must be addressed when adding the first non-homepage route. The navigation component needs to be route-aware from day one.

---

### Pitfall 5: Static Generation Broken by Client-Side Imports

**What goes wrong:** Case study pages (`/case-studies/[slug]`) should use `generateStaticParams` for build-time static generation and `generateMetadata` for per-page SEO. Both run server-side. If the page component imports any module that touches `window`, `document`, or GSAP at the module level, the build crashes on Vercel.

**Why it happens:** The current codebase uses `if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }` at the top level of multiple component files. While this doesn't crash on server, it's fragile. If `generateStaticParams` or `generateMetadata` in a case study page file accidentally imports a client component (even transitively), and that client component has a top-level side effect that slips past the guard, the build fails.

**Consequences:** Build failures on Vercel deploy. Or worse: the build succeeds but produces hydration mismatches (server HTML differs from client HTML), causing a flash of unstyled/un-animated content.

**Prevention:**
1. Case study page files (`app/case-studies/[slug]/page.tsx`) MUST be server components. They handle `generateStaticParams`, `generateMetadata`, and data fetching.
2. All animated/interactive UI goes into separate `'use client'` components that the server component imports.
3. Case study data (project descriptions, tech stacks, metrics) lives in plain TypeScript data files (`lib/case-studies.ts`) with zero client-side dependencies.
4. The `lib/gsap.ts` centralized module must have `'use client'` at the top.
5. Run `npm run build` locally before every PR to catch server-side import errors early.

**Detection:** Run `next build`. Any error referencing `window is not defined` or `document is not defined` during the static generation phase indicates a server/client boundary violation.

**Phase:** Must be correct from the first case study page implementation. Getting the component boundary wrong early means a painful refactor later.

---

### Pitfall 6: Next.js 15 Dynamic Route Params Are Promises

**What goes wrong:** In Next.js 15, the `params` object passed to page components and `generateMetadata` in dynamic routes (`[slug]`) is a `Promise` that must be `await`ed. Code that destructures params synchronously like `{ params: { slug } }` silently gets `undefined` for the slug value, resulting in empty/broken case study pages.

**Why it happens:** Next.js 15 changed the params API from synchronous to asynchronous. This is a breaking change from Next.js 14 patterns and many tutorials/examples online still show the old synchronous pattern.

**Consequences:** Case study pages render with no content (slug is undefined), `generateMetadata` produces empty/incorrect titles and descriptions, and `generateStaticParams` may appear to work but the pages are blank.

**Prevention:**
```typescript
// WRONG (Next.js 14 pattern)
export default function CaseStudyPage({ params: { slug } }) { ... }

// CORRECT (Next.js 15 pattern)
type Props = { params: Promise<{ slug: string }> };

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  // ...
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  // ...
}
```

**Detection:** The page loads but shows no case study content, or metadata is wrong. Check the browser console for async-related warnings.

**Phase:** Relevant when implementing the `app/case-studies/[slug]/page.tsx` route.

---

## Moderate Pitfalls

### Pitfall 7: layout.tsx vs template.tsx Confusion for Page Transitions

**What goes wrong:** Developers use `layout.tsx` for the case studies route group and expect animations to re-trigger when navigating between different case study pages. But `layout.tsx` persists state and does NOT remount when switching between sibling routes (e.g., `/case-studies/gleemeet` to `/case-studies/careerbox`). Animations that ran on the first case study visit never run again on subsequent ones.

**Why it happens:** Next.js App Router `layout.tsx` is designed to persist across child route changes. Only `template.tsx` creates a new instance on every route change, triggering mount/unmount cycles that animation libraries depend on.

**Prevention:**
- Use `template.tsx` (not `layout.tsx`) inside `app/case-studies/[slug]/` if you need animations to re-initialize when navigating between case studies.
- Alternatively, keep `layout.tsx` for shared UI (navigation, footer) but make the animated content a client component that uses `usePathname()` as a key: `<AnimatedContent key={pathname} />`. This forces React to remount the component on route changes.
- Be deliberate: layout for persistent UI, template for re-animated content.

**Detection:** Navigate from one case study to another. If the entry animations don't replay on the second case study, this is the issue.

**Phase:** Relevant when building the case study detail page structure.

---

### Pitfall 8: CLS (Cumulative Layout Shift) from GSAP Entry Animations

**What goes wrong:** The current codebase animates elements FROM hidden/offset states (opacity: 0, y: 60, scale: 0.3, clipPath: inset). Until JavaScript loads and GSAP runs, these elements are in their CSS-defined positions. When GSAP kicks in, it sets them to their "from" state (hidden), then animates them in. This causes a visible "flash" where content appears, disappears, then animates in -- a CLS penalty.

**Why it happens:** The Hero component mitigates this well (uses `gsap.from()` so elements are visible by default and animate FROM hidden). But other components use `gsap.fromTo()` with explicit starting states that differ from the CSS defaults. During the window between HTML paint and JS execution, elements are visible in their final position, then GSAP resets them to their start position.

**Consequences:** Google PageSpeed Insights penalizes CLS. Users on slow connections see a content flash. The problem is worse on case study pages with images and text blocks that shift.

**Prevention:**
1. For elements that animate in, set their initial hidden state in CSS (not GSAP). Use a CSS class like `.will-animate { opacity: 0; transform: translateY(30px); }` and have GSAP animate TO the final visible state.
2. Alternatively, use the `gsap.from()` pattern (like Hero does) where elements are visible by default and GSAP only pushes them to a hidden state then animates them back.
3. Keep the GSAP script bundle small so it loads fast (centralized import helps tree-shaking).
4. For case study pages, ensure the main content (title, description, tech stack) is server-rendered and visible without JS. Only decorative animations should depend on JS.

**Detection:** Run Lighthouse or PageSpeed Insights. Check the CLS filmstrip for elements that jump. Also: disable JavaScript in DevTools and reload; content that disappears entirely is a problem.

**Phase:** Should be addressed as animations are built for new pages. Retrofit existing components when improving animation fluidity.

---

### Pitfall 9: Case Study Images Without next/image Optimization

**What goes wrong:** Case study pages will likely include architecture diagrams, screenshots, and result graphics. Using plain `<img>` tags (or setting `images: { unoptimized: true }` as the current `next.config.js` does) means no lazy loading, no responsive srcsets, no WebP/AVIF conversion, and no blur placeholders. This hammers LCP on image-heavy pages.

**Consequences:** Case study pages have poor LCP scores (images are the largest contentful element). Vercel bandwidth costs increase. Mobile users on slow connections wait for full-resolution images to load.

**Prevention:**
1. Remove `images: { unoptimized: true }` from `next.config.js`. This was likely added to avoid Vercel Image Optimization limits or to sidestep a build issue, but it disables ALL image optimization.
2. Use `next/image` for all case study images with proper `width`, `height`, `alt`, and `priority` (for above-the-fold hero images only).
3. For architecture diagrams, consider SVG (infinitely scalable, small file size, no optimization needed).
4. Set explicit dimensions on all images to prevent CLS during loading.

**Detection:** Run Lighthouse on a case study page. If LCP is > 2.5s and the LCP element is an image, this pitfall is active.

**Phase:** Relevant when building case study detail pages with visual content.

---

### Pitfall 10: Unused Dependencies Bloating the Bundle

**What goes wrong:** The `package.json` contains ~40 Radix UI packages (shadcn/ui components), `@supabase/supabase-js`, `recharts`, `embla-carousel-react`, `react-day-picker`, `input-otp`, and `react-resizable-panels` -- none of which appear to be used in the current page components. While tree-shaking should exclude unused code from the client bundle, these packages still increase `npm install` time, TypeScript compilation time, and create a false sense of the project's complexity.

**Prevention:**
1. Audit actual imports: `grep -r "from '@radix-ui" components/ app/` to see which Radix packages are actually imported.
2. Remove unused shadcn/ui component files from `components/ui/`. For a portfolio site, keep only what's needed: `button`, `badge`, `separator`, `tabs`, `tooltip`. Remove: `calendar`, `chart`, `carousel`, `command`, `input-otp`, `menubar`, `radio-group`, `resizable`, `slider`, `switch`, `table`, `toggle-group`, etc.
3. Verify if `@supabase/supabase-js` is used anywhere. If the contact form uses only `mailto:` (which it currently does), remove Supabase.
4. Do this cleanup in a dedicated phase to avoid accidental breakage.

**Detection:** Run `npx depcheck` or manually grep for imports. If a package has zero imports, it's safe to remove.

**Phase:** Best done in a cleanup/infrastructure phase before adding new features.

---

### Pitfall 11: GSAP `registerPlugin` Scattered Across Components

**What goes wrong:** Currently, every animated component (Hero, About, Experience, Projects, Contact) independently imports `gsap` and `ScrollTrigger` and calls `gsap.registerPlugin(ScrollTrigger)` at the module level with a `typeof window` guard. While calling `registerPlugin` multiple times is harmless, this pattern makes it easy to:
- Forget to register a new plugin (e.g., SplitText) in one component
- Accidentally import from different GSAP entry points
- Miss tree-shaking opportunities

**Prevention:**
Create a single `lib/gsap.ts` file:
```typescript
'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```
All components import from `@/lib/gsap` instead of directly from `gsap`. This guarantees consistent registration, a single import path, and easier future plugin additions.

**Detection:** Search codebase for `from 'gsap'` and `from 'gsap/ScrollTrigger'`. If found outside `lib/gsap.ts`, they need to be migrated.

**Phase:** Should be done in the first phase alongside the `useGSAP` migration.

---

## Minor Pitfalls

### Pitfall 12: Schema.org Migration from Person to Organization

**What goes wrong:** The current JSON-LD uses `@type: "Person"` with Abhishek's details. Switching to `@type: "Organization"` affects how Google surfaces the site in search. An incomplete migration (keeping Person-specific fields like `jobTitle` on an Organization entity, or losing the existing Person schema entirely) confuses search crawlers and may temporarily drop search visibility.

**Prevention:**
- Use `@type: "Organization"` with `founder` array containing both Person entities.
- Move `knowsAbout` to Organization level, reflecting studio capabilities.
- Update `sameAs` to studio social profiles (create them first).
- Validate with Google's Rich Results Test before and after deployment.
- Keep the old Person schema alongside the new Organization schema during the transition period (Google allows multiple JSON-LD blocks).

**Detection:** Use Google's Rich Results Test or Schema Markup Validator. Check Google Search Console for structured data errors after deployment.

**Phase:** SEO/branding phase.

---

### Pitfall 13: OG Images Not Unique Per Case Study

**What goes wrong:** Using the same generic OG image for all case study pages means every shared link on social media looks identical. This defeats the purpose of having separate case study pages -- they all share the same preview card.

**Prevention:**
- Generate unique OG images per case study using Next.js `opengraph-image.tsx` (or a similar approach with `@vercel/og`).
- Include the project name, a key metric, and the studio branding in each OG image.
- Design at 1200x630 with 100px safe padding from edges (Twitter and LinkedIn crop differently).
- Test with Facebook Sharing Debugger, Twitter Card Validator, and LinkedIn Post Inspector.

**Detection:** Share a case study URL on any social platform. If the preview shows a generic image instead of project-specific one, this pitfall is active.

**Phase:** Can be deferred to after case study pages are functional, but should be done before any marketing/sharing of the pages.

---

### Pitfall 14: Mobile Animation Performance Degradation

**What goes wrong:** The current site has character-by-character animations (Hero), word-by-word scroll reveals (About), parallax blobs with mouse tracking, elastic easing, and staggered reveals across all sections. Adding case study pages with their own animations (architecture diagram reveals, metric counters, image transitions) compounds the animation load. Mid-range mobile devices (sub-$300 Android phones, which dominate the Indian market where CareerBox and Zorova operate) will experience frame drops and scroll jank.

**Prevention:**
1. Use `gsap.matchMedia()` to create reduced-motion variants for mobile:
   - Skip character-level animations on small screens
   - Use simpler easing (no `elastic.out`)
   - Remove parallax blob mouse tracking on touch devices
   - Reduce stagger counts
2. Respect `prefers-reduced-motion` media query for accessibility.
3. Profile with Chrome DevTools Performance tab on a throttled CPU (4x slowdown) before deploying.
4. Lenis smooth scroll itself adds overhead; consider disabling it on low-end mobile or reducing `duration` for a snappier feel.

**Detection:** Open the site on a $200 Android phone (or use Chrome DevTools device emulation with CPU throttling). If scrolling feels sluggish or animations visibly drop frames, this is the issue.

**Phase:** Should be considered throughout all animation work, but a dedicated performance pass should happen after case study pages are built.

---

### Pitfall 15: Case Study Back-Navigation Animation Replay

**What goes wrong:** User visits a case study, watches the entry animations play, scrolls through, then presses the browser Back button to return to the homepage. The homepage entry animations replay from scratch (Hero characters bounce in again, stats count up from 0, etc.) instead of the page appearing in its "scrolled to" final state.

**Why it happens:** React unmounts the homepage components on navigation to a case study, and remounts them on Back navigation. GSAP animations in `useEffect` run on every mount, so every "return to homepage" triggers the full animation sequence again.

**Prevention:**
- Track whether animations have played using a session-level flag (React context or `sessionStorage`).
- On subsequent mounts (back navigation), skip entry animations and show elements in their final state immediately.
- For scroll-linked animations (like the word-by-word reveal in About), these naturally work on re-scroll since they're scroll-driven, but their initial state needs to match the scroll position.
- Use `ScrollTrigger.refresh()` after remount so scrub-based animations pick up the current scroll position correctly.

**Detection:** Navigate Home -> Case Study -> Back. If the Hero plays its full 2-second entry animation again, this pitfall is active.

**Phase:** Polish phase, after core routing and case study pages are functional.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfalls | Mitigation |
|---|---|---|
| **Routing infrastructure** | #1 (ScrollTrigger leaks), #2 (Lenis cleanup bug), #3 (Lenis desync), #4 (Nav anchor links), #11 (Plugin registration) | Fix Lenis bug first. Adopt `useGSAP`. Centralize GSAP. Build route-change cleanup into the scroll provider. Make nav route-aware. |
| **Case study pages** | #5 (Static gen broken), #6 (Params as Promises), #7 (layout vs template), #9 (Image optimization) | Server component page files. Await params. Use template.tsx for animated content. Enable next/image. |
| **Case study content/SEO** | #8 (CLS), #12 (Schema migration), #13 (OG images) | CSS initial hidden states. Proper JSON-LD. Per-page OG images. |
| **Animation improvements** | #8 (CLS), #14 (Mobile perf), #15 (Back-nav replay) | gsap.matchMedia for mobile. Session-aware animations. CSS-first hidden states. |
| **Cleanup/maintenance** | #10 (Unused deps) | Audit and remove before feature work to keep build fast. |

## Sources

- [GSAP ScrollTrigger Tips & Mistakes (Official)](https://gsap.com/resources/st-mistakes/) -- HIGH confidence
- [GSAP + Next.js 15 Best Practices (Medium, Nov 2025)](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) -- MEDIUM confidence
- [GSAP React Integration (Official)](https://gsap.com/resources/React/) -- HIGH confidence
- [Lenis GitHub: ReactLenis navigation issue #319](https://github.com/darkroomengineering/lenis/issues/319) -- HIGH confidence
- [Lenis GitHub: Next.js Link scroll position Discussion #244](https://github.com/darkroomengineering/lenis/discussions/244) -- HIGH confidence
- [GSAP Forum: ScrollTrigger + Next.js Route Changes](https://gsap.com/community/forums/topic/28592-scrolltrigger-and-nextjs-scroll-position-after-route-change/) -- MEDIUM confidence
- [GSAP Forum: Centralized Plugin Registration](https://gsap.com/community/forums/topic/40634-good-way-to-register-gsap-plugins-in-nextjs-app-router-and-how-many-many-times-we-can-do-it/) -- MEDIUM confidence
- [Next.js App Router: Pages and Layouts (Official)](https://nextjs.org/docs/app/getting-started/layouts-and-pages) -- HIGH confidence
- [Next.js: generateStaticParams (Official)](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- HIGH confidence
- [Next.js 15 Dynamic Routes Params Promise Pattern](https://fortifiedhq.com/blog/next-js-15-dynamic-routes-params-promise) -- MEDIUM confidence
- [GSAP GitHub: App crashes with ScrollTrigger + Next.js navigation #440](https://github.com/greensock/GSAP/issues/440) -- HIGH confidence
- [Core Web Vitals Optimization for Next.js (2025)](https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025) -- MEDIUM confidence
- [Next.js SEO Pitfalls (FocusReactive)](https://focusreactive.com/typical-next-js-seo-pitfalls-to-avoid-in-2024/) -- MEDIUM confidence
