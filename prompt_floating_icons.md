# PROMPT — ADICIONAR SEÇÃO FLOATING ICONS HERO no index (10) (1).html

## ARQUIVO ALVO
`C:\Users\T-GAMER\Desktop\Claude pojeto\index (10) (1).html`

---

## CONTEXTO DO ARQUIVO
É um site HTML estático com Tailwind CSS (CDN), JavaScript vanilla, sem React nem Node.js.
A estrutura de dobras é:
- `#agentes-zoom` → termina na linha ~1296 (dobra 3, animação zoom-mask)
- `#integracoes` → linha ~1299 (dobra com logos de CRMs)
- `#jornada` → linha ~1490

---

## O QUE FAZER

Inserir uma **nova seção HTML** logo após o fechamento da section `#agentes-zoom` (`</section>`) e antes da section `#integracoes`. A seção deve implementar o componente **Floating Icons Hero** descrito abaixo, adaptado para HTML/CSS/JavaScript vanilla (sem React, sem framer-motion).

---

## SEÇÃO A INSERIR

Cole o HTML completo abaixo entre `</section>` (fim do `#agentes-zoom`) e `<section id="integracoes"`:

```html
<!-- FLOATING ICONS HERO -->
<section id="floating-hero" class="relative w-full bg-[#050505] overflow-hidden" style="min-height: 100vh;">

  <!-- Ícones flutuantes ao fundo -->
  <div id="floating-icons-container" class="absolute inset-0 w-full h-full pointer-events-none">

    <!-- Google -->
    <div class="floating-icon absolute" style="top:10%;left:10%;animation-delay:0s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none"><path d="M21.9999 12.24C21.9999 11.4933 21.9333 10.76 21.8066 10.0533H12.3333V14.16H17.9533C17.7333 15.3467 17.0133 16.3733 15.9666 17.08V19.68H19.5266C21.1933 18.16 21.9999 15.4533 21.9999 12.24Z" fill="#4285F4"/><path d="M12.3333 22C15.2333 22 17.6866 21.0533 19.5266 19.68L15.9666 17.08C15.0199 17.7333 13.7933 18.16 12.3333 18.16C9.52659 18.16 7.14659 16.28 6.27992 13.84H2.59326V16.5133C4.38659 20.0267 8.05992 22 12.3333 22Z" fill="#34A853"/><path d="M6.2799 13.84C6.07324 13.2267 5.9599 12.58 5.9599 11.92C5.9599 11.26 6.07324 10.6133 6.2799 10L2.59326 7.32667C1.86659 8.78667 1.45326 10.32 1.45326 11.92C1.45326 13.52 1.86659 15.0533 2.59326 16.5133L6.2799 13.84Z" fill="#FBBC05"/><path d="M12.3333 5.68C13.8933 5.68 15.3133 6.22667 16.3866 7.24L19.6 4.02667C17.68 2.29333 15.2266 1.33333 12.3333 1.33333C8.05992 1.33333 4.38659 3.97333 2.59326 7.32667L6.27992 10C7.14659 7.56 9.52659 5.68 12.3333 5.68Z" fill="#EA4335"/></svg>
      </div>
    </div>

    <!-- Microsoft -->
    <div class="floating-icon absolute" style="top:80%;left:10%;animation-delay:0.4s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none"><path d="M11.4 2H2v9.4h9.4V2Z" fill="#F25022"/><path d="M22 2h-9.4v9.4H22V2Z" fill="#7FBA00"/><path d="M11.4 12.6H2V22h9.4V12.6Z" fill="#00A4EF"/><path d="M22 12.6h-9.4V22H22V12.6Z" fill="#FFB900"/></svg>
      </div>
    </div>

    <!-- GitHub -->
    <div class="floating-icon absolute" style="top:5%;left:30%;animation-delay:0.8s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </div>
    </div>

    <!-- Slack -->
    <div class="floating-icon absolute" style="top:5%;right:30%;animation-delay:1.2s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none"><path d="M8.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="#36C5F0"/><path d="M9 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#2EB67D"/><path d="M14 8.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" fill="#ECB22E"/><path d="M15.5 15a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" fill="#E01E5A"/></svg>
      </div>
    </div>

    <!-- Apple -->
    <div class="floating-icon absolute" style="top:20%;right:8%;animation-delay:1.6s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 71 0 130.1 46.4 174.5 46.4 42.8 0 109.6-49.1 192.7-49.1l34.3.4zm-64.4-169.5c31.4-37.9 53.5-90.5 53.5-143.1 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.9-55.1 139.2 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.1-71.2z"/></svg>
      </div>
    </div>

    <!-- Stripe -->
    <div class="floating-icon absolute" style="top:40%;left:5%;animation-delay:2.0s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none"><path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#635BFF"/><path d="M6 7H18V9H6V7Z" fill="white"/><path d="M6 11H18V13H6V11Z" fill="white"/><path d="M6 15H14V17H6V15Z" fill="white"/></svg>
      </div>
    </div>

    <!-- Discord -->
    <div class="floating-icon absolute" style="top:75%;right:25%;animation-delay:2.4s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none"><path d="M20.317 4.482a1.88 1.88 0 0 0-1.635-.482C17.398 3.42 16.02 3 12 3s-5.398.42-6.682 1.001a1.88 1.88 0 0 0-1.635.483c-1.875 1.2-2.325 3.61-1.568 5.711 1.62 4.47 5.063 7.8 9.885 7.8s8.265-3.33 9.885-7.8c.757-2.1-.307-4.51-1.568-5.711ZM8.45 13.4c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Zm7.1 0c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Z" fill="#5865F2"/></svg>
      </div>
    </div>

    <!-- X (Twitter) -->
    <div class="floating-icon absolute" style="top:90%;left:70%;animation-delay:2.8s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.03 19.75h1.866L7.156 4.25H5.16l11.874 15.5z"/></svg>
      </div>
    </div>

    <!-- Notion -->
    <div class="floating-icon absolute" style="top:50%;right:5%;animation-delay:3.2s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>
      </div>
    </div>

    <!-- Vercel -->
    <div class="floating-icon absolute" style="bottom:8%;left:25%;animation-delay:3.6s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
      </div>
    </div>

    <!-- Figma -->
    <div class="floating-icon absolute" style="bottom:10%;right:10%;animation-delay:4.0s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 38 57" fill="none"><path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/><path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/><path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/><path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/><path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/></svg>
      </div>
    </div>

    <!-- Spotify -->
    <div class="floating-icon absolute" style="top:55%;left:5%;animation-delay:4.4s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.125 14.175c-.188.3-.563.413-.863.225-2.437-1.5-5.5-1.725-9.15-1.012-.338.088-.675-.15-.763-.488-.088-.337.15-.675.488-.762 3.937-.787 7.287-.525 9.975 1.125.3.187.412.562.225.862zm.9-2.7c-.225.363-.675.488-1.037.263-2.7-1.65-6.825-2.1-9.975-1.162-.413.113-.825-.15-1-.562-.15-.413.15-.825.563-1 .362-.112 3.487-.975 6.6 1.312.362.225.487.675.262 1.038v.112zm.113-2.887c-3.225-1.875-8.55-2.025-11.512-1.125-.487.15-.975-.15-1.125-.637-.15-.488.15-.975.638-1.125 3.337-.975 9.15-.787 12.825 1.312.45.263.6.825.337 1.275-.263.45-.825.6-1.275.337v-.038z" fill="#1DB954"/></svg>
      </div>
    </div>

    <!-- YouTube -->
    <div class="floating-icon absolute" style="top:60%;left:30%;animation-delay:4.8s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none"><path d="M21.582 6.186A2.482 2.482 0 0 0 19.82 4.42C18.1 4 12 4 12 4s-6.1 0-7.82.42c-.98.26-1.74.98-1.762 1.766C2 7.94 2 12 2 12s0 4.06.418 5.814c.022.786.782 1.506 1.762 1.766C6.1 20 12 20 12 20s6.1 0 7.82-.42c.98-.26 1.74-.98 1.762-1.766C22 16.06 22 12 22 12s0-4.06-.418-5.814zM9.75 15.5V8.5L15.75 12 9.75 15.5z" fill="#FF0000"/></svg>
      </div>
    </div>

    <!-- Twitch -->
    <div class="floating-icon absolute" style="bottom:5%;right:45%;animation-delay:5.2s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none"><path d="M2.149 0L.707 3.028v17.944h5.66v3.028h3.028l3.028-3.028h4.243l7.07-7.07V0H2.15zm19.799 13.434l-3.535 3.535h-4.95l-3.029 3.029v-3.03H5.14V1.414h16.808v12.02z" fill="#9146FF"/><path d="M15.53 5.303h2.12v6.36h-2.12v-6.36zm-4.95 0h2.12v6.36h-2.12v-6.36z" fill="#9146FF"/></svg>
      </div>
    </div>

    <!-- Linear -->
    <div class="floating-icon absolute" style="top:25%;right:20%;animation-delay:5.6s;">
      <div class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 p-3 rounded-3xl shadow-xl bg-white/10 backdrop-blur-md border border-white/10">
        <svg class="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 100 100" fill="none"><path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L37.3216 95.177c.6889.6889.0915 1.8189-.857 1.5964C19.0069 92.4 5.5997 78.9931 1.22541 61.5228zM.00189135 46.8891c-.01764375 1.2233 1.44490665 1.8527 2.33445565.9632L52.1067 .00189135c.8896-.88954.2602-2.35208-.9632-2.33444635C23.2946.0557.557 23.2946.00189135 46.8891zM8.96702 63.5749c-.14601-.4927.08764-.9277.40116-1.2401L98.3967 3.12589c.3124-.31352.7474-.54717 1.2401-.40116.4927.14601.5705.69553.5705 1.2401V27.1379c0 2.2776-1.7224 4-4 4H8.96702c-.4927 0-.94669-.0778-1.09269-.5705z" fill="url(#linear-g)"/><defs><linearGradient id="linear-g" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#5E5CE6"/><stop offset="1" stop-color="#2C2C2C"/></linearGradient></defs></svg>
      </div>
    </div>

  </div>

  <!-- Conteúdo central -->
  <div class="relative z-10 flex items-center justify-center w-full h-full" style="min-height: 100vh;">
    <div class="text-center px-4 max-w-4xl mx-auto">
      <h1 class="text-5xl md:text-7xl font-bold tracking-tight font-display" style="background: linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.7)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        A World of Innovation
      </h1>
      <p class="mt-6 max-w-xl mx-auto text-lg" style="color: #a1a1aa;">
        Explore a universe of possibilities with our platform, connecting you to the tools and technologies that shape the future.
      </p>
      <div class="mt-10">
        <a href="#contact" class="inline-flex items-center gap-2 px-8 py-4 bg-[#c6f432] text-black font-bold text-base rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(198,244,50,0.3)]">
          Join the Revolution
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>
  </div>

</section>
```

