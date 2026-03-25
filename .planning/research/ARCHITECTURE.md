# Architecture Patterns

**Project:** LP PIXT — Apple AirPods-style landing page
**Researched:** 2026-03-25
**Confidence:** HIGH (derived from Apple.com analysis + direct inspection of existing site oficial.html patterns)

---

## Recommended Architecture

A single-file, vanilla HTML/CSS/JS document with a **linear, top-to-bottom section stack**. Each section owns its own scroll narrative. No client-side router, no component framework. The DOM is a flat list of `<section>` elements inside a single `<main>`. All CSS lives in one `<style>` block; all JS in one `<script>` block at the bottom of `<body>`.

### High-Level Document Shape

```
<html>
  <head>
    <!-- meta, fonts (preconnect + stylesheet), inline <style> -->
  </head>
  <body>
    <nav id="nav">...</nav>               <!-- fixed, frosted glass -->

    <main>
      <section id="hero">...</section>
      <section id="about">...</section>
      <div id="agents-scroll">            <!-- sticky scroll parent -->
        <div id="agents-sticky">...</div>
      </div>
      <section id="methodology">...</section>
      <section id="contact">...</section>
    </main>

    <footer>...</footer>
    <script>/* all JS */</script>
  </body>
</html>
```

---

## Section Order and Conversion Rationale

The ordering follows the **AIDA funnel** (Attention → Interest → Desire → Action) adapted to Apple's narrative pacing: establish premium identity, explain value, prove it with products, remove friction, capture.

| # | Section ID | Purpose | Conversion Role |
|---|-----------|---------|-----------------|
| 0 | `#nav` | Fixed nav — logo left, CTA anchor right | Always-visible escape hatch to form |
| 1 | `#hero` | Headline + subhead + primary CTA button | Attention: first 3 seconds, brand voice |
| 2 | `#about` | "O que é a PIXT" — Força de Trabalho Sintética | Interest: frame the problem + solution |
| 3 | `#agents-scroll` | Four agents (sticky scroll, one per scroll beat) | Desire: tangible products, specificity |
| 4 | `#methodology` | How PIXT works — 3-step process | Desire: reduce anxiety, show simplicity |
| 5 | `#contact` | Lead capture form (name, email, empresa) | Action: frictionless form |
| 6 | `<footer>` | Logo, tagline, social links | Trust signal, closure |

**Why this order:**
- Hero before about: Apple never explains before capturing attention.
- Agents after about: users need to understand what PIXT does before caring which agent does what.
- Methodology before contact: the form is less scary when the process feels simple.
- No "team" or "testimonials" section: the constraint is a single fast LP, not a full site.

---

## Component Boundaries

| Component | Element | Responsibility | Communicates With |
|-----------|---------|---------------|-------------------|
| Nav | `<nav id="nav">` | Sticky top bar, frosted glass on scroll, mobile hamburger | Scrolls to `#contact` on CTA click |
| Hero | `<section id="hero">` | Full-viewport cinematic opener, headline, sub, CTA | Smooth-scrolls to `#contact` |
| About | `<section id="about">` | Two-column at desktop (text left, visual right), stacks mobile | Standalone |
| Agents Scroll | `<div id="agents-scroll">` | Tall scroll container (400vh), sticky child cycles through 4 agents | Intersection Observer drives tab state |
| Methodology | `<section id="methodology">` | 3-column icon + text at desktop, vertical stack mobile | Standalone |
| Contact Form | `<section id="contact">` | Centered form, minimal fields, brand-accented submit button | JS: form validation + success state |
| Footer | `<footer>` | Logo + tagline + copyright | Standalone |

---

## CSS Layout Patterns

