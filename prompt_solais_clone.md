# Prompt Completo — Clone do site Solais.ai

> Cole este prompt integralmente no Claude Code para gerar o arquivo `solais_clone.html`

---

## PROMPT:

Crie um arquivo HTML único chamado `solais_clone.html` que replica fielmente o design e as animações do site solais.ai. O arquivo deve ser completamente auto-contido (sem dependências externas além de CDNs), sem frameworks como React ou Next.js — apenas HTML, CSS e JavaScript vanilla com bibliotecas via CDN.

---

## STACK TÉCNICA

- HTML5 single-file
- CSS3 puro (sem Tailwind, sem frameworks)
- JavaScript vanilla
- **Three.js r128** via CDN: `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
- **GSAP 3.12.2** via CDN: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`
- **GSAP ScrollTrigger**: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js`
- **Google Fonts**: Space Mono, Space Grotesk (importar via @import)

---

## PALETA DE CORES

```css
--color-dark:    #3c091e;   /* marrom escuro / fundo principal */
--color-red:     #cf2e2e;   /* vermelho vivo / destaque */
--color-maroon:  #5b1a2e;   /* marrom médio / gradiente */
--color-light:   #f5f0ee;   /* branco-creme / fundo claro */
--color-white:   #ffffff;
--color-text-dark: #3c091e;
--color-pink:    #af6267;   /* rosa-acinzentado / detalhes */
```

---

## TIPOGRAFIA

- **Títulos principais**: `Space Mono`, monospace, uppercase, peso 700, tamanhos de 64px a 120px
- **Subtítulos / labels**: `Space Mono`, uppercase, tamanho 12–14px, letter-spacing 2–4px
- **Corpo de texto**: `Space Grotesk`, tamanho 14–16px
- **Números grandes (contador)**: `Space Mono`, 200–300px, peso 700

---

## LOGO E ÍCONE SOLAIS

O logo é composto por 4 linhas diagonais paralelas (como um "///" estilizado) à esquerda, seguido do texto "SOLAIS" em Space Mono bold uppercase. As linhas diagonais são desenhadas em SVG inline ou com CSS `::before` usando bordas rotacionadas. Cor: `#3c091e` (marrom escuro) em fundos claros, branco em fundos escuros.

---

## ESTRUTURA DE SEÇÕES

### SEÇÃO 1 — HERO (viewport: 100vh, split layout)

**Layout**: Dividido verticalmente ao meio. Metade esquerda com fundo gradiente escuro marrom (`#3c091e` → `#5b1a2e`), metade direita branco-creme (`#f5f0ee`).

**Conteúdo lado esquerdo (dark)**:
- Logo "/// SOLAIS" no canto superior esquerdo, branco
- Texto flutuante binário: múltiplos `<span>` com conteúdo "01010101 11001010 10110101" posicionados aleatoriamente, fonte Space Mono 10px, cor branca com opacidade 0.15, animação de float suave (keyframe: translateY -20px em loop, duração diferente para cada um entre 4s–8s)
- Título principal: duas linhas em Space Mono uppercase branco, ~80px
  ```
  ANALYTICS FOR
  VISIBILITY
  ```
  A palavra "VISIBILITY" tem uma linha horizontal decorativa à esquerda (`—`)

**Conteúdo lado direito (light)**:
- Logo 3D geométrico: renderizar com Three.js ou CSS 3D. É um conjunto de retângulos/paralelogramos empilhados ligeiramente rotacionados, formando um "S" abstrato. Cada peça é um plano fino (`THREE.BoxGeometry(2.4, 0.4, 0.1)`) rotacionado ~-25 graus no eixo Z, com cor `#cf2e2e` (vermelho) e material `MeshStandardMaterial`. Empilhar 5 peças com offset vertical de 0.55 entre cada. A pilha tem leve rotação 3D contínua no eixo Y (autorotate).
- Subtítulo abaixo do logo: "IN AI SEARCH" em Space Mono uppercase, `#3c091e`, ~24px
- Botão "GET STARTED" — fundo `#3c091e`, texto branco, padding 14px 28px, sem border-radius, font Space Mono

**Navbar** (fixa no topo, z-index 1000, fundo transparente → semi-opaco ao rolar):
- Esquerda: logo "/// SOLAIS"
- Centro: links `ABOUT / HOW IT WORKS / ADVANTAGE / INDUSTRIES` em Space Mono uppercase 12px
- Direita: botão "GET STARTED" (marrom escuro fundo / branco texto em fundos escuros; ou bordado em fundos claros)
- Os separadores entre links são literalmente `/` em Space Mono

