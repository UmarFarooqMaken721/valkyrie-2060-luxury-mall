import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, Order, MallInfo } from '../types';
import { api } from '../api';
import { cyberAudio } from '../utils/cyberAudio';
import toast from 'react-hot-toast';

interface MallContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, colorMode?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalCredits: number;
  cartTaxCredits: number;
  cartTotalCredits: number;
  cartTotalUSD: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  activeFloor: number;
  setActiveFloor: (floor: number) => void;
  selectedCategory: 'all' | 'shoes' | 'clothes' | 'jackets';
  setSelectedCategory: (cat: 'all' | 'shoes' | 'clothes' | 'jackets') => void;

  soundEnabled: boolean;
  toggleSound: () => void;
  ambientEnabled: boolean;
  toggleAmbient: () => void;

  openCart: boolean;
  setOpenCart: (open: boolean) => void;
  openTryOn: boolean;
  setOpenTryOn: (open: boolean) => void;
  openConcierge: boolean;
  setOpenConcierge: (open: boolean) => void;
  openOrdersTracker: boolean;
  setOpenOrdersTracker: (open: boolean) => void;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;

  inspectProduct: Product | null;
  setInspectProduct: (product: Product | null) => void;

  mallInfo: MallInfo | null;
  telemetry: any;
}

const MallContext = createContext<MallContextType | undefined>(undefined);

export const MallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('neo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('neo_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeFloor, setActiveFloorState] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'shoes' | 'clothes' | 'jackets'>('all');

  const [soundEnabled, setSoundEnabled] = useState(cyberAudio.soundEnabled);
  const [ambientEnabled, setAmbientEnabled] = useState(cyberAudio.ambientEnabled);

  const [openCart, setOpenCart] = useState(false);
  const [openTryOn, setOpenTryOn] = useState(false);
  const [openConcierge, setOpenConcierge] = useState(false);
  const [openOrdersTracker, setOpenOrdersTracker] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);

  const [mallInfo, setMallInfo] = useState<MallInfo | null>(null);
  const [telemetry, setTelemetry] = useState<any>(null);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('neo_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('neo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch initial mall info and poll telemetry
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await api.getMallInfo();
        setMallInfo(info);
        setTelemetry(info.telemetry);
      } catch (e) {
        console.warn('Backend loading in fallback mode');
      }
    };
    fetchInfo();

    const interval = setInterval(async () => {
      try {
        const tel = await api.getTelemetry();
        setTelemetry(tel);
      } catch (e) {
        setTelemetry((prev: any) => {
          if (!prev) return null;
          return {
            ...prev,
            activeShoppers: prev.activeShoppers + Math.floor(Math.random() * 5) - 2,
            quantumGridStability: Number((99.94 + (Math.random() * 0.04 - 0.02)).toFixed(3))
          };
        });
      }
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const setActiveFloor = (floor: number) => {
    cyberAudio.playElevator();
    setActiveFloorState(floor);
  };

  const toggleSound = () => {
    const next = cyberAudio.toggleSound();
    setSoundEnabled(next);
  };

  const toggleAmbient = () => {
    const next = cyberAudio.toggleAmbientDrone();
    setAmbientEnabled(next);
  };

  const addToCart = (product: Product, quantity = 1, size = 'Standard Neural', colorMode = 'Holo-Cyan') => {
    cyberAudio.playSuccess();
    setCart(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColorMode === colorMode
      );
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedSize === size && item.selectedColorMode === colorMode
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: size, selectedColorMode: colorMode }];
    });
    toast.success(`Hologram Synced: ${product.name} added to Quantum Cart`, {
      style: {
        background: '#090e24',
        color: '#00f0ff',
        border: '1px solid #00f0ff',
        boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
        fontFamily: 'Rajdhani, sans-serif',
        fontWeight: 'bold'
      },
      icon: '⚡'
    });
  };

  const removeFromCart = (productId: string) => {
    cyberAudio.playClick();
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    cyberAudio.playHover();
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    cyberAudio.playClick();
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        toast('Catalog Bookmark Saved to Neural Vault', {
          style: {
            background: '#0e0b1f',
            color: '#ff007f',
            border: '1px solid #ff007f',
            fontFamily: 'Rajdhani, sans-serif'
          },
          icon: '💎'
        });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, it) => acc + it.quantity, 0);
  const cartSubtotalCredits = cart.reduce((acc, it) => acc + it.product.priceCredits * it.quantity, 0);
  const cartTaxCredits = Number((cartSubtotalCredits * 0.05).toFixed(2));
  const cartTotalCredits = cartSubtotalCredits + cartTaxCredits;
  const cartTotalUSD = Number((cartTotalCredits * 1.5).toFixed(2));

  return (
    <MallContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotalCredits,
        cartTaxCredits,
        cartTotalCredits,
        cartTotalUSD,
        wishlist,
        toggleWishlist,
        isWishlisted,
        activeFloor,
        setActiveFloor,
        selectedCategory,
        setSelectedCategory,
        soundEnabled,
        toggleSound,
        ambientEnabled,
        toggleAmbient,
        openCart,
        setOpenCart,
        openTryOn,
        setOpenTryOn,
        openConcierge,
        setOpenConcierge,
        openOrdersTracker,
        setOpenOrdersTracker,
        activeOrder,
        setActiveOrder,
        inspectProduct,
        setInspectProduct,
        mallInfo,
        telemetry
      }}
    >
      {children}
    </MallContext.Provider>
  );
};

export const useMall = () => {
  const context = useContext(MallContext);
  if (!context) {
    throw new Error('useMall must be used within a MallProvider');
  }
  return context;
};
