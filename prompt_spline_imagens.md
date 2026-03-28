# PROMPT TÉCNICO DETALHADO
## Objetivo: Integrar imagens de produto ao efeito Spline 3D em website

---

## CONTEXTO DO PROJETO

Tenho um site com múltiplas seções (dobras). Na **terceira dobra (section 3)** quero integrar um efeito 3D interativo do Spline com 3 imagens de produto que flutuam dentro da cena, seguindo o mesmo balanço e movimento de câmera do efeito.

---

## EFEITO SPLINE (base do projeto)

O efeito já existe e está publicado neste embed:

```html
<iframe
  src='https://my.spline.design/themuseum-cUN82bEXHYdaLR1ReiEbAH07/'
  frameborder='0'
  width='100%'
  height='100%'>
</iframe>
```

Este é um efeito de "museu 3D" com câmera flutuante que faz movimentos suaves de:
- **Balanço lateral (sway):** oscilação lenta de esquerda para direita
- **Zoom respiratório (breathe):** leve aproximação e afastamento
- **Inclinação (tilt):** leve rotação no eixo Z para dar profundidade
- A câmera simula o efeito de caminhar dentro de um museu iluminado

---

## ESTRUTURA DE ATIVAÇÃO (terceira dobra)

### Comportamento esperado:

1. O usuário rola a página e chega à **terceira seção**
2. Quando a seção entra no viewport, um **botão aparece** com animação de fade-in + slide-up
3. O botão tem texto tipo: **"Descobrir" / "Ver de Perto" / "Explorar"**
4. O usuário **clica no botão**
5. O botão some com fade-out
6. A cena Spline **expande** com animação de scale (de 0.8 para 1) + fade-in
7. As **3 imagens de produto** aparecem sobre a cena Spline com delay escalonado (imagem 1 → 2 → 3 com 300ms de intervalo)
8. As imagens passam a **flutuar e balançar** seguindo a mesma física da câmera Spline

---

## AS 3 IMAGENS DE PRODUTO

São arquivos PNG locais chamados `1.png`, `2.png` e `3.png`. Conteúdo:
- **1.png** — Produto mostrado com texto "Decalques especiais para o seu DIA DOS PAIS"
- **2.png** — Produto sendo colocado no forno, com texto "FÁCIL DE PRODUZIR"
- **3.png** — Produto sendo presenteado, com texto "Incrível para PRESENTEAR / COMPRE AGORA"

### Posicionamento das imagens na cena:
- **Imagem 1** — posição esquerda-superior (`left: 8%, top: 15%`)
- **Imagem 2** — posição central-inferior (`left: 38%, bottom: 12%`)
- **Imagem 3** — posição direita-superior (`right: 8%, top: 20%`)

### Tamanho das imagens:
- Largura: `clamp(180px, 22vw, 280px)`
- Border-radius: `16px`
- Box-shadow: `0 20px 60px rgba(0,0,0,0.45)`

---

## ANIMAÇÕES DAS IMAGENS (seguindo o efeito de câmera do Spline)

Cada imagem deve ter **3 animações CSS simultâneas e sobrepostas** para simular a câmera flutuante do museu:

### Animação 1 — Float vertical (respiração)
```css
@keyframes floatY {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-14px); }
  100% { transform: translateY(0px); }
}
/* duration: 6s | timing: ease-in-out | iteration: infinite */
```

### Animação 2 — Sway horizontal (balanço lateral)
```css
@keyframes swayX {
  0%   { transform: translateX(0px) rotate(0deg); }
  25%  { transform: translateX(8px) rotate(0.6deg); }
  75%  { transform: translateX(-8px) rotate(-0.6deg); }
  100% { transform: translateX(0px) rotate(0deg); }
}
/* duration: 8s | timing: ease-in-out | iteration: infinite */
```

### Animação 3 — Zoom respiratório (escala suave)
```css
@keyframes breatheScale {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.03); }
  100% { transform: scale(1); }
}
/* duration: 10s | timing: ease-in-out | iteration: infinite */
```

