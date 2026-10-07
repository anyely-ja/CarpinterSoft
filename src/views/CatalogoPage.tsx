import React, { useState, useMemo } from 'react';
import { AppView, FurnitureModel } from '../types';
import { FURNITURE_MODELS, WOOD_OPTIONS } from '../data/furnitureData';

interface CatalogoPageProps {
  onNavigate: (view: AppView, modelId?: string) => void;
}

export const CatalogoPage: React.FC<CatalogoPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWood, setSelectedWood] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'populares' | 'precio-asc' | 'precio-desc' | 'recientes'>('populares');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [selectedSpecModal, setSelectedSpecModal] = useState<FurnitureModel | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  // Filter products
  const filteredModels = useMemo(() => {
    return FURNITURE_MODELS.filter(m => {
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ||
        m.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchWood =
        selectedWood === 'all' ||
        m.woodOptions.includes(selectedWood);

      const matchPrice = m.basePrice <= maxPrice;

      return matchSearch && matchCategory && matchWood && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'precio-desc') return b.basePrice - a.basePrice;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedWood, sortBy, maxPrice]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedWood('all');
    setMaxPrice(3500);
    setSortBy('populares');
  };

  const handleSimulateAiPhoto = () => {
    setAiAnalysisResult('Análisis de estancia completado: Detectado suelo de tarima flotante roble claro y ventanal con luz norte suave. Se recomienda aparador con base cónica elevada de 15 cm en acabado Roble Nórdico Miel con barniz extra mate (0% brillo).');
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. CABECERA & HERO DE SECCIÓN */}
      <section className="w-full bg-surface-container-low/70 py-10 md:py-14 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          {/* Breadcrumb & Workshop tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <nav className="flex items-center gap-2 font-label-technical text-label-technical text-text-muted">
              <button onClick={() => onNavigate('landing-page')} className="hover:text-text-primary transition-colors flex items-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">home</span>
                <span>Inicio</span>
              </button>
              <span>/</span>
              <span className="text-text-primary font-semibold">Catálogo de Muebles Personalizables</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card shadow-sm text-state-success font-label-technical text-xs border border-border-subtle">
              <span className="w-2 h-2 rounded-full bg-state-success animate-pulse"></span>
              <span>Stock de Roble & Nogal listo en taller • Fabricación en 15-20 días hábiles</span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="max-w-4xl">
            <div className="inline-block mb-2">
              <span className="font-label-technical text-label-technical uppercase tracking-wider text-secondary font-bold bg-secondary-fixed/40 px-2.5 py-0.5 rounded">
                Motor Paramétrico V4.2
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl text-text-primary font-bold tracking-tight mb-3">
              Catálogo de Diseños Paramétricos
            </h1>
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
              Elige una base estructural de ebanistería contemporánea y adáptala al milímetro en nuestro visor 3D interactivo. Con corte CNC de alta precisión, herrajes de gama alta y cotización en tiempo real.
            </p>
          </div>

          {/* Search, Badges & Sorting Bar */}
          <div className="mt-8 pt-4 bg-surface-card rounded-xl p-4 shadow-sm border border-border-subtle flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por modelo, tipo de mueble o estilo..."
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container-low text-text-primary font-body-sm text-sm focus:outline-none focus:bg-surface-card focus:shadow-md transition-all placeholder:text-text-muted"
              />
            </div>

            {/* Quick Filter Tags */}
            <div className="hidden xl:flex items-center gap-2 font-body-sm text-sm">
              <span className="text-text-muted font-label-technical text-label-technical uppercase mr-1">Populares:</span>
              <button
                onClick={() => setSearchQuery('Aparador')}
                className="px-3 py-1 rounded-full bg-surface-container text-text-primary font-medium hover:bg-secondary-fixed transition-colors cursor-pointer text-xs"
              >
                Aparadores
              </button>
              <button
                onClick={() => setSearchQuery('Mesa')}
                className="px-3 py-1 rounded-full bg-surface-container text-text-primary font-medium hover:bg-secondary-fixed transition-colors cursor-pointer text-xs"
              >
                Mesas de Roble
              </button>
              <button
                onClick={() => setSearchQuery('TV')}
                className="px-3 py-1 rounded-full bg-surface-container text-text-primary font-medium hover:bg-secondary-fixed transition-colors cursor-pointer text-xs"
              >
                Muebles TV
              </button>
              <button
                onClick={() => setSearchQuery('Escritorio')}
                className="px-3 py-1 rounded-full bg-surface-container text-text-primary font-medium hover:bg-secondary-fixed transition-colors cursor-pointer text-xs"
              >
                Home Office
              </button>
            </div>

            {/* Sort & Grid/List Switch */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex items-center gap-2">
                <span className="font-label-technical text-label-technical text-text-muted hidden sm:inline">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-text-primary font-body-sm text-xs font-semibold focus:outline-none cursor-pointer border border-border-subtle"
                >
                  <option value="populares">Más populares</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                </select>
              </div>

              {/* View Switch */}
              <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-border-subtle">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                    viewMode === 'grid' ? 'bg-surface-card text-text-primary shadow-xs' : 'text-text-muted hover:text-text-primary'
                  }`}
                  title="Vista cuadrícula"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                    viewMode === 'list' ? 'bg-surface-card text-text-primary shadow-xs' : 'text-text-muted hover:text-text-primary'
                  }`}
                  title="Vista lista"
                >
                  <span className="material-symbols-outlined text-[18px]">view_agenda</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENIDO PRINCIPAL: SIDEBAR FILTROS + PRODUCTOS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= SIDEBAR DE FILTROS AVANZADOS (Columna 3.5 en 12) ================= */}
          <aside className="lg:col-span-4 xl:col-span-3 bg-surface-card rounded-xl p-6 shadow-sm border border-border-subtle sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-3 bg-surface-container-low/50 p-3 rounded-lg border border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container">tune</span>
                <span className="font-headline-sm text-base text-text-primary font-bold">Filtros</span>
              </div>
              <button
                onClick={resetFilters}
                className="font-label-technical text-xs text-secondary hover:text-accent-hover font-semibold transition-colors cursor-pointer"
              >
                Restablecer todo
              </button>
            </div>

            {/* 1. Categoría / Estancia */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-text-primary font-bold">
                  Estancia / Entorno
                </span>
                <span className="font-label-technical text-[10px] text-text-muted">6 categorías</span>
              </div>
              <div className="space-y-1 font-body-sm text-sm text-on-surface-variant">
                {[
                  { id: 'all', label: 'Todos los Espacios', count: 48 },
                  { id: 'salón', label: 'Salón y Estar', count: 18 },
                  { id: 'comedor', label: 'Comedor', count: 12 },
                  { id: 'dormitorio', label: 'Dormitorio & Vestidores', count: 15 },
                  { id: 'estudio', label: 'Estudio & Home Office', count: 9 },
                  { id: 'recibidor', label: 'Recibidor & Pasillos', count: 7 }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer text-left ${
                      selectedCategory === cat.id
                        ? 'bg-surface-container text-text-primary font-bold'
                        : 'hover:bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="font-label-numeric text-[11px] bg-surface-card px-2 py-0.5 rounded text-text-muted border border-border-subtle">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Especies de Madera */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-text-primary font-bold">
                  Madera & Acabado
                </span>
                <span className="font-label-technical text-xs text-secondary font-semibold">Tacto Natural</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSelectedWood('all')}
                  className={`p-2 rounded-lg text-left text-xs transition-colors cursor-pointer border ${
                    selectedWood === 'all' ? 'bg-primary-container text-white border-transparent' : 'bg-surface-container-low border-border-subtle text-text-primary'
                  }`}
                >
                  <p className="font-bold">Todas</p>
                  <p className="text-[10px] opacity-80">Catálogo completo</p>
                </button>
                {WOOD_OPTIONS.slice(0, 5).map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWood(w.id)}
                    className={`flex items-center gap-1.5 p-1.5 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                      selectedWood === w.id ? 'ring-2 ring-secondary-container bg-surface-container border-transparent' : 'bg-surface-container-low border-border-subtle hover:bg-surface-container'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shadow-inner shrink-0"
                      style={{ backgroundColor: w.colorHex }}
                    ></span>
                    <span className="font-semibold text-text-primary truncate">{w.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Filtro Presupuesto */}
            <div className="pt-2 border-t border-border-subtle">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-text-primary font-bold">
                  Presupuesto Máximo
                </span>
                <span className="font-label-numeric text-sm text-text-primary font-bold">
                  ${maxPrice} USD
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="3500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-secondary-container cursor-pointer"
              />
              <p className="font-label-technical text-[10px] text-text-muted mt-1 leading-snug">
                *El costo final se recalcula con milímetros exactos en el estudio 3D.
              </p>
            </div>

            {/* Quality Guarantee Box */}
            <div className="p-3 bg-surface-container rounded-lg flex items-center gap-2 text-text-primary border border-border-subtle">
              <span className="material-symbols-outlined text-secondary-container text-[20px]">verified_user</span>
              <span className="font-label-technical text-[11px] leading-snug">
                Garantía estructural de 10 años en todos los ensambles certificados.
              </span>
            </div>
          </aside>

          {/* ================= CONTENIDO DEL CATÁLOGO & PRODUCTOS (Columna 8.5 en 12) ================= */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Header Conteo */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-lg md:text-xl text-text-primary font-bold">
                  Muebles y Módulos de Autor
                </span>
                <span className="font-label-technical text-xs bg-surface-container-high px-2.5 py-0.5 rounded-full text-text-primary font-bold">
                  {filteredModels.length} modelos
                </span>
              </div>
              <span className="font-label-technical text-label-technical text-text-muted">
                Configuraciones paramétricas listas para fabricación digital
              </span>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'flex flex-col gap-6'}>
              {filteredModels.map((model) => (
                <article
                  key={model.id}
                  className="bg-surface-card rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group border border-border-subtle"
                >
                  <div>
                    {/* Image & Quick Badges */}
                    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-surface-container-low mb-4">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                        {model.badge && (
                          <span className="px-2.5 py-1 rounded bg-secondary-container text-on-primary font-label-technical text-xs font-bold uppercase shadow-sm">
                            {model.badge}
                          </span>
                        )}
                        {model.badgeSecondary && (
                          <span className="px-2 py-0.5 rounded bg-surface-card/90 backdrop-blur-sm text-text-primary font-label-technical text-[10px] font-medium">
                            {model.badgeSecondary}
                          </span>
                        )}
                      </div>

                      {/* Swatch chips */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-surface-card/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-xs border border-border-subtle">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#D4A373] border border-white"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#583E26] border border-white"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#7C472A] border border-white"></span>
                        <span className="font-label-technical text-[10px] text-text-primary ml-1 font-semibold">
                          +{model.woodOptions.length} Maderas
                        </span>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-label-technical text-[11px] uppercase tracking-wider text-secondary font-bold">
                          {model.subCategory}
                        </span>
                        <span className="inline-flex items-center gap-1 text-state-success font-label-technical text-[11px]">
                          <span className="material-symbols-outlined text-[13px]">eco</span>
                          <span>FSC® 100%</span>
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-lg text-text-primary font-bold group-hover:text-primary-variant transition-colors">
                        {model.name}
                      </h3>
                      <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                        {model.description}
                      </p>

                      <div className="p-2.5 bg-surface-container rounded-lg flex items-center justify-between text-text-primary text-xs font-label-technical">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-text-muted">straighten</span>
                          <span>Medida base: <strong>{model.dimensionsLabel}</strong></span>
                        </div>
                        <span className="text-text-muted">{model.capacityOrUse || 'Ajustable'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Card */}
                  <div className="pt-4 mt-4 bg-surface-container-low/40 -mx-4 md:-mx-5 -mb-4 md:-mb-5 p-4 rounded-b-xl flex flex-col gap-3 border-t border-border-subtle">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-label-technical text-[10px] text-text-muted block">Precio algorítmico base:</span>
                        <span className="font-price-hero text-2xl text-text-primary font-bold">
                          ${model.basePrice} <span className="text-xs font-label-technical text-text-muted font-normal">USD</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-label-technical text-[11px] text-state-success block">CNC Calibrado</span>
                        <span className="font-label-technical text-[10px] text-text-muted">Entrega {model.deliveryDays} días</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onNavigate('personalizador-3d', model.id)}
                        className="h-10 rounded-lg bg-secondary-container hover:bg-accent-hover text-on-primary font-body-sm text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
                        <span>Personalizar 3D</span>
                      </button>
                      <button
                        onClick={() => setSelectedSpecModal(model)}
                        className="h-10 rounded-lg bg-surface-card text-text-primary font-body-sm text-xs font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-1 border border-border-subtle cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">description</span>
                        <span>Ficha & Planos</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ================= BANNER ASISTENTE IA ================= */}
            <section className="w-full bg-gradient-to-r from-primary via-primary-variant to-tertiary text-on-primary rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-md">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-tertiary-fixed backdrop-blur-sm font-label-technical text-[11px] font-bold uppercase">
                    <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                    <span>Copiloto de Espacio & Medidas</span>
                  </div>
                  <h2 className="font-headline-lg text-xl md:text-2xl text-white font-bold tracking-tight">
                    ¿No estás seguro de qué madera o proporción encaja con tu suelo?
                  </h2>
                  <p className="font-body-md text-sm text-surface-container-high max-w-2xl leading-relaxed">
                    Sube una fotografía de tu salón o estancia. Nuestra IA analiza los tonos de tu pavimento, la luz natural y te recomienda grosor, especie y medidas exactas.
                  </p>
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setAiModalOpen(true)}
                      className="h-11 px-5 rounded-lg bg-secondary-container hover:bg-accent-hover text-on-primary font-body-sm text-xs md:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">upload_file</span>
                      <span>Subir Foto & Consultar con IA</span>
                    </button>
                    <button
                      onClick={() => onNavigate('asistente-ia')}
                      className="h-11 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-body-sm text-xs md:text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">psychology</span>
                      <span>Abrir Chat Copiloto</span>
                    </button>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                  <div className="w-14 h-14 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed mb-2">
                    <span className="material-symbols-outlined text-[28px]">architecture</span>
                  </div>
                  <span className="font-label-technical text-xs text-tertiary-fixed font-bold">100% Precisión CNC</span>
                  <p className="font-label-technical text-[11px] text-center text-surface-container-high/80 mt-1">
                    Genera despiece automático para carpinteros y planos DXF de corte directo.
                  </p>
                </div>
              </div>
            </section>

            {/* Pagination */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-card p-4 rounded-xl shadow-xs border border-border-subtle">
              <span className="font-body-sm text-xs text-text-muted">
                Página <strong>1</strong> de <strong>6</strong> • 48 diseños paramétricos disponibles
              </span>
              <nav className="flex items-center gap-1 font-label-numeric text-xs">
                <button disabled className="w-8 h-8 rounded-lg bg-surface-container text-text-muted opacity-50 flex items-center justify-center cursor-not-allowed">
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold flex items-center justify-center shadow-xs">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-medium flex items-center justify-center transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-medium flex items-center justify-center transition-colors">
                  3
                </button>
                <span className="px-1 text-text-muted">...</span>
                <button className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-medium flex items-center justify-center transition-colors">
                  6
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN INFORMATIVA DE VALOR */}
      <section className="w-full bg-surface-container-low py-16 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card p-6 rounded-xl shadow-xs space-y-2 border border-border-subtle">
              <div className="w-12 h-12 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-[26px]">square_foot</span>
              </div>
              <h4 className="font-headline-sm text-base text-text-primary font-bold">
                Ajuste de Milímetro Real
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                No te adaptes a medidas comerciales estándar. Si tu pared mide 237.4 cm, tu mueble se fabrica exactamente a 237.4 cm sin suplementos ni sobrecostes.
              </p>
            </div>

            <div className="bg-surface-card p-6 rounded-xl shadow-xs space-y-2 border border-border-subtle">
              <div className="w-12 h-12 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-[26px]">forest</span>
              </div>
              <h4 className="font-headline-sm text-base text-text-primary font-bold">
                Maderas Nobles Certificadas
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Trabajamos con aserraderos locales de gestión forestal responsable FSC®. Roble europeo, nogal americano y tzalam con aceites orgánicos de cero COVs.
              </p>
            </div>

            <div className="bg-surface-card p-6 rounded-xl shadow-xs space-y-2 border border-border-subtle">
              <div className="w-12 h-12 rounded-lg bg-tertiary-fixed/50 flex items-center justify-center text-tertiary mb-3">
                <span className="material-symbols-outlined text-[26px]">precision_manufacturing</span>
              </div>
              <h4 className="font-headline-sm text-base text-text-primary font-bold">
                Conexión Directa con el Taller
              </h4>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Al terminar tu personalización en 3D, el motor genera listas de corte automatizadas y archivos de fresado CNC directos a la maquinaria del ebanista.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPEC SHEET MODAL */}
      {selectedSpecModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-2xl shadow-2xl max-w-lg w-full p-6 flex flex-col gap-4 border border-border-subtle animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-technical text-xs text-secondary font-bold uppercase">Ficha Técnica & Planos</span>
                <h3 className="font-headline-sm text-xl font-bold text-text-primary mt-0.5">{selectedSpecModal.name}</h3>
              </div>
              <button onClick={() => setSelectedSpecModal(null)} className="text-text-muted hover:text-text-primary cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 bg-canvas-cream p-4 rounded-xl text-xs border border-border-subtle">
              <div className="flex justify-between py-1 border-b border-border-subtle">
                <span className="text-text-muted">Dimensiones Base:</span>
                <span className="font-bold text-text-primary">{selectedSpecModal.dimensionsLabel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle">
                <span className="text-text-muted">Rango Personalizable:</span>
                <span className="font-bold text-text-primary">{selectedSpecModal.minWidth}-{selectedSpecModal.maxWidth}cm ancho</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle">
                <span className="text-text-muted">Herrajes Certificados:</span>
                <span className="font-bold text-text-primary">Blum® Clip-Top Blumotion</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-text-muted">Plazo Taller Estimado:</span>
                <span className="font-bold text-state-success">{selectedSpecModal.deliveryDays} días hábiles</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedSpecModal(null);
                  onNavigate('personalizador-3d', selectedSpecModal.id);
                }}
                className="flex-1 py-2.5 rounded-lg bg-secondary-container hover:bg-accent-hover text-on-primary font-headline-sm text-sm font-semibold transition-all cursor-pointer"
              >
                Abrir en Personalizador 3D
              </button>
              <button
                onClick={() => setSelectedSpecModal(null)}
                className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-headline-sm text-sm font-semibold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI ROOM PHOTO ANALYZER MODAL */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-4 border border-border-subtle animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container">auto_awesome</span>
                <h3 className="font-headline-sm text-lg font-bold text-text-primary">Copiloto IA de Espacios</h3>
              </div>
              <button onClick={() => setAiModalOpen(false)} className="text-text-muted hover:text-text-primary cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-body-sm text-xs text-text-muted leading-relaxed">
              Selecciona una muestra de tu estancia para que la IA calibre la especie de madera y volumetría recomendada.
            </p>

            <div className="border-2 border-dashed border-border-subtle hover:border-secondary-container rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 cursor-pointer bg-canvas-cream transition-colors" onClick={handleSimulateAiPhoto}>
              <span className="material-symbols-outlined text-3xl text-secondary">add_photo_alternate</span>
              <p className="text-xs font-bold text-text-primary">Arrastra o haz click para subir foto</p>
              <span className="text-[11px] text-text-muted">JPG, PNG o HEIC (Foto de tu salón)</span>
            </div>

            {aiAnalysisResult && (
              <div className="p-3.5 bg-primary-container text-on-primary rounded-xl text-xs space-y-2 shadow-sm">
                <p className="font-bold text-secondary-fixed flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span> Sugerencia Generada
                </p>
                <p className="text-surface-container-low leading-relaxed">{aiAnalysisResult}</p>
                <button
                  onClick={() => {
                    setAiModalOpen(false);
                    onNavigate('personalizador-3d', 'horizon');
                  }}
                  className="w-full mt-2 py-2 rounded-lg bg-secondary-container text-white font-bold hover:bg-accent-hover transition-colors cursor-pointer"
                >
                  Cargar Configuración Óptima en 3D
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
