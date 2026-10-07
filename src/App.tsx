import React, { useState, useEffect } from 'react';
import { AppView, CartItem } from './types';
import { FURNITURE_MODELS } from './data/furnitureData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Views
import { LandingPage } from './views/LandingPage';
import { Personalizador3D } from './views/Personalizador3D';
import { CatalogoPage } from './views/CatalogoPage';
import { KanbanTallerPage } from './views/KanbanTallerPage';
import { DespieceCortePage } from './views/DespieceCortePage';
import { CheckoutPage } from './views/CheckoutPage';
import { PerfilUsuarioPage } from './views/PerfilUsuarioPage';
import { AsistenteIaPage } from './views/AsistenteIaPage';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing-page');
  const [selectedModelId, setSelectedModelId] = useState<string>('horizon');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial cart with a pre-configured Horizon customizer item
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-01',
      modelName: 'Aparador Alistonado Horizon (V4.2)',
      image: FURNITURE_MODELS[0].image,
      dimensions: { width: 180, height: 85, depth: 45 },
      woodName: 'Roble Nórdico Miel',
      finishName: 'Aceite Rubio Monocoat® Puro',
      baseName: 'Patas Cónicas Macizas 150mm',
      addons: ['Blum® Soft-close', 'Pasacables CNC'],
      price: 1280,
      date: '2026-10-07'
    }
  ]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNavigate = (view: AppView, modelId?: string) => {
    if (modelId) {
      setSelectedModelId(modelId);
    }
    setCurrentView(view);
    setIsCartDrawerOpen(false);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => [newItem, ...prev]);
    showToast(`¡"${newItem.modelName}" añadido al presupuesto de fabricación!`);
    setIsCartDrawerOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-text-main font-sans selection:bg-secondary/30 selection:text-text-main">
      {/* Top Fixed Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cart={cart}
        onOpenCart={() => setIsCartDrawerOpen(true)}
      />

      {/* Main View Container (offset by navbar height 80px) */}
      <main className="flex-1 pt-20 flex flex-col">
        {currentView === 'landing-page' && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {currentView === 'personalizador-3d' && (
          <Personalizador3D
            initialModelId={selectedModelId}
            onNavigate={(v) => handleNavigate(v)}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'explorar-catalogo' && (
          <CatalogoPage onNavigate={handleNavigate} />
        )}

        {currentView === 'cola-de-produccion-pedidos' && (
          <KanbanTallerPage onNavigate={(v) => handleNavigate(v)} />
        )}

        {currentView === 'despiece-lista-de-corte' && (
          <DespieceCortePage onNavigate={handleNavigate} />
        )}

        {currentView === 'precios-cotizacion' && (
          <CheckoutPage
            cart={cart}
            onNavigate={handleNavigate}
            onClearCart={handleClearCart}
          />
        )}

        {currentView === 'perfil-de-usuario' && (
          <PerfilUsuarioPage onNavigate={handleNavigate} />
        )}

        {currentView === 'asistente-ia' && (
          <AsistenteIaPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Application Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Quick Access Pill (Desktop & Mobile) */}
      <aside aria-label="Acciones flotantes" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-surface-container-lowest/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-surface-container-high shadow-xl">
        <button
          onClick={() => handleNavigate('personalizador-3d', 'horizon')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-xs"
          title="Abrir Estudio 3D Paramétrico"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          Estudio 3D
        </button>

        <button
          onClick={() => handleNavigate('asistente-ia')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/15 text-secondary border border-secondary/30 text-xs font-bold hover:bg-secondary/25 transition-all active:scale-95"
          title="Copiloto de Carpintería IA"
        >
          <span className="material-symbols-outlined text-[16px]">smart_toy</span>
          Asistente IA
        </button>

        <button
          onClick={() => handleNavigate('cola-de-produccion-pedidos')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-text-muted hover:text-text-main text-xs font-semibold transition-all border border-surface-container-highest"
          title="Cola de Taller en Vivo"
        >
          <span className="material-symbols-outlined text-[16px]">view_kanban</span>
          Taller
        </button>

        {cart.length > 0 && (
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-text-main transition-colors border border-surface-container-highest"
            title="Ver Presupuesto"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary text-[10px] font-bold text-text-main flex items-center justify-center">
              {cart.length}
            </span>
          </button>
        )}
      </aside>

      {/* Slide-over Cart & Quote Drawer */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md bg-surface-container-lowest border-l border-surface-container-high shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
                  <div>
                    <h2 className="text-base font-bold text-text-main font-serif">
                      Presupuesto de Fabricación
                    </h2>
                    <p className="text-xs text-text-muted">
                      {cart.length} {cart.length === 1 ? 'mueble configurado' : 'muebles configurados'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Drawer Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-text-muted space-y-3">
                    <span className="material-symbols-outlined text-5xl text-surface-container-highest">
                      inventory_2
                    </span>
                    <p className="text-sm">No tienes muebles en tu orden actual.</p>
                    <button
                      onClick={() => handleNavigate('explorar-catalogo')}
                      className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90"
                    >
                      Explorar Catálogo Paramétrico
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-surface-container-high bg-surface-container-low space-y-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.modelName}
                          className="w-16 h-16 rounded-lg object-cover border border-surface-container-high shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-xs text-text-main truncate">
                            {item.modelName}
                          </h3>
                          <p className="text-[11px] text-text-muted font-mono mt-0.5">
                            {item.dimensions.width} × {item.dimensions.height} × {item.dimensions.depth} cm
                          </p>
                          <div className="text-[10px] text-primary font-semibold mt-1">
                            {item.woodName}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-text-muted hover:text-state-error p-1 self-start"
                          title="Eliminar de la orden"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>

                      <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs">
                        <span className="text-text-muted text-[11px]">{item.finishName}</span>
                        <span className="font-mono font-bold text-text-main text-sm">
                          ${item.price.toLocaleString()} USD
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-surface-container-high bg-surface-container-low space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-text-muted">
                      <span>Subtotal mecanizado:</span>
                      <span className="font-mono text-text-main">${cartTotal.toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Herrajes Blum® soft-close:</span>
                      <span className="text-state-success font-medium">Incluidos</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-text-main pt-2 border-t border-surface-container-high">
                      <span>Total estimado:</span>
                      <span className="font-mono text-primary text-base">
                        ${cartTotal.toLocaleString()} USD
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleNavigate('precios-cotizacion')}
                      className="w-full py-3 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>Tramitar Pedido & Fabricación</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        handleNavigate('despiece-lista-de-corte');
                      }}
                      className="w-full py-2.5 rounded-xl bg-surface-container text-text-main text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 border border-surface-container-highest"
                    >
                      <span className="material-symbols-outlined text-[16px]">table_rows</span>
                      Ver Despiece & G-Code Primero
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md bg-text-main text-surface px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold border border-surface-container-highest/20 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
          <span className="flex-1">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-text-muted hover:text-surface"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
