# Phase 6: Studio Sections - Research

**Researched:** 2026-04-02
**Domain:** React/Next.js component authoring — GSAP animation, Tailwind CSS, data-driven card UI
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Transform current personal About into studio-level content. Drop personal bio, education block, and individual skill pills from section level. Studio-level stats replace personal stats. Individual skills move to team cards only.
- **D-02:** Studio stats counters: "8+ Combined Years" + "6 Products Shipped" + "50+ Technologies" — animated counters (existing pattern).
- **D-03:** Shared history narrative uses timeline-flavored tone: chronological journey arc from GEC Modasa → X-Byte → Screenplay → studio launch. Not mission-driven or proof-driven — it tells the partnership story.
- **D-04:** Internal order: Narrative paragraph first (sets context) → Stats counters below → Team cards at bottom. Top-down storytelling flow.
- **D-05:** Section id should be `team` to match existing Navigation anchor (`#team`). Aria-label updated from "About me" to studio framing.
- **D-06:** Minimal dark cards — subtle border, dark background matching site aesthetic. No glass effects, no hover glow.
- **D-07:** Initials avatar in accent-colored circle. Same accent color for both founders (not unique per person) — emphasizes unity as a team.
- **D-08:** Card content: initials avatar, name, role, skills as small pills, GitHub + LinkedIn icon links. No bio paragraph on cards. Data sourced from `data/team.ts`.
- **D-09:** Desktop: side-by-side cards (equal billing). Mobile: stack vertically (full-width cards for readability).
- **D-10:** Numbered text blocks using existing section numbering convention (`01 /`, `02 /`, etc.). Large accent-colored numbers with title and 1-2 line description. No icons, no connecting lines, no cards. Clean and typographic.
- **D-11:** Content locked: 01 Discover → 02 Build MVP → 03 Iterate → 04 Scale. Claude writes the 1-2 line descriptions.
- **D-12:** Layout: horizontal 4-column on desktop, stacked on mobile.
- **D-13:** Section id: `methodology` to match existing Navigation anchor (`#methodology`).
- **D-14:** Page composition order: Hero → Team/About (`#team`) → Experience (`#experience`) → How We Work (`#methodology`) → Projects (`#projects`) → Contact (`#contact`).
- **D-15:** Hero scroll indicator `<a href="#team">` will now resolve to a real section.
- **D-16:** Navigation scroll-spy for Team and How We Work will activate once sections with matching IDs exist in the DOM.

### Claude's Discretion

- Word-by-word scroll reveal on studio narrative: Claude decides whether to keep the signature animation or use a simpler fade, based on narrative length and animation budget.
- Methodology step description copy: Claude writes what fits the professional & clean tone.
- Animation patterns for team cards and methodology section (stagger reveals, etc.).

### Deferred Ideas (OUT OF SCOPE)

- Experience section timeline conversion to shared journey milestones (D-09 from Phase 2 context) — not in Phase 6 requirements, would need its own scope.
- Photos replacing initials avatars — D-07 from Phase 2 says "support swapping later".
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| STUD-02 | About section updated with shared history narrative (GEC Modasa → Screenplay → X-Byte) | About.tsx full rewrite pattern documented; SplitText word reveal confirmed as existing pattern; studio copy written in UI-SPEC |
| STUD-03 | Team section with equal-billing cards for Abhishek and Vatsal (photo/initials, role, skills, GitHub, LinkedIn) | `data/team.ts` confirmed ready; TeamMember interface has all required fields; card layout pattern derived from existing pill/dark-card conventions |
| STUD-05 | "How we work" methodology section on landing page (MVP-first → scale approach, 3-4 steps) | New Methodology.tsx component; page.tsx insertion point confirmed; 4-step content locked in UI-SPEC; animation pattern from Experience.tsx |
</phase_requirements>

---

## Summary

Phase 6 is a content rewrite and new-component insertion phase within a fully established codebase. There is no new technology to learn — every pattern, animation approach, design token, and data structure needed already exists in the repository and has been used across 5 prior phases.

