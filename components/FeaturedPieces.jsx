'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredItems = [
  {
    id: 'amezon',
    name: 'Amezon Basin',
    price: 5950,
    priceFormatted: 'AED 5,950',
    category: 'Wooden Basins',
    material: 'Carved Teak Root Live Edge',
    dimensions: '620mm x 440mm x 150mm',
    image: '/images/prod_amezon_clean.jpg',
    hires: '/images/prod_amezon_exact.jpg',
  },
  {
    id: 'nile',
    name: 'Nile Basin',
    price: 6450,
    priceFormatted: 'AED 6,450',
    category: 'Copper & Brass',
    material: 'Hand-Hammered Solid Copper',
    dimensions: '580mm x 410mm x 140mm',
    image: '/images/prod_nile_clean.jpg',
    hires: '/images/prod_nile_master.jpg',
  },
  {
    id: 'emerald',
    name: 'Emerald Basin',
    price: 7250,
    priceFormatted: 'AED 7,250',
    category: 'Statement Basins',
    material: 'Verde Guatemala Marble Wave',
    dimensions: '550mm x 480mm x 135mm',
    image: '/images/prod_emerald_clean.jpg',
    hires: '/images/prod_emerald_master.jpg',
  },
  {
    id: 'tectona',
    name: 'Tectona Basin',
    price: 5850,
    priceFormatted: 'AED 5,850',
    category: 'Wooden Basins',
    material: 'Burmese Solid Heartwood Teak',
    dimensions: '420mm Dia x 140mm H',
    image: '/images/prod_tectona_clean.jpg',
    hires: '/images/prod_tectona_master.jpg',
  },
];

export default function FeaturedPieces() {
  const sectionRef = useRef(null);
  const { addToCart, setQuickViewProduct, setIsSearchOpen } = useCart();

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
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

      // 2. 4 Products Pedestal Elevation
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Interactive 3D Perspective Tilt on Mouse Hover
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
          <button
            onClick={() => setIsSearchOpen(true)}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone-400 hover:text-gold-300 transition-colors"
          >
            <span>VIEW ALL PRODUCTS</span>
            <span className="group-hover:translate-x-1.5 transition-transform text-stone-400 group-hover:text-gold-300">
              →
            </span>
          </button>
        </div>

        {/* 4 Products Row - Clean & Borderless matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {featuredItems.map((product) => (
            <div
              key={product.id}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="product-col-item group cursor-pointer flex flex-col justify-between"
            >
              {/* Product Basin Image Container with 3D Micro-Tilt */}
              <div
                onClick={() => setQuickViewProduct(product)}
                className="tilt-target relative w-full aspect-[1.51/1] overflow-hidden bg-[#0d0c0b] rounded-[2px] mb-4 sm:mb-5 transition-shadow duration-500"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    if (product.hires) {
                      e.currentTarget.src = product.hires;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Product Info & Shopping Bag Outline Icon */}
              <div className="flex items-end justify-between pt-1">
                <div>
                  <h4
                    onClick={() => setQuickViewProduct(product)}
                    className="font-serif text-lg sm:text-xl text-white group-hover:text-gold-300 cursor-pointer transition-colors font-normal leading-snug"
                  >
                    {product.name}
                  </h4>
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
      </div>
    </section>
  );
}
