# Phase 4: Animation & Polish - Research

**Researched:** 2026-04-02
**Domain:** GSAP animation system — SplitText, DrawSVG, matchMedia, ScrollTrigger scroll reveals, SVG path tracing, client component architecture for Server Component pages
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**SplitText Migration**
- D-01: Replace manual `text.split('')` in Hero.tsx and `text.split(' ')` in About.tsx with GSAP SplitText (`gsap/SplitText`). Register SplitText in `lib/gsap.ts` alongside ScrollTrigger and useGSAP.
- D-02: The scramble text effect in Hero.tsx and Projects.tsx is a signature animation — preserve the scramble behavior. SplitText may be used internally for the character splitting, but the scramble logic itself stays.

**Architecture Diagram Animations**
- D-03: SVG path tracing style — arrows draw themselves along their paths using stroke-dashoffset animation, then boxes/nodes fade and scale in at endpoints. Premium portfolio-worthy effect.
- D-04: Scroll-triggered once — diagram animates when scrolled into view via ScrollTrigger. Replays if user navigates away and returns to the page.
- D-05: All 3 existing diagram components (`GleeMeetDiagram.tsx`, `CareerBoxDiagram.tsx`, `ZorovaDiagram.tsx`) get the same animation treatment. They're currently static SVG Server Components — will need client wrappers or conversion for GSAP animation.

**Case Study Page Section Reveals**
- D-06: Extend the landing page scroll-triggered reveal pattern to case study detail pages. Each of the 8 sections gets a scroll-triggered entrance animation.
- D-07: Case study pages are currently Server Components. Animated sections need client component wrappers — keep the page shell as a Server Component for SEO, wrap animated sections in client boundary components.

**Metric Card Animations**
- D-08: Staggered card reveal — each metric card fades up + slides in with a stagger delay. The metric value highlights with a brief accent color flash on entrance. Clean and editorial style.
- D-09: Metrics are qualitative text (Phase 3 D-03), not numbers. No counter/counting animations needed.

**Landing Page Fluidity**
- D-10: Timing/easing overhaul across all existing sections (Hero, About, Experience, Projects, Contact). Fix easing curves, improve stagger timing.
- D-11: Add scroll-linked (scrub) animations where appropriate — parallax effects, opacity shifts, progress indicators.
- D-12: Claude audits all landing page sections and prioritizes improvements by visual impact.

**Mobile Animation Strategy**
- D-13: Simplified animation variants on mobile via `gsap.matchMedia()`. Fewer staggered children, no parallax effects, simpler easing. Not CSS-only — still uses GSAP.
- D-14: Breakpoint: `gsap.matchMedia()` with 768px mobile breakpoint (matching Tailwind `md`). Desktop gets full animations, mobile gets simplified variants.

**Reduced Motion / Accessibility**
- D-15: `prefers-reduced-motion` must be respected in both CSS (already partial in globals.css:296-304) and GSAP. Extend GSAP animations to check reduced-motion preference via `gsap.matchMedia()`.

### Claude's Discretion
- Reduced-motion implementation approach (instant final state vs gentle fades only vs hybrid)
- Per-section scrub vs trigger decisions
- Easing curve choices per animation type
- Client component wrapper architecture for case study page animations (granularity)

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANIM-01 | GSAP SplitText replaces manual character/word splitting in Hero and About | SplitText API verified: `SplitText.create()` with `autoSplit`+`onSplit` is the canonical pattern; cleanup automatic via useGSAP context |
| ANIM-02 | Scroll-triggered section reveals on case study pages | Pattern directly extends existing `useGSAP` + ScrollTrigger pattern already in Hero/About/Experience; case study page is Server Component, needs client wrapper per D-07 |
| ANIM-03 | Architecture diagram reveal animations (trace arrows, fade in components) | DrawSVGPlugin free since gsap 3.13, bundled with gsap package; `stroke-dashoffset` technique confirmed; diagrams currently use `<line>` and `<polygon>` elements, both supported |
| ANIM-04 | Metric card animations on scroll entry | Stagger reveal pattern is established across codebase; metric cards in Section 06 of case study page identified; client wrapper needed since page.tsx is Server Component |
| ANIM-05 | `gsap.matchMedia()` for reduced-motion variants on mobile | gsap.matchMedia() conditions API verified; single mm instance can combine breakpoints + prefers-reduced-motion in one conditions object |
| ANIM-06 | `prefers-reduced-motion` respected in CSS and GSAP | CSS partial implementation at globals.css:296-304; GSAP side handled via matchMedia conditions |
| ANIM-07 | Overall animation fluidity improvement across existing sections | Current code audited — specific easing/timing issues documented below; no new library needed |
</phase_requirements>

