import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import AboutSection from './components/AboutSection';
import FeaturedPieces from './components/FeaturedPieces';
import CompleteTheSpace from './components/CompleteTheSpace';
import EnquiryBanner from './components/EnquiryBanner';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import EnquiryModal from './components/EnquiryModal';
import CustomCursor from './components/CustomCursor';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function ToastNotification() {
  const { notification } = useCart();
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[150] bg-[#141312] border border-gold-400/40 text-white px-4 py-3 rounded-md shadow-2xl flex items-center gap-2.5 animate-fade-in text-xs">
      <div className="w-5 h-5 rounded-full bg-gold-400 text-stone-950 flex items-center justify-center">
        <Check className="w-3 h-3 stroke-[3]" />
      </div>
      <span>{notification}</span>
    </div>
  );
}

function MainContent() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0b0a] text-[#e3ded9] overflow-x-hidden selection:bg-gold-400/30 selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <AboutSection />
        <FeaturedPieces />
        <CompleteTheSpace />
        <EnquiryBanner />
      </main>
      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <EnquiryModal />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