**Animação de entrada** (GSAP, ao carregar):
- Hero title: fade + translateY(40px) → 0, duration 1s, stagger 0.2s
- Logo 3D: fade in + scale 0.8→1, duration 1.2s
- Floaters: fade in com delay 0.5s

---

### SEÇÃO 2 — WHAT IS SOLAIS (fundo: `#f5f0ee`, 100vh)

**Background**: Grade de pontos/linhas finas. Implementar com CSS: `background-image: radial-gradient(circle, #3c091e22 1px, transparent 1px); background-size: 30px 30px;`

**Centro**: Canvas Three.js com um objeto 3D geométrico abstrato — usar `IcosahedronGeometry(1.5, 1)` com `MeshStandardMaterial({ color: 0xcf2e2e, wireframe: false })` e `EdgesGeometry` por cima em branco. O objeto gira lentamente no eixo Y. Tamanho do canvas: 400×400px centralizado.

**Callout lines**: 3 linhas SVG irradiando do objeto central para cards laterais. Usar SVG absolute posicionado sobre o canvas. Cada linha anima de opacidade 0→1 ao entrar na viewport (ScrollTrigger).

**Feature pills** (cards com borda `#3c091e 1px solid`, fundo branco, padding 8px 16px, Space Mono 11px uppercase):
- "✦ VISIBILITY ANALYSIS" — à direita superior
- "✦ SENTIMENT INSIGHT" — à direita inferior
- "✦ ACTIONABLE DIRECTION" — à esquerda

**Título** (canto inferior esquerdo):
```
UNDERSTANDING
WHAT IS SOLAIS?
```
Space Mono 56px uppercase, cor `#3c091e`. "UNDERSTANDING" tem badge label acima: `[ UNDERSTANDING ]` em Space Mono 11px com borda.

**Animação ScrollTrigger**: ao entrar na viewport, objeto 3D faz zoom in de scale 0→1, cards de callout aparecem com stagger.

---

### SEÇÃO 3 — HOW IT WORKS (fundo: branco, ~250vh para scroll lento)

**Background**: Grade de perspectiva — linhas convergindo para um ponto de fuga central. Implementar com SVG ou Canvas 2D: desenhar linhas de `x_center, y_center` para as bordas, dando efeito de perspectiva. Cor das linhas: `#3c091e` com opacidade 0.06.

**Floating 3D icon cards**: 6–8 cards pequenos (80×80px) espalhados aleatoriamente pelo fundo com posição `absolute`. Cada card tem fundo `#cf2e2e`, borda-radius 12px, um ícone SVG simples branco dentro. Animação: `transform: translateY()` em loop lento (efeito flutuante).

**Sticky scroll**: A seção tem `height: 300vh`. Dentro dela, um container sticky (`position: sticky; top: 0; height: 100vh`). 3 sub-steps aparecem conforme o scroll progride usando ScrollTrigger com scrub.

**Step 1** (scroll 0%–33%):
- Badge: `[ STRATEGISING ]` em Space Mono 11px
- Título: `SET YOUR\nPROMPTS` em Space Mono 72px uppercase, `#3c091e`
- Número "01" em canto — Space Mono 14px

**Step 2** (scroll 33%–66%):
- Badge: `[ ANALYSING ]`
- Título: `TRACK\nRESPONSES`

**Step 3** (scroll 66%–100%):
- Badge: `[ OPTIMISING ]`
- Título: `ACT WITH\nCONFIDENCE`

**Transição**: GSAP ScrollTrigger com `scrub: 1`. Cada step: `opacity: 0 → 1` e `translateY(40px) → 0`. O step anterior faz `opacity: 1 → 0` e `translateY(0 → -40px)`.

---

### SEÇÃO 4 — WHY BRANDS CHOOSE SOLAIS (fundo: `#f5f0ee`, ~300vh)

**Background**: mesma grade de pontos da seção 2.

**Label topo**: `[ YOUR ADVANTAGE ]` com barra dupla decorativa "||"

**Título** (canto inferior esquerdo, aparece com scroll):
```
WHY BRANDS
— CHOOSE SOLAIS
```
Space Mono 80px. O "—" antes de "CHOOSE" é um traço decorativo com gradiente fade.

