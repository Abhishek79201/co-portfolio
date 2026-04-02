# Phase 5: SEO & Verification - Research

**Researched:** 2026-04-02
**Domain:** Next.js SEO, Schema.org JSON-LD, OG image generation, image optimization, Core Web Vitals
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** OG images use dark branded style matching site aesthetic. Each case study OG image includes: studio name ("Dev Studio"), case study title, tagline, tech pills, and domain URL (abhishekvaghela.dev) on a near-black background.
- **D-02:** Per-project accent colors — GleeMeet uses pink gradient edge, CareerBox uses violet, Zorova uses orange. Matches the site's existing per-project color system.
- **D-03:** Generated via Next.js `opengraph-image.tsx` route convention for automatic OG image generation per case study slug.
- **D-04:** Migrate JSON-LD from `@type: 'Person'` to `@type: 'Organization'` with a `founder` array containing both Abhishek and Vatsal as `@type: 'Person'` entries.
- **D-05:** Both founders' contact info in schema — emails + GitHub + LinkedIn for each founder. Phone for Abhishek (existing), no phone for Vatsal (not available in data).
- **D-06:** Source all founder data from `data/team.ts` to stay DRY. Organization-level fields: name ("Dev Studio"), description, URL, knowsAbout.
- **D-07:** Verify all 6 project URLs before linking.
- **D-08:** If a URL fails verification, remove the clickable link but keep the project visible. Re-add when site comes back.
- **D-09:** Remove `images: { unoptimized: true }` from `next.config.js`.
- **D-10:** Audit all existing `<img>` tags and migrate to `<Image>` from next/image with proper width/height/alt. Focused migration, not a full WebP/AVIF overhaul.
- **D-11:** Measure LCP, CLS, INP on landing page and at least one case study page. Fix issues found to achieve green scores.
- **D-12:** Verify robots.txt is correct for all routes (remove non-existent `/private/` and `/admin/` disallow rules).
- **D-13:** Sitemap already includes case study routes — verify it's complete and correct.
- **D-14:** `generateMetadata` already returns title + description. Extend to include OG image reference and missing OG fields.

### Claude's Discretion

- Core Web Vitals optimization approach — Claude identifies and fixes performance bottlenecks as found
- Robots.txt cleanup specifics — Claude removes non-existent disallow rules
- OG image typography and exact layout within the dark branded constraints
- Whether to generate a homepage OG image or keep the existing static `og-image.png`

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

### Carried Forward

- Placeholder studio name "Dev Studio" throughout (Phase 2 D-04)
- `frontend-design` skill for any UI work (Phase 2 D-20)
- Qualitative metrics only, no fake numbers (Phase 3 D-03)
- Case study accent colors: pink (GleeMeet), violet (CareerBox), orange (Zorova) — from data layer
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-01 | Schema.org JSON-LD migrated from Person to Organization with founder array | D-04/D-05/D-06 decisions fully specify shape; Schema.org Organization type confirmed to support `founder`, `knowsAbout`, `sameAs`, `contactPoint` properties |
| SEO-02 | `generateMetadata` per case study page (unique title, description) | Already implemented in `app/case-studies/[slug]/page.tsx` lines 30-46; needs OG image fields added |
| SEO-03 | Dynamic OG images per case study via `opengraph-image.tsx` | Next.js file convention confirmed; ImageResponse API with async params documented; local TTF fonts available at `public/fonts/ttf/` |
| SEO-04 | All 6 project URLs verified as live before linking | URL audit complete (see Environment Availability); gleemeet.com live but URL in data/projects.ts is wrong (gleemet.com); huslemad.com DNS fails |
| SEO-05 | `images: { unoptimized: true }` removed; `next/image` used properly | No `<img>` tags found in codebase; removal of flag is the entire task; priority prop still valid in Next.js 15 (deprecated only in v16) |
| SEO-06 | Core Web Vitals green on landing page and case study pages | Measurement approach: Lighthouse in Chrome DevTools; GSAP animations are already using `gsap.matchMedia` and `prefers-reduced-motion`; main risk is LCP from unoptimized images |
| SEO-07 | Robots.txt verified correct for new routes | Current robots.ts has `/private/` and `/admin/` disallows which don't exist; sitemap.ts already includes all routes dynamically |
</phase_requirements>

---

## Summary