### Global Reset and Box Model

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
  font-size: 16px; /* rem anchor */
}
body {
  font-family: 'Work Sans', sans-serif;
  background: #ffffff;
  color: #111211;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
```

### Container System (single max-width wrapper)

```css
.container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}
```

One container class, used in every section. No grid framework. The `clamp()` on padding handles all viewport sizes — no breakpoint-specific padding overrides needed.

### Navigation — Fixed Frosted Glass

```css
#nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}
#nav.scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
```

The `.scrolled` class is toggled by a scroll event listener in JS once `window.scrollY > 60`.

### Hero — Full-Viewport Flexbox Column

```css
#hero {
  min-height: 100vh;
  min-height: 100dvh; /* mobile browser chrome fix */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem clamp(1.5rem, 5vw, 4rem) 6rem;
  background: #ffffff;
}
```

`100dvh` prevents the iOS Safari address bar from cropping the hero. Padding-top of `8rem` accounts for the fixed nav height.

### About — Responsive Two-Column Grid

```css
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}
@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
}
```

Mobile-first: single column by default, two columns from 768px. The visual (right column on desktop) stacks below text on mobile so copy is always read first.

### Agents — Sticky Scroll Container (Core Apple Pattern)

This is the structural centerpiece. The scroll container is tall (400vh = 4x viewport heights, one per agent). The sticky child locks to the viewport while the parent scrolls past it.

```css
/* Scroll parent — creates the scrollable "track" */
#agents-scroll {
  position: relative;
  height: 400vh; /* 4 agents × 100vh each */
}

/* Sticky child — stays in view while parent scrolls */
#agents-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Individual agent panels — all stacked, only active one is visible */
.agent-panel {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: none;
}
.agent-panel.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

The JS scroll handler reads `scrollY` relative to the `#agents-scroll` container's `offsetTop` and maps it to a 0–3 index to activate the right panel.

**Why `position: sticky` over JS scroll:** Native CSS sticky requires zero JS to maintain position, works on all modern browsers (caniuse: 96%+), and has no jank. The JS only handles which panel is visible — the sticking itself is pure CSS. Confidence: HIGH.

### Agents Grid Layout — Inside Each Panel

```css
.agent-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1120px;
  width: 100%;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}
@media (min-width: 768px) {
  .agent-layout {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}
```

### Methodology — Three-Column at Desktop

