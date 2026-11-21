import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Check, ShoppingBag, ShieldCheck, Sparkles, Ruler, Award } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, qty);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-4xl bg-[#141312] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-white rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Imagery Showcase */}
        <div className="relative bg-gradient-to-b from-[#1c1a18] to-[#0e0e0d] flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,157,96,0.15),transparent_70%)] pointer-events-none" />
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full max-h-72 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-4 left-6 flex items-center gap-1.5 text-[11px] uppercase tracking-luxury text-gold-400/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Artisan Carved</span>
          </div>
        </div>

        {/* Right: Details & Action */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-luxury text-gold-400 font-medium">
                {quickViewProduct.category}
              </span>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                In Stock • Dubai Showroom
              </span>
            </div>

            <h2 className="font-serif text-3xl text-white mb-2">{quickViewProduct.name}</h2>
            <p className="font-serif text-2xl text-gold-300 font-light mb-4">
              AED {quickViewProduct.price.toLocaleString()}
            </p>

            <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
              {quickViewProduct.description}
            </p>

            {/* Tabs for specs */}
            <div className="flex border-b border-white/10 gap-6 text-xs uppercase tracking-wider mb-4">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'specs' ? 'text-white font-medium' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                Specifications
                {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />}
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'care' ? 'text-white font-medium' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                Care & Seal
                {activeTab === 'care' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />}
              </button>
            </div>

            {activeTab === 'specs' ? (
              <div className="space-y-2 text-xs text-stone-300 mb-6">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-stone-500">Material</span>
                  <span className="font-medium">{quickViewProduct.material}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-stone-500">Dimensions</span>
                  <span className="font-medium">{quickViewProduct.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-stone-500">Finish</span>
                  <span className="font-medium">{quickViewProduct.finish}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Installation</span>
                  <span className="font-medium">Vessel Mount / Countertop</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-stone-400 mb-6 leading-relaxed">
                <p>• Wipe clean with a soft microfiber cloth and mild organic soap.</p>
                <p>• Avoid harsh acids, abrasive sponges, or chlorine bleach.</p>
                <p>• Natural live-edge sealant provided with each complimentary delivery kit.</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center border border-white/20 rounded bg-stone-900 px-2 py-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-2 text-stone-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 text-sm text-stone-200">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-2 text-stone-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-gold-400 hover:bg-gold-300 text-stone-950 font-medium tracking-luxury text-xs uppercase flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • AED {(quickViewProduct.price * qty).toLocaleString()}</span>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-stone-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" /> 10-Yr Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-gold-400" /> Hand-Finished In Dubai
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

