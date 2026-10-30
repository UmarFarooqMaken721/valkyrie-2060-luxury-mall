import React, { useState, useEffect } from 'react';
import { useMall } from '../context/MallContext';
import { cyberAudio } from '../utils/cyberAudio';
import { MessageSquare, Sparkles } from 'lucide-react';

export const MallTelemetryBar: React.FC = () => {
  const { setOpenConcierge, setOpenTryOn } = useMall();

  const newsFeed = [
    "Private Client #8821 acquired Grav-Drift MagneKicks V9 at Footwear Atelier",
    "Bioluminescent Holo-Silk Gown prepared for the 2060 Met Gala Exhibition",
    "Apex-Shield Plasma Puffer dispatched via White-Glove Sub-Orbital Courier",
    "Deck 03 Haute Couture Salon welcomes new Bespoke Liquid Graphene additions",
    "Deck 05 Sovereign Lounge private styling suites currently open for consultation"
  ];

  const [activeFeedIndex, setActiveFeedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeedIndex(prev => (prev + 1) % newsFeed.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [newsFeed.length]);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#09090b]/95 backdrop-blur-xl border-t border-white/5 px-6 py-2.5 flex items-center justify-between text-xs font-sans shadow-xl">
      {/* Feed */}
      <div className="flex items-center gap-3 overflow-hidden flex-1 max-w-2xl mr-4">
        <span className="text-[10px] font-mono-luxury text-[#d4af37] tracking-wider uppercase flex-shrink-0">
          DISPATCH BULLETIN:
        </span>
        <p className="text-zinc-300 truncate text-xs font-light">
          {newsFeed[activeFeedIndex]}
        </p>
      </div>

      {/* Quick Launch Buttons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => {
            cyberAudio.playClick();
            setOpenTryOn(true);
          }}
          className="px-3.5 py-1 rounded-full border border-white/10 hover:border-[#d4af37] text-zinc-300 hover:text-white text-xs font-sans flex items-center gap-1.5 transition-all"
        >
          <Sparkles size={12} className="text-[#d4af37]" />
          <span className="hidden sm:inline">Fitting Salon</span>
        </button>

        <button
          onClick={() => {
            cyberAudio.playClick();
            setOpenConcierge(true);
          }}
          className="px-3.5 py-1 rounded-full bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-[#f4ebd0] transition-all"
        >
          <MessageSquare size={12} />
          <span className="hidden sm:inline">Private Concierge</span>
        </button>
      </div>
    </div>
  );
};
