import React from 'react';
import type { Product } from '../types';
import { useMall } from '../context/MallContext';
import { cyberAudio } from '../utils/cyberAudio';
import {
  ShoppingBag,
  Heart,
  Rotate3d,
  Sparkles
} from 'lucide-react';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setInspectProduct, setOpenTryOn } = useMall();

  return (
    <div
      onMouseEnter={() => cyberAudio.playHover()}
      className="group luxury-card rounded-2xl overflow-hidden flex flex-col justify-between relative border border-white/5 hover:border-[#d4af37]/40 transition-all duration-500"
    >
      {/* Product Image Frame */}
      <div className="relative w-full h-80 overflow-hidden bg-[#0c0c0f]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-black/20 pointer-events-none" />

        {/* Minimalist Subtle Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-luxury bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10 uppercase">
            Deck 0{product.floor} · {product.category}
          </span>
          {product.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-luxury bg-[#d4af37]/15 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30">
              Curated
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            cyberAudio.playClick();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted(product.id)
              ? 'bg-[#d4af37] text-black shadow-lg scale-105'
              : 'bg-black/50 text-zinc-300 hover:text-white border border-white/10 hover:border-white/30'
          }`}
          title="Save to Personal Vault"
        >
          <Heart size={14} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
        </button>

        {/* Hover Action Strip */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={() => {
              cyberAudio.playClick();
              setInspectProduct(product);
            }}
            className="flex-1 py-2.5 rounded-full bg-white text-black text-xs font-sans font-semibold flex items-center justify-center gap-1.5 shadow-xl hover:bg-[#f4ebd0] transition-all"
          >
            <Rotate3d size={14} className="text-black" />
            <span>3D Studio Inspection</span>
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenTryOn(true);
            }}
            className="p-2.5 rounded-full bg-black/80 hover:bg-black backdrop-blur-md text-white text-xs border border-white/15 hover:border-[#d4af37]/50 flex items-center justify-center shadow-lg transition-all"
            title="Style in Fitting Salon"
          >
            <Sparkles size={14} className="text-[#d4af37]" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 font-sans">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono-luxury text-zinc-400 mb-1">
            <span className="tracking-wider uppercase text-zinc-400">{product.brand}</span>
            <span className="text-[#d4af37] flex items-center gap-1">
              <span>★</span>
              <span>{product.rating}</span>
              <span className="text-zinc-600">({product.reviewsCount})</span>
            </span>
          </div>

          <h3
            onClick={() => {
              cyberAudio.playClick();
              setInspectProduct(product);
            }}
            className="font-luxury font-bold text-base text-white hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed font-light">
            {product.subTitle}
          </p>

          <div className="mt-3 text-[11px] text-zinc-400 font-mono-luxury flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="truncate">{product.features[0]}</span>
          </div>
        </div>

        {/* Price & Add to Bag */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
          <div>
            <span className="font-luxury font-bold text-lg text-white block">
              ${product.priceUSD.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono-luxury text-zinc-500">
              ₮ {product.priceCredits.toLocaleString()} Credits
            </span>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              addToCart(product);
            }}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs tracking-wide hover:bg-[#f4ebd0] active:scale-95 flex items-center gap-1.5 shadow-md transition-all"
          >
            <ShoppingBag size={13} />
            <span>Acquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
