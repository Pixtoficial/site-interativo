# Phase 1: Foundation - Research

**Researched:** 2026-03-25
**Domain:** Vanilla HTML/CSS landing page — design system, nav, hero, footer
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Hero background: white (`#ffffff`) with geometric accent block in `#c6f432` as visual highlight element
- **D-02:** Hero contains: headline + subtitle + CTA button + abstract geometric graphic (lines, grid, or geometric shape in green/black) — no product photo in Phase 1
- **D-03:** Headline very large, Apple style — between 5rem and 7rem on desktop; strong typographic hierarchy
- **D-04:** Visual white/clean — predominantly white background, no dark mode
- **D-05:** Single self-contained HTML file — no build step, no frameworks
- **D-06:** Fonts: Space Grotesk (display/headlines) + Work Sans (body) via Google Fonts with `preconnect` + `display=swap`
- **D-07:** Hero uses `min-height: 100dvh` with fallback `min-height: 100vh` for iOS Safari
- **D-08:** Smooth scroll via CSS `scroll-behavior: smooth` on `<html>`
- **D-09:** All future animations use only `transform` and `opacity` — zero layout recalculation

### Claude's Discretion

- Gray/neutral scale for the design system (secondary text, borders, muted) — use reasonable scale based on `#111211` and `#ffffff`
- Exact structure of the abstract graphic element in the hero (lines, grid, or shape)
- Desktop nav layout (logo + CTA; optional anchor links)
- Footer content beyond the LGPD notice (logo, copyright, social links)
- Design system spacing and padding scale

### Deferred Ideas (OUT OF SCOPE)

- Detailed color tokens (gray scale, borders, muted) — Claude decides during implementation
- Anchor links in nav for sections — sections don't exist in Phase 1; nav will have logo + CTA only
- Nav interactivity (scroll behavior, hide/show) — Phase 3
- Real content extracted from `site oficial.html` for the hero — Phase 2; Phase 1 uses placeholder copy
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Sticky nav with frosted glass (backdrop-filter) that appears on scroll up and hides on scroll down | NAV-01 behavior is JS-driven (Phase 3); Phase 1 delivers static sticky nav with backdrop-filter — scroll show/hide deferred |
| NAV-02 | PIXT logo and anchor to form in nav | Simple `<a href="#contact">` anchor link; anchor target will exist in Phase 3, link is harmless in Phase 1 |
| HERO-01 | Full-screen hero with impactful headline, subtitle, and CTA button anchoring to form | Static HTML/CSS; button is `<a href="#contact">` with no JS needed |
| HERO-02 | Hero uses `min-height: 100dvh` with fallback `100vh` for iOS Safari compatibility | `100dvh` baseline in all modern browsers since Safari 15.4+; fallback pattern confirmed |
| FOOT-01 | Footer with LGPD privacy notice and link to policy (Brazilian legal requirement) | Simple static HTML; placeholder `href="#"` for policy link in Phase 1 |
| FOOT-02 | Smooth scroll via `scroll-behavior: smooth` on `<html>` | CSS-only; Safari 15.4+ supported; no JS needed |
| FONT-01 | Google Fonts loaded with `preconnect` + `display=swap` (Space Grotesk + Work Sans) | Confirmed canonical two-`preconnect` pattern (googleapis.com + gstatic.com with crossorigin) |
| PERF-01 | All animations use only `transform` and `opacity` (zero layout recalculation) | Phase 1 has zero animations — constraint applies from Phase 4 onward; CSS custom properties and compositor-safe values set now |
</phase_requirements>

---

## Summary

Phase 1 is a pure HTML/CSS deliverable: a single file (`lp pixt.html`) with a complete design system encoded as CSS custom properties, a static sticky nav, a full-viewport hero section, and a footer with LGPD notice. There is no JavaScript in this phase. The output must open directly in a browser and look correct immediately.

The stack is extremely simple: no build tools, no frameworks, no external JS. All decisions are locked. The main technical challenges are (1) the iOS Safari viewport height unit fallback pattern (`100vh` → `100dvh`), (2) the Google Fonts preconnect loading order, and (3) the CSS custom property design system being established in a way that subsequent phases can extend without rewriting variables.

The existing reference files (`pixt_novo.html`, `pxtoficial.html`, `pixt_landing.html`) all use dark backgrounds and external JS libraries (Three.js, GSAP, Tailwind CDN) — none of these patterns apply to `lp pixt.html`. The only reusable insight is the Google Fonts import pattern with the correct weights (400/500/600/700 for Space Grotesk, 300/400/500/600 for Work Sans) and the CSS custom property naming convention.