The primary work is: (1) rewrite `components/About.tsx` from a personal section into a studio narrative section with a team cards grid, changing `id="about"` to `id="team"`, and (2) create a new `components/Methodology.tsx` component inserted into `app/page.tsx` between `<Experience />` and `<Projects />`.

Three integration bugs are automatically fixed as side effects of these structural changes: the broken `#team` anchor from Hero's scroll indicator, and the two navigation scroll-spy items (Team, How We Work) that have never activated because the target sections didn't exist in the DOM.

**Primary recommendation:** Treat this as a two-task phase — one task per component (About rewrite, Methodology creation) — with a third micro-task for the `app/page.tsx` insertion. All animation, styling, and data patterns are copy-and-adapt from existing code.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.0.0 | Component rendering | Project stack |
| Next.js | 15.5.12 | App Router, client components | Project stack |
| TypeScript | 5.6.3 | Type safety | Project stack |
| GSAP | 3.14.2 | Scroll-triggered animations | Used across all 5 landing sections |
| @gsap/react `useGSAP` | bundled with GSAP | Animation lifecycle management | Replaces useEffect+gsap.context pattern per Phase 1 decisions |
| Tailwind CSS | 4.0.0 | Utility styling | Project stack |
| lucide-react | 0.577.0 | GitHub/LinkedIn icons | Already used in Navigation.tsx |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `gsap/SplitText` | bundled | Word-by-word text animation | Narrative paragraph scroll reveal in About |
| `gsap/ScrollTrigger` | bundled | Scroll-based animation triggers | All scroll reveals |
| `gsap.matchMedia()` | bundled | Responsive animation conditions | Desktop/mobile/reduceMotion branches required |
| IntersectionObserver | browser API | Counter trigger | Stats counters fire-once pattern (existing in About.tsx) |

**No new installations required.** All dependencies are already present in `package.json`.

---

## Architecture Patterns

### Recommended Project Structure

No new directories needed. Files being created or modified:

```
components/
├── About.tsx        # FULL REWRITE — personal → studio narrative + team cards
└── Methodology.tsx  # NEW COMPONENT — 4-step methodology section

app/
└── page.tsx         # INSERT <Methodology /> between <Experience /> and <Projects />

data/
└── team.ts          # READ ONLY — already populated, no changes needed
```

### Pattern 1: Client Component with useGSAP + gsap.matchMedia

**What:** All animated landing sections use `'use client'`, import from `@/lib/gsap` (never directly from `gsap`), and call `useGSAP(() => { const mm = gsap.matchMedia(); mm.add({ isDesktop, isMobile, reduceMotion }, ...) }, { scope: sectionRef })`.

**When to use:** Any component that uses GSAP animations — mandatory for About.tsx rewrite and Methodology.tsx.

**Example (from Experience.tsx):**
```typescript
// Source: components/Experience.tsx (project codebase)
'use client';
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add({
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    }, (context) => {
      const { isDesktop, isMobile, reduceMotion } = context.conditions!;
      if (reduceMotion) {
        gsap.set(section.querySelectorAll('.section-label, .section-heading, .exp-row'),
          { opacity: 1, x: 0, y: 0, clearProps: 'all' });
        return;
      }
      // ...animations
    });
  }, { scope: sectionRef });
  // ...
};
```

### Pattern 2: Section Structure (HTML/JSX skeleton)

**What:** All landing sections share the same outer HTML skeleton.

**Example:**
```tsx
// Source: components/Experience.tsx + About.tsx (project codebase)
<section id="[id]" ref={sectionRef} aria-label="[label]" className="py-32 lg:py-44 content-auto">
  <div className="section-line" aria-hidden="true" />
  <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32">
    <span className="section-label dev-mono text-xs text-[var(--violet)] tracking-[0.25em] uppercase block mb-8">
      01 / About
    </span>
    <h2 className="section-heading heading-lg text-white mb-12">
      We build together.
    </h2>
    {/* content */}
  </div>
</section>
```

### Pattern 3: Stats Counters (IntersectionObserver + setInterval)