Phase 5 is a focused SEO infrastructure phase touching five distinct areas: JSON-LD schema migration, dynamic OG image generation, external URL verification, image optimization flag removal, and Core Web Vitals measurement. No new pages or layout changes are needed.

The codebase is in a clean state entering this phase. There are no `<img>` tags to migrate (grep confirms zero matches) — removing `images: { unoptimized: true }` from `next.config.js` is the only image optimization task. The sitemap already includes case study routes dynamically via `caseStudies` import. The `generateMetadata` function on the case study page already returns title and description, so only OG image fields need to be added.

The biggest substantive work item is `opengraph-image.tsx` — creating a new file at `app/case-studies/[slug]/opengraph-image.tsx` using the Next.js ImageResponse API with local JetBrains Mono TTF fonts and per-project accent colors. The second is swapping the JSON-LD from `@type: 'Person'` to `@type: 'Organization'` with a two-founder array sourced from `data/team.ts`.

**Primary recommendation:** Execute as four discrete tasks: (1) JSON-LD Organization schema, (2) opengraph-image.tsx per case study, (3) URL verification + dead link cleanup + next/image flag removal + generateMetadata OG fields, (4) robots.txt cleanup + CWV measurement and fixes.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next/og` (ImageResponse) | Built into Next.js 15 | OG image generation using JSX + Satori | Official Next.js API, no extra dependency, generates PNG at build time |
| `next/image` (Image) | Built into Next.js 15 | Optimized image rendering | Replaces raw `<img>`, enables WebP/AVIF, automatic srcset, lazy load |
| Schema.org JSON-LD (inline) | — | Structured data for search engines | Google-recommended approach; already in use in layout.tsx |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `node:fs/promises` + `node:path` | Node.js built-in | Load local TTF fonts for ImageResponse | Required for custom fonts in OG images in Node.js runtime |
| Lighthouse (Chrome DevTools) | Built into Chrome | CWV measurement (LCP, CLS, INP) | No install needed; lab data for local testing |
| Web Vitals Chrome Extension | Browser extension | Field-data CWV measurement | Supplements Lighthouse for real-user signal |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `opengraph-image.tsx` file convention | API route + `ImageResponse` | File convention is auto-wired by Next.js; API route requires manual `generateMetadata` referencing the route — more work for same result |
| Local font TTF via `readFile` | Google Fonts fetch in OG image | Local file is faster (no network), works offline, deterministic — always prefer local for OG images |
| Lighthouse in Chrome | PageSpeed Insights / CrUX | Lighthouse gives immediate lab data without waiting for field data; CrUX/PSI is better for real-user data but the domain may have insufficient traffic for CrUX reports |

**Installation:** No new packages required. `next/og` is built into Next.js 15. All other tools are already installed or are browser-based.

---

## Architecture Patterns

### Recommended Project Structure for New Files
```
app/
├── case-studies/
│   └── [slug]/
│       ├── page.tsx          # existing — add OG image fields to generateMetadata
│       └── opengraph-image.tsx   # NEW — dynamic OG per case study
app/
├── layout.tsx                # existing — replace JSON-LD Person → Organization
app/
├── robots.ts                 # existing — remove non-existent disallow rules
next.config.js                # existing — remove images.unoptimized: true
```

### Pattern 1: `opengraph-image.tsx` Dynamic Route Convention
**What:** A file named `opengraph-image.tsx` placed in a route segment is automatically wired by Next.js as the OG image for that segment. No manual `generateMetadata` `images` array needed for case study pages — Next.js infers it.
**When to use:** Any route that needs a unique, data-driven OG image.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
// app/case-studies/[slug]/opengraph-image.tsx

import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { caseStudies } from '@/data/case-studies'
import { projects } from '@/data/projects'

export const alt = 'Dev Studio Case Study'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = caseStudies.find((cs) => cs.slug === slug)
  const project = projects.find((p) => p.slug === caseStudy?.projectSlug)

  // Load local font — process.cwd() is project root
  const jetbrainsMono = await readFile(
    join(process.cwd(), 'public/fonts/ttf/JetBrainsMono-SemiBold.ttf')
  )

  const accentColor = {
    pink: '#ec4899',
    violet: '#a855f7',
    orange: '#f97316',
  }[project?.accent ?? 'violet'] ?? '#a855f7'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0a0a',
          padding: '60px',
          fontFamily: 'JetBrains Mono',
        }}
      >
        {/* accent edge bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: accentColor }} />
        {/* studio name */}
        <div style={{ color: accentColor, fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 32 }}>
          Dev Studio
        </div>
        {/* case study title */}
        <div style={{ color: '#fafafa', fontSize: 48, fontWeight: 600, marginBottom: 16, maxWidth: 900 }}>
          {caseStudy?.title ?? 'Case Study'}
        </div>
        {/* tagline */}
        <div style={{ color: '#a1a1aa', fontSize: 20, maxWidth: 800 }}>
          {caseStudy?.tagline ?? ''}
        </div>
        {/* tech pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          {(project?.tech ?? []).slice(0, 5).map((t) => (
            <div key={t} style={{ color: accentColor, border: `1px solid ${accentColor}`, borderRadius: 4, padding: '4px 10px', fontSize: 12, letterSpacing: '0.1em' }}>
              {t}
            </div>
          ))}
        </div>
        {/* domain */}
        <div style={{ color: '#52525b', fontSize: 12, letterSpacing: '0.1em', position: 'absolute', bottom: 28, right: 60 }}>
          abhishekvaghela.dev
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'JetBrains Mono', data: jetbrainsMono, weight: 600, style: 'normal' }],
    }
  )
}
```