**Primary recommendation:** Build a clean `<style>` block with a `:root` token system first, then nav, then hero, then footer. Keep all sections semantically correct (`<header>`, `<nav>`, `<main>`, `<section id="hero">`, `<footer>`). Use `@media` queries mobile-first. No JavaScript whatsoever.

---

## Standard Stack

### Core

| Library / Technology | Version | Purpose | Why Standard |
|----------------------|---------|---------|--------------|
| HTML5 | Baseline | Document structure | Single-file constraint; no framework |
| CSS3 custom properties | Baseline | Design system tokens | Established pattern in all existing PIXT files |
| Google Fonts — Space Grotesk | Latest (variable available) | Display/headline font | Locked decision D-06 |
| Google Fonts — Work Sans | Latest (variable available) | Body/UI font | Locked decision D-06 |

### Supporting

| Technology | Purpose | When to Use |
|------------|---------|-------------|
| CSS `backdrop-filter: blur()` | Frosted glass nav | Apply to `<header>` with semi-transparent white background |
| CSS `min-height: 100dvh` | Full-viewport hero | Always pair with `min-height: 100vh` fallback above it |
| CSS `scroll-behavior: smooth` | Smooth anchor navigation | On `html` selector only |
| SVG (inline) | Geometric accent in hero | For the abstract geometric element — no external image dependency |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG for geometric element | PNG/JPEG image | Images add external dependency; SVG is crisp at all sizes and stays self-contained |
| CSS custom properties for tokens | Hardcoded values | Custom properties are the established project pattern and enable Phase 2+ theming |
| `min-height: 100dvh` | JS viewport fix | JS approach is more code, more fragile; `100dvh` is now Baseline Widely Available (June 2025) |

**Installation:** No installation. File opens directly in browser.

---

## Architecture Patterns

### Document Structure

```
lp pixt.html
├── <head>
│   ├── charset + viewport meta
│   ├── title + description meta
│   ├── preconnect (googleapis.com)
│   ├── preconnect (gstatic.com crossorigin)
│   └── Google Fonts stylesheet link
├── <style>
│   ├── :root (CSS custom properties — design tokens)
│   ├── CSS reset (box-sizing, margin, padding)
│   ├── html / body base styles
│   ├── nav styles
│   ├── hero styles
│   ├── footer styles
│   └── responsive breakpoints (mobile-first)
├── <body>
│   ├── <header> / <nav>  — sticky nav
│   ├── <main>
│   │   └── <section id="hero">
│   └── <footer>
└── (no <script> in Phase 1)
```

### Pattern 1: CSS Custom Properties Design System

**What:** All brand values, spacing, and typography encoded as `--` variables in `:root`
**When to use:** Always — enables Phase 2/3/4 to add new sections without rewriting colors

```css
/* Established pattern from existing PIXT files */
:root {
  /* Brand */
  --color-accent:   #c6f432;
  --color-bg:       #ffffff;
  --color-text:     #111211;
  --color-text-muted: #6b7280;   /* Claude's discretion — reasonable mid-gray */
  --color-border:   rgba(17, 18, 17, 0.08);

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body:    'Work Sans', sans-serif;

  /* Hero headline scale — locked D-03 */
  --hero-headline-size: clamp(3rem, 7vw, 7rem);

  /* Spacing scale */
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  2rem;
  --space-lg:  4rem;
  --space-xl:  8rem;

  /* Layout */
  --container-max: 1280px;
  --nav-height:    64px;
}
```

### Pattern 2: Google Fonts Loading (FONT-01)

**What:** Two `preconnect` hints + stylesheet link — canonical pattern from official Google Fonts documentation
**When to use:** Always for Google Fonts in a vanilla HTML file

