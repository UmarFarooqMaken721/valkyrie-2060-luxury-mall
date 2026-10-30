import React, { useState, useEffect } from 'react';
import type { Shop, Product } from '../types';
import { api } from '../api';
import { cyberAudio } from '../utils/cyberAudio';
import { ProductCard } from './ProductCard';
import { Star, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export const ShopsDirectory: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [shopProducts, setShopProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.getShops().then(res => {
      setShops(res);
    });
  }, []);

  const handleOpenShop = async (shop: Shop) => {
    cyberAudio.playClick();
    setSelectedShop(shop);
    try {
      const data = await api.getShopById(shop.id);
      setShopProducts(data.products);
    } catch {
      // Fallback
    }
  };

  if (selectedShop) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10 font-sans">
        <button
          onClick={() => {
            cyberAudio.playClick();
            setSelectedShop(null);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141418] border border-white/10 text-zinc-300 hover:text-white text-xs font-sans transition-all"
        >
          <ArrowLeft size={14} />
          <span>Return to Ateliers Directory</span>
        </button>

        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111115] p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
            <img src={selectedShop.bannerImage} alt="banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111115] via-[#111115]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono-luxury">
              <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                DECK 0{selectedShop.floor} · {selectedShop.category.toUpperCase()}
              </span>
              <span className="text-[#d4af37] flex items-center gap-1 font-semibold">
                <Star size={12} fill="#d4af37" />
                <span>{selectedShop.rating}</span>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">EST. {selectedShop.foundedYear}</span>
            </div>

            <h1 className="font-luxury font-bold text-3xl sm:text-5xl text-white">
              {selectedShop.name}
            </h1>

            <p className="text-sm sm:text-base text-[#d4af37] font-editorial italic">
              "{selectedShop.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              {selectedShop.description}
            </p>

            <div className="pt-2 text-xs font-mono-luxury text-zinc-400">
              CURATOR: <strong className="text-white font-medium">{selectedShop.curator}</strong>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono-luxury">
              {selectedShop.boutiqueFeatures.map((f, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#0a0a0d] border border-white/5 text-zinc-300 flex items-center gap-1.5"
                >
                  <ShieldCheck size={12} className="text-[#d4af37]" />
                  <span>{f}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-luxury font-bold text-xl text-white">
              ATELIER PIECES ({shopProducts.length})
            </h2>
            <span className="text-xs font-mono-luxury text-zinc-500">
              Direct Authentication from {selectedShop.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shopProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 space-y-10 font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] font-mono-luxury text-[#d4af37] uppercase tracking-[0.2em]">
          VALKYRIE PAVILION · YEAR 2060
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-white font-normal">
          Flagship Ateliers & Salons
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
          Step inside our dedicated houses specializing in kinetic foot architecture, molecular haute couture, and aerospace technical outerwear.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div
            key={shop.id}
            onClick={() => handleOpenShop(shop)}
            className="group cursor-pointer luxury-card rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-48 w-full overflow-hidden bg-[#0c0c0f]">
              <img
                src={shop.bannerImage}
                alt={shop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-black/30" />

              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono-luxury text-zinc-300 border border-white/10 uppercase">
                Deck 0{shop.floor}
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono-luxury text-[#d4af37] border border-white/10 flex items-center gap-1">
                <Star size={11} fill="#d4af37" />
                <span>{shop.rating}</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono-luxury text-zinc-500 uppercase tracking-wider block mb-1">
                  {shop.deckName}
                </span>
                <h3 className="font-luxury font-bold text-xl text-white group-hover:text-[#d4af37] transition-colors">
                  {shop.name}
                </h3>
                <p className="text-xs text-[#d4af37] font-editorial italic mt-1">
                  "{shop.tagline}"
                </p>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed font-light">
                  {shop.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-sans">
                <span className="font-mono-luxury text-zinc-500 text-[11px]">
                  {shop.productCount} BESPOKE PIECES
                </span>
                <span className="text-white font-medium flex items-center gap-1.5 group-hover:text-[#d4af37] transition-colors">
                  <span>Enter Atelier</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
