# PROMPT — CRIAR SITE PIXT INSPIRADO NO D2C LIFE SCIENCE

## OBJETIVO
Criar um arquivo HTML único (`pixt_novo.html`) que recrie o design, layout, animações e estrutura do site D2C Life Science (https://www.d2c-lifescience.com), mas com a identidade visual, conteúdo e branding da empresa **PIXT — Força de Trabalho Sintética**.

---

## IDENTIDADE VISUAL PIXT

**Cores:**
- Background principal: `#050505` (preto)
- Cor da marca (accent): `#c6f432` (verde neon PIXT)
- Texto principal: `#ffffff`
- Texto secundário: `#a1a1aa`
- Superfície/card: `#0f0f11`
- Borda sutil: `rgba(255,255,255,0.06)`

**Tipografia:**
- Headings: `Space Grotesk` (Google Fonts, weights 600, 700)
- Body: `Work Sans` (Google Fonts, weights 300, 400, 500)
- Labels/mono: `Space Mono` (Google Fonts, weight 400) — para labels uppercase, contadores, códigos

**Logo PIXT:** Usar a letra "P" estilizada ou o texto "PIXT" em Space Grotesk bold como placeholder de logo.

---

## TECNOLOGIAS
- HTML5 + CSS3 + JavaScript vanilla (sem frameworks)
- Tailwind CSS via CDN: `https://cdn.tailwindcss.com`
- Google Fonts via link no `<head>`
- Lenis Smooth Scroll via CDN: `https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js`
- GSAP via CDN (para animações): `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js` + ScrollTrigger plugin
- **Tudo em um único arquivo HTML**

---

## ESTRUTURA COMPLETA DO SITE (dobras em ordem)

---

### DOBRA 0 — NAVBAR (sticky)
**Design:** Navbar transparente que fica preta com blur ao scrollar.
- Logo "PIXT" à esquerda (texto Space Grotesk bold, branco)
- Links de navegação no centro: `Conceito`, `Pilares`, `Serviços`, `Sobre`, `Contato`
- Botão CTA à direita: `"Falar com a PIXT"` — fundo `#c6f432`, texto preto, rounded-full
- Background: `transparent` → ao scrollar: `rgba(5,5,5,0.85)` com `backdrop-filter: blur(16px)`
- Border-bottom: `1px solid rgba(255,255,255,0.05)` ao scrollar

---

### DOBRA 1 — HERO (fullscreen, 100vh)
**Inspiração:** Hero do D2C com título grande, subtítulo e "Scroll to discover"

**Layout:** Centralizado verticalmente e horizontalmente
**Background:** `#050505`

**Conteúdo:**
- Label topo: `"FORÇA DE TRABALHO SINTÉTICA"` — `Space Mono`, `11px`, `letter-spacing: 4px`, cor `#c6f432`, uppercase
- Título principal (muito grande, ~clamp(3rem, 8vw, 7rem)):
  ```
  Agentes de IA.
  Impacto Real.
  ```
  Estilo: `font-weight: 700`, cor branca, `line-height: 1.05`, `font-family: Space Grotesk`
  O asterisco `*` no fim da segunda linha, pequeno, cor `#c6f432`

- Subtítulo abaixo do título (max-width: 480px):
  ```
  * Identificamos seus gargalos operacionais e os substituímos por agentes de IA que vendem, qualificam e gerem por você 24/7.
  ```
  Cor `#a1a1aa`, `font-size: clamp(0.9rem, 1.5vw, 1.1rem)`, `Work Sans`

- "Scroll to discover" no fundo da seção (centralizado, absoluto): texto `Space Mono`, `10px`, `#a1a1aa` uppercase, com uma seta animada ↓ pulsando

**Animação de entrada:** As linhas do título entram uma por uma com `translateY(30px) → 0` + `opacity 0 → 1`, delay escalonado

**Detalhe visual:** Uma linha fina vertical `2px` cor `#c6f432` à esquerda do bloco de texto, `height: 60px`

---

### DOBRA 2 — FRASE TRANSIÇÃO (fullscreen, 100vh)
**Inspiração:** Seção "PRECISION IN DATA, IMPACT IN CULTURE" do D2C

**Layout:** Texto grande centralizado, fundo diferente
**Background:** `#c6f432` (verde PIXT sólido)
**Texto cor:** `#050505` (preto)

**Conteúdo:**
- Texto label topo: `"O FUTURO DO TRABALHO"` — `Space Mono`, uppercase, `#050505`, `opacity: 0.5`
- Frase de destaque (tamanho enorme, ~`clamp(1.2rem, 4vw, 3.5rem)`):
  ```
  PRECISÃO NOS PROCESSOS, IMPACTO NOS RESULTADOS
  ```
  `font-family: Space Grotesk`, `font-weight: 700`, centralizado, cor `#050505`

**Animação:** Texto revela letra por letra ou palavra por palavra com ScrollTrigger (clip-path ou opacity)

---

### DOBRA 3 — VISÃO (2 colunas, fundo escuro)
**Inspiração:** Seção "Changing the way Quality and Compliance are managed" do D2C

**Background:** `#050505`
**Layout:** 2 colunas em desktop (50/50), coluna única em mobile

**Coluna esquerda:**
- Label: `"NOSSA VISÃO"` — `Space Mono`, `#c6f432`, uppercase, tracking-widest
- Título grande (clamp):
  ```
  Transformamos
  operações em
  vantagem competitiva
  ```
  Cor branca, `Space Grotesk bold`
- Texto descritivo abaixo:
  ```
  através de agentes de IA que operam 24/7, aprendendo continuamente e entregando resultados mensuráveis para cada processo da sua empresa.
  ```
  Cor `#a1a1aa`, `Work Sans`

**Coluna direita:**
- Dois botões/cards pill clicáveis:
  - `"Nossa história"` — borda branca, texto branco, hover: fundo branco, texto preto
  - `"Os fundadores"` — borda `#c6f432`, texto `#c6f432`, hover: fundo `#c6f432`, texto preto

**Animação:** Coluna esquerda entra da esquerda, coluna direita da direita, via ScrollTrigger

---

### DOBRA 4 — 6 PILARES (scroll interativo)
**Inspiração:** Seção "Six Pillars of a Well-Oiled GMP" do D2C — a mais importante do site

**Background:** `#050505` com divisória superior em `#c6f432` (2px)
**Layout:** Painel fixo à esquerda com lista de pilares, painel direito com conteúdo do pilar selecionado

**Cabeçalho da seção:**
- Label: `"OS 6 PILARES"` — Space Mono, #c6f432, uppercase
- Título:
  ```
  Os seis pilares de uma
  operação com IA
  ```
  Space Grotesk bold, branco, grande
- Subtítulo:
  ```
  Uma operação de IA bem-sucedida não nasce de uma única solução. Ela é construída sobre seis dimensões interdependentes que, juntas, criam inteligência operacional sustentável.
  ```
  Work Sans, #a1a1aa

**Os 6 pilares (lista clicável à esquerda):**
1. `Diagnóstico`
2. `Automação`
3. `Integração`
4. `Cultura de IA`
5. `Dados e Métricas`
6. `Escalabilidade`

**Cada pilar selecionado mostra à direita:**
- Número do pilar: `Pilar #N` — Space Mono, #c6f432
- Nome do pilar em grande
- Descrição detalhada (2-3 parágrafos)
- Bloco "MÉTRICAS PRINCIPAIS" com 3 itens em tags pills verdes
- Texto de retorno: `"← Voltar aos pilares"`

**Conteúdo dos pilares:**

**Pilar 1 — Diagnóstico:**
Descrição: O diagnóstico preciso é o ponto de partida de toda transformação. Antes de automatizar, é essencial mapear com precisão onde estão os gargalos, desperdícios e oportunidades de melhoria. Nosso processo analítico combina entrevistas, análise de fluxos e dados históricos para revelar o potencial escondido.
Métricas: GARGALOS MAPEADOS / TEMPO DESPERDIÇADO / ROI POTENCIAL ESTIMADO

**Pilar 2 — Automação:**
Descrição: A automação inteligente vai além de scripts. Criamos agentes autônomos capazes de executar tarefas complexas, tomar decisões e aprender com os resultados. Cada agente é projetado para o contexto específico do seu negócio, garantindo precisão e adaptabilidade.
Métricas: TAREFAS AUTOMATIZADAS / HORAS POUPADAS / TAXA DE ACERTO

**Pilar 3 — Integração:**
Descrição: Um agente isolado tem valor limitado. Nossos agentes se integram nativamente com seu CRM, ERP, plataformas de comunicação e sistemas existentes. A integração fluida garante que a IA amplifique o que já funciona, sem substituir ou quebrar processos críticos.
Métricas: SISTEMAS INTEGRADOS / TEMPO DE INTEGRAÇÃO / UPTIME

**Pilar 4 — Cultura de IA:**
Descrição: A tecnologia só gera valor quando as pessoas a adotam. Trabalhamos com sua equipe para criar uma cultura onde a IA é vista como aliada, não ameaça. Treinamentos, playbooks e acompanhamento contínuo garantem que cada colaborador saiba como trabalhar ao lado dos agentes.
Métricas: TAXA DE ADOÇÃO / NPS INTERNO / PRODUTIVIDADE POR PESSOA

**Pilar 5 — Dados e Métricas:**
Descrição: Decisões sem dados são apostas. Cada agente PIXT gera dados estruturados e dashboards em tempo real que revelam o desempenho, identificam anomalias e orientam otimizações. Transformamos a complexidade dos dados em insights claros e acionáveis para os gestores.
Métricas: DASHBOARDS ATIVOS / ALERTAS AUTOMÁTICOS / RELATÓRIOS GERADOS

**Pilar 6 — Escalabilidade:**
Descrição: Uma operação de IA eficiente não para no primeiro agente. Nossa arquitetura foi projetada para crescer junto com o seu negócio, permitindo adicionar novos agentes, expandir para novos departamentos e escalar sem retrabalho. Crescimento inteligente, sem complexidade.
Métricas: AGENTES DEPLOYADOS / DEPARTAMENTOS ATIVOS / CRESCIMENTO MÊS A MÊS

**Interação:** Ao clicar em um pilar na lista, o conteúdo direito troca com animação suave (fade + translateY). O pilar ativo tem linha lateral `#c6f432` e texto branco; os inativos têm texto `#a1a1aa`.

---

### DOBRA 5 — ESTATÍSTICAS (fundo verde)
**Inspiração:** "75% of re-engagement rate / Up to 10 projects in parallel / Step in within 15 days when urgent"

**Background:** `#c6f432`
**Texto:** `#050505`
**Layout:** 3 colunas com estatísticas grandes + label

**Estatísticas:**
- `+80%` / `de redução em tarefas manuais repetitivas`
- `24/7` / `agentes operando sem interrupção`
- `15 dias` / `para o primeiro agente em produção`

**Design:** Número grande em `Space Grotesk bold`, label abaixo em `Space Mono` uppercase pequeno. Linha separadora vertical entre colunas.

---

### DOBRA 6 — CTA TRANSIÇÃO (fullscreen)
**Inspiração:** "We help you Make data-backed decisions"

**Background:** `#050505`
**Layout:** Centralizado

**Conteúdo:**
- Label: `"TRANSFORME SUA OPERAÇÃO"` — Space Mono, #c6f432, uppercase
- Título enorme:
  ```
  Fazemos sua empresa
  tomar decisões
  baseadas em IA
  ```
  Space Grotesk bold, branco, `clamp(2.5rem, 6vw, 5.5rem)`
- Sublabel: `"Através de 4 serviços essenciais"` — #a1a1aa, Work Sans

**Animação:** Cada linha do título entra com animação de "reveal" (clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)) via ScrollTrigger