**What:** Animated number counting on scroll entry. Existing pattern in About.tsx uses `useState` + `useEffect` with IntersectionObserver and setInterval. Fire-once via `observer.disconnect()`.

**Exact pattern to replicate for the 3 new studio stats:**
```typescript
// Source: components/About.tsx (project codebase — existing counter logic)
useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      // Counter 1: "8" (Combined Years) — integer
      setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=1;setYearsCount(Math.min(c,8));if(c>=8)clearInterval(iv)},60); }, 300);
      // Counter 2: "6" (Products Shipped) — integer
      setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=1;setShippedCount(Math.min(c,6));if(c>=6)clearInterval(iv)},80); }, 500);
      // Counter 3: "50" (Technologies) — integer
      setTimeout(() => { let c=0; const iv=setInterval(()=>{c+=1;setTechCount(Math.min(c,50));if(c>=50)clearInterval(iv)},30); }, 400);
      observer.disconnect();
    }
  }, { threshold: 0.1 });
  observer.observe(section);
  return () => { observer.disconnect(); };
}, []);
```

Note: New counters use integers only (8, 6, 50) — no `.toFixed(1)` float display like the old personal counter.

### Pattern 4: SplitText Word-by-Word Scroll Scrub

**What:** Narrative paragraph reveals word by word as user scrolls through it. Uses GSAP SplitText with `autoSplit: true` + `onSplit` callback for resize-safety.

**Example (from existing About.tsx):**
```typescript
// Source: components/About.tsx (project codebase)
SplitText.create(introRef.current, {
  type: 'words',
  autoSplit: true,
  onSplit(self) {
    return gsap.fromTo(self.words,
      { opacity: 0.15, color: 'var(--text-muted)' },
      {
        opacity: 1, color: 'var(--text)',
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
```

This exact pattern transfers directly to the rewritten About.tsx narrative paragraph.

### Pattern 5: Dark Card with Pills

**What:** Team cards use existing `.pill` and `.pill-{color}` CSS classes from `app/globals.css`. Card background uses `var(--line)` (`#161616`) from `config/design-system.ts`.

**Card structure:**
```tsx
// Source: globals.css pill classes + design-system.ts color tokens
<div className="team-card bg-[var(--line)] border border-[var(--line-light)] rounded-lg p-6">
  {/* Avatar */}
  <div className="w-12 h-12 rounded-full bg-[var(--violet)] flex items-center justify-center mb-4">
    <span className="dev-mono text-sm font-bold text-white">AV</span>
  </div>
  {/* Name + Role */}
  <h3 className="text-sm font-bold text-white leading-tight mb-1">{member.name}</h3>
  <p className="text-sm text-[var(--text-secondary)]">{member.role}</p>
  {/* Skills */}
  <div className="flex flex-wrap gap-2 mt-4">
    {member.skills.map(skill => (
      <span key={skill} className="pill pill-violet dev-mono">{skill}</span>
    ))}
  </div>
  {/* Social links */}
  <div className="flex gap-1 mt-4">
    <a href={member.github} target="_blank" rel="noopener noreferrer"
       aria-label={`${member.name} on GitHub`}
       className="p-3 text-[var(--text-muted)] hover:text-white transition-colors duration-300">
      <Github size={16} />
    </a>
    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
       aria-label={`${member.name} on LinkedIn`}
       className="p-3 text-[var(--text-muted)] hover:text-white transition-colors duration-300">
      <Linkedin size={16} />
    </a>
  </div>
</div>
```

### Pattern 6: Methodology Step Block (typographic)

**What:** Pure text blocks — no cards, no icons. Large accent number in `.dev-mono` Display tier, title and body below.

```tsx
// Source: UI-SPEC D-10 + existing section numbering convention from About.tsx/Experience.tsx
<div className="step-block">
  <div className="dev-mono font-bold text-[var(--violet)] leading-none mb-3"
       style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
    01 /
  </div>
  <h3 className="text-sm font-bold text-white leading-tight mb-2">Discover</h3>
  <p className="text-sm text-[var(--text-secondary)]" style={{ lineHeight: 1.6 }}>
    Two weeks of questions before a single line of code. We map your domain, users, 
    and constraints into a technical spec you can read.
  </p>
</div>
```

