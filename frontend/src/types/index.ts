export interface Review {
  id: string;
  userName: string;
  userRank: string;
  rating: number;
  date: string;
  comment: string;
  cyberAugmentation: string;
}

export interface Product3DMesh {
  type: 'shoes' | 'clothes' | 'jackets';
  accentColor: string;
  wireframePoints: [number, number, number][];
  wireframeEdges: [number, number][];
}

export interface Product {
  id: string;
  name: string;
  subTitle: string;
  brand: string;
  shopId: string;
  category: 'shoes' | 'clothes' | 'jackets';
  floor: number;
  priceCredits: number;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: {
    material: string;
    energyCore: string;
    neuralSync: string;
    thermalRating: string;
    durability: string;
    weight: string;
  };
  meshData: Product3DMesh;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  hologramColor: string;
  reviews: Review[];
}

export interface Shop {
  id: string;
  name: string;
  tagline: string;
  category: 'shoes' | 'clothes' | 'jackets' | 'multi';
  floor: number;
  deckName: string;
  curator: string;
  description: string;
  accentColor: string;
  bannerImage: string;
  hologramIcon: string;
  rating: number;
  productCount: number;
  foundedYear: number;
  boutiqueFeatures: string[];
}

export interface MallFloor {
  floor: number;
  name: string;
  theme: string;
  description: string;
  shopsCount: number;
}

export interface MallInfo {
  name: string;
  tagline: string;
  location: string;
  currentYear: number;
  floors: MallFloor[];
  telemetry: {
    atmosphericPurity: number;
    quantumGridStability: number;
    orbitalGravity: string;
    activeShoppers: number;
    quantumBandwidth: string;
    teleportDockStatus: string;
    lastSyncTimestamp?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColorMode: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  category: 'shoes' | 'clothes' | 'jackets';
  priceCredits: number;
  quantity: number;
  selectedSize: string;
  selectedColorMode: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  subtotalCredits: number;
  taxCredits: number;
  totalCredits: number;
  totalUSD: number;
  status: 'Teleport Scheduled' | 'Quantum In Transit' | 'Teleported & Delivered' | 'Beam Locked';
  deliveryMode: 'Quantum Teleportation Pod' | 'Orbital Hypersonic Drone' | 'VIP Spire Courier';
  recipientName: string;
  teleportCoordinates: string;
  quantumTransactionHash: string;
  securityStamp: string;
}
