'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, X } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products, addToCart, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.material.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-24 px-4">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />
      <div className="relative w-full max-w-xl bg-[#141312] border border-white/10 rounded-lg p-6 z-10 shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-4 h-4 text-gold-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search basins, copper, wood, tapware..."
              className="w-full bg-transparent text-white placeholder-stone-500 outline-none text-base font-light"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 max-h-72 overflow-y-auto space-y-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <p className="text-center text-stone-500 text-xs py-8">No pieces found matching "{query}"</p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setQuickViewProduct(item);
                  setIsSearchOpen(false);
                }}
                className="pt-2 pb-1 flex items-center justify-between hover:bg-white/5 cursor-pointer rounded px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-8 object-cover rounded border border-white/10"
                  />
                  <div>
                    <h5 className="font-serif text-sm text-white">{item.name}</h5>
                    <p className="text-[10px] text-stone-500">{item.category}</p>
                  </div>
                </div>
                <span className="font-serif text-xs text-gold-300">
                  AED {item.price.toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