```html
<!-- Source: https://web.dev/articles/font-best-practices -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Critical order:** preconnect tags MUST come before the stylesheet link tag. Both fonts in a single `link` URL to minimize round-trips.

### Pattern 3: Full-Viewport Hero (HERO-02)

**What:** `min-height: 100vh` fallback + `min-height: 100dvh` override — handles iOS Safari address bar
**When to use:** Any full-screen section targeting iOS Safari

```css
/* Source: MDN scroll-behavior + dvh browser compatibility data */
.hero {
  min-height: 100vh;        /* Fallback: older browsers */
  min-height: 100dvh;       /* Modern: dynamic viewport, iOS Safari 15.4+ */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

**Why this works:** CSS cascade — browsers that understand `100dvh` apply the second declaration and ignore the first. Browsers that don't understand `dvh` keep the `100vh` value.

### Pattern 4: Fixed Nav with Frosted Glass (NAV-01 static portion)

**What:** `position: fixed` nav with semi-transparent white background + `backdrop-filter: blur()`
**When to use:** Phase 1 delivers the static styles; scroll show/hide JS behavior is Phase 3

```css
/* Established in existing PIXT files (pixt_novo.html line pattern) */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  background: rgba(255, 255, 255, 0.80);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}
```

**-webkit- prefix:** Still required for Safari 16 and earlier. Include both.

### Pattern 5: Smooth Scroll (FOOT-02)

**What:** Single CSS declaration on `html` element
**When to use:** Always for anchor navigation

```css
html {
  scroll-behavior: smooth;
}
```

**Compatibility:** Safari 15.4+ (June 2023). All modern iOS Safari versions as of 2026 support this. No JS polyfill needed.

### Anti-Patterns to Avoid

- **Inline styles for brand colors:** Never `color: #c6f432` — always use `var(--color-accent)`
- **@import for Google Fonts:** Introduces sequential load delay; use `<link>` in `<head>` instead
- **Height: 100vh only:** Missing dvh unit causes iOS Safari address bar overlap on initial load
- **Using JavaScript for smooth scroll:** CSS `scroll-behavior: smooth` is sufficient and already decided
- **Starting mobile breakpoints last:** This project is mobile-first; base styles target smallest viewport, `@media (min-width: 768px)` and `@media (min-width: 1280px)` layer on top
- **Importing Three.js, GSAP, or Lenis:** These are present in reference files but explicitly out of scope — do not include any external JS CDN in Phase 1

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frosted glass nav | Custom canvas/div layering | `backdrop-filter: blur()` | Native CSS, GPU-accelerated, single property |
| iOS viewport height | JavaScript `window.innerHeight` resize listener | `min-height: 100dvh` | Baseline since June 2025; zero JS overhead |
| Font loading | Custom font-face declarations | Google Fonts CDN with preconnect | Handles subsetting, caching, CDN delivery |
| Smooth scroll | JS `scrollIntoView({ behavior: 'smooth' })` | CSS `scroll-behavior: smooth` | Simpler, Phase 3 JS not needed for scroll |
| Design tokens | Repeated hex values throughout CSS | CSS custom properties in `:root` | Already the established pattern in all PIXT files |

**Key insight:** This is a no-JS phase. Every problem that seems to require JavaScript has a CSS-native solution that is already decided. The implementation challenge is discipline, not complexity.

---

## Common Pitfalls

### Pitfall 1: iOS Safari Hero Overflow

**What goes wrong:** Hero section appears taller than viewport on initial load in iOS Safari; a faint scrollbar appears on the first load, violating success criterion 3.
**Why it happens:** `100vh` on iOS Safari uses the full height including the browser chrome (URL bar), so the visible area is shorter than `100vh`. Users see content cut off or a small scroll gap.
**How to avoid:** Always write the `min-height` pair in order — `100vh` first, `100dvh` second. CSS cascade applies the last understood value.
**Warning signs:** Simulator or real device shows bottom of hero section is cropped, or page body scrolls a few pixels before content begins.

### Pitfall 2: Google Fonts Blocking Render

**What goes wrong:** Page displays with fallback fonts (Arial, sans-serif) for several seconds, then jumps to Space Grotesk — causing layout shift (CLS) and visual jarring.
**Why it happens:** Missing `display=swap` in the Google Fonts URL, or missing `preconnect` hints causing late DNS resolution.
**How to avoid:** Include both `preconnect` tags before the fonts `<link>`. Verify the URL contains `&display=swap`. `display=swap` shows fallback font immediately, swaps when loaded — users see text immediately.
**Warning signs:** DevTools network tab shows fonts loading after page is rendered; Lighthouse reports CLS from font swap.

### Pitfall 3: Hero Headline Breaks on Mobile

**What goes wrong:** 6rem headline wraps to 3 lines on 375px mobile, breaking the hero layout.
**Why it happens:** Fixed `rem` values don't scale with viewport width.
**How to avoid:** Use `clamp()` for the hero headline: `font-size: clamp(2.5rem, 7vw, 7rem)` — 2.5rem minimum on mobile, scales with viewport, caps at 7rem on large desktop.
**Warning signs:** Hero looks correct on 1280px but broken on 375px.

### Pitfall 4: Fixed Nav Covers Anchor Targets

**What goes wrong:** Clicking the CTA anchor scrolls to the target section but the fixed nav (64px) overlaps the first content of that section.
**Why it happens:** `position: fixed` elements are not part of the document flow; `scroll-behavior: smooth` scrolls to the element's top edge, which is hidden under the nav.
**How to avoid:** Add `scroll-margin-top: var(--nav-height)` to any anchor target section. Since the only anchor in Phase 1 is `#contact` (which doesn't exist yet), this pitfall is pre-empted for Phase 3 by documenting it here.
**Warning signs:** Section heading appears to start 64px below where it should.

### Pitfall 5: backdrop-filter Not Rendering

**What goes wrong:** Nav shows plain white background without blur, ruining the frosted glass effect.
**Why it happens:** `backdrop-filter` requires the element to have a semi-transparent background (not `background: #fff`). A fully opaque background hides the effect entirely.
**How to avoid:** Always use `rgba()` for the nav background: `rgba(255, 255, 255, 0.80)` not `#ffffff`. Include the `-webkit-backdrop-filter` prefix for Safari 16 and earlier.
**Warning signs:** Blur visible in Chrome but not in Safari; nav appears as solid white block.

---

## Code Examples

### Complete Google Fonts Loading Pattern

```html
<!-- Source: https://web.dev/articles/font-best-practices -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
```

### Hero Section Structure

```html
<section id="hero">
  <div class="hero__container">
    <!-- Geometric accent element (SVG or CSS shape) -->
    <div class="hero__accent" aria-hidden="true"></div>

    <!-- Text content -->
    <div class="hero__content">
      <h1 class="hero__headline">
        <!-- Placeholder copy Phase 1 — real copy from site oficial.html in Phase 2 -->
        Sua Força de<br>Trabalho Sintética
      </h1>
      <p class="hero__subtitle">
        Agentes de IA que vendem, qualificam e gerenciam sua operação 24/7.
      </p>
      <a href="#contact" class="btn btn--primary">Quero Automatizar Meu Negócio</a>
    </div>
  </div>
</section>
```

```css
/* Hero sizing — HERO-02 compliant */
#hero {
  min-height: 100vh;   /* fallback */
  min-height: 100dvh;  /* modern */
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
  padding-top: var(--nav-height); /* prevent nav overlap */
}

.hero__headline {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 7rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--color-text);
}
```

### LGPD Footer (FOOT-01)

```html
<footer>
  <div class="footer__container">
    <div class="footer__legal">
      <p class="footer__lgpd">
        Seus dados são protegidos conforme a
        <a href="#" rel="noopener">Lei Geral de Proteção de Dados (LGPD)</a>.
        Ao entrar em contato, você concorda com nossa
        <a href="#" rel="noopener">Política de Privacidade</a>.
      </p>
      <p class="footer__copy">© 2026 PIXT. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `height: 100vh` only | `min-height: 100dvh` with `100vh` fallback | Safari 15.4+ (2023), Baseline June 2025 | iOS Safari hero section renders correctly without JS |
| JS scroll polyfill | `scroll-behavior: smooth` on `html` | Safari 15.4+ (2023) | No JS required for smooth anchor navigation |
| `@import` for Google Fonts | `<link>` with two `preconnect` hints | 2020+ best practice | Faster font loading, no render blocking |
| Pixel values for hero headline | `clamp()` fluid typography | CSS4, broadly supported 2021+ | Responsive headline without media query breakpoints |

**Deprecated/outdated (present in reference files, do NOT use in `lp pixt.html`):**
- Three.js CDN: Out of scope (PROJECT.md), adds ~600KB
- GSAP/ScrollTrigger CDN: Out of scope, adds ~100KB; Phase 1 has zero animations
- Tailwind CDN: Forbidden by D-05 (single file, no frameworks)
- Lenis smooth scroll: Out of scope; CSS `scroll-behavior: smooth` is sufficient per D-08
- Dark background (`#050505`): All reference files use dark — this LP deliberately uses white per D-04

---

## Open Questions

1. **Hero geometric accent element — exact implementation**
   - What we know: D-02 says "lines, grid, or geometric shape in green/black" — a pure CSS shape vs. inline SVG
   - What's unclear: Claude's discretion per CONTEXT.md; both approaches are valid
   - Recommendation: Use inline SVG for the abstract element — crisp at all resolutions, no image requests, self-contained in the HTML file. A simple composition of rectangles and lines in `#c6f432` and `#111211`.

2. **NAV-01 partial implementation**
   - What we know: NAV-01 requires "appears on scroll up, hides on scroll down" — that is JS behavior (Phase 3)
   - What's unclear: Whether Phase 1 should include the CSS classes for hidden/visible nav state (`nav--hidden`, `nav--visible`) as preparation, or leave them for Phase 3
   - Recommendation: Include the CSS transition rules for nav show/hide (opacity + transform) as commented-out or stub classes in Phase 1. This avoids Phase 3 needing to edit the design system. Mark clearly as "activated by JS in Phase 3."

3. **Anchor target for `#contact`**
   - What we know: Both NAV-02 and HERO-01 require a CTA anchoring to the form at `#contact`; the form is Phase 3
   - What's unclear: Does the absence of the anchor target cause any visible problem in Phase 1?
   - Recommendation: Include a minimal placeholder `<section id="contact"></section>` between hero and footer in Phase 1 so the anchor link doesn't snap to the bottom of the page. Alternatively, the link href can be `href="#contact"` and silently do nothing — this is acceptable for a static skeleton phase.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 1 has no external dependencies. Output is a vanilla HTML file that opens directly in a browser. No CLI tools, runtimes, databases, or services required.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no automated test runner — single HTML file, no build step) |
| Config file | None |
| Quick run command | Open `lp pixt.html` in Chrome and Safari/iOS Simulator |
| Full suite command | Check all 5 success criteria below in Chrome + iOS Safari |

### Phase Requirements — Verification Map

| Req ID | Behavior | Test Type | Verification Method | Automatable |
|--------|----------|-----------|---------------------|-------------|
| NAV-01 | Sticky nav with frosted glass | Visual | Scroll page; nav stays at top; bg is semi-transparent | Manual |
| NAV-02 | PIXT logo + CTA anchor in nav | Visual | Logo visible; CTA `<a>` element in DOM with `href="#contact"` | Manual + DevTools |
| HERO-01 | Full-screen hero with headline/subtitle/CTA | Visual | Opens page; hero fills viewport; no scroll on first load | Manual |
| HERO-02 | `min-height: 100dvh` with `100vh` fallback | Visual | iOS Safari: hero fills full viewport, no overflow | Manual (device/simulator) |
| FOOT-01 | Footer with LGPD notice | Visual | Footer at bottom; LGPD text present with policy link | Manual |
| FOOT-02 | `scroll-behavior: smooth` on `<html>` | Functional | Click CTA anchor; page glides rather than jumps | Manual |
| FONT-01 | Google Fonts preconnect + display=swap | Network | DevTools Network tab: no render-blocking font requests | DevTools inspection |
| PERF-01 | All animations use transform/opacity only | Code | Code review: no width/height/top/left animated properties | Code review |

### Success Criteria Checklist (from phase definition)

- [ ] Opening `lp pixt.html` shows white page with Space Grotesk/Work Sans and PIXT brand colors
- [ ] Nav bar visible at top with PIXT logo and CTA anchor link
- [ ] Hero fills full viewport height on desktop and iOS Safari (no overflow, no scroll bar on first load)
- [ ] Footer present at bottom with LGPD privacy notice
- [ ] Smooth scroll active — clicking nav CTA glides to target section

### Wave 0 Gaps

None — no test infrastructure is needed. Validation is 100% manual browser inspection. The HTML file is its own deliverable; there is no test runner to configure.

---

## Sources

### Primary (HIGH confidence)
- MDN — `100dvh` / dynamic viewport units: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
- web.dev font best practices (official Google): https://web.dev/articles/font-best-practices
- Bram.us 100vh iOS Safari (canonical reference): https://www.bram.us/2020/05/06/100vh-in-safari-on-ios/
- MDN scroll-behavior compat data: https://github.com/mdn/browser-compat-data/issues/22889
- Existing project files (`pixt_novo.html`, `pxtoficial.html`) — confirmed Google Fonts weight sets and CSS custom property naming conventions

### Secondary (MEDIUM confidence)
- Savvy.co.il — dvh units explainer (verified against MDN): https://savvy.co.il/en/blog/css/css-dynamic-viewport-height-dvh/
- Kiyaanix — dvh Baseline Widely Available June 2025 claim: https://kiyaanix.com/modern-css-viewport-units-svh-lvh-dvh-a-game-changer-for-responsive-design/
- Request Metrics — Google Fonts optimization: https://requestmetrics.com/web-performance/5-tips-to-make-google-fonts-faster/

### Tertiary (LOW confidence — needs manual verification)
- None for this phase.

---

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — no external libraries; only native browser features that are established standards
- Architecture: HIGH — patterns confirmed in existing PIXT files and official documentation
- Pitfalls: HIGH — iOS Safari dvh, backdrop-filter opacity, Google Fonts blocking are all well-documented
- Validation: HIGH — manual browser testing is the only viable approach for a single vanilla HTML file

**Research date:** 2026-03-25
**Valid until:** 2027-03-25 (stable baseline browser features; no fast-moving dependencies)
