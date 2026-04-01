# Phase 3: Case Study Pages - Research

**Researched:** 2026-04-01
**Domain:** Next.js App Router static pages, TypeScript data modeling, inline React SVG, long-form editorial layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Long-form editorial layout — full-width sections flowing vertically. Big hero, then alternating text/visual sections. Immersive reading experience matching the "deep dive" positioning.
- **D-02:** Section order: Hero → Challenge → Architecture Diagram → Tech Rationale → Implementation Highlights → Results/Metrics → Team Attribution → CTA.
- **D-03:** Qualitative metrics only — descriptive impact statements (no estimated ranges or fake numbers). Designed so exact numbers can be swapped in later when measured.
- **D-04:** Structured TypeScript objects for all case study sections — not markdown strings. Each section has typed fields (`results` as array of `{metric, description}`, `implementation` as array of `{title, detail}`, `techRationale` as array of `{technology, problem, solution}`). Enables component-level rendering and full type safety.
- **D-05:** The existing `CaseStudy` interface in `data/types.ts` must be expanded significantly. Current flat `{heading, content}` sections are replaced with rich structured types.
- **D-06:** High-level system overview diagrams — 5-8 boxes per diagram showing major layers (Client → API → Cache → Search → Database) with arrows showing data flow. Enough to impress a CTO without overwhelming.
- **D-07:** Rich preview cards — each case study gets a large card with title, tagline, key tech pills, project type badge. Visually rich to make 3 studies feel substantial. No filtering needed with only 3 items.
- **D-08:** Brief Redis + OpenSearch pattern intro section above the cards — establishes the shared architecture narrative before readers dive into individual studies.
- **D-09:** Primary audience is technical decision-makers (CTOs, VPs of Engineering, tech leads).
- **D-10:** 5-7 minute read per case study (~1200-1800 words of content plus diagrams). Each section is substantial but scannable.
- **D-11:** Recurring "Pattern Spotlight" callout block in each case study's Architecture section — visually distinct, consistent across all 3 case studies.

### Claude's Discretion
- Architecture diagram implementation approach — Claude picks between React SVG components, static SVG files, or CSS/HTML block diagrams based on quality vs. implementation effort balance.
- Tech Rationale section format — Claude picks between before/after comparison cards, narrative prose, or a hybrid per case study.

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CASE-01 | Case study index page with filterable/browsable project cards | Index page redesign: replace `.project-row` list with rich `Card` components (D-07); pattern intro block with cyan accent (D-08). Routing skeleton exists at `app/case-studies/page.tsx`. |
| CASE-02 | Case study detail page template: Hero → Challenge → Architecture → Tech Rationale → Implementation → Results → Team → CTA | Detail skeleton exists at `app/case-studies/[slug]/page.tsx`. All 8 section positions are present but unstyled/unpopulated. The existing `CaseStudy` interface must expand per D-04/D-05 before this template can render. |
| CASE-03 | GleeMeet case study — dating app, Redis + OpenSearch + DynamoDB, BERT vector matching, real-time features | Content lives in `data/case-studies.ts` as placeholder strings. Full content must be authored. Tech stack confirmed: Next.js, Redux, WebSockets, DynamoDB, Redis, OpenSearch, BERT, AWS. Accent: `pink`. |
| CASE-04 | CareerBox case study — career platform, MongoDB + Redis + OpenSearch, MVP-to-scale methodology | Content lives in `data/case-studies.ts` as placeholder. Tech stack: Next.js, Node.js, MongoDB, Redis, OpenSearch, AWS. Accent: `violet`. |
| CASE-05 | Zorova case study — home spa service (client project), MERN + Redis + OpenSearch, marketplace architecture | Content lives in `data/case-studies.ts` as placeholder. Tech stack: React.js, Node.js, MongoDB, Redis, OpenSearch, AWS. Accent: `orange`. Type: `client`. |
| CASE-06 | Architecture SVG diagrams per case study showing system design | Per D-06 and UI-SPEC: inline React SVG components, 800×400 viewBox, 5-8 nodes, responsive. Location: `components/diagrams/`. No animation in Phase 3 (deferred to Phase 4 ANIM-03). |
| CASE-07 | Metric callout cards with qualitative impact descriptions | Per D-03: qualitative only. Data type: `results: ResultMetric[]` where `ResultMetric = {metric: string, description: string}`. Rendered as 2-4 cards in a 2-col / 4-col grid. |
| CASE-08 | Shared Redis + OpenSearch pattern narrative woven across case studies | Pattern Spotlight callout block (D-11) appears in Architecture section of every detail page. Index page pattern intro section (D-08). Both are data-driven and must use project-specific DB name. |
| CASE-09 | Team attribution per case study (who worked on what) | `data/team.ts` exists. Current `CaseStudy.team` is `string[]` (names). Must expand to typed array linking to `TeamMember` slugs or names with a per-person `contribution` string. |
| CASE-10 | "Want similar results? Let's talk" CTA at bottom of each case study | CTA skeleton already exists in `[slug]/page.tsx`. Must use `handleNavClick` pattern from Navigation for cross-route hash navigation to `/#contact`. UI-SPEC specifies violet glow. |
</phase_requirements>

