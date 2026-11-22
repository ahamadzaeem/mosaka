'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, openEnquiry } = useCart();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />
      <div className="relative w-full max-w-2xl bg-[#141312] border border-white/10 rounded-[4px] shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 text-stone-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-[#0a0a09] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10 relative">
          {quickViewProduct.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 border border-white/10 text-[9px] uppercase tracking-[0.2em] text-[#e6ca85] rounded-[2px]">
              {quickViewProduct.badge}
            </span>
          )}
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full max-h-64 object-cover rounded-[2px]"
          />
        </div>

        <div className="p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold block mb-1">
              {quickViewProduct.subcategory || quickViewProduct.category}
            </span>
            <h3 className="font-serif text-2xl text-white font-normal leading-snug">
              {quickViewProduct.name}
            </h3>
            <p className="text-lg text-[#e6ca85] font-light mt-1 mb-3">
              {quickViewProduct.priceFormatted || `AED ${quickViewProduct.price?.toLocaleString()}`}
            </p>
            <p className="text-xs text-stone-300 leading-relaxed font-light mb-4 line-clamp-3">
              {quickViewProduct.tagline || quickViewProduct.description}
            </p>

            <div className="space-y-1.5 text-[11px] text-stone-400 border-t border-white/5 pt-3 mb-5">
              {quickViewProduct.material && (
                <p>
                  Material: <span className="text-stone-200">{quickViewProduct.material}</span>
                </p>
              )}
              {quickViewProduct.dimensions && (
                <p>
                  Dimensions: <span className="text-stone-200">{quickViewProduct.dimensions}</span>
                </p>
              )}
              {quickViewProduct.mounting && (
                <p>
                  Mounting: <span className="text-stone-200">{quickViewProduct.mounting}</span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => {
                addToCart(quickViewProduct);
                setQuickViewProduct(null);
              }}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#d4af37] text-stone-950 font-semibold tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-2 transition-all rounded-[2px] shadow-lg shadow-gold-500/10"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>

            {quickViewProduct.slug && (
              <Link
                href={`/shop/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="w-full py-2.5 border border-white/10 hover:border-gold-300 hover:bg-white/5 text-stone-300 hover:text-gold-300 text-[11px] uppercase tracking-[0.18em] transition-all rounded-[2px] flex items-center justify-center gap-1.5"
              >
                <span>Full Architectural Spec & Gallery</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