---

## Summary

This phase upgrades the animation layer across the entire site. It has three distinct workstreams: (1) replace fragile manual text splitting in landing page components with GSAP SplitText, (2) add scroll-triggered animations to the case study pages that are currently static Server Components, and (3) implement `gsap.matchMedia()` for mobile-simplified and reduced-motion-compliant variants across all animated components.

The existing GSAP infrastructure (`lib/gsap.ts`, `useGSAP` hook, ScrollTrigger) is already solid from Phase 1 work. No new npm packages are needed. DrawSVGPlugin for diagram path-tracing and SplitText for text splitting are both bundled free in the installed `gsap` package (version ^3.14.2). The only registration step is adding `SplitText` and `DrawSVGPlugin` to the `gsap.registerPlugin()` call in `lib/gsap.ts`.

The biggest architectural challenge is the case study page: `app/case-studies/[slug]/page.tsx` is a Server Component that directly renders the 8 content sections inline. Animations require `'use client'` components with refs. The plan needs client-side wrapper components that the Server Component renders — keeping the page shell static for SEO while enabling GSAP animations inside.

**Primary recommendation:** Register DrawSVGPlugin + SplitText in `lib/gsap.ts`, create a thin `CaseStudyAnimations` client wrapper for the detail page, and implement one centralized `gsap.matchMedia()` instance per component that handles desktop, mobile, and reduced-motion conditions in a single conditions object.

---

## Standard Stack

### Core (already installed — no new packages needed)

| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| `gsap` | ^3.14.2 | Animation engine | KEEP — SplitText + DrawSVGPlugin bundled inside |
| `@gsap/react` | (installed) | `useGSAP` hook for React lifecycle | KEEP — already used in all components |
| `gsap/SplitText` | bundled in gsap | Split text into chars/words/lines for GSAP animation | ADD to lib/gsap.ts registration |
| `gsap/DrawSVGPlugin` | bundled in gsap | Animate SVG stroke-dashoffset for path tracing | ADD to lib/gsap.ts registration |

**Verified:** Both SplitText and DrawSVGPlugin are free and bundled inside the installed `gsap` package since version 3.13.0. No `npm install` step required.

**Updated lib/gsap.ts registration:**
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP };
```

---

## Architecture Patterns

### Current Animation State (Audit)

After reading all component files, here is the precise current state of animations in each component:

**Hero.tsx (lines 63-143)**
- Manual character splitting: `CharLine` component uses `text.split('').map(c => <span>)` — JSX-based pre-render, not a GSAP SplitText instance
- Entry animations: elastic bounce on name chars, scramble on role, clip reveal on description, back.out on CTA buttons
- Scroll scrub: name parallax (y: -180, opacity 0.2), blob parallax — already using scrub
- Counters: `setInterval`-based for products/years/founders counts — not GSAP
- Issue: `elastic.out(1, 0.55)` on many characters simultaneously is expensive on mobile; no matchMedia guard

**About.tsx (lines 36-52)**
- Manual word splitting: `introRef.current.innerHTML = text.split(' ').map(...)` — raw DOM mutation inside useGSAP
- This DOM mutation in useGSAP runs synchronously, which works but means the React-rendered `<p>` content is replaced with manually injected spans
- Scroll-scrubbed word-by-word reveal: `scrub: 1`, `start: 'top 75%'`, `end: 'bottom 40%'`
- Various ScrollTrigger reveals: label clip, heading slide, stats scale bounce, education slide, skill groups slide, skill pills pop

**Experience.tsx**
- Alternating slide direction per row (`fromX: i % 2 === 0 ? -80 : 80`) with slight rotation
- All ScrollTrigger discrete triggers (no scrub) — this is already clean

**Contact.tsx**
- Label clip, heading slide, contact-link stagger, form clip reveal
- All discrete ScrollTrigger triggers — clean

**Case Study page.tsx**
- Fully Server Component — zero GSAP animations currently
- 8 sections rendered inline in the server component body
- Diagrams imported directly as Server Components (no animation)

### Pattern 1: SplitText Migration (Hero.tsx)

The `CharLine` component currently pre-renders characters as `<span>` elements in JSX. The goal (D-01) is to replace this with SplitText while preserving the scramble behavior (D-02).

The scramble effect targets `roleRef.current` via `innerText` assignment — this is separate from the name character animation. The scramble is safe to keep as-is.

For the name character animation:
- Remove `CharLine` component
- Render the text as plain text nodes in `<h1>` spans
- Use `SplitText.create()` with `autoSplit: true` and `onSplit` callback inside `useGSAP`
- The `onSplit` callback returns the animation, enabling automatic cleanup and re-split on font load

```typescript
// Source: https://gsap.com/docs/v3/Plugins/SplitText/
import { gsap, SplitText, useGSAP } from '@/lib/gsap';

