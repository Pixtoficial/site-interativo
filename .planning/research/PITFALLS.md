# Domain Pitfalls: Apple-Style Animated Landing Pages (Single HTML File)

**Domain:** Scroll-driven animated landing page — single file, vanilla HTML/CSS/JS, mobile-first
**Project:** LP PIXT
**Researched:** 2026-03-25
**Confidence:** HIGH for rendering/layout mechanics | MEDIUM for conversion patterns


---

## Critical Pitfalls

Mistakes that cause rewrites, broken mobile experiences, or zero conversions.

---

### Pitfall 1: Triggering Layout/Paint on Every Scroll Event

**Severity:** CRITICAL

**What goes wrong:** Attaching a `scroll` event listener and reading layout properties (`offsetTop`, `getBoundingClientRect()`, `scrollY`) inside the handler forces the browser to flush pending style recalculations synchronously. On a 60hz mobile CPU this produces consistent jank — the animation hitches every few frames.

**Why it happens:** Developers reach for `window.addEventListener('scroll', handler)` because it feels natural. Reading geometry inside the handler creates a read-after-write cycle (forced reflow).

**Consequences:** Scroll feels sticky and laggy. On mid-range Android devices this is immediately noticeable. Apple-style smoothness is destroyed.

**Prevention:**
- Use `IntersectionObserver` for element visibility triggers instead of scroll listeners.
- If a scroll listener is truly needed (e.g., parallax progress), read geometry *before* the scroll event using a cached value, and write only `transform` / `opacity` (compositor-only properties).
- Wrap writes in `requestAnimationFrame` to batch them.

```js
// BAD — forces reflow every pixel
window.addEventListener('scroll', () => {
  const top = element.getBoundingClientRect().top; // forced layout
  element.style.opacity = top / 300;
});

// GOOD — IntersectionObserver for show/hide animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
}, { threshold: 0.15 });
document.querySelectorAll('.animate').forEach(el => observer.observe(el));
```

**Detection:** DevTools Performance panel → look for "Recalculate Style" and "Layout" events that repeat with every scroll frame.

---

### Pitfall 2: Animating Properties That Trigger Paint (width, height, top, left, margin)

**Severity:** CRITICAL

**What goes wrong:** Animating `height`, `width`, `margin`, `padding`, `top`, `left`, `right`, `bottom`, `border-width`, or `background-color` triggers layout recalculation and pixel repaint on every frame. On mobile this causes dropped frames even on modern hardware.

**Why it happens:** It looks correct in DevTools on desktop. The problem surfaces on constrained GPU/CPU devices (mid-range Android, old iPhones).

**Consequences:** Frame drops. Janky scroll. The premium feel disappears.

**Prevention:** Animate *only* `transform` and `opacity`. Both run on the GPU compositor thread and never block the main thread.

```css
/* BAD */
.card { transition: margin-top 0.4s ease; }
.card.visible { margin-top: 0; }

/* GOOD */
.card { opacity: 0; transform: translateY(32px); transition: opacity 0.5s ease, transform 0.5s ease; }
.card.visible { opacity: 1; transform: translateY(0); }
```

Add `will-change: transform, opacity` to elements that will animate — but only to those elements, not globally (see Pitfall 3).

**Detection:** DevTools Layers panel → green flashes indicate repaints.

---

### Pitfall 3: Overusing `will-change` or `transform: translateZ(0)`

**Severity:** CRITICAL (memory-side)

**What goes wrong:** Applying `will-change: transform` or the old `transform: translateZ(0)` hack to every section or every card promotes each element to its own GPU layer. On mobile with 2–4 GB RAM shared with the OS, this exhausts the GPU texture memory budget and causes the browser to crash-reload the tab or drop to 1–2 fps while it flushes layers.

**Why it happens:** Developers learn that `will-change` fixes animation jank, then apply it defensively to everything.

