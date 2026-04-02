---
phase: 05-seo-verification
plan: 01
subsystem: seo
tags: [structured-data, og-images, metadata, schema-org, next-og]
dependency_graph:
  requires: [data/team.ts, data/case-studies.ts, data/projects.ts, config/design-system.ts]
  provides: [Organization JSON-LD, dynamic OG images per case study, extended case study metadata]
  affects: [app/layout.tsx, app/case-studies/[slug]/page.tsx]
tech_stack:
  added: [next/og (ImageResponse), node:fs/promises, node:path]
  patterns: [Next.js opengraph-image.tsx route convention, schema.org Organization type with founder array, Satori inline styles for OG image rendering]
key_files:
  created: [app/case-studies/[slug]/opengraph-image.tsx]
  modified: [app/layout.tsx, data/types.ts, data/team.ts, app/case-studies/[slug]/page.tsx]
decisions:
  - Organization JSON-LD sourced from data/team.ts to stay DRY (per D-06)
  - telephone conditionally spread per founder — only Abhishek has phone number
  - Satori requires literal hex values — CSS custom properties not supported in OG images
  - No manual images array in openGraph — Next.js auto-injects from opengraph-image.tsx convention
metrics:
  duration: 12 minutes
  completed: "2026-04-02T10:35:34Z"
  tasks_completed: 2
  files_created: 1
  files_modified: 4
---

# Phase 05 Plan 01: Schema Migration and Dynamic OG Images Summary

**One-liner:** Organization JSON-LD with two-founder array sourced from data/team.ts, plus dynamic per-case-study OG images using Next.js opengraph-image.tsx convention with per-project accent colors.

## What Was Built

### Task 1: Migrate JSON-LD from Person to Organization

The site's structured data in `app/layout.tsx` was updated from `@type: Person` to `@type: Organization`. The new schema:
- Uses `@type: Organization` at the top level
- Sources both founders dynamically via `team.map()` from `data/team.ts`
- Each founder is a `@type: Person` entry with name, email, url (LinkedIn), sameAs (GitHub + LinkedIn)
- Abhishek's telephone included conditionally via spread — Vatsal has no phone in team data
- Removed `jobTitle`, `alumniOf` (not applicable to Organization schema)
- `knowsAbout` updated to include Redis and OpenSearch

The `TeamMember` interface in `data/types.ts` gained an optional `telephone?: string` field, and Abhishek's entry in `data/team.ts` now includes `telephone: '+91 8200394360'`.

### Task 2: Dynamic OG Images and Extended Metadata

Created `app/case-studies/[slug]/opengraph-image.tsx` using the Next.js file-system convention for automatic OG image generation. Each case study gets a unique branded card:
- Dark background (`#0a0a0a`) matching the site aesthetic
- Per-project accent color gradient edge bar (pink for GleeMeet, violet for CareerBox, orange for Zorova)
- Studio name, case study title, tagline, and first 5 tech pills
- Domain URL in muted text at bottom right
- JetBrains Mono SemiBold loaded from `public/fonts/ttf/JetBrainsMono-SemiBold.ttf` via `node:fs/promises`
- Literal hex values throughout (Satori does not support CSS custom properties)

Extended `generateMetadata` in `app/case-studies/[slug]/page.tsx` to include `openGraph` and `twitter` objects:
- `openGraph.type: 'article'` with full canonical URL per slug
- `twitter.card: 'summary_large_image'`
- No manual `images` array — Next.js auto-injects from the opengraph-image.tsx convention

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | e002254 | feat(05-01): migrate JSON-LD from Person to Organization with founder array |
| Task 2 | 6233e63 | feat(05-01): add dynamic OG images and extend case study metadata |

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all data wired from live sources (data/team.ts, data/case-studies.ts, data/projects.ts).

## Self-Check: PASSED

Files created/modified verified:
- FOUND: app/layout.tsx (contains Organization JSON-LD)
- FOUND: data/types.ts (contains telephone?: string)
- FOUND: data/team.ts (contains telephone for Abhishek)
- FOUND: app/case-studies/[slug]/opengraph-image.tsx
- FOUND: app/case-studies/[slug]/page.tsx (contains openGraph and twitter metadata)

Commits verified:
- FOUND: e002254 (feat(05-01): migrate JSON-LD)
- FOUND: 6233e63 (feat(05-01): add dynamic OG images)

TypeScript: npx tsc --noEmit passes with zero errors.
