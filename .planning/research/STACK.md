# Technology Stack

**Project:** LP PIXT — High-Conversion Apple-Style Landing Page
**Researched:** 2026-03-25
**Constraint:** Single HTML file, no build step, no frameworks

---

## Recommended Stack

### Animation Engine

| Technique | Role | Why |
|-----------|------|-----|
| Intersection Observer API | Primary scroll-reveal trigger | Baseline widely available since March 2019. Zero dependencies. Fires off the main thread. Replaces scroll event listeners entirely. |
| CSS `transition` + class toggle | Actual animation execution | GPU-composited when limited to `transform` and `opacity`. Pairs with IntersectionObserver: JS adds a class, CSS does the visual work. |
| CSS `animation-timeline: view()` | Progressive-enhancement layer only | NOT baseline as of 2026-03-25 (confirmed by MDN). Firefox support is incomplete. Use only inside `@supports (animation-timeline: view())` as an enhancement on top of the IntersectionObserver baseline. |

**Decision:** IntersectionObserver + CSS class toggle is the primary animation mechanism. CSS scroll-driven animations are additive enhancement, never the sole approach.

**Why not GSAP?** GSAP is a CDN-external dependency (violates single-file constraint unless self-hosted, adding ~75 KB). Its power is wasted on fade-in/slide-up patterns; it targets particle systems and complex timeline choreography. Overkill.

**Why not AOS (Animate on Scroll)?** AOS is a library (~10 KB JS + ~3 KB CSS). Writing 30 lines of vanilla IntersectionObserver produces identical output with zero footprint and no extra `<link>` tag. AOS also adds `data-aos` attributes that clutter the HTML.

**Why not scroll event listeners?** They fire synchronously on the main thread every pixel of scroll. IntersectionObserver hands detection to the browser's compositor thread — no jank, no throttle/debounce boilerplate.

---

### CSS Architecture

| Technique | Purpose | Why |
|-----------|---------|-----|
| CSS custom properties (variables) | Brand token system | Declare `--color-neon: #c6f432`, `--color-dark: #111211` once in `:root`. Consistent theming, easy future edits. |
| `clamp()` for fluid typography | Responsive type scale | `font-size: clamp(2.5rem, 6vw, 5rem)` scales from mobile to 4K with zero media queries. Apple uses this technique extensively. |
| CSS Grid + Flexbox | Layout | Grid for page-level sections and product card grids; Flexbox for nav, CTA rows, and component internals. No float hacks. |
| `scroll-behavior: smooth` on `html` | Smooth anchor scroll | One CSS line replaces any JS smooth-scroll library. Respected by all modern browsers. |
| `position: sticky` | Narrative sections | Creates the Apple-style "content pinned while scroll progresses" effect in feature/product sections. Native CSS, no JS. |

---

### Font Loading

| Decision | Value | Rationale |
|----------|-------|-----------|
| Fonts | Space Grotesk (display/headings) + Work Sans (body) | Already specified in PROJECT.md. Space Grotesk has the geometric, techy character matching PIXT's AI brand. Work Sans is highly legible at body sizes. |
| Loading strategy | Google Fonts `<link>` with `preconnect` + `display=swap` | Fastest path for a no-build single-file. Two `preconnect` hints (fonts.googleapis.com and fonts.gstatic.com) eliminate DNS lookup latency. `display=swap` means text renders immediately in system font, then swaps — no invisible text flash. |
| Weight range | Variable range `300..700` for both fonts | One request instead of N separate weight requests. Variable fonts are delivered by Google Fonts when the browser supports them. |
| Fallback stack | `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | `-apple-system` on macOS/iOS, `BlinkMacSystemFont` on Chrome/macOS, `Segoe UI` on Windows. Fallbacks are visually similar (geometric sans) so layout shift is minimal. |

**Why not `font-display: optional`?** Optional suppresses the swap entirely if the font doesn't load within ~100ms. For a premium brand experience this is the wrong trade-off — the distinct typographic identity IS the brand. `swap` is the correct choice for a conversion-focused LP.

**Why not self-hosting fonts?** Requires downloading font files and embedding as base64 (adds ~200–400 KB to HTML file) or hosting separately (breaks single-file constraint). Google Fonts CDN with preconnect hints is faster for real-world users who already have the font cached.

**Embed pattern (exact):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Work+Sans:wght@300..700&display=swap" rel="stylesheet">
```

---

### JavaScript

| Technique | Purpose | Why |
|-----------|---------|-----|
| Vanilla ES2020 (no transpile) | All interactivity | Single-file, no build step. Modern browsers (Chrome 80+, Firefox 75+, Safari 13.1+) all support ES2020 natively. |
| IntersectionObserver | Scroll reveal | See Animation Engine above. |
| `querySelectorAll` + `classList.add` | Animation class toggle | No jQuery, no framework. Simple and readable. |
| Native `<form>` with `FormData` | Lead capture | For a static HTML file with no backend, the form submits to a mailto: or a form service (Formspree/Netlify Forms). No JS form library needed. |
| Passive event listeners | Scroll and touch | `addEventListener('scroll', fn, { passive: true })` for any remaining scroll listeners prevents the browser from blocking compositing. |

**No JS animation library.** The entire animation need is: element enters viewport → fade in + slide up. This is 25 lines of vanilla JS. Adding a library (GSAP, Lottie, Motion One) to solve a 25-line problem adds HTTP round trips, parse time, and execution overhead.

---

### Animation Performance Rules

