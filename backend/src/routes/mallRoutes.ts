import { Router, Request, Response } from 'express';
import {
  INITIAL_MALL_INFO,
  INITIAL_SHOPS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  Product,
  Order,
  Review
} from '../data/mallData';

const router = Router();

// In-memory reactive stores
let mallInfo = { ...INITIAL_MALL_INFO };
let shops = [...INITIAL_SHOPS];
let products = [...INITIAL_PRODUCTS];
let orders = [...INITIAL_ORDERS];

// Helper to jitter telemetry for live feel
const getLiveTelemetry = () => {
  const visitorDelta = Math.floor(Math.sin(Date.now() / 15000) * 80) + Math.floor(Math.random() * 20);
  const stabilityDelta = (Math.sin(Date.now() / 30000) * 0.05);
  return {
    ...mallInfo.telemetry,
    activeShoppers: 18450 + visitorDelta,
    quantumGridStability: Number((99.94 + stabilityDelta).toFixed(3)),
    atmosphericPurity: Number((99.98 - (Math.random() * 0.02)).toFixed(3)),
    lastSyncTimestamp: new Date().toISOString()
  };
};

// 1. Get Mall Info & Telemetry
router.get('/mall/info', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      ...mallInfo,
      telemetry: getLiveTelemetry()
    }
  });
});

router.get('/mall/telemetry', (req: Request, res: Response) => {
  res.json({
    success: true,
    telemetry: getLiveTelemetry()
  });
});

// 2. Get All Shops
router.get('/shops', (req: Request, res: Response) => {
  const { category, floor } = req.query;
  let filtered = [...shops];

  if (category && typeof category === 'string' && category !== 'all') {
    filtered = filtered.filter(s => s.category === category || s.category === 'multi');
  }

  if (floor) {
    const fNum = Number(floor);
    if (!isNaN(fNum)) {
      filtered = filtered.filter(s => s.floor === fNum);
    }
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// 3. Get Single Shop & Its Products
router.get('/shops/:id', (req: Request, res: Response) => {
  const shop = shops.find(s => s.id === req.params.id);
  if (!shop) {
    return res.status(404).json({ success: false, message: 'Boutique not found in 2060 Mall Grid' });
  }

  const shopProducts = products.filter(p => p.shopId === shop.id);

  res.json({
    success: true,
    data: {
      ...shop,
      products: shopProducts
    }
  });
});

// 4. Get All Products with Filters
router.get('/products', (req: Request, res: Response) => {
  const { category, shopId, floor, search, minPrice, maxPrice, sort, featured } = req.query;
  let result = [...products];

  if (category && typeof category === 'string' && category !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (shopId && typeof shopId === 'string') {
    result = result.filter(p => p.shopId === shopId);
  }

  if (floor) {
    const fNum = Number(floor);
    if (!isNaN(fNum)) {
      result = result.filter(p => p.floor === fNum);
    }
  }

  if (featured === 'true') {
    result = result.filter(p => p.featured);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.subTitle.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    const min = Number(minPrice);
    if (!isNaN(min)) {
      result = result.filter(p => p.priceCredits >= min);
    }
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    if (!isNaN(max)) {
      result = result.filter(p => p.priceCredits <= max);
    }
  }

  if (sort && typeof sort === 'string') {
    if (sort === 'price-asc') {
      result.sort((a, b) => a.priceCredits - b.priceCredits);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.priceCredits - a.priceCredits);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'popular') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
  }

  res.json({
    success: true,
    total: result.length,
    data: result
  });
});

// 5. Get Single Product
router.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product hologram not found' });
  }

  // Related products in same category
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  res.json({
    success: true,
    data: product,
    related
  });
});

// 6. Post Product Review
router.post('/products/:id/reviews', (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const { userName, comment, rating, cyberAugmentation } = req.body;
  if (!userName || !comment) {
    return res.status(400).json({ success: false, message: 'Username and review comment are required' });
  }

  const newReview: Review = {
    id: `rev-${Date.now()}`,
    userName: userName || 'Anonymous Cyber Patron',
    userRank: 'Verified Neural Shopper',
    rating: Number(rating) || 5,
    date: new Date().toISOString().split('T')[0],
    comment,
    cyberAugmentation: cyberAugmentation || 'Standard Neural Port V3'
  };

  product.reviews.unshift(newReview);
  product.reviewsCount += 1;
  const totalScore = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  product.rating = Number((totalScore / product.reviews.length).toFixed(2));

  res.status(201).json({
    success: true,
    message: 'Neural review uploaded to Quantum Block',
    review: newReview,
    updatedRating: product.rating
  });
});

