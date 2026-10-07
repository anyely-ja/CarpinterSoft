import React, { useState } from 'react';
import { AppView } from '../types';
import { FURNITURE_MODELS, TESTIMONIALS, WOOD_OPTIONS } from '../data/furnitureData';

interface LandingPageProps {
  onNavigate: (view: AppView, modelId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  // Interactive Simulation State in Hero
  const [heroWidth, setHeroWidth] = useState(180);
  const [heroHeight, setHeroHeight] = useState(85);
  const [heroDepth, setHeroDepth] = useState(45);
  const [viewAngle, setViewAngle] = useState<'frontal' | 'isometric' | 'top'>('frontal');
  const [activeWood, setActiveWood] = useState('roble');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Dynamic Algorithmic Price in Hero
  const heroPrice = Math.round(
    950 +
    (heroWidth - 120) * 3.8 +
    (heroHeight - 65) * 2.4 +
    (heroDepth - 35) * 3.2
  );

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. HERO SECTION */}
      <section className="relative w-full px-4 sm:px-6 md:px-10 pt-8 md:pt-14 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-12">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-label-technical text-label-technical mb-6 shadow-sm border border-border-subtle">
            <span className="material-symbols-outlined text-[16px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              view_in_ar
            </span>
            <span className="tracking-wide uppercase font-semibold">
              Plataforma 3D & Fabricación Digital de Muebles
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-bold max-w-4xl mb-6 leading-tight">
            Diseña a tu medida exacta. <br className="hidden md:block" />
            <span className="text-secondary-container">Cotiza en tiempo real.</span> Fabricamos sin errores.
          </h1>

          <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-3xl mb-8 leading-relaxed">
            Transforma cualquier espacio con muebles personalizados en un visor 3D interactivo. Ajusta dimensiones milimétricas, maderas nobles y acabados con cálculo de costos automático y asistencia de IA.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('personalizador-3d')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-secondary-container hover:bg-accent-hover text-on-primary font-headline-sm text-base font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              <span>Comenzar a Diseñar en 3D</span>
            </button>
            <button
              onClick={() => onNavigate('explorar-catalogo')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-surface-card hover:bg-surface-container text-text-primary font-headline-sm text-base font-semibold transition-all shadow-sm border border-border-subtle cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">explore</span>
              <span>Explorar Catálogo</span>
            </button>
          </div>
        </div>

        {/* Interactive 3D Workstation Simulation */}
        <div className="max-w-6xl mx-auto relative rounded-2xl bg-surface-card shadow-2xl p-3 md:p-5 border border-border-subtle">
          {/* Top Chrome Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 px-2 text-on-surface-variant text-label-technical font-label-technical border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-error/70"></span>
              <span className="w-3 h-3 rounded-full bg-secondary-container/70"></span>
              <span className="w-3 h-3 rounded-full bg-state-success/70"></span>
              <span className="ml-2 text-text-primary font-semibold">Carpintersoft Studio v3.4 — Motor WebGL 60 FPS</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-state-success"></span> Servidor Sincronizado
              </span>
              <span>Tolerancia: ±0.2 mm</span>
            </div>
          </div>

          {/* Main Visualizer Canvas Area with Overlays */}
          <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center group">
            {/* Render Base Image */}
            <img
              alt="Aparador escandinavo de roble nórdico en ambiente diáfano"
              className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.02]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsctbzRjGOOyhLRFXoIuf0DHed8X_ZRV3GR42BQ29ghBeo_8uI9nRxdDgAI1FrDvrxb1k14GqDsCLTg8_YHyrA0O1sTigRsaV5vMmpvJUD_OJiBqsQuBRF1XTE7z53SpWodnHUgesJ2Jb5UkpR1f8iOyn03ltMAvroY-Fas-NfE0lQH_DYyS2KPLRojc4OA4BvnBcnyYTDj5X49s_sUoMKAWg1IZ1irmnGGCEupDmwBbLnavrTfdaB3w"
            />

