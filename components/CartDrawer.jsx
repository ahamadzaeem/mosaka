'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    proceedToCheckout,
    isCheckingOut,
    openEnquiry,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    const result = await proceedToCheckout();
    if (!result?.redirected) {
      // Fallback to concierge enquiry when items are not yet synced in Shopify admin
      const itemSummary = cart.map((i) => `${i.name} (x${i.quantity})`).join(', ');
      setIsCartOpen(false);
      openEnquiry(`Bespoke Order: ${itemSummary}`);
    }
  };

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
                  <Link
                    href={item.slug ? `/shop/${item.slug}` : '/shop'}
                    onClick={() => setIsCartOpen(false)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-12 object-cover rounded border border-white/10 hover:border-gold-400 transition-colors"
                    />
                  </Link>
                  <div>
                    <Link
                      href={item.slug ? `/shop/${item.slug}` : '/shop'}
                      onClick={() => setIsCartOpen(false)}
                    >
                      <h5 className="font-serif text-base text-white hover:text-gold-300 transition-colors">
                        {item.name}
                      </h5>
                    </Link>
                    <p className="text-[11px] text-stone-400">
                      AED {Number(item.price || 0).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-stone-400 hover:text-white text-xs px-1.5 border border-white/10 rounded"
                      >
                        -
                      </button>
                      <span className="text-xs text-stone-300">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-stone-400 hover:text-white text-xs px-1.5 border border-white/10 rounded"
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
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 bg-gold-400 hover:bg-gold-300 disabled:opacity-60 text-stone-950 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Shopify Checkout...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
