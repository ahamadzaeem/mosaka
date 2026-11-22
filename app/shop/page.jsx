'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { products, categories, materialsFilter } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Eye, ArrowUpRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CartDrawer from '../../components/CartDrawer';
import EnquiryModal from '../../components/EnquiryModal';
import QuickViewModal from '../../components/QuickViewModal';
import SearchModal from '../../components/SearchModal';
import CustomCursor from '../../components/CustomCursor';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [sortBy, setSortBy] = useState('featured');

  const { addToCart, setQuickViewProduct, openEnquiry } = useCart();

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Material filter
    if (selectedMaterial !== 'All Materials') {
      list = list.filter((p) =>
        p.material.toLowerCase().includes(selectedMaterial.toLowerCase().replace('all', '').trim())
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [selectedCategory, selectedMaterial, sortBy]);

  return (
    <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-8 sm:mb-10">
        <Link href="/" className="hover:text-stone-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gold-300">Catalogue & Creations</span>
      </nav>

      {/* Header Section */}
      <div className="border-b border-white/10 pb-8 sm:pb-12 mb-10 sm:mb-14">
        <div className="max-w-3xl">
          <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.28em] text-[#c5a059] block mb-3">
            MOSAKA BATHWARE • DUBAI, UAE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1] mb-5">
            The Architectural Catalogue.
          </h1>
          <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
            A curated collection of sculptural wooden basins, distinctive designer taps, and refined classical accessories. Each piece is selected for its individuality, craftsmanship, and enduring architectural presence.
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? 'bg-[#c5a059] text-stone-950 font-semibold shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                      : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Material & Sorting Controls */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="bg-[#141312] border border-white/10 text-stone-300 text-xs tracking-wider rounded-md px-3.5 py-2 focus:outline-none focus:border-gold-400"
            >
              {materialsFilter.map((mat) => (
                <option key={mat} value={mat} className="bg-[#141312] text-stone-300">
                  {mat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#141312] border border-white/10 text-stone-300 text-xs tracking-wider rounded-md px-3.5 py-2 focus:outline-none focus:border-gold-400"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary Bar */}
      <div className="flex items-center justify-between text-xs text-stone-400 mb-8 tracking-wider uppercase">
        <span>
          Showing <strong className="text-white font-medium">{filteredProducts.length}</strong> distinctive pieces
        </span>
        <span className="text-stone-500 hidden sm:inline">
          Prices in AED • Private Atelier Consultation Available
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-white/5 rounded-lg bg-white/[0.02]">
          <p className="font-serif text-xl text-stone-300 mb-2">No matching pieces found</p>
          <p className="text-xs text-stone-500 uppercase tracking-widest mb-6">
            Try selecting a different material or category
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedMaterial('All Materials');
            }}
            className="px-6 py-2.5 bg-gold-400 text-stone-950 font-medium text-xs uppercase tracking-widest rounded hover:bg-gold-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between bg-[#0e0d0c] rounded-[4px] p-3.5 sm:p-4 border border-white/[0.06] hover:border-[#c5a059]/40 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
            >
              {/* Image Container with Badge */}
              <div className="relative w-full aspect-[1.3/1] overflow-hidden bg-[#161513] rounded-[2px] mb-4">
                {product.badge && (
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 bg-[#0a0a09]/80 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.2em] text-[#e6ca85] rounded-[2px]">
                      {product.badge}
                    </span>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-stone-300 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <Link href={`/shop/${product.slug}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-stone-400 block mb-1">
                    {product.subcategory}
                  </span>

                  <Link href={`/shop/${product.slug}`} className="block">
                    <h3 className="font-serif text-lg sm:text-xl text-white group-hover:text-gold-300 transition-colors font-normal leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-stone-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block">
                      Price
                    </span>
                    <p className="text-sm font-medium text-[#e6ca85] tracking-wide">
                      {product.priceFormatted}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2.5 rounded bg-white/5 hover:bg-gold-400 hover:text-stone-950 text-stone-300 transition-all duration-300"
                      title="Add to project collection"
                      aria-label={`Add ${product.name} to bag`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/shop/${product.slug}`}
                      className="p-2.5 rounded bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white transition-colors"
                      title="View complete specifications"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Editorial Callout */}
      <div className="mt-20 sm:mt-24 p-8 sm:p-12 lg:p-16 rounded-[4px] bg-gradient-to-r from-[#141312] via-[#161514] to-[#121110] border border-white/10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#c5a059] block mb-3 font-semibold">
            BESPOKE & ARCHITECTURAL COMMISSIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal mb-4">
            Require Custom Dimensions or Rare Timber Spec?
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
            Our Dubai atelier works directly with architects, interior designers, and private villa owners to carve bespoke dimensions, source rare teak root burls, or apply custom PVD metallic finishes.
          </p>
          <button
            onClick={() => openEnquiry('Custom Architectural Sourcing Request')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a059] text-stone-950 text-xs uppercase tracking-[0.2em] font-semibold rounded-[2px] hover:bg-[#d4af37] transition-all shadow-[0_4px_20px_rgba(197,160,89,0.25)]"
          >
            <span>Request Bespoke Consultation</span>
            <span>→</span>
          </button>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <img
            src="/images/prod_amezon_exact.jpg"
            alt="Teak Wood Texture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#0a0a09] text-stone-200 selection:bg-gold-500 selection:text-stone-950 font-sans">
      <CustomCursor />
      <Navbar />
      <CartDrawer />
      <EnquiryModal />
      <QuickViewModal />
      <SearchModal />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24 relative overflow-hidden">
        {/* Subtle Ambient Golden Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#c5a059]/10 via-[#c5a059]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

        <Suspense
          fallback={
            <div className="w-full max-w-[1536px] mx-auto px-6 py-24 text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] animate-pulse">
                Loading Mosaka Catalogue...
              </span>
            </div>
          }
        >
          <ShopContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
