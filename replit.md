# LocaleNLP Foundation

## Project Overview

LocaleNLP Foundation is a Pan-African non-profit public-facing civic web application. Its mission is language equity, digital sovereignty, and inclusive AI — building NLP technology for over 2,000 African and Indigenous languages. The site acts as a public institution interface, not a marketing site.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 13.5 (App Router) |
| Language | TypeScript 5.2 |
| Styling | Tailwind CSS 3.3 + CSS variables / design tokens |
| UI Primitives | Radix UI (via shadcn/ui pattern) |
| Database / Auth | Supabase (PostgreSQL + RLS) |
| Fonts | Space Grotesk (display/heading) + Inter (body) + JetBrains Mono (metadata/numbers) |
| Animation (planned) | GSAP (primary), Framer Motion (micro), Lottie, Three.js |
| Deployment | Netlify (via `netlify.toml` + `@netlify/plugin-nextjs`) |

## Folder Structure

```
LocaleNLP_Foundation/       ← root of the Next.js project
├── app/                    ← App Router pages
│   ├── layout.tsx          ← Root layout (fonts, metadata)
│   ├── page.tsx            ← Home page (assembles home sections)
│   ├── about/
│   ├── programs/[slug]/    ← Dynamic program detail pages
│   ├── impact/
│   ├── insights/
│   ├── technology/
│   ├── get-involved/
│   └── donate/
├── components/
│   ├── home/               ← Section components for the home page
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── ProgramsSection.tsx
│   │   ├── ImpactMapSection.tsx
│   │   ├── MetricsSection.tsx
│   │   ├── PartnersSection.tsx
│   │   └── CTASection.tsx
│   ├── layout/             ← Navigation.tsx, Footer.tsx
│   └── ui/                 ← Radix-based atomic components (button, card, etc.)
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── supabase.ts         ← Supabase client + all TypeScript types
│   └── utils.ts            ← clsx/tailwind-merge utility
├── supabase/
│   └── migrations/         ← DB schema migrations
├── package.json
├── next.config.js          ← eslint ignored on build, images unoptimized
├── tailwind.config.ts
└── .env                    ← Comment/template only; no raw keys (credentials are in Replit Secrets)
```

## Running the App

The dev server runs on **port 5000** via the "Start application" workflow:

```
cd LocaleNLP_Foundation && npm run dev
# script: next dev -p 5000
```

## Environment Variables

| Key | Expected format | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...` or `eyJ...` | Supabase anonymous public key |

Both are stored as Replit Secrets (not in `.env`). The `LocaleNLP_Foundation/.env` file now contains only a comment pointing to the Secrets panel.

> **Note:** If the Supabase client shows a warning about an invalid URL, check that the two secrets are not swapped — `NEXT_PUBLIC_SUPABASE_URL` must be the `https://` URL and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be the key value.

## Supabase Data Models

Defined in `lib/supabase.ts`:
- `Country` — African countries with lat/lng for the impact globe
- `Language` — African languages with speaker count, audio sample
- `Program` — Foundation programs (with slug for dynamic routing)
- `ImpactMetric` — Stats shown on the metrics section
- `CaseStudy` — Stories / case studies linked to countries and programs
- `TeamMember` — Team/advisor profiles
- `Partner` — Partner organizations with logos
- `Publication` — Research papers and publications
- `ContactSubmission` — Contact form submissions

## Design System — "Earth Meets Compute" (AUI.io × Circula)

### Brand Palette
| Token | Value | Usage |
|---|---|---|
| `brand.deep` / `midnight-900` | `#04040A` | Primary page background |
| `brand.surface` / `midnight-800` | `#09090E` | Elevated card backgrounds |
| `brand.elevated` | `#12121A` | Card hover/active state |
| `accent-ochre` | `#F5A623` | Primary actions, CTA, glows |
| `accent-clay` | `#E07A5F` | Human/community accent |
| `accent-cyan` | `#00E5FF` | Data/API/technology accent |
| `text-secondary` | `#8F8F9D` | Body copy, descriptions |
| `text-tertiary` | `#52525B` | Metadata, timestamps |

### Typography
- **`font-display` / `font-sora`** → Space Grotesk — all headings
- **`font-sans` / `font-inter`** → Inter — body copy
- **`font-mono`** → JetBrains Mono — numbers, labels, metadata

### Key Component Classes
- `.glass-panel` — `bg #09090E`, `border rgba(255,255,255,0.08)`, `backdrop-blur-12`, `shadow rgba(0,0,0,0.5)`
- `.glass-card` — same recipe with `border-radius: 0.75rem`
- `.btn-primary` — white bg, dark text, ochre glow shadow on hover
- `.btn-secondary` — glass-panel style
- `.stat-number` — JetBrains Mono, `text-accent-ochre`
- `.text-gradient` — ochre → clay → cyan gradient across text
- `.grid-lines` — subtle 60px grid texture overlay

### New UI Components
- `SpotlightCard` — radial ochre cursor-spotlight overlay on hover
- `MonoLabel` — bracket-format status tag: `[ LABEL // STATUS ]`
- `GlowButton` — primary (white/ochre-glow) or ghost (glass-panel) variant with ArrowRight

### Design & Motion Principles (from PRDs)

- **Calm Motion**: No bouncing, no aggressive easing. `ease-apple-ease` = `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Performance Budget**: LCP < 2.5s (Africa mobile baseline), total page JS < 500kb.
- **Accessibility**: WCAG 2.1 AA, `prefers-reduced-motion` supported everywhere.
- **Rendering**: Server Components by default; Client Components only for GSAP, Lottie, Three.js.
- **Three.js Globe**: One instance per page, lazy-loaded, no zoom/drag, static fallback.

## Key Conventions

- All motion tokens live in CSS variables (`--motion-fast: 0.15s`, etc.)
- Components must have all five interaction states: default, hover, focus, active, disabled
- No hardcoded colors — always use design token variables
- GSAP timelines are canonical (defined in Frontend PRD §12); deviations need design review
