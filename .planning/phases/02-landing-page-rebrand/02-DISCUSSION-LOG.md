# Phase 2: Landing Page Rebrand - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-01
**Phase:** 02-landing-page-rebrand
**Areas discussed:** Hero & Studio Tone, Team Section Design, Methodology Section, Project Showcase Rework

---

## Hero & Studio Tone

### Vibe / Tone

| Option | Description | Selected |
|--------|-------------|----------|
| Bold & Audacious | Big statement energy, "We build what others plan." Keeps GSAP animations, rewrites copy for startup feel. | |
| Professional & Clean | Understated confidence, "Full-stack development studio." Less flashy, more whitespace, corporate-friendly. | ✓ |
| Developer-Centric | Terminal aesthetic, code references, "built by engineers for engineers." Leans into dark theme. | |

**User's choice:** Professional & Clean
**Notes:** None

### Hero Stats

| Option | Description | Selected |
|--------|-------------|----------|
| Studio metrics | 6+ Products Shipped, 3+ Years Building Together, 2 Founders | ✓ |
| Technical credibility | 3 Case Studies, Redis+OpenSearch Pattern, MVP→Scale | |
| No stats | Drop counter section entirely | |

**User's choice:** Studio metrics
**Notes:** None

### Animations

| Option | Description | Selected |
|--------|-------------|----------|
| Keep but tone down | Faster/subtler scramble, fade-in for subtitle and CTAs | |
| Clean fade/slide only | Drop scramble entirely, simple fade-up + slide | |
| Keep as-is | Scramble and character animations are signature, just change text | ✓ |

**User's choice:** Keep as-is
**Notes:** None

### Hero CTAs

| Option | Description | Selected |
|--------|-------------|----------|
| View Our Work + Contact | Dual CTA, scrolls to sections | |
| Case Studies + Contact | Links to /case-studies + contact section | |
| Single CTA | One primary button only | |

**User's choice:** Let Claude decide
**Notes:** User said "let claude deside also use /frontend-design skill for any ui work"

---

## Team Section Design

### Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Side-by-side cards | Two equal cards next to each other with avatar, name, role, skills, socials | ✓ |
| Shared narrative + callouts | Partnership paragraph first, then smaller individual cards below | |
| You decide | Claude picks the layout | |

**User's choice:** Side-by-side cards
**Notes:** None

### Photos

| Option | Description | Selected |
|--------|-------------|----------|
| Will provide photos | Real headshots in public/ | |
| Initials/avatars for now | Styled initials (AV, VZ) as placeholders, swappable later | ✓ |
| No photos | Skip photos entirely | |

**User's choice:** Initials/avatars for now
**Notes:** None

### Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Replace About | Merge team info into About section, rewrite bio into studio story + cards | ✓ |
| After About | Keep About as studio narrative, add Team as separate section | |
| Replace Experience | Replace work history with team section | |
| You decide | Claude picks placement | |

**User's choice:** Replace About
**Notes:** None

### Experience Section

| Option | Description | Selected |
|--------|-------------|----------|
| Remove it | Drop personal timeline, studio story + case studies provide enough credibility | |
| Convert to shared timeline | Rewrite as studio journey: GEC Modasa → X-Byte → Screenplay → Studio launch | ✓ |
| Keep as-is for now | Leave untouched in Phase 2 | |

**User's choice:** Convert to shared timeline
**Notes:** User said "we are working on projects since college all the projects are shared"

---

## Methodology Section

### Format

| Option | Description | Selected |
|--------|-------------|----------|
| Numbered steps | 3-4 numbered steps in horizontal row (stacked on mobile). 01 Discover → 02 Build MVP → 03 Iterate → 04 Scale. | ✓ |
| Cards with icons | 4 cards in a grid with icons, title, and short description | |
| You decide | Claude picks what fits best | |

**User's choice:** Numbered steps
**Notes:** None

### Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Before Projects | After Team/About, before Projects. who we are → how we work → what we've built | ✓ |
| After Projects | Let work speak first, then explain process | |
| You decide | Claude picks | |

**User's choice:** Before Projects
**Notes:** None

---

## Project Showcase Rework

### Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Keep list rows | Existing hover scramble rows, extend to 6 projects from data/projects.ts, add type labels | ✓ |
| Card grid | 2x3 or 3x2 card grid with thumbnails, tech pills, type badges | |
| You decide | Claude picks | |

**User's choice:** Keep list rows
**Notes:** None

### Type Labels

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle pill badges | Small colored pills using .pill class. Client=orange, Co-built=pink, Internal=cyan | ✓ |
| Text-only tag | Plain text like '[Client]' in muted color | |
| You decide | Claude picks | |

**User's choice:** Subtle pill badges
**Notes:** None

### Case Study Links

| Option | Description | Selected |
|--------|-------------|----------|
| 'Read Case Study' link | Show link on expanded detail for hasCaseStudy: true projects | ✓ |
| Badge/icon | Small icon on project row, clickable to case study | |
| No — keep simple | Just link to project URL, case studies via nav | |

**User's choice:** 'Read Case Study' link on expanded detail
**Notes:** None

---

## Claude's Discretion

- Hero CTA buttons (combination, wording, styling)
- Hero subtitle/tagline copy
- Contact section copy rewrite (studio framing)
- Footer text updates if needed

## Deferred Ideas

None — discussion stayed within phase scope.
