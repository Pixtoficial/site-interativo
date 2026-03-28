const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const DIR = 'C:\\Users\\T-GAMER\\Desktop\\Claude pojeto';

// Colors
const AZUL   = '0f2e5a';
const VERDE  = '00aeb6';
const BRANCO = 'FFFFFF';
const CINZA  = 'F9FAFB';
const TEXTO  = '1e293b';
const TEXTO_S= '64748b';

function imgBase64(filename) {
  const p = path.join(DIR, filename);
  if (!fs.existsSync(p)) return null;
  const ext = path.extname(filename).replace('.','').replace('jpg','jpeg');
  return 'data:image/' + ext + ';base64,' + fs.readFileSync(p).toString('base64');
}

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

// ─────────────────────────────────────────────
// SLIDE 1 — HERO
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: AZUL };

  // Left column text
  s.addText('GESTÃO DE TRÁFEGO PAGO', {
    x: 0.4, y: 0.6, w: 7, h: 0.35,
    fontSize: 9, bold: true, color: VERDE, charSpacing: 2
  });
  s.addText('Wallace Ferreira', {
    x: 0.4, y: 1.05, w: 7, h: 1.1,
    fontSize: 46, bold: true, color: BRANCO, lineSpacingMultiple: 1.1
  });
  s.addText('Especialista em Tráfego Pago\n& Performance Marketing', {
    x: 0.4, y: 2.3, w: 6.5, h: 0.9,
    fontSize: 18, color: '94a3b8', lineSpacingMultiple: 1.4
  });
  s.addText('Google Ads · Meta Ads · GA4 · GTM · IA Aplicada', {
    x: 0.4, y: 3.35, w: 6.5, h: 0.4,
    fontSize: 11, color: VERDE
  });

  // Stats row
  const stats = [
    ['R$1,6M+', 'por mês em mídia'],
    ['ROAS 35x', 'recorde alcançado'],
    ['15', 'contas ativas'],
    ['4+ anos', 'de experiência'],
  ];
  stats.forEach((st, i) => {
    const x = 0.4 + i * 1.85;
    s.addShape(pptx.ShapeType.rect, { x, y: 4.05, w: 1.7, h: 0.95, fill: { color: '1e3a5f' }, line: { color: VERDE, width: 1.5 }, rectRadius: 0.08 });
    s.addText(st[0], { x, y: 4.1,  w: 1.7, h: 0.42, fontSize: 14, bold: true, color: VERDE, align: 'center' });
    s.addText(st[1], { x, y: 4.52, w: 1.7, h: 0.38, fontSize: 7.5, color: '94a3b8', align: 'center', lineSpacingMultiple: 1.2 });
  });

  // CTA buttons
  s.addShape(pptx.ShapeType.rect, { x: 0.4, y: 5.3, w: 2.2, h: 0.52, fill: { color: VERDE }, rectRadius: 0.1 });
  s.addText('Falar no WhatsApp', { x: 0.4, y: 5.3, w: 2.2, h: 0.52, fontSize: 10, bold: true, color: BRANCO, align: 'center' });

  s.addShape(pptx.ShapeType.rect, { x: 2.75, y: 5.3, w: 2.2, h: 0.52, fill: { color: '1e3a5f' }, line: { color: VERDE, width: 1.5 }, rectRadius: 0.1 });
  s.addText('Ver Cases de Sucesso', { x: 2.75, y: 5.3, w: 2.2, h: 0.52, fontSize: 10, bold: true, color: VERDE, align: 'center' });

  // Photo
  const foto = imgBase64('wallace_perfil.jpeg');
  if (foto) {
    s.addImage({ data: foto, x: 9.2, y: 0.5, w: 3.7, h: 6.5, sizing: { type: 'contain' } });
  }
}

