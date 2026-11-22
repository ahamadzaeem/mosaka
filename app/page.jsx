'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider, useCart } from '../context/CartContext';
import LoadingScreen from '../components/LoadingScreen';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import AboutSection from '../components/AboutSection';
import FeaturedPieces from '../components/FeaturedPieces';
import CompleteTheSpace from '../components/CompleteTheSpace';
import EnquiryBanner from '../components/EnquiryBanner';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import SearchModal from '../components/SearchModal';
import QuickViewModal from '../components/QuickViewModal';
import EnquiryModal from '../components/EnquiryModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Toast() {
  const { notification } = useCart();
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[150] bg-[#141312] border border-gold-400/40 text-white px-4 py-3 rounded shadow-2xl flex items-center gap-3 animate-fade-in text-xs">
      <span className="w-2 h-2 rounded-full bg-gold-400"></span>
      <span>{notification}</span>
    </div>
  );
}

function PageContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ultra smooth luxury momentum scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
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
    <div className="relative min-h-screen bg-[#0a0a09] text-[#e3ded9]">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
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

      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <EnquiryModal />
      <Toast />
    </div>
  );
}

export default function Home() {
  return <PageContent />;
}
