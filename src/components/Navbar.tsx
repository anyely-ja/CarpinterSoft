import React, { useState } from 'react';
import { AppView, CartItem } from '../types';
import { BRAND_LOGO_URL } from '../data/furnitureData';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  cart: CartItem[];
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cart,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [carpenterDropdownOpen, setCarpenterDropdownOpen] = useState(false);

  const isWorkshopActive =
    currentView === 'cola-de-produccion-pedidos' ||
    currentView === 'despiece-lista-de-corte';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-border-subtle">
      <div className="h-20 w-full px-4 md:px-8 xl:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo & Studio Tag */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => onNavigate('landing-page')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <img
              src={BRAND_LOGO_URL}
              alt="Logo Carpintersoft"
              className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-[20px] text-text-primary tracking-tight font-bold leading-none">
                Carpintersoft
              </span>
              <span className="font-label-technical text-[10px] text-text-muted uppercase tracking-wider hidden sm:block">
                Diseño 3D & Ebanistería Digital
              </span>
            </div>
          </button>

          {/* Quick Studio 3D Badge */}
          <div className="hidden 2xl:flex items-center gap-1.5 pl-4 border-l border-border-subtle">
            <span className="w-2 h-2 rounded-full bg-state-success animate-pulse"></span>
            <span className="font-label-technical text-label-technical text-text-primary uppercase tracking-wider font-semibold">
              Studio 3D v4.2
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
          <button
            onClick={() => onNavigate('explorar-catalogo')}
            className={`font-body-md text-[15px] transition-colors cursor-pointer ${
              currentView === 'explorar-catalogo'
                ? 'text-primary font-bold border-b-2 border-secondary-container pb-1'
                : 'text-on-surface-variant hover:text-text-primary'
            }`}
          >
            Explorar Catálogo
          </button>

          <button
            onClick={() => onNavigate('personalizador-3d')}
            className={`font-body-md text-[15px] transition-colors cursor-pointer ${
              currentView === 'personalizador-3d'
                ? 'text-primary font-bold border-b-2 border-secondary-container pb-1'
                : 'text-on-surface-variant hover:text-text-primary'
            }`}
          >
            Personalizador 3D
          </button>

          <button
            onClick={() => onNavigate('asistente-ia')}
            className={`font-body-md text-[15px] transition-colors cursor-pointer flex items-center gap-1 ${
              currentView === 'asistente-ia'
                ? 'text-primary font-bold border-b-2 border-secondary-container pb-1'
                : 'text-on-surface-variant hover:text-text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[17px] text-secondary-container">auto_awesome</span>
            <span>Asistente IA</span>
          </button>

          {/* Para Carpinteros Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCarpenterDropdownOpen(!carpenterDropdownOpen)}
              onMouseEnter={() => setCarpenterDropdownOpen(true)}
              className={`font-body-md text-[15px] transition-colors cursor-pointer flex items-center gap-1 ${
                isWorkshopActive
                  ? 'text-primary font-bold border-b-2 border-secondary-container pb-1'
                  : 'text-on-surface-variant hover:text-text-primary'
              }`}
            >
              <span>Para Carpinteros</span>
              <span className="material-symbols-outlined text-[16px] text-text-muted">expand_more</span>
            </button>

            {carpenterDropdownOpen && (
              <div
                onMouseLeave={() => setCarpenterDropdownOpen(false)}
                className="absolute top-8 left-0 w-64 bg-surface-card rounded-xl shadow-xl p-2 z-50 border border-border-subtle flex flex-col gap-1"
              >
                <button
                  onClick={() => {
                    onNavigate('cola-de-produccion-pedidos');
                    setCarpenterDropdownOpen(false);
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-left transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">conveyor_belt</span>
                  </div>
                  <div>
                    <p className="font-headline-sm text-[13px] font-bold text-text-primary leading-tight">Cola de Producción (Kanban)</p>
                    <p className="font-label-technical text-[11px] text-text-muted">Gestión de órdenes & CNC</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onNavigate('despiece-lista-de-corte');
                    setCarpenterDropdownOpen(false);
                  }}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-surface-container text-left transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">table_chart</span>
                  </div>
                  <div>
                    <p className="font-headline-sm text-[13px] font-bold text-text-primary leading-tight">Despiece & Nesting 2D</p>
                    <p className="font-label-technical text-[11px] text-text-muted">Listas de corte & G-Code</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('precios-cotizacion')}
            className={`font-body-md text-[15px] transition-colors cursor-pointer ${
              currentView === 'precios-cotizacion'
                ? 'text-primary font-bold border-b-2 border-secondary-container pb-1'
                : 'text-on-surface-variant hover:text-text-primary'
            }`}
          >
            Precios & Cotización
          </button>
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          {/* Workshop Mode Switch Badge */}
          <button
            onClick={() => onNavigate(isWorkshopActive ? 'personalizador-3d' : 'cola-de-produccion-pedidos')}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label-technical font-semibold transition-all cursor-pointer ${
              isWorkshopActive
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'bg-surface-container hover:bg-surface-container-high text-primary'
            }`}
            title="Alternar vista entre Cliente y Taller CNC"
          >
            <span className={`w-2 h-2 rounded-full ${isWorkshopActive ? 'bg-secondary-container animate-pulse' : 'bg-state-success'}`}></span>
            <span>{isWorkshopActive ? 'Modo Taller B2B' : 'Modo Cliente / Estudio'}</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary transition-colors cursor-pointer"
            title="Ver carrito de presupuestos"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-4.5 min-w-[1.1rem] px-1 rounded-full bg-secondary-container text-white font-label-technical text-[10px] font-bold">
                {cart.length}
              </span>
            )}
          </button>

          {/* User Profile Button */}
          <button
            onClick={() => onNavigate('perfil-de-usuario')}
            className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
            title="Perfil de Estudio Elena Morales"
          >
            <div className="hidden lg:flex flex-col text-right leading-tight">
              <span className="font-headline-sm text-[13px] font-bold text-text-primary">Elena Morales</span>
              <span className="font-label-technical text-[10px] text-text-muted">Estudio VIP</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-xs font-bold">
              EM
            </div>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => onNavigate('personalizador-3d')}
            className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-lg bg-secondary-container hover:bg-accent-hover text-on-primary font-headline-sm text-[14px] font-semibold transition-all shadow-sm cursor-pointer"
          >
            Diseñar mi Mueble
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-text-primary rounded-lg hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-card border-b border-border-subtle p-4 shadow-xl flex flex-col gap-3">
          <button
            onClick={() => {
              onNavigate('landing-page');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container font-headline-sm text-[15px] text-text-primary"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              onNavigate('explorar-catalogo');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container font-headline-sm text-[15px] text-text-primary"
          >
            Explorar Catálogo
          </button>
          <button
            onClick={() => {
              onNavigate('personalizador-3d');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container font-headline-sm text-[15px] text-text-primary font-semibold text-secondary"
          >
            Personalizador 3D
          </button>
          <button
            onClick={() => {
              onNavigate('asistente-ia');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container font-headline-sm text-[15px] text-text-primary"
          >
            Asistente IA
          </button>
          <div className="h-[1px] bg-border-subtle my-1"></div>
          <span className="font-label-technical text-[11px] text-text-muted uppercase px-3">Área de Taller & CNC</span>
          <button
            onClick={() => {
              onNavigate('cola-de-produccion-pedidos');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container font-headline-sm text-[14px] text-text-primary"
          >
            Cola de Producción (Kanban)
          </button>
          <button
            onClick={() => {
              onNavigate('despiece-lista-de-corte');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container font-headline-sm text-[14px] text-text-primary"
          >
            Despiece & Nesting 2D
          </button>
          <button
            onClick={() => {
              onNavigate('precios-cotizacion');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container font-headline-sm text-[14px] text-text-primary"
          >
            Checkout & Presupuesto
          </button>
          <button
            onClick={() => {
              onNavigate('perfil-de-usuario');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-lg hover:bg-surface-container font-headline-sm text-[14px] text-text-primary"
          >
            Mi Cuenta (Estudio Elena Morales)
          </button>
        </div>
      )}
    </header>
  );
};