useGSAP(() => {
  const tl = gsap.timeline({ delay: 0.05 });

  [name1Ref, name2Ref].forEach((ref, lineIdx) => {
    if (!ref.current) return;
    SplitText.create(ref.current, {
      type: 'chars',
      autoSplit: true,
      onSplit(self) {
        return tl.from(self.chars, {
          opacity: 0, y: '140%',
          rotation: () => (Math.random() - 0.5) * 30,
          scale: 0.5,
          duration: 1.0, stagger: 0.02,
          ease: 'back.out(2)',  // smoother than elastic for text
        }, 0.1 + lineIdx * 0.1);
      }
    });
  });
}, { scope: sectionRef, dependencies: [scramble] });
```

**Key API note:** Use `SplitText.create()` not `new SplitText()`. The `autoSplit: true` + `onSplit` returning the animation is the current canonical pattern — cleanup is automatic via GSAP context.

### Pattern 2: SplitText Migration (About.tsx)

The word-reveal in About.tsx currently uses raw DOM mutation: `introRef.current.innerHTML = text.split(' ').map(...)`. This works but bypasses React's DOM ownership.

Replace with SplitText `type: 'words'` inside a ScrollTrigger scrub animation:

```typescript
// Source: https://gsap.com/docs/v3/Plugins/SplitText/
if (introRef.current) {
  SplitText.create(introRef.current, {
    type: 'words',
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(self.words,
        { opacity: 0.15, color: 'var(--text-muted)' },
        {
          opacity: 1, color: 'var(--text-primary)',
          stagger: 0.04,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 1,
          }
        }
      );
    }
  });
}
```

Note: The CSS class approach (`word-reveal-dim` / `word-reveal-lit`) used in the current code can be dropped in favor of direct GSAP property animation. The existing `.word-reveal-dim` and `.word-reveal-lit` CSS classes in globals.css can be retired after migration.

### Pattern 3: DrawSVGPlugin for Diagram Path Tracing (ANIM-03)

The three diagram components are currently pure Server Components (no `'use client'` directive). They render static SVGs with `<line>`, `<polygon>` (arrowheads inside `<marker>`), and `<rect>` elements.

**DrawSVGPlugin compatibility check:**
- `<line>` elements — supported (confirmed in DrawSVGPlugin docs)
- `<rect>` elements — supported (confirmed)
- `<polygon>` elements inside `<marker>` — these are arrowheads, NOT the paths to animate; the `<line>` segments themselves are the targets

**Animation strategy (arrows draw first, then nodes appear):**
```typescript
// Source: https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: svgRef.current,
      start: 'top 80%',
      once: true,  // fires once; replays on page reload/navigation
    }
  });

  // Phase 1: Draw all arrow lines sequentially
  const lines = svgRef.current?.querySelectorAll('line') || [];
  tl.from(lines, {
    drawSVG: 0,
    duration: 0.4,
    stagger: 0.12,
    ease: 'power2.inOut',
  });

  // Phase 2: Nodes fade + scale in at endpoints
  const nodes = svgRef.current?.querySelectorAll('rect') || [];
  tl.from(nodes, {
    opacity: 0, scale: 0.85, transformOrigin: 'center center',
    duration: 0.35, stagger: 0.08,
    ease: 'back.out(2)',
  }, '-=0.3');  // slight overlap with arrow phase
}, { scope: svgWrapperRef });
```

**Critical DrawSVG requirement:** Each `<line>` element must have a `stroke` attribute set. The diagrams currently have `stroke="var(--line-light)"` on all `<line>` elements — this satisfies the requirement.

**Wrapper pattern (D-05, D-07):** Since the diagram components are Server Components imported into the Server Component page, they need client wrappers. Two approaches:

Option A — Convert each diagram to a client component:
```typescript
// components/diagrams/GleeMeetDiagram.tsx
'use client';
import { useRef } from 'react';
import { gsap, DrawSVGPlugin, useGSAP } from '@/lib/gsap';
```

Option B — Keep Server Component SVG, wrap it in a thin client animation shell:
```typescript
// components/diagrams/AnimatedDiagramShell.tsx  
'use client';
// Receives children (static SVG), applies GSAP to elements within
```

**Recommendation:** Option A (convert diagrams to client components). The diagrams have no server-side data dependencies and are purely visual. The conversion is a one-line addition of `'use client'` plus a `useGSAP` block. Option B adds indirection without benefit.

### Pattern 4: Case Study Client Wrapper Architecture (D-07, ANIM-02, ANIM-04)

`app/case-studies/[slug]/page.tsx` is a Server Component with 8 sections rendered inline. Three sections need animations:
- Section 03 (Architecture): diagram path tracing
- Section 06 (Results): metric card staggered reveal + accent flash
- All 8 sections: scroll-triggered entrance reveals (D-06)

**Granularity decision (Claude's discretion):** One client wrapper per animated section is more modular but creates 8 files. A single `CaseStudyAnimations` client wrapper that receives the case study accent color and animates all sections by querying DOM elements is simpler. Recommendation: use a **single client-side animation provider** wrapper that:
1. Wraps the entire article body
2. Queries selectors for `.cs-section` elements
3. Applies scroll-triggered reveals to each
4. Applies stagger to `.metric-card` elements

```typescript
// components/case-studies/CaseStudyAnimations.tsx
'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export default function CaseStudyAnimations({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = containerRef.current?.querySelectorAll('.cs-section') || [];
    sections.forEach((section, i) => {
      gsap.from(section, {
        opacity: 0, y: 40,
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 88%', once: true },
      });
    });

    // Metric card stagger + accent flash
    const cards = containerRef.current?.querySelectorAll('.metric-card') || [];
    cards.forEach((card, i) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        delay: i * 0.08,
      });
      tl.from(card, { opacity: 0, y: 30, duration: 0.5, ease: 'power3.out' });
      tl.to(card, {
        boxShadow: `0 0 20px rgba(${accentRgb},0.2)`,
        duration: 0.2, ease: 'power2.in',
      }, '>-0.1');
      tl.to(card, {
        boxShadow: '0 0 0px transparent',
        duration: 0.4, ease: 'power2.out',
      });
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}
```

The Server Component page wraps its content in `<CaseStudyAnimations accent={project.accent}>` and adds `cs-section` class to each `<section>` element and `metric-card` class to each result card.

### Pattern 5: gsap.matchMedia() for Mobile + Reduced Motion (ANIM-05, ANIM-06)

The current recommended pattern from GSAP docs is a single `matchMedia` instance with a conditions object that handles multiple queries simultaneously:

```typescript
// Source: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
const mm = gsap.matchMedia();
mm.add({
  isDesktop: '(min-width: 768px)',
  isMobile: '(max-width: 767px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}, (context) => {
  const { isDesktop, isMobile, reduceMotion } = context.conditions;

  if (reduceMotion) {
    // Skip all animations — just set final state instantly
    gsap.set('.cs-section', { opacity: 1, y: 0 });
    return;
  }

  if (isDesktop) {
    // Full animations with parallax, staggered chars, elastic easing
    gsap.from('.hero-name chars', {
      stagger: 0.025,
      ease: 'elastic.out(1, 0.55)',
      // ...
    });
  }

  if (isMobile) {
    // Simplified: fade in only, no y offset, no parallax
    gsap.from('.hero-name', {
      opacity: 0, duration: 0.4, ease: 'power2.out',
    });
  }
});
```

**Reduced-motion approach (Claude's discretion):** Use "instant final state" for all GSAP-controlled elements when `prefers-reduced-motion` is detected. This complements the existing CSS rule at `globals.css:296-304` which already disables CSS animations. The CSS rule handles CSS-driven animations; the GSAP `matchMedia` condition handles GSAP-driven ones. A "gentle fades only" approach risks still triggering discomfort in vestibular disorder users — instant final state is the most accessible standard.

**Per-component usage:** Each animated component (`Hero`, `About`, `Experience`, `Contact`, `CaseStudyAnimations`) creates its own `gsap.matchMedia()` instance scoped within `useGSAP`. The `mm.revert()` call is handled automatically when `useGSAP` cleans up its context.

### Pattern 6: Landing Page Easing Overhaul (ANIM-07)

Based on the code audit, specific easing improvements:

| Component | Current | Issue | Recommendation |
|-----------|---------|-------|----------------|
| Hero chars | `elastic.out(1, 0.55)` per char | Expensive on 10+ chars simultaneously; bouncy feel can be jarring | `back.out(2.5)` — still feels lively, less CPU |
| About stats | `elastic.out(1, 0.5)` with `scale: 0.3` start | Scale from 0.3 with elastic on mobile = jank | `power3.out` + `scale: 0.85` start |
| About skill pills | 0.35s per pill, `back.out(3)` | With `delay: i * 0.025`, 15 pills = 0.375s stagger tail — too long | Reduce stagger to 0.015, cap at 8 pills before batch |
| Hero name parallax | `scrub: 0.6` with `y: -180` | 180px shift is very aggressive | Reduce to `y: -100`, `scrub: 0.8` |
| Experience rows | `rotate: -1.5 / 1.5` | Barely perceptible at 1.5deg; adds complexity with little visual payoff | Remove rotation, focus on x + opacity |
| Contact form | `clipPath: inset(0 0 100% 0)` | Bottom-up clip is unusual; top-down is more natural for "revealing" | Keep or change to `inset(0 100% 0 0)` (right-in) |

**Scrub vs discrete trigger guidance (Claude's discretion):**
- Use scrub on: Hero name parallax, blob parallax, progress-type elements
- Use discrete triggers on: section reveals, card stagger, metric reveals, diagram animations
- Rule of thumb: scrub for parallax/depth effects, discrete for "element enters viewport and animates in once"

### Anti-Patterns to Avoid

- **Calling `SplitText.create()` outside `useGSAP`:** Creates split instances that are never cleaned up on unmount, leaving orphaned DOM nodes
- **Using `new SplitText()` constructor:** The static `.create()` method is the current API; the constructor is deprecated
- **Animating `<polygon>` inside `<marker>` with DrawSVG:** Markers are referenced, not inline — GSAP cannot animate them. Only animate the `<line>` path elements that carry the stroke
- **Setting `drawSVG: 0` on an element without a `stroke` attribute:** The animation will have no visible effect; require stroke to be set in SVG markup
- **Creating multiple `gsap.matchMedia()` instances per component:** Creates cleanup tracking overhead; one instance per component is the correct granularity
- **Forgetting `once: true` on case study section triggers:** Without it, the ScrollTrigger will re-fire if scrub is involved; for discrete entrance animations, always use `once: true`

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Character splitting for animation | Manual `text.split('').map(c => <span>)` | `SplitText.create()` | Handles font loading, line wrapping, resize with `autoSplit`; manual splits break on font load |
| SVG stroke reveal animation | Manual `stroke-dashoffset` property animation via `gsap.to(el, {strokeDashoffset: 0})` | `DrawSVGPlugin` `drawSVG: 0` | DrawSVG normalizes element length calculations, handles cross-browser quirks, has start/end percentage control |
| Media query breakpoints in GSAP | `window.matchMedia()` listeners with manual cleanup | `gsap.matchMedia()` conditions object | GSAP's version auto-reverts animations on condition change, integrates with GSAP context lifecycle |
| Reduced-motion detection | `window.matchMedia('(prefers-reduced-motion)')` in component | `gsap.matchMedia()` `reduceMotion` condition | Same instance handles both breakpoints and accessibility in one place |
| Word-by-word scroll reveal | Raw `innerHTML` DOM mutation | `SplitText.create(el, { type: 'words' })` | Avoids React DOM ownership conflict; handles re-splitting automatically |

**Key insight:** The manual splitting code in Hero.tsx and About.tsx was written before SplitText became free. Now that it is bundled at no cost, the hand-rolled versions are strictly inferior: they don't handle font loading order, don't re-split on resize, and the DOM mutation in About.tsx is technically incorrect (mutating innerHTML of a React-controlled element inside useGSAP).

---

## Common Pitfalls

### Pitfall 1: DrawSVG on `<line>` Elements Without Stroke Width

**What goes wrong:** The `drawSVG` property animates stroke visibility. If a `<line>` element has `stroke` set via CSS variable but `strokeWidth` is 0 or unset in some browsers, the animation runs but nothing appears.

**Why it happens:** CSS custom properties in SVG attributes (`stroke="var(--line-light)"`) resolve correctly in modern browsers, but some environments resolve them as empty strings during GSAP's initial measurement.

**How to avoid:** Add explicit `strokeWidth={1}` as a direct SVG attribute (already present in diagram files), not just relying on CSS. Verify by running the animation in a development build and checking that lines are visible during the in-progress animation state.

**Warning signs:** Animation completes instantly with no visible drawing effect.

### Pitfall 2: SplitText Double-Split in React Strict Mode

**What goes wrong:** In development (`NODE_ENV=development`), Next.js App Router runs React Strict Mode which double-invokes effects. `SplitText.create()` inside `useGSAP` runs twice, creating nested span-within-span wrapping on the text.

**Why it happens:** `useGSAP` uses `useIsomorphicLayoutEffect` which behaves like `useLayoutEffect` — and React Strict Mode double-fires layout effects in development.

**How to avoid:** Use the `autoSplit: true` + `onSplit` pattern. When `onSplit` returns the animation, SplitText manages its own reverts. In production (no Strict Mode double-invoke) this is not an issue. The dev double-mount is handled by `useGSAP`'s internal cleanup between invocations.

**Warning signs:** Text appears with visible nested spans or double-wrapped characters in the DOM inspector in development.

### Pitfall 3: Case Study Server Component Cannot Use GSAP Directly

**What goes wrong:** Adding `useGSAP` or `useRef` inside `app/case-studies/[slug]/page.tsx` causes a build error because the file has no `'use client'` directive.

**Why it happens:** `page.tsx` must remain a Server Component to support `generateStaticParams`, `generateMetadata`, and `notFound()` — all server-only APIs.

**How to avoid:** Wrap animated content in a `CaseStudyAnimations` client component (pattern 4 above). The page shell stays as-is; it renders `<CaseStudyAnimations>` around the article body. The diagrams are converted to client components independently.

**Warning signs:** Build error: `"You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with 'use client'"`

### Pitfall 4: DrawSVG Measuring Issues with viewBox-Scaled SVGs

**What goes wrong:** The diagrams use `viewBox="0 0 800 400"` with `width="100%"`. DrawSVG measures stroke lengths at the moment of initialization. If initialized before the SVG has rendered at its final size (e.g., before CSS layout has run), the measurements may be wrong and the draw animation will overshoot or stop early.

**Why it happens:** GSAP `DrawSVGPlugin` reads the path length at the time `ScrollTrigger` fires. On initial page load, the SVG might not have its final dimensions yet.

**How to avoid:** Use `ScrollTrigger`'s `once: true` + `start: 'top 80%'` to ensure the animation fires when the element is in the viewport and layout is stable. Alternatively, call `ScrollTrigger.refresh()` after all images/fonts load. The scroll-triggered nature naturally avoids early measurement since the diagram is below the fold.

**Warning signs:** Arrows appear to draw partially then stop, or draw past their endpoint.

### Pitfall 5: `gsap.matchMedia()` Not Reverting on Component Unmount

**What goes wrong:** A `matchMedia` instance created outside the `useGSAP` scope doesn't get automatically cleaned up when the component unmounts. Breakpoint listeners remain active on other pages.

**Why it happens:** `gsap.matchMedia()` must be created inside the `useGSAP` callback or returned from it to be included in the automatic cleanup context.

**How to avoid:** Always create the `matchMedia` instance inside the `useGSAP` callback:
```typescript
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add({ isDesktop: '(min-width: 768px)', ... }, (ctx) => { ... });
  // mm cleanup is automatic because it's inside useGSAP's context
}, { scope: sectionRef });
```

**Warning signs:** After navigating away from a page, animations from that page still fire in response to window resize events.

---

## Code Examples

### SplitText with autoSplit + onSplit (canonical pattern)
```typescript
// Source: https://gsap.com/docs/v3/Plugins/SplitText/
import { gsap, SplitText, useGSAP } from '@/lib/gsap';

