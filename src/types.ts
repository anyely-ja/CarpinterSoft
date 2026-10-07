export type AppView =
  | 'landing-page'
  | 'personalizador-3d'
  | 'explorar-catalogo'
  | 'cola-de-produccion-pedidos'
  | 'despiece-lista-de-corte'
  | 'precios-cotizacion'
  | 'perfil-de-usuario'
  | 'asistente-ia';

export interface WoodOption {
  id: string;
  name: string;
  subtitle: string;
  colorHex: string;
  textureUrl?: string;
  extraPrice: number;
  origin: string;
  hardness: string;
}

export interface FurnitureModel {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  badge?: string;
  badgeSecondary?: string;
  description: string;
  baseWidth: number;
  baseHeight: number;
  baseDepth: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  minDepth: number;
  maxDepth: number;
  basePrice: number;
  currency: string;
  deliveryDays: number;
  image: string;
  woodOptions: string[];
  features: string[];
  dimensionsLabel: string;
  productionNote: string;
  capacityOrUse?: string;
}

export interface CustomizerState {
  modelId: string;
  width: number;
  height: number;
  depth: number;
  modules: number;
  woodId: string;
  finishType: 'rubio' | 'barniz';
  baseType: 'conicas' | 'zocalo' | 'flotante';
  hasLed: boolean;
  hasCableGrommet: boolean;
  doorsOpen: boolean;
  wireframe: boolean;
  autoRotate: boolean;
  cameraView: 'persp' | 'front' | 'top';
  lighting: 'nordic' | 'warm' | 'gallery';
  zoom: number;
}

export interface CutPart {
  id: string;
  label: string;
  sublabel: string;
  material: string;
  materialBadge: string;
  materialColor: string;
  quantity: number;
  length: number;
  width: number;
  thickness: number;
  grain: 'longitudinal' | 'vertical' | 'continuous' | 'turned' | 'none';
  edges: string;
  cncOperation: string;
  cncType: 'bevel' | 'drill' | 'groove' | 'fluted' | 'straight' | 'turned';
  isCritical?: boolean;
}

export interface KanbanOrder {
  id: string;
  orderNumber: string;
  client: string;
  project: string;
  productName: string;
  dimensions: string;
  woodName: string;
  woodColor: string;
  pieceCount: number;
  columnId: 'dxf' | 'cnc' | 'edges' | 'assembly' | 'finish' | 'packaging';
  statusBadge: string;
  statusBadgeClass: string;
  deliveryDate: string;
  progressPercent?: number;
  machine?: string;
  operator?: string;
  remainingTime?: string;
  thumbnail: string;
  alert?: string;
  urgency: 'normal' | 'soon' | 'urgent';
}

export interface CartItem {
  id: string;
  modelName: string;
  image: string;
  dimensions: { width: number; height: number; depth: number };
  woodName: string;
  finishName: string;
  baseName: string;
  addons: string[];
  price: number;
  date: string;
}
