import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Compass, Hammer, Sparkles, X } from 'lucide-react';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

const materialDetails = [
  {
    id: 'wood',
    name: 'Ancient Teak Root',
    origin: 'Reclaimed Sustainable Heartwood',
    description: 'Resistant to moisture and rich in natural silica oils. Hand-carved along the natural grain lines of salvaged roots.',
    image: '/assets/mat_wood_pure.jpg',
  },
  {
    id: 'copper',
    name: 'Hand-Hammered Copper',
    origin: 'High-Purity Recycled Red Copper',
    description: 'Repeatedly annealed and dimpled with hand mallet strikes. Naturally antimicrobial with an ever-deepening living patina.',
    image: '/assets/mat_copper_pure.jpg',
  },
  {
    id: 'brass',
    name: 'Brushed Architectural Brass',
    origin: 'Solid Solid-Core Brass Alloy',
    description: 'Precision milled and satin brushed by hand to reflect soft architectural downlighting without glare.',
    image: '/assets/mat_brass_pure.jpg',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.material-swatch', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#0c0c0b] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Brand Statement */}
          <div className="lg:col-span-6 about-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium block mb-3">
              ABOUT MOSAKA
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-[1.15] mb-6">
              Nature creates. <br />
              <span className="italic font-light text-stone-300">MOSAKA curates.</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xl">
              At Mosaka Bathware, we believe a basin can be more than a functional element.
              It can be the defining feature of a space.
            </p>

            <button
              onClick={() => setShowStoryModal(true)}
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-luxury text-stone-200 hover:text-gold-300 transition-colors"
            >
              <span>OUR STORY</span>
              <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Right Column: 3 Material Swatches */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-3 sm:gap-4">
            {materialDetails.map((mat) => (
              <TiltCard
                key={mat.id}
                onClick={() => setSelectedMaterial(mat)}
                className="material-swatch group rounded-lg overflow-hidden bg-stone-900 border border-white/10 hover:border-gold-400/60 transition-colors aspect-square relative cursor-pointer"
              >
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-black/60 backdrop-blur-sm rounded text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] uppercase tracking-wider text-gold-300 font-medium block truncate">
                    {mat.name}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* Material Detail Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedMaterial(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative w-full max-w-md bg-[#141312] border border-white/10 rounded-lg p-6 shadow-2xl z-10 animate-fade-in">
            <button
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-4 right-4 p-1 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] rounded overflow-hidden mb-4 border border-white/10">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-[10px] uppercase tracking-luxury text-gold-400">Material Spec</span>
            <h3 className="font-serif text-2xl text-white mt-1 mb-1">{selectedMaterial.name}</h3>
            <p className="text-xs text-stone-400 mb-3">{selectedMaterial.origin}</p>
            <p className="text-sm text-stone-300 font-light leading-relaxed mb-4">
              {selectedMaterial.description}
            </p>

            <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-xs text-stone-400">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Sourced responsibly & hand-finished for longevity</span>
            </div>
          </div>
        </div>
      )}

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div
            onClick={() => setShowStoryModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative w-full max-w-2xl bg-[#141312] border border-white/10 rounded-lg p-8 shadow-2xl z-10 animate-fade-in max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-luxury text-gold-400">Our Heritage & Craft</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white mt-2 mb-4">
              Sculptural Bathware for Contemporary Living
            </h3>

            <div className="space-y-4 text-stone-300 text-sm leading-relaxed font-light">
              <p>
                Founded with a singular vision in Dubai, MOSAKA elevates utilitarian bath elements into focal centerpieces of architectural serenity. We collaborate with generational carvers, master metalsmiths, and stone artisans to celebrate raw textures.
              </p>
              <p>
                No two pieces leaving our studio are identical. Whether it is an Amazon basin revealing 80 years of subterranean growth in wild teak root, or a hand-dimpled Nile basin shaped over days of methodical hammer strikes, every vessel carries human touch and geological time.
              </p>
              <p>
                Our collections are specified by leading interior architects across Dubai, Abu Dhabi, Riyadh, London, and Paris for private sanctuary residences and boutique hospitality.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-gold-400" />
                <span className="text-xs uppercase tracking-wider text-stone-300">Design Studio: Meydan, Dubai</span>
              </div>
              <button
                onClick={() => setShowStoryModal(false)}
                className="px-5 py-2 border border-gold-400/50 text-gold-300 text-xs uppercase tracking-luxury hover:bg-gold-400/10"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