useGSAP(() => {
  SplitText.create(headingRef.current, {
    type: 'chars',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.chars, {
        opacity: 0, y: '120%',
        duration: 0.8, stagger: 0.02,
        ease: 'back.out(2)',
      });
    }
  });
}, { scope: containerRef });
```

### DrawSVGPlugin — Sequential Path Tracing
```typescript
// Source: https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/
import { gsap, DrawSVGPlugin, useGSAP } from '@/lib/gsap';

useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: svgRef.current,
      start: 'top 80%',
      once: true,
    }
  });

  tl.from('line', { drawSVG: 0, duration: 0.4, stagger: 0.12, ease: 'power2.inOut' });
  tl.from('rect', { opacity: 0, scale: 0.85, duration: 0.3, stagger: 0.08, ease: 'back.out(2)' }, '-=0.3');
}, { scope: svgWrapperRef });
```

### gsap.matchMedia() with conditions object
```typescript
// Source: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add({
    isDesktop: '(min-width: 768px)',
    isMobile: '(max-width: 767px)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  }, (context) => {
    const { isDesktop, isMobile, reduceMotion } = context.conditions;

    if (reduceMotion) {
      // Instant final state — no motion at all
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    if (isDesktop) {
      gsap.from(targets, { opacity: 0, y: 60, stagger: 0.1, ease: 'power3.out', duration: 0.9 });
    }

    if (isMobile) {
      // Simpler: just fade, no y movement, no stagger
      gsap.from(targets, { opacity: 0, duration: 0.4, ease: 'power2.out' });
    }
  });
}, { scope: sectionRef });
```

### Scroll-triggered section reveal (case study pattern)
```typescript
// Extending existing pattern from Hero/About/Experience
useGSAP(() => {
  const sections = containerRef.current?.querySelectorAll('.cs-section') ?? [];
  sections.forEach((section) => {
    gsap.from(section, {
      opacity: 0, y: 40,
      duration: 0.7, ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        once: true,
      }
    });
  });
}, { scope: containerRef });
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `new SplitText()` constructor | `SplitText.create()` static method | GSAP 3.13+ | Old constructor still works but `.create()` is canonical |
| SplitText only in Club GreenSock (paid) | Free and bundled in `gsap` npm package | GSAP 3.13.0 (2024) | No additional install needed |
| DrawSVGPlugin only in Club GreenSock | Free and bundled in `gsap` npm package | GSAP 3.13.0 (2024) | No additional install needed |
| Manual `stroke-dashoffset` animation | `DrawSVGPlugin` `drawSVG` property | Available since GSAP 2.x | Handles path length normalization cross-browser |
| `useEffect + gsap.context()` pattern | `useGSAP` hook | @gsap/react 2.x | Automatic cleanup, Strict Mode safe |
| Separate `matchMedia` event listeners per breakpoint | `gsap.matchMedia()` conditions object | GSAP 3.11+ | Single instance, auto-reverts on condition change |

