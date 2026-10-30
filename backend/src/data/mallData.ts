export interface Review {
  id: string;
  userName: string;
  userRank: string; // e.g. "VIP Neural Patron", "Quantum Collector", "Orbital Elite"
  rating: number;
  date: string;
  comment: string;
  cyberAugmentation: string; // e.g. "Optic-Link V4", "Neural-Mesh Mk7"
}

export interface Product3DMesh {
  type: 'shoes' | 'clothes' | 'jackets';
  accentColor: string;
  wireframePoints: [number, number, number][]; // 3D vertices
  wireframeEdges: [number, number][]; // Vertex indices
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

export interface MallInfo {
  name: string;
  tagline: string;
  location: string;
  currentYear: number;
  floors: {
    floor: number;
    name: string;
    theme: string;
    description: string;
    shopsCount: number;
  }[];
  telemetry: {
    atmosphericPurity: number;
    quantumGridStability: number;
    orbitalGravity: string;
    activeShoppers: number;
    quantumBandwidth: string;
    teleportDockStatus: string;
  };
}

export const INITIAL_MALL_INFO: MallInfo = {
  name: "VALKYRIE 2060",
  tagline: "The Grand Pavilion of High-Sartorial Innovation & Architecture",
  location: "Orbital Pavilion // Sector Alpha Haute Promenade",
  currentYear: 2060,
  floors: [
    {
      floor: 1,
      name: "Deck 01: Grand Haute Atrium",
      theme: "Private Arrivals & Architectural Rotunda",
      description: "Private reception, autonomous hover docks, obsidian water features, and senior concierge styling salons.",
      shopsCount: 6
    },
    {
      floor: 2,
      name: "Deck 02: Kinetic Footwear Pavilion",
      theme: "Sculptural Soles & Zero-Friction Movement",
      description: "Bespoke magnetic levitation footwear, kinetic energy harvesting heels, and tailored carbon silhouette runners.",
      shopsCount: 8
    },
    {
      floor: 3,
      name: "Deck 03: Sartorial Weave Atelier",
      theme: "Programmable Chameleon Silks & Liquid Graphene",
      description: "Liquid-graphene evening tuxedos, bioluminescent starlight gowns, and precision micro-tailored garments.",
      shopsCount: 10
    },
    {
      floor: 4,
      name: "Deck 04: Outerwear & Exo-Sculpt Bastion",
      theme: "Aerospace Composites & Climate Boundary Shields",
      description: "Atmospheric re-entry puffers, radar-absorbing wool trenches, and electromagnetic micro-climate outerwear.",
      shopsCount: 7
    },
    {
      floor: 5,
      name: "Deck 05: Private Salon & VIP Vault",
      theme: "Private Fitting Salons & Collector Archives",
      description: "One-of-a-kind bespoke commissions, vintage 2040s horology, and private champagne lounge.",
      shopsCount: 4
    }
  ],
  telemetry: {
    atmosphericPurity: 99.98,
    quantumGridStability: 99.95,
    orbitalGravity: "1.00G Calibrated",
    activeShoppers: 3420,
    quantumBandwidth: "142.8 YB/s Dedicated Fiber",
    teleportDockStatus: "OPERATIONAL // WHITE-GLOVE TRANSITS ACTIVE"
  }
};

export const INITIAL_SHOPS: Shop[] = [
  {
    id: "kinetic-sole",
    name: "KINETIC·SOLE LAB",
    tagline: "Defy Gravity. Run the Neural Continuum.",
    category: "shoes",
    floor: 2,
    deckName: "Deck 02: Kinetic Footwear Lab",
    curator: "Dr. Alistair Chen (Chief Footwear Cyberneticist)",
    description: "Born in the zero-G research habitats of Neo-Zurich, Kinetic·Sole fuses magnetic levitation solenoids with neural impulse soles for supreme velocity and hyper-luxury aesthetics.",
    accentColor: "#00f0ff",
    bannerImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80",
    hologramIcon: "Footprints",
    rating: 4.96,
    productCount: 8,
    foundedYear: 2048,
    boutiqueFeatures: ["Zero-G Treadmill Testing", "Direct Neural Sole Calibration", "Self-Healing Nanopolymer Care"]
  },
  {
    id: "synth-haute",
    name: "SYNTH-HAUTE ATELIER",
    tagline: "Liquid Graphene, Programmable Silks, Infinite Elegance.",
    category: "clothes",
    floor: 3,
    deckName: "Deck 03: Synth-Haute Atelier",
    curator: "Madame Vespera Valois (Former Neo-Paris Fashion Laureate)",
    description: "Pioneering couture engineered at the atomic scale. Every garment reacts dynamically to ambient neural emotions, lighting environments, and biophysical cadence.",
    accentColor: "#ff007f",
    bannerImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    hologramIcon: "Sparkles",
    rating: 4.98,
    productCount: 10,
    foundedYear: 2051,
    boutiqueFeatures: ["Bioluminescent Hue Synchronization", "Thermal Auto-Adjustment", "Chameleon Fiber Weaving"]
  },
  {
    id: "exo-armor",
    name: "EXO-ARMOR BASTION",
    tagline: "Ballistic Elegance. Plasma-Shielded Outerwear.",
    category: "jackets",
    floor: 4,
    deckName: "Deck 04: Exo-Armor & Outerwear Bastion",
    curator: "Commander Jaxson Voss (Retired Orbital Defense Engineer)",
    description: "Military-grade carbon composites translated into haute luxury outerwear. Withstand planetary re-entry winds or sub-zero neo-blizzards without sacrificing high-fashion silhouette.",
    accentColor: "#ffd700",
    bannerImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
    hologramIcon: "ShieldAlert",
    rating: 4.94,
    productCount: 8,
    foundedYear: 2053,
    boutiqueFeatures: ["Plasma Barrier Demonstration Chamber", "Electromagnetic Puffer Calibration", "Hyper-Carbon Weave Tailoring"]
  },
  {
    id: "lumina-tokyo",
    name: "LUMINA COUTURE",
    tagline: "Cyber-Minimalism & Neon Streetwear.",
    category: "clothes",
    floor: 3,
    deckName: "Deck 03: Synth-Haute Atelier",
    curator: "Kaito Moriyama (Shinjuku Underground Design Maestro)",
    description: "Where 2060 cyber-rebellion meets five-star luxury. Fluid kimonos with fiber-optic embroidery and neural link connectivity.",
    accentColor: "#9d4edd",
    bannerImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    hologramIcon: "Zap",
    rating: 4.91,
    productCount: 6,
    foundedYear: 2056,
    boutiqueFeatures: ["Fiber-Optic Live Coding Booth", "Sub-Bass Resonance Sync", "Neural Imprint Monograms"]
  },
  {
    id: "grav-step",
    name: "GRAV-STEP CYBERNETICS",
    tagline: "Anti-Gravity Propulsion for the Urban Vanguard.",
    category: "shoes",
    floor: 2,
    deckName: "Deck 02: Kinetic Footwear Lab",
    curator: "Elena Rostova (Aerospace Kineticist)",
    description: "Footwear with miniature ionic thrusters in the outsoles. Cushion your impact by 98% and glide through urban spires effortlessly.",
    accentColor: "#00ff9d",
    bannerImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    hologramIcon: "Flame",
    rating: 4.95,
    productCount: 6,
    foundedYear: 2054,
    boutiqueFeatures: ["Ionic Thruster Sound Tuning", "Magnetic Suspension Test Track", "Quantum Grip Verification"]
  },
  {
    id: "chrono-tailor",
    name: "CHRONO-WARDROBE 2060",
    tagline: "Outerwear Engineered for Time Dilations & Hyper-Climates.",
    category: "jackets",
    floor: 4,
    deckName: "Deck 04: Exo-Armor & Outerwear Bastion",
    curator: "Arch Duchess Soren (Orbital Haute Guild)",
    description: "Outerwear with micro-climate climate pods built directly into the lining. Experience perfect 21°C comfort anywhere from Antarctic bases to Saharan solar fields.",
    accentColor: "#ff7b00",
    bannerImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
    hologramIcon: "Layers",
    rating: 4.97,
    productCount: 6,
    foundedYear: 2055,
    boutiqueFeatures: ["Micro-Atmosphere Cryo Chamber", "Zero-Mass Feather Insulation", "Smart Heat-Map Profiling"]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // ================= SHOES =================
  {
    id: "shoe-01",
    name: "Grav-Drift MagneKicks V9",
    subTitle: "Magnetic Levitation High-Tops with Ionic Stabilizers",
    brand: "KINETIC·SOLE LAB",
    shopId: "kinetic-sole",
    category: "shoes",
    floor: 2,
    priceCredits: 2850,
    priceUSD: 4275,
    rating: 4.98,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Equipped with dual neodymium micro-repulsors embedded within an ultralight carbon-lattice sole, the Grav-Drift MagneKicks V9 elevates your stride 12mm above ground friction. Neural sync lace locks automatically engage via telemetry upon foot entry.",
    features: [
      "12mm Active Magnetic Ground Hover",
      "Zero-G Kinetic Cushioning Insole",
      "Bioluminescent Sole Illumination (RGB Spectrum)",
      "Wireless Induction Charging through Floor Tiles",
      "Neural Stride Optimization Chip"
    ],
    specs: {
      material: "Graphene Nanofiber & Aerospace Neodymium",
      energyCore: "Tritium Micro-Cell (720h continuous hover)",
      neuralSync: "0.2ms Latency (Class IV Synapse)",
      thermalRating: "-40°C to +85°C Operational Range",
      durability: "Level 9 Ballistic Anti-Abrasion",
      weight: "240 grams per boot"
    },
    meshData: {
      type: "shoes",
      accentColor: "#00f0ff",
      wireframePoints: [
        [-1.8, -0.6, 0.4], [1.8, -0.6, 0.4], [1.8, -0.6, -0.4], [-1.8, -0.6, -0.4],
        [-1.6, 0.2, 0.35], [1.4, -0.1, 0.35], [1.4, -0.1, -0.35], [-1.6, 0.2, -0.35],
        [-0.8, 0.9, 0.3], [-0.2, 0.9, 0.3], [-0.2, 0.9, -0.3], [-0.8, 0.9, -0.3]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [8, 9], [9, 10], [10, 11], [11, 8],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [4, 8], [5, 9], [6, 10], [7, 11]
      ]
    },
    tags: ["Magnetic Hover", "Neural Lace", "Zero-G", "Cyberpunk Luxe"],
    inStock: true,
    stockCount: 14,
    featured: true,
    hologramColor: "#00f0ff",
    reviews: [
      {
        id: "r1",
        userName: "Commander Kira Vance",
        userRank: "Orbital Fleet Pilot",
        rating: 5,
        date: "2060-10-18",
        comment: "Walking in these across the Neo-Tokyo skybridge feels like floating on liquid light. The magnetic levitation feels completely natural after 30 seconds.",
        cyberAugmentation: "Ocular Link 7"
      },
      {
        id: "r2",
        userName: "Lord Sterling Sterling",
        userRank: "VIP Neural Patron",
        rating: 5,
        date: "2060-10-24",
        comment: "The finish on the graphene mesh is unmatched. People stop me in the Deck 05 Atrium just to gaze at the RGB hover pulsation.",
        cyberAugmentation: "Cerebral Stride Mk IV"
      }
    ]
  },
  {
    id: "shoe-02",
    name: "Photon-Pulse Stiletto Cyber-Heels",
    subTitle: "Haute Couture Kinetic Light Stilettos",
    brand: "SYNTH-HAUTE ATELIER",
    shopId: "synth-haute",
    category: "shoes",
    floor: 3,
    priceCredits: 3400,
    priceUSD: 5100,
    rating: 4.96,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Engineered from monocrystalline sapphire glass and titanium-woven tendons, the Photon-Pulse Stilettos generate a trailing holographic light wake with every cadence. Dynamic gyro-balance ensures perfect equilibrium on any surface.",
    features: [
      "Monocrystalline Sapphire Crystal Heel Post",
      "Holographic Light Wake Generation",
      "Active Gyroscopic Posture Balancing",
      "Neural Color-Shift Mood Synchronizer",
      "Zero-Fatigue Orthopedic Shock Nullification"
    ],
    specs: {
      material: "Pure Sapphire Glass & Liquid Titanium Weave",
      energyCore: "Photon-Kinetic Self-Recharging Crystal",
      neuralSync: "0.15ms Latency (Class V Luxury)",
      thermalRating: "Room-Temperature Superconducting Core",
      durability: "Diamond-Scratch Proof Coating",
      weight: "185 grams per heel"
    },
    meshData: {
      type: "shoes",
      accentColor: "#ff007f",
      wireframePoints: [
        [-1.4, -0.6, 0.3], [1.4, -0.6, 0.3], [1.4, -0.6, -0.3], [-1.4, -0.6, -0.3],
        [-1.2, 0.6, 0.25], [0.8, -0.2, 0.25], [0.8, -0.2, -0.25], [-1.2, 0.6, -0.25],
        [-1.3, -0.9, 0.05], [-1.3, -0.9, -0.05]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [0, 8], [3, 9], [8, 9]
      ]
    },
    tags: ["Sapphire Glass", "Haute Stilettos", "Light Wake", "Gyro Balanced"],
    inStock: true,
    stockCount: 8,
    featured: true,
    hologramColor: "#ff007f",
    reviews: [
      {
        id: "r3",
        userName: "Baroness Sylvia Von Halen",
        userRank: "Neo-Monaco Gala Host",
        rating: 5,
        date: "2060-10-12",
        comment: "Wore these to the Zenith Orbital Ball. The light wake synchronized with the orchestra. Simply sublime engineering.",
        cyberAugmentation: "Bio-Harmonic Ear Implant"
      }
    ]
  },
  {
    id: "shoe-03",
    name: "Sub-Orbital Apex Runners",
    subTitle: "Carbon-Tension Spring Runners with Kinetic Harvesters",
    brand: "GRAV-STEP CYBERNETICS",
    shopId: "grav-step",
    category: "shoes",
    floor: 2,
    priceCredits: 2150,
    priceUSD: 3225,
    rating: 4.93,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Designed for hyperspeed urban transit. Each step charges your personal ocular devices while delivering 68% mechanical energy return via carbon leaf-spring blades.",
    features: [
      "Carbon-Leaf Kinetic Energy Harvester",
      "Adaptive Terrain Traction Micro-Spikes",
      "Internal Aerodynamic Vortex Channels",
      "Reflective Iridescent Chameleon Coating"
    ],
    specs: {
      material: "Pre-Preg Carbon Fiber & Hyper-Kevlar Mesh",
      energyCore: "Kinetic Micro-Piezo Matrix",
      neuralSync: "Biomechanical Autopilot (Level 2)",
      thermalRating: "-20°C to +70°C",
      durability: "10,000 km Guaranteed Tread Life",
      weight: "195 grams"
    },
    meshData: {
      type: "shoes",
      accentColor: "#00ff9d",
      wireframePoints: [
        [-1.6, -0.5, 0.4], [1.6, -0.4, 0.4], [1.6, -0.4, -0.4], [-1.6, -0.5, -0.4],
        [-1.4, 0.3, 0.35], [1.2, 0.0, 0.35], [1.2, 0.0, -0.35], [-1.4, 0.3, -0.35]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ]
    },
    tags: ["High Velocity", "Energy Harvest", "Carbon Blade", "Neo-Athletic"],
    inStock: true,
    stockCount: 22,
    featured: false,
    hologramColor: "#00ff9d",
    reviews: []
  },
  {
    id: "shoe-04",
    name: "Neural-Mesh Combat Exos",
    subTitle: "Heavy Armored Tactical Boots with Shock Dampeners",
    brand: "EXO-ARMOR BASTION",
    shopId: "exo-armor",
    category: "shoes",
    floor: 4,
    priceCredits: 3100,
    priceUSD: 4650,
    rating: 4.97,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Engineered for high-impact planetary drop environments. Non-Newtonian liquid armor instantly hardens upon kinetic impact, protecting bones up to Mach 1 drop velocity.",
    features: [
      "Non-Newtonian Rheological Fluid Sole",
      "Titanium Shin & Ankle Exoskeleton Straps",
      "Hermetic Seal with Atmospheric Filter",
      "Night-Vision Footpath Projection"
    ],
    specs: {
      material: "Tungsten Carbide Plates & Hyper-Polymers",
      energyCore: "Cold Fusion Solid State Battery",
      neuralSync: "0.08ms High-Frequency Interface",
      thermalRating: "Extreme Cryo to Plasma Blast Resistant",
      durability: "Military Class VIII Indestructible",
      weight: "510 grams"
    },
    meshData: {
      type: "shoes",
      accentColor: "#ffd700",
      wireframePoints: [
        [-1.7, -0.7, 0.5], [1.7, -0.7, 0.5], [1.7, -0.7, -0.5], [-1.7, -0.7, -0.5],
        [-1.5, 0.9, 0.4], [1.1, 0.2, 0.4], [1.1, 0.2, -0.4], [-1.5, 0.9, -0.4]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ]
    },
    tags: ["Tactical Armor", "Mach 1 Drop", "Non-Newtonian", "Titanium Shin"],
    inStock: true,
    stockCount: 11,
    featured: false,
    hologramColor: "#ffd700",
    reviews: []
  },

  // ================= CLOTHES =================
  {
    id: "cloth-01",
    name: "Liquid-Graphene Smart Tuxedo",
    subTitle: "Molecularly Reconfigurable Formal Wear with Neural Lapel",
    brand: "SYNTH-HAUTE ATELIER",
    shopId: "synth-haute",
    category: "clothes",
    floor: 3,
    priceCredits: 5200,
    priceUSD: 7800,
    rating: 4.99,
    reviewsCount: 74,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Woven from single-atom graphene strands interwoven with quantum dots. The Liquid-Graphene Tuxedo shifts from deep matte obsidian to shimmering pearlescent platinum at the command of your neural link. Fully crease-proof, stain-repelling, and bullet-deflecting.",
    features: [
      "Instant Neural Fabric Color Shift (Obsidian to Pearl)",
      "Zero-Crease Molecular Memory Matrix",
      "Built-in Micro-Cooling Bioclimate Mesh",
      "Holographic Pocket Square Display (Displays crypto balances / VIP passes)",
      "EMF Radiation & Surveillance Shielding"
    ],
    specs: {
      material: "Monolayer Graphene & Silk-Derived Nanothreads",
      energyCore: "Ambient Electromagnetic Induction",
      neuralSync: "Direct Neuro-Cuff Interface (Instant Mood Sync)",
      thermalRating: "Dynamic Equilibrium (Always 21.5°C)",
      durability: "Ballistic Level 3A Discreet Weave",
      weight: "320 grams total ensemble"
    },
    meshData: {
      type: "clothes",
      accentColor: "#00f0ff",
      wireframePoints: [
        [-1.2, 1.2, 0.3], [1.2, 1.2, 0.3], [1.2, 1.2, -0.3], [-1.2, 1.2, -0.3],
        [-0.9, -1.2, 0.3], [0.9, -1.2, 0.3], [0.9, -1.2, -0.3], [-0.9, -1.2, -0.3],
        [-0.4, 0.2, 0.4], [0.4, 0.2, 0.4]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [8, 9], [0, 8], [1, 9]
      ]
    },
    tags: ["Haute Tuxedo", "Liquid Graphene", "Neural Sync", "Bullet-Deflecting"],
    inStock: true,
    stockCount: 6,
    featured: true,
    hologramColor: "#00f0ff",
    reviews: [
      {
        id: "r4",
        userName: "Senator Marcus Thorne",
        userRank: "Neo-Geneva Council",
        rating: 5,
        date: "2060-10-05",
        comment: "The discrete surveillance shielding allowed completely confidential negotiations at the summit, while the tux looked immaculate under all hologram arrays.",
        cyberAugmentation: "Diplomatic Firewall Cortex"
      }
    ]
  },
  {
    id: "cloth-02",
    name: "Bioluminescent Holo-Silk Gown",
    subTitle: "Dynamic Light-Weave Evening Dress with Celestial Aurora Modes",
    brand: "SYNTH-HAUTE ATELIER",
    shopId: "synth-haute",
    category: "clothes",
    floor: 3,
    priceCredits: 6800,
    priceUSD: 10200,
    rating: 5.0,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "A triumph of 2060 haute couture. Millions of micro-luminescent filaments woven into organic mulberry silk ripple with undulating aurora borealis waves. Can project subtle floating starlight motes within a 1-meter radius around the wearer.",
    features: [
      "Surrounding Starlight Hologram Aura (Toggleable)",
      "Heartbeat & Brainwave Rhythm Light Synchronization",
      "Whisper-Light Floating Hemline with Anti-Gravity Draping",
      "Self-Cleaning Ozone Sanitizing Micro-Channels"
    ],
    specs: {
      material: "Bio-Engineered Luminescent Silk & Optic Strands",
      energyCore: "Kinetic Micro-Vibration & Biometric Body Heat",
      neuralSync: "Emotional Resonance Band (Alpha Wave Triggered)",
      thermalRating: "Comfort Controlled Adaptive Breathability",
      durability: "Tear-Resistant Molecular Bonding",
      weight: "210 grams"
    },
    meshData: {
      type: "clothes",
      accentColor: "#ff007f",
      wireframePoints: [
        [-0.5, 1.4, 0.2], [0.5, 1.4, 0.2], [0.5, 1.4, -0.2], [-0.5, 1.4, -0.2],
        [-0.3, 0.4, 0.2], [0.3, 0.4, 0.2], [0.3, 0.4, -0.2], [-0.3, 0.4, -0.2],
        [-1.4, -1.4, 0.4], [1.4, -1.4, 0.4], [1.4, -1.4, -0.4], [-1.4, -1.4, -0.4]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [8, 9], [9, 10], [10, 11], [11, 8],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [4, 8], [5, 9], [6, 10], [7, 11]
      ]
    },
    tags: ["Aurora Borealis", "Holo Silk", "Starlight Aura", "Gala Masterpiece"],
    inStock: true,
    stockCount: 4,
    featured: true,
    hologramColor: "#ff007f",
    reviews: [
      {
        id: "r5",
        userName: "Lady Aria Montgomery",
        userRank: "Orbital Patroness",
        rating: 5,
        date: "2060-10-21",
        comment: "This gown stole the entire grand opening of the Lunar Met Opera. The starlight particles hovering around me felt like pure magic.",
        cyberAugmentation: "Holo-Aura Synchronizer"
      }
    ]
  },
  {
    id: "cloth-03",
    name: "Cyber-Samurai Adaptive Kimono",
    subTitle: "Fiber-Optic Embroidered Robe with Programmable Kanji",
    brand: "LUMINA COUTURE",
    shopId: "lumina-tokyo",
    category: "clothes",
    floor: 3,
    priceCredits: 3900,
    priceUSD: 5850,
    rating: 4.95,
    reviewsCount: 119,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Rooted in ancient Kyoto aesthetics and augmented with 2060 cyber-streetwear tech. Flowing sleeves conceal high-density carbon defense mesh, while dynamic neon Kanji stream down the back spine.",
    features: [
      "Streaming Neon Kanji Spine Display (Custom Text Input)",
      "Wide-Cut Aerodynamic Flow Sleeves",
      "Hidden Neural Credit Transfer Port in Obi Belt",
      "Rain & Acid-Sleet Resistant Hydrophobic Shield"
    ],
    specs: {
      material: "Hydrophobic Smart Damask & Optical Fiber Weave",
      energyCore: "Dual Micro-Capacitor Banks in Obi",
      neuralSync: "Gesture & Voice Command Recognition",
      thermalRating: "-10°C to +40°C",
      durability: "Reinforced Kevlar Seams",
      weight: "440 grams"
    },
    meshData: {
      type: "clothes",
      accentColor: "#9d4edd",
      wireframePoints: [
        [-1.6, 1.0, 0.3], [1.6, 1.0, 0.3], [1.6, 1.0, -0.3], [-1.6, 1.0, -0.3],
        [-0.8, -1.3, 0.3], [0.8, -1.3, 0.3], [0.8, -1.3, -0.3], [-0.8, -1.3, -0.3]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ]
    },
    tags: ["Cyber Samurai", "Neo Tokyo", "Glowing Kanji", "Hydrophobic"],
    inStock: true,
    stockCount: 9,
    featured: false,
    hologramColor: "#9d4edd",
    reviews: []
  },
  {
    id: "cloth-04",
    name: "Zero-G Liquid Velvet Co-ord",
    subTitle: "Two-Piece Loungewear with Micro-Gravity Floating Texture",
    brand: "LUMINA COUTURE",
    shopId: "lumina-tokyo",
    category: "clothes",
    floor: 3,
    priceCredits: 2600,
    priceUSD: 3900,
    rating: 4.92,
    reviewsCount: 130,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The ultimate in orbital lounge comfort. Nanotech liquid velvet provides constant micro-massages while maintaining a pristine, floating drape in any gravity gradient.",
    features: [
      "Biometric Micro-Massage Actuators",
      "Dynamic Heat Dissipation Ribs",
      "Anti-Static Zero-Gravity Fabric Coating",
      "Integrated Audio Resonance Collar"
    ],
    specs: {
      material: "Nanotube Synthetic Velvet & Spandex Alloy",
      energyCore: "Body-Kinetic Powered",
      neuralSync: "Passive Relaxation Frequency Transmitter",
      thermalRating: "Optimal 22°C Circadian Regulation",
      durability: "Anti-Pilling Diamond Spun",
      weight: "290 grams"
    },
    meshData: {
      type: "clothes",
      accentColor: "#00ff9d",
      wireframePoints: [
        [-1.0, 1.1, 0.3], [1.0, 1.1, 0.3], [1.0, 1.1, -0.3], [-1.0, 1.1, -0.3],
        [-0.7, -1.1, 0.3], [0.7, -1.1, 0.3], [0.7, -1.1, -0.3], [-0.7, -1.1, -0.3]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ]
    },
    tags: ["Liquid Velvet", "Zero-G Lounge", "Micro Massage", "Smart Ribs"],
    inStock: true,
    stockCount: 17,
    featured: false,
    hologramColor: "#00ff9d",
    reviews: []
  },

  // ================= JACKETS =================
  {
    id: "jacket-01",
    name: "Apex-Shield Plasma Puffer",
    subTitle: "Electromagnetic Warmth Matrix & High-Altitude Flight Jacket",
    brand: "EXO-ARMOR BASTION",
    shopId: "exo-armor",
    category: "jackets",
    floor: 4,
    priceCredits: 4600,
    priceUSD: 6900,
    rating: 4.97,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The crowning achievement in extreme-condition luxury outerwear. Equipped with an electromagnetic plasma boundary layer that repels gale-force winds, ionizing radiation, and rain. The internal insulation utilizes aerogel pods with zero mass penalty.",
    features: [
      "Deployable Electromagnetic Plasma Wind Deflector",
      "NASA-Grade Silica Aerogel Vacuum Baffles",
      "Holographic HUD Visor in Deployable Collar",
      "Thermal Core Maintaining 24°C down to -65°C",
      "Concealed Neural Datapad Pocket with Farad Shield"
    ],
    specs: {
      material: "Titanium Metal-Mesh & Cryo-Silica Aerogel",
      energyCore: "Cold-Fusion Micro-Pancake Cell (1200h run)",
      neuralSync: "HUD Projection to Ocular Implants",
      thermalRating: "-65°C to +55°C Extreme Planetary Spec",
      durability: "Hypersonic Friction & Cut Proof",
      weight: "480 grams total"
    },
    meshData: {
      type: "jackets",
      accentColor: "#ffd700",
      wireframePoints: [
        [-1.4, 1.2, 0.4], [1.4, 1.2, 0.4], [1.4, 1.2, -0.4], [-1.4, 1.2, -0.4],
        [-1.6, 0.3, 0.45], [1.6, 0.3, 0.45], [1.6, 0.3, -0.45], [-1.6, 0.3, -0.45],
        [-1.1, -1.0, 0.4], [1.1, -1.0, 0.4], [1.1, -1.0, -0.4], [-1.1, -1.0, -0.4]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [8, 9], [9, 10], [10, 11], [11, 8],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [4, 8], [5, 9], [6, 10], [7, 11]
      ]
    },
    tags: ["Plasma Shield", "Aerogel Vacuum", "Extreme Cold", "HUD Collar"],
    inStock: true,
    stockCount: 7,
    featured: true,
    hologramColor: "#ffd700",
    reviews: [
      {
        id: "r6",
        userName: "Captain T. Drake",
        userRank: "Orbital Shuttler",
        rating: 5,
        date: "2060-10-15",
        comment: "Tested this on the unpressurized maintenance spire during a coronal solar flare. The plasma boundary deflector kept me completely warm and shielded. Plus, the matte gold sheen looks extraordinary.",
        cyberAugmentation: "Radiation Hardened Chasis"
      }
    ]
  },
  {
    id: "jacket-02",
    name: "Hyper-Carbon Stealth Trench Coat",
    subTitle: "Active Radar-Absorbing Long Trench with Nanotech Thermal Lining",
    brand: "CHRONO-WARDROBE 2060",
    shopId: "chrono-tailor",
    category: "jackets",
    floor: 4,
    priceCredits: 5800,
    priceUSD: 8700,
    rating: 4.98,
    reviewsCount: 104,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Channeling classical film noir tailored for the 2060 hyper-metropolis. The Hyper-Carbon Stealth Trench incorporates active radar-scattering micro-facets, electromagnetic absorption, and motorized geometric storm lapels.",
    features: [
      "Active Radar & Thermal Signature Cloaking",
      "Motorized Self-Adjusting Geometric Lapels",
      "Biometric Fastening Studs with Micro-Magnets",
      "Internal Quantum Cryptographic Data Vault Pocket"
    ],
    specs: {
      material: "Carbon-Nanotube Woven Twill & Radar Hex-Pore Sheet",
      energyCore: "Piezoelectric Kinetic & Solar Micro-Trim",
      neuralSync: "Stealth Mode Voice Code Activation",
      thermalRating: "All-Climate Active Thermoregulation",
      durability: "Shrapnel & Slashing Proof",
      weight: "580 grams"
    },
    meshData: {
      type: "jackets",
      accentColor: "#ff7b00",
      wireframePoints: [
        [-1.3, 1.4, 0.35], [1.3, 1.4, 0.35], [1.3, 1.4, -0.35], [-1.3, 1.4, -0.35],
        [-1.5, 0.1, 0.35], [1.5, 0.1, 0.35], [1.5, 0.1, -0.35], [-1.5, 0.1, -0.35],
        [-1.0, -1.6, 0.4], [1.0, -1.6, 0.4], [1.0, -1.6, -0.4], [-1.0, -1.6, -0.4]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [8, 9], [9, 10], [10, 11], [11, 8],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [4, 8], [5, 9], [6, 10], [7, 11]
      ]
    },
    tags: ["Stealth Trench", "Radar Cloak", "Hyper-Carbon", "Motorized Lapel"],
    inStock: true,
    stockCount: 5,
    featured: true,
    hologramColor: "#ff7b00",
    reviews: [
      {
        id: "r7",
        userName: "Detective Ren Kowalski",
        userRank: "Neo-Sector Investigator",
        rating: 5,
        date: "2060-10-22",
        comment: "Renders you invisible to corporate surveillance drones while giving you the silhouette of a futuristic deity. Absolute perfection.",
        cyberAugmentation: "Stealth Optics"
      }
    ]
  },
  {
    id: "jacket-03",
    name: "Orbital Radiant Leather Bomber",
    subTitle: "Bionic Leather Bomber with Glowing Fiber-Ribs",
    brand: "EXO-ARMOR BASTION",
    shopId: "exo-armor",
    category: "jackets",
    floor: 4,
    priceCredits: 3750,
    priceUSD: 5625,
    rating: 4.94,
    reviewsCount: 145,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Lab-synthesized bionic grain leather enhanced with bioluminescent ribbing that throbs with your pulse. Resistant to abrasions, zero-gravity tears, and extreme flight friction.",
    features: [
      "Pulse-Synced Fiber-Optic Ribbing",
      "Cruelty-Free Lab-Grown Bionic Calf Leather",
      "Anti-G Pressure-Compensating Sleeve Liners",
      "Magnetic Rapid-Eject Collar Snaps"
    ],
    specs: {
      material: "Bio-Engineered Synthetic Leather & Luminescent Ribs",
      energyCore: "Pulse Induction Micro-Ring",
      neuralSync: "0.2ms Biometric Pulse Link",
      thermalRating: "-25°C to +45°C",
      durability: "Grade 6 Kinetic Defense",
      weight: "520 grams"
    },
    meshData: {
      type: "jackets",
      accentColor: "#00f0ff",
      wireframePoints: [
        [-1.3, 1.1, 0.4], [1.3, 1.1, 0.4], [1.3, 1.1, -0.4], [-1.3, 1.1, -0.4],
        [-1.5, 0.2, 0.4], [1.5, 0.2, 0.4], [1.5, 0.2, -0.4], [-1.5, 0.2, -0.4],
        [-1.1, -0.9, 0.35], [1.1, -0.9, 0.35], [1.1, -0.9, -0.35], [-1.1, -0.9, -0.35]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [8, 9], [9, 10], [10, 11], [11, 8],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [4, 8], [5, 9], [6, 10], [7, 11]
      ]
    },
    tags: ["Bionic Leather", "Glowing Ribs", "Flight Bomber", "Pulse Synced"],
    inStock: true,
    stockCount: 12,
    featured: false,
    hologramColor: "#00f0ff",
    reviews: []
  },
  {
    id: "jacket-04",
    name: "Solaris Photon-Weave Parka",
    subTitle: "Solar Energy Absorption Outerwear with Holographic Hood",
    brand: "CHRONO-WARDROBE 2060",
    shopId: "chrono-tailor",
    category: "jackets",
    floor: 4,
    priceCredits: 4200,
    priceUSD: 6300,
    rating: 4.93,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Harnessing 99.4% of incident sunlight or ambient city neon. The Solaris Parka feeds infinite warmth to its internal micro-conductors while projecting a halo-hood hologram protectant in rainy storms.",
    features: [
      "99.4% Efficiency Photovoltaic Thread Matrix",
      "Hologram Halo-Hood Rain Deflector",
      "Instant 3-Second Core Warming System",
      "Wireless Inductive Device Charging Pocket"
    ],
    specs: {
      material: "Perovskite Photovoltaic Weave & Thermal Elastomer",
      energyCore: "Self-Sustaining Solar Cell Mesh",
      neuralSync: "Smart Warmth Slider via Holo-HUD",
      thermalRating: "-50°C to +35°C",
      durability: "Weather-Indestructible Hydro-Membrane",
      weight: "460 grams"
    },
    meshData: {
      type: "jackets",
      accentColor: "#ffd700",
      wireframePoints: [
        [-1.3, 1.2, 0.4], [1.3, 1.2, 0.4], [1.3, 1.2, -0.4], [-1.3, 1.2, -0.4],
        [-1.4, -1.1, 0.35], [1.4, -1.1, 0.35], [1.4, -1.1, -0.35], [-1.4, -1.1, -0.35]
      ],
      wireframeEdges: [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ]
    },
    tags: ["Solar Power", "Halo Hood", "Fast Warmth", "Perovskite"],
    inStock: true,
    stockCount: 8,
    featured: false,
    hologramColor: "#ffd700",
    reviews: []
  }
];

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

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-8819",
    orderNumber: "NV-2060-88190X",
    createdAt: "2060-10-30T18:14:00Z",
    items: [
      {
        productId: "shoe-01",
        name: "Grav-Drift MagneKicks V9",
        category: "shoes",
        priceCredits: 2850,
        quantity: 1,
        selectedSize: "US 10.5 / Quantum 44",
        selectedColorMode: "Cyber Cyan #00f0ff",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    subtotalCredits: 2850,
    taxCredits: 142.5,
    totalCredits: 2992.5,
    totalUSD: 4488.75,
    status: "Quantum In Transit",
    deliveryMode: "Orbital Hypersonic Drone",
    recipientName: "Commander Sarah Jenkins",
    teleportCoordinates: "Sector 07 // Deck 05 VIP Pad #12",
    quantumTransactionHash: "0x9F4B3C2A1E8D7060AEE99014FFB2060",
    securityStamp: "VALIDATED // QUANTUM ENCLAVE SIGNATURE #889"
  }
];