### Pattern 7: Reduced Motion Branch

**What:** Every component with GSAP animations must include a `reduceMotion` branch that sets all animated elements to their final visible state instantly via `gsap.set(..., { clearProps: 'all' })`. This is a mandatory pattern established in Phase 4.

```typescript
// Source: components/About.tsx + components/Experience.tsx (project codebase)
if (reduceMotion) {
  const allAnimatedEls = section.querySelectorAll(
    '.section-label, .section-heading, .stat-num, .team-card, .skill-pill'
  );
  gsap.set(allAnimatedEls, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'all' });
  if (introRef.current) gsap.set(introRef.current, { opacity: 1, clearProps: 'all' });
  return;
}
```

### Anti-Patterns to Avoid

- **Direct gsap import:** Never `import { gsap } from 'gsap'` — always `import { gsap, ... } from '@/lib/gsap'` so plugins are registered centrally (Phase 1 decision).
- **useEffect for GSAP:** Never use `useEffect` for GSAP animations — use `useGSAP` which handles context and cleanup automatically.
- **id="about" retained:** The old section ID must change to `id="team"` — leaving `id="about"` would leave the navigation broken (Nav already references `#team`, not `#about`).
- **Skipping scope on useGSAP:** Always pass `{ scope: sectionRef }` to `useGSAP` — this scopes selector queries to the section and prevents cross-component selector leaks.
- **Float counters for integer stats:** The old About.tsx used `expCount.toFixed(1)` for fractional display. New counters are whole numbers (8, 6, 50) — use integer setState.
- **Omitting section-line div:** Every section starts with `<div className="section-line" aria-hidden="true" />` — the visual separator. Missing this breaks the established page rhythm.
- **Missing pt-32 inside max-w wrapper:** The inner `<div className="max-w-[1400px]...">` always has `pt-32` because the `section-line` sits at the top of the section (outside the padded wrapper) and the padding accounts for it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Character-safe text splitting | Custom regex char splitter | `SplitText.create()` with `autoSplit: true` | Handles resize, emoji, RTL, accessibility attributes automatically |
| Responsive animation variants | Multiple conditional render paths | `gsap.matchMedia()` with named conditions | Plugin handles media query teardown/re-entry, avoids FOUC on resize |
| Social link icons | SVG path strings inline | `lucide-react` (`Github`, `Linkedin`) | Already installed, consistent stroke weight with rest of nav icons |
| Skill pill styling | New CSS classes | Existing `.pill .pill-violet/.pill-cyan/.pill-pink/.pill-lime` | Already defined in `globals.css` — adding new classes creates visual inconsistency |
| Data for team members | Inline object literal | `import { team } from '@/data/team'` | Type-checked, shared with JSON-LD schema, single source of truth |

**Key insight:** Every building block for Phase 6 already exists. The implementation is assembly, not invention.

---

## Common Pitfalls

### Pitfall 1: Forgetting `id="team"` Change Breaks anchor Resolution

**What goes wrong:** Developer rewrites About.tsx content but keeps `id="about"` on the section element. Navigation still has `#team` in the scroll-spy array and in nav items. The Hero scroll indicator `<a href="#team">` still resolves to nothing.

**Why it happens:** Easy to miss during a content-focused rewrite — the `id` attribute is a structural concern, not a content concern.

**How to avoid:** The very first change in About.tsx should be `id="about"` → `id="team"` and `aria-label="About me"` → `aria-label="About the studio"`.

**Warning signs:** After implementation, clicking "Team" in navigation or clicking the Hero scroll indicator does not scroll to the About section.

### Pitfall 2: Stale Selector Queries After Removing DOM Elements