---

## CSS A ADICIONAR no `<style>` dentro do `<head>`

Cole dentro do bloco `<style>` existente:

```css
/* === FLOATING ICONS HERO === */
.floating-icon {
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.floating-icon > div {
  animation: floatIcon 6s ease-in-out infinite;
}

@keyframes floatIcon {
  0%   { transform: translateY(0px) translateX(0px) rotate(0deg); }
  25%  { transform: translateY(-8px) translateX(3px) rotate(3deg); }
  50%  { transform: translateY(-4px) translateX(-3px) rotate(-2deg); }
  75%  { transform: translateY(-10px) translateX(2px) rotate(4deg); }
  100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
}
```

---

## JAVASCRIPT A ADICIONAR antes do `</script>` final

Cole este bloco antes do fechamento do `<script>` principal:

```javascript
// === FLOATING ICONS HERO — Mouse Repel ===
(function() {
  const section = document.getElementById('floating-hero');
  if (!section) return;

  let mouseX = 0, mouseY = 0;

  section.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const icons = section.querySelectorAll('.floating-icon');
    icons.forEach(function(icon) {
      const rect = icon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      if (distance < 150) {
        const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
        const force = (1 - distance / 150) * 60;
        icon.style.transform = 'translate(' + (-Math.cos(angle) * force) + 'px, ' + (-Math.sin(angle) * force) + 'px)';
      } else {
        icon.style.transform = 'translate(0, 0)';
      }
    });
  });

  section.addEventListener('mouseleave', function() {
    const icons = section.querySelectorAll('.floating-icon');
    icons.forEach(function(icon) {
      icon.style.transform = 'translate(0, 0)';
    });
  });
})();
```

---

## RESULTADO ESPERADO

- A nova seção aparece imediatamente após o scroll da dobra 3 (`#agentes-zoom`)
- 16 ícones de tecnologia flutuam continuamente pela tela com animações CSS
- Ao mover o mouse sobre os ícones, eles se repelem suavemente
- Título, subtítulo e botão CTA centralizados
- Ao continuar scrollando, vai para a dobra seguinte (`#integracoes`)
- Totalmente vanilla HTML/CSS/JS — sem React, sem dependências externas
