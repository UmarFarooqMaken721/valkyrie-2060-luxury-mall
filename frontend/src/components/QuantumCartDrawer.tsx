import React, { useState } from 'react';
import { useMall } from '../context/MallContext';
import { api } from '../api';
import { cyberAudio } from '../utils/cyberAudio';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Truck,
  ShieldCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

export const QuantumCartDrawer: React.FC = () => {
  const {
    openCart,
    setOpenCart,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotalUSD,
    setActiveOrder,
    setOpenOrdersTracker
  } = useMall();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [recipientName, setRecipientName] = useState('Lady Sarah Montgomery');
  const [teleportDock, setTeleportDock] = useState('Private Spire Penthouse Pad #08');
  const [deliveryMode, setDeliveryMode] = useState<any>('Sub-Orbital Hypersonic Escort');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  const startAuthorization = () => {
    setIsAuthorizing(true);
    cyberAudio.playScan();
    setAuthProgress(0);

    const interval = setInterval(async () => {
      setAuthProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeCheckout();
          return 100;
        }
        return prev + 12;
      });
    }, 100);
  };

  const completeCheckout = async () => {
    try {
      const orderItems = cart.map(it => ({
        productId: it.product.id,
        name: it.product.name,
        category: it.product.category,
        priceCredits: it.product.priceCredits,
        quantity: it.quantity,
        selectedSize: it.selectedSize,
        selectedColorMode: it.selectedColorMode,
        image: it.product.image
      }));

      const order = await api.createOrder({
        items: orderItems,
        recipientName,
        teleportCoordinates: teleportDock,
        deliveryMode
      });

      cyberAudio.playSuccess();
      setCreatedOrder(order);
      setActiveOrder(order);
      clearCart();
      setCheckoutStep('success');
      toast.success('Acquisition Confirmed: Consignment Dispatched', {
        style: { background: '#121216', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)' }
      });
    } catch {
      toast.error('Failed to authenticate transaction');
      setIsAuthorizing(false);
    }
  };

  if (!openCart) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0e0e12] border-l border-white/10 shadow-2xl h-full flex flex-col overflow-hidden font-sans">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-[#141418] border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="font-luxury font-bold text-white text-base tracking-wider">
              CLIENT BAG
            </h3>
            <p className="text-[10px] font-mono-luxury text-zinc-400">
              {cartCount} CURATED CREATIONS
            </p>
          </div>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setOpenCart(false);
              setCheckoutStep('cart');
            }}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                    <ShoppingBag size={24} />
                  </div>
                  <h4 className="font-luxury text-white text-base mb-1">Your Bag is Empty</h4>
                  <p className="text-xs max-w-xs mb-6 text-zinc-500 leading-relaxed">
                    Explore our Footwear, Haute Couture, or Outerwear salons to acquire pieces for your wardrobe.
                  </p>
                  <button
                    onClick={() => setOpenCart(false)}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ebd0] transition-all"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${idx}`}
                      className="p-3 bg-[#141418] border border-white/5 rounded-xl flex gap-3.5"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-luxury font-bold text-xs text-white truncate">{item.product.name}</h4>
                          <span className="text-[11px] font-mono-luxury text-zinc-400 block mt-0.5">
                            {item.selectedSize}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="font-luxury font-semibold text-xs text-[#d4af37]">
                            ${(item.product.priceUSD * item.quantity).toLocaleString()}
                          </span>

                          <div className="flex items-center gap-2 bg-[#09090b] border border-white/10 rounded-full px-2 py-0.5 text-xs">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-zinc-400 hover:text-white"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-mono-luxury text-white px-1 text-[11px]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-zinc-400 hover:text-white"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-zinc-500 hover:text-rose-400 transition-colors"
                            title="Remove"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <div className="space-y-5 text-xs">
              <h4 className="font-luxury font-bold text-white text-sm tracking-wider uppercase">
                WHITE-GLOVE DISPATCH DETAILS
              </h4>

              <div className="p-4 bg-[#141418] border border-white/5 rounded-xl space-y-3.5">
                <div>
                  <label className="block text-[10px] font-mono-luxury text-zinc-400 mb-1 uppercase">
                    CLIENT NAME:
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#0a0a0d] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-luxury text-zinc-400 mb-1 uppercase">
                    DELIVERY SUITE / LOCATION:
                  </label>
                  <select
                    value={teleportDock}
                    onChange={(e) => setTeleportDock(e.target.value)}
                    className="w-full bg-[#0a0a0d] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Private Spire Penthouse Pad #08">Private Spire Penthouse Pad #08</option>
                    <option value="Deck 05 VIP Sovereign Lounge">Deck 05 VIP Sovereign Lounge</option>
                    <option value="Neo-Tokyo Central Embassy Residence">Neo-Tokyo Central Embassy Residence</option>
                    <option value="Geneva Diplomatic Airfield">Geneva Diplomatic Airfield</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-luxury text-zinc-400 mb-1 uppercase">
                    DISPATCH PROTOCOL:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('Sub-Orbital Hypersonic Escort')}
                      className={`p-2.5 rounded-lg border text-left text-xs ${
                        deliveryMode === 'Sub-Orbital Hypersonic Escort'
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                          : 'border-white/5 text-zinc-400'
                      }`}
                    >
                      <strong className="block text-[#d4af37]">Private Escort</strong>
                      15-Min White-Glove
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('Direct Private Teleport Suite')}
                      className={`p-2.5 rounded-lg border text-left text-xs ${
                        deliveryMode === 'Direct Private Teleport Suite'
                          ? 'border-white text-white bg-white/10'
                          : 'border-white/5 text-zinc-400'
                      }`}
                    >
                      <strong className="block text-white">Private Teleport</strong>
                      Instant Delivery
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#141418] border border-white/5 rounded-xl text-center space-y-3">
                <ShieldCheck size={26} className="mx-auto text-[#d4af37]" />
                <div>
                  <h5 className="font-luxury font-bold text-white text-xs tracking-wider">
                    CLIENT ENCLAVE SIGNATURE
                  </h5>
                  <p className="text-[10px] text-zinc-400 font-sans mt-0.5">
                    Encrypted client payment verification
                  </p>
                </div>

                {isAuthorizing ? (
                  <div className="space-y-1.5 pt-2">
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#d4af37] h-full transition-all duration-100"
                        style={{ width: `${authProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono-luxury text-[#d4af37]">
                      AUTHORIZING TRANSACTION {authProgress}%
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={startAuthorization}
                    className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ebd0] transition-all"
                  >
                    Confirm & Sign · ${cartTotalUSD.toLocaleString()}
                  </button>
                )}
              </div>
            </div>
          )}

          {checkoutStep === 'success' && createdOrder && (
            <div className="p-6 bg-[#141418] border border-white/10 rounded-2xl text-center space-y-4">
              <CheckCircle2 size={36} className="mx-auto text-[#d4af37]" />
              <div>
                <h4 className="font-luxury text-xl text-white">ACQUISITION VALIDATED</h4>
                <p className="text-xs text-[#d4af37] font-mono-luxury mt-0.5">{createdOrder.orderNumber}</p>
              </div>

              <div className="p-4 bg-[#0a0a0d] border border-white/5 rounded-xl text-left space-y-2 text-xs font-mono-luxury">
                <div className="flex justify-between">
                  <span className="text-zinc-500">RECIPIENT:</span>
                  <span className="text-white">{createdOrder.recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">DESTINATION:</span>
                  <span className="text-white">{createdOrder.teleportCoordinates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">TOTAL:</span>
                  <span className="text-[#d4af37] font-bold">${createdOrder.totalUSD}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setOpenCart(false);
                  setOpenOrdersTracker(true);
                }}
                className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ebd0] flex items-center justify-center gap-2"
              >
                <Truck size={14} />
                <span>Track Consignment Radar</span>
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && checkoutStep === 'cart' && (
          <div className="p-6 bg-[#141418] border-t border-white/5 space-y-4 text-xs">
            <div className="space-y-1.5 text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-luxury font-bold text-white">${cartTotalUSD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-500 text-[11px]">
                <span>White-Glove Courier Tariff:</span>
                <span className="text-emerald-400 font-mono-luxury">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-luxury font-bold">
                <span className="text-white">Estimated Total:</span>
                <span className="text-[#d4af37] text-base">${cartTotalUSD.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                cyberAudio.playClick();
                setCheckoutStep('checkout');
              }}
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ebd0] flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
