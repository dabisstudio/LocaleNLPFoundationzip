# LocaleNLP Foundation — Project Reference

## Project Overview
Pan-African non-profit civic web application for language equity, digital sovereignty, and inclusive AI for 2,000+ African languages.

**Current visual theme:** Monumental Institutional — light alabaster backgrounds, Trust Navy `#0A1931`, Sovereign Ochre `#D95C14` accent.

**Performance targets:** LCP < 2.5s on Africa mobile baseline; WCAG 2.1 AA throughout.

## Tech Stack
- **Framework:** Next.js 13.5.1 (App Router)
- **Styling:** Tailwind CSS + custom design tokens (`tailwind.config.ts`)
- **Database:** Supabase (PostgreSQL via `@supabase/supabase-js`)
- **Animations:** Framer Motion v12, GSAP + ScrollTrigger, Three.js (particles)
- **Fonts:** Space Grotesk (display), JetBrains Mono (mono)
- **Language:** TypeScript
- **Package manager:** npm (workspace root: `LocaleNLP_Foundation/`)

## Running the App
```
cd LocaleNLP_Foundation && npm run dev
```
Serves on port 5000.

## Design System (Monumental Institutional)

### Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `brand-deep` / `base-stone` | `#F5F5F3` | Page backgrounds (stone) |
| `brand-surface` / `base-pure` | `#FFFFFF` | Card surfaces (pure white) |
| `base-paper` | `#FAFAFA` | Alternating section backgrounds |
| `accent-ochre` | `#D95C14` | Primary accent (Sovereign Ochre) |
| `accent-navy` | `#0A1931` | Secondary accent (Trust Navy) |
| `accent-emerald` | `#0F763D` | Validation / success |
| `accent-clay` | `#E07A5F` | Error / urgent |
| `accent-cyan` | `#00E5FF` | Legacy (kept for backward compat) |
| `ink-monument` / `text-primary` | `#0C0C0C` | Headings / primary text |
| `ink-steel` / `text-secondary` | `#4A4A56` | Body / secondary text |
| `ink-muted` / `text-tertiary` | `#8C8C9A` | Muted / metadata |

### Footer
Footer stays intentionally **dark** (`#0A1931` / Trust Navy) with inline styles for light text.

### Easing
- `ease-apple-ease`: `cubic-bezier(0.16, 1, 0.3, 1)`

### Glass Utilities
```css
.glass-panel { background: #FFFFFF; border: 1px solid rgba(12,12,12,0.1); }
.glass-card  { background: #FFFFFF; border: 1px solid rgba(12,12,12,0.1); border-radius: 12px; }
.dark-panel  { background: #0A1931; } /* For terminal/code blocks */
```

## Key Files
| File | Purpose |
|------|---------|
| `LocaleNLP_Foundation/tailwind.config.ts` | Full Monumental token set |
| `LocaleNLP_Foundation/app/globals.css` | Global CSS + light theme utilities |
| `LocaleNLP_Foundation/components/layout/Navigation.tsx` | Alabaster top bar |
| `LocaleNLP_Foundation/components/layout/Footer.tsx` | Dark anchor (stays navy) |
| `LocaleNLP_Foundation/components/ui/glow-button.tsx` | Ochre primary, navy ghost |
| `LocaleNLP_Foundation/lib/i18n/en.json` | ~750-key English dictionary |
| `LocaleNLP_Foundation/lib/supabase.ts` | Supabase client + types |

## Supabase
- **Project ref:** `clfdzjguczgiuwaljpbg`
- **Tables:** `contributor_signups`, `language_bounties` (8 rows seeded)
- **Auth:** Service role key via `SUPABASE_SERVICE_ROLE_KEY`; anon key via `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## i18n
- `useTranslation()` from `lib/i18n/TranslationContext.tsx`
- `t(key, fallback?)` usage throughout
- Arabic triggers `dir="rtl"` on the document
- Supported: EN, FR, AR, SW

## Pages
- `/` — Home (hero + problem + programs + metrics + map + partners + CTA)
- `/about` — Mission, values, team, milestones
- `/programs` — Program index + `/programs/[slug]` detail
- `/technology` — Architecture, API sandbox, NLP tools, escrow
- `/bounties` — Language data bounty board
- `/impact` — Impact metrics, case studies, + `/impact/[slug]`
- `/insights` — Research publications and stories
- `/vitality` — Digital Language Vitality Index explorer
- `/data-pact` — Data ethics and contributor tiers
- `/get-involved` — Contributor stepper + contact
- `/donate` — Donation calculator and giving tiers
- `/manifesto` — Founder manifesto (navy hero, light article)
- `/ethics` — AI ethics framework and governance
- `/status` — Live service status monitor
- `/supporter/[id]` — Supporter profile + certificate