These are non-negotiable for achieving Apple-quality smoothness:

| Rule | Implementation | Why |
|------|---------------|-----|
| Only animate `transform` and `opacity` | Never animate `width`, `height`, `top`, `left`, `margin`, `padding` | `transform` and `opacity` are compositor-only properties — they bypass layout and paint entirely. Animating anything else triggers layout recalculation every frame (jank). |
| GPU layer promotion via `transform: translateZ(0)` | Applied to elements before animation starts | Forces browser to promote element to its own GPU compositing layer before transition begins. Eliminates the "pop" when a layer is created mid-animation. Use sparingly — only on actively animated elements. |
| `will-change` via JS, not CSS | Set on `mouseenter`/before animation, unset after | Adding `will-change: transform, opacity` to a stylesheet permanently holds GPU memory. Apply via JS only when transition is imminent, remove after `transitionend`. |
| Initial state in CSS, not JS | `opacity: 0; transform: translateY(24px)` on elements from the start | If JS sets initial state, there's a flash of visible content before JS runs. CSS guarantees elements start invisible. |
| `animation-fill-mode: forwards` | For keyframe animations | Prevents animated elements from reverting to start state after the animation completes. |
| Debounce resize handlers | `window.addEventListener('resize', debounce(fn, 150))` | Layout recalculations on every pixel of resize are expensive. 150ms debounce is imperceptible to users. |

---

### What NOT to Use

| Technology | Verdict | Reason |
|------------|---------|--------|
| Three.js / WebGL | Hard exclude — already in PROJECT.md Out of Scope | ~600 KB bundle, GPU requirements, mobile thermal throttling. Conversion pages need fast load, not demos. |
| GSAP (GreenSock) | Exclude | External CDN dependency or ~75 KB inline JS. Solves problems this project doesn't have. |
| AOS (Animate on Scroll) | Exclude | Unnecessary dependency; 30 lines of IntersectionObserver replaces it entirely. |
| ScrollMagic | Exclude | Unmaintained since ~2022. Requires GSAP or TweenMax as peer dependency. |
| Lottie / Rive | Exclude | For JSON-based vector animations. This project has no animation assets, only CSS transitions. |
| Bootstrap / Tailwind | Exclude | Single-file constraint. Adding Tailwind CDN (>90 KB) for utility classes defeats purpose. Write the 200 lines of CSS directly. |
| jQuery | Exclude | No IE support needed. Every jQuery method this project would use (`addClass`, `on`, `animate`) has a native vanilla equivalent with identical syntax. |
| React / Vue / Svelte | Hard exclude | No build step, no component system, no virtual DOM needed. Static HTML. |
| Parallax.js / rellax.js | Exclude | Parallax scrolling on mobile degrades performance and UX. Apple's own site uses sticky + opacity, not parallax. |
| `requestAnimationFrame` scroll listeners | Exclude | IntersectionObserver is the modern replacement. rAF loops that read `scrollY` force layout recalculation every frame. |

---

### Responsive Strategy

| Approach | Implementation | Why |
|----------|---------------|-----|
| Mobile-first breakpoints | Base styles for mobile, `@media (min-width: 768px)` and `(min-width: 1200px)` to enhance | Smaller CSS payload for mobile devices. Forces intentional layout thinking. |
| Fluid type with `clamp()` | No fixed font-size breakpoints | One declaration scales across all viewports. Eliminates 10+ media query overrides for typography. |
| CSS Grid `auto-fit` + `minmax` | Product cards grid | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` creates responsive columns with zero media queries. |
| `max-width` containers | 1200px centered with padding | Matches Apple's layout width. Prevents content stretching on ultra-wide screens. |
| Touch target minimum 44px | CTAs, form inputs, links | Apple HIG minimum. Prevents mis-taps on mobile. |

---

## Installation

No installation. Single HTML file. Dependencies loaded via `<link>` in `<head>`:

```html
<!-- Fonts (only external dependency) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Work+Sans:wght@300..700&display=swap" rel="stylesheet">
```

Everything else — CSS, JS, content — is inline in the file.

---

## Summary Decision Table

| Category | Choice | Confidence |
|----------|--------|------------|
| Scroll reveal | IntersectionObserver + CSS class toggle | HIGH — Baseline widely available, MDN confirmed |
| CSS scroll-driven animations | Progressive enhancement only via `@supports` | HIGH — MDN confirmed "not baseline" as of 2026-03-25 |
| Animation properties | `transform` + `opacity` only | HIGH — MDN compositor documentation confirmed |
| `will-change` usage | JS-applied on hover/before animation only | HIGH — MDN best practices confirmed |
| Font loading | Google Fonts + `preconnect` + `display=swap` | HIGH — Established best practice |
| Font weights | Variable range `300..700` | HIGH — Fewer requests, same result |
| Layout | CSS Grid + Flexbox, no framework | HIGH — Well-supported, zero footprint |
| Responsive | `clamp()` + mobile-first breakpoints | HIGH — Modern CSS, no JS needed |
| JS footprint | Vanilla ES2020, no libraries | HIGH — Project constraint aligned |

---

## Sources

- MDN: `animation-timeline` — confirms "not baseline" status, `@supports` fallback strategy
- MDN: Intersection Observer API — confirms "Baseline Widely Available" since March 2019
- MDN: `will-change` — confirms JS-applied pattern, warns against stylesheet abuse
- PROJECT.md — brand tokens, font choices, out-of-scope technologies