### Delays escalonados entre imagens para não ficarem sincronizadas:
- **Imagem 1:** `animation-delay: 0s`
- **Imagem 2:** `animation-delay: -2.5s` (começa em fase diferente)
- **Imagem 3:** `animation-delay: -5s`

### Aplicação combinada no CSS:
```css
.product-img {
  animation:
    floatY 6s ease-in-out infinite,
    swayX 8s ease-in-out infinite,
    breatheScale 10s ease-in-out infinite;
  will-change: transform;
  transform-origin: center center;
}
```

---

## ESTRUTURA HTML COMPLETA DA TERCEIRA DOBRA

```html
<section class="section-three" id="section-three">

  <!-- Estado inicial: apenas o botão visível -->
  <div class="cta-wrapper" id="ctaWrapper">
    <h2 class="section-heading">Veja como funciona</h2>
    <button class="discover-btn" id="discoverBtn" onclick="activateSplineScene()">
      Explorar →
    </button>
  </div>

  <!-- Contêiner da cena (escondido até o clique) -->
  <div class="spline-scene-wrapper" id="splineWrapper">

    <!-- iframe do Spline como fundo -->
    <iframe
      id="splineFrame"
      src='https://my.spline.design/themuseum-cUN82bEXHYdaLR1ReiEbAH07/'
      frameborder='0'
      width='100%'
      height='100%'
      loading="lazy">
    </iframe>

    <!-- Imagens sobrepostas ao Spline -->
    <div class="product-images-overlay">
      <img class="product-img img-1" src="1.png" alt="Decalque Dia dos Pais" />
      <img class="product-img img-2" src="2.png" alt="Fácil de Produzir" />
      <img class="product-img img-3" src="3.png" alt="Presentear" />
    </div>

  </div>

</section>
```

---

## CSS COMPLETO

```css
/* ── Terceira seção ── */
.section-three {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background: #0a0a0f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ── Botão CTA inicial ── */
.cta-wrapper {
  position: absolute;
  z-index: 10;
  text-align: center;
  animation: fadeSlideUp 0.8s ease forwards;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.section-heading {
  color: #ffffff;
  font-size: clamp(24px, 4vw, 48px);
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}

.discover-btn {
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  color: #0a0a0f;
  border: none;
  padding: 16px 42px;
  font-size: 17px;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 32px rgba(255,255,255,0.15);
  letter-spacing: 0.3px;
}

.discover-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 14px 40px rgba(255,255,255,0.25);
}

/* ── Cena Spline + overlay ── */
.spline-scene-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: scale(0.92);
  pointer-events: none;
  transition: opacity 0.9s ease, transform 0.9s ease;
}

.spline-scene-wrapper.active {
  opacity: 1;
  transform: scale(1);
  pointer-events: all;
}

.spline-scene-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* ── Overlay das imagens de produto ── */
.product-images-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

/* ── Imagens individuais ── */
.product-img {
  position: absolute;
  width: clamp(160px, 20vw, 260px);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08);
  opacity: 0;
  transition: opacity 0.6s ease;
  will-change: transform;
  transform-origin: center center;
}

.product-img.visible {
  opacity: 1;
  animation:
    floatY     6s  ease-in-out infinite,
    swayX      8s  ease-in-out infinite,
    breatheScale 10s ease-in-out infinite;
}

/* Posicionamento */
.img-1 { left: 6%;   top: 12%;    animation-delay: 0s,    0s,    0s;    }
.img-2 { left: 38%;  bottom: 10%; animation-delay: -2.5s, -2.5s, -2.5s; }
.img-3 { right: 6%;  top: 18%;    animation-delay: -5s,   -5s,   -5s;   }

/* ── Keyframes das animações ── */
@keyframes floatY {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-14px); }
  100% { transform: translateY(0px); }
}

@keyframes swayX {
  0%   { transform: translateX(0px)   rotate(0deg); }
  25%  { transform: translateX(9px)   rotate(0.7deg); }
  75%  { transform: translateX(-9px)  rotate(-0.7deg); }
  100% { transform: translateX(0px)   rotate(0deg); }
}

@keyframes breatheScale {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.035); }
  100% { transform: scale(1); }
}
```