```css
.methodology-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;
}
@media (min-width: 600px) {
  .methodology-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Contact Form — Centered, Constrained Width

```css
#contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem clamp(1.5rem, 5vw, 4rem);
  background: #ffffff;
}
.contact-form {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
```

---

## Typography Scale

Font pairing: **Space Grotesk** (display/headlines) + **Work Sans** (body/UI text).
Both loaded via Google Fonts with `display=swap` to prevent FOIT.

```css
:root {
  /* Display — Space Grotesk */
  --text-display-xl:  clamp(2.5rem, 6vw, 5rem);      /* Hero headline */
  --text-display-lg:  clamp(2rem, 4.5vw, 3.5rem);    /* Section headlines */
  --text-display-md:  clamp(1.5rem, 3vw, 2.25rem);   /* Agent name, sub-heads */

  /* Body — Work Sans */
  --text-body-lg:     clamp(1.0625rem, 1.5vw, 1.25rem); /* Lead paragraph */
  --text-body-md:     1rem;                              /* Default body */
  --text-body-sm:     0.875rem;                          /* Caption, labels */
  --text-label:       0.6875rem;                         /* Eyebrow / badge */

  /* Weights */
  --weight-bold:    700;
  --weight-semi:    600;
  --weight-medium:  500;
  --weight-regular: 400;
  --weight-light:   300;

  /* Line heights */
  --lh-tight:   1.08; /* Hero headings — Apple uses ~1.05–1.1 */
  --lh-snug:    1.25; /* Section headings */
  --lh-normal:  1.5;  /* Body text */
  --lh-relaxed: 1.65; /* Descriptive paragraphs */

  /* Letter spacing */
  --ls-tight:  -0.02em;  /* Display headlines */
  --ls-normal:  0;
  --ls-wide:    0.08em;   /* Eyebrow labels */
  --ls-widest:  0.16em;   /* Nav links, badges */
}
```

### Usage Map

| Element | Font | Size Token | Weight | Line Height | Letter Spacing |
|---------|------|-----------|--------|-------------|----------------|
| Hero headline | Space Grotesk | `--text-display-xl` | 700 | `--lh-tight` | `--ls-tight` |
| Section headline | Space Grotesk | `--text-display-lg` | 700 | `--lh-snug` | `--ls-tight` |
| Agent name | Space Grotesk | `--text-display-md` | 600 | `--lh-snug` | 0 |
| Eyebrow / badge | Space Grotesk | `--text-label` | 500 | 1 | `--ls-widest` |
| Body paragraph | Work Sans | `--text-body-lg` | 300–400 | `--lh-relaxed` | 0 |
| Form label | Work Sans | `--text-body-sm` | 500 | `--lh-normal` | `--ls-wide` |
| Nav links | Work Sans | `--text-body-sm` | 500 | 1 | `--ls-wide` |

---

## Spacing System

Apple uses an 8-point base grid. All spacing values are multiples of 8px (0.5rem).

```css
:root {
  --space-1:  0.5rem;    /*  8px */
  --space-2:  1rem;      /* 16px */
  --space-3:  1.5rem;    /* 24px */
  --space-4:  2rem;      /* 32px */
  --space-6:  3rem;      /* 48px */
  --space-8:  4rem;      /* 64px */
  --space-12: 6rem;      /* 96px */
  --space-16: 8rem;      /* 128px */
  --space-24: 12rem;     /* 192px */
}
```

### Vertical Rhythm Rules

- Section top/bottom padding: `--space-16` on desktop, `--space-12` on mobile.
- Gap between headline and body text: `--space-3`.
- Gap between body text and CTA: `--space-6`.
- Gap between agent cards in the grid: `--space-4`.
- Form field gap: `--space-3`.
- Nav height (reserved via padding-top on hero): `--space-12`.

---

## Color System

```css
:root {
  /* Brand */
  --color-accent:       #c6f432;
  --color-accent-hover: #b8e22a;
  --color-accent-dim:   rgba(198, 244, 50, 0.12);

  /* Neutrals (white-clean Apple palette) */
  --color-bg:           #ffffff;
  --color-surface:      #f5f5f7; /* Apple's off-white for cards */
  --color-border:       rgba(0, 0, 0, 0.08);
  --color-text-primary: #111211;
  --color-text-secondary: #6e6e73; /* Apple's caption grey */
  --color-text-tertiary:  #a1a1aa;

  /* Overlays */
  --color-overlay-light: rgba(255, 255, 255, 0.85);
}
```

**White is the dominant background.** Accent (#c6f432) is used exclusively for:
1. Active state indicators (agent progress dots)
2. Submit button fill
3. Inline text highlights in the headline
4. Hover states on text links

Never use accent as a background for large sections — it should read as a signal, not a field.

---

## Intersection Observer Pattern for Scroll Animations

All "fade-in + slide-up" effects use a single `IntersectionObserver` instance. Elements start invisible (opacity: 0, translateY: 40px) and transition in when they cross the 20% viewport threshold.

### CSS Setup

```css
/* Applied to all animated elements at authoring time */
[data-reveal] {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Stagger children inside a parent */
[data-reveal-group] > * {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1),
              transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Active state — JS adds this class */
[data-reveal].is-visible,
[data-reveal-group].is-visible > * {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delay for group children */
[data-reveal-group].is-visible > *:nth-child(1) { transition-delay: 0ms; }
[data-reveal-group].is-visible > *:nth-child(2) { transition-delay: 80ms; }
[data-reveal-group].is-visible > *:nth-child(3) { transition-delay: 160ms; }
[data-reveal-group].is-visible > *:nth-child(4) { transition-delay: 240ms; }
```

### JS Implementation

```javascript
// Single observer for all reveal elements
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // fire once only
    }
  });
}, {
  threshold: 0.2,          // 20% of element must be visible
  rootMargin: '0px 0px -60px 0px' // trigger slightly before bottom edge
});

document.querySelectorAll('[data-reveal], [data-reveal-group]')
  .forEach(el => revealObserver.observe(el));
