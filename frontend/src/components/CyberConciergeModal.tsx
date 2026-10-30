import React, { useState } from 'react';
import { useMall } from '../context/MallContext';
import { api } from '../api';
import { cyberAudio } from '../utils/cyberAudio';
import type { Product } from '../types';
import { Send, X, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  products?: Product[];
  timestamp: string;
}

export const CyberConciergeModal: React.FC = () => {
  const { openConcierge, setOpenConcierge, setInspectProduct, addToCart } = useMall();
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'concierge',
      text: "Good evening. Welcome to the Valkyrie Private Client Advisory for 2060. I am your senior style director. Whether you require footwear for zero-gravity galas, molecular silks, or sub-zero technical outerwear, how may I assist your wardrobe today?",
      timestamp: '2060-10-30T20:48:00'
    }
  ]);

  const quickPrompts = [
    "Footwear for zero-gravity gala",
    "Bespoke evening gown recommendations",
    "Technical extreme weather outerwear",
    "Galleria Decks & Salon Directory",
    "Private Client payment methods"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    cyberAudio.playClick();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const response = await api.askConcierge(text);
      cyberAudio.playSuccess();
      const conciergeMsg: ChatMessage = {
        id: `c-${Date.now()}`,
        sender: 'concierge',
        text: response.reply,
        products: response.recommendedProducts,
        timestamp: response.timestamp
      };
      setMessages(prev => [...prev, conciergeMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `c-${Date.now()}`,
        sender: 'concierge',
        text: "Private Client desk connected: I recommend inspecting the Grav-Drift MagneKicks (Deck 02), the Bioluminescent Holo-Silk Gown (Deck 03), or our Apex-Shield Plasma Puffer (Deck 04).",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!openConcierge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
      <div className="relative w-full max-w-2xl bg-[#0e0e12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#141418] border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-luxury font-bold text-white text-base tracking-wider">
                VALKYRIE PRIVATE CLIENT CONCIERGE
              </h3>
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            </div>
            <p className="text-[11px] font-mono-luxury text-zinc-400">
              Senior Styling Director · Available 24/7
            </p>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenConcierge(false);
            }}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-2.5 bg-[#0a0a0d] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs font-sans">
          <span className="text-[10px] font-mono-luxury text-zinc-500 whitespace-nowrap uppercase">
            QUERIES:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1 rounded-full border border-white/5 bg-[#141418] text-zinc-300 hover:text-[#d4af37] hover:border-[#d4af37]/30 text-[11px] whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'concierge' && (
                <div className="w-8 h-8 rounded-full bg-[#18181f] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] font-luxury font-bold text-xs flex-shrink-0 mt-1">
                  V
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-white text-black font-medium rounded-tr-none'
                    : 'bg-[#141418] border border-white/5 text-zinc-200 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>

                {/* Recommended Product Cards */}
                {m.products && m.products.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <span className="text-[10px] font-mono-luxury text-[#d4af37] block uppercase tracking-wider">
                      CURATED SELECTIONS FOR YOU:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.products.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-2.5 p-2 bg-[#09090b] border border-white/5 rounded-xl hover:border-white/20 transition-all"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-luxury font-semibold text-[11px] text-white truncate">{p.name}</h4>
                            <span className="text-[11px] font-mono-luxury text-[#d4af37]">
                              ${p.priceUSD.toLocaleString()}
                            </span>
                            <div className="flex gap-2 mt-1">
                              <button
                                onClick={() => {
                                  cyberAudio.playClick();
                                  setInspectProduct(p);
                                }}
                                className="text-[10px] text-zinc-400 hover:text-white underline"
                              >
                                View 3D
                              </button>
                              <button
                                onClick={() => addToCart(p)}
                                className="text-[10px] text-[#d4af37] hover:underline"
                              >
                                Add to Bag
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 flex-shrink-0 mt-1">
                  <User size={14} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-mono-luxury text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
              <span>Styling director consulting salon archives...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#141418] border-t border-white/5 flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your inquiry for the styling director..."
            className="flex-1 bg-[#09090b] border border-white/10 focus:border-[#d4af37]/60 rounded-full px-5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || loading}
            className="p-2.5 rounded-full bg-white text-black font-semibold hover:bg-[#f4ebd0] disabled:opacity-40 transition-all"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
