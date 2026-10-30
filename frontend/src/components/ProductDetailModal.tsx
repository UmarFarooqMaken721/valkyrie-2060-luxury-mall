import React, { useState } from 'react';
import { useMall } from '../context/MallContext';
import { HoloProduct3DCanvas } from './HoloProduct3DCanvas';
import { api } from '../api';
import { cyberAudio } from '../utils/cyberAudio';
import {
  X,
  Sparkles,
  ShoppingBag,
  Heart,
  Star,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ProductDetailModal: React.FC = () => {
  const {
    inspectProduct,
    setInspectProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setOpenTryOn
  } = useMall();

  const [activeTab, setActiveTab] = useState<'3d' | 'gallery'>('3d');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  if (!inspectProduct) return null;

  const currentImg = selectedImage || inspectProduct.image;
  const currentSize = selectedSize || (inspectProduct.category === 'shoes' ? 'US 10.5 / Quantum 44' : inspectProduct.category === 'clothes' ? 'Bespoke Medium' : 'Tailored 40L');

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error('Client name and review text required');
      return;
    }

    setIsSubmittingReview(true);
    cyberAudio.playClick();
    try {
      const res = await api.submitReview(inspectProduct.id, {
        userName: reviewName,
        comment: reviewComment,
        rating: 5,
        cyberAugmentation: 'Valkyrie Verified Client'
      });

      cyberAudio.playSuccess();
      toast.success('Client review verified & recorded', {
        style: { background: '#121216', color: '#d4af37', border: '1px solid rgba(212,175,55,0.4)' }
      });
      inspectProduct.reviews.unshift(res.review);
      inspectProduct.rating = res.updatedRating;
      inspectProduct.reviewsCount += 1;

      setReviewName('');
      setReviewComment('');
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto font-sans">
      <div className="relative w-full max-w-5xl bg-[#0e0e12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Header */}
        <div className="px-8 py-4 bg-[#141418] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono-luxury">
            <span className="text-[#d4af37] font-semibold uppercase">{inspectProduct.brand}</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-400">SALON DECK 0{inspectProduct.floor}</span>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              setInspectProduct(null);
            }}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto p-6 sm:p-8 gap-8">
          {/* Left Column: 3D Turntable / Lookbook */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            {/* Mode Switcher */}
            <div className="flex items-center justify-between bg-[#141418] p-1 rounded-xl border border-white/5 text-xs">
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveTab('3d');
                }}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === '3d'
                    ? 'bg-white text-black font-semibold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                3D Studio Model
              </button>
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveTab('gallery');
                }}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-white text-black font-semibold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Editorial Gallery
              </button>
            </div>

            {/* Visualizer Area */}
            {activeTab === '3d' ? (
              <div className="h-[360px] w-full">
                <HoloProduct3DCanvas
                  meshData={inspectProduct.meshData}
                  productName={inspectProduct.name}
                  category={inspectProduct.category}
                  interactive={true}
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative h-[320px] w-full rounded-xl overflow-hidden bg-[#0c0c0f]">
                  <img
                    src={currentImg}
                    alt={inspectProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {inspectProduct.gallery && inspectProduct.gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {inspectProduct.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border transition-all ${
                          currentImg === img ? 'border-[#d4af37] scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Materiality Table */}
            <div className="p-5 bg-[#141418] border border-white/5 rounded-xl space-y-3">
              <h4 className="font-luxury text-xs text-white uppercase tracking-wider">
                MATERIALITY & ATOMIC SPECIFICATIONS
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#0a0a0d] rounded-lg border border-white/5">
                  <span className="text-zinc-500 block text-[10px] font-mono-luxury uppercase">Composition:</span>
                  <span className="text-zinc-200 font-medium">{inspectProduct.specs.material}</span>
                </div>
                <div className="p-3 bg-[#0a0a0d] rounded-lg border border-white/5">
                  <span className="text-zinc-500 block text-[10px] font-mono-luxury uppercase">Energy Matrix:</span>
                  <span className="text-[#d4af37] font-medium">{inspectProduct.specs.energyCore}</span>
                </div>
                <div className="p-3 bg-[#0a0a0d] rounded-lg border border-white/5">
                  <span className="text-zinc-500 block text-[10px] font-mono-luxury uppercase">Neural Synapse:</span>
                  <span className="text-zinc-200 font-medium">{inspectProduct.specs.neuralSync}</span>
                </div>
                <div className="p-3 bg-[#0a0a0d] rounded-lg border border-white/5">
                  <span className="text-zinc-500 block text-[10px] font-mono-luxury uppercase">Thermal Range:</span>
                  <span className="text-zinc-200 font-medium">{inspectProduct.specs.thermalRating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10 text-[10px] font-mono-luxury uppercase">
                    {inspectProduct.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#d4af37] text-xs">
                    <Star size={12} fill="#d4af37" />
                    <span className="font-semibold">{inspectProduct.rating}</span>
                    <span className="text-zinc-500">({inspectProduct.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-luxury font-bold text-2xl sm:text-3xl text-white">
                  {inspectProduct.name}
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  {inspectProduct.subTitle}
                </p>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-luxury font-bold text-3xl text-white">
                    ${inspectProduct.priceUSD.toLocaleString()}
                  </span>
                  <span className="font-mono-luxury text-xs text-zinc-400">
                    ₮ {inspectProduct.priceCredits.toLocaleString()} Credits
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {inspectProduct.description}
              </p>

              <div className="space-y-2">
                <span className="text-[10px] font-mono-luxury text-zinc-500 uppercase tracking-wider block">
                  DISTINGUISHING ATTRIBUTES:
                </span>
                <ul className="grid grid-cols-1 gap-1 text-xs text-zinc-300">
                  {inspectProduct.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono-luxury text-zinc-500 uppercase block">
                  SELECT SIZING & PROPORTIONS:
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {inspectProduct.category === 'shoes'
                    ? ['US 8.5 / Q-41', 'US 9.5 / Q-42', 'US 10.5 / Q-44', 'US 11.5 / Q-46'].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-1.5 rounded-full border text-xs font-mono-luxury transition-all ${
                            currentSize === sz
                              ? 'border-white bg-white text-black font-semibold shadow'
                              : 'border-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {sz}
                        </button>
                      ))
                    : ['Bespoke Small', 'Bespoke Medium', 'Bespoke Large'].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-1.5 rounded-full border text-xs font-mono-luxury transition-all ${
                            currentSize === sz
                              ? 'border-white bg-white text-black font-semibold shadow'
                              : 'border-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(inspectProduct, 1, currentSize, inspectProduct.hologramColor)}
                  className="flex-1 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#f4ebd0] active:scale-95 flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Client Bag</span>
                </button>

                <button
                  onClick={() => {
                    cyberAudio.playClick();
                    setInspectProduct(null);
                    setOpenTryOn(true);
                  }}
                  className="px-5 py-3.5 rounded-full border border-white/15 bg-transparent hover:border-[#d4af37] text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5"
                  title="Test in Virtual Styling Room"
                >
                  <Sparkles size={14} className="text-[#d4af37]" />
                  <span>Style</span>
                </button>

                <button
                  onClick={() => toggleWishlist(inspectProduct.id)}
                  className={`p-3.5 rounded-full border transition-all ${
                    isWishlisted(inspectProduct.id)
                      ? 'border-[#d4af37] bg-[#d4af37] text-black'
                      : 'border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  title="Bookmark"
                >
                  <Heart size={16} fill={isWishlisted(inspectProduct.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Reviews */}
              <div className="p-4 bg-[#141418] border border-white/5 rounded-xl space-y-3">
                <h4 className="font-luxury text-xs text-white uppercase tracking-wider flex items-center justify-between">
                  <span>CLIENT REVIEWS</span>
                  <span className="font-mono-luxury text-zinc-500">{inspectProduct.reviews?.length || 0} LOGS</span>
                </h4>

                <div className="max-h-28 overflow-y-auto space-y-2 pr-1">
                  {inspectProduct.reviews && inspectProduct.reviews.length > 0 ? (
                    inspectProduct.reviews.map((r) => (
                      <div key={r.id} className="p-2.5 bg-[#0a0a0d] rounded-lg border border-white/5 text-xs">
                        <div className="flex justify-between items-center text-zinc-400">
                          <strong className="text-white">{r.userName}</strong>
                          <span className="text-[#d4af37]">{'★'.repeat(r.rating)}</span>
                        </div>
                        <p className="text-zinc-300 mt-1 text-[11px] font-light">{r.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-zinc-500 text-center py-2 font-light">
                      No client reviews yet.
                    </div>
                  )}
                </div>

                <form onSubmit={handleReviewSubmit} className="pt-3 border-t border-white/5 flex gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-1/3 bg-[#0a0a0d] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    placeholder="Add your review..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="flex-1 bg-[#0a0a0d] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-4 py-1.5 bg-white text-black hover:bg-[#f4ebd0] text-xs font-semibold rounded-lg flex items-center gap-1"
                  >
                    <Send size={12} />
                    <span>Submit</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
