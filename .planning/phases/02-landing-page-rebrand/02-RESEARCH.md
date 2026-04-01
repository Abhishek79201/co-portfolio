# Phase 02: Landing Page Rebrand - Research

**Researched:** 2026-04-01
**Domain:** Next.js 15 / React 19 / GSAP 3 component rewrite — studio identity rebrand
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Hero tone — Professional & Clean. Understated confidence, less visual clutter, more whitespace-friendly.
- **D-02:** Studio metrics as stats: "6+ Products Shipped", "3+ Years Building Together", "2 Founders" — replaces personal stats.
- **D-03:** Keep existing scramble text and character animation behavior — only change text content. Do not remove signature animations.
- **D-04:** Use placeholder studio name throughout — site structure must not depend on the final name.
- **D-05:** Merge Team into existing About section position — do NOT add a separate section.
- **D-06:** Side-by-side equal-billing cards for Abhishek and Vatsal. Each: initials avatar, name, role, skills, GitHub + LinkedIn. Data from `data/team.ts`.
- **D-07:** Styled initials (AV, VZ) as avatars now. Layout must support swapping to real photos later without restructuring.
- **D-08:** Brief shared history narrative (GEC Modasa → X-Byte → Screenplay) above or integrated with cards.
- **D-09:** Convert personal work history timeline to shared journey timeline: GEC Modasa → X-Byte Solutions → Screenplay → Studio launch.
- **D-10:** Keep alternating slide animation pattern — replace data only.
- **D-11:** Methodology section: 4 steps — 01 Discover → 02 Build MVP → 03 Iterate → 04 Scale. Title + 1-2 line description each.
- **D-12:** Horizontal layout desktop, stacked mobile. Numbered format matching existing convention (`01 /`, `02 /`, etc.).
- **D-13:** Page flow: Hero → Team (About) → Experience (Shared Timeline) → How We Work → Projects → Contact.
- **D-14:** Keep existing project list-row layout with hover scramble — extend from 4 hardcoded to 6 from `data/projects.ts`.
- **D-15:** Color-coded pill badges: Client (orange), Co-built (pink), Internal (cyan). Use existing `.pill` utility class.
- **D-16:** On expanded project detail, show "Read Case Study →" link for `hasCaseStudy: true` projects. Links to `/case-studies/[slug]`.
- **D-17:** Update Contact copy from personal framing to studio framing. Exact copy is Claude's discretion.
- **D-18:** Footer already extracted. Update copyright if still showing personal name — use studio placeholder.
- **D-19:** Update all metadata/titles from "Abhishek Vaghela" to studio placeholder. `<title>`, OG tags, Twitter cards, JSON-LD description text only — schema type migration (Person → Organization) deferred to Phase 5.
- **D-20:** Use the `frontend-design` skill for all UI component work.

### Claude's Discretion

