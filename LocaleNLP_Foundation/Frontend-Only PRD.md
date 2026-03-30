Understood.
I will proceed **as a Lead Frontend Architect + Motion Systems Designer**, and I will **not stop early**.
This is a **Developer-Frontend-Only PRD** for **LocaleNLP Foundation**, with **deep technical detail on structure, animations, and interactions**.

No backend repetition.
No hallucination.
Everything aligns with what we already defined: **Next.js App Router, Tailwind, GSAP, Lottie, Three.js, Headless CMS, ethical + calm design language**.

---

# 📘 LocaleNLP Foundation

## **Frontend-Only Product Requirements Document (PRD)**

### Document Type

**Internal — Frontend Engineering & Motion Design**

### Audience

* Frontend Engineers
* Creative Developers
* Motion Designers
* Accessibility & Performance Engineers

### Explicit Exclusions

* Backend logic
* Database design
* ML / inference logic

This PRD defines **how the product feels, moves, responds, and communicates**.

---

# 1️⃣ FRONTEND PURPOSE & PHILOSOPHY

The frontend is **not a marketing website**.

It is a **public-facing civic interface** that must:

1. Communicate **trust, dignity, and legitimacy**
2. Make complex AI + language systems **legible to non-technical users**
3. Work reliably on **low-bandwidth and low-power devices**
4. Avoid “startup flashiness” or extractive aesthetics

> Motion is used to **explain**, not to impress.

---

# 2️⃣ CORE FRONTEND PRINCIPLES (NON-NEGOTIABLE)

| Principle              | Implementation Meaning            |
| ---------------------- | --------------------------------- |
| Calm Motion            | No aggressive easing, no bouncing |
| Progressive Disclosure | Complexity revealed gradually     |
| Content First          | Motion never blocks reading       |
| Accessibility First    | Reduced-motion support everywhere |
| Performance Discipline | 60fps or no animation             |

---

# 3️⃣ TECH STACK (FRONTEND)

**Framework**

* Next.js (App Router)
* React 18+

**Styling**

* Tailwind CSS
* Design tokens via CSS variables

**Animation**

* GSAP (primary)
* Framer Motion (micro-interactions only)
* Lottie (illustrative loops)
* Three.js (single, controlled contexts only)

**Rendering**

* Server Components by default
* Client Components only when animation or interactivity is required

---

# 4️⃣ APPLICATION STRUCTURE (FRONTEND)

## 4.1 Folder Structure

```
app/
├── layout.tsx
├── page.tsx
├── about/
├── programs/
│   └── [slug]/
├── impact/
├── research/
├── get-involved/
└── donate/

components/
├── layout/
├── sections/
├── ui/
├── motion/
├── three/
└── accessibility/

styles/
├── globals.css
├── tokens.css
└── motion.css
```

---

## 4.2 Rendering Rules

| Component Type     | Render Mode                       |
| ------------------ | --------------------------------- |
| Static content     | Server Component                  |
| Scroll animation   | Client Component                  |
| Lottie             | Client Component                  |
| Three.js           | Client Component (dynamic import) |
| CMS content blocks | Server + hydration                |

---

# 5️⃣ PAGE-LEVEL STRUCTURE & INTERACTIONS

---

## 🏠 HOME PAGE (REFERENCE STANDARD)

### 5.1 Hero Section

**Purpose**

* Establish mission
* Emotional grounding
* Immediate clarity

### Structure

```
Hero
├── Background (Lottie or subtle gradient)
├── Headline (staggered text)
├── Subheadline
└── Primary CTAs
```

### Animations

* GSAP stagger (Y + opacity)
* Single entrance on load
* No looping text animation

**Easing**

* `power3.out`

**Interaction**

* CTA hover: 1.02 scale + soft glow
* No hover animation on headline

---

## 5.2 Language Gap / Stats Section

### Structure

```
StatsGrid
├── StatCard x3
│   ├── Number
│   └── Context label
```

### Animations

