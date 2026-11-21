import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsCartOpen, setIsSearchOpen, setIsEnquiryOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      setCollectionsOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0d0d0c]/90 backdrop-blur-md py-3.5 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] text-white font-medium group-hover:text-gold-300 transition-colors">
              MOSAKA
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] tracking-[0.45em] text-stone-400 uppercase font-light -mt-1 group-hover:text-gold-400 transition-colors">
            B A T H W A R E
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-luxury font-medium">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:text-gold-300 relative py-1 transition-colors"
          >
            HOME
            <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-400" />
          </button>

          {/* Collections Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button
              onClick={() => scrollToSection('collections')}
              className="flex items-center gap-1 text-stone-300 hover:text-white py-1 transition-colors group"
            >
              <span>COLLECTIONS</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-300 ${
                  collectionsOpen ? 'rotate-180 text-gold-400' : ''
                }`}
              />
            </button>

            {/* Dropdown panel */}
            {collectionsOpen && (
              <div className="absolute top-full left-0 pt-2 w-56 animate-fade-in">
                <div className="bg-[#141312] border border-white/10 rounded-md shadow-2xl py-2 px-1 backdrop-blur-xl">
                  {[
                    { label: 'Wooden Basins', desc: 'Reclaimed teak & live edge', id: 'collections' },
                    { label: 'Copper & Brass', desc: 'Hand-hammered patina', id: 'collections' },
                    { label: 'Statement Basins', desc: 'Verde marble & stone', id: 'collections' },
                    { label: 'Tapware', desc: 'Swan spouts & aged brass', id: 'collections' },
                    { label: 'Bath Accessories', desc: 'Dispensers & trays', id: 'space' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToSection(item.id)}
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
            onClick={() => scrollToSection('about')}
            className="text-stone-300 hover:text-white py-1 transition-colors"
          >
            ABOUT
          </button>

          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="text-stone-300 hover:text-white py-1 transition-colors"
          >
            CONTACT
          </button>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-stone-300 hover:text-white transition-colors"
            title="Search collection"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
          </button>

          {/* User Account / Trade Portal */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-1.5 text-stone-300 hover:text-white transition-colors"
              title="Trade & Client Account"
              aria-label="User Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#141312] border border-white/10 rounded shadow-xl py-2 px-3 z-30 animate-fade-in text-xs">
                <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Architect & Trade</p>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    setIsEnquiryOpen(true);
                  }}
                  className="w-full text-left py-1.5 text-stone-300 hover:text-gold-300 transition-colors"
                >
                  Trade Portal Login
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    setIsEnquiryOpen(true);
                  }}
                  className="w-full text-left py-1.5 text-stone-300 hover:text-gold-300 transition-colors border-t border-white/5"
                >
                  Request Trade Catalogue
                </button>
              </div>
            )}
          </div>

          {/* Shopping Bag with Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 text-stone-300 hover:text-white transition-colors group"
            title="View Bag"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75] group-hover:text-gold-300 transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-400 text-stone-950 font-bold text-[9px] rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-stone-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d0c] border-b border-white/10 px-6 py-6 animate-fade-in flex flex-col gap-4">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm uppercase tracking-luxury text-white py-2"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('collections')}
            className="text-left text-sm uppercase tracking-luxury text-stone-300 py-2"
          >
            Collections
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-left text-sm uppercase tracking-luxury text-stone-300 py-2"
          >
            About
          </button>
          <button
            onClick={() => {
              setIsEnquiryOpen(true);
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm uppercase tracking-luxury text-stone-300 py-2"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}

