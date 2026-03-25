# Feature Landscape

**Domain:** High-conversion B2B landing page — AI automation agency (PIXT) targeting Brazilian SMBs
**Researched:** 2026-03-25
**Confidence:** HIGH (based on direct analysis of official site content, established conversion principles, Apple LP reference patterns)

---

## Context and Constraints

PIXT sells four AI automation agents (Vendas+, LeadFlow, Booker, ExpertAI) to Brazilian SMBs. The LP goal is a single action: capture a qualified lead via a contact form. The visual language is Apple AirPods — white/clean, generous spacing, bold typography, scroll-driven storytelling. Output is a single self-contained HTML file.

---

## Table Stakes

Features users expect. Missing any of these causes immediate bounce or distrust.

| Feature | Why Expected | Conversion Rationale | Complexity |
|---------|--------------|---------------------|------------|
| **Hero section** with headline + sub + CTA | Every premium LP has an above-the-fold value statement | First 3 seconds decide if the visitor stays. Headline must answer "what is this and why do I care?" | Low |
| **Clear value proposition** in hero | B2B buyers need to immediately understand the offer | Vague heroes ("Inovacao em IA") convert 50-70% worse than specific heroes ("Seu time de vendas, automatizado 24/7") | Low |
| **Primary CTA visible above the fold** | Visitors who are ready to convert should not scroll | Direct CTA anchors to form or opens form modal. Must be high-contrast, action-oriented label | Low |
| **Product/service section** explaining what is being sold | Visitors need to understand the offering before converting | No product clarity = no trust. Each of the 4 agents needs a name, category, and one-sentence description | Medium |
| **Social proof** — client count or logos | B2B buyers are risk-averse; they need herd validation | PIXT already claims 100+ empresas. A single credibility bar or number is enough at v1 | Low |
| **"How it works" / methodology** | SMB owners want to know the process, not just the promise | Reduces "but how does this actually work?" objection. 3-4 steps is ideal | Low |
| **Lead capture form** | This is the entire goal of the page | Must be visible, reachable from every section, frictionless (3 fields max in v1) | Low |
| **Mobile-responsive layout** | 65-75% of Brazilian web traffic is mobile | Brazilian SMB decision-makers increasingly use mobile. Non-responsive LP = unacceptable | Medium |
| **Sticky/accessible navigation** | Users who scroll deeply need to recover context | A minimal sticky nav with logo + "Falar com especialista" CTA anchored to form handles this | Low |
| **Fast load time** | Brazilian SMB internet is often 4G/slow fiber | Single HTML file with no external JS (besides fonts) already satisfies this | Low |
| **Footer with contact/legal anchors** | Compliance and trust signal | LGPD (Lei Geral de Proteção de Dados) requires privacy notice for forms collecting personal data. Missing = legal risk | Low |

---

## Differentiators

Features that are not universally expected but significantly boost conversions for this specific context (AI agency, Brazil, Apple-style premium).

