'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const collectionsData = [
  {
    id: 'wooden',
    title: 'Wooden Basins',
    tagline: "Nature's Artistry, Beautifully Formed.",
    image: '/images/col_wood_exact_match.jpg',
    fallback: '/images/col_wood_hires.jpg',
  },
  {
    id: 'copper',
    title: 'Copper & Brass',
    tagline: 'The Warmth of Distinctive Materials.',
    image: '/images/col_copper_exact_match.jpg',
    fallback: '/images/col_copper_box.jpg',
  },
  {
    id: 'statement',
    title: 'Statement Basins',
    tagline: 'Sculptural Forms, Individual Character.',
    image: '/images/col_statement_exact_match.jpg',
    fallback: '/images/col_statement_box.jpg',
  },
  {
    id: 'tapware',
    title: 'Tapware',
    tagline: 'The Art of Water.',
    image: '/images/col_tapware_exact_match.jpg',
    fallback: '/images/col_tapware_exact.jpg',
  },
];

export default function Collections() {
  const sectionRef = useRef(null);
  const { setNotification } = useCart();

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(
        '.col-header-anim',
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

      // 2. Signature Staggered Column Reveal
      gsap.fromTo(
        '.collection-col-item',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      // 3. Image Scale Settle Inside Each Column
      gsap.fromTo(
        '.col-img-inner',
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      // 4. Subtle Alternating Scroll Parallax on Desktop
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        gsap.to('.col-parallax-even', {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // 5. Golden Root-Line Entrance Animation (Drawn across the baseline)
      gsap.fromTo(
        '.root-line-main-path',
        { strokeDasharray: 1400, strokeDashoffset: 1400 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.root-line-node',
        { scale: 0, opacity: 0, transformOrigin: 'center' },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          delay: 1.0,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToFeatured = () => {
    const el = document.getElementById('featured-pieces');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-[#0a0a09] relative overflow-hidden"
    >
      {/* Ambient luxury radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_45%_at_50%_48%,rgba(200,169,110,0.06),transparent_70%)]" />

      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Section Header */}
        <div className="col-header-anim flex items-center justify-between pb-6 mb-8 sm:mb-10">
          <h2 className="text-xs sm:text-[13px] font-medium uppercase tracking-[0.28em] text-white/90">
            THE COLLECTIONS
          </h2>
          <button
            onClick={scrollToFeatured}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone-400 hover:text-gold-300 transition-colors"
          >
            <span>EXPLORE ALL COLLECTIONS</span>
            <span className="group-hover:translate-x-1.5 transition-transform text-stone-400 group-hover:text-gold-300">
              →
            </span>
          </button>
        </div>

        {/* Relative Container for Cards + Root Line */}
        <div className="relative">
          {/* ============================================================== */}
          {/* ORGANIC GOLDEN ROOT-LINE BEHIND CARDS (Inspired by HOP)         */}
          {/* Placed at top-[58%] right below image baseline so it is        */}
          {/* 100% continuous & never clipped into jagged broken sticks!      */}
          {/* ============================================================== */}
          {/* Desktop/Tablet Glowing Golden Root Line */}
          <div className="hidden md:block absolute top-[58%] left-0 right-0 -translate-y-1/2 h-36 lg:h-44 pointer-events-none z-0 opacity-90 transition-opacity duration-1000 overflow-visible">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 80"
              preserveAspectRatio="none"
              className="drop-shadow-[0_0_20px_rgba(200,169,110,0.35)]"
            >
              <defs>
                <linearGradient id="root-line-glow-h" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8A96E" stopOpacity="0" />
                  <stop offset="8%" stopColor="#C8A96E" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#E5C583" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#FFF8E7" stopOpacity="1" />
                  <stop offset="75%" stopColor="#E5C583" stopOpacity="0.95" />
                  <stop offset="92%" stopColor="#C8A96E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
                </linearGradient>
                <filter id="root-glow-heavy" x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur stdDeviation="5.5" result="blur" />
                </filter>
                <filter id="root-glow-medium" x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                </filter>
              </defs>

              {/* Layer 1: Diffuse Ambient Outer Gold Glow */}
              <path
                d="M 0,40 C 200,46 400,34 600,40 C 800,46 1000,34 1200,40"
                stroke="url(#root-line-glow-h)"
                strokeWidth="7"
                fill="none"
                opacity="0.4"
                filter="url(#root-glow-heavy)"
              />

              {/* Layer 2: Medium Radiance Line */}
              <path
                d="M 0,40 C 200,46 400,34 600,40 C 800,46 1000,34 1200,40"
                stroke="url(#root-line-glow-h)"
                strokeWidth="2.8"
                fill="none"
                opacity="0.8"
                filter="url(#root-glow-medium)"
              />

              {/* Layer 3: Sharp Luminous Core Spline */}
              <path
                d="M 0,40 C 200,46 400,34 600,40 C 800,46 1000,34 1200,40"
                stroke="url(#root-line-glow-h)"
                strokeWidth="1.3"
                fill="none"
                opacity="0.95"
                className="root-line-main-path"
              />

              {/* Delicate Botanical Root Branches & Tendrils Sprouting in the Gaps */}
              <g stroke="url(#root-line-glow-h)" strokeWidth="1.2" fill="none" filter="url(#root-glow-medium)">
                {/* Gap 1 (around x=300): Downward botanical tendril */}
                <path d="M 300,40 Q 320,62 335,65" />
                <path d="M 320,62 Q 338,54 350,56" strokeWidth="0.75" />

                {/* Gap 2 (around x=600): Upward botanical tendril */}
                <path d="M 600,40 Q 620,18 635,15" />
                <path d="M 620,18 Q 638,26 650,24" strokeWidth="0.75" />

                {/* Gap 3 (around x=900): Downward botanical tendril */}
                <path d="M 900,40 Q 920,62 935,65" />
                <path d="M 920,62 Q 938,54 950,56" strokeWidth="0.75" />
              </g>

              {/* Luminous Champagne Nodes */}
              <g fill="#E5C583" filter="url(#root-glow-medium)">
                <circle cx="335" cy="65" r="2.5" className="root-line-node" />
                <circle cx="350" cy="56" r="1.8" className="root-line-node" />
                <circle cx="635" cy="15" r="2.5" className="root-line-node" />
                <circle cx="650" cy="24" r="1.8" className="root-line-node" />
                <circle cx="935" cy="65" r="2.5" className="root-line-node" />
                <circle cx="950" cy="56" r="1.8" className="root-line-node" />
              </g>
            </svg>
          </div>

          {/* Mobile Vertical Glowing Root Line */}
          <div className="md:hidden absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-48 pointer-events-none z-0 opacity-75">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              className="drop-shadow-[0_0_18px_rgba(200,169,110,0.35)]"
            >
              <defs>
                <linearGradient id="root-line-glow-v" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C8A96E" stopOpacity="0" />
                  <stop offset="5%" stopColor="#C8A96E" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="95%" stopColor="#C8A96E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 50,0 Q 70,250 50,500 T 50,1000" stroke="url(#root-line-glow-v)" strokeWidth="2.5" fill="none" />
              <g stroke="url(#root-line-glow-v)" strokeWidth="1" fill="none" opacity="0.8">
                <path d="M 52,125 L 75,145 M 48,375 L 25,355 M 52,625 L 80,645 M 48,875 L 20,855" />
              </g>
              <g fill="#C8A96E">
                <circle cx="75" cy="145" r="2.5" className="root-line-node" />
                <circle cx="25" cy="355" r="2.5" className="root-line-node" />
                <circle cx="80" cy="645" r="2.5" className="root-line-node" />
                <circle cx="20" cy="855" r="2.5" className="root-line-node" />
              </g>
            </svg>
          </div>

          {/* 4 Columns Grid - Pure Edge-to-Edge Column Images + Clean Typography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 relative z-10">
            {collectionsData.map((item, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setNotification(`Selected Collection: ${item.title}`);
                    setTimeout(() => setNotification(null), 3000);
                    scrollToFeatured();
                  }}
                  className={`collection-col-item group cursor-pointer flex flex-col p-4 -m-4 rounded-xl border border-transparent hover:border-gold-400/25 hover:bg-[#12110f]/75 hover:backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_35px_rgba(200,169,110,0.12)] ${
                    isEven ? 'col-parallax-even' : ''
                  }`}
                >
                  {/* Full-width Image Container */}
                  <div className="relative w-full aspect-[1.51/1] overflow-hidden bg-[#0d0c0b] rounded-[2px] mb-5 sm:mb-6 shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        if (item.fallback) {
                          e.currentTarget.src = item.fallback;
                        }
                      }}
                      className="col-img-inner w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Clean Editorial Typography matching reference */}
                  <div className="flex flex-col">
                    <h3 className="font-serif text-2xl lg:text-[26px] text-white group-hover:text-gold-300 transition-colors font-normal tracking-wide leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-400 font-light leading-relaxed mb-3.5">
                      {item.tagline}
                    </p>
                    <div>
                      <span className="inline-block text-stone-400 group-hover:text-gold-400 group-hover:translate-x-1.5 transition-all duration-300 text-sm">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