### Pattern 2: Organization JSON-LD with Founder Array
**What:** Replace the current `@type: 'Person'` JSON-LD in `app/layout.tsx` with `@type: 'Organization'` containing a `founder` array. Both founders sourced from `data/team.ts` to stay DRY.
**When to use:** Any site representing a company or studio rather than an individual.
**Example:**
```typescript
// Source: Schema.org Organization spec, verified at https://schema.org/Organization
import { team } from '@/data/team'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dev Studio',  // TODO: Replace when final studio name decided
  description: 'Two full-stack developers building scalable web applications.',
  url: 'https://abhishekvaghela.dev',
  knowsAbout: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Redis', 'OpenSearch'],
  founder: team.map((member) => ({
    '@type': 'Person',
    name: member.name,
    email: member.email,
    url: member.linkedin,
    sameAs: [member.github, member.linkedin],
    ...(member.email === 'vaghelaabhishek2580@gmail.com'
      ? { telephone: '+91 8200394360' }
      : {}),
  })),
}
```

**Note:** `data/team.ts` does not contain a `telephone` field on the TeamMember type. The phone number must be hard-coded for Abhishek, conditioned by email match or index, because it is not in the data type. Consider whether to add a `telephone?: string` field to the TeamMember interface.

### Pattern 3: generateMetadata OG Image Integration
**What:** When `opengraph-image.tsx` exists in the same route segment, Next.js auto-injects the OG image meta tags. The `generateMetadata` function still needs explicit `openGraph` and `twitter` fields for other meta like `title`, `description`, `siteName`.
**When to use:** Case study pages where both dynamic OG image and other metadata are needed.
**Example:**
```typescript
// app/case-studies/[slug]/page.tsx — extend existing generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = caseStudies.find((cs) => cs.slug === slug)

  if (!caseStudy) {
    return { title: 'Case Study Not Found' }
  }

  return {
    title: `${caseStudy.title} | Dev Studio`,
    description: caseStudy.tagline,
    openGraph: {
      title: `${caseStudy.title} | Dev Studio`,
      description: caseStudy.tagline,
      type: 'article',
      url: `https://abhishekvaghela.dev/case-studies/${slug}`,
      siteName: 'Dev Studio',
      // og:image is auto-injected from opengraph-image.tsx; no manual images[] needed
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} | Dev Studio`,
      description: caseStudy.tagline,
      // twitter:image is auto-injected from opengraph-image.tsx
    },
  }
}
```