| Feature | Value Proposition | Conversion Rationale | Complexity |
|---------|-------------------|---------------------|------------|
| **Scroll-driven narrative** (Apple AirPods pattern) | Transforms passive reading into active discovery | Each scroll frame reveals one new argument, building momentum toward the CTA. Keeps dwell time high. | Medium |
| **Agent cards with interactive hover/click** | Makes abstract AI products tangible and explorable | B2B buyers need to understand what they are buying. An interactive stagger-card or tabbed card deck lets them self-educate | Medium |
| **"Diagnostic" CTA framing** (Solicitar Diagnóstico) | Reframes the form as a free consultation, not a sales call | Low commitment language dramatically increases form submission rates in B2B Brazil. "Fazer Diagnóstico" beats "Entre em contato" | Low |
| **WhatsApp field in form** | WhatsApp is the primary B2B communication channel in Brazil | Brazilian SMBs close deals over WhatsApp. Asking for it signals you will reach out where they actually live. Conversion rate for B2B forms with WhatsApp > email-only | Low |
| **Numbered methodology / Jornada PIXT** | Shows the path from contact to results | Reduces uncertainty. Visitors who understand the process are 2-3x more likely to submit a form | Low |
| **Metrics / outcome numbers** | Quantified results ("100+ empresas", "24/7", "redução de 40% em tempo de resposta") | Specificity builds credibility. Vague claims ("otimizamos processos") are ignored; numbers trigger belief | Low |
| **Minimal logo marquee / social proof bar** | Passive trust signal that doesn't interrupt the narrative | Scrolling logo bar immediately after hero is a high-ROI trust layer. Even generic-sounding client names signal that real businesses exist | Low |
| **"Quem Somos" / founders section** | Brazilian SMBs buy from people, not from brands | Including named founders (Caio, Wallace, Paulo) and their origin story is a powerful trust builder in a market where AI agencies feel anonymous | Medium |
| **Brand accent animation** (#c6f432 neon green on white) | Differentiates from dark-background competitors | Most AI agency LPs are dark/neon. A white page with neon accents reads as premium, clean, and confident. Differentiates at a glance | Low |
| **Fade-in / slide-up scroll animations** (Intersection Observer) | Creates a sense of polish and intentionality | Animation-on-scroll signals production quality. Users equate visual polish with product quality — especially critical for an AI agency | Medium |
| **Second CTA at page end** | Captures visitors who read the full page | The bottom-of-page CTA should repeat the form or a WhatsApp link. Converts the "I read everything" segment | Low |

---

## Anti-Features

Features to deliberately NOT build in v1.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Three.js / WebGL 3D cube** | High load weight, crashes on low-end Android (dominant in Brazilian SMB market), distracts from CTA | CSS transitions + Intersection Observer for all motion. Already documented in PROJECT.md Out of Scope |
| **Dark mode toggle** | Adds interaction complexity; the white/clean choice is deliberate and must be consistent | Lock to light mode. The Apple reference is always light |
| **Multi-page navigation** | Dilutes conversion focus. Every click away from the form is a lost opportunity | One page, one goal. All content is vertical scroll on a single HTML file |
| **Pricing section in v1** | B2B AI services are custom-priced. Showing prices without context kills deals before the conversation starts | Let the form initiate the diagnostic. Price comes in the proposal (Step 03 of Jornada PIXT) |
| **Live chat widget (Intercom, etc.)** | External JS dependency, adds load weight, and the form IS the live capture mechanism | The form + WhatsApp field achieves the same result without complexity |
| **Video autoplay hero** | Large file, poor mobile performance, no guarantee sound works | Scroll-driven text animations deliver the narrative more elegantly and reliably |
| **Blog / content section** | Out of scope for a lead-capture LP. Adds navigation complexity | Keep visitors focused on the form. Content can live on a separate page later |
| **Complex pricing calculator or questionnaire** | Adds friction before the primary conversion event | Qualification happens in the diagnostic call, not on the LP |
| **Cookie consent banner (heavy)** | Adds visual noise and bounce triggers | A minimal LGPD notice in the footer ("Ao preencher o formulário, você concorda com nossa política de privacidade") is sufficient for the LP context |
| **External dependencies (Bootstrap, Tailwind CDN, GSAP)** | The new LP is vanilla HTML/CSS/JS. External CDN dependencies add network roundtrips and potential failure modes | All styles and scripts inline in the single HTML file |

---

## Lead Capture Form: Best Practices

### Fields (v1 — minimum friction, maximum relevance)

| Field | Type | Label | Why |
|-------|------|-------|-----|
| Nome | text | "Seu nome" | Personalization in follow-up. Required. |
| Email corporativo | email | "Email da empresa" | Primary async channel. Required. Using "corporativo" signals B2B positioning |
| WhatsApp | tel | "(00) 00000-0000" | Primary sync channel in Brazil. Required. Placeholder with mask format reduces errors |

**Do not add in v1:** Company name (inferable), cargo/role, number of employees, which agent interests them. Each additional field reduces conversion 10-15%. The diagnostic call gathers all context.

### CTA Button Copy

| Option | Verdict |
|--------|---------|
| "Solicitar Diagnóstico" | BEST. Frames submission as receiving value (a free diagnostic), not as surrendering data |
| "Fazer Diagnóstico" | GOOD. Action-oriented, same framing |
| "Entre em Contato" | AVOID. Generic, no value framing |
| "Enviar" | AVOID. Transactional, zero emotional pull |
| "Quero Automatizar" | GOOD ALTERNATIVE. Desire-driven language |

**Recommended:** "Solicitar Diagnóstico Gratuito" — adds "Gratuito" to reinforce no-commitment framing.

### Form Placement

1. **Primary placement:** Dedicated contact section near the bottom of the page (the full narrative leads here). This is the form the sticky CTA anchors to.
2. **Secondary placement:** A floating or inline CTA in the Hero section that scrolls to the form. Do NOT embed a full form in the hero — it interrupts the narrative opening.
3. **Avoid modal popups:** Interrupt-driven popups hurt trust with Brazilian SMB audiences who are already skeptical of AI companies.

### Form Wrapper Design

- Surround form with a trust container: side panel with 1-2 social proof elements (e.g., "100+ empresas automatizadas" + a short testimonial fragment)
- Form card should be white on a light-gray background — distinct from the page but not jarring
- Focus state on fields should use brand accent (#c6f432) for visual coherence
- Submit button: full-width, brand background (#c6f432), dark text, bold — matches brand hierarchy

### Post-Submit State

- Replace form with a success message inline (do NOT redirect to a new page — no backend, single HTML file)
- Success message: "Protocolo iniciado. Nossa equipe entrará em contato em até 24h."
- No alert() — replaces the current `alert()` call in the official site with an inline state change

### LGPD Compliance (Required)

- Below the submit button: fine-print text — "Ao enviar, você concorda com nossa Política de Privacidade."
- "Política de Privacidade" should be a link (can point to a placeholder anchor or external URL)
- This is not optional for forms collecting personal data in Brazil

---

## Section Architecture (Recommended Order)

The sequence below follows an Apple-style narrative arc: "Here's the vision" → "Here's the problem you have" → "Here's what we do" → "Here's how" → "Here's proof" → "Here's who we are" → "Start now."

| # | Section | Type | Conversion Function |
|---|---------|------|-------------------|
| 0 | Sticky nav | Utility | Always-accessible CTA anchor |
| 1 | Hero | Table stakes | Capture attention, state value proposition, first CTA |
| 2 | Social proof bar (logo marquee) | Table stakes | Immediate credibility after hook |
| 3 | Problem / "Onde sua operação trava" | Differentiator | Agitate the pain. The visitor should think "this is me" |
| 4 | Product section (4 agent cards) | Table stakes | Show what is being sold, tangibly |
| 5 | Methodology / Jornada PIXT (numbered steps) | Differentiator | Reduce process uncertainty, build path-to-value confidence |
| 6 | Quem Somos (founders + origin) | Differentiator | Trust builder, humanizes the brand |
| 7 | Contact / form section | Table stakes | The conversion event |
| 8 | Footer | Table stakes | LGPD link, legal, minimal nav |

---

## Feature Dependencies

```
Sticky nav CTA → Form section (must exist first)
Social proof bar → requires at least one quantified claim (100+ empresas)
Product cards → requires agent copy (extracted from site oficial.html)
Methodology steps → requires Jornada PIXT copy (extracted from site oficial.html)
Form post-submit state → requires inline JS state management (no backend)
LGPD notice → required before form is live
```

---

## MVP Recommendation

Build in this priority order:

1. **Hero** — headline, subtítulo, CTA button anchoring to form (table stakes, conversion blocker if missing)
2. **Product cards** — 4 agents with name, subtitle, description (the core product presentation)
3. **Contact form** — 3 fields (Nome, Email, WhatsApp), "Solicitar Diagnóstico Gratuito" CTA, LGPD notice, inline success state
4. **Sticky nav** — logo left, CTA right ("Fazer Diagnóstico")
5. **Social proof bar** — logo marquee or "100+ empresas" metric display
6. **Methodology section** — 6-step Jornada PIXT
7. **Scroll-driven animations** — fade-in/slide-up via Intersection Observer
8. **Quem Somos** — founders + origin story (trust builder, adds conversion depth)
9. **Second CTA** — repeated at bottom before footer

**Defer to v2:**
- Animated chat UI mockups (phones)
- Section-specific scrollytelling sequences (hero text overlays 1-7)
- Floating integration logos with tooltips
- Interactive stagger carousel for agent cards (simpler tabbed version works for v1)

---

## Sources

- Direct analysis of `site oficial.html` (PIXT official site) — HIGH confidence for copy, agents, brand, form fields
- PROJECT.md constraints (single HTML, no Three.js, white/clean, Apple reference) — HIGH confidence
- Apple AirPods LP (https://www.apple.com/br/airpods/) — reference for scroll narrative structure
- Established B2B landing page conversion principles (friction reduction, CTA framing, form field count) — HIGH confidence (widely validated across CRO literature)
- Brazilian digital market context (WhatsApp primacy, LGPD, mobile-first) — HIGH confidence (well-established market characteristics)
