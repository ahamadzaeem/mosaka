'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import {
  ShoppingBag,
  ArrowLeft,
  Shield,
  Truck,
  Sparkles,
  Download,
  Share2,
  Eye,
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CartDrawer from '../../../components/CartDrawer';
import EnquiryModal from '../../../components/EnquiryModal';
import QuickViewModal from '../../../components/QuickViewModal';
import SearchModal from '../../../components/SearchModal';
import CustomCursor from '../../../components/CustomCursor';

export default function ProductDetailClient({ product, pairedProducts }) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const { addToCart, openEnquiry, setQuickViewProduct } = useCart();

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const images = product?.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="min-h-screen bg-[#0a0a09] text-stone-200 selection:bg-gold-500 selection:text-stone-950 font-sans">
      <CustomCursor />
      <Navbar />
      <CartDrawer />
      <EnquiryModal />
      <QuickViewModal />
      <SearchModal />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24 relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-24 left-1/3 w-[600px] h-[400px] bg-gradient-to-b from-[#c5a059]/10 via-transparent to-transparent blur-[140px] pointer-events-none -z-10" />

        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          {/* Top Breadcrumb & Back Link */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
            <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400">
              <Link href="/" className="hover:text-stone-300 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-stone-300 transition-colors">
                Catalogue
              </Link>
              <span>/</span>
              <span className="text-stone-500">{product.subcategory}</span>
              <span>/</span>
              <span className="text-gold-300 truncate max-w-[200px]">{product.name}</span>
            </nav>

            <button
              onClick={() => router.push('/shop')}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-gold-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalogue</span>
            </button>
          </div>

          {/* MAIN PRODUCT HERO SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            {/* LEFT COLUMN: Gallery & Visual Showcase (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative w-full aspect-[1.3/1] bg-[#141312] rounded-[4px] border border-white/10 overflow-hidden shadow-2xl group">
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-[#0a0a09]/85 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.22em] text-[#e6ca85] rounded-[2px] font-medium shadow-md">
                      {product.badge}
                    </span>
                  </div>
                )}

                <img
                  src={images[activeImageIndex] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/5 text-[9px] uppercase tracking-[0.25em] text-stone-400">
                  Mosaka Atelier • Dubai
                </div>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-3">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 sm:w-24 aspect-[1.3/1] rounded-[2px] overflow-hidden border transition-all duration-300 ${
                        activeImageIndex === idx
                          ? 'border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                          : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-[4px] bg-white/[0.02] border border-white/5 text-center mt-2">
                <div className="flex flex-col items-center justify-center p-2">
                  <Sparkles className="w-4 h-4 text-[#c5a059] mb-1.5" />
                  <span className="text-[10px] uppercase tracking-wider text-stone-300 font-medium">
                    Artisan Carved
                  </span>
                  <span className="text-[9px] text-stone-500">100% Unique Grain</span>
                </div>

                <div className="flex flex-col items-center justify-center p-2 border-x border-white/5">
                  <Shield className="w-4 h-4 text-[#c5a059] mb-1.5" />
                  <span className="text-[10px] uppercase tracking-wider text-stone-300 font-medium">
                    10-Year Warranty
                  </span>
                  <span className="text-[9px] text-stone-500">Hydro-Shield Protected</span>
                </div>

                <div className="flex flex-col items-center justify-center p-2">
                  <Truck className="w-4 h-4 text-[#c5a059] mb-1.5" />
                  <span className="text-[10px] uppercase tracking-wider text-stone-300 font-medium">
                    White-Glove Delivery
                  </span>
                  <span className="text-[9px] text-stone-500">Dubai & Worldwide</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Information & Atelier Actions (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c5a059]">
                    {product.subcategory}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider text-stone-400">
                      Available on Order
                    </span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-white font-normal leading-[1.1] mb-3">
                  {product.name}
                </h1>

                <p className="text-stone-300 text-sm font-light leading-relaxed mb-6 italic">
                  "{product.tagline}"
                </p>

                <div className="flex items-baseline gap-3 pb-6 mb-6 border-b border-white/10">
                  <span className="text-2xl sm:text-3xl font-normal text-[#e6ca85] tracking-wide">
                    {product.priceFormatted}
                  </span>
                  <span className="text-xs text-stone-500 uppercase tracking-wider">
                    • Net Atelier Price
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-[4px] bg-[#141312] border border-white/5 mb-6 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                      Material
                    </span>
                    <span className="text-stone-200 font-medium">{product.material}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                      Finish
                    </span>
                    <span className="text-stone-200 font-medium">{product.finish}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                      Dimensions
                    </span>
                    <span className="text-stone-200 font-medium">{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                      Installation
                    </span>
                    <span className="text-stone-200 font-medium">{product.mounting}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-white/15 rounded bg-white/5">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-3 text-stone-300 hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-3 text-xs font-semibold text-white min-w-[36px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-3 text-stone-300 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => addToCart(product, quantity)}
                      className="flex-grow flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-stone-950 text-xs uppercase tracking-[0.2em] font-semibold rounded-[2px] transition-all shadow-[0_4px_24px_rgba(197,160,89,0.3)]"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[2]" />
                      <span>Add to Project Bag</span>
                    </button>
                  </div>

                  <button
                    onClick={() => openEnquiry(`Project Inquiry: ${product.name} (${quantity} units)`)}
                    className="w-full py-3.5 px-6 border border-white/20 hover:border-gold-300 hover:bg-white/5 text-stone-200 hover:text-gold-300 text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>Enquire for Architectural / Villa Project</span>
                    <span>↗</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-white/10">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 hover:text-stone-300 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? 'Link Copied!' : 'Share Creation'}</span>
                  </button>

                  <button
                    onClick={() => openEnquiry(`CAD / Spec Sheet Request: ${product.name}`)}
                    className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Request CAD / 3D Spec Sheet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TABBED ARCHITECTURAL SPECIFICATIONS */}
          <div className="mt-16 sm:mt-24 pt-12 border-t border-white/10">
            <div className="flex items-center gap-8 border-b border-white/10 pb-4 mb-8 overflow-x-auto text-xs uppercase tracking-[0.22em]">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-4 -mb-[18px] transition-all font-medium whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'text-[#c5a059] border-b-2 border-[#c5a059]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Technical Specifications
              </button>

              <button
                onClick={() => setActiveTab('story')}
                className={`pb-4 -mb-[18px] transition-all font-medium whitespace-nowrap ${
                  activeTab === 'story'
                    ? 'text-[#c5a059] border-b-2 border-[#c5a059]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Craftsmanship & Provenance
              </button>

              <button
                onClick={() => setActiveTab('care')}
                className={`pb-4 -mb-[18px] transition-all font-medium whitespace-nowrap ${
                  activeTab === 'care'
                    ? 'text-[#c5a059] border-b-2 border-[#c5a059]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Care & Preservation
              </button>
            </div>

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
                <div>
                  <h3 className="font-serif text-xl text-white font-normal mb-4">
                    Architectural Data & Dimensions
                  </h3>
                  <div className="divide-y divide-white/5 border border-white/5 rounded bg-[#141312] p-5 text-xs">
                    {Object.entries(product.specifications || {}).map(([key, value]) => (
                      <div key={key} className="py-2.5 flex items-center justify-between">
                        <span className="text-stone-400">{key}</span>
                        <span className="text-stone-200 font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-white font-normal mb-4">
                    Key Features & Design Intent
                  </h3>
                  <ul className="space-y-3 text-xs text-stone-300 font-light">
                    {(product.features || []).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-5 rounded bg-white/[0.02] border border-white/5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-2">
                      Plumbing & Waste Compatibility
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      All Mosaka basins use standard international 45mm drain cutouts compatible with standard unslotted free-flow or push-click basin wastes. Standard G 1¼" brass tailpipes supplied.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'story' && (
              <div className="max-w-4xl animate-fade-in text-stone-300 text-sm leading-relaxed font-light space-y-5">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-4">
                  The Story of This Piece
                </h3>
                <p>{product.description}</p>
                <p>{product.story}</p>
                <div className="p-6 rounded-[4px] bg-[#141312] border-l-2 border-[#c5a059] text-xs text-stone-400 leading-relaxed italic">
                  "At MOSAKA Bathware, we believe a basin or tap can be more than a functional fixture. It can be the defining artistic soul of the bathroom."
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-3xl animate-fade-in space-y-6 text-xs text-stone-300 font-light leading-relaxed">
                <h3 className="font-serif text-2xl text-white font-normal">
                  Preserving Your Mosaka Creation
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded bg-[#141312] border border-white/5">
                    <h4 className="font-medium text-white mb-1.5 uppercase tracking-wider text-[11px] text-[#e6ca85]">
                      Daily Maintenance
                    </h4>
                    <p className="text-stone-400">
                      Rinse the basin with clean warm water after use and gently pat dry with a soft microfiber cloth. This prevents water droplet mineral spotting from hard water.
                    </p>
                  </div>

                  <div className="p-4 rounded bg-[#141312] border border-white/5">
                    <h4 className="font-medium text-white mb-1.5 uppercase tracking-wider text-[11px] text-[#e6ca85]">
                      Cleaning Agents
                    </h4>
                    <p className="text-stone-400">
                      Use pH-neutral soap or mild dish liquid. Never use abrasive scouring pads, bleach, ammonia, acidic cleaners, or solvent-based chemicals on natural timber or PVD brass.
                    </p>
                  </div>

                  <div className="p-4 rounded bg-[#141312] border border-white/5">
                    <h4 className="font-medium text-white mb-1.5 uppercase tracking-wider text-[11px] text-[#e6ca85]">
                      Timber Nourishment
                    </h4>
                    <p className="text-stone-400">
                      For wooden basins, an application of organic beeswax conditioner or refined teak oil every 6–12 months enhances water beading and maintains the rich luminous depth of the grain.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* "COMPLETE THE SPACE" COMPANIONS */}
          {pairedProducts && pairedProducts.length > 0 && (
            <div className="mt-24 sm:mt-32 pt-16 border-t border-white/10">
              <div className="flex items-center justify-between mb-8 sm:mb-12">
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#c5a059] block mb-2">
                    COMPLETE THE SPACE
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal">
                    Curated Companions for This Piece
                  </h2>
                </div>

                <Link
                  href="/shop"
                  className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-gold-300 transition-colors"
                >
                  <span>Explore Full Catalog</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {pairedProducts.map((paired) => (
                  <div
                    key={paired.id}
                    className="group bg-[#0e0d0c] rounded-[4px] p-4 border border-white/[0.06] hover:border-[#c5a059]/40 transition-all duration-500"
                  >
                    <div className="relative w-full aspect-[1.3/1] bg-[#161513] rounded-[2px] overflow-hidden mb-4">
                      <Link href={`/shop/${paired.slug}`} className="block w-full h-full">
                        <img
                          src={paired.image}
                          alt={paired.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </Link>

                      <button
                        onClick={() => setQuickViewProduct(paired)}
                        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-stone-300 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-1">
                          {paired.subcategory}
                        </span>
                        <Link href={`/shop/${paired.slug}`}>
                          <h3 className="font-serif text-lg text-white group-hover:text-gold-300 transition-colors font-normal">
                            {paired.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-stone-400 line-clamp-1 mt-1 font-light">
                          {paired.material}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                        <span className="text-sm font-medium text-[#e6ca85]">
                          {paired.priceFormatted}
                        </span>

                        <button
                          onClick={() => addToCart(paired)}
                          className="p-2 rounded bg-white/5 hover:bg-gold-400 hover:text-stone-950 text-stone-300 transition-all"
                          title="Add to project"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

