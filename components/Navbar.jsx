'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsCartOpen, setIsSearchOpen, openEnquiry } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // ONLY activate dark navbar AFTER the user has scrolled past the hero section!
      const collectionsEl = document.getElementById('collections');
      if (collectionsEl) {
        const rect = collectionsEl.getBoundingClientRect();
        setScrolled(rect.top <= 80);
      } else {
        setScrolled(window.scrollY > window.innerHeight * 2.2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      setCollectionsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top White Outline Border (Present in hero, smoothly hides after hero) */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled ? 'h-0 opacity-0' : 'h-2 sm:h-2.5 bg-white opacity-100'
        }`}
      />

      {/* Main Nav Container: 100% Pure Transparent in Hero (Zero Black Part). Dark bar ONLY after Hero! */}
      <div
        className={`w-full pointer-events-auto transition-all duration-300 h-14 sm:h-16 flex items-center justify-between px-6 sm:px-10 lg:px-14 relative ${
          scrolled
            ? 'bg-[#0a0a09]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        {/* Left Wings: Navigation Links floating directly inside the video frame */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs uppercase tracking-[0.2em] font-medium z-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:text-gold-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] py-1"
          >
            Home
          </button>

          <button
            onClick={() => scrollTo('about')}
            className="text-white hover:text-gold-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] py-1"
          >
            About
          </button>

          {/* Collections Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button
              onClick={() => scrollTo('collections')}
              className="flex items-center gap-1.5 text-white hover:text-gold-300 py-1 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group"
            >
              <span>Collections</span>
              <ChevronDown
                className={`w-3 h-3 text-stone-300 transition-transform duration-200 ${
                  collectionsOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {collectionsOpen && (
              <div className="absolute top-full left-0 pt-2 w-56 animate-fade-in">
                <div className="bg-[#141312]/95 border border-white/10 rounded-md py-2 px-1 shadow-2xl backdrop-blur-md">
                  {[
                    { label: 'Wooden Basins', desc: 'Reclaimed teak & live edge' },
                    { label: 'Copper & Brass', desc: 'Hand-hammered patina' },
                    { label: 'Statement Basins', desc: 'Verde marble & stone' },
                    { label: 'Tapware', desc: 'Sculpted swan & brass spouts' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollTo('collections')}
                      className="w-full text-left px-3 py-2 text-stone-300 hover:text-gold-300 hover:bg-white/5 rounded transition-all text-xs flex flex-col"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-[10px] text-stone-500">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => scrollTo('featured-pieces')}
            className="text-stone-200 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] py-1"
          >
            Featured
          </button>
        </nav>

        {/* Mobile menu toggle (Left on mobile) */}
        <div className="flex md:hidden items-center z-10">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-gold-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ============================================================== */}
        {/* CENTER WHITE NOTCH: Bleeds directly from the top white border  */}
        {/* ============================================================== */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 w-[190px] sm:w-[220px] md:w-[230px] h-[58px] sm:h-[66px] md:h-[68px]">
          {/* Custom Inverted-Trapezoid Tab with Angled Sides & Rounded Bottom */}
          <svg
            viewBox="0 0 220 56"
            preserveAspectRatio="none"
            className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
          >
            <path
              d="M 0,0 L 20,44 Q 25,54 36,54 L 184,54 Q 195,54 200,44 L 220,0 Z"
              fill="#ffffff"
            />
          </svg>

          {/* Official Brand Logo Inside White Tab */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute inset-0 flex items-center justify-center pb-1.5 px-4 cursor-pointer group"
          >
            <img
              src="/images/mosaka_logo.png"
              alt="MOSAKA BATHWARE"
              className="h-7 sm:h-8 md:h-[32px] w-auto max-w-[85%] object-contain group-hover:opacity-75 transition-opacity"
            />
          </button>
        </div>

        {/* Right Wings: Navigation Links & Actions floating directly over the video */}
        <div className="flex items-center gap-5 sm:gap-7 lg:gap-8 z-10">
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-xs uppercase tracking-[0.2em] font-medium">
            <button
              onClick={() => scrollTo('complete-space')}
              className="text-stone-200 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] py-1"
            >
              Gallery
            </button>

            <button
              onClick={() => scrollTo('footer')}
              className="text-stone-200 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] py-1"
            >
              Contact
            </button>

            {/* Book Now / Enquire CTA Link with Diagonal Arrow ↗ */}
            <button
              onClick={() => openEnquiry('Direct Website Inquiry')}
              className="flex items-center gap-1.5 text-white hover:text-gold-300 transition-colors py-1 font-semibold group drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              <span>Book Now</span>
              <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </button>
          </nav>

          {/* Icons: Search & Cart */}
          <div className="flex items-center gap-3 sm:gap-4 pl-2 border-l border-white/20">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-stone-200 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[1.8]" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-stone-200 hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              title="Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-gold-400 text-stone-950 text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden bg-[#0a0a09]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 animate-fade-in">
          <nav className="flex flex-col gap-5 text-sm uppercase tracking-[0.2em]">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="text-left text-white hover:text-gold-300 py-1"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left text-stone-300 hover:text-gold-300 py-1"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('collections')}
              className="text-left text-stone-300 hover:text-gold-300 py-1"
            >
              Collections
            </button>
            <button
              onClick={() => scrollTo('featured-pieces')}
              className="text-left text-stone-300 hover:text-gold-300 py-1"
            >
              Featured Pieces
            </button>
            <button
              onClick={() => scrollTo('footer')}
              className="text-left text-stone-300 hover:text-gold-300 py-1"
            >
              Contact
            </button>
            <button
              onClick={() => {
                openEnquiry('Mobile Menu Inquiry');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gold-300 font-semibold py-1"
            >
              <span>Book Now</span>
              <span>↗</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