---

## Summary

Phase 3 is the highest-value delivery in the v1 roadmap — the case studies are the conversion asset. The technical work divides into three areas: (1) data model expansion (`data/types.ts`), (2) content authoring for three complete case studies, and (3) UI implementation of the index and detail page templates.

The routing infrastructure is already in place from Phase 1. `generateStaticParams`, `dynamicParams: false`, `generateMetadata`, and the layout chrome (Navigation + Footer) all exist and are tested. Phase 3 builds on top of these — it does not need to create new routes, just fill them with real content and proper templates.

The most critical first step is expanding `CaseStudy` in `data/types.ts`. Every other task in this phase is blocked on that interface: content authoring needs the shape, diagram components need the accent color and DB name, template components need the typed arrays. This must be Wave 0 work.

**Primary recommendation:** Expand `data/types.ts` first. Then author content for all three case studies with correct typed data. Then build UI components in dependency order: shared components (PatternSpotlight, MetricCard) before per-page templates, diagrams after the text content is committed.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 15.5.12 | Static page generation, `generateStaticParams` | Already in use; static generation is ideal for case studies |
| TypeScript | 5.6.3 | Typed data model | Project-wide requirement |
| Tailwind CSS | 4.0.0 | Layout and utility classes | Project-wide requirement |
| React SVG (inline) | React 19 | Architecture diagrams as `.tsx` components | Chosen per D-06 discretion — best balance of quality and control |
| shadcn/ui (Card, Badge, Separator) | Installed | Index page cards, type badges, section dividers | Already installed; zero net-new dependencies |
| lucide-react | ^0.577.0 | ArrowRight, ArrowUpRight, ChevronRight icons | Already used throughout project |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` / `tailwind-merge` via `cn()` | Installed | Conditional class assembly on cards and diagram nodes | All components with variant-driven styles |
| `class-variance-authority` | 0.7.1 | (Not needed for new components — pill variants already in globals.css) | Skip for Phase 3; existing CSS utilities cover all pill variants |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline React SVG `.tsx` | Static `.svg` files | Static SVGs can't read CSS variables at render time; React SVG gets `var(--line)`, `var(--text-muted)` for free |
| Inline React SVG `.tsx` | `react-flow` or `mermaid` | External libraries add bundle weight; 5-8 static boxes don't justify a graph library |
| shadcn `Card` | Custom `<div>` | Card provides the right semantic wrapper; using it for index cards is consistent with installed component set |

**Installation:** No new packages required. All dependencies are already installed.

---

## Architecture Patterns

### Recommended Project Structure (new files only)

```
data/
├── types.ts               # EXPAND — new rich interfaces
├── case-studies.ts        # REPLACE placeholders with full content
components/
├── diagrams/
│   ├── GleeMeetDiagram.tsx    # Inline SVG, Client or Server
│   ├── CareerBoxDiagram.tsx
│   └── ZorovaDiagram.tsx
app/
└── case-studies/
    ├── page.tsx           # REWRITE — index page with cards + pattern intro
    └── [slug]/
        └── page.tsx       # REWRITE — full 8-section template