**Consequences:** Tab crash on iOS Safari on older devices. Catastrophic performance degradation that looks like a bug in the page.

**Prevention:** Apply `will-change` only immediately before an animation starts (via JS class toggle) and remove it immediately after the animation ends.

```js
el.addEventListener('transitionstart', () => el.style.willChange = 'transform, opacity');
el.addEventListener('transitionend', () => el.style.willChange = 'auto');
```

Alternatively, only add `will-change` to elements currently in the viewport.

**Detection:** DevTools Memory → "GPU memory usage" spike. Layers panel shows excessive layer count.

---

### Pitfall 4: `100vh` Breaks on Mobile Browsers (iOS Safari, Chrome Android)

**Severity:** CRITICAL for mobile UX

**What goes wrong:** `100vh` on mobile browsers includes the browser chrome (address bar, navigation bar) in its calculation, but the actual visible viewport is smaller. On iOS Safari, the address bar shrinks when scrolling, so `100vh` is a *different height* when the page first loads vs. when the user scrolls. Hero sections with `height: 100vh` will overflow or show scroll bars on first load.

**Why it happens:** The CSS `vh` unit is defined as 1% of the "initial containing block height," which on iOS Safari is computed with the collapsed toolbar state — not the current visible state.

**Consequences:** Hero section is taller than the visible viewport on initial load. On iPhones with notches, content is clipped. CTA button may be hidden below the fold.

**Prevention:** Use the CSS `dvh` unit (dynamic viewport height) which adjusts to the actual visible viewport:

```css
/* Fallback for older browsers, then override */
.hero {
  min-height: 100vh;
  min-height: 100dvh; /* Supported in Safari 15.4+, Chrome 108+ */
}
```

For absolute minimum compatibility, use a JS snippet to set a `--vh` CSS custom property:

```js
function setVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVH();
window.addEventListener('resize', setVH);
// Usage in CSS: height: calc(var(--vh, 1vh) * 100);
```

**Detection:** Test on a physical iPhone with Safari. The hero section will visually overflow or show scroll indicators on page load.

---

### Pitfall 5: Scroll-Snap Conflicts with Programmatic Smooth Scroll

**Severity:** HIGH

**What goes wrong:** Mixing `scroll-behavior: smooth` on `html` with `scroll-snap-type` on a container, and also calling `element.scrollIntoView({ behavior: 'smooth' })` from JS, causes competing scroll controllers. iOS Safari in particular will interrupt or ignore one of the scroll commands, producing no animation or a jarring jump.

**Why it happens:** Apple-style pages sometimes use sticky/snap sections for a "cinematic" effect. Developers add smooth scroll for anchor CTAs on top of this.

**Consequences:** Clicking the CTA does nothing, or snaps instantly with no animation. On iOS the page may get "stuck" at a snap point and refuse further scrolling.

**Prevention:** Choose one scroll mechanism per page. For a conversion-focused LP:
- Use `scroll-behavior: smooth` globally for anchor links.
- Avoid `scroll-snap-type` — use sticky sections with `position: sticky` instead.
- If snap is needed, use only the JS `scrollIntoView` path and remove `scroll-behavior: smooth` from CSS.

---

### Pitfall 6: Form Fields Zoom the Page on iOS When Font Size < 16px

**Severity:** CRITICAL for conversion

**What goes wrong:** iOS Safari automatically zooms the page when a form input receives focus if the input's computed `font-size` is less than 16px. This zoom does not reset after the field is blurred, leaving the page zoomed in and breaking the layout for the rest of the user session.

**Why it happens:** Apple's documented anti-pattern-prevention behavior. It exists to make small inputs usable, but it fires even if the design is intentionally smaller.

**Consequences:** After the user taps the Name field, the entire page is zoomed to ~150%. The form looks broken. Most users do not know how to zoom back out. Conversion drops dramatically.