- CTA button combination in Hero (e.g., "View Our Work" + "Get in Touch").
- Hero subtitle/tagline copy matching "professional & clean" direction.
- Contact section exact copy — studio framing, Claude's choice.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| STUD-01 | Hero section rewritten for studio identity — "two devs, one studio" positioning | Hero.tsx analysis: `CharLine` component + scramble animation are reusable as-is; only text content changes (name lines, role scramble text, description, CTA labels, stats counters) |
| STUD-02 | About section updated with shared history narrative (GEC Modasa → Screenplay → X-Byte) | About.tsx analysis: word-by-word scroll reveal paragraph + skill groups need full rewrite; existing animation hooks (`useGSAP`, `useRef`, `IntersectionObserver` counter pattern) are directly reusable |
| STUD-03 | Team section with equal-billing cards for Abhishek and Vatsal (initials avatar, role, skills, GitHub, LinkedIn) | `data/team.ts` already has all required fields; styled initials avatar needs CSS class; `photo?: string` field in TeamMember interface already supports future swap |
| STUD-04 | Footer component extracted and shared (studio name, email, social links, copyright) | Footer.tsx is already a shared Server Component; only copyright text update required (currently "Abhishek Vaghela & Vatsal Zinzuvadiya") |
| STUD-05 | "How we work" methodology section on landing page (MVP-first approach, 3-4 steps) | New component `Methodology.tsx` required; no existing component to adapt; must insert between Experience and Projects in `app/page.tsx` |
| STUD-06 | Project showcase refactored to consume `data/projects.ts` with 6 projects | Projects.tsx currently hardcodes 4 projects inline; `data/projects.ts` has all 6 with correct fields; refactor = remove inline array, import `projects` from data layer |
| STUD-07 | Client vs internal project labels (Zorova = "Client", GleeMeet = "Co-built") | `project.type` field already exists in `data/projects.ts` with correct values; mapping to pill color: `client` → orange, `co-built` → pink, `internal` → cyan; `.pill` + `.pill-orange/pink/cyan` classes already in globals.css |
| STUD-08 | Contact section copy updated from personal to studio framing | Contact.tsx: copy lives in `<p>` text, link array (personal emails/phone), and form placeholder text; form itself is unchanged structurally; contact links array needs to become dual-founder or single studio email |
| STUD-09 | Metadata/title updated from "Abhishek Vaghela" to studio branding | `app/layout.tsx`: `metadata` export and `jsonLd` object contain all occurrences; JSON-LD schema type stays as Person until Phase 5 |
</phase_requirements>

---

## Summary

Phase 02 is a content and composition rewrite, not a tech stack change. Every component to be modified already exists, is already using the correct GSAP patterns (`useGSAP` with `{ scope: sectionRef }`), and already pulls from a design system that needs no additions. The phase consists of six component rewrites (Hero, About, Experience, Projects, Contact, Footer), one new component (Methodology), one new data composition in `app/page.tsx`, and one metadata update in `app/layout.tsx`.

The primary technical risk is the Hero component: it contains the signature scramble animation, multiple GSAP scroll-linked parallax effects, counter state, and blob parallax — all of which must be preserved while swapping text content. The scramble `CharLine` pattern is character-index based and directly reusable; only the string literals change. The stats counter pattern uses `useState` + `setInterval` and must be updated to reflect the three new studio metrics.

The Methodology section is the only genuinely new component. It has no GSAP animation requirement beyond the standard section reveal pattern already used in all other components (section label clip, heading slide-up, row stagger). It is safe to model directly after Experience.tsx.

**Primary recommendation:** Work component-by-component in dependency order — data layer verification first (confirm `data/projects.ts` and `data/team.ts` are as expected), then page composition update, then each component rewrite. The Methodology component is self-contained and can be built standalone.

---

## Standard Stack

### Core (all already installed — no new packages required)

| Library | Installed Version | Registry Latest | Purpose | Why Standard |
|---------|------------------|-----------------|---------|--------------|
| Next.js | 15.5.12 (project) | 16.2.2 (registry) | App Router, metadata export | Project constraint — do not upgrade |
| React | 19.0.0 (project) | 19.2.4 (registry) | UI rendering | Project constraint — do not upgrade |
| GSAP | 3.14.2 (project) | 3.14.2 (registry) | All scroll animations | Project constraint |
| @gsap/react | installed (project) | 2.1.2 (registry) | `useGSAP` hook for cleanup-safe GSAP | Established pattern in all components |
| Tailwind CSS | 4.0.0 (project) | 4.2.2 (registry) | Utility styling | Project constraint — do not upgrade |
| TypeScript | 5.6.3 (project) | 6.0.2 (registry) | Type safety | Project constraint — do not upgrade |
| lucide-react | installed | 1.7.0 (registry) | Icons (ArrowUpRight, Github, Linkedin, etc.) | Already used in Projects, Contact, Navigation |

**Note on registry versions:** The project pins specific versions that are stable and tested together. Do NOT upgrade any dependency during this phase. Use installed versions only.

### No New Dependencies

This phase adds no new npm packages. All required capabilities exist:
- Avatar initials styling: pure Tailwind/CSS — no avatar library needed
- Methodology section: HTML + Tailwind + GSAP — no component library needed
- Type badges: existing `.pill` CSS utility classes
- Icons: `lucide-react` already installed

---