### Anti-Patterns to Avoid
- **CSS variables in ImageResponse JSX:** Satori (the renderer behind `next/og`) does not support CSS custom properties (`var(--pink)`). Use literal hex values sourced from `config/design-system.ts` instead.
- **Tailwind classes in ImageResponse JSX:** Satori does not process Tailwind. Use inline `style` objects only.
- **`priority` prop on non-LCP images:** Only the above-the-fold hero image should use `priority` (or in Next.js 16+: `fetchPriority="high"`). Applying it broadly defeats lazy loading.
- **Missing `sizes` on responsive images:** Without `sizes`, Next.js assumes `100vw` and downloads unnecessarily large images. Add `sizes` whenever using CSS responsive widths.
- **Leaving `/private/` and `/admin/` in robots.ts:** These paths don't exist. Clean disallow list prevents robots.txt from appearing to acknowledge sensitive paths that are absent.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OG image generation | Canvas API, Puppeteer screenshot | `ImageResponse` from `next/og` | Satori renders JSX to PNG at build time with zero runtime overhead; Puppeteer adds ~100MB dependency |
| Font loading in OG images | Download/embed fonts in JS | `readFile` from `node:fs/promises` on local TTF | TTF files already in `public/fonts/ttf/`; no network fetch needed |
| URL liveness checking | Custom HTTP probe | `curl -s -o /dev/null -w "%{http_code}"` during research, then hard-code result | URLs change slowly; over-engineering a live check into the app creates flaky builds |
| JSON-LD structured data serialization | Schema.org TypeScript SDK | Inline JS object + `JSON.stringify` | No package needed; already the pattern in `app/layout.tsx` |
| Sitemap generation | Static XML file | `app/sitemap.ts` (already in place) | Dynamic sitemap auto-includes new case studies from `caseStudies` array |

**Key insight:** All tooling for this phase is built into Next.js or already installed. Zero new `npm install` steps are needed.

---

## URL Verification Results (SEO-04)

URL checks performed during research on 2026-04-02:

| Project | URL in data/projects.ts | HTTP Status | Result |
|---------|------------------------|-------------|--------|
| GleeMeet | `https://gleemet.com` | 000 (DNS fail) | WRONG URL — see note below |
| GleeMeet (correct) | `https://gleemeet.com` | 200 | Live |
| CareerBox | `https://careerbox.in` | 200 | Live |
| Zorova | `https://zorova.in` | 522 | Down (Cloudflare timeout) |
| Empire Investment Bank | `https://empireinvestmentbank.com` | 200 | Live |
| Huslemad | `https://huslemad.com` | DNS fail | Down |
| Impactoverse | `https://impactoverse.com` | 200 | Live |

**Critical data bug:** `data/projects.ts` line 21 has `url: 'https://gleemet.com'` (one 'e'). The correct live URL is `https://gleemeet.com` (two 'e'). This must be corrected as part of SEO-04.

**Dead link policy (D-08):** Zorova (`zorova.in`) and Huslemad (`huslemad.com`) are currently unreachable. Remove clickable `<a>` links for those projects while keeping the project cards visible. Restore links when sites come back up.

**Note on curl on Windows:** `curl` on Windows with schannel TLS may produce SSL decrypt warnings for some sites without affecting the actual status code. Results above are the final HTTP status codes, not SSL handshake noise.

---

## Common Pitfalls

### Pitfall 1: CSS Variables in ImageResponse (Satori)
**What goes wrong:** Using `color: 'var(--pink)'` or other CSS custom properties in the JSX passed to `ImageResponse`. The image renders with no color or falls back to default.
**Why it happens:** Satori renders JSX to SVG/PNG outside the browser DOM; it has no CSS variable resolution context.
**How to avoid:** Import accent hex values from `config/design-system.ts` directly: `colors.pink.DEFAULT` (`'#ec4899'`), `colors.violet.DEFAULT` (`'#a855f7'`), `colors.orange.DEFAULT` (`'#f97316'`).
**Warning signs:** OG image renders with incorrect or missing colors; no build error thrown.

### Pitfall 2: `params` Must Be Awaited (Next.js 15)
**What goes wrong:** Accessing `params.slug` synchronously in `opengraph-image.tsx` — throws a Next.js 15 runtime error about async params.
**Why it happens:** Next.js 15 made params a Promise (same as `page.tsx` and `generateMetadata`).
**How to avoid:** `const { slug } = await params` — identical pattern to the existing `generateMetadata` in `page.tsx`.
**Warning signs:** Build error or runtime `TypeError: Cannot read properties of Promise`.

### Pitfall 3: OG Image Not Appearing on Social Platforms
**What goes wrong:** `opengraph-image.tsx` exists but social sharing shows the wrong or no image.
**Why it happens:** (a) Crawler fetched the page before the image was deployed, (b) `metadataBase` not set in root layout, (c) absolute URL not used.
**How to avoid:** Verify `metadataBase: new URL('https://abhishekvaghela.dev')` exists in `app/layout.tsx` (it does). Use Facebook Sharing Debugger or Twitter Card Validator to force re-scrape after deployment.
**Warning signs:** OG image absent when tested with social card validators; correct URL shows in source `<meta>` tags.