// ─────────────────────────────────────────────
// SLIDE 2 — SOBRE MIM
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };

  s.addText('SOBRE MIM', { x: 0.5, y: 0.35, w: 12, h: 0.3, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('De resultados reais\npara negócios reais', {
    x: 0.5, y: 0.7, w: 7, h: 1.0,
    fontSize: 28, bold: true, color: TEXTO, lineSpacingMultiple: 1.2
  });

  const bio = 'Profissional de marketing digital com mais de 4 anos de experiência em gestão de tráfego pago, especializado em Google Ads, Meta Ads e estratégias de performance.\n\nJá gerenciei mais de R$1,6 milhões em mídia paga mensalmente, trabalhando com e-commerces, lançamentos digitais, empresas B2B e prestadores de serviços.';
  s.addText(bio, {
    x: 0.5, y: 1.85, w: 7.2, h: 2.8,
    fontSize: 11.5, color: TEXTO_S, lineSpacingMultiple: 1.6
  });

  // Skills chips
  const chips = ['Google Ads', 'Meta Ads', 'GA4', 'GTM', 'IA Aplicada', 'E-commerce', 'Lançamentos', 'B2B'];
  chips.forEach((c, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    s.addShape(pptx.ShapeType.rect, { x: 0.5 + col * 1.85, y: 4.85 + row * 0.55, w: 1.7, h: 0.4, fill: { color: 'E0F7F8' }, line: { color: VERDE, width: 1 }, rectRadius: 0.1 });
    s.addText(c, { x: 0.5 + col * 1.85, y: 4.85 + row * 0.55, w: 1.7, h: 0.4, fontSize: 9, bold: true, color: VERDE, align: 'center' });
  });

  // Photo right
  const foto = imgBase64('wallace_perfil.jpeg');
  if (foto) {
    s.addImage({ data: foto, x: 8.3, y: 0.7, w: 4.5, h: 5.5, sizing: { type: 'contain' } });
  }
}

// ─────────────────────────────────────────────
// SLIDE 3 — EXPERIÊNCIA
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: AZUL };

  s.addText('EXPERIÊNCIA PROFISSIONAL', { x: 0.5, y: 0.3, w: 12, h: 0.28, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('Trajetória e evolução', { x: 0.5, y: 0.65, w: 8, h: 0.6, fontSize: 26, bold: true, color: BRANCO });

  const exps = [
    { periodo: 'Jan/2023 – Atual', cargo: 'Gestor de Tráfego Sênior — Autônomo / Freelancer', desc: 'Gestão de múltiplas contas simultaneamente. Clientes ativos em e-commerce, info produto, B2B e serviços. ROAS médio de 12x.' },
    { periodo: 'Jun/2022 – Dez/2022', cargo: 'Analista de Tráfego — Agência Digital', desc: 'Gestão de contas Google Ads e Meta Ads para clientes de médio porte. Implementação de GA4 e GTM.' },
    { periodo: 'Jan/2021 – Mai/2022', cargo: 'Gestor de Tráfego — E-commerce Fashion', desc: 'Responsável pelas campanhas de mídia paga. Crescimento de 311% na receita online em campanha Black Friday.' },
    { periodo: 'Mar/2020 – Dez/2020', cargo: 'Assistente de Marketing Digital', desc: 'Suporte em campanhas de Google Ads e Facebook Ads. Criação de relatórios e dashboards de performance.' },
  ];

  exps.forEach((e, i) => {
    const y = 1.55 + i * 1.35;
    // Dot
    s.addShape(pptx.ShapeType.ellipse, { x: 0.35, y: y + 0.12, w: 0.18, h: 0.18, fill: { color: VERDE }, line: { color: VERDE } });
    // Line (except last)
    if (i < exps.length - 1) {
      s.addShape(pptx.ShapeType.line, { x: 0.435, y: y + 0.3, w: 0.01, h: 1.0, line: { color: VERDE, width: 1.5, dashType: 'dash' } });
    }
    s.addText(e.periodo, { x: 0.7, y, w: 2.5, h: 0.3, fontSize: 8.5, bold: true, color: VERDE });
    s.addText(e.cargo, { x: 0.7, y: y + 0.28, w: 12, h: 0.35, fontSize: 11, bold: true, color: BRANCO });
    s.addText(e.desc, { x: 0.7, y: y + 0.62, w: 12, h: 0.55, fontSize: 9.5, color: '94a3b8', lineSpacingMultiple: 1.4 });
  });
}

// ─────────────────────────────────────────────
// SLIDE 4 — SERVIÇOS
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };

  s.addText('SERVIÇOS', { x: 0.5, y: 0.35, w: 12, h: 0.28, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('O que ofereço', { x: 0.5, y: 0.7, w: 8, h: 0.6, fontSize: 28, bold: true, color: TEXTO });

  const servicos = [
    { icon: '🎯', titulo: 'Gestão de Tráfego Pago', desc: 'Google Ads, Meta Ads, LinkedIn Ads e Instagram Ads. Estratégia, configuração, otimização e escala de campanhas.' },
    { icon: '🧠', titulo: 'Entendimento e Pedida\ndos Criativos', desc: 'Briefing estratégico para criativos de alta performance. Análise de ângulos, hooks e formatos que convertem.' },
    { icon: '📊', titulo: 'Análise e Relatórios', desc: 'Dashboards em GA4, GTM e plataformas de mídia. Relatórios claros com insights acionáveis.' },
    { icon: '🤖', titulo: 'IA Aplicada ao Marketing', desc: 'Uso de inteligência artificial para otimização de campanhas, análise de dados e automação de processos.' },
  ];

  servicos.forEach((sv, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 6.3;
    const y = 1.6 + row * 2.5;

    s.addShape(pptx.ShapeType.rect, { x, y, w: 6.0, h: 2.2, fill: { color: BRANCO }, line: { color: 'E2E8F0', width: 1 }, rectRadius: 0.12, shadow: { type: 'outer', blur: 8, offset: 4, angle: 270, color: '0f2e5a', opacity: 0.08 } });
    s.addText(sv.icon, { x: x + 0.2, y: y + 0.2, w: 0.7, h: 0.7, fontSize: 24 });
    s.addText(sv.titulo, { x: x + 0.2, y: y + 0.85, w: 5.6, h: 0.55, fontSize: 13, bold: true, color: TEXTO, lineSpacingMultiple: 1.2 });
    s.addText(sv.desc, { x: x + 0.2, y: y + 1.38, w: 5.6, h: 0.72, fontSize: 9.5, color: TEXTO_S, lineSpacingMultiple: 1.4 });
  });
}

// ─────────────────────────────────────────────
// SLIDE 5 — RESULTADOS / NÚMEROS
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: AZUL };

  s.addText('RESULTADOS', { x: 0.5, y: 0.3, w: 12, h: 0.28, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('Números que provam performance', { x: 0.5, y: 0.65, w: 10, h: 0.6, fontSize: 26, bold: true, color: BRANCO });

  const nums = [
    { val: 'R$1,6M+', label: 'por mês em mídia gerenciada' },
    { val: 'ROAS 35x', label: 'maior retorno registrado' },
    { val: '15', label: 'contas ativas simultâneas' },
    { val: '23.300', label: 'conversões em um mês' },
    { val: '144+', label: 'campanhas criadas' },
    { val: '4+ anos', label: 'de experiência' },
  ];

  nums.forEach((n, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.45 + col * 4.25;
    const y = 1.55 + row * 2.55;

    s.addShape(pptx.ShapeType.rect, { x, y, w: 4.0, h: 2.25, fill: { color: '1e3a5f' }, line: { color: VERDE, width: 1.5 }, rectRadius: 0.12 });
    s.addText(n.val, { x, y: y + 0.45, w: 4.0, h: 0.85, fontSize: 28, bold: true, color: VERDE, align: 'center' });
    s.addText(n.label, { x, y: y + 1.3, w: 4.0, h: 0.6, fontSize: 9.5, color: '94a3b8', align: 'center', lineSpacingMultiple: 1.3 });
  });
}

// ─────────────────────────────────────────────
// SLIDE 6 — BLACK FRIDAY DESTAQUE
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };

  s.addText('CASE DESTAQUE', { x: 0.5, y: 0.35, w: 12, h: 0.28, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('Black Friday — E-commerce Shopify', { x: 0.5, y: 0.7, w: 12, h: 0.65, fontSize: 26, bold: true, color: TEXTO });

  // Stats
  const bfStats = [
    { val: 'R$51.971', label: 'Faturamento' },
    { val: '148', label: 'Pedidos' },
    { val: '+311%', label: 'vs. ano anterior' },
  ];
  bfStats.forEach((st, i) => {
    const x = 0.5 + i * 2.3;
    s.addShape(pptx.ShapeType.rect, { x, y: 1.55, w: 2.1, h: 1.1, fill: { color: AZUL }, rectRadius: 0.1 });
    s.addText(st.val, { x, y: 1.6, w: 2.1, h: 0.55, fontSize: 18, bold: true, color: VERDE, align: 'center' });
    s.addText(st.label, { x, y: 2.15, w: 2.1, h: 0.35, fontSize: 8.5, color: BRANCO, align: 'center' });
  });

  // Screenshot
  const bf = imgBase64('img_bf.jpeg');
  if (bf) {
    s.addImage({ data: bf, x: 0.5, y: 2.9, w: 12.3, h: 4.3, sizing: { type: 'contain' } });
  }
}

// ─────────────────────────────────────────────
// SLIDE 7 — CASES E-COMMERCE (texto)
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: AZUL };

  s.addText('CASES — E-COMMERCE', { x: 0.5, y: 0.3, w: 12, h: 0.28, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('Resultados em lojas virtuais', { x: 0.5, y: 0.65, w: 10, h: 0.55, fontSize: 26, bold: true, color: BRANCO });

  const cases = [
    { nome: 'Proaventura', desc: '68.599 visitas · R$277K faturamento · Google Shopping + Meta Ads' },
    { nome: 'Roupas Femininas', desc: '318K visitas · R$694K faturamento · 480 vendas · ROAS consistente' },
    { nome: 'Black Prime', desc: 'Escala em Meta Ads com foco em conversão e retargeting dinâmico' },
    { nome: 'Black Friday Shopify', desc: 'R$51.971 em 1 semana · 148 pedidos · +311% vs. ano anterior' },
  ];

  cases.forEach((c, i) => {
    const y = 1.5 + i * 1.35;
    s.addShape(pptx.ShapeType.rect, { x: 0.4, y, w: 12.5, h: 1.2, fill: { color: '1e3a5f' }, line: { color: VERDE, width: 1 }, rectRadius: 0.1 });
    s.addText(c.nome, { x: 0.7, y: y + 0.15, w: 5, h: 0.38, fontSize: 13, bold: true, color: VERDE });
    s.addText(c.desc, { x: 0.7, y: y + 0.55, w: 11.5, h: 0.45, fontSize: 10, color: '94a3b8' });
  });
}

// ─────────────────────────────────────────────
// SLIDE 8 — CASE PROAVENTURA (imagem)
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };
  s.addText('CASE — Proaventura', { x: 0.5, y: 0.3, w: 12, h: 0.35, fontSize: 14, bold: true, color: TEXTO });
  s.addText('68.599 visitas  ·  R$277K faturamento', { x: 0.5, y: 0.75, w: 12, h: 0.35, fontSize: 11, color: VERDE, bold: true });
  const img = imgBase64('img_proaventura.jpeg');
  if (img) s.addImage({ data: img, x: 0.5, y: 1.2, w: 12.3, h: 5.9, sizing: { type: 'contain' } });
}

