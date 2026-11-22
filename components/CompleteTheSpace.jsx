'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CompleteTheSpace() {
  const sectionRef = useRef(null);
  const { openEnquiry } = useCart();

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic Zoom Scrub on Vanity Image
      gsap.fromTo(
        '.space-vanity-bg',
        { scale: 1.06 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // 2. Right Text Content Reveal (Smooth Slide In from Right)
      gsap.fromTo(
        '.space-text-anim',
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 1,
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

  return (
    <section
      id="complete-space"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a09] overflow-hidden py-8 sm:py-12 border-t border-white/5"
    >
      {/* Cinematic Panoramic Banner Container matching Reference */}
      <div className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] flex items-center overflow-hidden bg-[#0a0a09]">
        {/* Left & Center Image Area (Spans left ~65% so the wooden bowl & tap stay clear of text) */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[68%] xl:w-[64%] overflow-hidden">
          <img
            src="/images/space_vanity_master.jpg"
            alt="Complete The Space - Basins, Taps, Accessories"
            onError={(e) => {
              e.currentTarget.src = '/images/space_vanity_hires.jpg';
            }}
            className="space-vanity-bg w-full h-full object-cover object-[55%_center] lg:object-center transform origin-left"
          />

          {/* Smooth Linear Gradient Dissolve into deep black towards the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a0a09]/20 via-60% to-[#0a0a09] pointer-events-none" />

          {/* Subtle top & bottom edges blend */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0a09] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a09] to-transparent pointer-events-none" />
        </div>

        {/* Content Container: Editorial Narrative Positioned Strictly on the FAR RIGHT */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 flex justify-end">
          <div className="w-full lg:w-[38%] xl:w-[35%] flex flex-col justify-center py-10 lg:py-16">
            <span className="space-text-anim text-[10.5px] sm:text-xs uppercase tracking-[0.28em] text-white/90 font-medium block mb-3 sm:mb-4">
              COMPLETE THE SPACE
            </span>

            <h2 className="space-text-anim font-serif text-3xl sm:text-4xl lg:text-[46px] text-white font-normal leading-[1.12] mb-4 sm:mb-5">
              Basins. Taps. <br />
              Accessories.
            </h2>

            <p className="space-text-anim text-stone-300 text-xs sm:text-[13px] font-light leading-relaxed mb-7 sm:mb-8 max-w-sm">
              A cohesive collection for thoughtfully designed bathrooms.
            </p>

            <div className="space-text-anim">
              <Link
                href="/shop?category=accessories"
                className="inline-flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 bg-transparent border border-white/30 hover:border-gold-300 text-stone-200 hover:text-white text-[10.5px] uppercase tracking-[0.24em] transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-gold-400/10"
              >
                <span>EXPLORE ACCESSORIES</span>
                <span className="text-stone-400 group-hover:text-gold-300 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
