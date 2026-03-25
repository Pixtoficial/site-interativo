# Project Research Summary

**Project:** LP PIXT — High-Conversion Apple-Style Landing Page
**Domain:** Single-file B2B lead-capture landing page — AI automation agency targeting Brazilian SMBs
**Researched:** 2026-03-25
**Confidence:** HIGH

## Executive Summary

LP PIXT is a single self-contained HTML file that must perform the role of a full conversion funnel: attract attention, build trust, present four AI automation products, and capture a qualified lead via a contact form. Research consistently confirms that this type of page is built with zero external JS dependencies, using only native browser APIs (IntersectionObserver, CSS custom properties, CSS Grid/Flexbox, `position: sticky`) and a single Google Fonts request. The architectural constraint — one file, no build step — is not a limitation; it is the correct approach for a fast, deployable, maintenance-free LP.

The recommended approach follows the Apple AirPods narrative pattern: a hero that captures attention above the fold, a sticky-scroll product section that presents each agent as a cinematic scroll beat, and a single frictionless lead form that the entire page funnels toward. The CTA framing — "Solicitar Diagnóstico Gratuito" instead of "Entre em Contato" — is the highest-leverage, lowest-effort conversion lever identified in research, and must be locked in before any other copy decision. The Brazilian market context (WhatsApp primacy, LGPD compliance, mobile-first audience) adds specific requirements that are non-negotiable: WhatsApp field in the form, `font-size: 16px` on all inputs to prevent iOS Safari zoom, and a privacy notice linked from the submit button.

The top risks are all technical, not strategic. Animating the wrong CSS properties (anything other than `transform` and `opacity`) will produce jank on mid-range Android devices and destroy the premium feel. Using `100vh` without a `100dvh` fallback will break the hero on iPhones. Applying `will-change` globally rather than selectively will crash the tab on older iOS devices. All three are avoidable with one line of code each — the research documents the exact patterns to follow and the exact anti-patterns to avoid.

---

## Key Findings

### Recommended Stack

The entire stack is vanilla: Intersection Observer API as the scroll-reveal trigger, CSS class toggles for animation execution, CSS Grid and Flexbox for layout, `clamp()` for fluid typography, and ES2020 vanilla JS for all interactivity. Google Fonts (Space Grotesk + Work Sans) with `preconnect` and `display=swap` is the only external dependency. CSS scroll-driven animations (`animation-timeline: view()`) are confirmed "not baseline" as of 2026-03-25 by MDN and must only appear inside `@supports` as a progressive enhancement — never as the primary mechanism.

See `.planning/research/STACK.md` for full rationale and exclusion list.

**Core technologies:**
- IntersectionObserver API: scroll-reveal trigger — baseline widely available since 2019, fires off the main thread, replaces scroll event listeners entirely
- CSS `transition` on `transform` + `opacity` only: animation execution — GPU-composited, zero layout reflow, the only properties safe to animate at 60fps on mobile
- CSS Grid + Flexbox: layout — no framework, direct CSS handles every layout pattern the LP needs
- `clamp()` fluid typography: responsive type scale — single declaration replaces all breakpoint-based font-size overrides
- `position: sticky`: Apple-style narrative sections — CSS-native, 96%+ browser support, zero JS for the sticking behavior itself
- Google Fonts (variable range `300..700`): Space Grotesk + Work Sans — one network request, browser-cached for returning users, `display=swap` prevents FOIT
- Vanilla ES2020: all interactivity — no transpile, no framework, no jQuery; ~25 lines handles the entire animation need

**Excluded (reasons documented in STACK.md):** GSAP, AOS, ScrollMagic, Three.js/WebGL, Bootstrap, Tailwind CDN, jQuery, React/Vue/Svelte, Parallax.js, scroll event listeners for animation.

### Expected Features

Research identified a clear MVP priority stack based on conversion function and implementation complexity. The section order follows a documented AIDA funnel adapted to Apple's narrative pacing.

