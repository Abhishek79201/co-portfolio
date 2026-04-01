# Phase 4: Animation & Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-04-02
**Phase:** 04-animation-polish
**Areas discussed:** Diagram animations, Landing page fluidity, Mobile animation strategy, Metric animation style

---

## Diagram Animations

| Option | Description | Selected |
|--------|-------------|----------|
| SVG path tracing | Arrows draw themselves along paths (stroke-dashoffset), boxes fade/scale in at endpoints. Premium feel. | ✓ |
| Staggered fade-in | Boxes and arrows fade in one-by-one in logical order. Simpler, still polished. | |
| You decide | Claude picks best approach balancing visual impact with effort. | |

**User's choice:** SVG path tracing
**Notes:** User chose the most premium option. Diagrams already exist as SVG React components -- animation-ready.

### Follow-up: Trigger behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Scroll-triggered once | Diagram animates when scrolled into view via ScrollTrigger. Replays on revisit. | ✓ |
| Immediate on load | Diagram plays animation as soon as section renders. No scroll gating. | |
| You decide | Claude picks based on case study page flow. | |

**User's choice:** Scroll-triggered once
**Notes:** Matches editorial reading flow of case study pages.

---

## Landing Page Fluidity

| Option | Description | Selected |
|--------|-------------|----------|
| Timing feels choppy | Animations start/stop abruptly. Want smoother easing, better stagger timing, natural motion. | ✓ |
| Sections lack entrance animations | Some sections just appear. Want consistent scroll-triggered entrances. | |
| Everything needs polish | Both timing and missing animations. Full premium pass. | |
| You decide | Claude audits and improves what looks weakest. | |

**User's choice:** Timing feels choppy
**Notes:** Primary complaint is abrupt starts/stops, not missing animations.

### Follow-up: Scrub animations

| Option | Description | Selected |
|--------|-------------|----------|
| Add scrub where it fits | Some elements tie to scroll position for buttery feel. Claude picks where scrub helps. | ✓ |
| Keep discrete triggers | Stick to enter-once with better easing. No scroll-linked motion. | |
| You decide | Claude judges per-section. | |

**User's choice:** Add scrub where it fits
**Notes:** User open to scroll-linked motion, trusts Claude to pick appropriate sections.

### Follow-up: Section priority

| Option | Description | Selected |
|--------|-------------|----------|
| Claude audits all | Full pass across Hero, About, Experience, Projects, Contact. Prioritize by impact. | ✓ |
| Hero is worst | Focus most effort on hero section. | |
| About/Experience | Middle sections feel most disconnected. | |

**User's choice:** Claude audits all
**Notes:** No specific section called out -- full audit needed.

---

## Mobile Animation Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Simplified variants | Keep core animations but simplify via gsap.matchMedia(). Fewer staggers, no parallax, simpler easing. | ✓ |
| Full animations, optimized | Same animations as desktop with will-change hints and GPU acceleration. | |
| CSS-only on mobile | Replace all GSAP with CSS transitions on mobile. Maximum performance. | |
| You decide | Claude picks per section based on complexity. | |

**User's choice:** Simplified variants
**Notes:** Good balance of feel vs. performance. Still uses GSAP but with reduced complexity.

### Follow-up: Reduced motion

| Option | Description | Selected |
|--------|-------------|----------|
| Instant state, no motion | Elements appear in final state immediately. No transitions, no reveals. | |
| Gentle fades only | Allow simple opacity fades (200-300ms) but no transforms. | |
| You decide | Claude implements the most accessible approach. | ✓ |

**User's choice:** You decide
**Notes:** Claude's discretion on reduced-motion implementation.

---

## Metric Animation Style

| Option | Description | Selected |
|--------|-------------|----------|
| Staggered card reveal | Each metric card fades up + slides in with stagger delay. Accent color flash on value. | ✓ |
| Counter + text hybrid | Animate number portions as counters, qualitative text gets fade-in. | |
| Typewriter reveal | Text types out character by character via SplitText. Dramatic but potentially slow. | |
| You decide | Claude picks best reveal style. | |

**User's choice:** Staggered card reveal
**Notes:** Clean, editorial style. Accent color flash ties to per-case-study accent colors.

---

## Claude's Discretion

- Reduced-motion implementation approach (instant vs. gentle fades vs. hybrid)
- Per-section scrub vs. trigger decisions
- Easing curve choices per animation type
- Client component wrapper architecture for case study page animations

## Deferred Ideas

None -- discussion stayed within phase scope.
