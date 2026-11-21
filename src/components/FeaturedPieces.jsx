import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedPieces() {
  const sectionRef = useRef(null);
  const { products, addToCart, setQuickViewProduct, setIsSearchOpen } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 45,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="featured-pieces" ref={sectionRef} className="py-24 bg-[#0a0a09] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium block mb-1">
              TIMELESS FORMS
            </span>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-white">
              FEATURED PIECES
            </h2>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-luxury text-stone-400 hover:text-gold-300 transition-colors mt-4 sm:mt-0"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group flex flex-col justify-between"
            >
              <TiltCard
                onClick={() => setQuickViewProduct(product)}
                className="bg-[#121110] border border-white/10 hover:border-gold-400/40 rounded-lg p-4 transition-all duration-500 relative flex flex-col justify-between"
              >
                {/* Product Basin Image Container */}
                <div className="relative aspect-[4/3] rounded overflow-hidden bg-gradient-to-b from-[#181716] to-[#0c0c0b] mb-4 flex items-center justify-center p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-700 ease-out drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  />

                  {/* Quick View Hover Pill */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-[10px] uppercase tracking-luxury text-stone-200 flex items-center gap-1.5 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3 h-3 text-gold-400" />
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Info & Add to Bag row */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h4 className="font-serif text-lg text-white group-hover:text-gold-300 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-stone-400 font-light mt-0.5">
                        AED {product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quick Add to Bag Bag Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="p-2.5 rounded-full border border-white/15 hover:border-gold-400 hover:bg-gold-400/10 text-stone-300 hover:text-gold-300 transition-all duration-300"
                      title={`Add ${product.name} to bag`}
                      aria-label="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