## Architecture Patterns

### Existing Component Pattern (MUST follow for all rewrites)

Every animated section component in this project uses this exact structure:

```typescript
// Source: components/About.tsx, Experience.tsx, Projects.tsx, Contact.tsx
'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const ComponentName = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section label — clip reveal (ALWAYS first animation)
    const label = section.querySelector('.section-label');
    if (label) {
      gsap.fromTo(label,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: label, start: 'top 90%' } }
      );
    }

    // Heading — slide up
    const heading = section.querySelector('.section-heading');
    if (heading) {
      gsap.from(heading, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 85%' },
      });
    }

    // Row reveals — alternating or stagger pattern
  }, { scope: sectionRef });  // scope is mandatory

  return (
    <section id="section-id" ref={sectionRef} aria-label="..." className="py-32 lg:py-44 content-auto">
      <div className="section-line" aria-hidden="true" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32">
        <span className="section-label dev-mono text-xs text-[var(--accent)] tracking-[0.25em] uppercase block mb-8">
          NN / Label
        </span>
        <h2 className="section-heading heading-lg text-white mb-20">
          Heading.
        </h2>
        {/* content */}
      </div>
    </section>
  );
};
```

### Section Numbering — Updated Sequence

With the new page flow (Hero → About/Team → Experience → How We Work → Projects → Contact), section labels update:

| Section | Old Label | New Label |
|---------|-----------|-----------|
| About (Team) | `01 / About` | `01 / Team` |
| Experience (Journey) | `02 / Experience` | `02 / Journey` |
| Methodology (new) | — | `03 / How We Work` |
| Projects | `03 / Projects` | `04 / Projects` |
| Contact | `04 / Contact` | `05 / Contact` |

Navigation `items` array in `Navigation.tsx` must be updated to match new section IDs used in `id=` attributes. Scroll-spy logic uses `['contact', 'projects', 'experience', 'about']` array (reverse DOM order) — must be updated to `['contact', 'projects', 'methodology', 'experience', 'about']`.

### Hero Rewrite Pattern

The `CharLine` component and `scramble()` callback are reused unchanged. Only these string literals change:

```typescript
// BEFORE (personal)
<CharLine text="Abhishek" ... />
<CharLine text="Vaghela" ... />
scramble(roleRef.current, 'FULL STACK DEVELOPER');
// description: "Building scalable products for 4.5+ years..."
// stats: corpCount (2.5+), freeCount (2+), projCount (18+)

// AFTER (studio)
<CharLine text="[STUDIO]" ... />         // D-04: placeholder, two-line display
<CharLine text="[NAME]" ... />
scramble(roleRef.current, 'DEV STUDIO'); // or similar
// description: studio tagline (Claude's discretion)
// stats: products (6+), years together (3+), founders (2)
```

Counter state variables rename: `corpCount` → `productsCount`, `freeCount` → `yearsCount`, `projCount` → `foundersCount`. Counter targets: 6, 3, 2.

**Stat counter patterns (existing):**
```typescript
// Source: components/Hero.tsx lines 139-141
setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=1;setProductsCount(Math.min(c,6));if(c>=6)clearInterval(iv)},38); }, 1600);
setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=0.1;setYearsCount(Math.min(c,3));if(c>=3)clearInterval(iv)},28); }, 1800);
// foundersCount is static 2 — animate from 0 to 2
```

### Team Cards (STUD-03) Pattern

Avatar initials must be a styled `<div>` (not `<img>`) that can swap to `<img>` later. The `TeamMember` interface already has `photo?: string` — the component should conditionally render:

```typescript
// photo swap pattern — works with current data/team.ts (no photo field set)
{member.photo ? (
  <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-full object-cover" />
) : (
  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--line-light)]">
    <span className="dev-mono text-xl font-bold text-[var(--violet)]">
      {member.name.split(' ').map(n => n[0]).join('')}
    </span>
  </div>
)}
```

This satisfies D-07 (initials now, photo swap without restructuring later).

### Project Type Badge Pattern (STUD-06, STUD-07)

