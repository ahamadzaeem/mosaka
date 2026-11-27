'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Layers, Infinity as InfinityIcon } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CartDrawer from '../../components/CartDrawer';
import EnquiryModal from '../../components/EnquiryModal';
import QuickViewModal from '../../components/QuickViewModal';
import SearchModal from '../../components/SearchModal';
import CustomCursor from '../../components/CustomCursor';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const heroSlides = [
  {
    id: '01',
    image: '/images/hero_wood_warm.jpg',
    fallback: '/images/about/warm_walnut_vanity_with_golden_accents.jpg',
    alt: 'Sculpted wooden washbasin on dark marble vanity',
  },
  {
    id: '02',
    image: '/images/about/warm_walnut_vanity_with_golden_accents.jpg',
    fallback: '/images/hero_wood_warm.jpg',
    alt: 'Warm walnut vanity with golden accents',
  },
  {
    id: '03',
    image: '/images/about/polished_burlwood_basin_close-up.jpg',
    fallback: '/images/about/warm_walnut_vanity_with_golden_accents.jpg',
    alt: 'Polished burlwood organic basin',
  },
];

const signatureFinishes = [
  {
    id: 'emerald-green',
    title: 'Emerald Green',
    subtitle: 'Wood with Premium Green Coat',
    image: '/images/about/emerald_green_wooden_bowl_grain.jpg',
    href: '/shop',
  },
  {
    id: 'copper-glow',
    title: 'Copper Glow',
    subtitle: 'Wood with Copper Finish',
    image: '/images/about/hammered_copper_basin_close-up.jpg',
    href: '/shop',
  },
  {
    id: 'natural-wood',
    title: 'Natural Wood',
    subtitle: 'Hand-Finished Hardwood',
    image: '/images/about/polished_walnut_bowl_grain.jpg',
    href: '/shop',
  },
];

