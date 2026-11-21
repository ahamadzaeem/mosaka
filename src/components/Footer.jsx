import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const { setIsEnquiryOpen, setIsSearchOpen } = useCart();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080807] text-[#a39e97] pt-20 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group inline-block mb-4"
            >
              <span className="font-serif text-3xl tracking-[0.28em] text-white font-medium group-hover:text-gold-300 transition-colors block">
                MOSAKA
              </span>
              <span className="text-[9px] tracking-[0.45em] text-stone-400 uppercase font-light block -mt-0.5">
                B A T H W A R E
              </span>
            </div>

            <p className="text-xs text-stone-400 font-light max-w-xs leading-relaxed">
              Sculptural bathware for contemporary living.
            </p>
          </div>

          {/* Column 2: Collections */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white mb-5">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <button
                  onClick={() => scrollTo('collections')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Wooden Basins
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('collections')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Copper & Brass
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('collections')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Statement Basins
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('collections')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Tapware
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('space')}
                  className="hover:text-gold-300 transition-colors"
                >
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white mb-5">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-gold-300 transition-colors"
                >
                  About Mosaka
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="hover:text-gold-300 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="hover:text-gold-300 transition-colors"
                >
                  Projects & Trade
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="hover:text-gold-300 transition-colors"
                >
                  Care & Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white mb-5">
              GET IN TOUCH
            </h4>
            <ul className="space-y-3 text-xs font-light mb-6">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Meydan Grandstand, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+971504383675" className="hover:text-white transition-colors">
                  +971 50 438 3675
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@mosakabathware.com" className="hover:text-white transition-colors">
                  info@mosakabathware.com
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-stone-400">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-gold-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-gold-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-gold-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <circle cx="12" cy="12" r="9"></circle>
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