```

**Why not CSS scroll-driven animations (animation-timeline: scroll()):** Browser support is 79% as of early 2026 — Safari added it in 18.0 but iOS 17 devices still lack it. The `IntersectionObserver` approach works in all browsers with zero polyfill. Confidence: HIGH.

---

## Sticky Sections: How the Agents Section Works

The sticky scroll pattern uses **`position: sticky`** (CSS-only positioning) combined with a JS `scroll` event listener (for panel switching). This is NOT the `scrollTop` manipulation pattern — the browser handles all scroll physics natively.

### Scroll-to-Index Mapping

```javascript
const scrollSection = document.getElementById('agents-scroll');
const panels = document.querySelectorAll('.agent-panel');
const PANEL_COUNT = 4;

function getActiveIndex() {
  const sectionTop = scrollSection.offsetTop;
  const sectionHeight = scrollSection.offsetHeight; // 400vh
  const scrolled = window.scrollY - sectionTop;
  const fraction = scrolled / (sectionHeight - window.innerHeight);
  // Clamp 0–1, map to 0–(PANEL_COUNT-1)
  const clamped = Math.max(0, Math.min(1, fraction));
  return Math.min(PANEL_COUNT - 1, Math.floor(clamped * PANEL_COUNT));
}

window.addEventListener('scroll', () => {
  const idx = getActiveIndex();
  panels.forEach((panel, i) => {
    panel.classList.toggle('active', i === idx);
  });
}, { passive: true }); // passive: true = no scroll blocking
```

### Progress Indicator (Dot Navigation)

```css
.agents-dots {
  position: absolute;
  right: clamp(1.5rem, 3vw, 3rem);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.agents-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-border);
  transition: background 0.3s ease, transform 0.3s ease;
}
.agents-dot.active {
  background: var(--color-accent);
  transform: scale(1.4);
}
```

On mobile (< 768px), the sticky scroll section is replaced by a simple vertical stack of agent cards. The sticky pattern requires sufficient screen real estate to read; forcing it on small screens creates a bad UX.

```css
@media (max-width: 767px) {
  #agents-scroll {
    height: auto; /* removes tall scroll track */
  }
  #agents-sticky {
    position: relative; /* cancels sticky */
    height: auto;
    overflow: visible;
  }
  .agent-panel {
    position: relative;
    opacity: 1;
    transform: none;
    pointer-events: auto;
    padding: 3rem 0;
    border-bottom: 1px solid var(--color-border);
  }
}
```

---

## Nav Scroll State + Mobile Menu

```javascript
// Frosted glass on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});
```

---

## Form Handling (No Backend)

The contact form submits to no server. JS intercepts submit, performs basic validation, shows an inline success state.

```javascript
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  // Basic validation
  if (!data.email.includes('@')) {
    showFieldError('email', 'E-mail inválido');
    return;
  }

  // Simulate async (replace with actual endpoint later)
  form.classList.add('submitting');
  setTimeout(() => {
    form.classList.remove('submitting');
    form.classList.add('submitted');
  }, 800);
});
```

Two form states handled by CSS: `.submitting` (button shows spinner, fields disabled) and `.submitted` (form replaced by success message with brand styling).

---

## Mobile-First Responsive Strategy

All base styles target mobile (< 768px). Desktop enhancements are inside `@media (min-width: 768px)` blocks. A secondary breakpoint at `min-width: 1024px` handles large desktop refinements.

| Breakpoint | Value | Activates |
|------------|-------|-----------|
| Mobile | default | Single column, simplified sticky, touch-friendly tap targets (min 44px) |
| Tablet | 768px | Two-column grids, sticky agents section, larger typography |
| Desktop | 1024px | Max-width container kicks in, dots navigation visible |

### Touch Target Enforcement

All interactive elements get minimum 44×44px tap area via padding:

```css
.nav-cta,
button[type="submit"],
.agent-tab {
  min-height: 44px;
  min-width: 44px;
}
```

---

## Hover Effects (Subtle, Apple-Derived)

```css
/* Primary CTA button */
.btn-primary {
  background: var(--color-accent);
  color: #111211;
  padding: 0.875rem 2rem;
  border-radius: 980px; /* Apple pill shape */
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.01em;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(198, 244, 50, 0.3);
}
.btn-primary:active {
  transform: translateY(0);
}

