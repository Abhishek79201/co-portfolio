# Phase 5: SEO & Verification - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the site discoverable by search engines with correct structured data, generate dynamic OG images for social sharing, verify all external project URLs, optimize images via next/image, and ensure Core Web Vitals are green. This phase touches SEO infrastructure, metadata, and performance -- no content changes, no layout restructuring, no new pages.

</domain>

<decisions>
## Implementation Decisions

### OG Image Design
- **D-01:** Dark branded style matching site aesthetic. Each case study OG image includes: studio name ("Dev Studio"), case study title, tagline, tech pills (e.g., [Redis] [OpenSearch] [DynamoDB]), and domain URL (abhishekvaghela.dev) on a near-black background.
- **D-02:** Per-project accent colors -- GleeMeet uses pink gradient edge, CareerBox uses violet, Zorova uses orange. Matches the site's existing per-project color system and distinguishes case studies in social feeds.
- **D-03:** Generated via Next.js `opengraph-image.tsx` route convention for automatic OG image generation per case study slug.

### Organization Schema
- **D-04:** Migrate JSON-LD from `@type: 'Person'` to `@type: 'Organization'` with a `founder` array containing both Abhishek and Vatsal as `@type: 'Person'` entries.
- **D-05:** Both founders' contact info in schema -- emails + GitHub + LinkedIn for each founder. Phone for Abhishek (existing), no phone for Vatsal (not available in data).
- **D-06:** Source all founder data from `data/team.ts` to stay DRY. Organization-level fields: name ("Dev Studio"), description, URL, knowsAbout.

### Dead Link Policy
- **D-07:** Verify all 6 project URLs (gleemeet.com, careerbox.in, zorova.in, empireinvestmentbank.com, huslemad.com, impactoverse.com) before linking.
- **D-08:** If a URL fails verification (site down or unreachable), remove the clickable link but keep the project visible in the portfolio. Re-add when the site comes back up.

### Image Optimization
- **D-09:** Remove `images: { unoptimized: true }` from `next.config.js`.
- **D-10:** Audit all existing `<img>` tags and migrate to `<Image>` from `next/image` with proper width/height/alt attributes. Focused migration, not a full WebP/AVIF overhaul.

### Core Web Vitals
- **D-11:** Measure LCP, CLS, INP on landing page and at least one case study page. Fix any issues found to achieve green scores.

### Robots & Sitemap
- **D-12:** Verify robots.txt is correct for all routes (currently disallows `/private/` and `/admin/` which don't exist -- clean up).
- **D-13:** Sitemap already includes case study routes -- verify it's complete and correct.

### Case Study Metadata
- **D-14:** `generateMetadata` on case study pages already returns title + description. Extend to include OG image reference (auto-handled by opengraph-image.tsx convention) and any missing OG fields.

### Claude's Discretion
- Core Web Vitals optimization approach -- Claude identifies and fixes performance bottlenecks as found
- Robots.txt cleanup specifics -- Claude removes non-existent disallow rules
- OG image typography and exact layout within the dark branded constraints
- Whether to generate a homepage OG image or keep the existing static `og-image.png`

### Carried Forward
- Placeholder studio name "Dev Studio" throughout (Phase 2 D-04)
- `frontend-design` skill for any UI work (Phase 2 D-20)
- Qualitative metrics only, no fake numbers (Phase 3 D-03)
- Case study accent colors: pink (GleeMeet), violet (CareerBox), orange (Zorova) -- from data layer

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SEO Files (being modified)
- `app/layout.tsx` -- Current JSON-LD (`@type: 'Person'` at line 72-86), metadata export (lines 36-70). Primary target for SEO-01.
- `app/robots.ts` -- Current robots.txt generation. Verify for SEO-07.
- `app/sitemap.ts` -- Current sitemap generation with case study routes. Verify for SEO-07.
- `next.config.js` -- Contains `images: { unoptimized: true }` to remove (SEO-05).

### Case Study Metadata
- `app/case-studies/[slug]/page.tsx` -- Already has `generateMetadata` (lines 30-46). Needs OG image integration (SEO-02, SEO-03).

### Data Sources
- `data/team.ts` -- Both founders' contact info, skills, social links. Source for Organization schema founder array.
- `data/projects.ts` -- All 6 projects with URLs to verify (SEO-04).
- `data/case-studies.ts` -- Case study titles, taglines, accent colors for OG image generation.

### Design System
- `config/design-system.ts` -- Color palette tokens (accent colors for OG images).
- `app/globals.css` -- CSS custom properties.

### Static Assets
- `public/og-image.png` -- Current static OG image for homepage.

### Prior Phase Context
- `.planning/phases/02-landing-page-rebrand/02-CONTEXT.md` -- D-19: JSON-LD migration deferred to this phase. D-04: placeholder studio name.
- `.planning/phases/03-case-study-pages/03-CONTEXT.md` -- Case study data model, accent color system.
- `.planning/phases/04-animation-polish/04-CONTEXT.md` -- Animation patterns (relevant for CWV performance).

### Requirements
- `.planning/REQUIREMENTS.md` -- SEO-01 through SEO-07 requirements mapped to this phase.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `data/team.ts` -- Both founders' data ready for Organization schema (email, GitHub, LinkedIn, skills)
- `data/projects.ts` -- Project URLs ready for verification
- `data/case-studies.ts` -- Case study metadata (title, tagline, accent) for OG image generation
- `config/design-system.ts` -- Color tokens for OG image accent colors
- `app/case-studies/[slug]/page.tsx` -- `generateMetadata` already functional, `generateStaticParams` in place

### Established Patterns
- Next.js metadata API used throughout (`export const metadata`, `generateMetadata`)
- Server Components for pages, Client Components for GSAP animations
- Data imports from `data/` directory -- all components consume centralized data
- CSS custom properties for accent colors (`--pink`, `--violet`, `--orange`)
- `accentRgbMap` in case study detail page for RGB accent values

### Integration Points
- `app/layout.tsx` -- JSON-LD script tag (replace Person with Organization)
- `app/case-studies/[slug]/` -- Add `opengraph-image.tsx` route for dynamic OG images
- `next.config.js` -- Remove `unoptimized: true`
- Components with `<img>` tags -- migrate to `<Image>` from next/image

</code_context>

<specifics>
## Specific Ideas

- OG images should feel like a natural extension of the site's dark aesthetic -- not generic social cards
- Per-project accent colors in OG images reinforce the visual identity established across case study pages
- Both founders get equal billing in the Organization schema, consistent with the team positioning throughout the site
- Dead links are removed silently rather than showing broken/disabled states -- clean portfolio presentation

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>

---

*Phase: 05-seo-verification*
*Context gathered: 2026-04-02*