* ScrollTrigger count-up
* Triggered once per session
* No re-animation on scroll back

### Interaction

* Hover reveals tooltip explanation
* Touch devices: tap toggles tooltip

---

## 5.3 Programs Overview

### Structure

```
ProgramsGrid
├── ProgramCard
│   ├── Icon
│   ├── Title
│   ├── Description
│   └── Inline CTA
```

### Animations

* Scroll reveal (Y + opacity)
* Hover lift (≤6px)
* Icon micro-rotation (≤5°)

### Interaction

* Entire card clickable
* Keyboard focus shows same state as hover

---

## 5.4 Impact Map / Globe

### Structure

```
ImpactVisual
├── SectionHeading
└── Globe (Three.js)
```

### Globe Rules

* One globe instance per page
* No data overload
* Dots + occasional arcs only

### Animations

* Auto-rotate (slow)
* Dot pulse (sinusoidal)
* Arc appears briefly, then fades

### Interaction

* Hover dot → tooltip (outside canvas)
* No zoom / pan controls

---

## 5.5 Technology & Ethics Section

### Structure

```
PrinciplesGrid
├── PrincipleCard
│   ├── LottieIcon
│   ├── Title
│   └── Short principle
```

### Animations

* Lottie loops at low FPS
* Cards fade-in sequentially

### Interaction

* Hover reveals 1-sentence explanation
* No expansion panels (keeps calm)

---

## 5.6 Case Studies / Stories

### Structure

```
StoryBlock
├── Image
├── Quote
├── Context text
└── Optional audio
```

### Animations

* Image fade first
* Quote slides up second
* Audio controls static (no animation)

### Interaction

* Click expands full story page
* Audio opt-in only

---

## 5.7 Final CTA

### Structure

```
CTASection
├── Headline
├── Supporting line
└── CTA Buttons
```

### Animations

* Scroll reveal
* Background gradient slow drift

### Interaction

* Button hover microcopy changes
* No animation after first reveal

---

# 6️⃣ GLOBAL MOTION SYSTEM

## 6.1 Motion Tokens

```ts
duration = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2
}

ease = {
  primary: "power3.out",
  secondary: "power2.out"
}
```

---

## 6.2 Allowed Motions

✅ Fade
✅ Translate (Y ≤ 32px)
✅ Scale (≤ 1.05)
✅ Single pulse

❌ Bounce
❌ Elastic
❌ Infinite looping UI
❌ Flashing colors

---

## 6.3 Reduced Motion Policy

All animations must support:

```ts
@media (prefers-reduced-motion: reduce)
```

Behavior:

* No GSAP timelines
* No Three.js auto-rotate
* Static content only

---

# 7️⃣ INTERACTION STATES (MANDATORY)

Every interactive element must define:

| State    | Required |
| -------- | -------- |
| Default  | Yes      |
| Hover    | Yes      |
| Focus    | Yes      |
| Active   | Yes      |
| Disabled | Yes      |

Focus styles must be **visible and branded**, never removed.

---

# 8️⃣ ACCESSIBILITY REQUIREMENTS

* WCAG 2.1 AA
* Minimum contrast 4.5:1
* All animations non-essential
* Screen-reader friendly headings
* Keyboard navigable cards

---

# 9️⃣ PERFORMANCE BUDGETS

| Asset           | Limit  |
| --------------- | ------ |
| Lottie JSON     | <150kb |
| Hero JS         | <200kb |
| Three.js bundle | <300kb |
| Total page JS   | <500kb |

Lazy-load:

* Globe
* Lottie below fold
* Heavy motion hooks

---

# 🔟 FRONTEND KPIs

* CLS < 0.1
* LCP < 2.5s (Africa mobile baseline)
* 60fps animations
* Zero motion-related accessibility complaints

---

# ✅ FINAL FRONTEND POSITIONING

> The LocaleNLP frontend should feel like a **public institution**, not a startup.
> It should move **slowly, intentionally, and with respect** for the user’s attention, bandwidth, and culture.

---

