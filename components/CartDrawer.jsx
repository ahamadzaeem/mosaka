'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />
      <div className="relative w-full max-w-md bg-[#131211] border-l border-white/10 h-full flex flex-col z-10 shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-2xl text-white">Your Selection</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 divide-y divide-white/5">
          {cart.length === 0 ? (
            <p className="text-center text-stone-500 text-xs py-16">Your shopping bag is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-12 object-cover rounded border border-white/10"
                  />
                  <div>
                    <h5 className="font-serif text-base text-white">{item.name}</h5>
                    <p className="text-[11px] text-stone-400">AED {item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-stone-400 hover:text-white text-xs px-1 border border-white/10 rounded"
                      >
                        -
                      </button>
                      <span className="text-xs text-stone-300">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-stone-400 hover:text-white text-xs px-1 border border-white/10 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-stone-500 hover:text-red-400 text-xs"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-xs text-stone-400">
              <span>White-Glove Delivery</span>
              <span className="text-emerald-400 uppercase font-medium">Complimentary</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-serif text-lg text-white">Estimated Total</span>
              <span className="font-serif text-2xl text-gold-300 font-medium">
                AED {cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {
                alert('Thank you for choosing MOSAKA. A Dubai showroom concierge will contact you to confirm payment and delivery.');
                setIsCartOpen(false);
              }}
              className="w-full py-3.5 bg-gold-400 hover:bg-gold-300 text-stone-950 text-xs uppercase tracking-luxury font-medium transition-colors"
            >
              Proceed to Bespoke Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