### Pitfall 4: Removing `unoptimized: true` Without Confirming No `<img>` Tags Exist
**What goes wrong:** After removing `unoptimized: true`, any remaining raw `<img>` tags with internal `/public/` paths will break in production with 400 errors from the image optimizer, because the optimizer can't handle arbitrary paths from raw tags.
**Why it happens:** `unoptimized: true` was a safety flag allowing raw `<img>` to work. Removing it activates the optimizer which only handles `<Image>` components.
**How to avoid:** Confirmed via `grep` that zero `<img>` tags exist in `*.tsx` files. Safe to remove flag.
**Warning signs:** 400 responses on image paths in production; `console.error` about invalid image optimization paths.

### Pitfall 5: CLS from Images Without Explicit Dimensions
**What goes wrong:** Using `fill` mode without a sized parent container, or using `<Image>` without `width`/`height` and without `fill` — causes layout shift as the image loads.
**Why it happens:** Browser can't reserve space without knowing aspect ratio.
**How to avoid:** Always set `width` and `height` matching the intrinsic image dimensions, OR use `fill` with a parent that has explicit height (via CSS). Note: this is theoretical for this phase since no `<img>` tags exist currently; applies if new images are added.
**Warning signs:** CLS score > 0.1 in Lighthouse.

### Pitfall 6: `gleemeet.com` URL Typo in data/projects.ts
**What goes wrong:** The existing data has `https://gleemet.com` (one 'e') which returns a DNS failure.
**Why it happens:** Typo in the original data entry.
**How to avoid:** Fix the URL to `https://gleemeet.com` as part of SEO-04.
**Warning signs:** curl returns HTTP 000 for `gleemet.com`.

---

## Code Examples

### Organization JSON-LD Shape
```typescript
// Source: https://schema.org/Organization
// Verified properties: name, description, url, founder, knowsAbout, sameAs
{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dev Studio',
  description: 'Two full-stack developers building scalable web applications. Expertise in React, Next.js, Node.js, TypeScript, MongoDB, AWS.',
  url: 'https://abhishekvaghela.dev',
  knowsAbout: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Redis', 'OpenSearch'],
  founder: [
    {
      '@type': 'Person',
      name: 'Abhishek Vaghela',
      email: 'vaghelaabhishek2580@gmail.com',
      telephone: '+91 8200394360',
      sameAs: [
        'https://github.com/abhishekvaghela',
        'https://linkedin.com/in/abhishekvaghela',
      ],
    },
    {
      '@type': 'Person',
      name: 'Vatsal Zinzuvadiya',
      email: 'vatsalzinzuvadiya@gmail.com',
      sameAs: [
        'https://github.com/vatsalzinzuvadiya',
        'https://linkedin.com/in/vatsalzinzuvadiya',
      ],
    },
  ],
}
```

### robots.ts Cleaned Up
```typescript
// Source: Current app/robots.ts — remove non-existent disallow paths
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://abhishekvaghela.dev'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Removed: disallow ['/private/', '/admin/'] — these paths do not exist
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### next.config.js After Change
```javascript
// Remove images: { unoptimized: true } — confirmed safe, zero <img> tags in codebase
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // images.unoptimized removed — next/image optimization now active
}

