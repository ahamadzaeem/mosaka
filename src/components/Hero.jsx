import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

const heroSlides = [
  {
    id: '01',
    subtitle: 'LUXURY BATHWARE',
    titleLine1: 'Where Elements',
    titleLine2: 'Become Art.',
    description: 'The grain of wood. The glow of copper. The lustre of brass.',
    image: '/assets/hero_basin.jpg',
    materialTag: 'Natural Teak & Marquina Marble',
  },
  {
    id: '02',
    subtitle: 'HAND-FORGED METALS',
    titleLine1: 'Reflecting Light,',
    titleLine2: 'Forging Time.',
    description: 'Ancient copper beating techniques merged with architectural restraint.',
    image: '/assets/col_copper_pure.jpg',
    materialTag: 'Hammered Aged Copper',
  },
  {
    id: '03',
    subtitle: 'SCULPTURAL NATURAL STONE',
    titleLine1: 'Verde Serpentine,',
    titleLine2: 'Nature’s Poetry.',
    description: 'Mined from deep quarries, polished to an organic fluted curve.',
    image: '/assets/col_statement_pure.jpg',
    materialTag: 'Verde Guatemala Marble',
  },
  {
    id: '04',
    subtitle: 'ARTISANAL BRASS TAPWARE',
    titleLine1: 'The Graceful Flow',
    titleLine2: 'Of Golden Water.',
    description: 'Sculptural avian spouts cast in solid brass with ceramic cartridges.',
    image: '/assets/col_tapware_pure.jpg',
    materialTag: 'Brushed Golden Brass',
  },
];

export default function Hero() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  const activeSlide = heroSlides[activeSlideIndex];

  // GSAP initial entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.hero-badge', {
        opacity: 0,
        y: -15,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from('.hero-title-line', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.hero-desc', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.6')
      .from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.hero-visual-container', {
        opacity: 0,
        scale: 0.96,
        duration: 1.4,
        ease: 'power2.out',
      }, '-=1.1');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Slide transition animation
  const changeSlide = (index) => {
    if (index === activeSlideIndex) return;

    gsap.to('.hero-animated-content', {
      opacity: 0,
      y: -10,
      duration: 0.3,
      onComplete: () => {
        setActiveSlideIndex(index);
        gsap.fromTo(
          '.hero-animated-content',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      },
    });

    gsap.fromTo(
      imageRef.current,
      { opacity: 0.5, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    );
  };

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    glowRef.current.style.background = `radial-gradient(circle 500px at ${x}% ${y}%, rgba(212,180,125,0.08), transparent 70%)`;
  };

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#0c0c0b]"
    >
      {/* Dynamic Ambient Glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-all duration-300"
      />

      {/* Atmospheric Background Layer (subtle vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,95,50,0.15),rgba(12,12,11,1))]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Typography */}
        <div className="lg:col-span-6 z-10 hero-animated-content">
          {/* Subtitle Badge */}
          <div className="hero-badge flex items-center gap-3 mb-6">
            <span className="h-[1px] w-6 bg-gold-400/60" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-stone-400 font-medium">
              {activeSlide.subtitle}
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-white tracking-[-0.02em] mb-6"
          >
            <span className="block hero-title-line">{activeSlide.titleLine1}</span>
            <span className="block hero-title-line italic font-light text-[#ded7cd]">
              {activeSlide.titleLine2}
            </span>
          </h1>

          {/* Poetic description */}
          <p className="hero-desc font-serif italic text-lg sm:text-xl text-stone-400 max-w-lg mb-10 leading-relaxed font-light">
            "{activeSlide.description}"
          </p>

          {/* CTA & Slider Navigation */}
          <div className="hero-cta flex flex-col sm:flex-row sm:items-center gap-8 pt-2">
            <MagneticButton
              onClick={scrollToCollections}
              className="group px-7 py-3.5 border border-white/20 hover:border-gold-400 text-stone-200 hover:text-white text-[11px] tracking-luxury uppercase flex items-center gap-3 transition-all duration-300 bg-white/[0.02] hover:bg-gold-400/10 backdrop-blur-sm"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            {/* Slide Indicators: 01 02 03 04 */}
            <div className="flex items-center gap-5 text-xs font-serif text-stone-500 tracking-wider">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => changeSlide(idx)}
                  className={`relative pb-1 transition-all duration-300 flex flex-col items-center group ${
                    activeSlideIndex === idx
                      ? 'text-white font-medium scale-105'
                      : 'hover:text-stone-300'
                  }`}
                >
                  <span>{slide.id}</span>
                  {activeSlideIndex === idx && (
                    <span className="absolute bottom-0 w-full h-[1.5px] bg-gold-400 animate-fade-in" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual composition */}
        <div className="lg:col-span-6 relative hero-visual-container flex justify-center items-center">
          <div className="relative w-full max-w-xl group">
            {/* Halo light behind mirror */}
            <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gold-400/20 blur-[90px] pointer-events-none -z-10 animate-float-slow" />

            {/* Basin Display Container with dark luxury frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-stone-900/60 to-black/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-sm">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <img
                  ref={imageRef}
                  src={activeSlide.image}
                  alt="Mosaka luxury bathware handcrafted basin"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Material Tag Pill */}
                <div className="absolute bottom-4 left-5 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                  <span className="text-[10px] uppercase tracking-luxury text-stone-300">
                    {activeSlide.materialTag}
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle floating architectural spec badge */}
            <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-[#141312]/95 border border-white/10 rounded-lg p-3.5 shadow-2xl backdrop-blur-md items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400">Hand-Carved Piece</p>
                <p className="font-serif text-sm text-stone-200">Dubai Architectural Studio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer" onClick={scrollToCollections}>
        <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-1">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-gold-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

