import React from 'react';
import { useMall } from '../context/MallContext';
import { cyberAudio } from '../utils/cyberAudio';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Feather, Layers } from 'lucide-react';

export const CyberHero: React.FC = () => {
  const { setSelectedCategory, setOpenTryOn, setActiveFloor } = useMall();

  const marqueeItems = [
    'VALKYRIE 2060 ARCHIVE',
    'PARIS HAUTE COUTURE',
    'NEO-TOKYO SECTOR ALPHA',
    'ORBITAL PAVILION 07',
    'GENÈVE ATELIERS',
    'MILANO SARTORIAL',
    'WHITE-GLOVE AIR-CARRIER',
    'ENCLAVE QUANTUM CIPHER'
  ];

  return (
    <div className="relative w-full overflow-hidden pt-10 pb-16 px-6 sm:px-8 border-b border-white/5 bg-gradient-to-b from-[#0c0c10] via-[#09090b] to-[#09090b]">
      {/* Infinite Smooth Editorial Marquee */}
      <div className="w-full overflow-hidden border-b border-white/5 py-2.5 mb-10 -mx-6 sm:-mx-8">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap text-[11px] font-mono-luxury tracking-[0.25em] text-zinc-500">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span className="hover:text-[#d4af37] transition-colors">{item}</span>
              <span className="text-[#d4af37]/40">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Subtle Atelier Tag */}
          <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-white/10 bg-[#121216] text-[11px] font-mono-luxury tracking-[0.25em] text-zinc-400 mb-8 uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            <span>PAVILION ALPHA // 2060 COUTURE ARCHIVE</span>
          </div>

          {/* High-Fashion Editorial Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl tracking-wide text-white max-w-4xl leading-[1.12] font-normal">
            The Architecture of <span className="italic font-editorial gold-gradient-text">Contemporary Luxury</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm sm:text-base text-zinc-400 font-sans tracking-wide leading-relaxed font-light">
            Welcome to <strong className="text-zinc-200 font-medium">VALKYRIE 2060</strong>. Discover atomic-engineered liquid silks, magnetic-levitation footwear, and plasma-shielded outerwear curated across three dedicated luxury salons.
          </p>

          {/* Minimalist Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                cyberAudio.playClick();
                setOpenTryOn(true);
              }}
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#f4ebd0] active:scale-95 transition-all flex items-center gap-2.5 shadow-xl"
            >
              <Sparkles size={14} className="text-[#d4af37]" />
              <span>Enter Fitting Salon</span>
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick();
                setSelectedCategory('all');
                setActiveFloor(0);
              }}
              className="px-8 py-3.5 rounded-full border border-white/20 bg-transparent hover:border-[#d4af37]/60 hover:bg-white/5 text-zinc-200 hover:text-white font-medium text-xs tracking-widest uppercase transition-all flex items-center gap-2"
            >
              <Compass size={14} />
              <span>Explore The Galleria</span>
            </button>
          </div>

          {/* Three Refined Editorial Department Portals */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl text-left">
            {/* Department 1: Footwear */}
            <div
              onClick={() => {
                cyberAudio.playHover();
                setSelectedCategory('shoes');
                setActiveFloor(2);
              }}
              className="group cursor-pointer luxury-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between h-[380px] relative"
            >
              <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
                  alt="Footwear"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-[#0c0c0f]/80 to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-mono-luxury tracking-[0.2em] text-[#d4af37] uppercase">
                  SALON 01 · DECK 02
                </span>
                <h3 className="font-luxury font-bold text-2xl text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                  KINETIC FOOTWEAR
                </h3>
                <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  Magnetic levitation soles, kinetic shock absorption, and sapphire crystal stilettos engineered for effortless stride.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-zinc-300 font-sans pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono-luxury text-zinc-500">4 ATELIER EDITIONS</span>
                <span className="flex items-center gap-1.5 text-white font-medium group-hover:text-[#d4af37] transition-colors">
                  <span>Explore Salon</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Department 2: Clothes */}
            <div
              onClick={() => {
                cyberAudio.playHover();
                setSelectedCategory('clothes');
                setActiveFloor(3);
              }}
              className="group cursor-pointer luxury-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between h-[380px] relative"
            >
              <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
                  alt="Clothes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-[#0c0c0f]/80 to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-mono-luxury tracking-[0.2em] text-[#d4af37] uppercase">
                  SALON 02 · DECK 03
                </span>
                <h3 className="font-luxury font-bold text-2xl text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                  HAUTE COUTURE
                </h3>
                <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  Monolayer graphene tuxedos, bioluminescent starlight evening gowns, and zero-gravity adaptive silk drapes.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-zinc-300 font-sans pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono-luxury text-zinc-500">4 BESPOKE PIECES</span>
                <span className="flex items-center gap-1.5 text-white font-medium group-hover:text-[#d4af37] transition-colors">
                  <span>Explore Salon</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Department 3: Jackets */}
            <div
              onClick={() => {
                cyberAudio.playHover();
                setSelectedCategory('jackets');
                setActiveFloor(4);
              }}
              className="group cursor-pointer luxury-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between h-[380px] relative"
            >
              <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700">
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
                  alt="Jackets"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-[#0c0c0f]/80 to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-mono-luxury tracking-[0.2em] text-[#d4af37] uppercase">
                  SALON 03 · DECK 04
                </span>
                <h3 className="font-luxury font-bold text-2xl text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                  EXO-OUTERWEAR
                </h3>
                <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  Plasma-boundary winter puffers, radar-absorbing stealth trench coats, and aerospace bionic leather bombers.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-zinc-300 font-sans pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono-luxury text-zinc-500">4 OUTER PIECES</span>
                <span className="flex items-center gap-1.5 text-white font-medium group-hover:text-[#d4af37] transition-colors">
                  <span>Explore Salon</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>

          {/* Three Luxury Pillars / Maison Guarantees */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl pt-10 border-t border-white/5 text-left">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#d4af37] flex-shrink-0">
                <Feather size={16} />
              </div>
              <div>
                <h4 className="text-xs font-luxury font-bold text-white tracking-wider">
                  ATOMIC-ENGINEERED DRAPE
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed font-sans">
                  Liquid graphene and chameleon silks tailored to molecular body proportions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#d4af37] flex-shrink-0">
                <Layers size={16} />
              </div>
              <div>
                <h4 className="text-xs font-luxury font-bold text-white tracking-wider">
                  KINETIC SUSPENSION
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed font-sans">
                  Magnetic levitation soles and energy-harvesting heels for zero-effort stride.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#d4af37] flex-shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-luxury font-bold text-white tracking-wider">
                  QUANTUM CIPHER CUSTODY
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed font-sans">
                  Every acquisition authenticated with Enclave 2060 cryptographic custody.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