---

## Open Questions

1. **DrawSVG on `<line>` vs `<path>` elements**
   - What we know: Current diagrams use `<line>` elements for arrows. DrawSVGPlugin supports `<line>`. However, `<line>` elements have no "direction" — they draw from point A to point B uniformly. The directional effect (arrows appearing to travel) is inherently left-to-right in draw order.
   - What's unclear: Whether the visual effect of drawing `<line>` elements is as cinematic as drawing `<path>` elements (which have Bezier curves).
   - Recommendation: Proceed with `<line>` elements — the existing diagrams use them and conversion to `<path>` would be a separate refactor. The DrawSVG effect on lines still reads as "system coming to life."

2. **Hero scramble preservation during SplitText migration**
   - What we know: D-02 says preserve the scramble behavior. The scramble targets `roleRef.current` (the DEV STUDIO role line), not the name spans. The name spans use the `CharLine` JSX component.
   - What's unclear: Whether the `CharLine` component's pre-rendered spans interfere with SplitText if SplitText is applied to the parent `<span>` container.
   - Recommendation: Remove `CharLine` and render plain text in the `<span>` refs (`name1Ref`, `name2Ref`). SplitText takes over character splitting. The scramble on `roleRef` is unchanged — it uses `innerText` mutation which is separate from SplitText.