**Prevention:** Ensure all `input`, `textarea`, and `select` elements have `font-size: 16px` or larger. This is the single most reliable fix.

```css
input, textarea, select {
  font-size: 16px; /* Minimum — do not go below this on mobile */
}
```

Do NOT suppress zoom globally with `user-scalable=no` in the viewport meta tag — this breaks accessibility and violates WCAG 1.4.4.

**Detection:** Open the form on a physical iPhone, tap the first input. If the page zooms, the font is too small.

---

## High-Severity Pitfalls

---

### Pitfall 7: `position: sticky` Inside `overflow: hidden` Parent

**Severity:** HIGH

**What goes wrong:** `position: sticky` silently stops working when any ancestor element has `overflow: hidden`, `overflow: auto`, or `overflow: scroll` set. There is no error or warning — the element simply behaves as `position: relative`.

**Why it happens:** The spec requires sticky elements to be constrained within their scroll container. An `overflow` ancestor creates a new scroll container that conflicts with the sticky behavior.

**Consequences:** Section headers stop sticking. The "Apple-style scrolling narrative" breaks completely with no visual indication of why.

**Prevention:** Never apply `overflow: hidden` to wrapper divs that contain sticky children. Use `clip-path` or `border-radius` with `overflow: clip` as an alternative for visual clipping effects that does not create a scroll container.

**Detection:** Add a 1px red border to the sticky element and scroll — if it stops sticking before reaching the top of the viewport, check all ancestors for `overflow`.

---

### Pitfall 8: IntersectionObserver Fires Once and Animation Replays on Back-Scroll

**Severity:** HIGH (UX regression)

**What goes wrong:** The default IntersectionObserver pattern toggles a `.visible` class when an element enters the viewport. If `observer.unobserve(entry.target)` is not called after the first trigger, the animation replays every time the user scrolls back up and then down again. Apple pages do not re-animate elements the user has already seen.

**Alternatively:** Calling `unobserve` immediately means elements that were pre-rendered offscreen (e.g., on fast scroll) never animate.

**Why it happens:** Tutorials show the bare-minimum observer pattern without addressing re-entry.

**Prevention:** Call `unobserve` after first intersection (for one-shot animations). For sections that should re-animate on re-entry, use a threshold and direction check.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // one-shot: never re-animate
    }
  });
}, { threshold: 0.15 });
```

---

### Pitfall 9: Google Fonts External Dependency Breaks Offline / Slow Connections

**Severity:** HIGH for perceived performance

**What goes wrong:** Loading Space Grotesk and Work Sans from Google Fonts with a standard `<link>` tag blocks rendering until the fonts load. On a slow 3G connection, the page shows invisible text for 2–4 seconds (FOIT — Flash of Invisible Text). On offline or corporate proxies that block Google, fonts never load and the entire typographic hierarchy collapses.

**Why it happens:** The project requirement specifies "no external dependencies except fonts," implying an external font CDN call.

**Consequences:** The "premium first impression" goal is directly undermined. Apple.com self-hosts all fonts precisely to avoid this.

**Prevention:**
- Add `font-display: swap` to the Google Fonts URL query string (`&display=swap`). This shows fallback text immediately and swaps in the custom font when loaded.
- Preconnect to Google Fonts origin: `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`.
- For maximum reliability, base64-encode the font subsets and embed them as `@font-face` data URIs in the single HTML file (increases file size ~80KB but eliminates the external dependency entirely).

```html
<!-- Minimum viable approach -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Work+Sans:wght@400;500&display=swap" rel="stylesheet">
```

**Detection:** Chrome DevTools → Network tab → throttle to "Slow 3G" → reload. Observe text visibility during load.

---

### Pitfall 10: `prefers-reduced-motion` Ignored — Accessibility Violation

**Severity:** HIGH (accessibility + legal in some jurisdictions)

**What goes wrong:** All scroll animations play for every user, including those with vestibular disorders (motion sickness, vertigo) who have enabled the OS-level "Reduce Motion" setting. Fade-in animations are generally acceptable; parallax, large translations, and slide effects are not.

**Why it happens:** Accessibility is not considered during initial development.

**Consequences:** Users with motion sensitivity leave immediately. In some markets (EU, US ADA), excluding users with disabilities from a commercial service is actionable. WCAG 2.1 SC 2.3.3 (Level AAA) recommends respecting this preference.

**Prevention:** Wrap all animation CSS in a media query check. Make the no-animation version the default; apply animations only when the user has NOT requested reduced motion.

```css
/* Default: no motion */
.animate { opacity: 0; }
.animate.visible { opacity: 1; transition: opacity 0.4s ease; }

