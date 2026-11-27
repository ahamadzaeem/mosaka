'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedPieces() {
  const sectionRef = useRef(null);
  const { addToCart, products, productsLoading } = useCart();

  // Prioritize items tagged 'featured' in Shopify, otherwise first 4 live Shopify products
  const featuredItems = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    const flagged = products.filter((p) => p.isFeatured);
    return (flagged.length > 0 ? flagged : products).slice(0, 4);
  }, [products]);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feat-header-anim',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      if (featuredItems.length > 0) {
        gsap.fromTo(
          '.product-col-item',
          { opacity: 0, y: 65, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [featuredItems.length]);

  const handleMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(cardEl.querySelector('.tilt-target'), {
      rotateY: (x / rect.width) * 8,
      rotateX: (-y / rect.height) * 8,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (cardEl) => {
    if (!cardEl) return;
    gsap.to(cardEl.querySelector('.tilt-target'), {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="featured-pieces"
      ref={sectionRef}
      className="py-14 sm:py-16 lg:py-20 bg-[#0a0a09] relative"
    >
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Section Header */}
        <div className="feat-header-anim flex items-center justify-between pb-6 mb-8 sm:mb-10">
          <h2 className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.28em] text-white/90">
            FEATURED PIECES
          </h2>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone-400 hover:text-gold-300 transition-colors"
          >
            <span>VIEW ALL PRODUCTS</span>
            <span className="group-hover:translate-x-1.5 transition-transform text-stone-400 group-hover:text-gold-300">
              →
            </span>
          </Link>
        </div>

        {/* Live Shopify Products Row */}
        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[1.51/1] bg-white/5 rounded-[2px] mb-4" />
                <div className="h-5 w-2/3 bg-white/5 rounded mb-2" />
                <div className="h-3 w-1/3 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : featuredItems.length === 0 ? (
          <div className="py-12 border border-white/10 rounded-[2px] bg-white/[0.02] text-center">
            <p className="font-serif text-xl text-stone-300 mb-2">
              Connected to Shopify Store
            </p>
            <p className="text-xs text-stone-500 uppercase tracking-widest mb-5">
              Publish products in Shopify Admin to display them here automatically.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-300 hover:text-white transition-colors"
            >
              <span>Go to Shop</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
            {featuredItems.map((product) => (
              <div
                key={product.id}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className="product-col-item group cursor-pointer flex flex-col justify-between"
              >
                <div className="tilt-target relative w-full aspect-[1.51/1] overflow-hidden bg-[#0d0c0b] rounded-[2px] mb-4 sm:mb-5 transition-shadow duration-500">
                  <Link href={`/shop/${product.slug}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>
                </div>

                <div className="flex items-end justify-between pt-1">
                  <div>
                    <Link href={`/shop/${product.slug}`}>
                      <h4 className="font-serif text-lg sm:text-xl text-white group-hover:text-gold-300 cursor-pointer transition-colors font-normal leading-snug">
                        {product.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-stone-400 font-light mt-1">
                      {product.priceFormatted}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="p-2 text-stone-400 hover:text-white transition-colors"
                    title={`Add ${product.name} to bag`}
                    aria-label="Add to bag"
                  >
                    <ShoppingBag className="w-[18px] h-[18px] stroke-[1.4]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
