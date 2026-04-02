# Phase 6: Studio Sections - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Rewrite the About section into a studio narrative with team cards, add a Methodology section with the "How we work" process — completing the landing page studio identity rebrand. Also fixes 3 broken integration points: Navigation #team and #methodology anchors pointing to nothing, Hero scroll indicator broken, and scroll-spy not activating for Team and How We Work nav items.

</domain>

<decisions>
## Implementation Decisions

### About Section Content Migration
- **D-01:** Transform current personal About into studio-level content. Drop personal bio, education block, and individual skill pills from section level. Studio-level stats replace personal stats. Individual skills move to team cards only.
- **D-02:** Studio stats counters: "8+ Combined Years" + "6 Products Shipped" + "50+ Technologies" — animated counters (existing pattern).
- **D-03:** Shared history narrative uses timeline-flavored tone: chronological journey arc from GEC Modasa → X-Byte → Screenplay → studio launch. Not mission-driven or proof-driven — it tells the partnership story.

### About Section Internal Layout
- **D-04:** Internal order: Narrative paragraph first (sets context) → Stats counters below → Team cards at bottom. Top-down storytelling flow.
- **D-05:** Section id should be `team` to match existing Navigation anchor (`#team`). Aria-label updated from "About me" to studio framing.

### Team Cards
- **D-06:** Minimal dark cards — subtle border, dark background matching site aesthetic. No glass effects, no hover glow. Consistent with existing dark theme.
- **D-07:** Initials avatar in accent-colored circle. Same accent color for both founders (not unique per person) — emphasizes unity as a team.
- **D-08:** Card content: initials avatar, name, role, skills as small pills, GitHub + LinkedIn icon links. No bio paragraph on cards. Data sourced from `data/team.ts`.
- **D-09:** Desktop: side-by-side cards (equal billing). Mobile: stack vertically (full-width cards for readability).

### Methodology Section
- **D-10:** Numbered text blocks using existing section numbering convention (`01 /`, `02 /`, etc.). Large accent-colored numbers with title and 1-2 line description. No icons, no connecting lines, no cards. Clean and typographic.
- **D-11:** Content locked from Phase 2 context: 01 Discover → 02 Build MVP → 03 Iterate → 04 Scale. Claude writes the 1-2 line descriptions.
- **D-12:** Layout locked from Phase 2 context: horizontal 4-column on desktop, stacked on mobile.
- **D-13:** Section id: `methodology` to match existing Navigation anchor (`#methodology`).

### Page Flow
- **D-14:** Page composition order (from Phase 2 D-13): Hero → Team/About (`#team`) → Experience (`#experience`) → How We Work (`#methodology`) → Projects (`#projects`) → Contact (`#contact`).

### Integration Fixes
- **D-15:** Hero scroll indicator `<a href="#team">` will now resolve to a real section.
- **D-16:** Navigation scroll-spy for Team and How We Work will activate once sections with matching IDs exist in the DOM.

### Claude's Discretion
- Word-by-word scroll reveal on studio narrative: Claude decides whether to keep the signature animation or use a simpler fade, based on narrative length and animation budget.
- Methodology step description copy: Claude writes what fits the professional & clean tone.
- Animation patterns for team cards and methodology section (stagger reveals, etc.).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Data Layer
- `data/types.ts` — TeamMember interface (skills, social links, role fields)
- `data/team.ts` — Both team members with all card content

### Design System
- `config/design-system.ts` — Color palette and typography tokens
- `app/globals.css` — CSS custom properties (--violet, --pink, --cyan), utility classes (.pill, .heading-brutal, .dev-mono)

### Components Being Modified
- `components/About.tsx` — Current personal About section (full rewrite to studio narrative + team cards)
- `app/page.tsx` — Page composition order (add Methodology component between Experience and Projects)

### Components to Reference (patterns)
- `components/Hero.tsx` — Section numbering convention, scroll indicator anchor (`#team`)
- `components/Experience.tsx` — Section layout pattern, GSAP animation approach
- `components/Navigation.tsx` — Nav items array (already has Team, Journey, How We Work entries)

### Animation Infrastructure
- `lib/gsap.ts` — Centralized GSAP + SplitText + ScrollTrigger registration
- Pattern: `useGSAP(() => { ... }, { scope: sectionRef })` with `gsap.matchMedia()` for responsive

### Prior Phase Context
- `.planning/phases/02-landing-page-rebrand/02-CONTEXT.md` — Phase 2 decisions D-05 through D-13 (team, methodology, page flow)
- `.planning/v1.0-MILESTONE-AUDIT.md` — Integration issues being fixed (broken anchors, duplicate landmarks, scroll-spy gaps)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `data/team.ts` — Ready to consume, has both members with skills, social links, GitHub, LinkedIn
- `.pill` CSS class in `globals.css` — For skill pills on team cards
- `lucide-react` — GitHub and LinkedIn icons available
- `useGSAP` hook — All animated sections already use this pattern
- Section numbering convention (`01 / About`, `02 / Experience`) — Methodology steps follow same format

### Established Patterns
- Client components with `'use client'` for GSAP animations
- `gsap.matchMedia()` with `isDesktop`/`isMobile`/`reduceMotion` conditions (all 5 landing sections use this)
- `SplitText.create()` with `autoSplit: true` and `onSplit` for text animations
- Stats counters: `gsap.to()` with `snap` for animated number counting (existing in About.tsx)
- Section structure: `useRef` for section element, ScrollTrigger for reveals

### Integration Points
- `app/page.tsx` — Methodology component needs to be added between Experience and Projects
- `components/Navigation.tsx` — Already has correct nav items; sections just need matching IDs
- `components/Hero.tsx` — Scroll indicator already points to `#team`; no change needed once section exists

</code_context>

<specifics>
## Specific Ideas

- Studio stats should use animated counters (same treatment as current personal stats counters in About.tsx)
- Methodology numbering format matches existing section labels (`01 /`, `02 /`) — visual consistency across the page
- Same accent color for both team card avatars reinforces "one team" identity
- Timeline-flavored narrative: the shared journey story is the emotional hook, not a mission statement

</specifics>

<deferred>
## Deferred Ideas

- Experience section timeline conversion to shared journey milestones (D-09 from Phase 2 context) — not in Phase 6 requirements, would need its own scope
- Photos replacing initials avatars — D-07 from Phase 2 says "support swapping later"

</deferred>

---

*Phase: 06-studio-sections*
*Context gathered: 2026-04-02*
