import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, X, ArrowUpRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.material.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#141312] border border-white/10 rounded-lg shadow-2xl p-6 z-10 animate-fade-in">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-gold-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by material, collection, or basin..."
              className="w-full bg-transparent text-white placeholder-stone-500 outline-none text-base font-light"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-80 overflow-y-auto divide-y divide-white/5">
          {filtered.length === 0 ? (
            <p className="text-center text-stone-500 py-8 text-sm">No pieces found matching "{query}"</p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setQuickViewProduct(item);
                  setIsSearchOpen(false);
                }}
                className="py-3 px-2 flex items-center justify-between hover:bg-white/5 cursor-pointer rounded transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-10 object-cover rounded border border-white/10"
                  />
                  <div>
                    <h5 className="font-serif text-lg text-stone-200 group-hover:text-gold-300 transition-colors">
                      {item.name}
                    </h5>
                    <span className="text-xs text-stone-500">{item.category} • {item.material}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-gold-400 text-sm">AED {item.price.toLocaleString()}</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-500">
          <span>Popular: Teak Basins, Hammered Copper, Verde Marble, Brushed Brass</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