```

No new directories needed beyond `components/diagrams/`.

---

### Pattern 1: TypeScript Interface Expansion

**What:** Replace flat `{heading, content}` CaseStudySection with rich typed sections.
**When to use:** Data model change required before any UI work.

The current `CaseStudy` interface uses `CaseStudySection = {heading: string, content: string}` for all sections. Every section becomes structured:

```typescript
// data/types.ts — expanded interfaces

export interface TechRationaleItem {
  technology: string;
  problem: string;
  solution: string;
}

export interface ImplementationHighlight {
  title: string;
  detail: string;
}

export interface ResultMetric {
  metric: string;       // short label, e.g. "Match Quality"
  description: string;  // qualitative impact statement
}

export interface TeamContribution {
  name: string;         // matches TeamMember.name
  contribution: string; // per-person sentence
}

export interface PatternSpotlight {
  dbName: string;       // "DynamoDB" | "MongoDB"
  body: string;         // 2-3 sentences, project-specific
}

export interface CaseStudy {
  slug: string;
  projectSlug: string;  // links to projects.ts
  title: string;
  tagline: string;
  challenge: string;                      // prose, max-w-prose
  patternSpotlight: PatternSpotlight;
  architectureDiagram: string;            // component name, resolved in page
  techRationale: TechRationaleItem[];     // 3 items for 3-col grid
  implementationHighlights: ImplementationHighlight[];  // 3-5 items
  results: ResultMetric[];                // 2-4 items
  team: TeamContribution[];
}
```

**Critical note:** `architectureDiagram` field stores a string key (`'gleemeet' | 'careerbox' | 'zorova'`) that the detail page resolves to the correct diagram component via a lookup map. This avoids storing JSX in the data layer:

```typescript
// app/case-studies/[slug]/page.tsx
import GleeMeetDiagram from '@/components/diagrams/GleeMeetDiagram';
import CareerBoxDiagram from '@/components/diagrams/CareerBoxDiagram';
import ZorovaDiagram from '@/components/diagrams/ZorovaDiagram';

const diagramMap: Record<string, React.ComponentType> = {
  gleemeet: GleeMeetDiagram,
  careerbox: CareerBoxDiagram,
  zorova: ZorovaDiagram,
};
```

---

### Pattern 2: Static Generation — No Changes Needed

**What:** `generateStaticParams` and `dynamicParams = false` already work correctly.
**When to use:** Do not modify this logic — it is correct and tested.

The detail page is a Server Component. It calls `caseStudies.find()` synchronously (no async needed for static data). The `await params` pattern (Next.js 15 async params) is already implemented correctly.

```typescript
// Already correct in app/case-studies/[slug]/page.tsx — do not change
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ...
}
```

---

### Pattern 3: Inline React SVG Diagrams

**What:** Each diagram is a `.tsx` file exporting a single React component wrapping an `<svg>` element.
**When to use:** Architecture diagrams in Section 03 of each case study.

Key technical rules from the UI-SPEC:
- `viewBox="0 0 800 400"` with `width="100%" height="auto"` for responsiveness
- Node boxes: `<rect width="120" height="48" rx="8">` — fill `#050505` (bg), stroke `#161616` (--line)
- Accent nodes (Redis, OpenSearch, primary DB): stroke = project accent hex, fill = accent at 8% opacity
- Text: `<text>` with `font-family="JetBrains Mono"` at 11px, fill `#a1a1aa` (--text-secondary)
- Arrows: `<defs><marker>` arrowhead, stroke `#222222` (--line-light)
- Layer labels: 9px uppercase, fill `#52525b` (--text-muted)
- `aria-label="System architecture diagram for {project.title}"` on the `<svg>` element

**Why hardcode hex values instead of `var(--...)` in SVG:** SVG `<text>` and `<rect>` stroke/fill attributes do resolve CSS custom properties in inline SVG. However, since these are Server Components (no hydration), the CSS variables resolve correctly from the parent document's `:root`. Using `var(--line)` directly in SVG attributes is safe for inline SVG in React.