```typescript
// Source: data/projects.ts — type field: 'client' | 'co-built' | 'internal'
const TYPE_PILL: Record<string, string> = {
  'client':   'pill pill-orange',
  'co-built': 'pill pill-pink',
  'internal': 'pill pill-cyan',
};
const TYPE_LABEL: Record<string, string> = {
  'client':   'Client',
  'co-built': 'Co-built',
  'internal': 'Internal',
};

// In JSX (rendered alongside existing tech pills):
<span className={`${TYPE_PILL[project.type]} dev-mono text-[9px]`}>
  {TYPE_LABEL[project.type]}
</span>
```

### Case Study Link Pattern (STUD-06 / D-16)

```typescript
// In the expanded project-details div, conditionally:
{project.hasCaseStudy && (
  <Link href={`/case-studies/${project.slug}`}
        className="inline-flex items-center gap-1 text-xs dev-mono text-[var(--violet)] hover:text-[var(--violet-light)] transition-colors mt-2">
    Read Case Study
    <ArrowUpRight size={12} aria-hidden="true" />
  </Link>
)}
```

Note: `Link` from `next/link` (not `<a>`) since this is an internal route. `ArrowUpRight` from `lucide-react` is already imported in Projects.tsx.

### Methodology Section Structure (STUD-05)

New component `components/Methodology.tsx` — model after Experience.tsx for animation pattern:

```typescript
const steps = [
  { num: '01', title: 'Discover', description: '...' },
  { num: '02', title: 'Build MVP', description: '...' },
  { num: '03', title: 'Iterate',   description: '...' },
  { num: '04', title: 'Scale',     description: '...' },
];
```

Desktop layout: CSS grid `grid-cols-4` with equal columns. Mobile: `grid-cols-1` stacked.
Animation: stagger fade+slide up on each step card (use `gsap.from` on `.step-card` elements, `scrollTrigger`).

### Shared Journey Timeline Data (D-09, D-10)

Replace the personal `experiences` array in Experience.tsx with a `milestones` array:

```typescript
const milestones = [
  {
    label: 'GEC Modasa', role: 'B.E. Computer Engineering',
    duration: '2019 — 2023', accent: 'lime',
    description: 'Where it started. Two engineers who met in lectures and started building together on side projects.',
  },
  {
    label: 'X-Byte Solutions', role: 'Full Stack Developers',
    duration: '2023 — 2024', accent: 'pink',
    description: 'First professional engagement together. Owned full-stack delivery for client projects end-to-end.',
  },
  {
    label: 'Screenplay', role: 'Full Stack Developers',
    duration: '2024 — 2025', accent: 'violet',
    description: 'Built real-time collaboration features for a creative platform. Sharpened backend architecture skills.',
  },
  {
    label: '[Studio Name]', role: 'Co-Founders',
    duration: '2025 — Present', current: true, accent: 'cyan',
    description: 'Combining everything learned into a focused studio. Taking on products that matter.',
  },
];
```

The existing animation code in Experience.tsx (alternating slide, label clip, heading slide) stays unchanged — only the data array and heading text changes.

### app/page.tsx — Updated Composition

