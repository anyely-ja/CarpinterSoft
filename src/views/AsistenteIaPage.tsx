import React, { useState } from 'react';
import { AppView } from '../types';
import { FURNITURE_MODELS, WOOD_OPTIONS } from '../data/furnitureData';

interface AsistenteIaPageProps {
  onNavigate: (view: AppView, modelId?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  recommendedModelId?: string;
  recommendedSpecs?: { width: number; height: number; depth: number; wood: string };
}

export const AsistenteIaPage: React.FC<AsistenteIaPageProps> = ({ onNavigate }) => {
  // Room Advisor State
  const [wallWidth, setWallWidth] = useState<number>(340);
  const [ceilingHeight, setCeilingHeight] = useState<number>(260);
  const [roomType, setRoomType] = useState<string>('salon');
  const [interiorStyle, setInteriorStyle] = useState<string>('nordico');
  const [woodPref, setWoodPref] = useState<string>('roble');
  const [generatedRecommendation, setGeneratedRecommendation] = useState<{
    modelId: string;
    modelName: string;
    width: number;
    height: number;
    depth: number;
    woodName: string;
    reasoning: string;
    price: number;
    image: string;
  } | null>({
    modelId: 'horizon',
    modelName: 'Aparador Alistonado Horizon',
    width: 210,
    height: 85,
    depth: 45,
    woodName: 'Roble Nórdico Miel',
    reasoning: 'Para una pared de 340 cm, recomendamos una longitud de 210 cm para respetar la regla áurea arquitectónica (62% de ocupación visual), dejando 65 cm libres a cada lado para respiración espacial y entrada de luz.',
    price: 1390,
    image: FURNITURE_MODELS[0].image
  });

  // Chat State
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: '¡Hola! Soy tu Copiloto Técnico de Carpintería y Diseño Paramétrico. Puedo ayudarte a dimensionar tus muebles según el espacio de tu vivienda, elegir la madera adecuada o resolver dudas sobre resistencia estructural y herrajes.',
      timestamp: '11:35'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'Tengo suelo radiante en casa, ¿es mejor roble macizo o rechapado sobre tablero técnico?',
      timestamp: '11:36'
    },
    {
      id: 'msg-3',
      sender: 'ai',
      text: 'Con suelo radiante, la mejor combinación constructiva es el casco en tablero rechapado con alma de MDF o contrachapado fenólico (extrema estabilidad dimensional, 0% dilatación por choque térmico) y el frontal o puertas en roble alistonado macizo con holgura de 2 mm. Además, te recomendamos patas cónicas de 15 cm en lugar de zócalo cerrado para permitir la convección del calor.',
      timestamp: '11:36',
      recommendedModelId: 'horizon'
    }
  ]);

  const quickQuestions = [
    '¿Cuánto peso aguanta una balda de 19mm?',
    '¿Qué ventaja tiene el acabado al aceite Rubio Monocoat®?',
    '¿Cómo libro el rodapié para que el mueble quede pegado a la pared?',
    'Quiero una mesa para 8 comensales, ¿qué largo necesito?'
  ];

  const handleGenerateAdvisor = () => {
    // Algorithmic calculation based on wall dimensions
    let recModel = FURNITURE_MODELS[0];
    let recWidth = Math.round(wallWidth * 0.62);
    let recHeight = 85;
    let recDepth = 45;
    let recPrice = 1280;

    if (roomType === 'comedor') {
      recModel = FURNITURE_MODELS[1];
      recWidth = Math.min(240, Math.max(160, Math.round(wallWidth * 0.7)));
      recHeight = 75;
      recDepth = 95;
      recPrice = 1580;
    } else if (roomType === 'estudio' || roomType === 'biblioteca') {
      recModel = FURNITURE_MODELS[2];
      recWidth = Math.min(260, Math.max(160, Math.round(wallWidth * 0.8)));
      recHeight = Math.min(240, ceilingHeight - 30);
      recDepth = 38;
      recPrice = 2100;
    }

    const selectedWoodObj = WOOD_OPTIONS.find(w => w.id === woodPref) || WOOD_OPTIONS[0];

    setGeneratedRecommendation({
      modelId: recModel.id,
      modelName: recModel.name,
      width: recWidth,
      height: recHeight,
      depth: recDepth,
      woodName: selectedWoodObj.name,
      reasoning: `Para una pared de ${wallWidth} cm y techo a ${ceilingHeight} cm en estilo ${interiorStyle}, la proporción óptima es un ancho de ${recWidth} cm. Esto evita el abarrotamiento visual y garantiza un paso ergonómico mínimo de 90 cm.`,
      price: recPrice + selectedWoodObj.extraPrice,
      image: recModel.image
    });
  };

  const handleSendMessage = (textToSend?: string) => {
    const q = (textToSend || chatInput).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    // Simulated expert carpenter intelligence response
    setTimeout(() => {
      let aiResponse = 'Esa es una excelente pregunta técnica. ';
      let recModel: string | undefined = undefined;

      const lower = q.toLowerCase();
      if (lower.includes('peso') || lower.includes('balda')) {
        aiResponse = 'En tableros de 19 mm de espesor con vanos de hasta 80 cm de luz libre, la carga uniforme máxima recomendada es de 28 kg sin deflexión apreciable (según ensayo UNE-EN 14072). Si vas a colocar enciclopedias o vajilla pesada continua, en el personalizador 3D puedes activar el refuerzo de listón inferior de roble macizo.';
        recModel = 'nexus';
      } else if (lower.includes('aceite') || lower.includes('rubio') || lower.includes('acabado')) {
        aiResponse = 'El aceite Rubio Monocoat® Oil Plus 2C realiza un enlace molecular con las fibras de celulosa de la madera. Al no crear una película plástica superficial como los barnices sintéticos, preserva el tacto natural de la veta, es 100% libre de COV (cero químicos tóxicos en el hogar) y ante un arañazo se puede reparar puntualmente con una esponja abrasiva sin tener que lijar todo el mueble.';
      } else if (lower.includes('rodapié') || lower.includes('zócalo') || lower.includes('pared')) {
        aiResponse = 'Todos nuestros muebles mecanizados por CNC integran un retranqueo posterior estándar de 15 mm de fondo y 100 mm de altura en los costados. Esto permite que el mueble apoye totalmente enrasado contra la pared salvando cualquier rodapié estándar sin necesidad de cortar el zócalo de la vivienda.';
      } else if (lower.includes('mesa') || lower.includes('comensales') || lower.includes('8')) {
        aiResponse = 'Para albergar a 8 comensales cómodamente (3 por cada lateral y 2 en cabeceras), el largo óptimo es de 220 cm con 95 cm de fondo. Si quieres que los 8 se sienten solo en los costados (4 por lado), requerirás 260 cm de largo.';
        recModel = 'fusion-table';
      } else {
        aiResponse = `Entendido tu planteamiento sobre "${q}". En carpintería paramétrica de precisión podemos adaptar cada detalle: tolerancias milimétricas en fresado CNC, herrajes Blum con freno silencioso y escuadrado garantizado. Puedes abrir cualquiera de nuestros modelos en el Visor 3D para modificar las cotas en tiempo real.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedModelId: recModel
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="min-w-0 flex-1 bg-surface py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
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
              Herramientas
            </button>
            <span>/</span>
            <span className="text-primary font-bold">Asistente IA de Carpintería & Decoración</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-state-success animate-ping" />
            <span className="text-xs text-text-muted font-mono">Modelo Paramétrico V4.2 Activo</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-container-high shadow-xs">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/15 text-secondary border border-secondary/30 mb-3">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              IA Generativa para Arquitectura Interior
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-text-main">
              Copiloto de Carpintería & Dimensionamiento Espacial
            </h1>
            <p className="text-sm text-text-muted mt-2 leading-relaxed">
              Calcula las medidas exactas de tu mueble a partir de las dimensiones de tu estancia, optimiza el aprovechamiento del espacio sin recargar y resuelve especificaciones técnicas de maderas y herrajes antes de fabricar.
            </p>
          </div>
        </div>

        {/* Two Columns: Left Space Analyzer & Right AI Technical Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: SPACE ADVISOR & PARAMETRIC GENERATOR (6 COLS) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-5">
              <h2 className="text-lg font-bold font-serif text-text-main flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">aspect_ratio</span>
                Asesor Paramétrico de Pared y Estancia
              </h2>
              <p className="text-xs text-text-muted">
                Introduce las cotas de tu salón o estancia para calcular las dimensiones ideales con proporción arquitectónica.
              </p>

              {/* Input Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1.5 flex justify-between">
                      <span>Ancho de Pared Libre</span>
                      <span className="font-mono text-primary font-bold">{wallWidth} cm</span>
                    </label>
                    <input
                      type="range"
                      min="150"
                      max="600"
                      step="10"
                      value={wallWidth}
                      onChange={(e) => setWallWidth(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1.5 flex justify-between">
                      <span>Altura de Techo</span>
                      <span className="font-mono text-primary font-bold">{ceilingHeight} cm</span>
                    </label>
                    <input
                      type="range"
                      min="220"
                      max="350"
                      step="5"
                      value={ceilingHeight}
                      onChange={(e) => setCeilingHeight(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1">Estancia</label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main"
                    >
                      <option value="salon">Salón / Sala de Estar</option>
                      <option value="comedor">Comedor Principal</option>
                      <option value="estudio">Despacho / Estudio</option>
                      <option value="recibidor">Hall / Recibidor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1">Estilo Interior</label>
                    <select
                      value={interiorStyle}
                      onChange={(e) => setInteriorStyle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main"
                    >
                      <option value="nordico">Nórdico Cálido</option>
                      <option value="japandi">Japandi Minimalista</option>
                      <option value="industrial">Industrial Sofisticado</option>
                      <option value="clasico">Contemporáneo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-main mb-1">Madera Predilecta</label>
                    <select
                      value={woodPref}
                      onChange={(e) => setWoodPref(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main"
                    >
                      {WOOD_OPTIONS.map((w) => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerateAdvisor}
                  className="w-full py-3 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                  Calcular Configuración Paramétrica Óptima
                </button>
              </div>

              {/* Recommendation Card */}
              {generatedRecommendation && (
                <div className="mt-4 p-5 rounded-2xl bg-surface-container-low border border-primary/30 space-y-4 animate-in fade-in">
                  <div className="flex gap-4">
                    <img
                      src={generatedRecommendation.image}
                      alt={generatedRecommendation.modelName}
                      className="w-24 h-24 rounded-xl object-cover border border-surface-container-high shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                        Propuesta Generada
                      </span>
                      <h4 className="font-bold text-sm text-text-main mt-0.5">
                        {generatedRecommendation.modelName}
                      </h4>
                      <div className="text-xs font-mono font-bold text-primary mt-1">
                        {generatedRecommendation.width} × {generatedRecommendation.height} × {generatedRecommendation.depth} cm
                      </div>
                      <div className="text-[11px] text-text-muted mt-0.5">
                        {generatedRecommendation.woodName} • ${generatedRecommendation.price} USD
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-text-main leading-relaxed bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high">
                    {generatedRecommendation.reasoning}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('personalizador-3d', generatedRecommendation.modelId)}
                      className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                      Cargar en Estudio 3D
                    </button>
                    <button
                      onClick={() => onNavigate('despiece-lista-de-corte')}
                      className="py-2.5 px-4 rounded-xl bg-surface-container text-text-main text-xs font-semibold hover:bg-surface-container-high border border-surface-container-highest transition-colors"
                    >
                      Ver Planos
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: TECHNICAL WORKSHOP CHAT (6 COLS) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-high shadow-xs flex flex-col h-[650px] overflow-hidden">
              
              {/* Chat Header */}
              <div className="p-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-serif font-bold text-lg">
                    C
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main text-xs">Maestro Ebanista Digital</h3>
                    <div className="text-[10px] text-state-success flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-state-success"></span>
                      Especialista en mecanizado CNC & normativas UNE
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-text-muted">Carpintersoft AI</span>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-primary text-on-primary rounded-br-xs'
                          : 'bg-surface-container text-text-main rounded-bl-xs border border-surface-container-high'
                      }`}
                    >
                      {m.text}
                      {m.recommendedModelId && (
                        <div className="mt-3 pt-2 border-t border-text-muted/20">
                          <button
                            onClick={() => onNavigate('personalizador-3d', m.recommendedModelId)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary text-[11px] font-bold shadow-xs hover:underline"
                          >
                            <span className="material-symbols-outlined text-[14px]">tune</span>
                            Abrir modelo recomendado en 3D
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-text-muted mt-1 px-1 font-mono">
                      {m.timestamp}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Questions Pills */}
              <div className="p-3 bg-surface-container-low border-t border-surface-container-high overflow-x-auto whitespace-nowrap space-x-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="inline-block px-3 py-1.5 rounded-lg bg-surface-container-lowest text-text-main text-[11px] font-medium border border-surface-container-highest hover:bg-surface-container transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-surface-container-high bg-surface-container-lowest">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Escribe tu consulta sobre maderas, tolerancias o herrajes..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-surface-container-highest bg-surface-container-lowest text-xs text-text-main focus:outline-hidden focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
