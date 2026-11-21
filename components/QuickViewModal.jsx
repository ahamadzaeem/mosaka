'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />
      <div className="relative w-full max-w-2xl bg-[#141312] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 text-stone-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-stone-950 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full max-h-56 object-cover rounded"
          />
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-medium">
              {quickViewProduct.category}
            </span>
            <h3 className="font-serif text-2xl text-white mt-1 mb-1">{quickViewProduct.name}</h3>
            <p className="font-serif text-xl text-gold-300 font-light mb-3">
              AED {quickViewProduct.price.toLocaleString()}
            </p>
            <p className="text-xs text-stone-300 leading-relaxed font-light mb-4">
              {quickViewProduct.description}
            </p>
            <div className="space-y-1 text-[11px] text-stone-400 border-t border-white/5 pt-3 mb-4">
              <p>Material: <span className="text-stone-200">{quickViewProduct.material}</span></p>
              <p>Dimensions: <span className="text-stone-200">{quickViewProduct.dimensions}</span></p>
            </div>
          </div>

          <button
            onClick={() => {
              addToCart(quickViewProduct);
              setQuickViewProduct(null);
            }}
            className="w-full py-3 bg-gold-400 hover:bg-gold-300 text-stone-950 font-medium tracking-luxury text-xs uppercase flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}