// 7. Place Quantum Order
router.post('/orders', (req: Request, res: Response) => {
  const { items, recipientName, teleportCoordinates, deliveryMode } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
  }

  const subtotal = items.reduce((acc: number, it: any) => acc + (it.priceCredits * (it.quantity || 1)), 0);
  const tax = Number((subtotal * 0.05).toFixed(2)); // 5% Quantum Hub Tariff
  const totalCredits = subtotal + tax;
  const totalUSD = Number((totalCredits * 1.5).toFixed(2));

  const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
  const orderId = `ord-${Date.now().toString().slice(-4)}`;
  const orderNumber = `NV-2060-${randomHex}`;
  const quantumHash = `0x${randomHex}${Date.now().toString(16).toUpperCase()}${Math.random().toString(16).substring(2, 6).toUpperCase()}`;

  const newOrder: Order = {
    id: orderId,
    orderNumber,
    createdAt: new Date().toISOString(),
    items,
    subtotalCredits: subtotal,
    taxCredits: tax,
    totalCredits,
    totalUSD,
    status: 'Teleport Scheduled',
    deliveryMode: deliveryMode || 'Quantum Teleportation Pod',
    recipientName: recipientName || 'Elite Neural Citizen',
    teleportCoordinates: teleportCoordinates || 'Deck 01 Teleport Bay Alpha',
    quantumTransactionHash: quantumHash,
    securityStamp: `VALIDATED // ENCLAVE QUANTUM CIPHER ${orderNumber}`
  };

  orders.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: 'Quantum Order Authorised & Teleport Dock Engaged',
    order: newOrder
  });
});

// 8. Track Order
router.get('/orders/:id', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order signature not found in teleport ledger' });
  }

  res.json({
    success: true,
    data: order
  });
});