            {/* Floating UI: Top Left (Product & 360 View Mode) */}
            <div className="absolute top-4 left-4 p-4 rounded-xl bg-surface-card/95 backdrop-blur-md shadow-xl max-w-xs md:max-w-sm border border-border-subtle">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary font-semibold">
                  Modelo Paramétrico
                </span>
                <span className="px-2 py-0.5 rounded bg-state-success/15 text-state-success font-label-technical text-[11px] font-bold">
                  360° Activo
                </span>
              </div>
              <h3 className="font-headline-sm text-base md:text-lg text-text-primary font-bold leading-snug mb-3">
                Aparador Escandinavo Nórdico
              </h3>
              <div className="flex items-center gap-1 p-1 bg-surface-container rounded-lg">
                <button
                  onClick={() => setViewAngle('frontal')}
                  className={`px-3 py-1 text-label-technical font-label-technical font-semibold rounded transition-colors cursor-pointer ${
                    viewAngle === 'frontal' ? 'bg-surface-card text-text-primary shadow-xs' : 'text-on-surface-variant hover:text-text-primary'
                  }`}
                >
                  Frontal
                </button>
                <button
                  onClick={() => setViewAngle('isometric')}
                  className={`px-3 py-1 text-label-technical font-label-technical font-semibold rounded transition-colors cursor-pointer ${
                    viewAngle === 'isometric' ? 'bg-surface-card text-text-primary shadow-xs' : 'text-on-surface-variant hover:text-text-primary'
                  }`}
                >
                  Isométrica
                </button>
                <button
                  onClick={() => setViewAngle('top')}
                  className={`px-3 py-1 text-label-technical font-label-technical font-semibold rounded transition-colors cursor-pointer ${
                    viewAngle === 'top' ? 'bg-surface-card text-text-primary shadow-xs' : 'text-on-surface-variant hover:text-text-primary'
                  }`}
                >
                  Superior
                </button>
              </div>
            </div>

            {/* Floating UI: Bottom Left (Dimension Sliders) */}
            <div className="hidden md:flex flex-col gap-2.5 absolute bottom-4 left-4 p-4 rounded-xl bg-surface-card/95 backdrop-blur-md shadow-xl w-72 border border-border-subtle">
              <div className="flex items-center justify-between text-text-primary font-label-technical text-label-technical uppercase font-bold">
                <span>Ajuste Milimétrico</span>
                <span className="text-secondary-container material-symbols-outlined text-[18px]">straighten</span>
              </div>

