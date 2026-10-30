import React, { useState, useEffect } from 'react';
import { useMall } from '../context/MallContext';
import { api } from '../api';
import { cyberAudio } from '../utils/cyberAudio';
import { X, Truck, Navigation, Search } from 'lucide-react';

export const DroneTrackingModal: React.FC = () => {
  const { openOrdersTracker, setOpenOrdersTracker, activeOrder } = useMall();
  const [orderQuery, setOrderQuery] = useState('');
  const [currentOrder, setCurrentOrder] = useState<any>(activeOrder);
  const [altitude, setAltitude] = useState(14820);
  const [velocity, setVelocity] = useState(4.2);

  useEffect(() => {
    if (activeOrder) {
      setCurrentOrder(activeOrder);
      setOrderQuery(activeOrder.orderNumber);
    }
  }, [activeOrder]);

  useEffect(() => {
    if (!openOrdersTracker) return;
    const interval = setInterval(() => {
      setAltitude(prev => Math.floor(prev + (Math.random() * 40 - 20)));
      setVelocity(prev => Number((prev + (Math.random() * 0.04 - 0.02)).toFixed(2)));
    }, 2500);
    return () => clearInterval(interval);
  }, [openOrdersTracker]);

  const handleLookup = async () => {
    if (!orderQuery.trim()) return;
    cyberAudio.playClick();
    try {
      const ord = await api.getOrderById(orderQuery.trim());
      setCurrentOrder(ord);
      cyberAudio.playSuccess();
    } catch {
      // Keep existing
    }
  };

  if (!openOrdersTracker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl font-sans">
      <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-[#141418] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/5 text-[#d4af37] border border-white/10">
              <Truck size={16} />
            </div>
            <div>
              <h3 className="font-luxury font-bold text-white text-base tracking-wider">
                CONSIGNMENT RADAR TRACKING
              </h3>
              <p className="text-[11px] font-mono-luxury text-zinc-400">
                WHITE-GLOVE DISPATCH PROTOCOL · YEAR 2060
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenOrdersTracker(false);
            }}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-[#0a0a0d] border-b border-white/5 flex items-center gap-2">
          <input
            type="text"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Consignment Reference (e.g. NV-2060-88190X)"
            className="flex-1 bg-[#141418] border border-white/10 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono-luxury"
          />
          <button
            onClick={handleLookup}
            className="px-5 py-2 bg-white text-black hover:bg-[#f4ebd0] text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all"
          >
            <Search size={12} />
            <span>Locate</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Refined Trajectory HUD */}
          <div className="relative w-full h-44 rounded-xl bg-[#09090b] border border-white/5 overflow-hidden flex items-center justify-center">
            {/* Fine Minimalist Radar Rings */}
            <div className="absolute inset-4 rounded-full border border-white/5" />
            <div className="absolute inset-14 rounded-full border border-white/10" />
            <div className="absolute inset-24 rounded-full border border-[#d4af37]/20" />

            {/* Crosshair */}
            <div className="absolute w-full h-[1px] bg-white/5" />
            <div className="absolute h-full w-[1px] bg-white/5" />

            {/* Target Blip */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                <Navigation size={11} />
              </div>
              <span className="mt-2 text-[10px] font-mono-luxury text-zinc-300 bg-black/80 px-2.5 py-0.5 rounded-full border border-white/10">
                SUB-ORBITAL ESCORT · MACH {velocity}
              </span>
            </div>

            <div className="absolute top-3 left-4 text-[9px] font-mono-luxury text-zinc-500">
              SECTOR: 35.6762°N, 139.6503°E
            </div>
            <div className="absolute bottom-3 right-4 text-[9px] font-mono-luxury text-[#d4af37]">
              ALTITUDE: {altitude.toLocaleString()} M
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono-luxury text-zinc-400 uppercase tracking-wider">
              CONSIGNMENT STATUS:
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono-luxury">
              {[
                { title: '1. PREPARATION', status: 'Atelier Vault', done: true },
                { title: '2. EN ROUTE', status: 'Sub-Orbital', active: true },
                { title: '3. APPROACH', status: 'Final Descent', upcoming: true },
                { title: '4. DELIVERED', status: 'Personal Suite', upcoming: true }
              ].map((st, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border ${
                    st.done
                      ? 'border-[#d4af37]/40 bg-[#d4af37]/5 text-[#d4af37]'
                      : st.active
                      ? 'border-white text-white bg-white/5'
                      : 'border-white/5 text-zinc-600'
                  }`}
                >
                  <strong className="block text-[11px] font-luxury">{st.title}</strong>
                  <span className="text-[9px] text-zinc-400">{st.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consignment Specs */}
          {currentOrder && (
            <div className="p-4 bg-[#141418] border border-white/5 rounded-xl space-y-2.5 font-mono-luxury">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">CONSIGNMENT REF:</span>
                <span className="text-[#d4af37] font-bold">{currentOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">DESTINATION:</span>
                <span className="text-white">{currentOrder.teleportCoordinates}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">SERVICE LEVEL:</span>
                <span className="text-zinc-300">{currentOrder.deliveryMode}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
