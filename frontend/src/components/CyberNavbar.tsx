import React from 'react';
import { useMall } from '../context/MallContext';
import { cyberAudio } from '../utils/cyberAudio';
import toast from 'react-hot-toast';
import {
  ShoppingBag,
  Heart,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  MessageSquare,
  Search,
  Truck
} from 'lucide-react';

interface Props {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  activeView: 'mall' | 'boutiques' | 'floors';
  setActiveView: (view: 'mall' | 'boutiques' | 'floors') => void;
}

export const CyberNavbar: React.FC<Props> = ({
  onSearchChange,
  searchQuery,
  activeView,
  setActiveView
}) => {
  const {
    cartCount,
    wishlist,
    selectedCategory,
    setSelectedCategory,
    soundEnabled,
    toggleSound,
    ambientEnabled,
    toggleAmbient,
    setOpenCart,
    setOpenTryOn,
    setOpenConcierge,
    setOpenOrdersTracker,
    activeFloor,
    setActiveFloor
  } = useMall();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#09090b]/90 border-b border-white/5 transition-all">
      {/* Top Quiet Luxury Bar */}
      <div className="w-full border-b border-white/5 px-6 py-2 flex items-center justify-between text-[11px] text-zinc-400 font-sans">
        <div className="flex items-center gap-4">
          <span className="tracking-widest uppercase font-mono-luxury text-zinc-500">
            THE 2060 COLLECTION
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline text-zinc-300">
            WHITE-GLOVE SUB-ORBITAL DISPATCH
          </span>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenOrdersTracker(true);
            }}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Truck size={13} className="text-[#d4af37]" />
            <span>Track Consignment</span>
          </button>

          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <button
              onClick={toggleSound}
              className={`transition-colors ${soundEnabled ? 'text-[#d4af37]' : 'text-zinc-600'}`}
              title={soundEnabled ? 'Sound Feedback Active' : 'Sound Muted'}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
            <button
              onClick={toggleAmbient}
              className={`text-[10px] uppercase font-mono-luxury transition-all ${
                ambientEnabled ? 'text-[#d4af37] font-bold' : 'text-zinc-600 hover:text-zinc-400'
              }`}
              title="Velvet Ambient Room Audio"
            >
              <Radio size={12} className="inline mr-1" />
              Ambient
            </button>
          </div>
        </div>
      </div>

      {/* Main Architectural Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <div
          onClick={() => {
            cyberAudio.playClick();
            setActiveView('mall');
            setSelectedCategory('all');
            setActiveFloor(0);
          }}
          className="flex flex-col cursor-pointer group select-none"
        >
          <span className="font-luxury font-bold text-2xl tracking-[0.2em] text-white group-hover:text-[#d4af37] transition-colors">
            VALKYRIE
          </span>
          <span className="text-[9px] font-mono-luxury tracking-[0.3em] uppercase text-zinc-500">
            GRAND PAVILION · 2060
          </span>
        </div>

        {/* Center Department Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-luxury tracking-widest uppercase">
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveView('mall');
              setSelectedCategory('all');
              setActiveFloor(0);
            }}
            className={`transition-colors py-1 ${
              activeView === 'mall' && selectedCategory === 'all'
                ? 'text-white border-b border-[#d4af37]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Creations
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveView('mall');
              setSelectedCategory('shoes');
              setActiveFloor(2);
            }}
            className={`transition-colors py-1 ${
              selectedCategory === 'shoes'
                ? 'text-[#d4af37] border-b border-[#d4af37]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Footwear
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveView('mall');
              setSelectedCategory('clothes');
              setActiveFloor(3);
            }}
            className={`transition-colors py-1 ${
              selectedCategory === 'clothes'
                ? 'text-[#d4af37] border-b border-[#d4af37]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Haute Couture
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveView('mall');
              setSelectedCategory('jackets');
              setActiveFloor(4);
            }}
            className={`transition-colors py-1 ${
              selectedCategory === 'jackets'
                ? 'text-[#d4af37] border-b border-[#d4af37]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Outerwear
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveView('boutiques');
            }}
            className={`transition-colors py-1 ${
              activeView === 'boutiques'
                ? 'text-white border-b border-[#d4af37]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ateliers
          </button>
        </nav>

        {/* Right Tools & Search */}
        <div className="flex items-center gap-4">
          {/* Minimal Search Bar */}
          <div className="relative hidden md:block w-48 lg:w-60">
            <Search className="absolute left-3 top-2.5 text-zinc-500" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search salon..."
              className="w-full bg-[#131316] border border-white/5 focus:border-[#d4af37]/50 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
            />
          </div>

          {/* Virtual Fitting Suite */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenTryOn(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37]/60 text-zinc-300 hover:text-white text-xs font-sans tracking-wide transition-all"
          >
            <Sparkles size={13} className="text-[#d4af37]" />
            <span className="hidden sm:inline">Fitting Salon</span>
          </button>

          {/* Private Concierge */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenConcierge(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37]/60 text-zinc-300 hover:text-white text-xs font-sans tracking-wide transition-all"
          >
            <MessageSquare size={13} className="text-[#d4af37]" />
            <span className="hidden sm:inline">Concierge</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              toast(`Saved in Personal Vault: ${wishlist.length} creations`, {
                style: { background: '#131316', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)' }
              });
            }}
            className="p-2 text-zinc-400 hover:text-white transition-colors relative"
            title="Saved Vault"
          >
            <Heart size={16} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            )}
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenCart(true);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-[#f4ebd0] transition-all"
          >
            <ShoppingBag size={14} />
            <span>Bag</span>
            <span className="font-mono-luxury text-[11px] ml-0.5">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Sub-level Floor Filter Bar */}
      {activeView === 'mall' && (
        <div className="w-full border-t border-white/5 px-6 py-2 flex items-center justify-between text-xs text-zinc-400 font-sans">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono-luxury text-zinc-500 uppercase">
              GALLERIA DECKS:
            </span>
            <button
              onClick={() => setActiveFloor(0)}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                activeFloor === 0 ? 'text-white font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              All Decks
            </button>
            <button
              onClick={() => setActiveFloor(2)}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                activeFloor === 2 ? 'text-[#d4af37] font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Deck 02 // Footwear Atelier
            </button>
            <button
              onClick={() => setActiveFloor(3)}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                activeFloor === 3 ? 'text-[#d4af37] font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Deck 03 // Haute Couture
            </button>
            <button
              onClick={() => setActiveFloor(4)}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                activeFloor === 4 ? 'text-[#d4af37] font-semibold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Deck 04 // Technical Outerwear
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono-luxury text-zinc-500">
            <span>CURATED FOR YEAR 2060</span>
          </div>
        </div>
      )}
    </header>
  );
};
