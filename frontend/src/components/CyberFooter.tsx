import React, { useState } from 'react';
import { useMall } from '../context/MallContext';
import { cyberAudio } from '../utils/cyberAudio';
import { ArrowUp } from 'lucide-react';
import toast from 'react-hot-toast';

export const CyberFooter: React.FC = () => {
  const { setSelectedCategory, setActiveFloor, setOpenTryOn, setOpenConcierge } = useMall();
  const [clientEmail, setClientEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim()) return;
    cyberAudio.playSuccess();
    toast.success('Client registered for private 2060 salon viewings', {
      style: { background: '#121216', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)' }
    });
    setClientEmail('');
  };

  const scrollToTop = () => {
    cyberAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070709] border-t border-white/5 pt-16 pb-24 px-6 sm:px-8 text-zinc-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Lore */}
        <div className="lg:col-span-2 space-y-4">
          <span className="font-luxury font-bold text-2xl tracking-[0.2em] text-white">
            VALKYRIE
          </span>
          <p className="text-[10px] font-mono-luxury tracking-[0.25em] text-zinc-500 uppercase">
            GRAND PAVILION · 2060
          </p>

          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-light">
            An architectural luxury pavilion dedicated to avant-garde footwear, atomic-engineered haute couture, and plasma-shielded outerwear.
          </p>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="space-y-2 pt-2 max-w-sm">
            <label className="text-[10px] font-mono-luxury text-zinc-500 uppercase tracking-wider block">
              Private Salon Invitations:
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="client@pavilion.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="flex-1 bg-[#121216] border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ebd0] transition-all"
              >
                Join
              </button>
            </div>
          </form>
        </div>

        {/* Salons */}
        <div className="space-y-3">
          <h4 className="font-luxury font-bold text-white text-xs tracking-widest uppercase">
            THE SALONS
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('shoes');
                  setActiveFloor(2);
                }}
                className="hover:text-white transition-colors"
              >
                Footwear Atelier (Deck 02)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('clothes');
                  setActiveFloor(3);
                }}
                className="hover:text-white transition-colors"
              >
                Haute Couture (Deck 03)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('jackets');
                  setActiveFloor(4);
                }}
                className="hover:text-white transition-colors"
              >
                Technical Outerwear (Deck 04)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveFloor(5)}
                className="hover:text-white transition-colors"
              >
                Sovereign Skydeck (Deck 05)
              </button>
            </li>
          </ul>
        </div>

        {/* Client Services */}
        <div className="space-y-3">
          <h4 className="font-luxury font-bold text-white text-xs tracking-widest uppercase">
            CLIENT SERVICES
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => setOpenTryOn(true)}
                className="hover:text-white transition-colors"
              >
                Virtual Styling Suite
              </button>
            </li>
            <li>
              <button
                onClick={() => setOpenConcierge(true)}
                className="hover:text-white transition-colors"
              >
                Private Concierge Advisory
              </button>
            </li>
            <li>
              <span className="text-zinc-500">Bespoke Tailoring & Measurements</span>
            </li>
            <li>
              <span className="text-zinc-500">White-Glove Sub-Orbital Delivery</span>
            </li>
          </ul>
        </div>

        {/* Standards & Seal */}
        <div className="space-y-4">
          <h4 className="font-luxury font-bold text-white text-xs tracking-widest uppercase">
            AUTHENTICITY
          </h4>
          <div className="p-4 bg-[#111115] border border-white/5 rounded-xl space-y-1.5 text-[11px]">
            <strong className="text-white font-luxury block">Enclave Verified</strong>
            <p className="text-zinc-400 font-light leading-relaxed">
              Every creation is registered with cryptographic authenticity verified across sovereign 2060 registries.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="w-full py-2.5 rounded-full bg-[#121216] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white text-xs font-sans flex items-center justify-center gap-1.5 transition-all"
          >
            <ArrowUp size={13} />
            <span>Return to Top</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-luxury text-zinc-500 gap-2">
        <span>© 2060 VALKYRIE PAVILION MEGAMALL. ALL RIGHTS RESERVED.</span>
        <span>YEAR 2060 LUXURY COLLECTION</span>
      </div>
    </footer>
  );
};