**What goes wrong:** The existing About.tsx has GSAP animation selectors for `.edu-block`, `.skill-group`, and `.skill-pill` (the personal education and skills blocks). If these selectors are copied to the rewritten component but the referenced elements no longer exist, `querySelectorAll` returns empty NodeLists and `forEach` silently does nothing — but if a `querySelector` is used with a null check missing, it throws.

**Why it happens:** Copy-paste from existing animation block without auditing what elements still exist.

**How to avoid:** The rewritten About.tsx animation block needs fresh selectors: `.stat-num`, `.team-card`, `.skill-pill` (on card pills, not section-level groups). Remove all references to `.edu-block` and `.skill-group`.

**Warning signs:** No errors at runtime but team card elements never animate in. Verify by temporarily adding a `console.log` in the GSAP callback to confirm selectors return elements.

### Pitfall 3: Counter State Mismatch (Float vs Integer)

**What goes wrong:** Copying the existing counter pattern from About.tsx verbatim includes `expCount.toFixed(1)` rendering for the "Years" counter. This displays `8.0` instead of `8`.

**Why it happens:** The old personal counter tracked fractional years (`5.0`) because the tenure was 5 years. The new studio stat is a whole number (`8`).

**How to avoid:** Use `useState<number>(0)` for all three counters. Render as `{yearsCount}` (no `toFixed`). Counter increment logic uses `c+=1` (integer steps).

### Pitfall 4: Team Card Animation Selector Scope

**What goes wrong:** The `.team-card` GSAP selector inside `useGSAP({ scope: sectionRef })` will correctly find cards within the About section. But if the developer adds the same `.team-card` class to something outside the section (unlikely but possible), the scope prevents cross-contamination. More likely: developer forgets to add `.team-card` class to the card JSX, causing the `querySelectorAll('.team-card')` call to return an empty NodeList.

**How to avoid:** Ensure the class `team-card` is present on the card wrapper `<div>` in JSX, not just referenced in the GSAP selector.

### Pitfall 5: `app/page.tsx` Import Missing for Methodology

**What goes wrong:** `Methodology.tsx` is created but not imported in `app/page.tsx`, or it is imported but not inserted in the correct position (between `<Experience />` and `<Projects />`). The `#methodology` anchor and navigation scroll-spy never activate.

**Why it happens:** Two separate files to change for one logical operation.

**How to avoid:** The page.tsx update is part of the same plan wave as Methodology.tsx creation — do both atomically.

**Warning signs:** Navigation "How We Work" item never highlights. `document.getElementById('methodology')` returns `null` in browser console.

### Pitfall 6: Skill Pill Color Assignment on Team Cards

**What goes wrong:** All team card skills rendered with one pill color variant (e.g., all `.pill-violet`) instead of meaningful color variation. Results in a monotone, visually flat skills list.

**Why it happens:** Data in `data/team.ts` has `skills: string[]` — no color metadata per skill.

**How to avoid:** Apply a simple rotation or category-based mapping at render time. The UI-SPEC notes mixed colors (violet/cyan/pink/lime based on tech category). A simple modulo rotation (`['violet','cyan','pink','lime'][i % 4]`) produces visual variety without needing to change the data schema.

### Pitfall 7: `pt-32` Missing on Inner Wrapper

**What goes wrong:** Methodology.tsx section renders content too close to the top of the section, making the `section-line` separator visually adjacent to the label text with no breathing room.

**Why it happens:** Both Experience.tsx and the existing About.tsx have `pt-32` on the inner `max-w` wrapper. This is easy to miss when writing a new section from scratch.

**How to avoid:** Use the exact structure: `<section ... className="py-32 lg:py-44 content-auto"><div className="section-line" ... /><div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24 pt-32">`.

---

## Runtime State Inventory

Step 2.5: SKIPPED — This is a component rewrite/creation phase with no rename/refactor/migration. No existing data keys, stored values, or registered names are changing. The only structural change (`id="about"` → `id="team"`) affects a DOM attribute with no persistence layer.

---

## Environment Availability

Step 2.6: SKIPPED — No external dependencies. All required libraries (`gsap`, `lucide-react`, `tailwindcss`, `react`) are already installed in `node_modules`. No CLI tools, databases, or external services are invoked.