// ─────────────────────────────────────────────
// SLIDE 9 — CASE ROUPAS FEMININAS (imagem)
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };
  s.addText('CASE — Roupas Femininas', { x: 0.5, y: 0.3, w: 12, h: 0.35, fontSize: 14, bold: true, color: TEXTO });
  s.addText('318K visitas  ·  R$694K faturamento  ·  480 vendas', { x: 0.5, y: 0.75, w: 12, h: 0.35, fontSize: 11, color: VERDE, bold: true });
  const img = imgBase64('img_roupas_fem.jpeg');
  if (img) s.addImage({ data: img, x: 0.5, y: 1.2, w: 12.3, h: 5.9, sizing: { type: 'contain' } });
}

// ─────────────────────────────────────────────
// SLIDE 10 — CASE ALL PROTEIN (imagem)
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };
  s.addText('CASE — All Protein', { x: 0.5, y: 0.3, w: 12, h: 0.35, fontSize: 14, bold: true, color: TEXTO });
  s.addText('R$607K faturamento  ·  Investimento R$210K  ·  Google/CPC 37,96%', { x: 0.5, y: 0.75, w: 12, h: 0.35, fontSize: 11, color: VERDE, bold: true });
  const img = imgBase64('img_allprotein.jpeg');
  if (img) s.addImage({ data: img, x: 0.5, y: 1.2, w: 12.3, h: 5.9, sizing: { type: 'contain' } });
}

