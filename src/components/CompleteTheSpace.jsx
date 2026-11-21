import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus, Sparkles, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const hotspots = [
  {
    id: 'faucet',
    x: '34%',
    y: '53%',
    title: 'Aura Wall-Mount Brass Mixer',
    desc: 'Dual-cross knurled levers with aerated natural stream',
    price: 'AED 3,200',
  },
  {
    id: 'basin',
    x: '45%',
    y: '68%',
    title: 'Tectona Sculpted Vessel',
    desc: 'Heartwood Burmese teak turned from a single timber block',
    price: 'AED 5,850',
  },
  {
    id: 'dispenser',
    x: '20%',
    y: '65%',
    title: 'Smoked Amber Glass Dispenser',
    desc: 'Heavy-gauge mouth-blown glass with brushed brass pump',
    price: 'AED 620',
  },
];

export default function CompleteTheSpace() {
  const sectionRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const { setIsEnquiryOpen } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.space-image-col', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      });

      gsap.from('.space-text-col', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="space" ref={sectionRef} className="py-20 sm:py-28 bg-[#0a0a09] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Atmospheric Vanity Visual with Interactive Hotspots */}
          <div className="lg:col-span-7 space-image-col relative rounded-xl overflow-hidden border border-white/10 shadow-2xl group bg-stone-900">
            <div className="relative aspect-[16/10] sm:aspect-[16/11]">
              <img
                src="/assets/space_img_pure.jpg"
                alt="Mosaka complete bathware arrangement"
                className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Hotspot Pins */}
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  style={{ left: spot.x, top: spot.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                    className="relative w-7 h-7 rounded-full bg-gold-400/90 text-stone-950 flex items-center justify-center shadow-lg transition-transform hover:scale-125 focus:outline-none"
                    title={spot.title}
                  >
                    <span className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-60" />
                    <Plus className={`w-3.5 h-3.5 transition-transform duration-300 ${activeHotspot?.id === spot.id ? 'rotate-45' : ''}`} />
                  </button>

                  {/* Hotspot tooltip */}
                  {activeHotspot?.id === spot.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-[#161514]/95 border border-white/20 rounded shadow-2xl backdrop-blur-md z-30 animate-fade-in text-left">
                      <div className="flex justify-between items-start">
                        <span className="font-serif text-sm text-white font-medium">{spot.title}</span>
                        <button
                          onClick={() => setActiveHotspot(null)}
                          className="text-stone-400 hover:text-white p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">{spot.desc}</p>
                      <span className="font-serif text-xs text-gold-300 block mt-2">{spot.price}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-wider text-stone-400 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Tap + to inspect pieces</span>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 space-text-col">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium block mb-3">
              COMPLETE THE SPACE
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-[1.15] mb-5">
              Basins. Taps. <br />
              <span className="italic font-light text-stone-300">Accessories.</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-9 max-w-md">
              A cohesive collection for thoughtfully designed bathrooms.
            </p>

            <MagneticButton
              onClick={() => setIsEnquiryOpen(true)}
              className="group px-7 py-3.5 border border-white/20 hover:border-gold-400 text-stone-200 hover:text-white text-[11px] tracking-luxury uppercase flex items-center gap-3 transition-all duration-300 bg-white/[0.02] hover:bg-gold-400/10 backdrop-blur-sm"
            >
              <span>EXPLORE ACCESSORIES</span>
              <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1.5 transition-transform" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