**Centro**: Logo Solais grande em wireframe/fantasma — usar Three.js com as mesmas 5 peças do logo hero, mas `wireframe: true` e cor `#3c091e` com opacidade 0.1. Gira muito lentamente.

**Floating gems**: 4–6 formas geométricas 3D renderizadas em Three.js (ou CSS 3D). Usar `OctahedronGeometry(0.4)` com `MeshPhysicalMaterial({ color: 0xcf2e2e, transparent: true, opacity: 0.7, roughness: 0, metalness: 0.5 })`. Flutuam com animação GSAP `y: ±30px` em loop.

**Scroll-driven feature cards** (aparecem um a um conforme o scroll):

**Feature 1 — MODEL VISIBILITY**:
- Badge com ícone + texto `[ ✦ MODEL VISIBILITY || ]`
- Parágrafo: "Solais tracks outputs across the leading large language models, including ChatGPT, Google AI Overview, Claude, Perplexity and more. Compare how visibility differs across each model and see how those patterns trend when normalised across all."
- Aparece alinhado à direita, borda esquerda `#cf2e2e 2px solid`, padding-left 20px

**Feature 2 — VERIFIED DATA**:
- Badge `[ 🔍 VERIFIED DATA || ]`
- Parágrafo: "Solais removes the guesswork baked into traditional ranking tools. Every result is captured from real prompt simulation, creating an exact record of how a question was answered at that moment in time, so you can strategise around complete certainty."
- Aparece à direita, mesmo estilo

**ScrollTrigger**: cada feature card aparece ao rolar, com `opacity 0→1` e `translateX(40px)→0`.

---

### SEÇÃO 5 — MARQUEE (fundo: `#3c091e`, height: 200px)

**Animação**: Texto "SOLAIS" em Space Mono, ~180px, peso 700, cor `#3c091e`, background `#5b1a2e`. Rolagem horizontal infinita da direita para esquerda, velocidade constante.

Implementar com duas cópias do texto side-by-side em `display: flex`, animação CSS `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`, `animation: marquee 8s linear infinite`.

O texto não usa cor de contraste — é ligeiramente mais claro que o fundo para criar efeito sutil (`color: #5b1a2e` em fundo `#3c091e`).

---

### SEÇÃO 6 — DASHBOARD PREVIEW (fundo: `#3c091e`, 100vh)

**Background**: Gradiente radial `radial-gradient(ellipse at 60% 50%, #8b1a2e 0%, #3c091e 60%)`. Cortes angulares nas bordas superior e inferior usando `clip-path: polygon(...)` ou dois pseudo-elementos `::before`/`::after` com triângulos.

**Conteúdo**: Monitor/tela de computador renderizado em CSS 3D ou imagem SVG mostrando um dashboard analytics com:
- Barra lateral escura com itens de menu: "Dashboard / Competitors / Prompts / Analytics"
- Área principal com gráfico de linha com múltiplas cores (simular com CSS/SVG)
- Cards de dados com números

Implementar como um `<div class="monitor">` com `transform: perspective(1000px) rotateX(5deg)` ligeiramente inclinado. A tela interna (`<div class="screen">`) tem fundo `#0d0d0d` e layout em grid simulando o dashboard. Usar SVG inline para o gráfico de linha.

**Animação**: Ao entrar na viewport (ScrollTrigger), monitor entra com `translateY(100px)→0` e `opacity 0→1`, duration 1s.

---

### SEÇÃO 7 — INDUSTRIES (fundo: `#3c091e`, 100vh)

**Layout**: Duas colunas. Esquerda fixa (sticky), direita scroll horizontal com drag.

**Coluna esquerda** (30% largura, `position: sticky; top: 0; height: 100vh`, centrado verticalmente):
- Título: `FIND YOUR\nINDUSTRY` em Space Mono 64px, branco
- Linha decorativa: traço horizontal com gradiente
- Parágrafo: "Solais.ai is built for the teams responsible for how brands are seen, understood and chosen." em Space Grotesk 14px, cor `#af6267`
- Botão "GET STARTED" com borda branca 1px, fundo transparente, texto branco

**Números fantasma** no fundo (posição absolute): "01", "02", "03"... em Space Mono ~100px, cor `#5b1a2e` (muito sutil), espalhados pelo background

**Coluna direita** (70% largura): Container com `overflow-x: hidden`. Cards dentro com `display: flex; gap: 16px`. Implementar drag com mouse events:
```javascript
let isDown = false, startX, scrollLeft;
container.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - container.offsetLeft; scrollLeft = container.scrollLeft; });
container.addEventListener('mousemove', e => { if(!isDown) return; const x = e.pageX - container.offsetLeft; container.scrollLeft = scrollLeft - (x - startX) * 1.5; });
```

