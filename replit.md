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
| Fonts | Inter + Sora (Google Fonts via next/font) |
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
└── .env                    ← Supabase keys (also wired as Replit env vars)
```

## Running the App

The dev server runs on **port 5000** via the "Start application" workflow:

```
cd LocaleNLP_Foundation && npm run dev
# script: next dev -p 5000
```

## Environment Variables

| Key | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous public key |

Both are set as shared Replit environment variables (also present in `LocaleNLP_Foundation/.env` for local reference).

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

## Design & Motion Principles (from PRDs)

- **Calm Motion**: No bouncing, no aggressive easing. GSAP `power3.out` / `power2.out` only.
- **Performance Budget**: LCP < 2.5s (Africa mobile baseline), total page JS < 500kb.
- **Accessibility**: WCAG 2.1 AA, `prefers-reduced-motion` supported everywhere.
- **Rendering**: Server Components by default; Client Components only for GSAP, Lottie, Three.js.
- **Three.js Globe**: One instance per page, lazy-loaded, no zoom/drag, static fallback.

## Key Conventions

- All motion tokens live in CSS variables (`--motion-fast: 0.15s`, etc.)
- Components must have all five interaction states: default, hover, focus, active, disabled
- No hardcoded colors — always use design token variables
- GSAP timelines are canonical (defined in Frontend PRD §12); deviations need design review