---

### DOBRA 7 — 4 SERVIÇOS
**Inspiração:** "Audit / Advise / Train / Project MGMT" do D2C

**Background:** Alternância entre `#050505` e `#0f0f11`
**Layout:** Cards empilhados verticalmente, cada um com 2 colunas (texto esquerda, visual direita)

**Serviço 1 — Diagnóstico Operacional:**
Tag: `01 / DIAGNÓSTICO`
Título: `"Mapear para revelar, corrigir e fortalecer"`
Descrição: O diagnóstico é a fundação. Mapeamos seus processos, identificamos gargalos e quantificamos o impacto de cada ponto de melhoria antes de qualquer implementação.
Visual direita: Bloco de código fictício animado (linhas de código aparecendo)

**Serviço 2 — Implementação de Agentes:**
Tag: `02 / IMPLEMENTAÇÃO`
Título: `"Construir para transformar e escalar"`
Descrição: Desenvolvemos agentes de IA sob medida para seu negócio, integrados com seus sistemas e treinados para seus processos específicos.
Visual direita: Diagrama de fluxo/nodes conectados com CSS

**Serviço 3 — Treinamento e Adoção:**
Tag: `03 / TREINAMENTO`
Título: `"Engajar para dominar e perpetuar"`
Descrição: Times treinados transformam conhecimento em hábito. Criamos programas customizados para que cada colaborador entenda, confie e utilize os agentes no dia a dia.
Visual direita: Ícones de pessoas com progress bars

