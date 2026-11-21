'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const { openEnquiry } = useCart();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080807] text-[#9c9790] pt-16 sm:pt-20 pb-12 border-t border-white/5">
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Top 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group inline-block mb-4 text-left"
            >
              <img
                src="/images/mosaka_logo_white.png"
                alt="MOSAKA BATHWARE"
                className="h-9 sm:h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <p className="text-xs text-stone-400 font-light mt-2 leading-relaxed max-w-xs">
              Sculptural bathware for contemporary living.
            </p>
          </div>

          {/* Column 2: COLLECTIONS */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white mb-5">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-stone-400">
              <li>
                <button onClick={() => scrollTo('collections')} className="hover:text-white transition-colors">
                  Wooden Basins
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('collections')} className="hover:text-white transition-colors">
                  Copper & Brass
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('collections')} className="hover:text-white transition-colors">
                  Statement Basins
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('collections')} className="hover:text-white transition-colors">
                  Tapware
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('collections')} className="hover:text-white transition-colors">
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white mb-5">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-stone-400">
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">
                  About Mosaka
                </button>
              </li>
              <li>
                <button onClick={() => openEnquiry('Contact MOSAKA')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => openEnquiry('Projects & Trade Sourcing')} className="hover:text-white transition-colors">
                  Projects & Trade
                </button>
              </li>
              <li>
                <button onClick={() => openEnquiry('Care & Maintenance Protocols')} className="hover:text-white transition-colors">
                  Care & Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white mb-5">
              GET IN TOUCH
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-stone-400 mb-6">
              <li className="flex items-start gap-2.5">
                <svg className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Meydan Grandstand, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+971504383675" className="hover:text-white transition-colors">
                  +971 50 438 3675
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:info@mosakabathware.com" className="hover:text-white transition-colors">
                  info@mosakabathware.com
                </a>
              </li>
            </ul>

            {/* Social Icons matching design */}
            <div className="flex items-center gap-3">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9"></circle>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-light gap-4">
          <p>© 2026 Mosaka Bathware. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#shipping" className="hover:text-stone-300 transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
