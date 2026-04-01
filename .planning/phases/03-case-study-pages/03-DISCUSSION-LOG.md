# Phase 3: Case Study Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-01
**Phase:** 03-case-study-pages
**Areas discussed:** Detail page layout & sections, Architecture diagrams, Index page & browsing, Content depth & tone

---

## Detail Page Layout & Sections

### Visual Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Long-form editorial | Full-width sections flowing vertically like a technical blog post. Big hero, then alternating text/visual sections. Immersive reading experience. | ✓ |
| Sidebar navigation | Fixed sidebar with section links. Content scrolls on the right. Good for long content but adds complexity. | |
| Card-based sections | Each section in a distinct card/panel with clear visual separation. More structured, less narrative. | |

**User's choice:** Long-form editorial (Recommended)
**Notes:** None

### Results/Metrics Format

| Option | Description | Selected |
|--------|-------------|----------|
| Qualitative only | Descriptive impact statements. Honest — no fake numbers. Can add exact metrics later. | ✓ |
| Estimated ranges | Approximate ranges like '40-60% latency reduction'. More impressive but risks credibility. | |
| You decide | Claude picks the best approach per case study. | |

**User's choice:** Qualitative only (Recommended)
**Notes:** None

### Tech Rationale Format

| Option | Description | Selected |
|--------|-------------|----------|
| Before/after comparison cards | Show problem → solution pattern with visual cards. | |
| Narrative prose | Written paragraphs explaining decisions in context. | |
| You decide | Claude picks the format that best suits each case study. | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion on tech rationale presentation format.

### Data Model

| Option | Description | Selected |
|--------|-------------|----------|
| Structured TypeScript objects | Each section has typed fields. Enables component-level rendering and type safety. | ✓ |
| Markdown content strings | Each section stored as markdown. Easier to write, less type safety. | |
| Hybrid approach | Structured for data-heavy, markdown for narrative sections. | |

**User's choice:** Structured TypeScript objects (Recommended)
**Notes:** None

---

## Architecture Diagrams

### Implementation Approach

| Option | Description | Selected |
|--------|-------------|----------|
| React SVG components | Hand-coded React components rendering inline SVG. Full styling control, animatable. | |
| Static SVG files | Pre-made SVG files in public/. Simpler but not animatable or themeable. | |
| Simplified block diagrams | CSS/HTML grid-based diagrams. Easier but less polished. | |
| You decide | Claude picks the best approach balancing quality with effort. | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion on diagram implementation approach.

### Detail Level

| Option | Description | Selected |
|--------|-------------|----------|
| High-level system overview | 5-8 boxes showing major layers with data flow arrows. Enough to impress without overwhelming. | ✓ |
| Detailed with internals | 10-15 boxes with internal service components, queues, endpoints. | |
| Minimal conceptual | 3-4 boxes showing core pattern only. Very clean but may feel thin. | |

**User's choice:** High-level system overview (Recommended)
**Notes:** None

---

## Index Page & Browsing

### Presentation Style

| Option | Description | Selected |
|--------|-------------|----------|
| Rich preview cards | Large cards with title, tagline, tech pills, type badge. Makes 3 studies feel substantial. No filtering. | ✓ |
| Keep current list | Refine existing minimal list layout. Simple and consistent with Projects section. | |
| Featured + grid | First study gets large hero card, remaining two in smaller grid. Creates hierarchy. | |

**User's choice:** Rich preview cards (Recommended)
**Notes:** None

### Pattern Intro Section

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — brief pattern intro | Short section above cards establishing Redis + OpenSearch + DB narrative thread. | ✓ |
| No — weave into each study | Let individual case study content establish the pattern. | |
| You decide | Claude decides based on what reads best. | |

**User's choice:** Yes — brief pattern intro (Recommended)
**Notes:** None

---

## Content Depth & Tone

### Target Audience

| Option | Description | Selected |
|--------|-------------|----------|
| Technical decision-makers | CTOs, VPs of Engineering, tech leads evaluating the studio. Architecture thinking focus. | ✓ |
| Fellow developers | Engineers wanting implementation details and code snippets. | |
| Non-technical founders | Startup founders evaluating dev partners. Business outcome focus. | |

**User's choice:** Technical decision-makers (Recommended)
**Notes:** None

### Redis + OpenSearch Pattern Narrative

| Option | Description | Selected |
|--------|-------------|----------|
| Recurring callout block | Visually distinct 'Pattern Spotlight' callout in each Architecture section. | ✓ |
| Woven into prose | Mentioned naturally within architecture narrative. No separate visual. | |
| You decide | Claude picks the best presentation per case study. | |

**User's choice:** Recurring callout block (Recommended)
**Notes:** None

### Content Length

| Option | Description | Selected |
|--------|-------------|----------|
| 5-7 minute read | ~1200-1800 words plus diagrams. Substantial but scannable. | ✓ |
| 3-4 minute read | ~800-1000 words. Quick and punchy but may feel thin. | |
| 8-10 minute read | ~2000-2500 words. Very thorough but risks losing readers. | |

**User's choice:** 5-7 minute read (Recommended)
**Notes:** None

---

## Claude's Discretion

- Architecture diagram implementation approach (React SVG, static SVG, or CSS/HTML)
- Tech Rationale section format (before/after cards, narrative prose, or hybrid)

## Deferred Ideas

None — discussion stayed within phase scope.
