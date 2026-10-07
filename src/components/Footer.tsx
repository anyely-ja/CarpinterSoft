import React from 'react';
import { AppView } from '../types';
import { BRAND_LOGO_URL } from '../data/furnitureData';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface border-t border-border-subtle mt-12">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 xl:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {/* Columna 1: Brand & Bio */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src={BRAND_LOGO_URL}
                alt="Logo Carpintersoft"
                className="h-7 w-auto object-contain"
              />
              <span className="font-headline-sm text-[18px] text-text-primary tracking-tight font-bold">
                Carpintersoft
              </span>
            </div>
            <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              Plataforma arquitectónica para configuración paramétrica de carpintería a medida, renderizado 3D de alta fidelidad y cálculo de costes de producción instantáneo.
            </p>
            <div className="flex items-center gap-1.5 text-state-success font-label-technical text-label-technical">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Fabricación Artesanal Certificada</span>
            </div>
          </div>

          {/* Columna 2: Catálogo de Muebles */}
          <div>
            <p className="font-label-technical text-label-technical text-text-primary uppercase tracking-wider mb-4 font-bold">
              Catálogo de Muebles
            </p>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('explorar-catalogo')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Armarios y Vestidores
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorar-catalogo')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Módulos de Cocina
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorar-catalogo')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Estanterías y Librerías
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorar-catalogo')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Mesas de Roble Macizo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorar-catalogo')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Aparadores & Credenzas
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Estudio 3D & Motor */}
          <div>
            <p className="font-label-technical text-label-technical text-text-primary uppercase tracking-wider mb-4 font-bold">
              Estudio 3D & Motor
            </p>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('personalizador-3d')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Configurador Paramétrico
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('asistente-ia')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Copiloto de Diseño IA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('personalizador-3d')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Librería de Maderas & Lacas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('precios-cotizacion')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Algoritmo de Cotización
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('despiece-lista-de-corte')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Exportación CAD & DXF
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4: Talleres y Carpinteros */}
          <div>
            <p className="font-label-technical text-label-technical text-text-primary uppercase tracking-wider mb-4 font-bold">
              Talleres y Carpinteros
            </p>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('cola-de-produccion-pedidos')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Red de Talleres Afiliados
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('despiece-lista-de-corte')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Generación de Listas de Corte
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cola-de-produccion-pedidos')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Integración Maquinaria CNC
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cola-de-produccion-pedidos')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Panel de Producción B2B
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('perfil-de-usuario')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Directorio Profesional
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 5: Garantía & Servicio */}
          <div>
            <p className="font-label-technical text-label-technical text-text-primary uppercase tracking-wider mb-4 font-bold">
              Garantía & Servicio
            </p>
            <ul className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <button onClick={() => onNavigate('precios-cotizacion')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Garantía Estructural 10 Años
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('asistente-ia')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Envío de Muestras Físicas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('precios-cotizacion')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Transporte e Instalación
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('personalizador-3d')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Política de Ajuste de Milímetro
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('perfil-de-usuario')} className="hover:text-text-primary transition-colors cursor-pointer text-left">
                  Soporte Técnico Especializado
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-high/50 p-4 rounded-xl">
          <div className="flex items-center gap-4 font-body-sm text-body-sm text-on-surface-variant">
            <span>© 2025 Carpintersoft Technologies S.L. Todos los derechos reservados.</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 font-label-technical text-label-technical text-on-surface-variant">
            <span className="hover:text-text-primary transition-colors cursor-pointer">Aviso Legal</span>
            <span className="hover:text-text-primary transition-colors cursor-pointer">Política de Privacidad</span>
            <span className="hover:text-text-primary transition-colors cursor-pointer">Condiciones de Fabricación</span>
            <span className="hover:text-text-primary transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