---

## Validation Architecture

`workflow.nyquist_validation` is explicitly `false` in `.planning/config.json`. This section is skipped.

---

## Code Examples

### Full Animation Block: About.tsx (Rewrite Reference)

The rewritten GSAP block replaces the existing one. Key changes from existing: removes `.edu-block` and `.skill-group` selectors, adds `.team-card` stagger.

```typescript
// Adapted from: components/About.tsx + components/Experience.tsx (project codebase)
useGSAP(() => {
  const section = sectionRef.current;
  if (!section) return;
  const mm = gsap.matchMedia();
  mm.add({
    isDesktop: '(min-width: 768px)',
    isMobile: '(max-width: 767px)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  }, (context) => {
    const { isDesktop, isMobile, reduceMotion } = context.conditions!;

    if (reduceMotion) {
      gsap.set(
        section.querySelectorAll('.section-label, .section-heading, .stat-num, .team-card, .skill-pill'),
        { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'all' }
      );
      if (introRef.current) gsap.set(introRef.current, { opacity: 1, clearProps: 'all' });
      return;
    }

    // Section label clip reveal
    const label = section.querySelector('.section-label');
    if (label) {
      gsap.fromTo(label,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: label, start: 'top 90%' } }
      );
    }

    // Heading slide up
    const heading = section.querySelector('.section-heading');
    if (heading) {
      gsap.from(heading, {
        y: isMobile ? 30 : 60, opacity: 0,
        duration: isMobile ? 0.4 : 1, ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 85%' },
      });
    }

    // Word-by-word scroll reveal (narrative paragraph)
    if (introRef.current) {
      SplitText.create(introRef.current, {
        type: 'words', autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(self.words,
            { opacity: 0.15, color: 'var(--text-muted)' },
            { opacity: 1, color: 'var(--text)', stagger: 0.04,
              scrollTrigger: {
                trigger: introRef.current,
                start: 'top 75%', end: 'bottom 40%', scrub: 1,
              }
            }
          );
        }
      });
    }

    // Stat numbers scale in
    section.querySelectorAll('.stat-num').forEach((el, i) => {
      gsap.fromTo(el,
        { scale: 0.85, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0,
          duration: isMobile ? 0.3 : 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }, delay: i * 0.1 }
      );
    });

    // Team cards slide from right, staggered
    section.querySelectorAll('.team-card').forEach((el, i) => {
      gsap.fromTo(el,
        { x: isMobile ? 20 : 40, opacity: 0 },
        { x: 0, opacity: 1,
          duration: isMobile ? 0.4 : 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }, delay: i * 0.12 }
      );
    });

    // Skill pills pop in with stagger (capped at 8)
    section.querySelectorAll('.skill-pill').forEach((el, i) => {
      gsap.fromTo(el,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1,
          duration: isMobile ? 0.2 : 0.35,
          ease: isMobile ? 'power2.out' : 'back.out(3)',
          scrollTrigger: { trigger: el, start: 'top 95%' },
          delay: Math.min(i, 8) * 0.015 }
      );
    });
  });
}, { scope: sectionRef });
```

### Methodology.tsx Animation Block

```typescript
// Adapted from: components/Experience.tsx stagger pattern (project codebase)
useGSAP(() => {
  const section = sectionRef.current;
  if (!section) return;
  const mm = gsap.matchMedia();
  mm.add({
    isDesktop: '(min-width: 768px)',
    isMobile: '(max-width: 767px)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  }, (context) => {
    const { isMobile, reduceMotion } = context.conditions!;

    if (reduceMotion) {
      gsap.set(
        section.querySelectorAll('.section-label, .section-heading, .step-block'),
        { opacity: 1, y: 0, clearProps: 'all' }
      );
      return;
    }

    const label = section.querySelector('.section-label');
    if (label) {
      gsap.fromTo(label,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: label, start: 'top 90%' } }
      );
    }

    const heading = section.querySelector('.section-heading');
    if (heading) {
      gsap.from(heading, {
        y: isMobile ? 30 : 60, opacity: 0,
        duration: isMobile ? 0.4 : 1, ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 85%' },
      });
    }

    section.querySelectorAll('.step-block').forEach((el, i) => {
      gsap.fromTo(el,
        { y: isMobile ? 20 : 40, opacity: 0 },
        { y: 0, opacity: 1,
          duration: isMobile ? 0.4 : 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
          delay: i * 0.15 }
      );
    });
  });
}, { scope: sectionRef });
```