---

## JAVASCRIPT COMPLETO

```javascript
function activateSplineScene() {
  const ctaWrapper   = document.getElementById('ctaWrapper');
  const splineWrapper = document.getElementById('splineWrapper');
  const imgs          = document.querySelectorAll('.product-img');

  // 1. Fade-out do botão
  ctaWrapper.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  ctaWrapper.style.opacity    = '0';
  ctaWrapper.style.transform  = 'translateY(-20px)';

  setTimeout(() => {
    ctaWrapper.style.display = 'none';

    // 2. Ativa o wrapper da cena Spline
    splineWrapper.classList.add('active');

    // 3. Aparece cada imagem em sequência com delay de 350ms
    imgs.forEach((img, index) => {
      setTimeout(() => {
        img.classList.add('visible');
      }, 600 + index * 350);
    });

  }, 400);
}

// Observador de scroll: anima o botão ao entrar no viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('section-three');
  if (section) observer.observe(section);
});
```

---

## EFEITO PARALLAX OPCIONAL (responsivo ao mouse)

Se quiser que as imagens reajam ao movimento do mouse do usuário (aumentando a sensação de profundidade 3D junto com a câmera Spline), adicione este script:

```javascript
document.getElementById('section-three').addEventListener('mousemove', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const cx   = (e.clientX - rect.left  - rect.width  / 2) / rect.width;
  const cy   = (e.clientY - rect.top   - rect.height / 2) / rect.height;

  document.querySelectorAll('.product-img').forEach((img, i) => {
    const depth = [1.8, 1.2, 2.2][i]; // cada imagem tem profundidade diferente
    const tx = cx * depth * 18;
    const ty = cy * depth * 12;
    img.style.setProperty('--mouse-x', `${tx}px`);
    img.style.setProperty('--mouse-y', `${ty}px`);
  });
});
```

E adicione no CSS das imagens:
```css
.product-img {
  transform: translate(var(--mouse-x, 0px), var(--mouse-y, 0px));
}
```

---

## OBSERVAÇÕES TÉCNICAS IMPORTANTES

1. **O iframe Spline e as imagens devem estar no mesmo container `position: relative`** para que o z-index funcione corretamente — o iframe fica no fundo (z-index: 1) e as imagens ficam sobre ele (z-index: 5).

2. **`pointer-events: none` nas imagens** garante que o mouse ainda interage com o iframe do Spline por baixo, mantendo a interatividade 3D original.

3. **`will-change: transform`** nas imagens ativa aceleração por GPU para as animações CSS ficarem perfeitamente suaves (60fps).

4. **`loading="lazy"` no iframe** evita que o Spline carregue antes do usuário chegar nessa seção, melhorando a performance geral da página.

5. **Os delays negativos** nas animações (`-2.5s`, `-5s`) fazem as imagens começarem em fases diferentes do ciclo, evitando que todas se movam de forma sincronizada e mecânica.

6. **Responsividade:** o `clamp()` nas imagens garante que elas se redimensionem proporcionalmente em mobile/tablet. Em telas menores de 480px, considere esconder a imagem do centro (`img-2`) para evitar sobreposição.

---

## RESULTADO ESPERADO

- Usuário chega na seção 3 → botão aparece suavemente com slide-up
- Clica no botão → câmera Spline do museu expande e toma a tela
- As 3 imagens de produto surgem em sequência sobre a cena 3D
- Cada imagem flutua levemente com sway, bounce e zoom — replicando a sensação da câmera de museu
- Opcional: imagens respondem ao mouse do usuário com parallax de profundidade
- O resultado é uma apresentação de produto cinematográfica integrada ao 3D

---
*Prompt gerado em 20/03/2026*