**Cada industry card** (largura 380px, height 520px, fundo branco `#ffffff`, cor de texto `#3c091e`):
- `clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)` — canto superior direito cortado diagonalmente
- Header: `AI —— 01` em Space Mono 12px, `#af6267`, com linha horizontal antes do número
- Título: Space Mono 42px, peso 700, `#3c091e`, uppercase
- Parágrafo: Space Grotesk 14px, `#3c091e`, centrado horizontalmente no card
- Footer do card: barras verticais decorativas `| | | | | | |` centralizadas
- Hover: leve `translateY(-8px)`, `box-shadow: 0 20px 40px rgba(0,0,0,0.15)`

**Cards (4 total)**:
1. `AI — 01 / MARKETING TEAMS` — "Use Solais to understand AI visibility across key prompts and make informed decisions that can guide content, messaging and distribution."
2. `AI — 02 / AGENCIES` — "Benchmark clients clearly, support GEO strategies with evidence and show organic progress beyond traditional SEO metrics through shared dashboards and reporting."
3. `AI — 03 / BRAND MANAGERS` — "Track how AI speaks about your brand across categories and use cases, and understand how that narrative shifts over time."
4. `AI — 04 / BUSINESS LEADERS` — "Gain a clearer view of market perception, competitor movement and how audiences are using AI to research and compare."

---

### SEÇÃO 8 — CTA (fundo: gradiente `#3c091e → #8b1a2e`, 100vh)

**Layout**: Duas colunas.

**Coluna esquerda**:
- Título grande: `TAKE CONTROL OF\nTHE CONVERSATION` em Space Mono 72px, branco, uppercase
- Parágrafo: "AI engines have already formed opinions about your brand. Solais gives you a look inside that conversation, and the power to influence how it evolves." em Space Grotesk 16px, `#af6267`
- Botão "GET STARTED" com borda branca 1px, fundo transparente

**Coluna direita** (centrada verticalmente):
- Badge: `[ ✦ ACTIVE USERS || ]` em Space Mono 12px, `#af6267`
- Número contador animado: `12` em Space Mono ~200px, branco, peso 700
- Animação: ao entrar na viewport, contar de 0 até 12 com GSAP `gsap.to(obj, { val: 12, onUpdate: () => el.textContent = Math.round(obj.val) })`

**Ticker horizontal** (na borda inferior da seção):
- `□ SCHEDULE A DEMO  □ SET YOUR PROMPTS  □ TRACK YOUR PRESENCE  □ OPTIMISE YOUR STRATEGY`
- Rolagem horizontal contínua da direita para esquerda (mesmo mecanismo do marquee)
- Space Mono 12px, cor `#af6267`

---

### SEÇÃO 9 — FOOTER (fundo: branco `#ffffff`)

**Background decorativo**: Texto "SOLAIS" gigante (~250px) em Space Mono, cor `#3c091e` com opacidade 0.08, posicionado absolutamente no topo do footer, overflow hidden.

**Grid de 3 colunas**:

**Coluna 1**:
- Logo "/// SOLAIS" em `#3c091e`
- Parágrafo: "People don't search for information the way they used to. They ask questions, and AI answers." em Space Grotesk 14px
- Ícones sociais: LinkedIn e Instagram — quadrados 40px com fundo `#3c091e`, ícones SVG brancos

**Coluna 2**:
- Header: `EXPLORE` em Space Mono 12px uppercase com letter-spacing 3px
- Links: ABOUT / HOW IT WORKS / ADVANTAGE / INDUSTRIES — Space Mono 14px, `#3c091e`, sem sublinhado, hover: `#cf2e2e`

**Coluna 3**:
- Header: `GET STARTED` em Space Mono 14px uppercase
- Formulário com campos:
  - First name + Last name (lado a lado)
  - Email (largura total)
  - Botão "Submit" — fundo `#3c091e`, branco, Space Mono
- Campos: borda inferior `#3c091e 1px solid` apenas, sem borda lateral/superior, sem border-radius, fundo transparente, placeholder em `#af6267`

**Rodapé inferior**:
- Linha pontilhada separando
- `© 2026 The Start. All Rights Reserved` | `Terms & conditions` | `Privacy policy` | `Site by The Start`
- Space Mono 11px, `#af6267`

