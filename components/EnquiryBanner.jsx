'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EnquiryBanner() {
  const sectionRef = useRef(null);
  const { openEnquiry } = useCart();

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Title Reveal
      gsap.fromTo(
        '.enquiry-title-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // 2. Vertical Divider Draw-down
      gsap.fromTo(
        '.enquiry-divider-line',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      // 3. Right Content Fade Up
      gsap.fromTo(
        '.enquiry-right-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
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

  return (
    <section
      id="enquiry-banner"
      ref={sectionRef}
      className="relative py-16 sm:py-20 bg-[#d8d0c5] text-[#1c1b19] overflow-hidden"
    >
      {/* Pure, clean travertine stone texture overlay (Zero Ghost Text) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url('/images/travertine_clean.jpg')` }}
      />

      <div className="relative w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title */}
          <div className="lg:col-span-5 enquiry-title-anim">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1a1918] font-normal leading-[1.15]">
              Find the Right Piece <br />
              for Your Project.
            </h2>
          </div>

          {/* Center Divider Line with Draw-down Animation */}
          <div className="hidden lg:block lg:col-span-1 h-20 w-[1px] bg-[#1a1918]/25 justify-self-center enquiry-divider-line" />

          {/* Right Description & Button */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="enquiry-right-anim text-xs sm:text-sm text-[#2c2a27] font-light leading-relaxed max-w-md">
              Whether you are designing your own bathroom or sourcing for a client, we would love to help you find the right piece.
            </p>

            <button
              onClick={() => openEnquiry('Bespoke Architectural Project Inquiry')}
              className="enquiry-right-anim flex-shrink-0 px-6 py-3.5 bg-[#0e0e0d] hover:bg-[#23211f] text-[#f2eee9] text-[10px] uppercase tracking-luxury flex items-center gap-3 transition-colors duration-300 shadow-xl group cursor-pointer"
            >
              <span>ENQUIRE ABOUT THE COLLECTION</span>
              <span className="text-gold-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