```typescript
// After phase: import Methodology added, order updated
import Methodology from '@/components/Methodology';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="relative">
        <Hero />
        <About />       {/* rewritten as Team section */}
        <Experience />  {/* rewritten as Journey timeline */}
        <Methodology /> {/* NEW */}
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Avatar initials | Custom avatar component | Styled `<div>` with conditional `<img>` | Three lines of Tailwind; zero dependency; already matches design system |
| Type badges | Custom badge component | Existing `.pill` CSS utility + mapping object | globals.css already defines all 5 pill colors including orange |
| Icons for team cards | Custom SVG icons | `lucide-react` (Github, Linkedin, ExternalLink) | Already installed, already used in Navigation |
| Case study links | Custom link component | `next/link` + conditional render | Internal routing; use Link, not `<a>` |
| Step numbers | Custom counter component | Plain `<span>` with `dev-mono` class | Design system already has monospace class; no interactivity needed |
| Animation scroll reveals | Custom IntersectionObserver | GSAP ScrollTrigger via `useGSAP` | Established project pattern; ScrollTrigger already registered |

**Key insight:** This phase is a content rewrite, not a feature build. The correct answer for every "should I add X?" question is "does the design system already have it?" — and for all STUD requirements, it does.

---

## Common Pitfalls

### Pitfall 1: Breaking GSAP Context Scope on Rewrite

**What goes wrong:** Rewriting a component but forgetting `{ scope: sectionRef }` in `useGSAP`. GSAP selectors then target the entire document instead of the section, causing animation conflicts between sections.

**Why it happens:** When copy-modifying a component, the `useGSAP` call is easy to touch while removing the scope option.

**How to avoid:** Treat `useGSAP(() => { ... }, { scope: sectionRef })` as a single atomic unit. Never separate the callback from its options.

**Warning signs:** Animations firing on wrong scroll positions, or animations in one section triggering when another section is in view.

### Pitfall 2: Hero `CharLine` Animation Depends on Character Count

**What goes wrong:** `CharLine` renders one `<span class="hero-char">` per character. The stagger animation (`stagger: 0.025`) is calculated over `chars.length`. If studio name placeholder has significantly more characters than "Abhishek" / "Vaghela", the animation timeline duration increases — potentially causing visual overlap with role scramble starting at `0.5`.

**Why it happens:** The timeline uses fixed time offsets, not dynamic ones based on text length.

**How to avoid:** Keep placeholder studio name to similar character count as the original. If the two-line display uses something like "Dev" / "Studio" or "[STUDIO]" / "[NAME]", count characters and verify `1.2 + chars.length * 0.025` stays under 0.5s for the scramble offset at `0.5`.

**Warning signs:** Role scramble starts before name animation completes.

### Pitfall 3: Navigation Scroll-Spy Array Order Dependency

**What goes wrong:** `Navigation.tsx` scroll-spy logic iterates `['contact', 'projects', 'experience', 'about']` in reverse DOM order. If a new section (`methodology`) is added between `experience` and `projects` but not inserted into this array, scroll-spy will skip over it.

**Why it happens:** The scroll-spy array is hardcoded and not derived from the DOM.

**How to avoid:** When adding `Methodology` with `id="methodology"`, update the Navigation array to `['contact', 'projects', 'methodology', 'experience', 'about']`.

**Warning signs:** Active nav link jumps from "Experience" directly to "Projects" when scrolling through the methodology section.

### Pitfall 4: `data/projects.ts` Has Different Field Names than Inline Array

**What goes wrong:** Projects.tsx currently uses inline objects with fields like `{ title, subtitle, url, accent, tech, description }`. `data/projects.ts` has an additional `slug`, `type`, and `hasCaseStudy` field. Code that destructures the old shape will miss these.

**Why it happens:** Two sources of truth existed before refactor.

**How to avoid:** When refactoring Projects.tsx to import from `data/projects.ts`, use the `Project` type from `data/types.ts`. Delete the inline `projects` array entirely — don't try to merge them.

**Warning signs:** TypeScript error on `project.type` or `project.hasCaseStudy` — these don't exist on the old inline type.

### Pitfall 5: `project-row` CSS Uses `data-accent` Attribute

**What goes wrong:** The `.project-row` CSS in globals.css uses `[data-accent="violet"]::before` attribute selectors for the left accent bar. If the refactored component omits `data-accent={project.accent}` on the row element, all project rows lose their accent color.

**Why it happens:** The accent is applied via HTML attribute, not a class. Easy to miss when rewriting JSX.

**How to avoid:** Ensure every `<a className="project-row ...">` element retains `data-accent={project.accent}`.

### Pitfall 6: Metadata JSON-LD `@type` Must Stay `Person` Until Phase 5

**What goes wrong:** Developer migrates `jsonLd['@type']` from `'Person'` to `'Organization'` during STUD-09 metadata update — but this is explicitly scoped to Phase 5 (SEO-01).

**Why it happens:** STUD-09 says "update metadata" and the JSON-LD block is in layout.tsx alongside other metadata.

**How to avoid:** STUD-09 scope = text string replacements only (title, description, keywords, OG tags, Twitter cards, JSON-LD `name`/`description` fields). Do NOT change `'@type': 'Person'` — leave schema type for Phase 5.

### Pitfall 7: Footer Is a Server Component — Don't Add `'use client'`

**What goes wrong:** Developer adds interactivity to Footer and adds `'use client'` directive — this breaks Server Component rendering and causes hydration issues if Footer uses `new Date()`.

**Why it happens:** STUD-04 footer update seems simple but the current component correctly uses `new Date().getFullYear()` in a Server Component.

**How to avoid:** Footer remains a Server Component. The only change is updating copyright text string. If year display logic must change, keep it as static string or use `suppressHydrationWarning`.

---

## Code Examples

### Verified Pattern: About.tsx Word Reveal (keep animation, rewrite text)

```typescript
// Source: components/About.tsx line 36-52
// The word-by-word scroll reveal splits textContent at render time
// The introRef paragraph's text is replaced with wrapped spans
// This means: write clean prose in JSX, animation handles the rest
if (introRef.current) {
  const text = introRef.current.textContent || '';
  introRef.current.innerHTML = text.split(' ').map((word: string) =>
    `<span class="word-reveal-dim inline">${word}</span>`
  ).join(' ');
  // ...gsap.to(words, { scrollTrigger: { scrub: 1 } })
}
// New studio narrative goes directly into <p ref={introRef}>...</p>
```

### Verified Pattern: Experience.tsx Alternating Slide (keep animation, swap data)

```typescript
// Source: components/Experience.tsx lines 61-72
section.querySelectorAll('.exp-row').forEach((row, i) => {
  const fromX = i % 2 === 0 ? -80 : 80;
  gsap.fromTo(row,
    { x: fromX, opacity: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 },
    { x: 0, opacity: 1, rotate: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 88%' } }
  );
});
// The .exp-row class on <article> elements triggers this — keep the class name
// Only the data array changes, not the template structure
```

### Verified Pattern: Pill Usage in Projects (type badge)

```typescript
// Source: components/Projects.tsx lines 132-135 (existing tech pill pattern)
// New type badge follows same pattern, added before tech pills:
<span className={`pill pill-${TYPE_COLOR[project.type]} dev-mono text-[9px]`}>
  {TYPE_LABEL[project.type]}
</span>
// TYPE_COLOR: { client: 'orange', 'co-built': 'pink', internal: 'cyan' }
// All three pill variants confirmed defined in globals.css lines 213-216
```

### Verified Pattern: GSAP Stagger for Methodology Steps

```typescript
// Pattern derived from Projects.tsx lines 79-89 (row stagger)
section.querySelectorAll('.step-card').forEach((card, i) => {
  gsap.fromTo(card,
    { y: 40, opacity: 0, scale: 0.97 },
    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%' },
      delay: i * 0.1,
    }
  );
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| GSAP useEffect + gsap.context | `useGSAP()` from `@gsap/react` | Phase 1 | Automatic cleanup, no manual context.revert() |
| Inline project data in Projects.tsx | `data/projects.ts` centralized | Phase 1 | Import instead of inline array |
| Footer inside Contact.tsx | Standalone `components/Footer.tsx` | Phase 1 | Server Component, shared across routes |
| Hash-only navigation | Route-aware navigation (hash → `/${href}` on non-homepage) | Phase 1 | Case study pages navigate correctly |

**No changes to these patterns in Phase 2** — all Phase 1 architectural decisions are stable and consumed as-is.

---

## Open Questions

1. **Studio name placeholder string**
   - What we know: D-04 says use a placeholder throughout; decision deferred to user.
   - What's unclear: What exact string to use — `[STUDIO NAME]`, `DevStudio`, `STUDIO`, or something else.
   - Recommendation: Use `"Dev Studio"` as a two-word placeholder that fits the `CharLine` two-line hero display naturally. Mark all occurrences with a `// TODO: replace with final studio name` comment. This makes find-and-replace trivial.

2. **Contact section — one shared email or both personal emails?**
   - What we know: Currently Contact.tsx has only Abhishek's email/phone. D-17 says update to studio framing.
   - What's unclear: Whether the contact links become one shared studio email or both founders' personal emails.
   - Recommendation: Use one shared studio email (`team@[placeholder].dev` or Abhishek's email as the primary, with a note). The form `mailto:` destination should use the primary contact email. The contact links section can show GitHub/LinkedIn for both founders instead of duplicating personal emails.

3. **Navigation label for About section**
   - What we know: Section id is currently `#about`, nav item is "About". The section becomes a Team section.
   - What's unclear: Should the nav item rename to "Team" or stay "About"?
   - Recommendation: Rename to "Team" in both the nav `items` array and the section `id="team"` attribute. Update the scroll-spy array accordingly.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 02 is purely component rewrite and content changes. No external tools, services, CLIs, runtimes, databases, or APIs required beyond the existing Next.js dev server.

---

## Project Constraints (from CLAUDE.md)

All CLAUDE.md directives applicable to this phase:

| Directive | Impact on Phase 02 |
|-----------|-------------------|
| Tech stack: Next.js + React + Tailwind + GSAP only | No new UI libraries. Methodology section uses Tailwind grid, not a new library. |
| Hosting: Vercel | No deployment changes. Static site, no new routes requiring serverless functions. |
| Design: Keep existing dark aesthetic | No color palette changes. All new elements use existing CSS custom properties. |
| Content: All data hardcoded in components (no CMS) | Team narrative and methodology steps are hardcoded strings in component files. |
| URLs: Every project link must be verified as live before adding | STUD-06 adds project URLs from `data/projects.ts`. These were defined in Phase 1 — planner should note that URL verification (SEO-04) is scoped to Phase 5, not Phase 2. Do not block STUD-06 on URL verification. |
| GSD workflow required | All file edits happen through `/gsd:execute-phase`. |

---

## Sources

### Primary (HIGH confidence)

- Direct file read: `components/Hero.tsx` — full source, animation patterns verified
- Direct file read: `components/About.tsx` — word-by-word reveal, counter pattern
- Direct file read: `components/Experience.tsx` — alternating slide animation, data shape
- Direct file read: `components/Projects.tsx` — scramble hover, row CSS hooks, pill usage
- Direct file read: `components/Contact.tsx` — form structure, link array
- Direct file read: `components/Footer.tsx` — Server Component structure
- Direct file read: `components/Navigation.tsx` — scroll-spy array, items array, route-aware logic
- Direct file read: `app/globals.css` — `.pill`, `.pill-orange`, `.project-row`, `.word-reveal-*`, all animation utilities confirmed present
- Direct file read: `data/projects.ts` — all 6 projects, type values, hasCaseStudy flags confirmed
- Direct file read: `data/team.ts` — both members, skills, social links confirmed
- Direct file read: `data/types.ts` — `TeamMember.photo?: string` confirmed (avatar swap-ready)
- Direct file read: `app/layout.tsx` — metadata export, JSON-LD structure confirmed
- Direct file read: `app/page.tsx` — current composition order confirmed
- Direct file read: `config/design-system.ts` — color tokens confirmed
- Direct file read: `.planning/phases/02-landing-page-rebrand/02-CONTEXT.md` — all decisions D-01 through D-20
- `npm view` commands: GSAP 3.14.2, Next.js 16.2.2 (project uses 15.5.12), Tailwind 4.2.2 (project uses 4.0.0), React 19.2.4 (project uses 19.0.0)

### Secondary (MEDIUM confidence)

- GSAP documentation (training knowledge, version 3.x): `useGSAP` hook behavior with `scope` option verified by existing codebase usage across 5 components

### Tertiary (LOW confidence)

None — all findings are verified against actual source files.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified from package.json and npm registry
- Architecture patterns: HIGH — verified from actual component source code
- Pitfalls: HIGH — verified against actual code; e.g., `data-accent` pitfall confirmed by reading globals.css attribute selectors
- Data layer: HIGH — all `data/` files read directly

**Research date:** 2026-04-01
**Valid until:** 2026-05-01 (stable stack, no fast-moving dependencies)
