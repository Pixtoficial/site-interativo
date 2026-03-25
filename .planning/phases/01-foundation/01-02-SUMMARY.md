---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [html, css, hero, footer, lgpd, responsive, svg, landing-page]

# Dependency graph
requires:
  - 01-01 (CSS design system, nav skeleton, HTML structure)
provides:
  - Full-viewport hero section with geometric SVG accent
  - Apple-style large headline with clamp() responsive scaling
  - Hero CTA button anchoring to #contact (smooth scroll)
  - LGPD-compliant footer with privacy links and copyright
  - Responsive breakpoints at 768px and 1280px
affects: [02, 03, 04]

# Tech tracking
tech-stack:
  added:
    - Inline SVG geometric accent element (no external image dependency)
    - CSS min-height 100vh/100dvh pair for iOS Safari compatibility
    - CSS clamp() for subtitle font-size fluid scaling
  patterns:
    - "iOS Safari viewport fix — 100vh fallback followed immediately by 100dvh override (same property, CSS cascade)"
    - "Geometric SVG accent — inline SVG with aria-hidden=true, opacity on wrapper, pointer-events: none"
    - "PERF-01 hero button — .btn--primary:hover uses only opacity and transform, no layout recalculation"
    - "Hero z-index layering — accent SVG at z-index 0, content at z-index 1, hero section overflow: hidden"

key-files:
  created: []
  modified:
    - lp pixt.html

key-decisions:
  - "Used inline SVG grid pattern (not CSS background) for hero accent — allows precise control over color, opacity, and shape without additional HTTP requests"
  - "Hero padding top uses calc(var(--nav-height) + var(--space-lg)) to prevent content hiding behind fixed nav"
  - "Footer links use rel=noopener without rel=noreferrer — preserves referrer analytics while preventing opener exploitation"

requirements-completed: [HERO-01, HERO-02, FOOT-01, FOOT-02]

# Metrics
duration: 2min
completed: 2026-03-25
---

# Phase 01 Plan 02: Hero Section and LGPD Footer Summary

**Full-viewport hero with 100vh/100dvh iOS fix, Apple-style clamp() headline, geometric SVG brand accent at 0.12 opacity, CTA anchoring to #contact, and LGPD footer with privacy links — zero JavaScript, PERF-01 compliant**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-25T20:25:00Z
- **Completed:** 2026-03-25T20:27:00Z
- **Tasks:** 1 of 2 (Task 2 is a human-verify checkpoint — pending user approval)
- **Files modified:** 1

## Accomplishments

- `<section id="hero">` added inside `<main>` with `min-height: 100vh` (fallback) followed by `min-height: 100dvh` (modern) in correct cascade order
- Hero flexbox centering: `display: flex; align-items: center; justify-content: center`
- `.hero__headline` uses `font-size: var(--hero-headline-size)` resolving to `clamp(2.5rem, 7vw, 7rem)` per D-03
- Headline text: "Sua Forca de Trabalho Sintetica" with line break
- Subtitle: "Agentes de IA que vendem, qualificam e gerenciam sua operacao 24/7."
- CTA button `.btn--primary` with `href="#contact"` and text "Quero Automatizar Meu Negocio"
- Inline SVG geometric grid with `aria-hidden="true"`, brand colors (`#c6f432` green lines + `#111211` dark lines + colored rectangles), wrapper at `opacity: 0.12`, `pointer-events: none`, `z-index: 0`
- `.btn--primary:hover` transitions: only `opacity` and `transform` (PERF-01 compliant)
- `<footer class="footer">` with `.footer__lgpd` paragraph containing "LGPD", links to "Lei Geral de Protecao de Dados" and "Politica de Privacidade"
- Footer copyright: "2026 PIXT. Todos os direitos reservados."
- Responsive breakpoints: `min-width: 768px` (more padding) and `min-width: 1280px` (full container-aware nav padding)
- Zero `<script>` tags in file

## Task Commits

1. **Task 1: Add hero section with geometric accent and responsive styles** - `c17d4bc` (feat)

**Plan metadata:** _(pending — waiting for human-verify checkpoint approval in Task 2)_

## Files Created/Modified

- `lp pixt.html` — Hero section, footer with LGPD notice, responsive breakpoints at 768px and 1280px added to existing file

## Decisions Made

- Used inline SVG for the geometric accent element — avoids external HTTP request, gives full CSS/attribute control over color and opacity
- Hero padding uses `calc(var(--nav-height) + var(--space-lg))` to offset fixed nav height and prevent headline from being obscured
- Footer `<a>` elements use `rel="noopener"` without `rel="noreferrer"` to prevent window opener exploitation while preserving referrer for analytics

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

- `<section id="contact"></section>` — intentional anchor target placeholder; contact form will be built in Phase 3. Smooth scroll from nav/hero CTAs functions correctly with this placeholder.

## Self-Check: PASSED

- `lp pixt.html` exists and contains all required elements (verified by automated grep checks returning PASS)
- Commit `c17d4bc` exists in git log
- 100vh at line 134, 100dvh at line 135 — correct cascade order confirmed

---

*Phase: 01-foundation*
*Completed: 2026-03-25*