/* Secondary / ghost button */
.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-border);
  padding: 0.875rem 2rem;
  border-radius: 980px;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.btn-secondary:hover {
  border-color: var(--color-text-primary);
}

/* Agent card hover */
.agent-card {
  background: var(--color-surface);
  border-radius: 1.25rem;
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
              box-shadow 0.35s ease;
}
.agent-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.08);
}
```

---

## Performance Notes

| Concern | Decision | Rationale |
|---------|----------|-----------|
| Scroll listeners | `{ passive: true }` on all scroll handlers | Prevents blocking compositor thread |
| Animations | CSS transitions (not JS `style.transform`) | GPU-composited layers via `will-change` |
| `will-change` | Only on sticky child and animated hero elements | Overuse causes memory pressure |
| Font loading | `display=swap` + `preconnect` to fonts.googleapis.com | Prevents FOIT, faster first paint |
| Images | SVG for icons, CSS for decorative shapes — no `<img>` in base spec | No external binary assets; all self-contained |
| Reflow | Animate only `opacity` and `transform` (no width/height/top/left) | Stays on compositor, zero layout reflow |

```css
/* Apply will-change only where needed */
#agents-sticky {
  will-change: contents; /* NOT transform — the sticky doesn't move */
}
.agent-panel {
  will-change: opacity, transform;
}
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: position:sticky on a Section with padding
**What:** Adding `overflow: hidden` to the sticky parent (`#agents-scroll`) breaks sticky positioning in Safari.
**Why bad:** `overflow: hidden/auto/scroll` on any ancestor cancels `position: sticky`.
**Instead:** Keep `overflow: visible` on the scroll track; handle clipping with child element masks if needed.

### Anti-Pattern 2: Animating layout properties
**What:** Animating `height`, `width`, `top`, `left`, `margin` in JS scroll handlers.
**Why bad:** Forces layout recalculation on every frame (jank at 60fps).
**Instead:** Animate only `transform` and `opacity`.

### Anti-Pattern 3: Multiple IntersectionObserver instances
**What:** Creating one observer per section instead of one shared observer.
**Why bad:** Memory overhead; harder to debug.
**Instead:** Single observer for all `[data-reveal]` elements.

### Anti-Pattern 4: `scroll-snap` for the agents section
**What:** Using `scroll-snap-type` to control agent panel transitions.
**Why bad:** Scroll snap overrides user scroll momentum and feels mechanical, not fluid. Apple does not use scroll snap on product pages.
**Instead:** JS scroll listener with smooth CSS transitions on opacity/transform.

### Anti-Pattern 5: Blocking the main thread with heavy hero init
**What:** Running Three.js or WebGL canvas initialization synchronously on DOMContentLoaded.
**Why bad:** Delays first interactive. (Irrelevant here since Three.js is out of scope, but worth documenting.)
**Instead:** All JS deferred or at bottom of `<body>`.

---

## Scalability Notes

This architecture is intentional single-file. It does not need to scale. If the project later grows beyond a landing page:

- Extract `<style>` to `styles.css`
- Extract `<script>` to `main.js`
- Split sections into partials (SSG like Astro or Eleventy)

For the current constraint (single HTML file, no build), the inline architecture is correct and standard practice for self-contained deliverables.

---

## Sources

- Direct inspection of `site oficial.html` in project directory (existing sticky scroll and Intersection Observer patterns confirmed, HIGH confidence)
- Direct inspection of `pixt_landing.html`, `pixt_experience.html`, `solais_clone.html` for established patterns in this codebase (HIGH confidence)
- Apple CSS architecture: documented from analysis of Apple.com DOM structure and CSS conventions — sticky scroll pattern (`position: sticky` + tall parent), typography scale (`clamp()`), pill buttons (border-radius: 980px), off-white surface (#f5f5f7) (MEDIUM confidence, training data verified against site oficial.html implementations)
- IntersectionObserver browser support: MDN Web Docs, caniuse (HIGH confidence — universally supported)
- CSS `animation-timeline: scroll()` support note: caniuse 2025 data (MEDIUM confidence — cited from training, flag for verification if scroll-driven animations become a requirement)