module.exports = nextConfig
```

### ImageResponse Font Loading (Confirmed Path)
```typescript
// Source: Next.js official docs - local asset pattern
// Confirmed: public/fonts/ttf/JetBrainsMono-SemiBold.ttf exists
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const jetbrainsMono = await readFile(
  join(process.cwd(), 'public/fonts/ttf/JetBrainsMono-SemiBold.ttf')
)
// Pass to ImageResponse options:
// fonts: [{ name: 'JetBrains Mono', data: jetbrainsMono, weight: 600, style: 'normal' }]
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@type: 'Person'` JSON-LD | `@type: 'Organization'` with founder array | Already deferred from Phase 2 | Better search engine entity understanding for a studio |
| `priority` prop for LCP images | `fetchPriority="high"` or `preload` prop | Next.js 16 (not yet) | No change needed in v15; `priority` still valid |
| First Input Delay (FID) | Interaction to Next Paint (INP) | March 2024 | INP < 200ms is now the CWV interactivity metric |
| Separate `@vercel/og` package | `ImageResponse` from `next/og` (built-in) | Next.js 13.3 | No separate install needed |

**Deprecated/outdated:**
- `@type: 'Person'` for a studio: still valid JSON-LD but semantically incorrect for an organization. No deprecation — just wrong type.
- `images: { unoptimized: true }`: Was used as a workaround. Removing it re-enables proper image optimization.
- `/private/` and `/admin/` disallow rules in robots.ts: These routes were never created; rules should be removed to avoid implying their existence.

---

## Open Questions

1. **TeamMember interface — telephone field**
   - What we know: `data/team.ts` TeamMember type has no `telephone` field; Abhishek's phone is hardcoded in layout.tsx currently.
   - What's unclear: Should the `telephone` field be added to the TeamMember TypeScript interface to source it properly, or should it remain a one-off hard-code in layout.tsx's JSON-LD?
   - Recommendation: Add `telephone?: string` to TeamMember interface and populate for Abhishek. Keeps data DRY and type-safe.

2. **Homepage OG image — static vs dynamic**
   - What we know: `public/og-image.png` exists and is currently used as the homepage OG image. Context D-03 only specifies dynamic OG for case study pages.
   - What's unclear: Should the homepage get a dynamic `opengraph-image.tsx` at `app/opengraph-image.tsx` to replace the static PNG?
   - Recommendation: This is Claude's discretion per context. Keeping the static PNG is acceptable for Phase 5 scope. The static `og-image.png` is presumably already branded correctly.

3. **Zorova and Huslemad link removal — UI pattern**
   - What we know: D-08 says remove the clickable link but keep the project visible.
   - What's unclear: Where exactly are project links rendered? The current codebase has `data/projects.ts` with URL fields, but no `next/link` or `<a>` tags from projects were found in the components searched so far. The Projects section component needs to be audited for how it renders links.
   - Recommendation: Planner should include a task step to grep for all usages of `project.url` across components to identify link render points.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | opengraph-image font loading (fs/promises) | Yes | v22.12.0 | — |
| npm | Package management | Yes | 10.9.0 | — |
| Next.js | All SEO tasks | Yes | 15.5.12 (in repo) | — |
| `next/og` (ImageResponse) | SEO-03 | Yes (built-in to Next.js 15) | — | — |
| JetBrains Mono TTF | OG image fonts | Yes | `public/fonts/ttf/JetBrainsMono-SemiBold.ttf` | JetBrainsMono-Regular.ttf |
| Chrome + Lighthouse | SEO-06 CWV measurement | Assumed (standard dev tool) | — | PageSpeed Insights online |
| curl | URL verification (research only) | Yes (Windows curl) | — | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None — all required tools are available or built-in.

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs: `https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image` — opengraph-image.tsx file convention, ImageResponse API, async params in Next.js 15/16
- Next.js official docs: `https://nextjs.org/docs/app/api-reference/components/image` — next/image props, priority deprecation timeline, fill/width/height requirements
- Schema.org: `https://schema.org/Organization` — Organization type properties (founder, knowsAbout, sameAs, contactPoint)
- Direct HTTP checks (`curl`) — all 6 project URL liveness results are first-party verified, not inferred

### Secondary (MEDIUM confidence)
- Google Search Central: `https://developers.google.com/search/docs/appearance/structured-data/organization` — Google-specific Organization schema requirements
- Vercel docs: `https://vercel.com/docs/speed-insights/metrics` — CWV thresholds (LCP < 2.5s, INP < 200ms, CLS < 0.1)

### Tertiary (LOW confidence)
- None — all critical claims verified against official sources

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — `next/og` and `next/image` are official Next.js APIs, verified against current docs (version 16.2.2 docs viewed, applicable to v15)
- Architecture patterns: HIGH — file convention patterns confirmed from official Next.js docs
- URL verification: HIGH — first-party curl checks run during research session
- Pitfalls: HIGH for Satori CSS var limitation (well-documented), MEDIUM for CLS/LCP specifics (measured at execution time)

**Research date:** 2026-04-02
**Valid until:** 2026-05-02 (stable APIs, 30-day window; URL liveness should be re-checked at execution time)