// ─────────────────────────────────────────────
// SLIDE 11 — CASES INFO PRODUTO
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: AZUL };

  s.addText('CASES — INFO PRODUTO', { x: 0.5, y: 0.3, w: 12, h: 0.28, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('Lançamentos e perpétuos de alto impacto', { x: 0.5, y: 0.65, w: 10, h: 0.55, fontSize: 24, bold: true, color: BRANCO });

  const cases = [
    { nome: 'Lucia Barros', desc: 'Campanhas de info produto com estrutura BLM_RGP · Otimização de CPL e CPA' },
    { nome: 'Julian — LATAM', desc: 'Campanhas em múltiplos países da América Latina · Escala internacional' },
    { nome: 'Julian — Lançamento', desc: '$10.000 USD investidos · CPL $0,39 · Faturamento $25.000 USD' },
  ];

  cases.forEach((c, i) => {
    const y = 1.5 + i * 1.55;
    s.addShape(pptx.ShapeType.rect, { x: 0.4, y, w: 12.5, h: 1.35, fill: { color: '1e3a5f' }, line: { color: VERDE, width: 1 }, rectRadius: 0.1 });
    s.addText(c.nome, { x: 0.7, y: y + 0.15, w: 5, h: 0.4, fontSize: 14, bold: true, color: VERDE });
    s.addText(c.desc, { x: 0.7, y: y + 0.62, w: 11.5, h: 0.5, fontSize: 10.5, color: '94a3b8' });
  });
}

// ─────────────────────────────────────────────
// SLIDE 12 — LUCIA BARROS (imagem)
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };
  s.addText('CASE — Lucia Barros', { x: 0.5, y: 0.3, w: 12, h: 0.35, fontSize: 14, bold: true, color: TEXTO });
  s.addText('Info Produto  ·  Estrutura BLM_RGP  ·  Otimização CPL', { x: 0.5, y: 0.75, w: 12, h: 0.35, fontSize: 11, color: VERDE, bold: true });
  const img = imgBase64('img_lucia.jpeg');
  if (img) s.addImage({ data: img, x: 0.5, y: 1.2, w: 12.3, h: 5.9, sizing: { type: 'contain' } });
}

