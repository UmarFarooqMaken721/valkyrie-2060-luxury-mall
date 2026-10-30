import React from 'react';
import { useMall } from '../context/MallContext';
import { ArrowUpRight } from 'lucide-react';

export const FloorNavigator: React.FC = () => {
  const { activeFloor, setActiveFloor, mallInfo } = useMall();

  const floors = mallInfo?.floors || [
    { floor: 1, name: "Deck 01: Grand Reception", theme: "Arrivals & Sovereign Concierge", description: "Central marble reception, private lounges, and white-glove client escort.", shopsCount: 6 },
    { floor: 2, name: "Deck 02: Footwear Atelier", theme: "Kinetic & Anti-Gravity Architecture", description: "Magnetic levitation soles, kinetic shock absorbers, and sapphire crystal stilettos.", shopsCount: 8 },
    { floor: 3, name: "Deck 03: Haute Couture Salon", theme: "Molecular Silks & Programmable Gowns", description: "Liquid graphene eveningwear, starlight bioluminescent silks, and adaptive velvet.", shopsCount: 10 },
    { floor: 4, name: "Deck 04: Technical Outerwear", theme: "Plasma Shielding & Aerogel Insulation", description: "Sub-zero expedition puffers, radar-absorbing trenches, and aerospace bombers.", shopsCount: 7 },
    { floor: 5, name: "Deck 05: Sovereign Skydeck", theme: "Private Client Vault & Rare 1-of-1s", description: "Private salon appointments, bespoke tailoring, and champagne lounge.", shopsCount: 4 }
  ];

  return (
    <div className="w-full bg-[#0a0a0d] border-y border-white/5 py-10 px-6 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono-luxury text-zinc-500 uppercase tracking-widest">
              VERTICAL ARCHITECTURAL TRANSIT
            </span>
            <h2 className="font-luxury font-bold text-2xl text-white mt-1">
              GALLERIA DECKS
            </h2>
          </div>

          <button
            onClick={() => setActiveFloor(0)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono-luxury uppercase transition-all ${
              activeFloor === 0
                ? 'bg-white text-black font-semibold'
                : 'bg-[#141418] text-zinc-400 border border-white/5 hover:text-white'
            }`}
          >
            All Decks (Panoramic)
          </button>
        </div>

        {/* 5-Deck Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {floors.map((fl) => {
            const isSelected = activeFloor === fl.floor;
            return (
              <div
                key={fl.floor}
                onClick={() => setActiveFloor(fl.floor)}
                className={`group cursor-pointer p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#18181f] border-[#d4af37] shadow-xl'
                    : 'bg-[#111115] border-white/5 hover:border-white/20 hover:bg-[#141418]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-luxury mb-3">
                    <span className={isSelected ? 'text-[#d4af37] font-bold' : 'text-zinc-500'}>
                      DECK 0{fl.floor}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    )}
                  </div>

                  <h4 className="font-luxury font-bold text-sm text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
                    {fl.name.replace(/Deck \d+: /, '')}
                  </h4>

                  <p className="text-[11px] text-[#d4af37] mt-1 font-editorial italic line-clamp-1">
                    {fl.theme}
                  </p>

                  <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-light">
                    {fl.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-luxury">
                  <span className="text-zinc-500">{fl.shopsCount} ATELIERS</span>
                  <span className={`flex items-center gap-0.5 ${isSelected ? 'text-[#d4af37]' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    <span>{isSelected ? 'ACTIVE' : 'TRANSIT'}</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