### app/page.tsx After Phase 6

```tsx
// Source: app/page.tsx (project codebase) + Methodology.tsx import addition
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Methodology from '@/components/Methodology';   // NEW
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <Experience />
        <Methodology />   {/* NEW — inserted between Experience and Projects */}
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

---

## State of the Art

No new technology introduced in this phase. All patterns were established in Phases 1–4.

| Old (About.tsx pre-Phase 6) | New (About.tsx post-Phase 6) | Impact |
|-----------------------------|-------------------------------|--------|
| `id="about"` | `id="team"` | Fixes Hero anchor + Navigation scroll-spy |
| `aria-label="About me"` | `aria-label="About the studio"` | Correct landmark semantics |
| Personal bio paragraph | Studio history narrative | Studio identity complete |
| 2 personal stats (5yrs, 15 tech) | 3 studio stats (8yrs, 6 products, 50 tech) | Reflects two-person team |
| Education block + skill groups | Team cards grid | Positions both founders equally |
| No Methodology section | `Methodology.tsx` at `#methodology` | Closes STUD-05; navigation scroll-spy activates |

---

## Open Questions

None. The UI-SPEC is fully approved with all copy written, all animation specs locked, and all data sources confirmed available in the repository. Research is unblocked.

---

## Sources

### Primary (HIGH confidence)

- `components/About.tsx` — Full source read; confirmed all selectors, animation patterns, counter logic to reuse/replace
- `components/Experience.tsx` — Section structure and stagger animation pattern (direct template for Methodology.tsx)
- `components/Hero.tsx` — Confirmed `<a href="#team">` at line 253; confirmed it resolves once About section changes to `id="team"`
- `components/Navigation.tsx` — Confirmed scroll-spy array at lines 32-38 includes `'team'` and `'methodology'`; confirmed nav items array at lines 57-63
- `data/team.ts` — Confirmed `team` array has both members with `name`, `role`, `github`, `linkedin`, `skills` fields
- `data/types.ts` — Confirmed `TeamMember` interface fields
- `lib/gsap.ts` — Confirmed centralized registration; `SplitText`, `ScrollTrigger`, `DrawSVGPlugin`, `useGSAP` all registered
- `config/design-system.ts` — Confirmed color tokens; `card: '#161616'` is `var(--line)` for card backgrounds
- `app/globals.css` — Confirmed `.pill`, `.pill-violet/cyan/pink/lime`, `.section-line`, `.content-auto`, `.dev-mono`, `.heading-lg` all exist
- `app/page.tsx` — Confirmed current composition; `Methodology` import and insertion point identified
- `.planning/phases/06-studio-sections/06-CONTEXT.md` — All decisions D-01 through D-16 read and incorporated
- `.planning/phases/06-studio-sections/06-UI-SPEC.md` — Full design contract read; all copy, animation specs, color assignments, accessibility requirements extracted

### Secondary (MEDIUM confidence)

- `.planning/v1.0-MILESTONE-AUDIT.md` — Confirmed integration issues being fixed; evidence strings for STUD-02, STUD-03, STUD-05 verified against actual codebase

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified present in package.json and imported correctly in existing components
- Architecture: HIGH — patterns extracted directly from working production code in the same repo
- Pitfalls: HIGH — derived from actual code inspection, not speculation; e.g., old selector names confirmed by reading About.tsx
- Copy: HIGH — locked in UI-SPEC, not guesswork

**Research date:** 2026-04-02
**Valid until:** This research does not reference any external versioned APIs. It is valid until any of the referenced source files change.
