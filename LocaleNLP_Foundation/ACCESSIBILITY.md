# Accessibility Audit — WCAG 2.1 AA

## Audit Date
March 2026

## Colour Contrast (WCAG 1.4.3 — minimum 4.5:1 normal text, 3:1 large text)

All pairings verified against `#04040A` (bg) and `#09090E` (surface):

| Token | Hex | vs #09090E | vs #04040A | Pass AA? |
|---|---|---|---|---|
| `text-primary` | `#FAFAFA` | 19.03 : 1 | 19.47 : 1 | Yes |
| `text-secondary` | `#8F8F9D` | 6.23 : 1 | 6.41 : 1 | Yes |
| `text-tertiary` | `#787890` | 4.62 : 1 | 4.76 : 1 | Yes (upgraded from #52525B which was 2.57 : 1) |
| `accent-ochre` | `#F5A623` | 10.09 : 1 | 10.34 : 1 | Yes |
| `accent-cyan` | `#00E5FF` | 13.29 : 1 | 13.64 : 1 | Yes |
| `accent-clay` | `#E07A5F` | 6.93 : 1 | 7.11 : 1 | Yes |

## Focus Management (WCAG 2.4.7 — visible focus)

- Global `focus-visible` ring set in `globals.css`: 2px solid `#00E5FF` (accent-cyan), 2px offset
- `focus:not(:focus-visible)` hides ring for mouse users, preserving keyboard visibility
- All interactive elements verified: Navigation triggers, mega-menu links, mobile accordion,
  LanguageSwitcher buttons, GlowButton, Footer links, BountyCard, PersonaSwitcher tabs,
  form inputs, social link icons

## Keyboard Navigation (WCAG 2.1.1)

- Escape closes Navigation mega-menu (returns focus to trigger)
- Escape closes LanguageSwitcher dropdown (returns focus to trigger)
- All navigation links and buttons reachable via Tab
- Skip-to-content link added in `app/layout.tsx` (visible on focus)
- `aria-expanded` on all disclosure buttons
- `role="listbox"` / `role="option"` / `aria-selected` on language picker
- `role="tablist"` / `role="tab"` / `role="tabpanel"` on PersonaSwitcher

## Images and Media (WCAG 1.1.1 — text alternatives)

- Logo in Navigation: `alt="LocaleNLP Foundation"` (i18n-aware via `t('a11y.logo_home')`)
- Logo in Footer: `alt="LocaleNLP Foundation"` (i18n-aware)
- All decorative SVG icons: `aria-hidden="true"`
- All chart/graph decorative elements: `aria-hidden="true"`
- Progress bars in BountyCard have `aria-label` with percentage

## ARIA Labelling (WCAG 4.1.2)

- `<nav>` elements have `aria-label` ("Main navigation", "Mobile navigation")
- Mega menu panel: `role="region"` + `aria-label` naming the section
- LanguageSwitcher: `aria-haspopup="listbox"`, `aria-expanded`, `aria-label`
- Mobile menu button: `aria-expanded` + dynamic `aria-label` (open/close)
- PersonaSwitcher: full ARIA tab pattern
- Form inputs: all have associated `<label>` elements
- Social links: descriptive `aria-label` on icon-only anchors

## Internationalisation (WCAG 3.1.1 — language of page)

- `<html lang>` updated dynamically by `TranslationProvider` to match selected locale
- `<html dir>` set to `rtl` when Arabic is selected
- Translation context provides `t(key)` across Navigation, Footer, LanguageSwitcher,
  HeroSection, all page headers (via TranslatedPageHeader), MicroCommitForm,
  NewsletterForm, and PersonaSwitcher (all user-facing strings translated)
- 4 locale JSON files: en, fr, ar, sw (~320 keys each)

## Reduced Motion (WCAG 2.3.3)

- `@media (prefers-reduced-motion: reduce)` in `globals.css` disables all animations
- Framer Motion components use `useReducedMotion()` hook

## Out of Scope

- WCAG 2.2 or AAA compliance
- Full URL-based i18n routing (future deep refactor)
- Automated Lighthouse CI (manual audit only)
