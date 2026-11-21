'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const materialSwatches = [
  {
    id: 'wood',
    title: 'Natural Burl Wood Grain',
    subtitle: 'Teak & Olive',
    image: '/images/mat_1_large.jpg',
    fallback: '/images/mat_wood_exact_ref.jpg',
  },
  {
    id: 'copper',
    title: 'Hand-Hammered Copper',
    subtitle: 'Pure Rose Copper',
    image: '/images/mat_2_large.jpg',
    fallback: '/images/mat_copper_exact_ref.jpg',
  },
  {
    id: 'brass',
    title: 'Circular Brushed Brass',
    subtitle: 'Architectural Gold',
    image: '/images/mat_3_large.jpg',
    fallback: '/images/mat_brass_exact_ref.jpg',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { openEnquiry, setNotification } = useCart();

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Masked Line-by-Line Slide Up for Headlines
      gsap.fromTo(
        '.about-headline-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // 2. Left Subtitle and Description Fade-in
      gsap.fromTo(
        '.about-text-fade',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      // 3. Right Swatches Staggered Elevation & Scale Settle
      gsap.fromTo(
        '.about-swatch-item',
        { opacity: 0, y: 70, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const showMaterial = (title) => {
    setNotification(`Material: ${title}`);
    setTimeout(() => setNotification(null), 3200);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-14 sm:py-16 lg:py-20 bg-[#0a0a09] relative"
    >
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Brand Statement (~42% width) */}
          <div className="lg:col-span-5">
            <span className="about-text-fade text-xs uppercase tracking-[0.28em] text-white/90 font-medium block mb-4">
              ABOUT MOSAKA
            </span>

            {/* Editorial Masked Headline Lines */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[52px] text-white font-normal leading-[1.12] mb-6">
              <span className="block overflow-hidden">
                <span className="about-headline-line block">Nature creates.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="about-headline-line block">MOSAKA curates.</span>
              </span>
            </h2>

            <p className="about-text-fade text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-7 max-w-md">
              At Mosaka Bathware, we believe a basin can be more than a functional element. It can be the defining feature of a space.
            </p>

            <button
              onClick={() => openEnquiry('MOSAKA Atelier Story & Heritage')}
              className="about-text-fade group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-stone-200 hover:text-gold-300 transition-colors"
            >
              <span>OUR STORY</span>
              <span className="text-stone-300 group-hover:text-gold-300 group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </button>
          </div>

          {/* Right: 3 Large Material Swatches (~58% width, spanning to right margin) */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {materialSwatches.map((item) => (
              <div
                key={item.id}
                onClick={() => showMaterial(item.title)}
                className="about-swatch-item aspect-square bg-[#0d0c0b] rounded-[2px] overflow-hidden cursor-pointer group relative shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    if (item.fallback) {
                      e.currentTarget.src = item.fallback;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
