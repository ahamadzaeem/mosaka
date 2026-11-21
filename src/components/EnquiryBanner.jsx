import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function EnquiryBanner() {
  const bannerRef = useRef(null);
  const { setIsEnquiryOpen } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.enquiry-banner-inner', {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="relative py-16 sm:py-20 bg-[#d8d0c5] text-[#1c1b19] overflow-hidden">
      {/* Travertine stone texture overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('/assets/travertine_bg.jpg')` }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 enquiry-banner-inner">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Title */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1a1918] font-normal leading-[1.15]">
              Find the Right Piece <br />
              <span className="italic">for Your Project.</span>
            </h2>
          </div>

          {/* Vertical Divider line on desktop */}
          <div className="hidden lg:block lg:col-span-1 h-20 w-[1px] bg-[#1a1918]/20 justify-self-center" />

          {/* Right Copy & Button */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-sm text-[#2e2c28] font-light leading-relaxed max-w-md">
              Whether you are designing your own bathroom or sourcing for a client,
              we would love to help you find the right piece.
            </p>

            <MagneticButton
              onClick={() => setIsEnquiryOpen(true)}
              className="flex-shrink-0 px-6 py-3.5 bg-[#0e0e0d] hover:bg-[#201e1c] text-[#f2eee9] text-[11px] uppercase tracking-luxury flex items-center gap-3 transition-colors duration-300 shadow-xl group"
            >
              <span>ENQUIRE ABOUT THE COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