```tsx
// components/diagrams/GleeMeetDiagram.tsx — pattern
export default function GleeMeetDiagram() {
  return (
    <svg
      viewBox="0 0 800 400"
      width="100%"
      height="auto"
      aria-label="System architecture diagram for GleeMeet"
      role="img"
    >
      <defs>
        <marker id="arrowhead-glee" markerWidth="8" markerHeight="6"
                refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="var(--line-light)" />
        </marker>
      </defs>
      {/* Layer labels */}
      <text x="60" y="20" fontSize="9" fill="var(--text-muted)"
            fontFamily="JetBrains Mono" textAnchor="middle"
            textTransform="uppercase">CLIENT</text>
      {/* Node example */}
      <rect x="10" y="30" width="120" height="48" rx="8"
            fill="var(--bg)" stroke="var(--line)" strokeWidth="1.5" />
      <text x="70" y="59" fontSize="11" fill="var(--text-secondary)"
            fontFamily="JetBrains Mono" textAnchor="middle">Next.js</text>
      {/* Accent node example — Redis */}
      <rect x="300" y="30" width="120" height="48" rx="8"
            fill="rgba(236,72,153,0.08)" stroke="var(--pink)" strokeWidth="1.5" />
      <text x="360" y="59" fontSize="11" fill="var(--text-secondary)"
            fontFamily="JetBrains Mono" textAnchor="middle">Redis</text>
      {/* Arrow example */}
      <line x1="130" y1="54" x2="295" y2="54"
            stroke="var(--line-light)" strokeWidth="1"
            markerEnd="url(#arrowhead-glee)" />
    </svg>
  );
}
```

**Note on marker IDs:** Each diagram must use unique marker IDs (e.g., `arrowhead-glee`, `arrowhead-career`, `arrowhead-zorova`) to prevent ID collisions when multiple diagrams are rendered on the same page (though only one diagram appears per detail page, global SVG `<defs>` pool means IDs must still be unique per component).

---

### Pattern 4: Index Page Card Layout

**What:** Replace the current `.project-row` list with rich `Card` components per D-07.
**When to use:** `app/case-studies/page.tsx` redesign.

The index page is a Server Component — no `'use client'` directive needed. Hover effects are pure CSS transitions. The shadcn `Card` component wraps a Next.js `<Link>` to make the entire card clickable:

```tsx
// Structural pattern for index card
<Link
  href={`/case-studies/${project.slug}`}
  className="group block"
  aria-label={`Read ${project.title} case study`}
>
  <Card className="bg-[var(--bg-elevated)] border-[var(--line)]
                   border-t-4 border-t-[var(--line)]
                   hover:border-t-[var(--{project.accent})]
                   transition-colors duration-300 p-6">
    {/* badge top-right, number, title, tagline, pills, read link */}
  </Card>
</Link>
```

**Important:** The border-top accent color on hover cannot use template literals in Tailwind 4 (JIT purges dynamic class strings). Use inline styles for the dynamic border-top color:

```tsx
// Correct approach for dynamic accent hover border
<Card
  style={{ '--project-accent': `var(--${project.accent})` } as React.CSSProperties}
  className="group ... [border-top-color:var(--line)] hover:[border-top-color:var(--project-accent)]"
>
```

Or simpler: use `data-accent` attribute + CSS in `globals.css` (same pattern as existing `.project-row`):

```css
/* globals.css addition */
.case-card[data-accent="pink"]:hover { border-top-color: var(--pink); }
.case-card[data-accent="violet"]:hover { border-top-color: var(--violet); }
.case-card[data-accent="orange"]:hover { border-top-color: var(--orange); }
```

This mirrors the existing `.project-row[data-accent]` pattern already in `globals.css`.

---

### Pattern 5: Cross-Route CTA Navigation

**What:** The "Get in Touch" button navigates to `/#contact` from a `/case-studies/[slug]` route.
**When to use:** CTA section (Section 08) of every detail page.

The `handleNavClick` pattern from `Navigation.tsx` handles cross-route hash navigation. The detail page CTA should use a standard `<a>` or `<Link>` pointing to `/#contact`. Lenis on the homepage handles smooth scrolling after the route change. The current CTA skeleton in `[slug]/page.tsx` already does this correctly:

