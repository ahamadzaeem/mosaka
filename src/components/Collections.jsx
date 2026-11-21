import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import TiltCard from './TiltCard';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const collectionsData = [
  {
    id: 'wooden',
    title: 'Wooden Basins',
    tagline: "Nature's Artistry, Beautifully Formed.",
    image: '/assets/col_wood_pure.jpg',
    category: 'wood',
  },
  {
    id: 'copper',
    title: 'Copper & Brass',
    tagline: 'The Warmth of Distinctive Materials.',
    image: '/assets/col_copper_pure.jpg',
    category: 'metal',
  },
  {
    id: 'statement',
    title: 'Statement Basins',
    tagline: 'Sculptural Forms, Individual Character.',
    image: '/assets/col_statement_pure.jpg',
    category: 'stone',
  },
  {
    id: 'tapware',
    title: 'Tapware',
    tagline: 'The Art of Water.',
    image: '/assets/col_tapware_pure.jpg',
    category: 'tapware',
  },
];

export default function Collections() {
  const sectionRef = useRef(null);
  const { setIsSearchOpen } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.collection-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById('featured-pieces');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="collections" ref={sectionRef} className="py-24 bg-[#0a0a09] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium block mb-1">
              CURATED EDITIONS
            </span>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-white">
              THE COLLECTIONS
            </h2>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="group flex items-center gap-2 text-[11px] uppercase tracking-luxury text-stone-400 hover:text-gold-300 transition-colors mt-4 sm:mt-0"
          >
            <span>EXPLORE ALL COLLECTIONS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionsData.map((item) => (
            <TiltCard
              key={item.id}
              onClick={scrollToProducts}
              className="collection-card group bg-[#121110] border border-white/10 hover:border-gold-400/50 rounded-lg p-3 transition-colors duration-500 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] rounded overflow-hidden bg-stone-950 mb-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
              </div>

              {/* Text Information */}
              <div className="px-1 pb-1">
                <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-gold-300 transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed mb-4">
                  {item.tagline}
                </p>

                {/* Arrow CTA */}
                <div className="inline-flex items-center text-stone-400 group-hover:text-gold-400 transition-colors">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

