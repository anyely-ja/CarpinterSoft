import React, { useState } from 'react';
import { AppView, CutPart } from '../types';
import { CUT_PARTS_HORIZON } from '../data/furnitureData';

interface DespieceCortePageProps {
  onNavigate: (view: AppView, modelId?: string) => void;
}

export const DespieceCortePage: React.FC<DespieceCortePageProps> = ({ onNavigate }) => {
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string>('todos');
  const [selectedPartId, setSelectedPartId] = useState<string | null>('P-01');
  const [activeTab, setActiveTab] = useState<'tabla' | 'nesting' | 'cnc'>('tabla');
  const [activeBoardIndex, setActiveBoardIndex] = useState<number>(0);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportType, setExportType] = useState<'dxf' | 'csv' | 'etiquetas'>('dxf');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const materials = [
    { id: 'todos', label: 'Todos los Materiales' },
    { id: 'Roble Macizo', label: 'Roble Macizo (Tapa y Puertas)' },
    { id: 'Rechapado Roble', label: 'Rechapado Roble 19mm' },
    { id: 'MDF Lacado 8mm', label: 'MDF Trasera 8mm' }
  ];

  const filteredParts = CUT_PARTS_HORIZON.filter(part => {
    if (selectedMaterialFilter === 'todos') return true;
    return part.material.toLowerCase().includes(selectedMaterialFilter.toLowerCase());
  });

  const totalPieces = CUT_PARTS_HORIZON.reduce((acc, p) => acc + p.quantity, 0);
  const totalAreaM2 = (
    CUT_PARTS_HORIZON.reduce((acc, p) => acc + (p.length * p.width * p.quantity) / 1000000, 0)
  ).toFixed(2);

  const selectedPart = CUT_PARTS_HORIZON.find(p => p.id === selectedPartId) || CUT_PARTS_HORIZON[0];

  const triggerExport = (type: 'dxf' | 'csv' | 'etiquetas') => {
    setExportType(type);
    setShowExportModal(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedNotification(`¡${label} copiado al portapapeles!`);
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  return (
    <div className="min-w-0 flex-1 bg-surface py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-high/60 pb-5">
          <div className="flex items-center gap-2 text-xs md:text-sm text-text-muted font-mono">
            <button 
              onClick={() => onNavigate('landing-page')}
              className="hover:text-primary transition-colors hover:underline"
            >
              Inicio
            </button>
            <span>/</span>
            <button 
              onClick={() => onNavigate('cola-de-produccion-pedidos')}
              className="hover:text-primary transition-colors hover:underline"
            >
              Taller & Producción
            </button>
            <span>/</span>
            <span className="text-primary font-bold">Despiece & Lista de Corte CNC</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('personalizador-3d', 'horizon')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-container-highest bg-surface-container-low text-xs font-semibold text-text-main hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
              Ajustar Medidas en 3D
            </button>
            <button
              onClick={() => onNavigate('cola-de-produccion-pedidos')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-container-highest bg-surface-container-low text-xs font-semibold text-text-main hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">view_kanban</span>
              Ver Cola de Taller
            </button>
          </div>
        </div>

        {/* Title Header with KPIs */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                Aparador Horizon 180cm (V4.2 Paramétrico)
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-state-success/10 text-state-success border border-state-success/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-state-success"></span>
                Archivos Validados para Biesse Rover CNC
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-text-main tracking-tight">
              Lista de Corte y Nesting de Producción
            </h1>
            <p className="text-sm text-text-muted mt-1 max-w-2xl">
              Especificaciones milimétricas con cálculo de holguras de canteado (-2mm), dirección de veta continua y secuencia de pasadas G-code para taller.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => triggerExport('dxf')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:bg-primary/90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Descargar DXF / G-Code
            </button>
            <button
              onClick={() => triggerExport('csv')}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container text-text-main text-xs font-semibold border border-surface-container-highest hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">table_chart</span>
              CSV para Seccionadora
            </button>
            <button
              onClick={() => triggerExport('etiquetas')}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container text-text-main text-xs font-semibold border border-surface-container-highest hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              Etiquetas QR Taller
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high">
            <div className="text-xs text-text-muted font-medium flex items-center justify-between">
              Total Piezas Físicas
              <span className="material-symbols-outlined text-primary text-[18px]">grid_view</span>
            </div>
            <div className="text-2xl font-bold font-mono text-text-main mt-1">
              {totalPieces} <span className="text-xs font-normal text-text-muted font-sans">unidades</span>
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">8 programas de mecanizado</div>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high">
            <div className="text-xs text-text-muted font-medium flex items-center justify-between">
              Superficie Neta
              <span className="material-symbols-outlined text-secondary text-[18px]">straighten</span>
            </div>
            <div className="text-2xl font-bold font-mono text-text-main mt-1">
              {totalAreaM2} <span className="text-xs font-normal text-text-muted font-sans">m²</span>
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">Volumen madera: ~0.084 m³</div>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high">
            <div className="text-xs text-text-muted font-medium flex items-center justify-between">
              Aprovechamiento Nesting
              <span className="material-symbols-outlined text-state-success text-[18px]">pie_chart</span>
            </div>
            <div className="text-2xl font-bold font-mono text-state-success mt-1">
              88.4%
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">Merma optimizada: 11.6%</div>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high">
            <div className="text-xs text-text-muted font-medium flex items-center justify-between">
              Tableros Requeridos
              <span className="material-symbols-outlined text-primary text-[18px]">inventory_2</span>
            </div>
            <div className="text-2xl font-bold font-mono text-text-main mt-1">
              2 <span className="text-xs font-normal text-text-muted font-sans">formatos</span>
            </div>
            <div className="text-[11px] text-text-muted mt-0.5">2800×2070mm & Tablón Macizo</div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-surface-container-high">
          <button
            onClick={() => setActiveTab('tabla')}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'tabla'
                ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
                : 'border-transparent text-text-muted hover:text-text-main'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">table_rows</span>
            Tabla Paramétrica de Piezas ({filteredParts.length})
          </button>
          <button
            onClick={() => setActiveTab('nesting')}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'nesting'
                ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
                : 'border-transparent text-text-muted hover:text-text-main'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            Mapa de Nesting 2D Interactivo (2800×2070mm)
          </button>
          <button
            onClick={() => setActiveTab('cnc')}
            className={`flex items-center gap-2 py-3 px-5 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'cnc'
                ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
                : 'border-transparent text-text-muted hover:text-text-main'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
            Ficha de Mecanizado & Fresas CNC
          </button>
        </div>

        {/* TAB 1: TABLA PARAMÉTRICA DE PIEZAS */}
        {activeTab === 'tabla' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-text-muted font-medium mr-2">Filtrar por material:</span>
              {materials.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMaterialFilter(mat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedMaterialFilter === mat.id
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-text-muted hover:text-text-main hover:bg-surface-container-high'
                  }`}
                >
                  {mat.label}
                </button>
              ))}
            </div>

            {/* Parts Table */}
            <div className="overflow-x-auto rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-[11px] font-bold text-text-muted uppercase tracking-wider border-b border-surface-container-high">
                    <th className="py-3 px-4">Cód / ID</th>
                    <th className="py-3 px-4">Pieza & Descripción</th>
                    <th className="py-3 px-4">Material Base</th>
                    <th className="py-3 px-4 text-center">Cant.</th>
                    <th className="py-3 px-4 font-mono text-right">Largo (mm)</th>
                    <th className="py-3 px-4 font-mono text-right">Ancho (mm)</th>
                    <th className="py-3 px-4 font-mono text-right">Esp. (mm)</th>
                    <th className="py-3 px-4 text-center">Veta</th>
                    <th className="py-3 px-4">Canto / Reborde</th>
                    <th className="py-3 px-4">Operación CNC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high text-xs">
                  {filteredParts.map((part) => {
                    const isSelected = selectedPartId === part.id;
                    return (
                      <tr
                        key={part.id}
                        onClick={() => setSelectedPartId(part.id)}
                        className={`hover:bg-primary/5 cursor-pointer transition-colors ${
                          isSelected ? 'bg-primary/10 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-primary whitespace-nowrap">
                          {part.id}
                          {part.isCritical && (
                            <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-secondary" title="Veta Continua Crítica" />
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-text-main">{part.label}</div>
                          <div className="text-[11px] text-text-muted">{part.sublabel}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border"
                            style={{
                              backgroundColor: `${part.materialColor}15`,
                              borderColor: `${part.materialColor}40`,
                              color: part.materialColor
                            }}
                          >
                            {part.materialBadge}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-text-main">
                          {part.quantity}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-text-main">
                          {part.length.toFixed(1)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-text-main">
                          {part.width.toFixed(1)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-text-main">
                          {part.thickness.toFixed(1)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 text-[11px] text-text-muted">
                            <span className="material-symbols-outlined text-[14px]">
                              {part.grain === 'longitudinal' ? 'swap_horiz' : part.grain === 'vertical' ? 'swap_vert' : 'sync'}
                            </span>
                            {part.grain}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-text-muted text-[11px] whitespace-nowrap">
                          {part.edges}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container text-[11px] text-text-main border border-surface-container-highest">
                            <span className="material-symbols-outlined text-[13px] text-primary">
                              {part.cncType === 'drill' ? 'fiber_manual_record' : part.cncType === 'bevel' ? 'change_history' : 'handyman'}
                            </span>
                            {part.cncOperation}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Detail Drawer for Selected Part */}
            {selectedPart && (
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-primary/30 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-lg">
                    {selectedPart.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-text-main text-base">{selectedPart.label}</h4>
                      <span className="text-xs text-text-muted font-mono">
                        {selectedPart.length} × {selectedPart.width} × {selectedPart.thickness} mm
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">
                      {selectedPart.sublabel} • Canto: {selectedPart.edges} • Veta: {selectedPart.grain}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveTab('nesting')}
                    className="px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-text-main hover:bg-surface-container-high transition-colors"
                  >
                    Ver en Tablero Nesting
                  </button>
                  <button
                    onClick={() => copyToClipboard(`G00 X0 Y0 Z5\nG01 Z-${selectedPart.thickness} F1200\n(Mecanizado ${selectedPart.id} ${selectedPart.label})\n`, `G-Code ${selectedPart.id}`)}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Copiar Bloque G-Code
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MAPA DE NESTING 2D INTERACTIVO */}
        {activeTab === 'nesting' && (
          <div className="space-y-6">
            {/* Board Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-text-muted">Tablero de Corte:</span>
                <button
                  onClick={() => setActiveBoardIndex(0)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeBoardIndex === 0
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-text-muted hover:text-text-main'
                  }`}
                >
                  Tablero 1: Rechapado Roble 19mm (2800 × 2070 mm)
                </button>
                <button
                  onClick={() => setActiveBoardIndex(1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeBoardIndex === 1
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-text-muted hover:text-text-main'
                  }`}
                >
                  Tablero 2: Roble Macizo Alistonado (3000 × 600 mm)
                </button>
              </div>

              <div className="text-xs text-text-muted font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-state-success"></span>
                <span>Eficiencia: <strong>{activeBoardIndex === 0 ? '89.2%' : '84.6%'}</strong></span>
                <span>• Merma: <strong>{activeBoardIndex === 0 ? '10.8%' : '15.4%'}</strong></span>
              </div>
            </div>

            {/* SVG Interactive Nesting Canvas */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-text-muted font-mono">
                  Escala: 1:4 • Haz clic en una pieza para seleccionarla • Veta en eje X (Horizontal)
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#103e4a]/80"></span>
                    Rechapado Roble 19
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#fda62e]/80"></span>
                    Roble Macizo
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-slate-300"></span>
                    Sobrante / Merma
                  </span>
                </div>
              </div>

              <div className="relative w-full overflow-x-auto pb-4">
                <div className="min-w-[700px] border-2 border-dashed border-surface-container-highest rounded-xl p-4 bg-[#f4efe6]">
                  {/* Nesting Graphic */}
                  <svg
                    viewBox="0 0 1400 600"
                    className="w-full h-auto drop-shadow-sm select-none"
                    style={{ maxHeight: '420px' }}
                  >
                    {/* Background Sheet: 2800 x 1200 proportion representation */}
                    <rect x="0" y="0" width="1400" height="600" fill="#e9e2d3" rx="8" />
                    
                    {/* Grid Lines */}
                    <line x1="0" y1="300" x2="1400" y2="300" stroke="#d5ccba" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="700" y1="0" x2="700" y2="600" stroke="#d5ccba" strokeWidth="1" strokeDasharray="4 4" />

                    {activeBoardIndex === 0 ? (
                      /* Board 1: Casework (Rechapado) */
                      <>
                        {/* P-02: Base Inferior (1762 x 431) -> approx 881 x 215 */}
                        <g 
                          onClick={() => setSelectedPartId('P-02')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="20"
                            y="20"
                            width="881"
                            height="215"
                            fill={selectedPartId === 'P-02' ? '#103e4a' : '#1c5666'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="35" y="55" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace">
                            P-02 : Base Inferior Estructural (1762 × 431 mm)
                          </text>
                          <text x="35" y="80" fill="#a4d1dc" fontSize="13" fontFamily="sans-serif">
                            Rechapado Roble 19mm • Taladros Minifix & Clavijas
                          </text>
                        </g>

                        {/* P-03: Costado Izq (680 x 431) -> approx 340 x 215 */}
                        <g 
                          onClick={() => setSelectedPartId('P-03/04')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="920"
                            y="20"
                            width="340"
                            height="215"
                            fill={selectedPartId === 'P-03/04' ? '#103e4a' : '#1c5666'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="935" y="55" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="monospace">
                            P-03 : Costado Izq
                          </text>
                          <text x="935" y="78" fill="#a4d1dc" fontSize="12">
                            680 × 431 mm
                          </text>
                        </g>

                        {/* P-04: Costado Der (680 x 431) -> approx 340 x 215 */}
                        <g 
                          onClick={() => setSelectedPartId('P-03/04')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="920"
                            y="255"
                            width="340"
                            height="215"
                            fill={selectedPartId === 'P-03/04' ? '#103e4a' : '#1c5666'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="935" y="290" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="monospace">
                            P-04 : Costado Der
                          </text>
                          <text x="935" y="313" fill="#a4d1dc" fontSize="12">
                            680 × 431 mm
                          </text>
                        </g>

                        {/* P-05: Divisoria 1 (661 x 420) -> approx 330 x 210 */}
                        <g 
                          onClick={() => setSelectedPartId('P-05/06')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="20"
                            y="255"
                            width="330"
                            height="210"
                            fill={selectedPartId === 'P-05/06' ? '#103e4a' : '#1c5666'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="35" y="290" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="monospace">
                            P-05 : Divisoria Int #1
                          </text>
                          <text x="35" y="312" fill="#a4d1dc" fontSize="12">
                            661 × 420 mm • Paso 32
                          </text>
                        </g>

                        {/* P-06: Divisoria 2 (661 x 420) -> approx 330 x 210 */}
                        <g 
                          onClick={() => setSelectedPartId('P-05/06')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="370"
                            y="255"
                            width="330"
                            height="210"
                            fill={selectedPartId === 'P-05/06' ? '#103e4a' : '#1c5666'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="385" y="290" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="monospace">
                            P-06 : Divisoria Int #2
                          </text>
                          <text x="385" y="312" fill="#a4d1dc" fontSize="12">
                            661 × 420 mm • Paso 32
                          </text>
                        </g>

                        {/* P-11: Balda Regulable 1 */}
                        <g className="cursor-pointer opacity-80 hover:opacity-100">
                          <rect x="20" y="485" width="280" height="95" fill="#2d6e80" stroke="#ffffff" strokeWidth="2" rx="3" />
                          <text x="35" y="525" fill="#ffffff" fontSize="13" fontWeight="bold">P-11: Balda Izq</text>
                        </g>

                        {/* P-12: Balda Regulable 2 */}
                        <g className="cursor-pointer opacity-80 hover:opacity-100">
                          <rect x="320" y="485" width="280" height="95" fill="#2d6e80" stroke="#ffffff" strokeWidth="2" rx="3" />
                          <text x="335" y="525" fill="#ffffff" fontSize="13" fontWeight="bold">P-12: Balda Der</text>
                        </g>

                        {/* Merma / Sobrante */}
                        <g>
                          <rect x="720" y="255" width="180" height="325" fill="#dfd6c4" stroke="#c5b9a2" strokeWidth="1" strokeDasharray="3 3" rx="4" />
                          <text x="740" y="420" fill="#8f836d" fontSize="13" fontWeight="bold">MERMA APROV.</text>
                          <text x="740" y="440" fill="#8f836d" fontSize="11">0.58 m² retenible</text>
                        </g>
                      </>
                    ) : (
                      /* Board 2: Solid Oak (Roble Macizo) */
                      <>
                        {/* P-01: Tapa Superior Biselada (1800 x 450) -> 900 x 225 */}
                        <g 
                          onClick={() => setSelectedPartId('P-01')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="20"
                            y="20"
                            width="900"
                            height="225"
                            fill={selectedPartId === 'P-01' ? '#b46d14' : '#fda62e'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="35" y="55" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace">
                            P-01 : TAPA SUPERIOR BISELADA (1800 × 450 mm)
                          </text>
                          <text x="35" y="80" fill="#fff1d6" fontSize="13">
                            Roble Macizo 22mm • Bisel 45° Ingleteado Perimetral
                          </text>
                        </g>

                        {/* Puertas Alistonadas P-07, P-08, P-09 (Continuidad de veta) */}
                        <g 
                          onClick={() => setSelectedPartId('P-07/09')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="20"
                            y="265"
                            width="291"
                            height="315"
                            fill={selectedPartId === 'P-07/09' ? '#b46d14' : '#e08f22'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="35" y="305" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="monospace">
                            P-07 : Puerta Izq
                          </text>
                          <text x="35" y="328" fill="#fff1d6" fontSize="12">
                            Alistonado 12mm
                          </text>
                        </g>

                        <g 
                          onClick={() => setSelectedPartId('P-07/09')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="330"
                            y="265"
                            width="291"
                            height="315"
                            fill={selectedPartId === 'P-07/09' ? '#b46d14' : '#e08f22'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="345" y="305" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="monospace">
                            P-08 : Puerta Centro
                          </text>
                          <text x="345" y="328" fill="#fff1d6" fontSize="12">
                            Veta Continua
                          </text>
                        </g>

                        <g 
                          onClick={() => setSelectedPartId('P-07/09')} 
                          className="cursor-pointer transition-transform hover:opacity-90"
                        >
                          <rect
                            x="640"
                            y="265"
                            width="291"
                            height="315"
                            fill={selectedPartId === 'P-07/09' ? '#b46d14' : '#e08f22'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            rx="4"
                          />
                          <text x="655" y="305" fill="#ffffff" fontSize="15" fontWeight="bold" fontFamily="monospace">
                            P-09 : Puerta Der
                          </text>
                          <text x="655" y="328" fill="#fff1d6" fontSize="12">
                            Alistonado 12mm
                          </text>
                        </g>

                        {/* Patas Cónicas P-13..16 */}
                        <g className="cursor-pointer">
                          <rect x="950" y="20" width="420" height="225" fill="#cf7f19" stroke="#ffffff" strokeWidth="2" rx="4" />
                          <text x="970" y="55" fill="#ffffff" fontSize="16" fontWeight="bold">
                            P-13..16 : Patas Macizas (x4)
                          </text>
                          <text x="970" y="80" fill="#fff1d6" fontSize="13">
                            Torneadas cónicas 150mm + pletinas
                          </text>
                        </g>
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* Nesting legend and tips */}
              <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-text-muted gap-2 border-t border-surface-container-high pt-3">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
                  La veta de las 3 puertas alistonadas se corta en serie longitudinal para garantizar un dibujo continuo perfecto.
                </span>
                <span className="font-mono text-text-main font-semibold">
                  Velocidad de avance recomendada: 18 m/min • RPM: 18.000
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FICHA DE MECANIZADO CNC */}
        {activeTab === 'cnc' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
                <h3 className="text-base font-bold text-text-main mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">build</span>
                  Secuencia de Herramientas en Cargador CNC (Biesse Rover)
                </h3>

                <div className="space-y-3">
                  {[
                    { tool: 'T1', name: 'Fresa de Diamante Ø16mm Z=3+3', use: 'Escuadrado y desbaste perimetral de tableros', speed: '18.000 RPM / 20 m/min', status: 'Verificada' },
                    { tool: 'T2', name: 'Fresa de Bisel 45° con Rodamiento', use: 'Ingleteado perimetral en Tapa Superior P-01', speed: '16.000 RPM / 12 m/min', status: 'Calibrada' },
                    { tool: 'T3', name: 'Fresa Cilíndrica Ranurada Ø8mm', use: 'Ranura para encastre de trasera MDF P-10 (profundidad 9mm)', speed: '18.000 RPM / 15 m/min', status: 'Verificada' },
                    { tool: 'T4', name: 'Cabezal de Taladro Múltiple Ø5mm / Ø8mm', use: 'Cremallera paso 32mm y clavijas de ensamble excéntrico', speed: '4.500 RPM', status: 'Operativo' },
                    { tool: 'T5', name: 'Fresa Especial de Palillería Convexa', use: 'Fresado alistonado rítmico en frentes de puerta P-07 a P-09', speed: '17.500 RPM / 8 m/min', status: 'Afilado reciente' }
                  ].map((t) => (
                    <div key={t.tool} className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-mono font-bold text-primary text-xs">
                          {t.tool}
                        </span>
                        <div>
                          <div className="font-semibold text-text-main text-xs">{t.name}</div>
                          <div className="text-[11px] text-text-muted">{t.use}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs text-text-main">{t.speed}</div>
                        <span className="text-[10px] font-bold text-state-success bg-state-success/10 px-2 py-0.5 rounded">
                          {t.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
                <h3 className="text-base font-bold text-text-main mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">code</span>
                  Vista Previa del Archivo G-Code (Encabezado)
                </h3>
                <pre className="bg-[#1f2427] text-[#a4d1dc] p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
{`%
(PROGRAM: CARPINTERSOFT_HORIZON_V4.2.NC)
(MACHINE: BIESSE ROVER A 1632)
(DATE: 2026-10-07 | UNITS: MM)
G90 G21 G17 G40 G80
G28 X0 Y0 Z0
T1 M06 (FRESA DIAMANTE D16)
S18000 M03
G00 X20.000 Y20.000 Z10.000
M08 (ASPIRACION ON)
G01 Z-19.200 F3000
G01 X1820.000 F18000
G01 Y470.000
G01 X20.000
G01 Y20.000
G00 Z10.000
...`}
                </pre>
              </div>
            </div>

            {/* Right sidebar: Checklist and machine parameters */}
            <div className="space-y-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
                <h4 className="font-bold text-text-main text-sm mb-3">Protocolo de Taller Previas a Corte</h4>
                <ul className="space-y-3 text-xs text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-state-success text-[16px] mt-0.5">check_circle</span>
                    <span>Verificar escuadrado previo del tablero crudo (máx 0.5mm de tolerancia).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-state-success text-[16px] mt-0.5">check_circle</span>
                    <span>Activar bomba de vacío a 250 mbar en ventosas de sujeción.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-state-success text-[16px] mt-0.5">check_circle</span>
                    <span>Cotejar número de lote de chapa de roble para evitar disparidad de tono.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-state-success text-[16px] mt-0.5">check_circle</span>
                    <span>Etiquetar de inmediato tras despiece con códigos QR impresos.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                <h4 className="font-bold text-primary text-sm mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
                  Sincronización Directa con Taller
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Cualquier ajuste de ancho o fondo en el Personalizador 3D recalculan automáticamente este despiece en milisegundos sin intervención manual de delineación.
                </p>
                <button
                  onClick={() => onNavigate('personalizador-3d', 'horizon')}
                  className="mt-4 w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all text-center block"
                >
                  Abrir Modelo en 3D
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copy Notification Toast */}
        {copiedNotification && (
          <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            {copiedNotification}
          </div>
        )}

        {/* Export / Download Modal */}
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 border border-surface-container-high shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center material-symbols-outlined">
                    {exportType === 'dxf' ? 'download' : exportType === 'csv' ? 'table_chart' : 'qr_code'}
                  </span>
                  <div>
                    <h3 className="font-bold text-text-main text-base">
                      {exportType === 'dxf' ? 'Descargar Archivo DXF / G-Code' : exportType === 'csv' ? 'Exportar CSV Seccionadora' : 'Generador de Etiquetas QR'}
                    </h3>
                    <p className="text-xs text-text-muted font-mono">Horizon-180-V4.2</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-text-muted hover:text-text-main p-1 rounded-lg"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-4 text-xs text-text-muted">
                {exportType === 'dxf' ? (
                  <>
                    <p>
                      El archivo ZIP incluye la geometría vectorial optimizada en capas DXF compatibles con <strong>BiesseWorks, Homag WoodWOP, AlphaCAM y Vectric Aspire</strong>.
                    </p>
                    <div className="p-3 bg-surface-container rounded-xl font-mono text-[11px] text-text-main space-y-1">
                      <div>✓ CARPINTERSOFT_HORIZON_ROVER.DXF (8.4 MB)</div>
                      <div>✓ GCODE_PASADAS_BIESSE.NC (1.2 MB)</div>
                      <div>✓ PLANO_ENSAMBLE_PDF.PDF (2.6 MB)</div>
                    </div>
                  </>
                ) : exportType === 'csv' ? (
                  <>
                    <p>
                      Formato tabulado normalizado con columnas compatibles con sierras seccionadoras horizontales (Schelling, Mayer, SCM, Giben).
                    </p>
                    <div className="p-3 bg-surface-container rounded-xl font-mono text-[11px] text-text-main">
                      ID,PartName,Material,Quantity,Length,Width,Thick,Grain,EdgeTop,EdgeBottom
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      22 etiquetas listas para imprimir en rollo térmico estándar (100×50mm). Cada etiqueta incluye código QR único con enlace de rastreo a la cola de taller.
                    </p>
                    <div className="p-3 bg-surface-container rounded-xl flex items-center gap-3">
                      <span className="material-symbols-outlined text-4xl text-primary">qr_code_2</span>
                      <div className="text-[11px] text-text-main">
                        <div className="font-bold">ORD-2025-0894-P01</div>
                        <div>Tapa Superior Biselada • Roble 22mm</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowExportModal(false);
                    copyToClipboard('Descarga simulada completada con éxito', 'Archivo generado');
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90"
                >
                  Confirmar Descarga
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