```tsx
<a href="/#contact" className="magnetic-btn ...">
  Get in Touch
</a>
```

No changes needed to this navigation pattern — it is already correct.

---

### Pattern 6: Section Number Convention

**What:** All detail page sections display a section number label using the established convention.
**When to use:** Every section in the detail page template.

The section numbering convention (`01 /`, `02 /`, etc.) is established in the codebase and documented in the UI-SPEC. Section number color uses the project accent:

```tsx
<span className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
      style={{ color: `var(--${project.accent})` }}>
  {String(sectionIndex + 1).padStart(2, '0')} /
</span>
```

---

### Anti-Patterns to Avoid

- **Dynamic Tailwind class strings:** `className={`pill-${project.accent}`}` — this pattern IS safe because it is already used throughout the existing codebase and Tailwind 4 safelist picks it up from existing usage. Do not introduce new dynamic class patterns beyond those already established.
- **Storing JSX in the data layer:** Never store `<GleeMeetDiagram />` in `data/case-studies.ts`. Use a string key resolved via `diagramMap` in the page component.
- **`useClient` on diagram components unnecessarily:** Diagram SVGs are static — they do not need GSAP animations in Phase 3. Keep them as Server Components for zero client bundle cost.
- **Markdown strings for content:** Per D-04, all content sections use typed arrays, not raw markdown or prose strings (except `challenge` which is a single prose string by design).
- **Inline `techStack[]` from Phase 1 data:** The detail page already imports `project` from `projects.ts` to get tech pills. Do not duplicate tech data in the case study object — use the existing `project.tech` array for the hero pill row.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Type-safe badge variants | Custom pill variant logic | Existing `.pill` CSS utility classes in `globals.css` | Already covers violet/pink/cyan/lime/orange — complete |
| Graph/diagram library | Custom layout algorithm | Inline SVG with hardcoded node positions | 5-8 static boxes: no dynamic layout needed; libraries add 50-200KB |
| Markdown parser for case study content | `react-markdown` or `rehype` | Typed TypeScript arrays per D-04 | CMS-free project; typed data is more render-flexible and zero dependency |
| Custom card hover system | CSS-in-JS hover effects | `data-accent` + `globals.css` rules (existing pattern) | Pattern already proven in `.project-row`; CSS transitions are cheaper |
| Custom focus ring | Radix FocusScope or custom | Existing `:focus-visible` rule in `globals.css` | Already configured: `outline: 2px solid var(--violet)` |

**Key insight:** This phase adds zero new npm packages. All tooling exists. The work is data authoring, type expansion, and template composition.

---

## Common Pitfalls

### Pitfall 1: Tailwind 4 Dynamic Class Purging

**What goes wrong:** `className={`pill-${project.accent}`}` or `className={`text-[var(--${project.accent})]`}` gets purged in production build because Tailwind 4 JIT cannot statically analyze template literal class names.

**Why it happens:** Tailwind 4's content scanning reads source files but cannot evaluate runtime expressions.

**How to avoid:** The existing `.pill-{color}` classes are safe because they already appear verbatim in the existing source files (Tailwind sees them). For new dynamic patterns (e.g., hover border-top accent on case cards), use `data-accent` attribute with explicit CSS rules in `globals.css` — the same approach used in `.project-row[data-accent]`. Avoid introducing new dynamic class patterns not already present in source.

**Warning signs:** Elements render correct class names in dev but lose styles in `npm run build` preview.

---

### Pitfall 2: SVG `<text>` Font Loading

**What goes wrong:** Architecture diagram text renders in a system sans-serif instead of JetBrains Mono.

**Why it happens:** SVG `font-family` attribute references `"JetBrains Mono"` but the font is loaded via `next/font/google` with a CSS variable name (`--font-mono`). The SVG attribute string `"JetBrains Mono"` may not resolve to the same loaded font instance.

**How to avoid:** Use `fontFamily="var(--font-mono), JetBrains Mono, monospace"` in SVG `<text>` elements. The CSS variable `--font-mono` is set globally by `next/font/google` in the root layout. Since diagram components are rendered server-side into HTML, the variable resolves correctly in the browser.

