import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { api } from '../api';
import { useMall } from '../context/MallContext';
import { ProductCard } from './ProductCard';
import { cyberAudio } from '../utils/cyberAudio';
import { ArrowUpDown, RotateCcw } from 'lucide-react';

interface Props {
  searchQuery: string;
}

export const ProductCatalogView: React.FC<Props> = ({ searchQuery }) => {
  const { selectedCategory, setSelectedCategory, activeFloor, setActiveFloor } = useMall();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(8000);

  useEffect(() => {
    setLoading(true);
    api.getProducts({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      floor: activeFloor === 0 ? undefined : activeFloor,
      search: searchQuery || undefined,
      maxPrice: priceMax,
      sort: sortBy === 'featured' ? undefined : sortBy
    }).then(res => {
      setProducts(res);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [selectedCategory, activeFloor, searchQuery, sortBy, priceMax]);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 space-y-8 font-sans">
      {/* Editorial Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        {/* Department Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              cyberAudio.playClick();
              setSelectedCategory('all');
            }}
            className={`px-4 py-2 rounded-full text-xs font-luxury tracking-wider uppercase transition-all ${
              selectedCategory === 'all'
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:text-white bg-[#121216] border border-white/5'
            }`}
          >
            All Curations
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setSelectedCategory('shoes');
            }}
            className={`px-4 py-2 rounded-full text-xs font-luxury tracking-wider uppercase transition-all ${
              selectedCategory === 'shoes'
                ? 'bg-[#d4af37] text-black font-semibold'
                : 'text-zinc-400 hover:text-white bg-[#121216] border border-white/5'
            }`}
          >
            Footwear
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setSelectedCategory('clothes');
            }}
            className={`px-4 py-2 rounded-full text-xs font-luxury tracking-wider uppercase transition-all ${
              selectedCategory === 'clothes'
                ? 'bg-[#d4af37] text-black font-semibold'
                : 'text-zinc-400 hover:text-white bg-[#121216] border border-white/5'
            }`}
          >
            Haute Couture
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setSelectedCategory('jackets');
            }}
            className={`px-4 py-2 rounded-full text-xs font-luxury tracking-wider uppercase transition-all ${
              selectedCategory === 'jackets'
                ? 'bg-[#d4af37] text-black font-semibold'
                : 'text-zinc-400 hover:text-white bg-[#121216] border border-white/5'
            }`}
          >
            Outerwear
          </button>
        </div>

        {/* Right Filter & Sort */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Price Range Slider */}
          <div className="flex items-center gap-3 bg-[#121216] border border-white/5 px-4 py-2 rounded-full">
            <span className="text-[11px] font-mono-luxury text-zinc-400">MAX:</span>
            <input
              type="range"
              min={1500}
              max={8000}
              step={200}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-24 accent-[#d4af37] cursor-pointer"
            />
            <span className="font-mono-luxury text-[#d4af37] font-semibold text-xs">
              ${(priceMax * 1.5).toLocaleString()}
            </span>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-[#121216] border border-white/5 px-4 py-2 rounded-full">
            <ArrowUpDown size={13} className="text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => {
                cyberAudio.playClick();
                setSortBy(e.target.value);
              }}
              className="bg-transparent text-white text-xs font-sans focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#121216]">Curator Recommendation</option>
              <option value="price-asc" className="bg-[#121216]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#121216]">Price: High to Low</option>
              <option value="rating" className="bg-[#121216]">Client Rating</option>
              <option value="popular" className="bg-[#121216]">Most In-Demand</option>
            </select>
          </div>
        </div>
      </div>

      {/* Counter & Active Filter Strip */}
      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-luxury">
        <div className="flex items-center gap-3">
          <span>{products.length} CREATIONS PRESENTED</span>
          {activeFloor !== 0 && (
            <span className="text-[#d4af37] border-l border-white/10 pl-3">
              FILTERED: DECK 0{activeFloor}
            </span>
          )}
        </div>

        {(activeFloor !== 0 || selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveFloor(0);
              setSelectedCategory('all');
            }}
            className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-center">
          <div className="w-8 h-8 border border-[#d4af37] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="font-mono-luxury text-xs text-zinc-400 tracking-wider">
            PREPARING ATELIER SHOWCASE...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="p-16 text-center bg-[#121216] border border-white/5 rounded-2xl max-w-md mx-auto space-y-4">
          <p className="text-sm text-zinc-300 font-sans">
            No creations match your active criteria.
          </p>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveFloor(0);
              setSelectedCategory('all');
              setPriceMax(8000);
            }}
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold"
          >
            Restore Full Salon
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
