# Project Structure

**Analysis Date:** 2026-03-31

## Directory Layout

```
companyportfolio/
├── app/                        # Next.js App Router (single page)
│   ├── globals.css             # Global styles, CSS vars, utility classes, animations
│   ├── layout.tsx              # Root layout: fonts, metadata, providers, GTM, JSON-LD
│   ├── page.tsx                # Home page: composes all section components
│   ├── manifest.ts             # PWA manifest generation
│   ├── robots.ts               # robots.txt generation
│   └── sitemap.ts              # sitemap.xml generation
├── components/                 # React components
│   ├── About.tsx               # About section (skills, education, stats)
│   ├── Analytics.tsx            # Analytics provider + event tracking utilities
│   ├── Contact.tsx             # Contact form + links + footer
│   ├── Experience.tsx          # Work history timeline
│   ├── Hero.tsx                # Landing hero (name animation, scramble, marquee)
│   ├── Navigation.tsx          # Fixed navbar with scroll-spy + mobile menu
│   ├── Projects.tsx            # Project showcase with hover effects
│   ├── SmoothScrollProvider.tsx # Lenis smooth scroll + GSAP integration
│   └── ui/                     # shadcn/ui component library (~49 components)
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── alert-dialog.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── toast.tsx
│       ├── tooltip.tsx
│       └── ... (49 total Radix-based primitives)
├── config/                     # Application configuration
│   ├── analytics.ts            # Analytics tracking IDs and enable/disable flag
│   └── design-system.ts        # Color palette + typography tokens as TS constants
├── hooks/                      # Custom React hooks
│   └── use-toast.ts            # Toast notification state management (shadcn pattern)
├── lib/                        # Shared utilities
│   └── utils.ts                # cn() class merge utility (clsx + tailwind-merge)
├── public/                     # Static assets
│   ├── Flagfies.otf            # Custom display font (OTF)
│   ├── Flagfies.ttf            # Custom display font (TTF)
│   ├── og-image.png            # OpenGraph social share image
│   └── fonts/                  # JetBrains Mono font files
│       ├── ttf/                # TTF format files
│       ├── variable/           # Variable font files
│       └── webfonts/           # Web font files (woff/woff2)
├── .eslintrc.json              # ESLint config (extends next/core-web-vitals)
├── .npmrc                      # npm config (legacy-peer-deps=true)
├── components.json             # shadcn/ui CLI configuration
├── next.config.js              # Next.js config (eslint ignore, unoptimized images)
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS with @tailwindcss/postcss plugin
├── tailwind.config.ts          # Tailwind config (shadcn theme, custom animations)
└── tsconfig.json               # TypeScript config (strict, path aliases)
```

## Directory Purposes

**`app/`:**
- Purpose: Next.js App Router entry point
- Contains: Root layout, single page, SEO files (sitemap, robots, manifest), global CSS
- Key files: `layout.tsx` (root shell), `page.tsx` (home page), `globals.css` (all styles)

**`components/`:**
- Purpose: All React components for the portfolio
- Contains: Section components (Hero, About, Experience, Projects, Contact), provider components (Analytics, SmoothScrollProvider), and the shadcn/ui library
- Key files: `Hero.tsx` (largest at ~240 lines), `Navigation.tsx` (scroll-spy logic)

**`components/ui/`:**
- Purpose: Pre-built accessible UI primitives from shadcn/ui
- Contains: 49 Radix UI-based component wrappers styled with Tailwind
- Key files: `button.tsx`, `toast.tsx`, `dialog.tsx` (none currently used by portfolio sections)
- Generated: Yes, via `npx shadcn-ui@latest add [component]`
- Committed: Yes

**`config/`:**
- Purpose: Application-level configuration constants
- Contains: Analytics tracking configuration, design system color/typography tokens
- Key files: `analytics.ts` (tracking IDs), `design-system.ts` (color palette)

**`hooks/`:**
- Purpose: Custom React hooks
- Contains: Only the shadcn toast hook
- Key files: `use-toast.ts` (currently unused by portfolio)

**`lib/`:**
- Purpose: Shared utility functions
- Contains: Single `cn()` utility for Tailwind class merging
- Key files: `utils.ts`

**`public/`:**
- Purpose: Static assets served at root path
- Contains: Custom fonts (Flagfies display font, JetBrains Mono), OG image
- Key files: `Flagfies.otf`, `Flagfies.ttf`, `og-image.png`

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout -- fonts, metadata, providers, GTM
- `app/page.tsx`: Home page -- composes Navigation + all sections
- `app/globals.css`: All CSS -- Tailwind import, custom properties, utility classes, keyframes

**Configuration:**
- `next.config.js`: Next.js build config
- `tailwind.config.ts`: Tailwind theme (shadcn colors, custom keyframes)
- `tsconfig.json`: TypeScript (strict mode, `@/*` path alias)
- `components.json`: shadcn/ui CLI settings
- `postcss.config.js`: PostCSS plugins
- `.eslintrc.json`: ESLint rules (next/core-web-vitals)

