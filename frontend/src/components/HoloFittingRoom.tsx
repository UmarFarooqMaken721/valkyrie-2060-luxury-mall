import React, { useState, useEffect, useRef } from 'react';
import { useMall } from '../context/MallContext';
import type { Product } from '../types';
import { api } from '../api';
import { cyberAudio } from '../utils/cyberAudio';
import { X, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

export const HoloFittingRoom: React.FC = () => {
  const { openTryOn, setOpenTryOn, addToCart } = useMall();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedShoe, setSelectedShoe] = useState<Product | null>(null);
  const [selectedCloth, setSelectedCloth] = useState<Product | null>(null);
  const [selectedJacket, setSelectedJacket] = useState<Product | null>(null);

  const [paletteMode, setPaletteMode] = useState<'champagne' | 'platinum' | 'noir'>('champagne');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<{
    silhouetteBalance: string;
    drapeFlow: string;
    thermalShield: string;
    ensembleSynergy: number;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (openTryOn) {
      api.getProducts().then(prods => {
        setAllProducts(prods);
        const shoes = prods.filter(p => p.category === 'shoes');
        const clothes = prods.filter(p => p.category === 'clothes');
        const jackets = prods.filter(p => p.category === 'jackets');

        if (!selectedShoe && shoes.length > 0) setSelectedShoe(shoes[0]);
        if (!selectedCloth && clothes.length > 0) setSelectedCloth(clothes[0]);
        if (!selectedJacket && jackets.length > 0) setSelectedJacket(jackets[0]);
      });
    }
  }, [openTryOn]);

  useEffect(() => {
    if (!openTryOn) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      time += 0.02;
      const cx = width / 2;
      const cy = height / 2 + 10;

      const mainColor = paletteMode === 'champagne' ? '#d4af37' : paletteMode === 'platinum' ? '#e4e4e7' : '#71717a';

      // 1. Minimalist Circular Mirror Pedestal
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, height - 35, 80, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 2. High-Fashion Mannequin Wireframe Silhouette
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 1.5;

      // Head
      ctx.beginPath();
      ctx.ellipse(cx, cy - 130, 18, 24, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Neck & Shoulder lines
      ctx.beginPath();
      ctx.moveTo(cx - 32, cy - 95);
      ctx.lineTo(cx + 32, cy - 95);
      ctx.lineTo(cx + 22, cy);
      ctx.lineTo(cx - 22, cy);
      ctx.closePath();
      ctx.stroke();

      // Jacket Layer
      if (selectedJacket) {
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - 36, cy - 98, 72, 85);
        ctx.beginPath();
        ctx.moveTo(cx - 18, cy - 98);
        ctx.lineTo(cx, cy - 70);
        ctx.lineTo(cx + 18, cy - 98);
        ctx.stroke();
      }

      // Clothing / Dress Layer
      if (selectedCloth) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(cx - 22, cy);
        ctx.lineTo(cx + 22, cy);
        ctx.lineTo(cx + 34, cy + 90);
        ctx.lineTo(cx - 34, cy + 90);
        ctx.closePath();
        ctx.stroke();
      }

      // Footwear Layer
      if (selectedShoe) {
        ctx.strokeStyle = '#c5a880';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(cx - 32, cy + 96, 24, 16);
        ctx.strokeRect(cx + 8, cy + 96, 24, 16);
      }

      // Elegant Dust Motes
      for (let i = 0; i < 12; i++) {
        const px = cx + Math.sin(time + i) * (45 + i * 2);
        const py = cy - 120 + (i * 18);
        ctx.fillStyle = mainColor;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Subtle Scanning Light
      if (isAnalyzing) {
        const lineY = 40 + (height - 80) * (analysisProgress / 100);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - 70, lineY);
        ctx.lineTo(cx + 70, lineY);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [openTryOn, selectedShoe, selectedCloth, selectedJacket, paletteMode, isAnalyzing, analysisProgress]);

  const runSilhouetteAnalysis = () => {
    setIsAnalyzing(true);
    cyberAudio.playScan();
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          cyberAudio.playSuccess();
          setAnalysisResults({
            silhouetteBalance: 'Architectural Equilibrium 99.8%',
            drapeFlow: 'Fluid Zero-G Cascade',
            thermalShield: 'Climate Adaptive Standard',
            ensembleSynergy: 98
          });
          return 100;
        }
        return prev + 6;
      });
    }, 50);
  };

  const shoesList = allProducts.filter(p => p.category === 'shoes');
  const clothesList = allProducts.filter(p => p.category === 'clothes');
  const jacketsList = allProducts.filter(p => p.category === 'jackets');

  const totalOutfitUSD = (selectedShoe?.priceUSD || 0) + (selectedCloth?.priceUSD || 0) + (selectedJacket?.priceUSD || 0);
  const bundleDiscountUSD = Math.floor(totalOutfitUSD * 0.9);

  const handleAddBundleToCart = () => {
    if (selectedShoe) addToCart(selectedShoe, 1, 'Standard Calibration', paletteMode);
    if (selectedCloth) addToCart(selectedCloth, 1, 'Bespoke Tailored', paletteMode);
    if (selectedJacket) addToCart(selectedJacket, 1, 'Standard Drape', paletteMode);
    cyberAudio.playSuccess();
    toast.success('Curated 3-Piece Ensemble added to Client Bag', {
      style: { background: '#121216', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)' }
    });
  };

  if (!openTryOn) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
      <div className="relative w-full max-w-5xl bg-[#0e0e12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-8 py-5 bg-[#121217] border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="font-luxury font-bold text-lg sm:text-xl text-white tracking-wider">
              BESPOKE VIRTUAL STYLING SUITE
            </h2>
            <p className="text-[11px] font-mono-luxury text-zinc-400">
              VALKYRIE ATELIER · 2060 ENSEMBLE CURATION
            </p>
          </div>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenTryOn(false);
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto p-6 sm:p-8 gap-8 font-sans">
          {/* Left Column: Selectors */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono-luxury uppercase text-zinc-400 tracking-wider">
              SELECT WARDROBE LAYERS
            </h3>

            {/* 1. Shoes */}
            <div className="p-4 bg-[#141418] border border-white/5 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono-luxury text-zinc-400 uppercase">1. Footwear Atelier</span>
                <span className="font-luxury font-bold text-[#d4af37]">${selectedShoe?.priceUSD.toLocaleString()}</span>
              </div>
              <select
                value={selectedShoe?.id || ''}
                onChange={(e) => {
                  cyberAudio.playClick();
                  const found = shoesList.find(p => p.id === e.target.value);
                  if (found) setSelectedShoe(found);
                }}
                className="w-full bg-[#0a0a0d] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                {shoesList.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} (${s.priceUSD.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Clothes */}
            <div className="p-4 bg-[#141418] border border-white/5 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono-luxury text-zinc-400 uppercase">2. Haute Couture</span>
                <span className="font-luxury font-bold text-[#d4af37]">${selectedCloth?.priceUSD.toLocaleString()}</span>
              </div>
              <select
                value={selectedCloth?.id || ''}
                onChange={(e) => {
                  cyberAudio.playClick();
                  const found = clothesList.find(p => p.id === e.target.value);
                  if (found) setSelectedCloth(found);
                }}
                className="w-full bg-[#0a0a0d] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                {clothesList.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} (${c.priceUSD.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Outerwear */}
            <div className="p-4 bg-[#141418] border border-white/5 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono-luxury text-zinc-400 uppercase">3. Outerwear Bastion</span>
                <span className="font-luxury font-bold text-[#d4af37]">${selectedJacket?.priceUSD.toLocaleString()}</span>
              </div>
              <select
                value={selectedJacket?.id || ''}
                onChange={(e) => {
                  cyberAudio.playClick();
                  const found = jacketsList.find(p => p.id === e.target.value);
                  if (found) setSelectedJacket(found);
                }}
                className="w-full bg-[#0a0a0d] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                {jacketsList.map(j => (
                  <option key={j.id} value={j.id}>
                    {j.name} (${j.priceUSD.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Finish Tone */}
            <div className="p-4 bg-[#141418] border border-white/5 rounded-xl space-y-2">
              <label className="text-[11px] font-mono-luxury text-zinc-400 uppercase block">
                Illumination Atmosphere:
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'champagne', name: 'Atelier Gold' },
                  { id: 'platinum', name: 'Platinum' },
                  { id: 'noir', name: 'Obsidian' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPaletteMode(t.id as any)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      paletteMode === t.id
                        ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                        : 'border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: High-Fashion Mannequin */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#0a0a0d] border border-white/5 rounded-2xl p-6 relative">
            <div className="absolute top-4 left-4 text-[10px] font-mono-luxury text-zinc-500 uppercase">
              STUDIO MIRROR · SALON 04
            </div>

            <canvas
              ref={canvasRef}
              width={340}
              height={360}
              className="w-full max-w-[340px] h-[360px] object-contain"
            />

            <button
              onClick={runSilhouetteAnalysis}
              disabled={isAnalyzing}
              className="mt-3 w-full max-w-xs py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ebd0] transition-all disabled:opacity-50"
            >
              {isAnalyzing ? `Analyzing Proportions ${analysisProgress}%` : 'Analyze Silhouette Harmony'}
            </button>
          </div>

          {/* Right Column: Harmony Diagnostics & Ensemble Order */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-mono-luxury uppercase text-zinc-400 tracking-wider">
                HARMONY METRICS
              </h3>

              {analysisResults ? (
                <div className="p-4 bg-[#141418] border border-white/10 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[#d4af37] font-semibold">
                    <CheckCircle2 size={16} />
                    <span>Harmony Verified</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono-luxury">PROPORTIONS:</span>
                    <strong className="text-white">{analysisResults.silhouetteBalance}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono-luxury">DRAPE FLOW:</span>
                    <strong className="text-white">{analysisResults.drapeFlow}</strong>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                    <span className="text-zinc-400 font-luxury">SYNERGY SCORE:</span>
                    <span className="text-base text-[#d4af37] font-bold">{analysisResults.ensembleSynergy}/100</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-[#141418]/60 border border-white/5 rounded-xl text-center text-xs text-zinc-400 space-y-2">
                  <Sparkles size={20} className="mx-auto text-zinc-600" />
                  <p>Engage harmony analysis to inspect architectural proportions.</p>
                </div>
              )}
            </div>

            {/* Ensemble Checkout Box */}
            <div className="p-5 bg-[#141418] border border-white/10 rounded-xl space-y-4">
              <div className="text-xs text-zinc-400 flex justify-between">
                <span>Individual Value:</span>
                <span className="line-through text-zinc-600">${totalOutfitUSD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-luxury text-xs text-white">Curated Ensemble:</span>
                <span className="font-luxury font-bold text-xl text-[#d4af37]">
                  ${bundleDiscountUSD.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono-luxury">
                Includes 10% Client Courtesy Privilege
              </p>

              <button
                onClick={handleAddBundleToCart}
                className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ebd0] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                <span>Acquire Complete Ensemble</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