// ─────────────────────────────────────────────
// SLIDE 13 — JULIAN LATAM (imagem)
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };
  s.addText('CASE — Julian LATAM', { x: 0.5, y: 0.3, w: 12, h: 0.35, fontSize: 14, bold: true, color: TEXTO });
  s.addText('Campanhas Internacionais  ·  América Latina', { x: 0.5, y: 0.75, w: 12, h: 0.35, fontSize: 11, color: VERDE, bold: true });
  const img = imgBase64('img_julian.jpeg');
  if (img) s.addImage({ data: img, x: 0.5, y: 1.2, w: 12.3, h: 5.9, sizing: { type: 'contain' } });
}

// ─────────────────────────────────────────────
// SLIDE 14 — JULIAN LANÇAMENTO (imagem)
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };
  s.addText('CASE — Julian Lançamento', { x: 0.5, y: 0.3, w: 12, h: 0.35, fontSize: 14, bold: true, color: TEXTO });
  s.addText('$10K USD investidos  ·  CPL $0,39  ·  Faturamento $25K USD', { x: 0.5, y: 0.75, w: 12, h: 0.35, fontSize: 11, color: VERDE, bold: true });
  const img = imgBase64('img_julian_launch.png');
  if (img) s.addImage({ data: img, x: 0.5, y: 1.2, w: 12.3, h: 5.9, sizing: { type: 'contain' } });
}

// ─────────────────────────────────────────────
// SLIDE 15 — BLACK PRIME (imagem)
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };
  s.addText('CASE — Black Prime', { x: 0.5, y: 0.3, w: 12, h: 0.35, fontSize: 14, bold: true, color: TEXTO });
  s.addText('E-commerce  ·  Meta Ads  ·  Escala e conversão', { x: 0.5, y: 0.75, w: 12, h: 0.35, fontSize: 11, color: VERDE, bold: true });
  const img = imgBase64('img_blackprime.jpeg');
  if (img) s.addImage({ data: img, x: 0.5, y: 1.2, w: 12.3, h: 5.9, sizing: { type: 'contain' } });
}

