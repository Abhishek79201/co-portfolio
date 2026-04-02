# Technology Stack

**Analysis Date:** 2026-03-31

## Languages

**Primary:**
- TypeScript 5.6.3 - All application code (`app/`, `components/`, `lib/`, `config/`, `hooks/`)
- CSS - Custom design system and animations (`app/globals.css`)

**Secondary:**
- JavaScript - Configuration files (`next.config.js`, `postcss.config.js`)

## Runtime

**Environment:**
- Node.js (version not pinned; no `.nvmrc` or `engines` field in `package.json`)

**Package Manager:**
- npm (lockfile: `package-lock.json` present)

## Frameworks

**Core:**
- Next.js 15.5.12 - Full-stack React framework (App Router)
- React 19.0.0 - UI library
- React DOM 19.0.0 - DOM rendering

**Animation:**
- GSAP 3.14.2 - Scroll-triggered animations, parallax, timelines (`components/Hero.tsx`, `components/About.tsx`, `components/Experience.tsx`, `components/Projects.tsx`, `components/Contact.tsx`)
- Lenis 1.3.18 - Smooth scrolling (`components/SmoothScrollProvider.tsx`)

**UI Component System:**
- shadcn/ui (default style, RSC-enabled) - Component library installed via CLI
  - Config: `components.json`
  - Components: `components/ui/` (55+ UI components)
  - Radix UI primitives as foundation (accordion, dialog, dropdown-menu, tabs, tooltip, etc.)

**Styling:**
- Tailwind CSS 4.0.0 - Utility-first CSS framework
- @tailwindcss/postcss 4.0.0 - PostCSS integration
- tw-animate-css 1.2.0 - Tailwind animation utilities
- class-variance-authority 0.7.1 - Component variant management
- tailwind-merge 2.6.1 - Tailwind class deduplication
- clsx 2.1.1 - Conditional class joining

**Form Handling:**
- react-hook-form 7.71.2 - Form state management
- @hookform/resolvers 3.10.0 - Schema validation integration
- zod 3.25.76 - Runtime schema validation

**Build/Dev:**
- Next.js built-in (SWC compiler) - Bundler/transpiler
- @next/swc-wasm-nodejs 15.5.12 - WASM-based SWC for environments without native binaries
- PostCSS 8.4.47 - CSS processing

**Linting:**
- ESLint 8.57.1 - Linting (config: `.eslintrc.json`)
- eslint-config-next 15.5.12 - Next.js ESLint rules (extends `next/core-web-vitals`)

**Testing:**
- None detected - No test framework or test files found

## Key Dependencies

**Critical (core to the application):**

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 15.5.12 | App framework (App Router) |
| `react` / `react-dom` | 19.0.0 | UI rendering |
| `gsap` | ^3.14.2 | All scroll animations and page transitions |
| `lenis` | ^1.3.18 | Smooth scroll provider wrapping entire app |
| `tailwindcss` | ^4.0.0 | Styling system |
| `typescript` | 5.6.3 | Type safety |

**UI Components (shadcn/ui + Radix):**

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

**Infrastructure:**

| Package | Version | Purpose |
|---------|---------|---------|
| `next-themes` | ^0.4.6 | Theme management (installed but dark-mode-only currently) |
| `@supabase/supabase-js` | ^2.98.0 | Supabase client SDK (listed in `package.json` but NOT imported anywhere in source code) |

## Configuration

**TypeScript:**
- Config: `tsconfig.json`
- Target: ES5
- Module: ESNext with bundler resolution
- Strict mode: enabled
- Path alias: `@/*` maps to project root (`"./*"`)

**Tailwind:**
- Config: `tailwind.config.ts`
- Dark mode: class-based (`darkMode: 'class'`)
- CSS variables: enabled (shadcn theme tokens in `:root` of `app/globals.css`)
- Custom colors: Design system uses CSS custom properties (`--violet`, `--pink`, `--cyan`, `--lime`, `--orange`, `--yellow`)
- PostCSS: `postcss.config.js` using `@tailwindcss/postcss`

**Next.js:**
- Config: `next.config.js`
- ESLint ignored during builds (`eslint.ignoreDuringBuilds: true`)
- Images unoptimized (`images: { unoptimized: true }`)
- No custom webpack config

**Fonts:**
- Google Fonts: Inter (body), JetBrains Mono (monospace) - loaded via `next/font/google`
- Local Font: Flagfies (display/decorative) - loaded from `public/Flagfies.otf` and `public/Flagfies.ttf` via `next/font/local`
- Additional local fonts in `public/fonts/` directory (ttf, variable, webfonts subdirectories)

**Design System:**
- Centralized in `config/design-system.ts` - color palette and typography definitions
- CSS custom properties defined in `app/globals.css` `:root`
- Design theme: "Gen Z Electric" dark palette with violet/pink/cyan/lime accents on near-black backgrounds

## Platform Requirements

**Development:**
- Node.js (no specific version constraint detected)
- npm (package-lock.json used)
- Run: `npm run dev` (Next.js dev server)
- Type check: `npm run typecheck` (`tsc --noEmit`)
- Lint: `npm run lint` (`next lint`)

**Production:**
- Build: `npm run build` (`next build`)
- Start: `npm start` (`next start`)
- Deployment target: Vercel (inferred from `.gitignore` containing `.vercel` entry, and Next.js framework choice)
- Domain: `https://abhishekvaghela.dev`

---

*Stack analysis: 2026-03-31*