**Warning signs:** Diagram text renders in Arial/Helvetica in production.

---

### Pitfall 3: Server Component Cannot Import Client Component Module Directly

**What goes wrong:** Diagram component imports GSAP at the module level (e.g., from `@/lib/gsap`). This causes a server component build error.

**Why it happens:** `lib/gsap.ts` contains `gsap.registerPlugin()` which is a browser-side operation. If a diagram SVG component imports this, Next.js tries to execute it at server render time.

**How to avoid:** Diagram components in Phase 3 are pure SVG — they import nothing from GSAP. Keep them as Server Components. Phase 4 will add animation via `useGSAP` in a wrapper client component.

**Warning signs:** Build error: "You're importing a component that needs `X`. This React component only works in a Client Component."

---

### Pitfall 4: `CaseStudy` Interface Mismatch Between Data and Template

**What goes wrong:** Content is authored with one interface shape, but the detail page template expects a different shape. TypeScript catches this at build time, but mid-phase type changes cause cascading rebuild work.

**Why it happens:** If the interface is partially updated, or if content authoring precedes the interface finalization.

**How to avoid:** Interface expansion in `data/types.ts` MUST be the first task in Wave 0. Content authoring and template building are both downstream of the finalized interface. Both should happen after types are locked.

**Warning signs:** TypeScript error `TS2339: Property 'techRationale' does not exist on type 'CaseStudy'`.

---

### Pitfall 5: `project.url` Links Not Verified

**What goes wrong:** A case study detail page hero includes an "View Live Project" external link pointing to a URL that is down or redirects.

**Why it happens:** URLs in `data/projects.ts` were entered but never checked. REQUIREMENTS.md SEO-04 (URL verification) is Phase 5 work, but Phase 3 must not introduce new unverified external links.

**How to avoid:** If the hero section includes an external project link, verify the URL from `projects.ts` is reachable before adding the link. Current data shows `gleemeet.com` (note: `data/projects.ts` has `gleemet.com` — typo risk). Confirm spelling before linking.

**Warning signs:** Live site shows broken external links to case study projects.

---

## Code Examples

Verified patterns from existing codebase:

### Tech Pills in Index Card (existing pattern — safe to reuse)
```tsx
// Source: existing app/case-studies/page.tsx
{project.tech.slice(0, 4).map((t) => (
  <span key={t} className={`pill pill-${project.accent} dev-mono text-[9px]`}>
    {t}
  </span>
))}
```

### Pattern Spotlight Block
```tsx
// New shared component: components/PatternSpotlight.tsx
interface PatternSpotlightProps {
  dbName: string;
  body: string;
  accent: string; // 'pink' | 'violet' | 'orange'
}

export default function PatternSpotlight({ dbName, body, accent }: PatternSpotlightProps) {
  return (
    <div
      className="mt-8 rounded-[var(--radius)] bg-[rgba(255,255,255,0.02)]"
      style={{
        borderLeft: `3px solid var(--${accent})`,
        padding: '16px 24px',
        backgroundColor: 'rgba(255,255,255,0.02)',
      }}
    >
      <span
        className="dev-mono text-[10px] uppercase tracking-[0.15em] block mb-2"
        style={{ color: `var(--${accent})` }}
      >
        Pattern Spotlight
      </span>
      <p className="text-[16px] font-bold text-white mb-2">
        Redis + OpenSearch + {dbName}
      </p>
      <p className="text-body text-sm">{body}</p>
    </div>
  );
}
```

### Detail Page Section Wrapper Pattern
```tsx
// Consistent section template for all 8 sections
<section
  className="mb-20 border-t border-[var(--line)] pt-12"
  aria-labelledby={`section-${sectionNum}-heading`}
>
  <span
    className="dev-mono text-[10px] tracking-[0.15em] uppercase block mb-3"
    style={{ color: `var(--${project.accent})` }}
  >
    {String(sectionNum).padStart(2, '0')} /
  </span>
  <h2
    id={`section-${sectionNum}-heading`}
    className="heading-md text-white mb-6"
  >
    {sectionHeading}
  </h2>
  {/* section content */}
</section>
```