/* Only add transform animations for users who accept motion */
@media (prefers-reduced-motion: no-preference) {
  .animate { transform: translateY(24px); }
  .animate.visible { transform: translateY(0); transition: opacity 0.5s ease, transform 0.6s ease; }
}
```

---

### Pitfall 11: Click/Tap Target Below 44×44px on Mobile

**Severity:** HIGH for conversion

**What goes wrong:** CTA buttons, nav links, and form labels that are visually small but have small hit areas require precise tapping. On mobile, users miss the target 20–40% of the time. Apple's Human Interface Guidelines specify a minimum tap target of 44×44 points.

**Why it happens:** Desktop designs look fine on screen but the tap area is not explicitly set for mobile.

**Prevention:**
```css
.cta-button {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 24px;
}
/* For text links or small icons, extend the hit area invisibly */
.nav-link {
  padding: 12px 8px;
}
```

---

## Moderate Pitfalls

---

### Pitfall 12: Single HTML File File Size Bloat

**Severity:** MEDIUM

**What goes wrong:** Embedding all CSS, JS, and potentially base64-encoded fonts in one HTML file can push the file to 500KB–2MB. This is a single blocking request with no caching benefit (every revisit re-downloads everything).

**Prevention:**
- Keep CSS lean — avoid reset libraries, use only what is needed.
- Minify inline CSS and JS before final delivery (manual or via a one-off build step).
- Use Google Fonts CDN (with `display=swap`) rather than embedding fonts, unless offline support is required.
- Target: file under 150KB uncompressed for acceptable mobile load time on 4G.

---

### Pitfall 13: Sticky Header Covers Anchor Jump Targets

**Severity:** MEDIUM

**What goes wrong:** When a user clicks a CTA anchor (`href="#contact"`) and a sticky header exists, the browser scrolls the target element to the very top of the viewport — behind the sticky header. The section heading is hidden.

**Prevention:**
```css
/* Offset anchor targets by header height */
#contact {
  scroll-margin-top: 80px; /* Match your sticky header height */
}
```

---

### Pitfall 14: Form Submit Has No Loading State or Error Feedback

**Severity:** MEDIUM for conversion

**What goes wrong:** Since there is no backend (static HTML only), the form submit either does nothing visible or requires a third-party form service (e.g., Formspree, Netlify Forms). Without a clear "Sent!" confirmation, users re-submit multiple times or assume it failed.

**Prevention:**
- Even for a mailto fallback or a third-party POST, add a JS submit handler that disables the button, shows "Enviando..." and then shows a success or error state.
- Validate fields client-side before submit (required, email format) with visible inline error messages — not browser default alert boxes.

```js
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;
  // POST logic here
  submitBtn.textContent = 'Enviado!';
  form.reset();
});
```

---

### Pitfall 15: Text Contrast Fails on White Background with Neon Accent

**Severity:** MEDIUM (accessibility + trust)

**What goes wrong:** PIXT's brand accent is `#c6f432` (neon yellow-green). Used as text color on a white (`#ffffff`) background, the contrast ratio is approximately 1.6:1 — catastrophically below WCAG AA requirement of 4.5:1 for normal text and 3:1 for large text. The color is fine as a background or decorative accent, but illegal as text on white.

