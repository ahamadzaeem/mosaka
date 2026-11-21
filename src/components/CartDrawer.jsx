import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 animate-fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#121110] border-l border-white/10 h-full flex flex-col z-10 shadow-2xl transition-transform duration-500 animate-slide-left">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif text-2xl tracking-wide text-white">Your Selection</h3>
            <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-400 border border-gold-400/20">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-white/5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <ShoppingBag className="w-7 h-7 text-stone-500" />
              </div>
              <p className="font-serif text-xl text-stone-300 mb-1">Your bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Discover our hand-carved vessels, hammered copper basins, and sculpted tapware.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 border border-gold-400/50 text-gold-300 text-xs tracking-luxury uppercase hover:bg-gold-400/10 transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-5 flex gap-4 first:pt-0">
                <div className="w-20 h-20 rounded bg-stone-900 border border-white/10 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-lg text-white truncate pr-2">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-500 hover:text-stone-300 transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-stone-400 mb-2">{item.material}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-white/15 rounded bg-black/30">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:text-gold-400 text-stone-400 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs text-stone-200">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:text-gold-400 text-stone-400 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-serif text-base text-gold-300">
                      AED {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-stone-950/80">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-stone-400">
                <span>White-Glove Delivery</span>
                <span className="text-emerald-400 uppercase tracking-wider font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-xs text-stone-400">
                <span>Handcrafted Authenticity Guarantee</span>
                <span className="text-stone-300">Included</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/5">
                <span className="font-serif text-lg text-white">Estimated Total</span>
                <span className="font-serif text-2xl text-gold-300 font-medium">
                  AED {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Thank you for your interest! An artisanal consultation representative from MOSAKA Dubai will assist you with checkout.`);
              }}
              className="w-full py-3.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-stone-950 font-medium tracking-luxury text-xs uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-gold-950/40"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Worldwide insured shipping & 10-year artisanal warranty</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