export default function AboutPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const pageRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-hero-anim',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' }
      );

      gsap.utils.toArray('.about-reveal-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const currentHero = heroSlides[activeSlide];

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#0c0a08] text-[#eee0c9] selection:bg-[#d5be9b] selection:text-[#0c0a08] font-sans"
    >
      <CustomCursor />
      <Navbar />
      <CartDrawer />
      <EnquiryModal />
      <QuickViewModal />
      <SearchModal />

      <main className="pt-14 sm:pt-16">
        {/* ================================================================= */}
        {/* 1. HERO SECTION: "The Art of Wooden Bathware."                    */}
        {/* ================================================================= */}
        <section className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-white/10">
          {/* Right / Background Hero Visual */}
          <div className="absolute inset-0">
            <img
              src={currentHero.image}
              alt={currentHero.alt}
              onError={(e) => {
                if (currentHero.fallback) e.currentTarget.src = currentHero.fallback;
              }}
              className="w-full h-full object-cover object-center transition-opacity duration-700"
            />
            {/* Smooth Dark Vignette & Left Editorial Gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(12,10,8,0.98) 0%, rgba(12,10,8,0.88) 38%, rgba(12,10,8,0.35) 68%, rgba(12,10,8,0.12) 100%)',
              }}
            />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0c0a08]/80 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c0a08] to-transparent pointer-events-none" />
          </div>

          {/* Left Editorial Content */}
          <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-24">
            <div className="max-w-xl">
              <div className="about-hero-anim mb-5 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.28em] text-[#d5be9b]">
                <span>ABOUT MOSAKA</span>
                <span className="h-px w-14 bg-[#8c7657]/70" />
              </div>

              <h1 className="about-hero-anim font-serif text-4xl sm:text-5xl lg:text-[62px] text-[#f4ead9] font-normal leading-[1.06] tracking-tight mb-5">
                The Art of <br />
                Wooden Bathware.
              </h1>

              <p className="about-hero-anim text-xs sm:text-sm text-[#c7b8a1] font-light leading-relaxed max-w-md mb-8">
                Sculptural basins and refined tapware crafted from wood, where natural form meets contemporary luxury.
              </p>

              <div className="about-hero-anim mb-12">
                <a
                  href="#our-story"
                  className="inline-flex items-center gap-3 px-6 py-3 border border-[#d5be9b]/40 hover:border-[#d5be9b] bg-black/30 hover:bg-[#d5be9b]/10 text-[11px] uppercase tracking-[0.22em] text-[#f0e2ce] transition-all duration-300 group"
                >
                  <span>OUR STORY</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d5be9b] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Slide Number Indicators 01 02 03 */}
              <div className="about-hero-anim flex items-center gap-5 text-[11px] tracking-[0.22em]">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`pb-1.5 transition-all ${
                      activeSlide === idx
                        ? 'text-[#f0e2ce] border-b border-[#d5be9b] font-medium'
                        : 'text-[#7f7261] hover:text-[#c7b8a1]'
                    }`}
                  >
                    {slide.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. OUR STORY: "From Wood to Masterpiece."                         */}
        {/* ================================================================= */}
        <section
          id="our-story"
          className="about-reveal-section relative min-h-[420px] sm:min-h-[470px] flex items-center overflow-hidden border-b border-white/10"
        >
          {/* Left Full-Bleed Burlwood Image */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[64%] overflow-hidden">
            <img
              src="/images/about/polished_burlwood_basin_close-up.jpg"
              alt="Polished burlwood wooden basin close-up"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(12,10,8,0.12) 0%, rgba(12,10,8,0.3) 45%, rgba(12,10,8,0.95) 82%, rgba(12,10,8,1) 100%)',
              }}
            />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0c0a08] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0a08] to-transparent pointer-events-none" />
          </div>

          {/* Right Editorial Copy */}
          <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 flex justify-end">
            <div className="w-full lg:w-[44%] xl:w-[42%] bg-[#0c0a08]/75 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded">
              <div className="mb-4 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.28em] text-[#d5be9b]">
                <span>OUR STORY</span>
                <span className="h-px w-14 bg-[#8c7657]/70" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#f4ead9] font-normal leading-[1.1] mb-5">
                From Wood <br />
                to Masterpiece.
              </h2>

              <p className="text-xs sm:text-sm text-[#c7b8a1] font-light leading-relaxed mb-7 max-w-md">
                MOSAKA was born from a simple belief — that wood can elevate everyday spaces into extraordinary experiences. We craft premium wooden basins and tapware that blend the warmth of nature with modern design.
              </p>

              <a
                href="#craftsmanship"
                className="inline-flex items-center gap-3 px-6 py-3 border border-[#d5be9b]/40 hover:border-[#d5be9b] hover:bg-[#d5be9b]/10 text-[11px] uppercase tracking-[0.22em] text-[#f0e2ce] transition-all duration-300 group"
              >
                <span>DISCOVER OUR JOURNEY</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d5be9b] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. OUR PHILOSOPHY: "Naturally Refined."                           */}
        {/* ================================================================= */}
        <section className="about-reveal-section bg-[#100e0b] border-b border-white/10">
          <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Pillar Heading */}
              <div className="pb-6 md:pb-0 md:pr-8 flex flex-col justify-center">
                <div className="mb-3 flex items-center gap-3 text-[10.5px] uppercase tracking-[0.26em] text-[#d5be9b]">
                  <span>OUR PHILOSOPHY</span>
                  <span className="h-px w-10 bg-[#8c7657]/70" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#f4ead9] font-normal leading-[1.1]">
                  Naturally <br />
                  Refined.
                </h2>
              </div>

              {/* Pillar 1: Premium Wood */}
              <div className="pt-6 md:pt-0 md:px-8 flex flex-col items-center text-center justify-center">
                <div className="w-10 h-10 mb-4 flex items-center justify-center text-[#d5be9b]">
                  <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="18" cy="18" r="14" />
                    <circle cx="18" cy="18" r="10" strokeOpacity="0.8" />
                    <circle cx="18" cy="18" r="6" strokeOpacity="0.65" />
                    <circle cx="18" cy="18" r="2.2" />
                  </svg>
                </div>
                <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#f0e2ce] font-medium mb-2">
                  PREMIUM WOOD
                </h3>
                <p className="text-xs text-[#a99a83] font-light leading-relaxed max-w-[220px]">
                  Hand-selected, durable hardwood for lasting beauty.
                </p>
              </div>

              {/* Pillar 2: Signature Finishes */}
              <div className="pt-6 md:pt-0 md:px-8 flex flex-col items-center text-center justify-center">
                <div className="w-10 h-10 mb-4 flex items-center justify-center text-[#d5be9b]">
                  <Layers className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#f0e2ce] font-medium mb-2">
                  SIGNATURE FINISHES
                </h3>
                <p className="text-xs text-[#a99a83] font-light leading-relaxed max-w-[230px]">
                  Distinctive coatings, including our signature green, copper and matte tones.
                </p>
              </div>

              {/* Pillar 3: Sculptural Design */}
              <div className="pt-6 md:pt-0 md:pl-8 flex flex-col items-center text-center justify-center">
                <div className="w-10 h-10 mb-4 flex items-center justify-center text-[#d5be9b]">
                  <InfinityIcon className="w-9 h-9 stroke-[1.2]" />
                </div>
                <h3 className="text-[11px] uppercase tracking-[0.22em] text-[#f0e2ce] font-medium mb-2">
                  SCULPTURAL DESIGN
                </h3>
                <p className="text-xs text-[#a99a83] font-light leading-relaxed max-w-[220px]">
                  Organic forms that bring warmth and character to modern spaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. CRAFTSMANSHIP: "Handcrafted with Purpose."                     */}
        {/* ================================================================= */}
        <section
          id="craftsmanship"
          className="about-reveal-section relative min-h-[420px] sm:min-h-[470px] flex items-center overflow-hidden border-b border-white/10"
        >
          {/* Left Artisan Carving Image */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[64%] overflow-hidden">
            <img
              src="/images/about/carving_a_wooden_basin_by_hand.jpg"
              alt="Artisan carving a wooden basin by hand"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(12,10,8,0.12) 0%, rgba(12,10,8,0.3) 45%, rgba(12,10,8,0.95) 82%, rgba(12,10,8,1) 100%)',
              }}
            />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0c0a08] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0a08] to-transparent pointer-events-none" />
          </div>

          {/* Right Editorial Copy */}
          <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 flex justify-end">
            <div className="w-full lg:w-[44%] xl:w-[42%] bg-[#0c0a08]/75 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded">
              <div className="mb-4 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.28em] text-[#d5be9b]">
                <span>CRAFTSMANSHIP</span>
                <span className="h-px w-14 bg-[#8c7657]/70" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#f4ead9] font-normal leading-[1.1] mb-5">
                Handcrafted <br />
                with Purpose.
              </h2>

              <p className="text-xs sm:text-sm text-[#c7b8a1] font-light leading-relaxed max-w-md">
                Each MOSAKA basin is shaped, refined and finished by skilled artisans, combining traditional woodcraft with modern precision and finishing technology.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. OUR SIGNATURE FINISHES (3-Card Row)                            */}
        {/* ================================================================= */}
        <section className="about-reveal-section py-14 sm:py-20 bg-[#0c0a08] border-b border-white/10">
          <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
            {/* Centered Divider Header */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
              <span className="h-px flex-1 max-w-[180px] bg-white/15" />
              <h2 className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#f0e2ce] font-medium whitespace-nowrap">
                OUR SIGNATURE FINISHES
              </h2>
              <span className="h-px flex-1 max-w-[180px] bg-white/15" />
            </div>

            {/* 3 Finishes Cards + Circular Arrow */}
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 flex-1">
                {signatureFinishes.map((finish) => (
                  <Link
                    key={finish.id}
                    href={finish.href}
                    className="group relative aspect-[1.55/1] rounded-[4px] overflow-hidden border border-white/10 hover:border-[#d5be9b]/40 transition-all duration-500 shadow-xl"
                  >
                    <img
                      src={finish.image}
                      alt={finish.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(12,10,8,0.05) 35%, rgba(12,10,8,0.88) 100%)',
                      }}
                    />
                    <div className="absolute bottom-4 left-5 right-5 z-10">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#f4ead9] group-hover:text-[#d5be9b] transition-colors font-normal leading-snug">
                        {finish.title}
                      </h3>
                      <p className="text-[11px] text-[#c7b8a1] font-light mt-0.5">
                        {finish.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Circular Explore Arrow */}
              <Link
                href="/shop"
                aria-label="Explore all signature finishes in shop"
                className="hidden lg:flex w-10 h-10 flex-shrink-0 rounded-full border border-white/20 hover:border-[#d5be9b] items-center justify-center text-stone-300 hover:text-[#d5be9b] transition-all hover:scale-105"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. THE MOSAKA EXPERIENCE: "More Than a Basin."                    */}
        {/* ================================================================= */}
        <section className="about-reveal-section relative min-h-[420px] sm:min-h-[470px] flex items-center overflow-hidden">
          {/* Left Warm Walnut Vanity Image */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[64%] overflow-hidden">
            <img
              src="/images/about/warm_walnut_vanity_with_golden_accents.jpg"
              alt="Warm walnut vanity with golden accents"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(12,10,8,0.08) 0%, rgba(12,10,8,0.28) 45%, rgba(12,10,8,0.95) 82%, rgba(12,10,8,1) 100%)',
              }}
            />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0c0a08] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0a08] to-transparent pointer-events-none" />
          </div>

          {/* Right Editorial Copy */}
          <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 flex justify-end">
            <div className="w-full lg:w-[44%] xl:w-[42%] bg-[#0c0a08]/75 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded">
              <div className="mb-4 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.28em] text-[#d5be9b]">
                <span>THE MOSAKA EXPERIENCE</span>
                <span className="h-px w-14 bg-[#8c7657]/70" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#f4ead9] font-normal leading-[1.1] mb-5">
                More Than a Basin.
              </h2>

              <p className="text-xs sm:text-sm text-[#c7b8a1] font-light leading-relaxed mb-7 max-w-md">
                A cohesive collection of basins, taps and accessories for thoughtfully designed bathrooms.
              </p>

              <Link
                href="/shop"
                className="inline-flex items-center gap-3 px-6 py-3 border border-[#d5be9b]/40 hover:border-[#d5be9b] hover:bg-[#d5be9b]/10 text-[11px] uppercase tracking-[0.22em] text-[#f0e2ce] transition-all duration-300 group"
              >
                <span>EXPLORE THE COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d5be9b] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
