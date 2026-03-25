# Requirements: LP PIXT

**Defined:** 2026-03-25
**Core Value:** Converter visitantes em leads qualificados através de uma experiência visual premium que transmite a seriedade e inovação da PIXT no primeiro scroll.

## v1 Requirements

### Estrutura e Navegação

- [x] **NAV-01**: Barra de navegação sticky com fundo fosco (backdrop-filter) que aparece ao rolar para cima e some ao rolar para baixo
- [x] **NAV-02**: Logo PIXT e âncora para o formulário no nav
- [x] **HERO-01**: Seção hero full-screen com headline impactante, subtítulo e botão CTA que ancora no formulário
- [x] **HERO-02**: Hero usa `min-height: 100dvh` com fallback `100vh` para compatibilidade iOS Safari
- [x] **FOOT-01**: Footer com aviso de privacidade LGPD e link para política (requisito legal BR)
- [x] **FOOT-02**: Smooth scroll nativo via `scroll-behavior: smooth` no `<html>`

### Conteúdo e Seções

- [ ] **PIXT-01**: Seção "O que é a PIXT" com painel sticky e texto que evolui conforme o usuário rola (CSS `position:sticky` + scroll offset JS)
- [ ] **PIXT-02**: Sticky scroll desabilita em mobile (< 768px) — vira stack vertical de cards
- [ ] **AGENT-01**: Cards individuais para cada agente: Vendas+, LeadFlow, Booker, ExpertAI com nome, função e descrição extraídos do `site oficial.html`
- [ ] **AGENT-02**: Cards responsivos em grid (2 colunas desktop, 1 coluna mobile)
- [ ] **PROOF-01**: Barra de prova social com números/métricas da PIXT (empresas atendidas, taxa de automação) extraídos do `site oficial.html`
- [ ] **METO-01**: Seção de metodologia com 3 passos da Jornada PIXT (Diagnóstico → Construção → Resultado)

### Formulário de Captura

- [ ] **FORM-01**: Formulário com campos: Nome completo, E-mail, WhatsApp, Empresa
- [ ] **FORM-02**: Todos os campos `font-size: 16px` mínimo para evitar zoom automático no iOS Safari
- [ ] **FORM-03**: CTA do botão de submit: "Quero Automatizar Meu Negócio"
- [ ] **FORM-04**: Estado de sucesso inline após envio (sem reload de página) com mensagem de confirmação
- [ ] **FORM-05**: Validação client-side com feedback visual por campo (erro exibido abaixo do campo, sem `alert()`)
- [ ] **FORM-06**: Aviso de LGPD em fine-print abaixo do botão de submit

### Animações e Interatividade

- [ ] **ANIM-01**: Fade-in + slide-up via IntersectionObserver em todos os elementos de seção ao entrar na viewport
- [ ] **ANIM-02**: Efeito parallax sutil no hero (transform: translateY via scroll offset)
- [ ] **ANIM-03**: Hover nos botões/CTAs com transição de escala e cor (CSS transition, compositor apenas)
- [ ] **ANIM-04**: `@media (prefers-reduced-motion: reduce)` desativa todas as animações

### Performance e Qualidade

- [x] **PERF-01**: Todas as animações usam apenas `transform` e `opacity` (zero layout recalculation)
- [ ] **PERF-02**: `will-change` aplicado via JS apenas durante animação ativa, removido no `transitionend`
- [ ] **RESP-01**: Layout responsivo mobile-first, testado em 375px, 768px e 1280px
- [x] **FONT-01**: Google Fonts carregado com `preconnect` + `display=swap` (Space Grotesk + Work Sans)

## v2 Requirements

### Conversão Avançada

- **CONV-01**: A/B test de copy no hero
- **CONV-02**: Modal de saída (exit-intent) com oferta de diagnóstico
- **CONV-03**: Chat widget integrado (WhatsApp Business ou Intercom)

### Backend

- **BACK-01**: Integração com Formspree/Netlify Forms para envio real do formulário
- **BACK-02**: CRM integrado (RD Station ou HubSpot) para captura automática de leads
- **BACK-03**: Analytics (Google Analytics 4 + Meta Pixel)

### Conteúdo

- **CONT-01**: Seção "Quem Somos" com fotos e bio dos fundadores (Caio, Wallace, Paulo)
- **CONT-02**: Depoimentos/cases de clientes
- **CONT-03**: FAQ section

## Out of Scope

| Feature | Reason |
|---------|--------|
| Three.js / WebGL | Complexidade desnecessária para LP de conversão — decidido no PROJECT.md |
| Visual dark predominante | White/clean escolhido intencionalmente para diferenciação e padrão Apple |
| Seção de preços | Vendas consultivas B2B — preço emerge na call, não na LP |
| Backend/servidor | HTML estático apenas — integração de form é v2 |
| Copy gerado do zero | Todo texto extraído exclusivamente do `site oficial.html` |
| Animações CSS scroll-driven (`animation-timeline: view()`) | Não é baseline no Firefox em 2026 — usar como progressive enhancement apenas |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 1 | Complete |
| HERO-01 | Phase 1 | Complete |
| HERO-02 | Phase 1 | Complete |
| FOOT-01 | Phase 1 | Complete |
| FOOT-02 | Phase 1 | Complete |
| FONT-01 | Phase 1 | Complete |
| PERF-01 | Phase 1 | Complete |
| PIXT-01 | Phase 2 | Pending |
| PIXT-02 | Phase 2 | Pending |
| AGENT-01 | Phase 2 | Pending |
| AGENT-02 | Phase 2 | Pending |
| PROOF-01 | Phase 2 | Pending |
| METO-01 | Phase 2 | Pending |
| RESP-01 | Phase 2 | Pending |
| FORM-01 | Phase 3 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| FORM-05 | Phase 3 | Pending |
| FORM-06 | Phase 3 | Pending |
| ANIM-01 | Phase 4 | Pending |
| ANIM-02 | Phase 4 | Pending |
| ANIM-03 | Phase 4 | Pending |
| ANIM-04 | Phase 4 | Pending |
| PERF-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 26 total
- Mapped to phases: 26
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-25*
*Last updated: 2026-03-25 após definição inicial*