### Tech Rationale 3-Col Grid
```tsx
// Section 04 — three-column grid from techRationale[]
<div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
  {caseStudy.techRationale.map((item) => (
    <div
      key={item.technology}
      className="bg-[var(--bg-elevated)] border border-[var(--line)]
                 rounded-[var(--radius)] p-6"
    >
      <h3 className="dev-mono text-[11px] uppercase tracking-[0.15em]
                     text-white mb-3">
        {item.technology}
      </h3>
      <p className="text-body text-sm mb-2">
        <span className="text-[var(--text-muted)]">Problem: </span>
        {item.problem}
      </p>
      <p className="text-body text-sm">
        <span className="text-[var(--text-muted)]">Solution: </span>
        {item.solution}
      </p>
    </div>
  ))}
</div>
```

### Implementation Highlights Numbered List
```tsx
// Section 05 — numbered list, not bullet list
<ol className="space-y-8">
  {caseStudy.implementationHighlights.map((item, i) => (
    <li key={item.title} className="flex gap-6">
      <span
        className="dev-mono text-[2rem] font-bold leading-none shrink-0"
        style={{ color: `var(--${project.accent})` }}
      >
        {String(i + 1).padStart(2, '0')}
      </span>
      <div>
        <h3 className="text-white font-bold text-[1rem] mb-2">{item.title}</h3>
        <p className="text-body">{item.detail}</p>
      </div>
    </li>
  ))}
</ol>
```

### Results Metric Cards
```tsx
// Section 06 — 2-col grid (lg:4-col for 4 items)
<div className={`grid gap-4 ${caseStudy.results.length === 4
  ? 'sm:grid-cols-2 lg:grid-cols-4'
  : 'sm:grid-cols-2'}`}>
  {caseStudy.results.map((item) => (
    <div
      key={item.metric}
      className="bg-[var(--bg-elevated)] border border-[var(--line)]
                 rounded-[var(--radius)] p-6"
    >
      <span className="dev-mono text-[9px] uppercase tracking-[0.2em]
                       text-[var(--text-muted)] block mb-3">
        {item.metric}
      </span>
      <p className="heading-md text-white">{item.description}</p>
    </div>
  ))}
</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useEffect` + `gsap.context()` | `useGSAP` hook from `@gsap/react` | Phase 1 | Automatic cleanup, correct multi-page behavior — no manual cleanup needed |
| Per-component `gsap.registerPlugin()` | Centralized in `lib/gsap.ts` | Phase 1 | Single import source; prevents double-registration |
| Flat `CaseStudySection {heading, content}` | Rich typed arrays (Phase 3 expansion) | Phase 3 (this phase) | Enables component-level rendering, TypeScript safety, future CMS migration |
| Next.js 14 sync params | Next.js 15 async `await params` | Phase 1 | Required for App Router 15; already implemented correctly |

**Note:** GSAP animations (ANIM-02, ANIM-03, ANIM-04) are Phase 4 work. Phase 3 ships CSS transitions only (`transition-colors duration-300`). The GSAP pattern is documented here for awareness but must not be implemented in this phase.

---

## Open Questions

1. **GleeMeet URL spelling**
   - What we know: `data/projects.ts` line 23 has `url: 'https://gleemet.com'` (missing second 'e' vs. 'gleemeet')
   - What's unclear: Whether the live URL is `gleemeet.com` or `gleemet.com`
   - Recommendation: Verify the live URL before Phase 3 implementation. Do not add an external link to the hero section until confirmed. Document the correct spelling in `data/projects.ts`.

2. **Team contribution text per case study**
   - What we know: Both Abhishek and Vatsal worked on all 3 projects. Current `team` is `string[]` (names only).
   - What's unclear: Specific per-person contributions per project (who led what).
   - Recommendation: Author per-person contribution sentences during content authoring. The planner should note that this content must be decided before the team attribution section can be implemented. Default fallback: "Led full-stack implementation" for Abhishek, "Led backend architecture and data layer" for Vatsal — adjust to project-specific truth.