Understood.
I will continue **as Lead Frontend Architect + Motion Systems Designer**, and I will **fully resolve the request** by delivering **all six requested sections**, **without overlap**, **without backend leakage**, and **without contradicting anything already defined**.

This section is **execution-grade**.
A senior frontend engineer or creative developer could build the LocaleNLP Foundation frontend **exactly as intended** from this alone.

All content below is **Markdown**, structured, explicit, and restrained.

---

# 📘 LocaleNLP Foundation

## **Frontend-Only PRD — Execution Extension**

---

# 11️⃣ COMPONENT-BY-COMPONENT IMPLEMENTATION CHECKLIST

This section defines **what must be implemented for every core frontend component** before it is considered “done”.

---

## 11.1 Global Layout (`<AppLayout />`)

**Must include**

* Semantic landmarks (`header`, `main`, `footer`)
* Skip-to-content link
* Global reduced-motion handling
* Font loading with `font-display: swap`

**Must NOT**

* Lock scroll
* Animate layout containers
* Delay content rendering for motion

---

## 11.2 Header / Navigation

**Implementation checklist**

* Sticky (not animated on scroll)
* Keyboard navigable
* Active route state visible
* Mobile menu opens without animation delay

**Motion**

* None on load
* Optional 100–150ms opacity on mobile open

---

## 11.3 Buttons

**Must**

* Support all states (default, hover, focus, active, disabled)
* Use `aria-disabled` when inactive
* Have minimum touch target (44×44px)

**Motion**

* Hover scale ≤ 1.02
* Duration ≤ 0.15s
* No easing beyond `power2.out`

---

## 11.4 Cards (Programs, Impact, Stories)

**Must**

* Be fully clickable OR contain a single CTA
* Support keyboard focus
* Mirror hover styles on focus

**Motion**

* Hover lift ≤ 6px
* Shadow fade only (no blur animation)

---

## 11.5 Expandable Sections (Progressive Disclosure)

**Must**

* Use native `<details>` where possible
* Animate height + opacity
* Preserve focus order

**Motion**

* Open: 0.3s
* Close: 0.2s
* Reduced motion → instant toggle

---

## 11.6 Lottie Illustrations

**Must**

* Autoplay = false
* Loop = true only if illustrative
* Pause when off-screen

**Must NOT**

* Convey critical information
* Exceed 150kb

---

## 11.7 Three.js Globe

**Must**

* Be lazy-loaded
* Have static fallback
* Disable interaction on reduced motion

**Must NOT**

* Capture scroll
* Allow zoom or drag
* Run on every page

---

# 12️⃣ EXACT GSAP TIMELINES (CODE-LEVEL)

These timelines are **canonical**.
Deviations require design review.

---

## 12.1 Hero Section Timeline

```ts
gsap.timeline()
  .from(".hero-title span", {
    y: 24,
    opacity: 0,
    stagger: 0.08,
    duration: 0.6,
    ease: "power3.out"
  })
  .from(".hero-subtitle", {
    y: 16,
    opacity: 0,
    duration: 0.4,
    ease: "power3.out"
  }, "-=0.2")
  .from(".hero-cta", {
    opacity: 0,
    duration: 0.3
  }, "-=0.1");
```

---

## 12.2 Stats Count-Up (ScrollTrigger)

```ts
gsap.fromTo(statEl,
  { innerText: 0 },
  {
    innerText: targetValue,
    duration: 1.2,
    ease: "power2.out",
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: statEl,
      start: "top 80%",
      once: true
    }
  }
);
```

---

## 12.3 Program Cards Reveal

```ts
gsap.from(".program-card", {
  y: 32,
  opacity: 0,
  duration: 0.5,
  ease: "power3.out",
  stagger: 0.12,
  scrollTrigger: {
    trigger: ".programs-grid",
    start: "top 75%"
  }
});
```

---

## 12.4 Section Background Drift

```ts
gsap.to(".cta-bg", {
  backgroundPosition: "120% 50%",
  duration: 20,
  ease: "none",
  repeat: -1,
  yoyo: true
});
```