**Core Section Components:**
- `components/Hero.tsx`: Hero section with GSAP character animation, scramble text, parallax blobs, stats counters, tech marquee
- `components/About.tsx`: About section with word-by-word scroll reveal, skill groups, education, animated stats
- `components/Experience.tsx`: Experience section with inline work history data, alternating slide animations
- `components/Projects.tsx`: Projects section with inline project data, hover scramble effect, expandable details
- `components/Contact.tsx`: Contact section with mailto form, contact links, and page footer

**Provider/Wrapper Components:**
- `components/SmoothScrollProvider.tsx`: Lenis smooth scroll initialization + GSAP ScrollTrigger connection
- `components/Analytics.tsx`: Conditional analytics script loader + `trackEvent()`/`trackPageView()` utilities

**Design System:**
- `app/globals.css`: CSS custom properties (`--violet`, `--pink`, `--cyan`, `--lime`, etc.), utility classes (`.heading-brutal`, `.pill`, `.input-dark`, `.magnetic-btn`), animations, accessibility rules
- `config/design-system.ts`: TypeScript color/typography tokens (mirrors CSS vars)

**Utilities:**
- `lib/utils.ts`: `cn()` function -- `twMerge(clsx(...inputs))`
- `hooks/use-toast.ts`: Toast state management reducer (shadcn boilerplate)

**SEO:**
- `app/sitemap.ts`: Generates sitemap.xml
- `app/robots.ts`: Generates robots.txt
- `app/manifest.ts`: Generates PWA manifest.json

## Naming Conventions

**Files:**
- Section components: `PascalCase.tsx` (e.g., `Hero.tsx`, `About.tsx`, `Contact.tsx`)
- UI components: `kebab-case.tsx` (e.g., `alert-dialog.tsx`, `hover-card.tsx`) -- shadcn convention
- Config files: `kebab-case.ts` (e.g., `design-system.ts`, `analytics.ts`)
- Hooks: `use-kebab-case.ts` (e.g., `use-toast.ts`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)
- Next.js special files: `lowercase.tsx` (e.g., `page.tsx`, `layout.tsx`)

**Directories:**
- All lowercase: `app/`, `components/`, `config/`, `hooks/`, `lib/`, `public/`

**Exports:**
- Section components: `const ComponentName = () => { ... }; export default ComponentName;`
- UI components: `const ComponentName = React.forwardRef(...); export { ComponentName };` (named exports)
- Config: `export const configObject = { ... };`
- Utilities: `export function functionName(...) { ... }`

## Where to Add New Code

**New Page Section:**
- Create component: `components/SectionName.tsx`
- Follow the existing GSAP animation pattern (see ARCHITECTURE.md "Key Abstractions")
- Add `'use client'` directive at top
- Import and place in `app/page.tsx` in rendering order
- Add navigation entry in `components/Navigation.tsx` `items` array
- Add section number label (e.g., `05 / SectionName`)

**New Page Route:**
- Create directory: `app/route-name/page.tsx`
- No existing sub-routes to reference as pattern -- follow Next.js App Router conventions
- May need to extract shared layout elements from current `app/layout.tsx`

**New UI Component (shadcn):**
- Run: `npx shadcn-ui@latest add [component-name]`
- Auto-placed in: `components/ui/[component-name].tsx`
- Uses `@/lib/utils` for `cn()` function

**New Custom Component:**
- Place in: `components/ComponentName.tsx`
- Use PascalCase filename
- Import design tokens from `config/design-system.ts` or use CSS variables directly

**New Custom Hook:**
- Place in: `hooks/use-hook-name.ts`
- Use `use-kebab-case` naming
- Add `'use client'` directive

**New Utility Function:**
- Add to: `lib/utils.ts` (if general-purpose)
- Or create: `lib/specific-utils.ts` for domain-specific utilities

**New Configuration:**
- Place in: `config/config-name.ts`
- Export typed configuration object
- Reference env vars as `process.env.NEXT_PUBLIC_*` for client-accessible values

**New Static Assets:**
- Place in: `public/` (served at root URL path)
- Fonts go in: `public/fonts/`
- Images: directly in `public/` or create `public/images/`

## Special Directories

**`components/ui/`:**
- Purpose: shadcn/ui component library
- Generated: Yes, via shadcn CLI
- Committed: Yes
- Modification: Safe to customize individual components, but re-running CLI may overwrite changes

**`.next/`:**
- Purpose: Next.js build output and cache
- Generated: Yes, by `next build` / `next dev`
- Committed: No (in `.gitignore`)

**`.planning/`:**
- Purpose: Project planning and analysis documents
- Generated: By tooling
- Committed: Varies

**`.claude/`:**
- Purpose: Claude AI assistant configuration
- Contains: `settings.local.json`
- Committed: Yes

**`.qodo/`:**
- Purpose: Qodo AI tool configuration
- Contains: `agents/`, `workflows/` directories
- Committed: Likely yes

---

*Structure analysis: 2026-03-31*