3. **Architecture diagram layout specifics**
   - What we know: UI-SPEC gives canvas dimensions (800×400), node sizes (120×48), layer labels, and style rules.
   - What's unclear: Exact x/y coordinates for each project's nodes. The layout must be hand-designed per case study to accurately reflect each project's architecture.
   - Recommendation: Design GleeMeet diagram first as the reference implementation (most complex: Client → API → WebSocket → Cache → Search → DB with BERT sidecar). Use it to establish x/y grid. CareerBox and Zorova share similar topology with different DB names.

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified — this phase is code and content changes only; all required tools are already available from Phase 1 and Phase 2 execution).

---

## Validation Architecture

Step 2.6 note: `workflow.nyquist_validation` is explicitly set to `false` in `.planning/config.json`. This section is skipped.

---

## Project Constraints (from CLAUDE.md)

All directives from `CLAUDE.md` that the planner must verify compliance with:

| Directive | Impact on Phase 3 |
|-----------|------------------|
| **Tech stack:** Next.js + React + Tailwind + GSAP only | No new frameworks. Diagram components use React SVG (core React). GSAP animations deferred to Phase 4. COMPLIANT. |
| **Hosting:** Vercel deployment | Static generation (`generateStaticParams`) already in place. No server-side rendering or edge functions introduced. COMPLIANT. |
| **Design:** Keep existing dark aesthetic — improve, don't replace | UI-SPEC specifies `#050505` bg, existing CSS custom properties, existing font utilities. No design system changes. COMPLIANT. |
| **Content:** All data remains hardcoded in components | Data layer is `data/case-studies.ts` (TypeScript file). No CMS, no API. COMPLIANT. |
| **URLs:** Every project link must be verified as live before being added | External project links (gleemeet.com, careerbox.in, zorova.in) must be verified before being added to hero sections. Flag as required pre-implementation check. |
| **GSD Workflow:** Use GSD entry points, not direct edits | Planning artifacts are being created via GSD. Execution must use `/gsd:execute-phase`. |
| **`frontend-design` skill for all UI work** | Carried forward from Phase 2. All UI component decisions must apply this skill. Planner must note this in task definitions. |

---

## Sources

### Primary (HIGH confidence)

- Direct codebase inspection — `data/types.ts`, `data/case-studies.ts`, `data/projects.ts`, `data/team.ts` — current interface shapes confirmed
- Direct codebase inspection — `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx`, `app/case-studies/layout.tsx` — existing skeleton confirmed
- Direct codebase inspection — `app/globals.css` — all CSS utilities verified (`.pill`, `.heading-*`, `.text-body`, `.dev-mono`, `.magnetic-btn`, `.project-row[data-accent]` pattern)
- Direct codebase inspection — `components/ui/card.tsx`, `badge.tsx`, `separator.tsx` — component APIs confirmed
- Direct codebase inspection — `lib/gsap.ts`, `components/Navigation.tsx` — GSAP pattern and cross-route nav pattern confirmed
- `.planning/phases/03-case-study-pages/03-CONTEXT.md` — locked decisions
- `.planning/phases/03-case-study-pages/03-UI-SPEC.md` — visual specification

### Secondary (MEDIUM confidence)

- Next.js 15 App Router documentation patterns — `generateStaticParams` + `dynamicParams: false` behavior verified from existing working implementation
- Tailwind 4 JIT dynamic class pattern — known limitation documented; workaround via `data-` attributes verified from existing `.project-row` pattern in codebase

### Tertiary (LOW confidence)

- SVG `font-family` CSS variable resolution — confirmed likely to work for inline SVG in React Server Components based on how inline SVG inherits document styles; recommend testing during implementation

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries are pre-existing in the repo; verified by direct inspection
- Data model expansion: HIGH — current interfaces read directly from source; expansion shape derived from CONTEXT.md D-04/D-05
- Architecture patterns: HIGH — all patterns derived from existing codebase conventions
- SVG diagram implementation: MEDIUM — SVG + CSS variable interaction confirmed as standard web behavior, but `font-family` CSS variable in SVG text should be tested during Wave 0
- Content authoring: HIGH — case study subjects, tech stacks, and qualitative approach are locked by CONTEXT.md

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable stack; no fast-moving dependencies introduced)
