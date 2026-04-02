# Phase 5: SEO & Verification - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-04-02
**Phase:** 05-seo-verification
**Areas discussed:** OG Image Design, Organization Schema Content, Dead Link Policy, next/image Scope

---

## OG Image Design

### Q1: Visual style for dynamic OG images

| Option | Description | Selected |
|--------|-------------|----------|
| Dark branded | Dark bg matching site aesthetic. Studio name, title, tagline, tech pills, accent gradient edge, domain URL. | ✓ |
| Minimal dark | Just case study title and studio name on dark background. No tech pills or tagline. | |
| Light professional | White/light background for contrast in social feeds. Different from site aesthetic. | |

**User's choice:** Dark branded
**Notes:** Consistent with site's dark aesthetic. Includes studio name, case study title, tagline, tech pills, and domain URL.

### Q2: Accent color per OG image

| Option | Description | Selected |
|--------|-------------|----------|
| Per-project accent | Each OG image uses case study's accent color (pink/violet/orange) for gradient highlights. | ✓ |
| Uniform studio color | All OG images use same accent color for brand consistency. | |

**User's choice:** Per-project accent
**Notes:** Matches existing per-project color system. Helps distinguish case studies in social feeds.

---

## Organization Schema Content

### Q3: Contact info in Organization schema

| Option | Description | Selected |
|--------|-------------|----------|
| Keep Abhishek's info for now | Use existing email/phone as Organization contact. Simplest path. | |
| Both founders' contact info | Both people's emails, GitHub, LinkedIn in founder array. Phone for Abhishek. | ✓ |
| Minimal -- founders + socials only | No email/phone in schema. Founders have GitHub + LinkedIn only. | |

**User's choice:** Both founders' contact info
**Notes:** Data already available in `data/team.ts`. Vatsal has no phone listed -- email + GitHub + LinkedIn only for him.

---

## Dead Link Policy

### Q4: Handling failed URL verification

| Option | Description | Selected |
|--------|-------------|----------|
| Remove the link | Remove clickable link but keep project visible. Re-add when site comes back. | ✓ |
| Keep linking anyway | Link all 6 regardless of status. May hit dead links. | |
| Visual disabled state | Show URL but grayed out, no click. Signals unavailability. | |

**User's choice:** Remove the link
**Notes:** Clean portfolio presentation. Project stays visible, just without external link.

---

## next/image Scope

### Q5: Image optimization aggressiveness

| Option | Description | Selected |
|--------|-------------|----------|
| Remove flag + migrate existing | Remove `unoptimized: true`. Audit `<img>` tags, migrate to `<Image>` with proper attributes. | ✓ |
| Remove flag only | Just remove the config flag. Minimal effort. | |
| Full image audit + WebP/AVIF | Maximum optimization with format preferences, responsive srcsets, lazy loading audit. | |

**User's choice:** Remove flag + migrate existing
**Notes:** Focused migration. Site is mostly SVG/CSS with limited raster images.

---

## Claude's Discretion

- Core Web Vitals optimization approach
- Robots.txt cleanup specifics
- OG image exact typography and layout
- Homepage OG image: keep static or generate dynamic

## Deferred Ideas

None -- discussion stayed within phase scope.