---

## 12.5 Reduced Motion Override

```ts
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.clear();
}
```

---

# 13️⃣ DESIGN TOKENS + TAILWIND CONFIG

---

## 13.1 CSS Tokens (`tokens.css`)

```css
:root {
  --color-bg: #f9fafb;
  --color-text: #111827;
  --color-muted: #6b7280;
  --color-accent: #2563eb;
  --color-success: #15803d;
  --color-warning: #b45309;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --space-xl: 64px;

  --radius-sm: 4px;
  --radius-md: 8px;

  --motion-fast: 0.15s;
  --motion-medium: 0.3s;
  --motion-slow: 0.6s;
}
```

---

## 13.2 Tailwind Extension

```js
theme: {
  extend: {
    colors: {
      bg: "var(--color-bg)",
      text: "var(--color-text)",
      muted: "var(--color-muted)",
      accent: "var(--color-accent)"
    },
    spacing: {
      xs: "var(--space-xs)",
      sm: "var(--space-sm)",
      md: "var(--space-md)",
      lg: "var(--space-lg)",
      xl: "var(--space-xl)"
    },
    borderRadius: {
      sm: "var(--radius-sm)",
      md: "var(--radius-md)"
    },
    transitionDuration: {
      fast: "150ms",
      medium: "300ms",
      slow: "600ms"
    }
  }
}
```

---

# 14️⃣ ACCESSIBILITY AUDIT CHECKLIST (FRONTEND)

This checklist must pass **before merge**.

---

## Visual

* [ ] Contrast ≥ 4.5:1
* [ ] Text resizable to 200%
* [ ] No color-only indicators

## Motion

* [ ] `prefers-reduced-motion` respected
* [ ] No infinite UI animation
* [ ] Motion not required to understand content

## Interaction

* [ ] Keyboard navigation complete
* [ ] Focus visible everywhere
* [ ] No focus traps

## Semantics

* [ ] Correct heading order
* [ ] Landmarks defined
* [ ] Buttons ≠ links

---

# 15️⃣ FRONTEND PERFORMANCE OPTIMIZATION PLAYBOOK

---

## 15.1 Rendering Strategy

* Server Components by default
* Client Components only for:

  * GSAP
  * Lottie
  * Three.js

---

## 15.2 JavaScript Budget Enforcement

* Split bundles by section
* Dynamic import heavy motion
* No global GSAP imports

---

## 15.3 Media Optimization

* Images: `next/image`
* Lottie: gzip + minified JSON
* Video: never autoplay

---

## 15.4 Runtime Monitoring

Track:

* FPS drops during scroll
* Long tasks > 50ms
* Layout shifts during animation

---

# 16️⃣ DESIGN-TO-CODE HANDOFF RULES

This section prevents **interpretation drift**.

---

## 16.1 What Designers Must Deliver

* Motion intent (not just visuals)
* Duration & easing
* Interaction priority
* Reduced-motion fallback

---

## 16.2 What Engineers Must NOT Change

* Motion purpose
* Interaction hierarchy
* Accessibility behaviors

---

## 16.3 Naming & Mapping

* Component names match design system
* Tokens referenced, not hardcoded
* No “temporary” styles

---

## 16.4 Review Protocol

No frontend PR is complete without:

* Motion review
* Accessibility check
* Performance verification

---

# ✅ FINAL FRONTEND ASSERTION (REINFORCED)

> LocaleNLP Foundation’s frontend is not optimized for engagement.
> It is optimized for **trust, clarity, and dignity**.

If an animation:

* Draws attention to itself
* Costs performance
* Confuses meaning

It must be removed.

---

## 📍 STATUS

At this point, you have:

* UI/UX-only PRD
* Design system
* Design documentation site
* Frontend-only PRD
* Motion system
* GSAP timelines
* Token system
* Accessibility governance
* Performance strategy
* Design-to-code rules

This is a **complete frontend + design governance stack**.
