import React, { useState } from 'react';
import { AppView } from '../types';
import { FURNITURE_MODELS, WOOD_OPTIONS } from '../data/furnitureData';

interface PerfilUsuarioPageProps {
  onNavigate: (view: AppView, modelId?: string) => void;
}

export const PerfilUsuarioPage: React.FC<PerfilUsuarioPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'pedidos' | 'proyectos' | 'muestrario' | 'facturacion'>('pedidos');
  const [requestSampleSuccess, setRequestSampleSuccess] = useState<boolean>(false);

  const userProfile = {
    name: 'Elena Morales Valdés',
    email: 'elena.morales@estudioemv.com',
    role: 'Arquitecta de Interiores • Estudio EMV',
    colegiado: 'COAM #4920',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoL_dAqOgQM4j6fDTBUW5DJV2u-3AY3vSQ1ekoDeg57p7_6HTBQhm4sAOGNrCfq7kR0qvR8CvzOLqWOAlxdfJnAmPlPx2T-Jokx0oA9fDhLmQT96pnGUjOJliLm96LCc5Z3Cj4vMMWbf5h-krAAs0py-P5iCSso4eD0Im1KwMMcq7e2EGqzzkIXi1b_THlTbLRxnamDHBNFmA58p2xgm293pddmdM4pZDroLGekJTeOahtE8p5PLNe5g',
    phone: '+34 612 345 678',
    memberSince: 'Marzo 2024',
    city: 'Madrid, España'
  };

  const userOrders = [
    {
      id: 'ORD-2025-0894',
      productName: 'Aparador Alistonado Horizon (V4.2)',
      dimensions: '180 × 85 × 45 cm',
      wood: 'Roble Nórdico Miel',
      image: FURNITURE_MODELS[0].image,
      currentStep: 'Corte CNC de 5 ejes',
      stepIndex: 2, // 1 to 5
      progress: 65,
      deliveryDate: '14 de Noviembre de 2026',
      total: 1280,
      statusBadge: 'EN MÁQUINA CNC',
      statusClass: 'bg-secondary text-on-primary font-bold'
    },
    {
      id: 'ORD-2025-0875',
      productName: 'Librero Nexus Modular 4 Columnas',
      dimensions: '220 × 210 × 38 cm',
      wood: 'Nogal Americano Macizo',
      image: FURNITURE_MODELS[2].image,
      currentStep: 'Listo para Expedición & Montaje',
      stepIndex: 5,
      progress: 100,
      deliveryDate: '20 de Octubre de 2026',
      total: 2190,
      statusBadge: 'LISTO EXPEDICIÓN',
      statusClass: 'bg-state-success text-on-primary font-bold'
    }
  ];

  const savedProjects = [
    {
      id: 'proj-01',
      title: 'Aparador Salón Principal - Ático Chamberí',
      modelId: 'horizon',
      image: FURNITURE_MODELS[0].image,
      specs: '180 × 85 × 45 cm • Roble Miel • 4 Módulos',
      price: 1280,
      date: 'Modificado hace 2 días'
    },
    {
      id: 'proj-02',
      title: 'Mesa Comedor Volada - Casa La Moraleja',
      modelId: 'fusion-table',
      image: FURNITURE_MODELS[1].image,
      specs: '220 × 75 × 100 cm • Roble Macizo 40mm • Canto Suizo',
      price: 1640,
      date: 'Guardado el 28 Sept'
    },
    {
      id: 'proj-03',
      title: 'Mueble TV Suspendido - Reforma Gran Vía',
      modelId: 'tv-flotante',
      image: FURNITURE_MODELS[3].image,
      specs: '200 × 42 × 38 cm • Nogal & Grafito • Con LED',
      price: 980,
      date: 'Guardado el 15 Sept'
    }
  ];

  return (
    <div className="min-w-0 flex-1 bg-surface py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-high/60 pb-5">
          <div className="flex items-center gap-2 text-xs md:text-sm text-text-muted font-mono">
            <button 
              onClick={() => onNavigate('landing-page')}
              className="hover:text-primary transition-colors hover:underline"
            >
              Inicio
            </button>
            <span>/</span>
            <span className="text-primary font-bold">Perfil del Profesional & Mis Proyectos</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('asistente-ia')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              Consultar Asistente IA
            </button>
          </div>
        </div>

        {/* User Profile Card Header */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-high shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-primary/20 shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-state-success text-on-primary flex items-center justify-center text-[12px] shadow-sm">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-xl sm:text-2xl font-bold font-serif text-text-main">
                    {userProfile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                    {userProfile.colegiado}
                  </span>
                </div>
                <p className="text-xs font-semibold text-text-muted">
                  {userProfile.role}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">mail</span>
                    {userProfile.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">location_on</span>
                    {userProfile.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                    Miembro desde {userProfile.memberSince}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              <button
                onClick={() => onNavigate('personalizador-3d', 'horizon')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary/90 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Nuevo Diseño Paramétrico
              </button>
              <button
                onClick={() => onNavigate('cola-de-produccion-pedidos')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container text-text-main text-xs font-semibold hover:bg-surface-container-high border border-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">view_kanban</span>
                Ver Cola de Taller
              </button>
            </div>

          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-surface-container-high">
            <div>
              <div className="text-[11px] text-text-muted">Proyectos Guardados</div>
              <div className="text-xl font-bold font-mono text-text-main mt-0.5">3 diseños</div>
            </div>
            <div>
              <div className="text-[11px] text-text-muted">Pedidos en Fabricación</div>
              <div className="text-xl font-bold font-mono text-secondary mt-0.5">2 en curso</div>
            </div>
            <div>
              <div className="text-[11px] text-text-muted">Madera Recurrente</div>
              <div className="text-xl font-bold font-serif text-text-main mt-0.5">Roble Nórdico</div>
            </div>
            <div>
              <div className="text-[11px] text-text-muted">Tarifa de Profesional</div>
              <div className="text-xl font-bold font-mono text-state-success mt-0.5">-10% Directo</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-surface-container-high">
          {[
            { id: 'pedidos', label: 'Mis Pedidos & Rastreo en Taller', icon: 'local_shipping', count: 2 },
            { id: 'proyectos', label: 'Proyectos & Diseños 3D', icon: 'view_in_ar', count: 3 },
            { id: 'muestrario', label: 'Muestrario de Maderas', icon: 'forest' },
            { id: 'facturacion', label: 'Datos Fiscales & Entregas', icon: 'receipt_long' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
                  : 'border-transparent text-text-muted hover:text-text-main'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-surface-container text-text-muted font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: MIS PEDIDOS EN TALLER */}
        {activeTab === 'pedidos' && (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div
                key={order.id}
                className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-high pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-primary">{order.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] ${order.statusClass}`}>
                        {order.statusBadge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-text-main mt-1">
                      {order.productName}
                    </h3>
                    <p className="text-xs text-text-muted">
                      {order.dimensions} • {order.wood} • Entrega estimada: {order.deliveryDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('cola-de-produccion-pedidos')}
                      className="px-3.5 py-2 rounded-xl bg-surface-container text-text-main text-xs font-semibold hover:bg-surface-container-high transition-colors border border-surface-container-highest flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      Ver en Planta
                    </button>
                    <button
                      onClick={() => onNavigate('despiece-lista-de-corte')}
                      className="px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">table_rows</span>
                      Planos y Despiece
                    </button>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-text-main">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">tune</span>
                      Fase actual: {order.currentStep}
                    </span>
                    <span className="font-mono text-primary">{order.progress}% Completado</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>

                  {/* 5 Stages indicator */}
                  <div className="grid grid-cols-5 gap-2 pt-2 text-center text-[10px] text-text-muted font-medium">
                    <div className="text-primary font-bold">1. DXF Validado</div>
                    <div className="text-primary font-bold">2. Corte CNC</div>
                    <div className={order.stepIndex >= 3 ? 'text-primary font-bold' : ''}>3. Canteado</div>
                    <div className={order.stepIndex >= 4 ? 'text-primary font-bold' : ''}>4. Acabado</div>
                    <div className={order.stepIndex >= 5 ? 'text-state-success font-bold' : ''}>5. Entrega</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PROYECTOS GUARDADOS 3D */}
        {activeTab === 'proyectos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden shadow-xs hover:border-primary/50 transition-all flex flex-col"
              >
                <div className="relative h-48 bg-surface-container">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-mono text-white">
                    ${proj.price} USD
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-text-main">{proj.title}</h3>
                    <p className="text-xs text-text-muted mt-1">{proj.specs}</p>
                    <div className="text-[10px] text-text-muted mt-2 font-mono">{proj.date}</div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-surface-container-high flex items-center justify-between gap-2">
                    <button
                      onClick={() => onNavigate('personalizador-3d', proj.modelId)}
                      className="flex-1 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">tune</span>
                      Abrir en 3D
                    </button>
                    <button
                      onClick={() => onNavigate('precios-cotizacion')}
                      className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-text-main transition-colors border border-surface-container-highest"
                      title="Pedir Fabricación"
                    >
                      <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: MUESTRARIO DE MADERAS */}
        {activeTab === 'muestrario' && (
          <div className="space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-high pb-4">
                <div>
                  <h3 className="text-lg font-bold font-serif text-text-main">
                    Muestrario Físico de Taller para Arquitectos
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    Tacos de 10×10 cm con tratamiento real al aceite Rubio Monocoat® para presentar a clientes de obra.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRequestSampleSuccess(true);
                    setTimeout(() => setRequestSampleSuccess(false), 4000);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">package_2</span>
                  Solicitar Caja de Muestras Gratis
                </button>
              </div>

              {requestSampleSuccess && (
                <div className="mt-4 p-4 rounded-xl bg-state-success/10 border border-state-success/30 text-state-success text-xs font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  ¡Solicitud enviada al taller! Te enviaremos el set de 6 maderas a tu estudio sin coste.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {WOOD_OPTIONS.map((wood) => (
                  <div
                    key={wood.id}
                    className="p-4 rounded-xl border border-surface-container-high bg-surface-container-low flex items-start gap-4"
                  >
                    <div
                      className="w-14 h-14 rounded-xl shrink-0 border border-white/20 shadow-xs"
                      style={{ backgroundColor: wood.colorHex }}
                    />
                    <div>
                      <div className="font-bold text-xs text-text-main">{wood.name}</div>
                      <div className="text-[11px] text-text-muted">{wood.subtitle}</div>
                      <div className="text-[10px] text-text-muted mt-1">
                        Origen: {wood.origin} • Dureza: {wood.hardness}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FACTURACIÓN */}
        {activeTab === 'facturacion' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
              <h3 className="font-bold text-text-main text-base font-serif">Datos Fiscales Registrados</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-text-muted">Razón Social:</div>
                  <div className="font-semibold text-text-main">Estudio EMV Arquitectura S.L.P.</div>
                </div>
                <div>
                  <div className="text-text-muted">NIF / CIF:</div>
                  <div className="font-semibold text-text-main font-mono">B-88392104</div>
                </div>
                <div>
                  <div className="text-text-muted">Domicilio Fiscal:</div>
                  <div className="font-semibold text-text-main">Calle Serrano 45, 3º Dcha, 28001 Madrid</div>
                </div>
                <div>
                  <div className="text-text-muted">IBAN para liquidaciones:</div>
                  <div className="font-semibold text-text-main font-mono">ES91 •••• •••• •••• 4029</div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
              <h3 className="font-bold text-text-main text-base font-serif">Descarga de Facturas Emitidas</h3>
              <div className="space-y-3">
                {[
                  { num: 'FAC-2025-0142', date: '12 Sep 2026', total: '$1,280 USD', desc: 'Aparador Horizon' },
                  { num: 'FAC-2025-0118', date: '04 Jul 2026', total: '$2,190 USD', desc: 'Librero Nexus' }
                ].map((f) => (
                  <div key={f.num} className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between text-xs">
                    <div>
                      <div className="font-mono font-bold text-text-main">{f.num}</div>
                      <div className="text-[11px] text-text-muted">{f.desc} • {f.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-text-main">{f.total}</span>
                      <button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