See `.planning/research/FEATURES.md` for full rationale, form field specifications, CTA copy options, and section architecture.

**Must have (table stakes):**
- Hero section with headline, sub, and primary CTA above the fold — first 3 seconds decide if visitors stay
- Clear value proposition specific to AI automation (not generic "Inovacao em IA") — specific heroes convert 50-70% better
- Product section presenting all 4 agents (Vendas+, LeadFlow, Booker, ExpertAI) with name, category, one-line description
- Lead capture form with exactly 3 fields: Nome, Email, WhatsApp — each additional field costs 10-15% conversion
- Sticky navigation with logo left + "Fazer Diagnóstico" CTA right — always-accessible anchor to form
- Social proof signal ("100+ empresas automatizadas") immediately after hero
- "How it works" methodology section (Jornada PIXT, 6 steps) — reduces process anxiety before the form
- Mobile-responsive layout — 65-75% of Brazilian web traffic is mobile
- Footer with LGPD privacy notice linked from form — legally required for personal data collection in Brazil
- Inline form success state (no redirect, no `alert()`) — single HTML file, no backend

**Should have (differentiators):**
- Scroll-driven narrative (Apple AirPods sticky-scroll pattern for agent section) — high dwell time, builds momentum toward CTA
- "Solicitar Diagnóstico Gratuito" CTA framing — reframes form as receiving value, not surrendering data; highest-ROI copy change
- WhatsApp field in form (not just email) — WhatsApp is the primary B2B communication channel in Brazil
- Quem Somos / founders section (Caio, Wallace, Paulo + origin story) — Brazilian SMBs buy from people, not brands
- Numbered Jornada PIXT methodology — visitors who understand the process are 2-3x more likely to submit
- Specific outcome metrics in copy ("100+ empresas", "24/7") — specificity builds belief; vague claims are ignored
- Fade-in/slide-up scroll animations via IntersectionObserver — polish signals product quality
- Second CTA at page bottom — captures the "I read everything" conversion segment
- Neon accent (#c6f432) used as a differentiator against dark-background AI agency competitors

**Defer to v2+:**
- Animated chat UI phone mockups
- Section-specific scrollytelling text overlays (hero text overlays 1-7)
- Floating integration logos with tooltips
- Interactive stagger carousel for agent cards (simple sticky-scroll version works for v1)

**Anti-features (never build):** Three.js/WebGL, dark mode toggle, multi-page navigation, pricing section, live chat widget, video autoplay hero, blog/content section, heavy cookie consent banner.

### Architecture Approach

The architecture is a flat linear stack of `<section>` elements inside a single `<main>`, with all CSS in one `<style>` block and all JS in one `<script>` at the bottom of `<body>`. There is no client-side router, no component framework, no virtual DOM. The structural centerpiece is the agents section: a tall scroll container (`height: 400vh`) whose sticky child (`position: sticky; top: 0; height: 100vh`) holds all four agent panels, with JS mapping scroll progress to a 0-3 index that toggles the `active` class. On mobile (< 768px), the sticky pattern is cancelled and panels stack vertically — the sticky scroll requires screen real estate that mobile cannot provide. All animation uses a single shared `IntersectionObserver` instance watching `[data-reveal]` and `[data-reveal-group]` attributes, firing once and calling `unobserve` immediately.

See `.planning/research/ARCHITECTURE.md` for exact CSS patterns, JS implementations, typography scale tokens, spacing system (8-point grid), color system, and documented anti-patterns.

**Major components:**
1. `<nav id="nav">` — fixed top bar, frosted glass on scroll (`.scrolled` toggled by JS at `scrollY > 60`), mobile hamburger; anchors to `#contact`
2. `<section id="hero">` — full-viewport (`100dvh` with `100vh` fallback), centered flex column, headline + sub + primary CTA
3. `<div id="agents-scroll">` — 400vh scroll track; sticky child cycles 4 agent panels via scroll-to-index mapping; JS uses `{ passive: true }` scroll listener
4. `<section id="methodology">` — 3-column grid at desktop (600px breakpoint), vertical stack on mobile
5. `<section id="contact">` — centered form (max-width 560px), 3 fields, inline success/error states, LGPD notice; JS intercepts submit, shows `.submitting` then `.submitted` state
6. `<footer>` — logo, tagline, copyright, LGPD link

### Critical Pitfalls

Research identified 6 critical pitfalls (rewrites, broken mobile, zero conversion) and 5 high-severity pitfalls. The top items to prevent:

1. **Animating layout properties (width, height, top, left, margin)** — triggers layout recalculation every frame; janks on mid-range Android. Prevention: animate only `transform` and `opacity`. This is a hard rule with zero exceptions.
2. **`100vh` on the hero section** — overflows on iOS Safari because the browser chrome is included in the calculation. Prevention: `min-height: 100vh; min-height: 100dvh` (the two-line fix is exact and documented).
3. **`will-change` applied globally** — exhausts GPU texture memory on mobile with 2-4 GB RAM, causes tab crash on older iPhones. Prevention: apply via JS only immediately before transition, remove after `transitionend`.
4. **Input `font-size` below 16px** — iOS Safari auto-zooms the page when any `input` is focused with `font-size < 16px`; the zoom does not reset, breaking the layout for the entire session. Prevention: `input, textarea, select { font-size: 16px; }` — hard minimum.
5. **`position: sticky` inside `overflow: hidden` parent** — silently breaks sticky with no error. The agents section stops sticking entirely. Prevention: never apply `overflow: hidden` to wrapper divs containing sticky children; use `overflow: clip` if visual clipping is needed.
6. **Neon accent `#c6f432` as text on white background** — contrast ratio ~1.6:1, catastrophically below WCAG AA (4.5:1). Prevention: use `#c6f432` only as background on dark elements, decorative borders, or icon fills; never as text color on white or light backgrounds.

Additional high-severity pitfalls: scroll event listener instead of IntersectionObserver (Pitfall 1), IntersectionObserver that doesn't call `unobserve` causing re-animation on back-scroll (Pitfall 8), Google Fonts FOIT on slow connections without `display=swap` and `preconnect` (Pitfall 9), missing `prefers-reduced-motion` media query (Pitfall 10), anchor CTA scrolling behind sticky header without `scroll-margin-top` on `#contact` (Pitfall 13).

---

## Implications for Roadmap

Based on combined research, the LP can be built in 4 well-defined phases. Phase dependencies are strict: the document structure and CSS foundation must exist before any component can be built; the form must exist before the sticky nav CTA is wired; scroll animations are additive last. All phases are buildable without research — patterns are fully documented.

### Phase 1: Document Foundation + Design System
**Rationale:** Every subsequent component depends on this layer. CSS custom properties, spacing tokens, typography scale, the container system, and the global reset must exist before any section is built. Setting this up correctly prevents token drift and ensures every section shares the same visual language from the start.
**Delivers:** A valid HTML5 document with all `:root` tokens defined (colors, spacing, typography), Google Fonts loaded with `preconnect` + `display=swap`, global reset, `.container` class, and responsive breakpoint strategy.
**Addresses:** Stack decision (CSS custom properties, clamp(), variable fonts), Architecture (document shape, container system)
**Avoids:** CSS custom properties not defined before use (Pitfall 16), font FOIT (Pitfall 9), `transition: all` performance tax (Pitfall 18)
**Research flag:** None — well-documented patterns, skip research-phase.

### Phase 2: Static Section Structure (HTML + CSS Layout Only)
**Rationale:** Build all sections as static, unanimated HTML before adding any interactivity. This separates layout concerns from behavior concerns, makes each section independently testable, and surfaces responsive layout issues early.
**Delivers:** All 8 sections rendered correctly on mobile and desktop: nav, hero, social proof bar, product section (static agent cards), methodology, Quem Somos, contact form, footer. Mobile-first breakpoints applied. `100dvh` hero fix applied. `scroll-margin-top` on `#contact`. Input `font-size: 16px` enforced. Accent color used only as background on dark elements, never as text on white. LGPD notice present below submit button.
**Addresses:** Table stakes features (Hero, Product section, Methodology, Form, Nav, Footer), FEATURES.md section order (AIDA funnel), ARCHITECTURE.md layout patterns
**Avoids:** `100vh` iOS Safari overflow (Pitfall 4), input font-size zoom (Pitfall 6), neon accent contrast failure (Pitfall 15), sticky header covering anchor (Pitfall 13), tap targets below 44px (Pitfall 11)
**Research flag:** None — layout patterns are fully specified in ARCHITECTURE.md.

### Phase 3: Interactivity + Form Handling
**Rationale:** Add JS behavior after all static structure is confirmed correct. JS is additive — it must not be required for the page to render. This phase wires the three JS systems: nav scroll state, agents sticky-scroll panel switcher, and form submit handler.
**Delivers:** Frosted glass nav on scroll; sticky agents section with scroll-to-index panel switching, dot navigation, and mobile fallback (sticky cancelled at < 768px); contact form with client-side validation, inline `.submitting` / `.submitted` states, and "Protocolo iniciado" success message. `{ passive: true }` on all scroll listeners.
**Addresses:** Agents sticky-scroll differentiator, form post-submit state (no redirect, no `alert()`), nav CTA wired to `#contact`
**Avoids:** Scroll listener triggering layout recalculation (Pitfall 1), `position: sticky` broken by `overflow: hidden` (Pitfall 7), form submit with no feedback (Pitfall 14), scroll-snap conflicts (Pitfall 5), passive event listener omission
**Research flag:** None — exact JS implementation is documented in ARCHITECTURE.md.

### Phase 4: Scroll Animations + Polish
**Rationale:** Animation is additive polish applied last, after all content and behavior are confirmed working. Adding animation before structure is stable creates debugging confusion. All animation must respect `prefers-reduced-motion`.
**Delivers:** Single shared `IntersectionObserver` watching all `[data-reveal]` and `[data-reveal-group]` elements; `unobserve` called after first intersection (one-shot); stagger delay for grouped children (0/80/160/240ms); `prefers-reduced-motion` media query wrapping all `transform` animations; `will-change` applied via JS only on animating elements, removed after `transitionend`; button hover effects (translateY(-2px) + accent shadow); agent card hover (translateY(-6px) + shadow). CSS scroll-driven animations (`animation-timeline: view()`) added inside `@supports` as progressive enhancement only.
**Addresses:** Scroll animation differentiator, visual polish as trust signal, progressive enhancement for modern browsers
**Avoids:** Animating layout properties (Pitfall 2), overusing `will-change` (Pitfall 3), IntersectionObserver re-animation on back-scroll (Pitfall 8), `prefers-reduced-motion` ignored (Pitfall 10), multiple observer instances (Architecture Anti-Pattern 3)
**Research flag:** None — full implementation with exact CSS and JS is documented in ARCHITECTURE.md.

### Phase Ordering Rationale

- Foundation before sections: CSS tokens must be defined before any component references `var(--color-accent)` or spacing variables.
- Static layout before JS: Confirms responsive behavior and content accuracy without the debugging complexity of animation states.
- Interactivity before animation: The form and nav behavior are conversion-critical; animation is enhancement. If a deadline cuts a phase, Phase 4 is the safe cut.
- Animation last: The IntersectionObserver system depends on knowing which elements exist in the DOM — building it after all sections are finalized avoids re-observation churn.

### Research Flags

Phases with standard patterns (skip research-phase for all phases):
- **Phase 1:** CSS foundation patterns are universally documented and stable.
- **Phase 2:** Section layouts follow directly from ARCHITECTURE.md specifications with exact CSS provided.
- **Phase 3:** JS patterns (IntersectionObserver, scroll handler, form handling) are fully specified with working code in ARCHITECTURE.md.
- **Phase 4:** Animation system is fully specified in ARCHITECTURE.md and STACK.md; `@supports` pattern for CSS scroll-driven animation is confirmed.

No phase requires `/gsd:research-phase` — all technical decisions are resolved by the research files.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All decisions verified against MDN; IntersectionObserver baseline confirmed; `animation-timeline` not-baseline confirmed; `will-change` best practice confirmed |
| Features | HIGH | Based on direct analysis of existing `site oficial.html`, established CRO principles, Apple AirPods LP reference, and well-documented Brazilian digital market characteristics |
| Architecture | HIGH | Derived from direct inspection of existing HTML files in the project codebase; Apple.com DOM analysis for sticky/clamp/pill-button patterns; exact CSS and JS provided |
| Pitfalls | HIGH (technical) / MEDIUM (conversion) | Technical pitfalls (browser rendering behavior) are HIGH — spec-level facts. Conversion pitfall estimates (50-70% worse, 2-3x more likely) are MEDIUM — broadly validated CRO literature, not project-specific data |

**Overall confidence:** HIGH

### Gaps to Address

- **Form endpoint:** The form currently has no backend. Research documents JS intercept with inline success state, but the actual lead data goes nowhere in v1. A Formspree, Netlify Forms, or similar static-form endpoint should be decided before the page goes live. This is not a build blocker — hook it up in Phase 3 as a `fetch` POST replacing the `setTimeout` stub.
- **Agent copy accuracy:** Product section content (agent names, descriptions, features) must be extracted from `site oficial.html` before Phase 2. Research confirms the 4 agents (Vendas+, LeadFlow, Booker, ExpertAI) exist but copy finalization depends on client approval.
- **Founders content:** The Quem Somos section requires names, photos or illustrations, and origin story copy for Caio, Wallace, and Paulo. If this content is not available at build time, the section should be stubbed with placeholder structure and populated in Phase 2 when content is confirmed.
- **CSS scroll-driven animation verification:** The `@supports (animation-timeline: view())` progressive enhancement layer is confirmed as the correct approach, but the exact scroll-linked animation behavior should be verified in a browser test during Phase 4 given the "not baseline" status.

---

## Sources

### Primary (HIGH confidence)
- MDN Web Docs: IntersectionObserver API — "Baseline Widely Available" since March 2019 confirmed
- MDN Web Docs: `animation-timeline` — "not baseline" as of 2026-03-25 confirmed; `@supports` fallback pattern
- MDN Web Docs: `will-change` — JS-applied pattern confirmed; stylesheet abuse warning documented
- Direct inspection of `site oficial.html`, `pixt_landing.html`, `pixt_experience.html`, `solais_clone.html` — existing codebase patterns
- PROJECT.md — brand tokens, font choices, out-of-scope technologies, single-file constraint
- Apple HIG: 44pt minimum tap target
- WCAG 2.1 SC 1.4.3 (contrast), SC 2.3.3 (animation from interactions)

### Secondary (MEDIUM confidence)
- Apple.com DOM structure analysis — sticky scroll pattern, typography scale, pill buttons, off-white surface (#f5f5f7)
- Apple AirPods LP (apple.com/br/airpods/) — scroll narrative structure reference
- Established B2B CRO literature — form field count impact, CTA framing, diagnostic vs. contact language
- Brazilian digital market characteristics — WhatsApp B2B primacy, LGPD requirements, mobile-first traffic share
- caniuse (2025 data) — CSS `animation-timeline: scroll()` support; `position: sticky` 96%+

### Tertiary (LOW confidence)
- Conversion rate estimates ("50-70% worse", "2-3x more likely") — broadly cited in CRO literature but not project-specific measurements; treat as directional, not precise

---
*Research completed: 2026-03-25*
*Ready for roadmap: yes*
