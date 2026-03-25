# Roadmap: LP PIXT

## Overview

LP PIXT is a single-file, vanilla HTML/CSS/JS landing page built to convert visitors into qualified leads for PIXT, an AI automation agency. The build follows a strict dependency chain: design tokens and document structure must exist before any section is built; all sections must be static and verified before interactivity is layered on; interactivity must be stable before scroll animations are added. The result is one deployable file — `lp pixt.html` — that opens directly in the browser with no build step.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - CSS design system, document skeleton, nav + hero + footer
- [ ] **Phase 2: Content Sections** - PIXT sticky scroll, agent cards, social proof bar, methodology section
- [ ] **Phase 3: Form + Interactivity** - Contact form with validation, inline success state, sticky nav JS, agents panel switcher
- [ ] **Phase 4: Animations + Polish** - IntersectionObserver fade-ins, parallax hero, hover effects, prefers-reduced-motion

## Phase Details

### Phase 1: Foundation
**Goal**: A valid, browsable HTML document exists with the complete design system and structural skeleton — nav, hero, and footer render correctly on mobile and desktop
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, HERO-01, HERO-02, FOOT-01, FOOT-02, FONT-01, PERF-01
**Success Criteria** (what must be TRUE):
  1. Opening `lp pixt.html` in the browser shows a white page with Space Grotesk/Work Sans typography and PIXT brand colors applied correctly
  2. The nav bar is visible at the top of the page with the PIXT logo and a CTA anchor link
  3. The hero section fills the full viewport height on both desktop and iOS Safari (no overflow, no scroll bar on first load)
  4. The footer is present at the bottom of the page with an LGPD privacy notice
  5. Smooth scroll is active — clicking the nav CTA anchor glides to the target section without a hard jump
**Plans**: TBD
**UI hint**: yes

### Phase 2: Content Sections
**Goal**: All content sections are rendered correctly as static HTML — the complete page narrative from "O que e a PIXT" through agent cards, social proof, and methodology is visible and responsive on all target viewports
**Depends on**: Phase 1
**Requirements**: PIXT-01, PIXT-02, AGENT-01, AGENT-02, PROOF-01, METO-01, RESP-01
**Success Criteria** (what must be TRUE):
  1. The "O que e a PIXT" section is visible with its content, and the sticky panel structure is present in the DOM (even if not yet interactive)
  2. All four agent cards (Vendas+, LeadFlow, Booker, ExpertAI) render with name, role, and description sourced from `site oficial.html`
  3. The social proof bar displays at least one metric from `site oficial.html`
  4. The methodology section shows the 3-step Jornada PIXT in a horizontal grid on desktop and stacked vertically on mobile
  5. The layout is correct and content is readable at 375px, 768px, and 1280px viewport widths
**Plans**: TBD
**UI hint**: yes

### Phase 3: Form + Interactivity
**Goal**: All JavaScript behavior is wired and working — the contact form captures and validates input with inline feedback, the sticky nav responds to scroll, and the agents section switches panels as the user scrolls
**Depends on**: Phase 2
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06
**Success Criteria** (what must be TRUE):
  1. The contact form has four fields (Nome, E-mail, WhatsApp, Empresa) and a submit button labeled "Quero Automatizar Meu Negocio"
  2. Submitting the form with an invalid email shows an inline error message below the e-mail field — no browser alert dialog appears
  3. Submitting a valid form replaces the form with a success message in place (no page reload or redirect)
  4. The nav gains a frosted-glass background after the user scrolls past 60px and loses it when back at the top
  5. On desktop (768px+), the agents section switches between the four agent panels as the user scrolls through the section; on mobile the panels stack vertically
**Plans**: TBD
**UI hint**: yes

### Phase 4: Animations + Polish
**Goal**: The page delivers a premium visual experience — scroll-triggered fade-ins, a subtle parallax on the hero, and hover micro-interactions are all working, and the experience degrades gracefully for users who prefer reduced motion
**Depends on**: Phase 3
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04, PERF-02
**Success Criteria** (what must be TRUE):
  1. Scrolling down the page causes section elements to fade in and slide up as they enter the viewport — each animation fires once and does not repeat on back-scroll
  2. The hero section shows a subtle vertical parallax effect as the user scrolls past it
  3. Hovering over a CTA button produces a visible scale/color transition; hovering over an agent card lifts it slightly with a shadow
  4. With "Reduce Motion" enabled in OS settings, the page loads fully visible with no transform animations — only opacity fades remain at most
  5. `will-change` is not permanently applied to any element in CSS; it is applied and removed dynamically during active transitions only
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/? | Not started | - |
| 2. Content Sections | 0/? | Not started | - |
| 3. Form + Interactivity | 0/? | Not started | - |
| 4. Animations + Polish | 0/? | Not started | - |