3. **accentRgb for metric card boxShadow flash**
   - What we know: The case study page already has `accentRgbMap` and passes accent color to the template. The `CaseStudyAnimations` wrapper will need the RGB string, not just the CSS variable name, to construct `rgba()` values for `boxShadow`.
   - What's unclear: Whether the accent should be passed as a prop or read from a CSS custom property.
   - Recommendation: Pass `accentRgb` as a string prop (e.g., `"236,72,153"`) to `CaseStudyAnimations` from the Server Component. The `accentRgbMap` already exists in `page.tsx`.

---

## Environment Availability

Step 2.6: SKIPPED — This phase is purely code changes to existing files. No new external tools, services, CLIs, databases, or runtimes are required. All animation libraries (SplitText, DrawSVGPlugin) are bundled within the already-installed `gsap` package.

---

## Validation Architecture

`workflow.nyquist_validation` is set to `false` in `.planning/config.json`. Validation architecture section skipped per configuration.

---

## Project Constraints (from CLAUDE.md)

| Directive | Impact on Phase 4 |
|-----------|-------------------|
| Tech stack locked: Next.js + React + Tailwind + GSAP | No new animation libraries. All work stays in GSAP ecosystem. |
| Hosting: Vercel | No server-side concerns for animation code; all animations are client-side |
| Design: Keep dark aesthetic, improve don't replace | Easing overhaul must feel "premium dark tech", not "playful consumer app" |
| Content: All data hardcoded in components | No CMS queries during animation setup; data is available synchronously |
| GSD workflow enforcement | All file changes go through GSD execute-phase, not direct edits |
| `frontend-design` skill for all UI work | Apply frontend-design skill conventions to all animation implementation |