**Serviço 4 — Gestão Contínua:**
Tag: `04 / GESTÃO`
Título: `"Monitorar, otimizar e expandir"`
Descrição: Não entregamos e sumimos. Acompanhamos o desempenho dos agentes, geramos relatórios mensais e propõe expansões baseadas em dados reais.
Visual direita: Dashboard fictício com barras e métricas

**Animação:** Cada card revela ao scrollar (ScrollTrigger, translateY + opacity)

---

### DOBRA 8 — CONTATO (fullscreen)
**Inspiração:** "Ready to get to work? Let's get in touch!"

**Background:** `#050505`
**Layout:** Centralizado, grande

**Conteúdo:**
- Label topo: `"PRONTO PARA COMEÇAR?"` — Space Mono, #c6f432, uppercase
- Título:
  ```
  Vamos trabalhar
  juntos!
  ```
  Space Grotesk bold, branco, enorme

- Dados de contato em cards:
  - Email: `contato@pixt.com.br`
  - WhatsApp: `+55 (11) 9 0000-0000`
  - Instagram: `@pixt.ia`

- Botão grande: `"Agendar uma conversa"` — fundo `#c6f432`, texto preto, rounded-full, `padding: 16px 48px`, `font-size: 1.1rem`

---

### DOBRA 9 — FOOTER
**Background:** `#050505`
**Border-top:** `1px solid rgba(255,255,255,0.06)`