**Prevention:**
- Use `#c6f432` only as: background on dark (`#111211`) elements, decorative borders, icon fills, or bullet accents.
- Body text: `#111211` (black) on white — contrast ~18:1, fully compliant.
- Secondary text: `#444444` on white — contrast ~9.7:1, compliant.
- Never use `#c6f432` as text color on a white or light background.

**Detection:** Run the page through WebAIM Contrast Checker or browser DevTools accessibility audit.

---

## Minor Pitfalls

---

### Pitfall 16: CSS Custom Properties Not Defined Before Use

**Severity:** LOW

**What goes wrong:** In a single-file document where the `<style>` block references `var(--color-accent)` but the `:root {}` block defining it comes later in the document, older browsers may render with no color. Modern browsers handle this correctly, but document order still matters for maintainability.

**Prevention:** Define all CSS custom properties at the top of the `<style>` block in `:root {}`.

---

### Pitfall 17: JS `DOMContentLoaded` Not Awaited Before DOM Queries

**Severity:** LOW

**What goes wrong:** Inline `<script>` blocks in `<head>` that query DOM elements will find nothing if the elements have not been parsed yet.

**Prevention:** Place `<script>` tags at the end of `<body>`, or wrap code in `document.addEventListener('DOMContentLoaded', () => { ... })`.

---

### Pitfall 18: `transition` on All Properties is a Performance Tax

**Severity:** LOW-MEDIUM

**What goes wrong:** `transition: all 0.3s ease` is a common shortcut but it causes the browser to watch every CSS property on that element for changes. If any style is updated programmatically (e.g., a JS class toggle that changes many properties), this creates unnecessary composite work.

**Prevention:** Always specify the exact properties: `transition: opacity 0.4s ease, transform 0.5s ease`.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Hero section | `100vh` overflow on iOS Safari | Use `100dvh` with `100vh` fallback |
| Hero section | Neon accent `#c6f432` as text | Use only on dark backgrounds |
| Scroll animations | Scroll listener instead of IntersectionObserver | Use IO with `unobserve` after first trigger |
| Scroll animations | Animating non-compositor properties | Only animate `transform` + `opacity` |
| Product cards | `will-change` applied to all cards | Apply only to animating card, remove after transition |
| Sticky sections | `overflow: hidden` on wrapper breaking sticky | Audit all wrappers; use `overflow: clip` if needed |
| Contact form | Input `font-size` below 16px | Hard minimum 16px on all inputs |
| Contact form | No submit feedback state | JS handler for loading/success/error states |
| Contact form | Anchor CTA scrolls behind sticky header | Use `scroll-margin-top` on `#contact` |
| Fonts | FOIT on slow connections | Add `display=swap`, preconnect to fonts.gstatic.com |
| Accessibility | No `prefers-reduced-motion` handling | CSS media query wrapping all transform animations |
| Mobile general | Tap targets under 44px | Minimum `min-height: 48px` on all interactive elements |

---

## Sources

All findings are based on well-established browser rendering behavior documented in:

- MDN Web Docs: IntersectionObserver API, CSS `will-change`, `position: sticky`, `scroll-margin-top`, `prefers-reduced-motion`
- CSS Working Group specification for `overflow: clip` vs `overflow: hidden` and stacking context
- Apple Human Interface Guidelines: 44pt minimum tap target
- WCAG 2.1 SC 1.4.3 (contrast), SC 1.4.4 (resize text), SC 2.3.3 (animation from interactions)
- Chromium bug tracker: documented iOS Safari `100vh` toolbar behavior
- Google Web Fundamentals (archived): compositor-only animation properties

**Confidence note:** Pitfalls 1–11 are HIGH confidence (browser spec behavior, verified by established engineering resources). Pitfalls 12–18 are MEDIUM confidence (best practice conventions with broad but not formally-specified basis).
