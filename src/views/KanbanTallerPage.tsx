import React, { useState } from 'react';
import { AppView, KanbanOrder } from '../types';
import { KANBAN_ORDERS } from '../data/furnitureData';

interface KanbanTallerPageProps {
  onNavigate: (view: AppView) => void;
}

export const KanbanTallerPage: React.FC<KanbanTallerPageProps> = ({ onNavigate }) => {
  const [orders, setOrders] = useState<KanbanOrder[]>(KANBAN_ORDERS);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<KanbanOrder | null>(null);
  const [filterLine, setFilterLine] = useState('all');
  const [compactMode, setCompactMode] = useState(false);
  const [tvMode, setTvMode] = useState(false);

  const columns: { id: KanbanOrder['columnId']; title: string; subtitle: string; dotColor: string }[] = [
    { id: 'dxf', title: '1. Validación & DXF', subtitle: 'Validación paramétrica & tolerancias', dotColor: 'bg-text-muted' },
    { id: 'cnc', title: '2. Corte CNC', subtitle: 'Nesting activo & seccionado', dotColor: 'bg-secondary-container' },
    { id: 'edges', title: '3. Calibrado & Cantos', subtitle: 'Encolado PUR 1-2mm & golas', dotColor: 'bg-primary-variant' },
    { id: 'assembly', title: '4. Premontaje', subtitle: 'Ajuste de escuadras & herrajes', dotColor: 'bg-primary' },
    { id: 'finish', title: '5. Lijado & Acabado', subtitle: 'Lijado grano 180-320 & Rubio', dotColor: 'bg-secondary-fixed-dim' },
    { id: 'packaging', title: '6. Control & Embalaje', subtitle: 'Inspección ±0.2mm & QR Zebra', dotColor: 'bg-state-success' }
  ];

  const advanceOrder = (orderId: string) => {
    const stageFlow: KanbanOrder['columnId'][] = ['dxf', 'cnc', 'edges', 'assembly', 'finish', 'packaging'];
    setOrders(prev => prev.map(ord => {
      if (ord.id !== orderId) return ord;
      const currentIdx = stageFlow.indexOf(ord.columnId);
      if (currentIdx < stageFlow.length - 1) {
        const nextCol = stageFlow[currentIdx + 1];
        return {
          ...ord,
          columnId: nextCol,
          statusBadge: nextCol === 'cnc' ? 'EN MÁQUINA' : nextCol === 'edges' ? 'Canteado OK' : nextCol === 'assembly' ? 'En Banco' : nextCol === 'finish' ? 'En Cabina' : 'LISTO EXPEDICIÓN'
        };
      }
      return ord;
    }));
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.productName.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className={`flex flex-col w-full bg-background min-h-screen ${tvMode ? 'p-6 bg-slate-900 text-white' : ''}`}>
      {/* 1. SECCIÓN CABECERA & CONTROLES TALLER */}
      <section className="w-full px-4 md:px-8 pt-4 pb-6 flex flex-col gap-6 bg-surface border-b border-border-subtle">
        {/* Fila superior: Título, Estado de Conexión y Botones */}
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label-technical text-label-technical uppercase tracking-wider text-text-muted">
                Planta de Mecanizado & Carpintería
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
              <span className="font-label-technical text-label-technical text-text-primary font-medium">
                Biesse Rover + Sierra Homag Online
              </span>
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="font-headline-xl text-2xl md:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
                Cola de Producción & Flujo de Taller
              </h1>
              <span className="bg-surface-container-high text-primary font-label-technical text-xs px-2.5 py-1 rounded-full font-semibold">
                Semana 43 • Octubre 2025
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 h-10 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-all shadow-sm font-headline-sm text-xs md:text-sm font-semibold cursor-pointer border border-border-subtle"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Imprimir Hoja de Carga</span>
            </button>

            <button
              onClick={() => onNavigate('despiece-lista-de-corte')}
              className="flex items-center gap-1.5 px-4 h-10 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-all shadow-sm font-headline-sm text-xs md:text-sm font-semibold cursor-pointer border border-border-subtle"
            >
              <span className="material-symbols-outlined text-[18px]">table_chart</span>
              <span>Ver Despiece Maestro & Nesting</span>
            </button>

            <button
              onClick={() => onNavigate('personalizador-3d')}
              className="flex items-center gap-1.5 px-4 h-10 rounded-lg bg-secondary-container text-on-primary font-headline-sm text-xs md:text-sm font-semibold hover:bg-accent-hover transition-transform active:scale-95 shadow-md shadow-secondary-container/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>+ Nuevo Pedido Taller</span>
            </button>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-surface-container-low p-3 rounded-xl border border-border-subtle">
          <div className="md:col-span-4 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-text-muted text-[18px]">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ORD-XXXX, mueble o cliente..."
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface text-body-sm text-on-surface placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-xs"
            />
          </div>

          <div className="md:col-span-4">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-text-muted text-[18px]">shelves</span>
              <select
                value={filterLine}
                onChange={(e) => setFilterLine(e.target.value)}
                className="w-full h-10 pl-9 pr-8 rounded-lg bg-surface text-xs text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none cursor-pointer border border-border-subtle"
              >
                <option value="all">Todas las Líneas de Producto</option>
                <option value="salon">Línea Muebles de Salón & Almacenaje</option>
                <option value="mesas">Mesas & Roble Macizo FSC®</option>
                <option value="dormitorios">Dormitorios & Camas Tatami</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 text-text-muted text-[16px] pointer-events-none">expand_more</span>
            </div>
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2">
            <span className="text-xs font-label-technical text-text-muted">
              Mostrando {filteredOrders.length} órdenes en flujo
            </span>
          </div>
        </div>

        {/* 4 KPIs DE TALLER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-card shadow-sm flex flex-col justify-between border border-border-subtle">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-text-muted">Pedidos en Planta</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-price-hero text-2xl md:text-3xl text-primary font-bold">18</span>
                  <span className="font-label-technical text-xs font-semibold text-text-muted">órdenes</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">conveyor_belt</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 bg-surface-container-low px-2 py-1 rounded">
              <span className="font-label-technical text-xs text-text-muted">Valor en curso:</span>
              <span className="font-label-numeric text-xs font-bold text-primary">38.400 €</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-card shadow-sm flex flex-col justify-between border border-border-subtle">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-text-muted">Ocupación CNC / Husillo</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-price-hero text-2xl md:text-3xl text-primary font-bold">87%</span>
                  <span className="font-label-technical text-xs font-semibold text-secondary-container">Alta demanda</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary-container/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[22px]">precision_manufacturing</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container rounded-full" style={{ width: '87%' }}></div>
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px] font-label-technical text-text-muted">
                <span>Cola activa:</span>
                <span className="font-semibold text-primary">5.8 hrs pendientes</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-card shadow-sm flex flex-col justify-between border border-border-subtle">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-text-muted">Lead Time Medio</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-price-hero text-2xl md:text-3xl text-primary font-bold">14.2</span>
                  <span className="font-label-technical text-xs text-text-muted">días hábiles</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-state-success/10 flex items-center justify-center text-state-success">
                <span className="material-symbols-outlined text-[22px]">timer</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 bg-surface-container-low px-2 py-1 rounded">
              <div className="flex items-center gap-1 text-state-success font-semibold text-xs font-label-technical">
                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                <span>-1.8 días vs Objetivo</span>
              </div>
              <span className="font-label-technical text-xs text-text-muted">Meta: 16d</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-card shadow-sm flex flex-col justify-between border border-border-subtle">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-technical text-label-technical uppercase tracking-wider text-state-error">Atención Requerida</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-price-hero text-2xl md:text-3xl text-state-error font-bold">2</span>
                  <span className="font-label-technical text-xs font-semibold text-state-error">órdenes en riesgo</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-state-error/10 flex items-center justify-center text-state-error animate-pulse">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 bg-error-container/40 px-2 py-1 rounded">
              <span className="font-label-technical text-xs text-on-error-container truncate">Falta Roble Miel & Blum Legra</span>
              <span className="material-symbols-outlined text-[16px] text-state-error">chevron_right</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABLERO KANBAN DE FABRICACIÓN (6 COLUMNAS) */}
      <section className="w-full px-4 md:px-8 py-6 bg-canvas-cream flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-text-muted font-label-technical text-xs">
            <span className="material-symbols-outlined text-[16px]">view_column</span>
            <span>Flujo de taller continuo • Click en tarjeta para ver detalles o avanzar fase</span>
          </div>
          <div className="flex items-center gap-3 text-text-muted font-label-technical text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-state-success"></span> Entrega Holgada</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary-container"></span> Próximo (&lt;48h)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-state-error"></span> Alerta de Material</span>
          </div>
        </div>

        {/* Scroll Horizontal Kanban Container */}
        <div className="overflow-x-auto pb-6">
          <div className="flex items-start gap-4 min-w-[1720px]">
            {columns.map((col) => {
              const colOrders = filteredOrders.filter(o => o.columnId === col.id);
              return (
                <div key={col.id} className="w-72 flex-shrink-0 flex flex-col gap-3">
                  {/* Column Header */}
                  <div className="bg-surface-card p-3 rounded-xl flex items-center justify-between shadow-sm border border-border-subtle">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`}></span>
                      <h3 className="font-headline-sm text-sm font-bold text-primary">{col.title}</h3>
                    </div>
                    <span className="bg-surface-container px-2 py-0.5 rounded-full font-label-technical text-xs font-bold text-primary shadow-xs">
                      {colOrders.length}
                    </span>
                  </div>
                  <div className="text-[11px] font-label-technical text-text-muted px-1">{col.subtitle}</div>

                  {/* Orders Cards inside Column */}
                  <div className="flex flex-col gap-3 min-h-[450px] bg-surface-container-low/40 p-2 rounded-xl border border-dashed border-border-subtle">
                    {colOrders.map((order) => (
                      <div
                        key={order.id}
                        className={`bg-surface-card rounded-xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 cursor-pointer border ${
                          order.id === 'ord-894' ? 'ring-2 ring-secondary-container shadow-md' : 'border-border-subtle'
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-technical text-xs font-bold text-text-primary">{order.orderNumber}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-label-technical font-semibold ${order.statusBadgeClass}`}>
                              {order.statusBadge}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              advanceOrder(order.id);
                            }}
                            className="p-1 rounded bg-surface-container hover:bg-primary hover:text-white transition-colors text-text-muted"
                            title="Avanzar a siguiente fase de producción"
                          >
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </button>
                        </div>

                        {/* Thumbnail & Title */}
                        <div className="flex gap-2 items-start">
                          <img src={order.thumbnail} alt={order.productName} className="w-12 h-12 rounded-lg object-cover shrink-0 border border-border-subtle" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-headline-sm text-xs font-bold text-primary truncate leading-tight">
                              {order.productName}
                            </h4>
                            <p className="font-body-sm text-[11px] text-text-muted truncate mt-0.5">
                              {order.client} • {order.project}
                            </p>
                          </div>
                        </div>

                        {/* Specs */}
                        <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-label-technical">
                          <span className="px-1.5 py-0.5 rounded bg-surface-container text-text-primary flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: order.woodColor }}></span>
                            {order.woodName}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-container text-text-muted">
                            {order.pieceCount} piezas
                          </span>
                        </div>

                        {/* CNC Progress if active */}
                        {order.progressPercent && (
                          <div className="bg-surface-container-low p-2 rounded-lg flex flex-col gap-1 text-[11px] font-label-technical">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-primary">{order.machine}</span>
                              <span className="font-bold text-secondary-container">{order.progressPercent}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                              <div className="h-full bg-secondary-container rounded-full" style={{ width: `${order.progressPercent}%` }}></div>
                            </div>
                            <div className="flex justify-between text-text-muted text-[10px]">
                              <span>Op: {order.operator}</span>
                              <span className="text-secondary font-bold">{order.remainingTime}</span>
                            </div>
                          </div>
                        )}

                        {/* Alert if any */}
                        {order.alert && (
                          <div className="p-1.5 bg-error-container/40 rounded text-[10px] font-label-technical text-on-error-container">
                            {order.alert}
                          </div>
                        )}

                        {/* Date & Advance CTA */}
                        <div className="flex items-center justify-between pt-1 border-t border-border-subtle text-[11px] font-label-technical">
                          <span className="flex items-center gap-1 text-text-muted">
                            <span className="material-symbols-outlined text-[13px]">calendar_today</span> {order.deliveryDate}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              advanceOrder(order.id);
                            }}
                            className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded hover:bg-primary-variant transition-colors cursor-pointer"
                          >
                            Avanzar &gt;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PANEL INFERIOR DE ACTIVIDAD EN TIEMPO REAL */}
      <section className="w-full px-4 md:px-8 py-3 bg-surface border-t border-border-subtle flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-state-success animate-ping"></span>
            <span className="font-headline-sm text-sm font-bold text-primary">Cola Activa: 18 pedidos en planta</span>
          </div>
          <span className="text-text-muted">•</span>
          <div className="flex items-center gap-1 text-text-muted font-label-technical">
            <span className="material-symbols-outlined text-[16px] text-primary">dns</span>
            <span>Servidor de Corte: <strong>Homag CADMATIC 5.0 sincronizado</strong></span>
          </div>
          <span className="text-text-muted hidden md:inline">•</span>
          <div className="hidden md:flex items-center gap-1 text-text-muted font-label-technical">
            <span className="material-symbols-outlined text-[16px] text-secondary">notifications_active</span>
            <span>Último evento: <em>ORD-2025-0894 alcanzó 65% en Biesse Rover #2</em></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTvMode(!tvMode)}
            className="px-3 py-1 rounded-lg bg-surface-container text-primary font-label-technical text-xs font-semibold flex items-center gap-1 hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">fullscreen</span>
            <span>{tvMode ? 'Salir Modo Monitor' : 'Modo Monitor Taller (TV)'}</span>
          </button>
        </div>
      </section>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-2xl shadow-2xl max-w-lg w-full p-6 flex flex-col gap-4 border border-border-subtle animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-technical text-xs text-text-muted uppercase">Detalle de Fabricación</span>
                <h3 className="font-headline-sm text-xl font-bold text-text-primary mt-0.5">{selectedOrder.orderNumber} - {selectedOrder.productName}</h3>
                <p className="font-body-sm text-xs text-text-muted">Cliente: {selectedOrder.client} • {selectedOrder.project}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-text-muted hover:text-text-primary cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 bg-canvas-cream p-4 rounded-xl text-xs border border-border-subtle">
              <div className="flex justify-between py-1 border-b border-border-subtle">
                <span className="text-text-muted">Dimensiones del Mueble:</span>
                <span className="font-bold text-text-primary">{selectedOrder.dimensions}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle">
                <span className="text-text-muted">Especie maderera:</span>
                <span className="font-bold text-text-primary">{selectedOrder.woodName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle">
                <span className="text-text-muted">Número total de piezas:</span>
                <span className="font-bold text-text-primary">{selectedOrder.pieceCount} piezas CNC</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border-subtle">
                <span className="text-text-muted">Compromiso de Entrega:</span>
                <span className="font-bold text-state-success">{selectedOrder.deliveryDate}</span>
              </div>
              {selectedOrder.machine && (
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Centro de mecanizado:</span>
                  <span className="font-bold text-secondary-container">{selectedOrder.machine} ({selectedOrder.progressPercent}%)</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  advanceOrder(selectedOrder.id);
                  setSelectedOrder(null);
                }}
                className="flex-1 py-2.5 rounded-lg bg-secondary-container text-white font-headline-sm text-sm font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
              >
                Avanzar a Siguiente Fase
              </button>
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  onNavigate('despiece-lista-de-corte');
                }}
                className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-headline-sm text-sm font-semibold cursor-pointer"
              >
                Ver Lista de Corte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