// ─────────────────────────────────────────────
// SLIDE 16 — FERRAMENTAS
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: CINZA };

  s.addText('FERRAMENTAS', { x: 0.5, y: 0.35, w: 12, h: 0.28, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('Stack de trabalho', { x: 0.5, y: 0.7, w: 8, h: 0.6, fontSize: 28, bold: true, color: TEXTO });

  const tools = [
    { name: 'Google Ads', cor: '4285F4' },
    { name: 'Meta Ads', cor: '0866FF' },
    { name: 'Instagram Ads', cor: 'E1306C' },
    { name: 'LinkedIn Ads', cor: '0A66C2' },
    { name: 'Google Analytics 4', cor: 'F9AB00' },
    { name: 'Google Tag Manager', cor: '4285F4' },
    { name: 'IA Aplicada', cor: '8B5CF6' },
  ];

  tools.forEach((t, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.5 + col * 3.1;
    const y = 1.65 + row * 1.55;
    s.addShape(pptx.ShapeType.rect, { x, y, w: 2.85, h: 1.3, fill: { color: BRANCO }, line: { color: 'E2E8F0', width: 1 }, rectRadius: 0.1 });
    s.addShape(pptx.ShapeType.rect, { x: x + 0.15, y: y + 0.15, w: 0.25, h: 0.25, fill: { color: t.cor }, rectRadius: 0.04 });
    s.addText(t.name, { x: x + 0.15, y: y + 0.55, w: 2.55, h: 0.55, fontSize: 11, bold: true, color: TEXTO, align: 'center', lineSpacingMultiple: 1.2 });
  });
}

// ─────────────────────────────────────────────
// SLIDE 17 — CONTATO
// ─────────────────────────────────────────────
{
  const s = pptx.addSlide();
  s.background = { color: AZUL };

  s.addText('CONTATO', { x: 0.5, y: 0.35, w: 12, h: 0.28, fontSize: 9, bold: true, color: VERDE, charSpacing: 2 });
  s.addText('Vamos conversar sobre\no seu projeto?', {
    x: 0.5, y: 0.7, w: 10, h: 1.3,
    fontSize: 32, bold: true, color: BRANCO, lineSpacingMultiple: 1.2
  });

  const contatos = [
    { icon: '📱', label: 'WhatsApp', valor: '+55 (11) 99999-9999' },
    { icon: '📧', label: 'E-mail', valor: 'wallace@email.com' },
    { icon: '📸', label: 'Instagram', valor: '@wallace_mkt' },
    { icon: '💼', label: 'LinkedIn', valor: 'linkedin.com/in/wallaceferreira' },
  ];

  contatos.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 6.3;
    const y = 2.3 + row * 1.85;
    s.addShape(pptx.ShapeType.rect, { x, y, w: 6.0, h: 1.6, fill: { color: '1e3a5f' }, line: { color: VERDE, width: 1.5 }, rectRadius: 0.12 });
    s.addText(c.icon, { x: x + 0.25, y: y + 0.3, w: 0.7, h: 0.7, fontSize: 22 });
    s.addText(c.label, { x: x + 1.1, y: y + 0.25, w: 4.5, h: 0.38, fontSize: 10, bold: true, color: VERDE });
    s.addText(c.valor, { x: x + 1.1, y: y + 0.65, w: 4.5, h: 0.38, fontSize: 11, color: BRANCO });
  });

  s.addText('Wallace Ferreira — Gestor de Tráfego Pago & Performance Marketing', {
    x: 0.5, y: 6.9, w: 12.3, h: 0.3,
    fontSize: 8, color: '475569', align: 'center'
  });
}

// ─────────────────────────────────────────────
// SAVE
// ─────────────────────────────────────────────
const outPath = path.join(DIR, 'portfolio_wallace_ferreira.pptx');
pptx.writeFile({ fileName: outPath })
  .then(() => {
    const size = fs.statSync(outPath).size;
    console.log('OK:', outPath);
    console.log('Size:', (size / 1024 / 1024).toFixed(2) + ' MB');
  })
  .catch(err => { console.error('ERROR:', err); process.exit(1); });
