import React, { useState } from 'react';
import { AppView, CartItem } from '../types';
import { FURNITURE_MODELS } from '../data/furnitureData';

interface CheckoutPageProps {
  cart: CartItem[];
  onNavigate: (view: AppView, modelId?: string) => void;
  onClearCart?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onNavigate, onClearCart }) => {
  // Step state (1: Envío, 2: Montaje, 3: Pago)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [deliveryType, setDeliveryType] = useState<'white-glove' | 'curbside' | 'pickup'>('white-glove');
  const [paymentMethod, setPaymentMethod] = useState<'split' | 'card' | 'transfer' | 'bizum'>('split');
  const [couponCode, setCouponCode] = useState<string>('ARQUITECTO2026');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState<string>('');

  // Form inputs
  const [formData, setFormData] = useState({
    fullName: 'Elena Morales Valdés',
    company: 'Estudio de Interiorismo EMV',
    taxId: 'B-88392104',
    email: 'elena.morales@estudioemv.com',
    phone: '+34 612 345 678',
    address: 'Calle Serrano 45, 3º Dcha',
    city: 'Madrid',
    postalCode: '28001',
    hasElevator: true,
    elevatorFitsPieces: true,
    floorNumber: '3',
    accessNotes: 'Calle peatonal con horario de carga y descarga de 8:00 a 11:00 am. Portal amplio sin escalones de acceso.'
  });

  // Calculate pricing based on cart or default Horizon item
  const defaultItem = {
    id: 'default-horizon',
    modelName: 'Aparador Alistonado Horizon',
    image: FURNITURE_MODELS[0].image,
    dimensions: { width: 180, height: 85, depth: 45 },
    woodName: 'Roble Nórdico Miel',
    finishName: 'Aceite Rubio Monocoat® Puro 0% COV',
    baseName: 'Patas Cónicas Macizas 150mm',
    addons: ['Herrajes Blum® Soft-close', 'Pasacables oculto CNC', 'Garantía 10 años'],
    price: 1280,
    date: '2026-10-07'
  };

  const activeItems = cart.length > 0 ? cart : [defaultItem];
  const itemsTotal = activeItems.reduce((acc, item) => acc + item.price, 0);

  const deliveryCost = deliveryType === 'white-glove' ? 180 : deliveryType === 'curbside' ? 0 : -60;
  const discount = couponApplied ? 65 : 0;
  const subtotalBeforeTax = Math.max(0, itemsTotal + deliveryCost - discount);
  const tax = Math.round(subtotalBeforeTax * 0.21);
  const finalTotal = subtotalBeforeTax + tax;
  const splitDeposit = Math.round(finalTotal / 2);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'ARQUITECTO2026' || couponCode.trim().toUpperCase() === 'MADERA10') {
      setCouponApplied(true);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const orderNum = `ORD-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedOrderNumber(orderNum);
      setIsSubmitting(false);
      setOrderCompleted(true);
      if (onClearCart) onClearCart();
    }, 1200);
  };

  return (
    <div className="min-w-0 flex-1 bg-surface py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
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
              onClick={() => onNavigate('explorar-catalogo')}
              className="hover:text-primary transition-colors hover:underline"
            >
              Catálogo
            </button>
            <span>/</span>
            <span className="text-primary font-bold">Presupuesto & Orden de Taller</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="material-symbols-outlined text-state-success text-[16px]">lock</span>
            Conexión Segura SSL 256-Bit • Taller Certificado
          </div>
        </div>

        {/* 4-Step Progress Header */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, title: '1. Parámetros & 3D', desc: 'Medidas y Madera', done: true },
              { step: 2, title: '2. Entrega & Obra', desc: 'Acceso y Dirección', active: currentStep === 1 },
              { step: 3, title: '3. Servicio Montaje', desc: 'Guante Blanco', active: currentStep === 2 },
              { step: 4, title: '4. Pago & Fabricación', desc: 'Anticipo 50%', active: currentStep === 3 }
            ].map((s) => (
              <div
                key={s.step}
                onClick={() => s.step > 1 && setCurrentStep(s.step - 1)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  s.done
                    ? 'border-state-success/40 bg-state-success/5'
                    : s.active
                    ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                    : 'border-surface-container-high bg-surface-container-low opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={s.done ? 'text-state-success' : s.active ? 'text-primary' : 'text-text-muted'}>
                    {s.title}
                  </span>
                  {s.done && <span className="material-symbols-outlined text-state-success text-[16px]">check_circle</span>}
                </div>
                <div className="text-[11px] text-text-muted mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content: Left Form & Right Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: STEPS (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: DATOS DE ENVÍO Y AUDITORÍA DE ACCESIBILIDAD */}
            {currentStep === 1 && (
              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-high shadow-xs space-y-6 animate-in fade-in">
                <div className="border-b border-surface-container-high pb-4">
                  <h2 className="text-xl font-bold font-serif text-text-main flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                    Datos del Cliente y Dirección de Entrega
                  </h2>
                  <p className="text-xs text-text-muted mt-1">
                    Necesitamos estos datos para coordinar el camión de reparto y la validación de entrada con el taller.
                  </p>
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1">Nombre Completo / Titular *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1">Estudio / Empresa (Opcional)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1">NIF / CIF para Factura *</label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1">Teléfono Móvil (Avisos WhatsApp) *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-text-main mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-text-main mb-1">Dirección Completa *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1">Ciudad *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>
                </div>

                {/* Accessibility Audit for High-end furniture */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-text-main">
                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                    Auditoría de Accesibilidad a Vivienda
                  </div>
                  <p className="text-[11px] text-text-muted">
                    El aparador mide 180cm y se entrega con el casco principal preensamblado. Por favor indícanos las condiciones del edificio.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label className="flex items-center gap-2 text-xs text-text-main cursor-pointer">
                      <input
                        type="checkbox"
                        name="hasElevator"
                        checked={formData.hasElevator}
                        onChange={handleFormChange}
                        className="rounded-xs text-primary focus:ring-primary"
                      />
                      <span>¿El edificio tiene ascensor?</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-text-main cursor-pointer">
                      <input
                        type="checkbox"
                        name="elevatorFitsPieces"
                        checked={formData.elevatorFitsPieces}
                        onChange={handleFormChange}
                        className="rounded-xs text-primary focus:ring-primary"
                      />
                      <span>¿Cabe una caja de 185×90 cm?</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-text-muted mb-1">Notas de Acceso o Calle Peatonal</label>
                    <textarea
                      name="accessNotes"
                      rows={2}
                      value={formData.accessNotes}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 rounded-lg border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:bg-primary/90 transition-all active:scale-95"
                  >
                    Continuar a Servicio de Entrega & Montaje
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SELECCIÓN DEL SERVICIO DE MONTAJE Y ENTREGA */}
            {currentStep === 2 && (
              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-high shadow-xs space-y-6 animate-in fade-in">
                <div className="border-b border-surface-container-high pb-4">
                  <h2 className="text-xl font-bold font-serif text-text-main flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">handyman</span>
                    Modalidad de Entrega y Nivel de Servicio
                  </h2>
                  <p className="text-xs text-text-muted mt-1">
                    Selecciona cómo deseas recibir tu mueble artesanal fabricado a medida.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Option 1: White Glove */}
                  <div
                    onClick={() => setDeliveryType('white-glove')}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                      deliveryType === 'white-glove'
                        ? 'border-primary bg-primary/5 shadow-xs'
                        : 'border-surface-container-high hover:border-surface-container-highest'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3.5">
                        <span className={`w-5 h-5 rounded-full mt-0.5 border-2 flex items-center justify-center ${
                          deliveryType === 'white-glove' ? 'border-primary' : 'border-text-muted'
                        }`}>
                          {deliveryType === 'white-glove' && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-text-main text-sm">
                              Entrega Guante Blanco + Montaje Especializado en Domicilio
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary/15 text-secondary">
                              RECOMENDADO
                            </span>
                          </div>
                          <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                            Dos montadores ebanistas propios suben las piezas al salón o estancia elegida, nivelan las patas, ajustan las bisagras Blum con micrómetro, aplican la cera de protección final y se llevan todos los embalajes reciclables.
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-text-muted">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-state-success">check</span>
                              Subida a cualquier planta
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-state-success">check</span>
                              Calibrado de puertas
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-state-success">check</span>
                              Limpieza y retirada residuos
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap pl-3">
                        <span className="text-base font-bold font-mono text-primary">+180 USD</span>
                        <div className="text-[10px] text-text-muted">Incluye seguro todo riesgo</div>
                      </div>
                    </div>
                  </div>

                  {/* Option 2: Curbside */}
                  <div
                    onClick={() => setDeliveryType('curbside')}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                      deliveryType === 'curbside'
                        ? 'border-primary bg-primary/5 shadow-xs'
                        : 'border-surface-container-high hover:border-surface-container-highest'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3.5">
                        <span className={`w-5 h-5 rounded-full mt-0.5 border-2 flex items-center justify-center ${
                          deliveryType === 'curbside' ? 'border-primary' : 'border-text-muted'
                        }`}>
                          {deliveryType === 'curbside' && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </span>
                        <div>
                          <h3 className="font-bold text-text-main text-sm">Entrega Estándar a Pie de Calle</h3>
                          <p className="text-xs text-text-muted mt-1.5">
                            Transportista especializado deja el palé protegido con cantoneras de madera en la puerta del portal o nave. El cliente se encarga de la subida y ensamble final.
                          </p>
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap pl-3">
                        <span className="text-sm font-bold font-mono text-state-success">GRATIS</span>
                        <div className="text-[10px] text-text-muted">0 USD</div>
                      </div>
                    </div>
                  </div>

                  {/* Option 3: Factory Pickup */}
                  <div
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                      deliveryType === 'pickup'
                        ? 'border-primary bg-primary/5 shadow-xs'
                        : 'border-surface-container-high hover:border-surface-container-highest'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3.5">
                        <span className={`w-5 h-5 rounded-full mt-0.5 border-2 flex items-center justify-center ${
                          deliveryType === 'pickup' ? 'border-primary' : 'border-text-muted'
                        }`}>
                          {deliveryType === 'pickup' && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </span>
                        <div>
                          <h3 className="font-bold text-text-main text-sm">Recogida Directa en Planta / Taller CNC</h3>
                          <p className="text-xs text-text-muted mt-1.5">
                            Te ayudamos a cargarlo en tu furgoneta en nuestras instalaciones de mecanizado. Descuento adicional del taller.
                          </p>
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap pl-3">
                        <span className="text-sm font-bold font-mono text-state-success">-60 USD</span>
                        <div className="text-[10px] text-text-muted">Descuento aplicado</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Atrás
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:bg-primary/90 transition-all active:scale-95"
                  >
                    Continuar al Método de Pago
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MÉTODOS DE PAGO Y CONDICIONES DE TALLER */}
            {currentStep === 3 && (
              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-high shadow-xs space-y-6 animate-in fade-in">
                <div className="border-b border-surface-container-high pb-4">
                  <h2 className="text-xl font-bold font-serif text-text-main flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                    Condiciones de Pago & Reserva de Fabricación
                  </h2>
                  <p className="text-xs text-text-muted mt-1">
                    Para pedidos a medida fabricados en taller bajo demanda, puedes abonar el anticipo del 50% y el resto a la entrega.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Split payment */}
                  <div
                    onClick={() => setPaymentMethod('split')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'split' ? 'border-primary bg-primary/5' : 'border-surface-container-high'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className={`w-4 h-4 rounded-full mt-0.5 border-2 flex items-center justify-center ${
                          paymentMethod === 'split' ? 'border-primary' : 'border-text-muted'
                        }`}>
                          {paymentMethod === 'split' && <span className="w-2 h-2 rounded-full bg-primary" />}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-text-main text-xs">
                              Anticipo 50% Ahora (${splitDeposit} USD) + 50% a la Instalación Final
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary/10 text-primary">
                              POPULAR
                            </span>
                          </div>
                          <p className="text-[11px] text-text-muted mt-1">
                            El 50% restante se liquida únicamente tras verificar el mueble instalado en tu vivienda y firmar el acta de conformidad.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-surface-container-high'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className={`w-4 h-4 rounded-full mt-0.5 border-2 flex items-center justify-center ${
                          paymentMethod === 'card' ? 'border-primary' : 'border-text-muted'
                        }`}>
                          {paymentMethod === 'card' && <span className="w-2 h-2 rounded-full bg-primary" />}
                        </span>
                        <div>
                          <span className="font-bold text-text-main text-xs">Tarjeta Bancaria Segura (Stripe 100%)</span>
                          <p className="text-[11px] text-text-muted mt-0.5">
                            Visa, MasterCard, American Express con autenticación biométrica 3D Secure 2.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted">
                        <span className="material-symbols-outlined text-[18px]">credit_card</span>
                      </div>
                    </div>
                  </div>

                  {/* Transfer */}
                  <div
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'transfer' ? 'border-primary bg-primary/5' : 'border-surface-container-high'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className={`w-4 h-4 rounded-full mt-0.5 border-2 flex items-center justify-center ${
                          paymentMethod === 'transfer' ? 'border-primary' : 'border-text-muted'
                        }`}>
                          {paymentMethod === 'transfer' && <span className="w-2 h-2 rounded-full bg-primary" />}
                        </span>
                        <div>
                          <span className="font-bold text-text-main text-xs">Transferencia Bancaria con Factura Proforma</span>
                          <p className="text-[11px] text-text-muted mt-0.5">
                            Te enviamos la proforma oficial con IBAN bancario español para tramitación administrativa.
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-text-muted">account_balance</span>
                    </div>
                  </div>

                  {/* Bizum */}
                  <div
                    onClick={() => setPaymentMethod('bizum')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'bizum' ? 'border-primary bg-primary/5' : 'border-surface-container-high'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className={`w-4 h-4 rounded-full mt-0.5 border-2 flex items-center justify-center ${
                          paymentMethod === 'bizum' ? 'border-primary' : 'border-text-muted'
                        }`}>
                          {paymentMethod === 'bizum' && <span className="w-2 h-2 rounded-full bg-primary" />}
                        </span>
                        <div>
                          <span className="font-bold text-text-main text-xs">Bizum Instantáneo</span>
                          <p className="text-[11px] text-text-muted mt-0.5">
                            Pago rápido y sin comisiones desde tu app bancaria habitual.
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-text-muted">phone_iphone</span>
                    </div>
                  </div>
                </div>

                {/* Final Confirmation Button */}
                <div className="pt-4 border-t border-surface-container-high flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Atrás
                  </button>

                  <button
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-secondary hover:bg-secondary/90 text-text-main font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                        Generando Orden en Taller...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        Confirmar Pedido & Lanzar a Cola ({paymentMethod === 'split' ? `$${splitDeposit} USD` : `$${finalTotal} USD`})
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: TRANSPARENT COST BREAKDOWN & REAL-TIME CART (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-5 sticky top-20">
              
              <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
                <h3 className="font-bold text-text-main text-base font-serif">
                  Resumen de Fabricación
                </h3>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-primary/10 text-primary">
                  {activeItems.length} {activeItems.length === 1 ? 'Mueble' : 'Muebles'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {activeItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
                    <img
                      src={item.image}
                      alt={item.modelName}
                      className="w-20 h-20 rounded-lg object-cover border border-surface-container-high shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-text-main truncate">{item.modelName}</h4>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        {item.dimensions.width} × {item.dimensions.height} × {item.dimensions.depth} cm
                      </p>
                      <div className="text-[10px] text-primary font-semibold mt-1">
                        {item.woodName} • {item.finishName}
                      </div>
                      <div className="text-xs font-bold font-mono text-text-main mt-1.5">
                        ${item.price.toLocaleString()} USD
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cupón (ej. ARQUITECTO2026)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main uppercase font-mono focus:outline-hidden focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-surface-container text-text-main text-xs font-bold hover:bg-surface-container-high border border-surface-container-highest transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {couponApplied && (
                  <div className="text-[11px] text-state-success font-medium mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    Cupón ARQUITECTO2026 aplicado (-$65 USD)
                  </div>
                )}
              </form>

              {/* Detailed Cost Breakdown Table */}
              <div className="border-t border-surface-container-high pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-text-muted">
                  <span>Madera seleccionada FSC®:</span>
                  <span className="font-mono text-text-main">$590 USD</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Corte y Fresado CNC 5 ejes:</span>
                  <span className="font-mono text-text-main">$340 USD</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Herrajes Blum® Soft-close integrados:</span>
                  <span className="font-mono text-text-main">$160 USD</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Acabado al aceite Rubio Monocoat®:</span>
                  <span className="font-mono text-text-main">$190 USD</span>
                </div>

                <div className="border-t border-surface-container-high pt-2 flex justify-between text-text-muted">
                  <span>Subtotal Casco y Mecanizado:</span>
                  <span className="font-mono text-text-main">${itemsTotal} USD</span>
                </div>

                <div className="flex justify-between text-text-muted">
                  <span>Servicio de Entrega:</span>
                  <span className="font-mono text-text-main">
                    {deliveryCost > 0 ? `+$${deliveryCost} USD` : deliveryCost < 0 ? `-$${Math.abs(deliveryCost)} USD` : 'GRATIS'}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-state-success font-medium">
                    <span>Descuento Arquitecto Colegiado:</span>
                    <span className="font-mono">-${discount} USD</span>
                  </div>
                )}

                <div className="flex justify-between text-text-muted">
                  <span>I.V.A. (21%):</span>
                  <span className="font-mono text-text-main">${tax} USD</span>
                </div>

                <div className="border-t-2 border-surface-container-high pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-text-main">Total Presupuestado:</span>
                    <div className="text-[10px] text-text-muted">Impuestos e instalación incluidos</div>
                  </div>
                  <span className="text-2xl font-bold font-mono text-primary">
                    ${finalTotal.toLocaleString()} <span className="text-xs text-text-muted font-sans">USD</span>
                  </span>
                </div>

                {paymentMethod === 'split' && (
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs">
                    <div className="flex justify-between font-bold text-primary">
                      <span>Anticipo Hoy para Iniciar:</span>
                      <span className="font-mono">${splitDeposit} USD</span>
                    </div>
                    <div className="flex justify-between text-text-muted text-[11px] mt-0.5">
                      <span>Restante tras Instalación y Conforme:</span>
                      <span className="font-mono">${finalTotal - splitDeposit} USD</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quality & Trust Seals */}
              <div className="border-t border-surface-container-high pt-4 grid grid-cols-2 gap-3 text-[11px] text-text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-state-success">verified_user</span>
                  10 años de garantía
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">forest</span>
                  Madera 100% FSC®
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
                  Planos DXF auditados
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-text-main">inventory</span>
                  Embalaje eco sin plástico
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ORDER SUCCESS MODAL */}
        {orderCompleted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-8 border border-surface-container-high shadow-2xl text-center space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-state-success/15 text-state-success flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-state-success/10 text-state-success border border-state-success/20">
                  ¡Pedido Lanzado a Producción!
                </span>
                <h3 className="text-2xl font-bold font-serif text-text-main">
                  Fabricación Iniciada con Éxito
                </h3>
                <p className="text-xs text-text-muted max-w-md mx-auto">
                  Hemos enviado los archivos DXF y la orden de corte al centro de mecanizado. Tu código de seguimiento oficial es:
                </p>
                <div className="inline-block py-2 px-4 rounded-xl bg-surface-container font-mono text-base font-bold text-primary border border-surface-container-highest">
                  {generatedOrderNumber}
                </div>
              </div>

              <div className="bg-surface-container-low p-4 rounded-2xl text-left text-xs space-y-2 border border-surface-container-high">
                <div className="flex justify-between">
                  <span className="text-text-muted">Titular:</span>
                  <span className="font-semibold text-text-main">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Fecha estimada de entrega:</span>
                  <span className="font-semibold text-text-main">24 de Octubre de 2026 (18 días)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Servicio contratado:</span>
                  <span className="font-semibold text-text-main">
                    {deliveryType === 'white-glove' ? 'Guante Blanco con Montaje' : 'Entrega Estándar'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setOrderCompleted(false);
                    onNavigate('cola-de-produccion-pedidos');
                  }}
                  className="py-3 px-4 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">view_kanban</span>
                  Rastrear en Cola de Taller
                </button>
                <button
                  onClick={() => {
                    setOrderCompleted(false);
                    onNavigate('perfil-de-usuario');
                  }}
                  className="py-3 px-4 rounded-xl bg-surface-container text-text-main text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 border border-surface-container-highest"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Ir a Mi Perfil
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