**Layout:** 3 colunas
- Esquerda: Logo PIXT + tagline `"Força de Trabalho Sintética"`
- Centro: Links de navegação (Conceito, Pilares, Serviços, Contato)
- Direita: Links sociais (LinkedIn, Instagram)

**Rodapé inferior:** `[COPYRIGHT 2026 — PIXT]` / `TERMOS DE USO` / `POLÍTICA DE PRIVACIDADE`
Estilo: Space Mono, 10px, #a1a1aa, uppercase

---

## ANIMAÇÕES E INTERAÇÕES GLOBAIS

**Smooth Scroll:**
```javascript
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

**Reveal on Scroll (ScrollTrigger para todos os elementos com .reveal):**
```javascript
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    }
  );
});
```

**Navbar scroll behavior:**
```javascript
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(5,5,5,0.85)';
    nav.style.backdropFilter = 'blur(16px)';
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
  } else {
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.borderBottom = 'none';
  }
});
```

**Cursor customizado (opcional mas recomendado):**
Um ponto pequeno `8px` cor `#c6f432` que segue o mouse com leve lag (CSS transition ou JS lerp)

---

## CSS GLOBAL IMPORTANTE

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: #050505;
  color: #ffffff;
  font-family: 'Work Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
::selection { background: #c6f432; color: #050505; }

/* Reveal classes */
.reveal { opacity: 0; transform: translateY(40px); }
.reveal.visible { opacity: 1; transform: translateY(0); transition: all 0.9s cubic-bezier(0.25, 1, 0.5, 1); }

/* Label padrão */
.label {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #c6f432;
}

/* Linha decorativa verde */
.green-line {
  width: 2px;
  height: 60px;
  background: #c6f432;
  display: inline-block;
}
```

---

## NOTAS DE IMPLEMENTAÇÃO

1. **Responsividade:** Cada dobra deve ser 100% funcional em mobile (< 768px). Em mobile, layouts de 2 colunas viram 1 coluna.
2. **Performance:** Imagens fictícias podem ser substituídas por placeholders CSS coloridos ou gradientes.
3. **Pilares (Dobra 4):** A interação de selecionar pilar deve funcionar via JavaScript puro — ao clicar no item da lista, adicionar classe `.active` e mostrar o conteúdo correto.
4. **Fontes:** Carregar via Google Fonts no `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Work+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
   ```
5. **Arquivo final:** Salvar como `pixt_novo.html` em `C:\Users\T-GAMER\Desktop\Claude pojeto\`