---

## ANIMAÇÕES GLOBAIS E EFEITOS

### Scroll suave
Implementar scroll suave nativo com `html { scroll-behavior: smooth; }` e `overflow-x: hidden`.

### GSAP ScrollTrigger — padrão geral
```javascript
gsap.registerPlugin(ScrollTrigger);
// Para cada seção, fade in ao entrar:
gsap.utils.toArray('.animate-in').forEach(el => {
  gsap.from(el, {
    opacity: 0, y: 40, duration: 0.8,
    scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
  });
});
```

### Cursor customizado (opcional mas recomendado)
- Cursor padrão substituído por círculo 20px com borda `#cf2e2e 2px solid`, fundo transparente
- Ao hover em botões/links, expande para 40px e muda fill para `#cf2e2e` com opacidade 0.3

### Hover em botões
- Transição `background-color 0.3s ease`
- Botões outline: ao hover, `background: #3c091e; color: #fff`
- Botões sólidos: ao hover, `background: #cf2e2e`

### Navbar scroll behavior
```javascript
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(60,9,30,0.95)';
    nav.style.backdropFilter = 'blur(10px)';
    // Mudar cor dos links para branco
  } else {
    nav.style.background = 'transparent';
  }
});
```

---

## DETALHES VISUAIS IMPORTANTES

1. **Clipped corners**: Vários elementos usam `clip-path` para cantos cortados diagonalmente (estilo tech). O padrão mais usado: `clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)`.

2. **Decoradores de label**: Todos os badges/labels seguem o padrão `[ TEXTO || ]` — colchetes `[` e `]` delimitando, com duas barras verticais `||` no final. Implementar como texto literal ou com `::after { content: ' ||' }`.

3. **Linhas horizontais decorativas**: Muitos títulos têm uma linha `——` antes (como `— CHOOSE SOLAIS`). Usar `<span class="dash">——</span>` com `color: #cf2e2e` e `margin-right: 12px`.

4. **Fontes monospace everywhere**: Praticamente todo texto usa Space Mono. Space Grotesk só para parágrafos de corpo.

5. **Grade de fundo**: As seções claras usam background com grid de pontos: `background-image: radial-gradient(circle, rgba(60,9,30,0.15) 1px, transparent 1px); background-size: 28px 28px;`

6. **Perspective grid (seção 3)**: Linhas divergindo de ponto central, usando SVG com `<line x1="720" y1="400" x2="..." y2="...">` para ~16 linhas em todas as direções, opacidade 0.06.

7. **Textura granulada**: As seções escuras têm leve textura de grain. Aplicar com `::after { background-image: url("data:image/svg+xml,...noise svg"); opacity: 0.03; position: absolute; inset: 0; pointer-events: none; }` ou usar filtro CSS `filter: url(#noise)` com SVG feTurbulence.

8. **Transições de seção**: Entre seções claras e escuras, usar `clip-path` diagonal para criar corte angular. Por exemplo, a seção 1 termina com um corte diagonal na borda inferior usando `clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%)`.

---

## ESTRUTURA HTML BASE

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solais — AI Visibility Platform</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
  <style>/* todo CSS aqui */</style>
</head>
<body>
  <nav id="navbar">...</nav>
  <section id="hero">...</section>
  <section id="about">...</section>
  <section id="how-it-works">...</section>
  <section id="advantage">...</section>
  <div id="marquee">...</div>
  <section id="dashboard">...</section>
  <section id="industries">...</section>
  <section id="cta">...</section>
  <footer id="footer">...</footer>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script>/* todo JS aqui */</script>
</body>
</html>
```

---

## OBSERVAÇÕES FINAIS

- O arquivo final deve ter entre 800 e 1500 linhas
- Priorizar fidelidade visual ao original: cores exatas, fontes exatas, espacamentos consistentes
- Todos os botões "GET STARTED" devem rolar suavemente para a seção `#footer` (formulário)
- Todos os links de nav devem usar `href="#section-id"` com scroll suave
- O Three.js canvas do hero deve ter `pointer-events: none` para não bloquear interação
- Em mobile (< 768px), simplificar: remover 3D, empilhar colunas verticalmente, reduzir fontes em 40%
- Testar que não haja `console.error` ao abrir no browser (especialmente para Three.js)
- **NÃO usar** `THREE.CapsuleGeometry` (não existe no r128)
- **NÃO usar** localStorage ou sessionStorage
