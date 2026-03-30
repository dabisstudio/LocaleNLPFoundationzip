# LocaleNLP Foundation — Project Reference

## Project Overview
Pan-African non-profit civic web application for language equity, digital sovereignty, and inclusive AI for 2,000+ African languages. "Earth Meets Compute" redesign (AUI.io dark authority + Circula precision).

**Performance targets:** LCP < 2.5s on Africa mobile baseline; WCAG 2.1 AA throughout.

## Tech Stack
- **Framework:** Next.js 13.5.1 (App Router)
- **Styling:** Tailwind CSS + custom design tokens
- **Database:** Supabase (PostgreSQL via `@supabase/supabase-js`)
- **Animations:** Framer Motion v12
- **Fonts:** Space Grotesk (display), JetBrains Mono (mono)
- **Language:** TypeScript
- **Package manager:** npm (workspace root: `LocaleNLP_Foundation/`)

## Running the App
```
cd LocaleNLP_Foundation && npm run dev
```
Serves on port 5000.

## Design System

### Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `brand-deep` | `#04040A` | Page backgrounds |
| `brand-surface` | `#09090E` | Card surfaces |
| `brand-elevated` | `#12121A` | Elevated elements |
| `accent-ochre` | `#F5A623` | Primary accent |
| `accent-clay` | `#E07A5F` | Secondary accent |
| `accent-cyan` | `#00E5FF` | Tertiary accent |
| `text-primary` | `#FAFAFA` | Headings / primary text |
| `text-secondary` | `#8F8F9D` | Body / secondary text |
| `text-tertiary` | `#52525B` | Muted / metadata |

### Easing
- `ease-apple-ease`: `cubic-bezier(0.16, 1, 0.3, 1)`

### Glass Spec
```css
.glass-panel { background: #09090E; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
.glass-card  { background: rgba(9,9,14,0.7); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); border-radius: 12px; }
```

### Key CSS Utilities
- `.text-gradient` — ochre → clay → cyan gradient text
- `.btn-primary`, `.btn-outline`, `.btn-secondary`
- `.stat-card`, `.stat-number`, `.stat-label`
- `.container-wide`, `.section-padding`
- `.glass-panel`, `.glass-card`

## Component Architecture

### Shared UI Components (`components/ui/`)
| Component | Type | Description |
|-----------|------|-------------|
| `GlowButton` | Client | Polymorphic CTA button (Link/a/button), `showArrow` prop |
| `MonoLabel` | Server | `[ LABEL // NUMBER // STATUS ]` format metadata label |
| `SpotlightCard` | Client | Mouse-follow radial spotlight card |
| `PageHeader` | Server | Shared page hero with MonoLabel, gradient title, subtitle, CTAs |
| `PersonaSwitcher` | Client | 4-tab persona toggle (Partner/Researcher/Developer/Speaker) |
| `ContactForm` | Client | Supabase contact submission form with success/error state |

### Layout (`components/layout/`)
- `Navigation.tsx` — Frosted glass-panel fixed nav
- `Footer.tsx`

### Homepage Sections (`components/home/`)
- `HeroSection.tsx` — Spring-stagger word animation, `#hero-canvas` slot
- `ProblemSection.tsx` — Scale-reveal + 3 glass callout cards
- `ProgramsSection.tsx` — CSS Grid bento with SpotlightCard
- `MetricsSection.tsx` — IntersectionObserver animated counters
- `PartnersSection.tsx` — CSS marquee partner logos
- `CTASection.tsx` — Glass panel + grid lines CTA

## Pages

| Route | Server/Client | Key Features |
|-------|---------------|--------------|
| `/` | Server | 6 homepage sections |
| `/about` | Server | Mission/Vision, values SpotlightCards, milestone timeline, team |
| `/programs` | Server | SpotlightCard program grid, PLACEHOLDER_PROGRAMS fallback |
| `/programs/[slug]` | Server | Program detail, problem/solution cards, CTA |
| `/technology` | Server | Model cards, static mock terminal, dataset grid, ethical AI pillars |
| `/impact` | Server | Impact metrics (static fallback), SVG Africa node map, use cases |
| `/get-involved` | Server | PersonaSwitcher (client), ContactForm (client), contact channels |
| `/insights` | Server | Publications grid, case studies grid, newsletter signup |
| `/donate` | Server | Giving tiers (SpotlightCard), monthly giving, fund allocation bars |

## Supabase
- **URL:** Configured via `NEXT_PUBLIC_SUPABASE_URL` env secret
- **Client:** `lib/supabase.ts` — strict `createClient(url, key)`, fails fast
- **Tables:** `programs`, `team_members`, `impact_metrics`, `case_studies`, `countries`, `languages`, `publications`, `contact_submissions`, `partners`
- **Status:** Schema/seed data pending (Task #6). All pages have graceful empty states.

## Patterns & Conventions
- **Server components by default** — only interactive tabs/switchers/forms use `'use client'`
- **`<main>` with `pt-24`** on all interior pages (nav is fixed, 96px height)
- **MonoLabel format:** `[ LABEL // NUMBER // STATUS ]`
- **bg-clip-text + Framer Motion fix:** Apply gradient inline styles directly to `motion.span` when `will-change: opacity` creates stacking context
- **Counter animation:** IntersectionObserver → `started` flag → RAF step with `1 - Math.pow(1 - progress, 3)` ease-out cubic
- **Supabase empty states:** All data-fetching pages show graceful empty state UI when DB returns empty

## Task History
- ✅ Task #1 — Dev environment setup
- ✅ Task #2 — Design system & component library overhaul
- ✅ Task #3 — Homepage sections rebuild (6 sections)
- ✅ Task #4 — Interior pages rebuild (8 pages + 3 shared components)
- ⏳ Task #5 — (TBD)
- ⏳ Task #6 — Database schema & seed data