              {/* Width Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-label-technical text-[11px] text-on-surface-variant">
                  <span>Ancho (W)</span>
                  <span className="font-bold text-text-primary font-label-numeric">{heroWidth} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="260"
                  value={heroWidth}
                  onChange={(e) => setHeroWidth(Number(e.target.value))}
                  className="w-full accent-secondary-container h-1.5 bg-surface-container-high rounded-full cursor-pointer"
                />
              </div>

              {/* Height Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-label-technical text-[11px] text-on-surface-variant">
                  <span>Alto (H)</span>
                  <span className="font-bold text-text-primary font-label-numeric">{heroHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="105"
                  value={heroHeight}
                  onChange={(e) => setHeroHeight(Number(e.target.value))}
                  className="w-full accent-primary-variant h-1.5 bg-surface-container-high rounded-full cursor-pointer"
                />
              </div>

              {/* Depth Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-label-technical text-[11px] text-on-surface-variant">
                  <span>Profundidad (D)</span>
                  <span className="font-bold text-text-primary font-label-numeric">{heroDepth} cm</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="60"
                  value={heroDepth}
                  onChange={(e) => setHeroDepth(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-high rounded-full cursor-pointer"
                />
              </div>
            </div>

            {/* Floating UI: Bottom Right (Real-time Algorithmic Quotation Card) */}
            <div className="absolute bottom-4 right-4 p-4 rounded-xl bg-surface-card/95 backdrop-blur-md shadow-xl max-w-xs w-full text-left border border-border-subtle">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-state-success animate-pulse"></span>
                <span className="font-label-technical text-[11px] text-state-success font-semibold uppercase">
                  Cálculo algorítmico exacto
                </span>
              </div>
              <div className="font-price-hero text-2xl md:text-3xl text-text-primary font-bold mb-1">
                ${heroPrice.toLocaleString()} <span className="text-body-sm font-normal text-on-surface-variant">USD</span>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant leading-tight mb-3">
                Incluye madera maciza de Roble Natural, herrajes Blum y calibración de corte en taller.
              </p>
              <button
                onClick={() => onNavigate('personalizador-3d')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-text-primary hover:bg-primary-variant text-on-primary font-body-sm text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Abrir en Estudio 3D</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Floating Viewport Orbit Control Tool (Top Right) */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 p-1.5 rounded-xl bg-surface-card/90 backdrop-blur-md shadow-lg border border-border-subtle">
              <button
                onClick={() => setHeroWidth(prev => (prev === 180 ? 220 : 180))}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container text-text-primary transition-colors cursor-pointer"
                title="Probar rotación 360°"
              >
                <span className="material-symbols-outlined text-[20px]">360</span>
              </button>
              <button
                onClick={() => onNavigate('personalizador-3d')}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container text-text-primary transition-colors cursor-pointer"
                title="Entrar a zoom detallado"
              >
                <span className="material-symbols-outlined text-[20px]">zoom_in</span>
              </button>
              <button
                onClick={() => onNavigate('despiece-lista-de-corte')}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-container text-text-primary transition-colors cursor-pointer"
                title="Modo Malla CNC"
              >
                <span className="material-symbols-outlined text-[20px]">grid_4x4</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. METRICS & TRUST STRIP */}
      <section className="w-full bg-surface-container-low py-12 md:py-16 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="p-6 rounded-2xl bg-surface-card shadow-sm flex flex-col items-start justify-center transition-all hover:shadow-md border border-border-subtle">
              <div className="flex items-center gap-2 text-secondary-container mb-2">
                <span className="material-symbols-outlined text-[24px]">verified</span>
                <span className="font-label-technical text-label-technical uppercase text-on-surface-variant font-semibold">Tolerancia Cero</span>
              </div>
              <span className="font-price-hero text-3xl md:text-4xl text-text-primary font-bold leading-none mb-2">90%</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Menos errores de cotización manual y ajustes en taller físico.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card shadow-sm flex flex-col items-start justify-center transition-all hover:shadow-md border border-border-subtle">
              <div className="flex items-center gap-2 text-primary-variant mb-2">
                <span className="material-symbols-outlined text-[24px]">deployed_code</span>
                <span className="font-label-technical text-label-technical uppercase text-on-surface-variant font-semibold">Tecnología WebGL</span>
              </div>
              <span className="font-price-hero text-3xl md:text-4xl text-text-primary font-bold leading-none mb-2">100%</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Visualización paramétrica en tiempo real sin esperas de render.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card shadow-sm flex flex-col items-start justify-center transition-all hover:shadow-md border border-border-subtle">
              <div className="flex items-center gap-2 text-secondary mb-2">
                <span className="material-symbols-outlined text-[24px]">inventory_2</span>
                <span className="font-label-technical text-label-technical uppercase text-on-surface-variant font-semibold">Producción Real</span>
              </div>
              <span className="font-price-hero text-3xl md:text-4xl text-text-primary font-bold leading-none mb-2">+1,500</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Muebles de autor a medida fabricados e instalados con éxito.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card shadow-sm flex flex-col items-start justify-center transition-all hover:shadow-md border border-border-subtle">
              <div className="flex items-center gap-2 text-secondary-container mb-2">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-label-technical text-label-technical uppercase text-on-surface-variant font-semibold">Reputación</span>
              </div>
              <span className="font-price-hero text-3xl md:text-4xl text-text-primary font-bold leading-none mb-2">4.9/5</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Índice de satisfacción certificado de arquitectos, clientes y carpinteros.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-secondary font-label-technical text-label-technical uppercase font-bold tracking-wider mb-2">
                <span className="material-symbols-outlined text-[16px]">schema</span>
                <span>Flujo de Trabajo Simplificado</span>
              </div>
              <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-text-primary font-bold">
                Cómo funciona Carpintersoft
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              De una idea abstracta a una pieza arquitectónica ensamblada en tu salón, sin intermediarios opacos ni presupuestos lentos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-border-subtle">
              <span className="font-label-numeric text-[64px] font-bold text-surface-container-highest absolute -top-4 -right-2 select-none opacity-60">01</span>
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-text-primary mb-6 relative z-10">
                <span className="material-symbols-outlined text-[26px]">grid_view</span>
              </div>
              <h3 className="font-headline-sm text-lg text-text-primary font-bold mb-2 relative z-10">
                Explora o parte de cero
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant relative z-10">
                Elige entre nuestra curaduría de diseños contemporáneos o define una volumetría personalizada libre adaptada a tu nicho.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-border-subtle">
              <span className="font-label-numeric text-[64px] font-bold text-surface-container-highest absolute -top-4 -right-2 select-none opacity-60">02</span>
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary-container mb-6 relative z-10">
                <span className="material-symbols-outlined text-[26px]">tune</span>
              </div>
              <h3 className="font-headline-sm text-lg text-text-primary font-bold mb-2 relative z-10">
                Personaliza en 3D
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant relative z-10">
                Modifica milímetro a milímetro: alto, ancho, fondo, partición de cajones, frentes ranurados y texturas en tiempo real con WebGL.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-border-subtle">
              <span className="font-label-numeric text-[64px] font-bold text-surface-container-highest absolute -top-4 -right-2 select-none opacity-60">03</span>
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-variant mb-6 relative z-10">
                <span className="material-symbols-outlined text-[26px]">calculate</span>
              </div>
              <h3 className="font-headline-sm text-lg text-text-primary font-bold mb-2 relative z-10">
                Cotización algorítmica
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant relative z-10">
                Cada madera y dimensión recalcula el precio final al segundo mediante fórmulas directas de taller. Cero sobrecostes imprevistos.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-border-subtle">
              <span className="font-label-numeric text-[64px] font-bold text-surface-container-highest absolute -top-4 -right-2 select-none opacity-60">04</span>
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-state-success mb-6 relative z-10">
                <span className="material-symbols-outlined text-[26px]">handyman</span>
              </div>
              <h3 className="font-headline-sm text-lg text-text-primary font-bold mb-2 relative z-10">
                Taller & Entrega Experta
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant relative z-10">
                Generamos planos de despiece automáticos para carpinteros certificados con garantía estructural, transporte e instalación fina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPOTLIGHT: PERSONALIZADOR 3D Y MATERIALES NOBLES */}
      <section className="w-full bg-surface-container-low py-16 md:py-24 px-4 sm:px-6 md:px-10 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left details and Wood library */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary font-bold">
                  Librería de Materias Primas
                </span>
                <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-text-primary font-bold mt-1 mb-3">
                  Maderas nobles, vetas continuas y herrajes de ingeniería
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Cada textura en Carpintersoft proviene de escaneos fotogramétricos 4K de piezas de aserradero reales, asegurando que lo que diseñas en pantalla sea fiel a la pieza fabricada.
                </p>
              </div>

              {/* Material Selectors Grid */}
              <div className="space-y-2">
                <span className="font-label-technical text-label-technical text-text-primary uppercase font-bold">
                  Selección Activa de Especies:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {WOOD_OPTIONS.map((wood) => (
                    <button
                      key={wood.id}
                      onClick={() => setActiveWood(wood.id)}
                      className={`p-2 rounded-xl bg-surface-card shadow-sm flex flex-col items-center text-center cursor-pointer transition-all border ${
                        activeWood === wood.id ? 'ring-2 ring-secondary-container shadow-md border-transparent' : 'border-border-subtle hover:shadow-md'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-lg shadow-inner mb-1.5"
                        style={{ backgroundColor: wood.colorHex }}
                      ></div>
                      <span className="font-label-technical text-[11px] font-bold text-text-primary truncate w-full">
                        {wood.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-surface-card shadow-xs flex items-start gap-3 border border-border-subtle">
                  <span className="material-symbols-outlined text-secondary-container text-[24px]">hardware</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-text-primary font-bold">Herrajes Blum®</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">Sistemas de cierre suave y guías ocultas con garantía de 100,000 ciclos.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-card shadow-xs flex items-start gap-3 border border-border-subtle">
                  <span className="material-symbols-outlined text-state-success text-[24px]">task_alt</span>
                  <div>
                    <h4 className="font-headline-sm text-base text-text-primary font-bold">Validación Estructural</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">El software previene deflexiones en estantes y vanos mayores al límite físico.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase with Technical Cards */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-surface-card relative border border-border-subtle">
                <img
                  className="w-full h-full object-cover"
                  alt="Ensamble de carpintería y herrajes"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Xf26i-D0SqQLD4KBi_U5DFuEgRJrbz1EaT128cs287MX6MzZcB8igdV_QPeDuVKUg8cbaLEA7rMZ_j4qHz8Q_rdrMvd_r2h2FJ8NxR3edVAGyx4yZYKrxOTOyhFVKTWxx4K6ucvc-0gZQG13TBgeuVH1sN16UHFuhQc80_gfN9ZMGxIGIhhxyQ8m577QRyCG1DTfFiAZvNk8eS8EBKf9qUvivbU5MZEkdURur8wIzCksP6kHRcsMDw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-on-primary">
                  <div>
                    <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary-fixed">
                      Muestra de Taller #048
                    </span>
                    <p className="font-headline-sm text-lg md:text-xl font-bold">Ensamble en Inglete & Alistonado</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-card/20 backdrop-blur-md text-on-primary font-label-technical text-label-technical">
                    <span className="material-symbols-outlined text-[16px]">high_quality</span>
                    <span>4K PBR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI DESIGN COPILOT ASSISTANT */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-text-primary text-on-primary p-6 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-variant/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card/10 text-secondary-fixed font-label-technical text-label-technical">
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span>Asistente de Diseño Neuronal</span>
                </div>
                <h2 className="font-display-lg text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  ¿Dudas con la proporción o el estilo? Deja que la IA te guíe.
                </h2>
                <p className="font-body-md text-sm md:text-base text-inverse-primary/90">
                  Escribe tus dudas sobre iluminación, espacio o estilo decorativo. Nuestro copiloto arquitectónico analiza tus restricciones y pre-configura el modelo 3D idóneo.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('asistente-ia')}
                    className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-secondary-container hover:bg-accent-hover text-on-primary font-headline-sm text-sm md:text-base font-semibold transition-all cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">psychology</span>
                    <span>Probar Asistente de IA</span>
                  </button>
                </div>
              </div>

              {/* Chat UI Simulation */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="flex items-start gap-3 self-end max-w-lg">
                  <div className="p-4 rounded-2xl rounded-tr-none bg-primary-variant text-on-primary shadow-sm text-body-sm font-body-sm">
                    <p className="font-semibold text-secondary-fixed mb-1 text-[11px] font-label-technical uppercase">Tú — Consulta de Salón</p>
                    “Tengo un salón estrecho con luz natural y suelo de tarima clara, ¿qué mueble de TV y aparador me recomiendas?”
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-on-primary font-bold text-xs">
                    EM
                  </div>
                </div>

                <div className="flex items-start gap-3 self-start max-w-xl">
                  <div className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center flex-shrink-0 text-text-primary shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  </div>
                  <div className="p-4 md:p-5 rounded-2xl rounded-tl-none bg-surface-card text-on-surface shadow-md space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-technical text-label-technical text-secondary uppercase font-bold">Sugerencia Personalizada</span>
                      <span className="font-label-technical text-[11px] text-on-surface-variant font-medium">Hace 2 seg</span>
                    </div>
                    <p className="font-body-sm text-sm text-on-surface leading-relaxed">
                      Para tu espacio recomiendo un módulo flotante o con patas cónicas elevadas (160 cm ancho x 40 cm fondo). Las patas de madera despejan el suelo aumentando visualmente la amplitud del salón.
                    </p>
                    <div className="p-3 rounded-xl bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="font-label-technical text-[11px] text-text-primary font-bold uppercase">Configuración Óptima:</span>
                        <p className="font-label-technical text-xs text-text-muted">Roble Natural Claro • Patas 18 cm • 2 Puertas alistonadas</p>
                      </div>
                      <button
                        onClick={() => onNavigate('personalizador-3d', 'horizon')}
                        className="px-4 py-1.5 rounded-lg bg-text-primary hover:bg-primary text-on-primary font-label-technical text-label-technical font-semibold text-center transition-colors cursor-pointer"
                      >
                        Cargar al Visor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FURNITURE CATALOG SHOWCASE */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-surface-container-low border-y border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary font-bold">Colección 2025</span>
              <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-text-primary font-bold mt-1">
                Muebles más personalizados
              </h2>
            </div>
            <button
              onClick={() => onNavigate('explorar-catalogo')}
              className="inline-flex items-center gap-1 font-body-md text-text-primary font-semibold hover:text-secondary transition-colors cursor-pointer"
            >
              <span>Ver todo el catálogo (48 diseños)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FURNITURE_MODELS.slice(0, 4).map((model) => (
              <div
                key={model.id}
                className="group rounded-2xl bg-surface-card shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col border border-border-subtle"
              >
                <div className="aspect-[4/3] relative bg-surface-container overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {model.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-card/90 backdrop-blur-md text-text-primary font-label-technical text-[11px] font-bold shadow-xs">
                      {model.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-headline-sm text-base text-text-primary font-bold mb-1">{model.name}</h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mb-2 line-clamp-2">{model.description}</p>
                    <div className="font-label-technical text-[11px] text-text-muted mb-3">Medidas base: {model.dimensionsLabel}</div>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-border-subtle">
                    <div>
                      <span className="font-label-technical text-[10px] text-on-surface-variant block uppercase">Desde</span>
                      <span className="font-price-hero text-xl text-text-primary font-bold">${model.basePrice} USD</span>
                    </div>
                    <button
                      onClick={() => onNavigate('personalizador-3d', model.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-secondary-container hover:text-on-primary text-text-primary font-body-sm text-xs font-semibold transition-all cursor-pointer"
                    >
                      Personalizar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPLETE SOLUTION: BUYERS & WORKSHOPS COMPARISON */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary font-bold">Ecosistema Integrado</span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-text-primary font-bold mt-1 mb-3">
              Un puente directo entre el cliente y el banco de carpintería
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Digitalizamos la comunicación eliminando dibujos en servilletas, llamadas interminables y correcciones de taller sobre la marcha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Buyers Column */}
            <div className="p-8 rounded-2xl bg-surface-card shadow-md flex flex-col justify-between border border-border-subtle">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-text-primary">
                    <span className="material-symbols-outlined text-[28px]">home</span>
                  </div>
                  <div>
                    <span className="font-label-technical text-label-technical text-secondary uppercase font-bold">Para Hogares & Arquitectos</span>
                    <h3 className="font-headline-sm text-xl text-text-primary font-bold">Compradores y Diseñadores</h3>
                  </div>
                </div>
                <ul className="space-y-4 font-body-sm text-sm md:text-base text-on-surface mb-8">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-state-success text-[20px] mt-0.5">check_circle</span>
                    <div>
                      <strong className="font-semibold text-text-primary">Preview 3D hiperrealista:</strong>{' '}
                      <span>Visualiza la pieza exacta desde cualquier ángulo con texturas reales antes de pagar.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-state-success text-[20px] mt-0.5">check_circle</span>
                    <div>
                      <strong className="font-semibold text-text-primary">Cotización transparente al segundo:</strong>{' '}
                      <span>Modifica un centímetro y sabrás el impacto en tu presupuesto al instante.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-state-success text-[20px] mt-0.5">check_circle</span>
                    <div>
                      <strong className="font-semibold text-text-primary">Entrega e instalación profesional:</strong>{' '}
                      <span>Garantía de ajuste milimétrico en tu domicilio y pago protegido.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('personalizador-3d')}
                className="inline-flex items-center justify-center gap-2 h-12 w-full rounded-lg bg-surface-container text-text-primary hover:bg-surface-container-high font-headline-sm text-base font-semibold transition-colors cursor-pointer"
              >
                <span>Configurar para mi casa</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* For Carpenters Column */}
            <div className="p-8 rounded-2xl bg-text-primary text-on-primary shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-variant flex items-center justify-center text-secondary-fixed">
                    <span className="material-symbols-outlined text-[28px]">handyman</span>
                  </div>
                  <div>
                    <span className="font-label-technical text-label-technical text-secondary-container uppercase font-bold">Para Talleres & Fabricantes</span>
                    <h3 className="font-headline-sm text-xl text-on-primary font-bold">Carpinteros y Talleres CNC</h3>
                  </div>
                </div>
                <ul className="space-y-4 font-body-sm text-sm md:text-base text-inverse-on-surface mb-8">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container text-[20px] mt-0.5">check_circle</span>
                    <div>
                      <strong className="font-semibold text-on-primary">Cero horas redactando presupuestos:</strong>{' '}
                      <span>El algoritmo calcula mano de obra, tableros y herrajes automáticamente.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container text-[20px] mt-0.5">check_circle</span>
                    <div>
                      <strong className="font-semibold text-on-primary">Listas de corte y archivos DXF:</strong>{' '}
                      <span>Exportación directa para escuadradora o centros de mecanizado CNC sin errores de medida.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-container text-[20px] mt-0.5">check_circle</span>
                    <div>
                      <strong className="font-semibold text-on-primary">Flujo de pedidos verificados:</strong>{' '}
                      <span>Acceso a órdenes cerradas y pagadas listas para pasar a fabricación inmediata.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('cola-de-produccion-pedidos')}
                className="inline-flex items-center justify-center gap-2 h-12 w-full rounded-lg bg-secondary-container hover:bg-accent-hover text-on-primary font-headline-sm text-base font-semibold transition-colors cursor-pointer"
              >
                <span>Acceder a Suite de Taller CNC</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & CASE STUDIES */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-surface-container-low border-y border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary font-bold">Voces de Confianza</span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-4xl text-text-primary font-bold mt-1">
              Lo que opinan quienes ya construyen con nosotros
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface-card shadow-sm flex flex-col justify-between border border-border-subtle">
                <div className="space-y-3">
                  <div className="flex text-secondary-container">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="font-body-md text-sm text-on-surface italic leading-relaxed">
                    {t.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-6 border-t border-border-subtle mt-4">
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover shadow-xs" />
                  <div>
                    <h4 className="font-headline-sm text-sm text-text-primary font-bold">{t.author}</h4>
                    <span className="font-label-technical text-[11px] text-on-surface-variant">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION BANNER */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-surface">
        <div className="max-w-7xl mx-auto rounded-3xl bg-primary-container p-8 md:p-14 text-on-primary relative overflow-hidden shadow-2xl">
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl">
            <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary-fixed font-bold block mb-2">
              Comienza Sin Compromiso
            </span>
            <h2 className="font-display-lg text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Empieza hoy a crear el mueble exacto que tu espacio necesita.
            </h2>
            <p className="font-body-lg text-sm md:text-lg text-inverse-primary mb-8 max-w-2xl leading-relaxed">
              Visualiza en 3D, experimenta con diferentes acabados y conoce el costo final en segundos antes de cortar una sola tabla.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigate('personalizador-3d')}
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-secondary-container hover:bg-accent-hover text-on-primary font-headline-sm text-sm md:text-base font-semibold transition-all shadow-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                <span>Abrir Personalizador 3D Gratis</span>
              </button>
              <button
                onClick={() => onNavigate('precios-cotizacion')}
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-surface-card/10 hover:bg-surface-card/20 text-on-primary font-headline-sm text-sm md:text-base font-semibold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                <span>Agendar Consulta de Instalación</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