// 9. Client Concierge & Sartorial Director "AURA-9"
router.post('/concierge/chat', (req: Request, res: Response) => {
  const { message, previousMessages = [] } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, message: 'Message prompt required' });
  }

  const query = message.toLowerCase();
  let reply = "";
  let matchedCategory: 'shoes' | 'clothes' | 'jackets' | null = null;
  let recommendedProducts: Product[] = [];

  // Semantic keyword classification
  if (query.includes('shoe') || query.includes('sneaker') || query.includes('boot') || query.includes('heel') || query.includes('stiletto') || query.includes('walk') || query.includes('run') || query.includes('gravity') || query.includes('hover')) {
    matchedCategory = 'shoes';
    if (query.includes('heel') || query.includes('stiletto') || query.includes('party') || query.includes('gala') || query.includes('glamour')) {
      recommendedProducts = products.filter(p => p.id === 'shoe-02' || p.id === 'shoe-01');
      reply = "Good evening. For private galas and formal evening engagements, I recommend our Sapphire Stiletto Cyber-Pumps featuring structural crystal heels and subtle gyroscopic stabilization, or the Grav-Drift MagneKicks V9 with calibrated magnetic suspension.";
    } else if (query.includes('combat') || query.includes('armor') || query.includes('heavy') || query.includes('tactical')) {
      recommendedProducts = products.filter(p => p.id === 'shoe-04' || p.id === 'shoe-03');
      reply = "For high-mobility and structural endurance, the Neural-Mesh Combat Exos incorporate shear-thickening non-Newtonian polymers, providing effortless posture alignment and impact absorption.";
    } else {
      recommendedProducts = products.filter(p => p.category === 'shoes').slice(0, 3);
      reply = "Presenting Deck 02's Kinetic Footwear Salon. Our curated footwear pairs architectural silhouettes with quiet magnetic levitation and bespoke carbon footbeds.";
    }
  } else if (query.includes('jacket') || query.includes('coat') || query.includes('puffer') || query.includes('trench') || query.includes('bomber') || query.includes('cold') || query.includes('sub-zero') || query.includes('winter') || query.includes('shield')) {
    matchedCategory = 'jackets';
    if (query.includes('cold') || query.includes('sub-zero') || query.includes('plasma') || query.includes('puffer') || query.includes('extreme')) {
      recommendedProducts = products.filter(p => p.id === 'jacket-01' || p.id === 'jacket-04');
      reply = "For sub-zero climates or high-altitude travel, the Apex-Shield Plasma Puffer deploys an insulated micro-climate barrier and silica aerogel chambers, sustaining optimal body warmth without bulk.";
    } else if (query.includes('stealth') || query.includes('trench') || query.includes('formal') || query.includes('rain')) {
      recommendedProducts = products.filter(p => p.id === 'jacket-02' || p.id === 'jacket-03');
      reply = "The Hyper-Carbon Stealth Trench provides an immaculate bespoke drape woven from radar-absorbent carbon fiber filaments, resisting the elements with understated elegance.";
    } else {
      recommendedProducts = products.filter(p => p.category === 'jackets').slice(0, 3);
      reply = "Reviewing Deck 04 Outerwear & Bastion creations. We feature architectural capes, micro-tailored wool blazers with invisible climate filaments, and aerospace-grade trench coats.";
    }
  } else if (query.includes('cloth') || query.includes('dress') || query.includes('gown') || query.includes('tuxedo') || query.includes('suit') || query.includes('kimono') || query.includes('wear') || query.includes('velvet') || query.includes('silk') || query.includes('outfit')) {
    matchedCategory = 'clothes';
    if (query.includes('gala') || query.includes('ball') || query.includes('aurora') || query.includes('evening') || query.includes('dress') || query.includes('gown')) {
      recommendedProducts = products.filter(p => p.id === 'cloth-02' || p.id === 'cloth-01');
      reply = "An exquisite choice. The Bioluminescent Starlight Silk Gown emits a gentle pearl radiance inspired by nebular twilight, while the Liquid-Graphene Tuxedo contours dynamically to your posture with flawless drape.";
    } else if (query.includes('kimono') || query.includes('cyber') || query.includes('tokyo') || query.includes('street')) {
      recommendedProducts = products.filter(p => p.id === 'cloth-03' || p.id === 'cloth-04');
      reply = "The Neo-Heritage Adaptive Kimono pairs classical Japanese silk draping with micro-knit structural threads, blending historic craftsmanship with modern ease.";
    } else {
      recommendedProducts = products.filter(p => p.category === 'clothes').slice(0, 3);
      reply = "Deck 03 Sartorial Weave Atelier curates monochrome tailoring, programmable silk organza, and liquid-graphene textiles created for the discerning wardrobe.";
    }
  } else if (query.includes('floor') || query.includes('deck') || query.includes('where') || query.includes('map') || query.includes('directory')) {
    reply = "VALKYRIE 2060 Floor Directory: Deck 01 is the Grand Haute Atrium; Deck 02 features Kinetic Footwear; Deck 03 houses Sartorial Weave Haute Couture; Deck 04 presents Outerwear & Bastion Coats; Deck 05 hosts our Private Salon & Vault.";
    recommendedProducts = products.filter(p => p.featured).slice(0, 3);
  } else if (query.includes('credit') || query.includes('price') || query.includes('currency') || query.includes('pay') || query.includes('bitcoin')) {
    reply = "Our boutique honors Sovereign Neural Credits (₮) and reserve currencies. Inquiries and transactions are sealed with white-glove encrypted custody.";
    recommendedProducts = products.filter(p => p.featured).slice(0, 2);
  } else {
    recommendedProducts = products.filter(p => p.featured);
    reply = "Welcome to VALKYRIE 2060. I am your Senior Style Director. May I guide you through our sculptural footwear, programmable silk tailoring, or aerospace outerwear collections?";
  }

  res.json({
    success: true,
    reply,
    recommendedProducts,
    timestamp: new Date().toISOString(),
    neuralStatus: "SYNCHRONIZED // 100% LATENCY COHERENCE"
  });
});

export default router;