---

## Sources

### Primary (HIGH confidence)
- [GSAP SplitText Official Docs](https://gsap.com/docs/v3/Plugins/SplitText/) — SplitText.create(), autoSplit, onSplit, type options
- [GSAP matchMedia() Official Docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) — conditions object, prefers-reduced-motion, cleanup
- [GSAP DrawSVGPlugin Official Docs](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/) — supported elements, drawSVG property, stroke requirement

### Secondary (MEDIUM confidence)
- [Codrops: Free GSAP Plugins Demo (2025)](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/) — Confirms all plugins free since 3.13
- [GSAP React Integration Guide](https://gsap.com/resources/React/) — useGSAP automatic cleanup including SplitText instances
- [GSAP Community: SplitText in React/Next.js](https://gsap.com/community/forums/topic/34795-splittext-issue-in-reactnextjs/) — React Strict Mode double-mount pattern
- [GSAP Community: SplitText React Component](https://gsap.com/community/forums/topic/42229-using-splittext-in-react-component-including-nested-components/) — Nested component patterns

### Tertiary (LOW confidence — cross-verified with official docs)
- WebSearch: DrawSVG free in gsap 3.13+ — verified against official Codrops article and npm package
- WebSearch: SplitText useGSAP cleanup pattern — verified against GSAP official React guide

---

## Metadata

**Confidence breakdown:**
- SplitText API: HIGH — verified against official GSAP docs, confirmed autoSplit + onSplit pattern
- DrawSVGPlugin: HIGH — verified against official GSAP docs, confirmed free bundled with gsap 3.13+
- matchMedia conditions: HIGH — verified against official GSAP docs
- Client wrapper architecture: HIGH — derived from existing codebase patterns (Server Component page + client component sections established in Phase 3)
- Easing recommendations: MEDIUM — based on code audit and animation principles; final values need visual validation

**Research date:** 2026-04-02
**Valid until:** 2026-05-02 (stable library, 30 days)
