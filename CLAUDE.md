<!-- GSD:project-start source:PROJECT.md -->
## Project

**Dev Studio Portfolio**

A two-person dev startup studio website for Abhishek Vaghela and Vatsal Zinzuvadiya — two full-stack developers who've been building together since their time at Screenplay and X-Byte Solutions (both GEC Modasa alumni). The site positions them as a tech partner team that takes on projects, builds MVPs, and scales them up. It features deep technical case studies showcasing their architecture decisions (Redis + OpenSearch optimizations, DynamoDB cost reduction, MVP-to-scale methodology) alongside a project portfolio.

**Core Value:** Two developers who've shipped together prove they can ship for you — the case studies are the proof, the site is the pitch.

### Constraints

- **Tech stack**: Must stay on Next.js + React + Tailwind + GSAP — existing proven stack
- **Hosting**: Vercel deployment (existing infrastructure)
- **Design**: Keep existing dark aesthetic — improve, don't replace
- **Content**: All data remains hardcoded in components (no CMS needed at this scale)
- **URLs**: Every project link must be verified as live before being added to the site
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.6.3 - All application code (`app/`, `components/`, `lib/`, `config/`, `hooks/`)
- CSS - Custom design system and animations (`app/globals.css`)
- JavaScript - Configuration files (`next.config.js`, `postcss.config.js`)
## Runtime
- Node.js (version not pinned; no `.nvmrc` or `engines` field in `package.json`)
- npm (lockfile: `package-lock.json` present)
## Frameworks
- Next.js 15.5.12 - Full-stack React framework (App Router)
- React 19.0.0 - UI library
- React DOM 19.0.0 - DOM rendering
- GSAP 3.14.2 - Scroll-triggered animations, parallax, timelines (`components/Hero.tsx`, `components/About.tsx`, `components/Experience.tsx`, `components/Projects.tsx`, `components/Contact.tsx`)
- Lenis 1.3.18 - Smooth scrolling (`components/SmoothScrollProvider.tsx`)
- shadcn/ui (default style, RSC-enabled) - Component library installed via CLI
- Tailwind CSS 4.0.0 - Utility-first CSS framework
- @tailwindcss/postcss 4.0.0 - PostCSS integration
- tw-animate-css 1.2.0 - Tailwind animation utilities
- class-variance-authority 0.7.1 - Component variant management
- tailwind-merge 2.6.1 - Tailwind class deduplication
- clsx 2.1.1 - Conditional class joining
- react-hook-form 7.71.2 - Form state management
- @hookform/resolvers 3.10.0 - Schema validation integration
- zod 3.25.76 - Runtime schema validation
- Next.js built-in (SWC compiler) - Bundler/transpiler
- @next/swc-wasm-nodejs 15.5.12 - WASM-based SWC for environments without native binaries
- PostCSS 8.4.47 - CSS processing
- ESLint 8.57.1 - Linting (config: `.eslintrc.json`)
- eslint-config-next 15.5.12 - Next.js ESLint rules (extends `next/core-web-vitals`)
- None detected - No test framework or test files found
## Key Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.5.12 | App framework (App Router) |
| `react` / `react-dom` | 19.0.0 | UI rendering |
| `gsap` | ^3.14.2 | All scroll animations and page transitions |
| `lenis` | ^1.3.18 | Smooth scroll provider wrapping entire app |
| `tailwindcss` | ^4.0.0 | Styling system |
| `typescript` | 5.6.3 | Type safety |
| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-*` | Various | Accessible headless primitives (25+ packages) |
| `lucide-react` | ^0.577.0 | Icon library |
| `cmdk` | ^1.1.1 | Command menu component |
| `sonner` | ^1.7.4 | Toast notifications |
| `vaul` | ^0.9.9 | Drawer component |
| `embla-carousel-react` | ^8.6.0 | Carousel/slider |
| `recharts` | ^2.15.4 | Charts (installed but usage not observed in main pages) |
| `react-resizable-panels` | ^2.1.9 | Resizable panel layouts |
| `react-day-picker` | ^8.10.1 | Date picker |
| `input-otp` | ^1.4.2 | OTP input component |
| `date-fns` | ^3.6.0 | Date utility functions |
| Package | Version | Purpose |
|---------|---------|---------|
| `next-themes` | ^0.4.6 | Theme management (installed but dark-mode-only currently) |
| `@supabase/supabase-js` | ^2.98.0 | Supabase client SDK (listed in `package.json` but NOT imported anywhere in source code) |
## Configuration
- Config: `tsconfig.json`
- Target: ES5
- Module: ESNext with bundler resolution
- Strict mode: enabled
- Path alias: `@/*` maps to project root (`"./*"`)
- Config: `tailwind.config.ts`
- Dark mode: class-based (`darkMode: 'class'`)
- CSS variables: enabled (shadcn theme tokens in `:root` of `app/globals.css`)
- Custom colors: Design system uses CSS custom properties (`--violet`, `--pink`, `--cyan`, `--lime`, `--orange`, `--yellow`)
- PostCSS: `postcss.config.js` using `@tailwindcss/postcss`
- Config: `next.config.js`
- ESLint ignored during builds (`eslint.ignoreDuringBuilds: true`)
- Images unoptimized (`images: { unoptimized: true }`)
- No custom webpack config
- Google Fonts: Inter (body), JetBrains Mono (monospace) - loaded via `next/font/google`
- Local Font: Flagfies (display/decorative) - loaded from `public/Flagfies.otf` and `public/Flagfies.ttf` via `next/font/local`
- Additional local fonts in `public/fonts/` directory (ttf, variable, webfonts subdirectories)
- Centralized in `config/design-system.ts` - color palette and typography definitions
- CSS custom properties defined in `app/globals.css` `:root`
- Design theme: "Gen Z Electric" dark palette with violet/pink/cyan/lime accents on near-black backgrounds
## Platform Requirements
- Node.js (no specific version constraint detected)
- npm (package-lock.json used)
- Run: `npm run dev` (Next.js dev server)
- Type check: `npm run typecheck` (`tsc --noEmit`)
- Lint: `npm run lint` (`next lint`)
- Build: `npm run build` (`next build`)
- Start: `npm start` (`next start`)
- Deployment target: Vercel (inferred from `.gitignore` containing `.vercel` entry, and Next.js framework choice)
- Domain: `https://abhishekvaghela.dev`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Single-route portfolio site with all content rendered on one page (`app/page.tsx`)
- Section-based component architecture: Hero, About, Experience, Projects, Contact
- All page sections are client components (`'use client'`) due to heavy GSAP animation usage
- Root layout provides global providers (smooth scroll, analytics) wrapping all content
- No API routes, no database queries, no server-side data fetching -- purely static/client-rendered
- Data is hardcoded inline within components (no CMS, no external data source)
## Component Map
- Loads fonts (Inter via Google Fonts, JetBrains Mono via Google Fonts, Flagfies via local file)
- Injects Google Tag Manager script
- Embeds JSON-LD structured data for SEO
- Wraps children in `SmoothScrollProvider` > `AnalyticsProvider`
- Exports `metadata` and `viewport` for Next.js head management
- Composes all section components in order: Navigation > Hero > About > Experience > Projects > Contact
- No data fetching, no props passed -- each section is self-contained
| Component | File | Purpose | State |
|-----------|------|---------|-------|
| Navigation | `components/Navigation.tsx` | Fixed nav bar with scroll-spy, mobile hamburger menu | scroll position, active section, menu open/close |
| Hero | `components/Hero.tsx` | Landing section with name animation, scramble text effect, stats counters, marquee | counter animations, mouse parallax |
| About | `components/About.tsx` | Bio, stats, education, skill pills with word-by-word scroll reveal | counter animations |
| Experience | `components/Experience.tsx` | Timeline of work history with alternating slide animations | none (data inline) |
| Projects | `components/Projects.tsx` | Project listing with hover scramble effect and expandable details | none (data inline) |
| Contact | `components/Contact.tsx` | Contact form (mailto), contact links, footer | form field state |
| Component | File | Purpose |
|-----------|------|---------|
| SmoothScrollProvider | `components/SmoothScrollProvider.tsx` | Initializes Lenis smooth scrolling, connects to GSAP ScrollTrigger |
| AnalyticsProvider | `components/Analytics.tsx` | Conditionally loads GA4, Meta Pixel, LinkedIn Insight scripts |
- Full shadcn/ui installation (~49 components) built on Radix UI primitives
- Currently unused by the portfolio page sections -- these components are available but not imported by any section component
- Configured via `components.json` for shadcn CLI integration
## Data Flow
- No global state management library (no Redux, no Zustand, no Context for app state)
- Each component manages its own local state via `useState`
- Animation state managed entirely by GSAP timelines (imperative, ref-based)
- Scroll state tracked by GSAP ScrollTrigger and IntersectionObserver
- Toast state managed by a custom reducer pattern in `hooks/use-toast.ts` (shadcn pattern, currently unused)
## Routing
- `/` -- `app/page.tsx` (the only page)
- No other pages exist -- no sub-routes, no dynamic routes, no API routes
- Hash-based anchor links (`#about`, `#experience`, `#projects`, `#contact`)
- Navigation component uses scroll-spy via `IntersectionObserver`-style logic in scroll handler
- Smooth scrolling provided by Lenis
- `/sitemap.xml` -- `app/sitemap.ts`
- `/robots.txt` -- `app/robots.ts`
- `/manifest.json` -- `app/manifest.ts`
## Key Abstractions
```typescript
```
- CSS custom properties define a dark theme palette (violet, pink, cyan, lime accent colors)
- Utility classes: `.heading-brutal`, `.heading-lg`, `.text-body`, `.dev-mono`, `.pill`, `.input-dark`, `.magnetic-btn`
- Design tokens also exported as TypeScript constants in `config/design-system.ts`
- `cn()` utility from `lib/utils.ts` merges Tailwind classes via `clsx` + `tailwind-merge`
- Components use `class-variance-authority` for variant-based styling
- Radix UI primitives provide accessible, unstyled component foundations
## Entry Points
- Location: `app/layout.tsx` (root layout)
- Triggers: Next.js App Router renders this as the shell for all routes
- Responsibilities: Font loading, metadata, GTM, JSON-LD, provider wrapping
- Location: `app/page.tsx`
- Triggers: Route `/` resolves to this file
- Responsibilities: Composes all section components in rendering order
- Location: `app/globals.css`
- Triggers: Imported by `app/layout.tsx`
- Responsibilities: Tailwind import, CSS custom properties, custom utility classes, animations, accessibility
## Rendering Strategy
- `app/layout.tsx` and `app/page.tsx` are Server Components (no `'use client'` directive)
- All section components (`Hero.tsx`, `About.tsx`, etc.) are Client Components (`'use client'`)
- This means: HTML is server-rendered for SEO and LCP, then hydrated on client for interactivity
- GSAP animations use `gsap.from()` pattern so elements are visible by default (good for LCP) and animate FROM hidden states on hydration
- `next.config.js` does not configure static export
- No `generateStaticParams`, no `revalidate` settings
- Images are unoptimized (`images: { unoptimized: true }` in `next.config.js`)
- `content-visibility: auto` on sections (`.content-auto` class) for rendering performance
- `@media (prefers-reduced-motion: reduce)` disables all animations for accessibility
- No CSS `blur()` on blobs (explicitly avoided per code comments as "expensive paint")
## Error Handling
- No `error.tsx` or `not-found.tsx` in the app directory
- GSAP operations guarded by null checks on refs (`if (!ref.current) return`)
- `typeof window !== 'undefined'` guards for SSR-safe plugin registration
- No form validation beyond HTML `required` attribute
- No network error handling (no API calls to fail)
## Cross-Cutting Concerns
- Comprehensive `metadata` export in `app/layout.tsx` (OpenGraph, Twitter Cards, robots directives)
- JSON-LD structured data (Person schema)
- `sitemap.ts`, `robots.ts`, `manifest.ts` for search engine and PWA support
- Semantic HTML with ARIA labels, roles, and `sr-only` text throughout
- Skip-to-content link
- ARIA labels on all interactive elements
- `prefers-reduced-motion` media query disables animations
- Focus-visible styles defined globally
- Semantic landmark roles (`banner`, `contentinfo`, `navigation`, `menubar`)
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
