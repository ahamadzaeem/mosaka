'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowUpRight,
  X,
  Menu,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../../components/CartDrawer';
import EnquiryModal from '../../components/EnquiryModal';
import CustomCursor from '../../components/CustomCursor';

const categoryIcons = {
  'All Products': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Basins: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12h16c0 4.4-3.6 8-8 8s-8-3.6-8-8z" />
      <path d="M7 12V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  Taps: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 10V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
      <path d="M4 10h12v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
      <path d="M10 17v4" />
      <path d="M7 21h6" />
    </svg>
  ),
  Accessories: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="13" width="18" height="6" rx="2" />
      <path d="M7 13V8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v5" />
    </svg>
  ),
};

const FINISH_COLOR_MAP = {
  teak: '#69472e',
  wood: '#69472e',
  mahogany: '#5c2d1d',
  gold: '#c69b42',
  brass: '#dfb752',
  antique: '#7a5a32',
  emerald: '#164b35',
  green: '#164b35',
  bamboo: '#d8c2a0',
  beige: '#d8c2a0',
  chrome: '#e5e7eb',
  silver: '#e5e7eb',
  black: '#111111',
  copper: '#a65d32',
};

function getFinishColor(name = '') {
  const lower = name.toLowerCase();
  for (const [key, hex] of Object.entries(FINISH_COLOR_MAP)) {
    if (lower.includes(key)) return hex;
  }
  return '#c69b42';
}

export default function ShopPage() {
  const router = useRouter();
  const {
    cartCount,
    setIsCartOpen,
    addToCart,
    products: shopifyProducts,
    productsLoading,
  } = useCart();

  const [category, setCategory] = useState('All Products');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sort, setSort] = useState('Featured');
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const allProducts = shopifyProducts || [];

  // Dynamically derive categories, materials, finishes, and subcategories from live Shopify products
  const categories = useMemo(() => {
    const counts = new Map();
    allProducts.forEach((p) => {
      const cat = p.category || 'Other';
      counts.set(cat, (counts.get(cat) || 0) + 1);
    });
    const list = [{ id: 'all', label: 'All Products', count: allProducts.length }];
    counts.forEach((count, label) => {
      list.push({ id: label, label, count });
    });
    return list;
  }, [allProducts]);

  const materialsList = useMemo(() => {
    const counts = new Map();
    allProducts.forEach((p) => {
      if (p.material) counts.set(p.material, (counts.get(p.material) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [allProducts]);

  const finishesList = useMemo(() => {
    const seen = new Set();
    allProducts.forEach((p) => {
      if (p.finish) seen.add(p.finish);
    });
    return Array.from(seen).map((name) => ({
      name,
      color: getFinishColor(name),
    }));
  }, [allProducts]);

  const subcategoriesList = useMemo(() => {
    const seen = new Set();
    allProducts.forEach((p) => {
      if (p.subcategory) seen.add(p.subcategory);
    });
    return Array.from(seen);
  }, [allProducts]);

  // Filter live Shopify products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (category !== 'All Products') {
      result = result.filter((p) => p.category === category);
    }

    if (selectedMaterials.length) {
      result = result.filter((p) =>
        selectedMaterials.some((mat) =>
          (p.material || '').toLowerCase().includes(mat.toLowerCase())
        )
      );
    }

    if (selectedFinishes.length) {
      result = result.filter((p) =>
        selectedFinishes.some((fin) =>
          (p.finish || '').toLowerCase().includes(fin.toLowerCase())
        )
      );
    }

    if (selectedSubcategories.length) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        `${p.name} ${p.material || ''} ${p.category || ''} ${p.subcategory || ''} ${p.tagline || ''}`
          .toLowerCase()
          .includes(q)
      );
    }

    if (sort === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'Name: A to Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [allProducts, category, selectedMaterials, selectedFinishes, selectedSubcategories, sort, search]);

  const toggleFilter = (value, selected, setter) => {
    setter(
      selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]
    );
  };

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedFinishes([]);
    setSelectedSubcategories([]);
    setCategory('All Products');
    setSearch('');
  };

  return (
    <main className="min-h-screen bg-[#110f0b] text-[#eee0c9] font-sans selection:bg-[#d5be9b] selection:text-[#110f0b]">
      <CustomCursor />
      <CartDrawer />
      <EnquiryModal />

      {/* ===================================================================== */}
      {/* 1. TOP NAVIGATION HEADER                                              */}
      {/* ===================================================================== */}
      <header className="relative z-30 flex w-full items-center justify-between border-b border-white/10 px-6 py-5 md:px-12 bg-[#110f0b]/90 backdrop-blur-md">
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="text-[#e9d8bd] md:hidden p-1"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        <nav className="hidden items-center gap-9 text-[12px] tracking-[0.14em] uppercase font-medium md:flex">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/#collections" className="transition hover:text-white">
            Collections
          </Link>
          <Link href="/shop" className="border-b-2 border-[#d5be9b] pb-1 text-[#e8c99d] font-semibold">
            Shop
          </Link>
          <Link href="/about" className="transition hover:text-white">
            About
          </Link>
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center group cursor-pointer py-1"
        >
          <img
            src="/images/mosaka_logo_white.png"
            alt="MOSAKA BATHWARE"
            className="h-8 sm:h-10 md:h-[42px] w-auto max-w-[240px] object-contain group-hover:opacity-80 transition-all drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          />
        </Link>

        <div className="flex items-center gap-5 sm:gap-6">
          <button
            aria-label="Search products"
            onClick={() => setShowSearch(!showSearch)}
            className="text-stone-300 hover:text-white transition-colors"
          >
            <Search size={19} strokeWidth={1.4} />
          </button>

          <button
            aria-label="Wishlist"
            onClick={() => {}}
            className="relative text-stone-300 hover:text-white transition-colors"
          >
            <Heart size={19} strokeWidth={1.4} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#d5be9b] text-[9px] font-bold text-[#110f0b]">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            aria-label="Shopping bag"
            onClick={() => setIsCartOpen(true)}
            className="relative text-stone-300 hover:text-white transition-colors"
          >
            <ShoppingBag size={19} strokeWidth={1.4} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#d5be9b] text-[9px] font-bold text-[#110f0b]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 flex flex-col gap-8 bg-[#110f0b] p-10 pt-24 text-2xl font-serif md:hidden border-b border-white/10 animate-fade-in">
          <button
            className="absolute right-6 top-6 text-stone-400 hover:text-white"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <Link href="/" onClick={() => setMobileMenu(false)}>
            Home
          </Link>
          <Link href="/#collections" onClick={() => setMobileMenu(false)}>
            Collections
          </Link>
          <Link href="/shop" onClick={() => setMobileMenu(false)} className="text-[#e4c59d]">
            Shop All Catalog
          </Link>
          <Link href="/about" onClick={() => setMobileMenu(false)}>
            About Mosaka
          </Link>
        </div>
      )}

      {/* Expandable Search Bar */}
      {showSearch && (
        <div className="relative z-40 border-b border-white/10 bg-[#1c1813] px-6 py-4 md:px-12 animate-fade-in">
          <div className="mx-auto flex max-w-5xl items-center gap-4">
            <Search size={18} className="text-[#d5be9b]" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Shopify catalog by name, material, or finish..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#887d6d] text-white"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs uppercase tracking-wider text-stone-400 hover:text-white"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setShowSearch(false)}
              className="text-stone-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. HERO SECTION                                                       */}
      {/* ===================================================================== */}
      <section className="relative flex min-h-[460px] sm:min-h-[500px] md:min-h-[520px] items-center overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-[75%_center] md:bg-right lg:bg-right"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(17,15,11,1) 0%, rgba(17,15,11,0.94) 34%, rgba(17,15,11,0.55) 60%, rgba(17,15,11,0.1) 85%, transparent 100%), url('/images/shop-hero-teak-vanity.jpg')",
          }}
        />

        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#d5be9b]/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3.5 text-[11px] uppercase tracking-[0.28em] text-[#d5be9b]">
              <span>SHOP</span>
              <span className="h-px w-14 bg-[#8c7657]/70" />
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.94] tracking-tight text-[#f0e2ce] font-normal">
              Our
              <br />
              Collections
            </h1>

            <p className="mt-6 max-w-[320px] text-xs sm:text-sm leading-relaxed text-[#c9bda9] font-light">
              Sculptural basins and refined tapware, crafted for exceptional spaces.
            </p>

            <a
              href="#products"
              className="mt-7 inline-flex items-center gap-2.5 border-b border-[#d6b78d] pb-1.5 text-[11px] uppercase tracking-[0.2em] text-[#e8c99d] transition-all hover:text-white hover:border-white"
            >
              <span>Explore collection</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. CATEGORY NAVIGATION PILLS BAR                                      */}
      {/* ===================================================================== */}
      <section className="px-5 py-8 md:px-12 md:py-10 border-b border-white/5 bg-[#14120e]/60">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {categories.map((item) => {
            const isActive = category === item.label;
            return (
              <button
                key={item.id}
                onClick={() => setCategory(item.label)}
                className={`flex items-center gap-2.5 rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#d5be9b] text-[#110f0b] shadow-[0_2px_16px_rgba(213,190,155,0.25)] font-semibold'
                    : 'border border-[#463a2b] text-[#d5c6af] hover:border-[#d5be9b] hover:text-white bg-transparent'
                }`}
              >
                <span className={isActive ? 'text-[#110f0b]' : 'text-[#a99a83]'}>
                  {categoryIcons[item.label] || categoryIcons['All Products']}
                </span>
                <span>
                  {item.label} ({item.count})
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. MAIN PRODUCT CATALOG AREA (100% Live Shopify)                      */}
      {/* ===================================================================== */}
      <section id="products" className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 md:px-14 py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-baseline gap-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f0e2ce] font-normal">
              {category === 'All Products' ? 'Discover' : category}
            </h2>
            <span className="text-xs text-[#a99b85] tracking-wider uppercase">
              {productsLoading ? 'Syncing with Shopify...' : `${filteredProducts.length} Products`}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d5c6af] hover:text-white lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={15} />
              <span>Filters</span>
            </button>

            <label className="flex items-center gap-2 text-xs text-[#d5c6af]">
              <span className="text-[#887d6d]">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer bg-transparent text-[#e4c59d] text-xs outline-none font-medium pr-1"
              >
                <option value="Featured" className="bg-[#17140f] text-white">
                  Featured
                </option>
                <option value="Price: Low to High" className="bg-[#17140f] text-white">
                  Price: Low to High
                </option>
                <option value="Price: High to Low" className="bg-[#17140f] text-white">
                  Price: High to Low
                </option>
                <option value="Name: A to Z" className="bg-[#17140f] text-white">
                  Name: A to Z
                </option>
              </select>
            </label>

            <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-white/10 text-stone-400">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'text-[#d5be9b]' : 'hover:text-white'
                }`}
                title="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' ? 'text-[#d5be9b]' : 'hover:text-white'
                }`}
                title="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[210px_1fr] xl:grid-cols-[230px_1fr]">
          {/* SIDEBAR FILTERS */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block pr-2`}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#f0e2ce]">Filter</h3>
              <button
                onClick={clearFilters}
                className="text-[11px] uppercase tracking-wider text-[#c7a87d] hover:text-white underline underline-offset-4"
              >
                Clear All
              </button>
            </div>

            {categories.length > 1 && (
              <FilterGroup title="Category" defaultOpen={true}>
                {categories.slice(1).map((item) => {
                  const isChecked = category === item.label;
                  return (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-center justify-between py-1.5 text-xs text-[#c9bda9] hover:text-white transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => setCategory(isChecked ? 'All Products' : item.label)}
                          className="accent-[#d5be9b] w-3.5 h-3.5 rounded"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] text-[#786b59] group-hover:text-stone-400">
                        ({item.count})
                      </span>
                    </label>
                  );
                })}
              </FilterGroup>
            )}

            {materialsList.length > 0 && (
              <FilterGroup title="Material" defaultOpen={true}>
                {materialsList.map((item) => (
                  <label
                    key={item.name}
                    className="flex cursor-pointer items-center justify-between py-1.5 text-xs text-[#c9bda9] hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(item.name)}
                        onChange={() =>
                          toggleFilter(item.name, selectedMaterials, setSelectedMaterials)
                        }
                        className="accent-[#d5be9b] w-3.5 h-3.5 rounded"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-[#786b59] group-hover:text-stone-400">
                      ({item.count})
                    </span>
                  </label>
                ))}
              </FilterGroup>
            )}

            {finishesList.length > 0 && (
              <FilterGroup title="Finish" defaultOpen={true}>
                {finishesList.map((item) => (
                  <label
                    key={item.name}
                    className="flex cursor-pointer items-center gap-3 py-1.5 text-xs text-[#c9bda9] hover:text-white transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFinishes.includes(item.name)}
                      onChange={() =>
                        toggleFilter(item.name, selectedFinishes, setSelectedFinishes)
                      }
                      className="accent-[#d5be9b] w-3.5 h-3.5 rounded"
                    />
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-white/20 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </label>
                ))}
              </FilterGroup>
            )}

            {subcategoriesList.length > 0 && (
              <FilterGroup title="Subcategory" defaultOpen={false}>
                {subcategoriesList.map((subcat) => (
                  <label
                    key={subcat}
                    className="flex cursor-pointer items-center gap-2.5 py-1.5 text-xs text-[#c9bda9] hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(subcat)}
                      onChange={() =>
                        toggleFilter(subcat, selectedSubcategories, setSelectedSubcategories)
                      }
                      className="accent-[#d5be9b] w-3.5 h-3.5 rounded"
                    />
                    <span>{subcat}</span>
                  </label>
                ))}
              </FilterGroup>
            )}

            <button
              onClick={clearFilters}
              className="mt-6 text-xs text-[#c8aa80] hover:text-white underline underline-offset-4 tracking-wider uppercase"
            >
              Reset filters
            </button>
          </aside>

          {/* PRODUCT CARDS */}
          <div>
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 lg:gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[1.38/1] bg-white/5 rounded-[2px] mb-3.5" />
                    <div className="h-6 w-2/3 bg-white/5 rounded mb-2" />
                    <div className="h-3 w-1/3 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 lg:gap-8'
                    : 'flex flex-col gap-6'
                }
              >
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <article
                      key={product.id}
                      onClick={() => router.push(`/shop/${product.slug}`)}
                      className="group cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative aspect-[1.38/1] overflow-hidden rounded-[2px] bg-[#1a1712] mb-3.5 shadow-lg border border-white/[0.04] group-hover:border-[#d5be9b]/30 transition-all duration-500">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          loading="lazy"
                        />

                        <button
                          aria-label="Add to wishlist"
                          onClick={(e) => toggleWishlist(e, product.id)}
                          className="absolute right-3.5 top-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 backdrop-blur-md text-white transition hover:bg-black/60 hover:scale-110"
                        >
                          <Heart
                            size={16}
                            strokeWidth={1.5}
                            fill={isWishlisted ? '#e3c59d' : 'none'}
                            color={isWishlisted ? '#e3c59d' : 'white'}
                          />
                        </button>

                        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#110f0b]/85 px-4 py-3 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="flex w-full items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#e8c99d] hover:text-white"
                          >
                            <span>Quick view</span>
                            <ArrowUpRight size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-3 pt-1">
                        <div>
                          <h3 className="font-serif text-xl sm:text-2xl text-[#f0e2ce] group-hover:text-[#e4c59d] transition-colors font-normal leading-snug">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-xs text-[#a99a83] font-light">
                            {product.subcategory || product.category}
                            {product.material ? ` · ${product.material}` : ''}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          <p className="whitespace-nowrap text-sm font-medium text-[#e3c59d] tracking-wide">
                            {product.priceFormatted}
                          </p>

                          <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#d5be9b] flex items-center justify-center text-stone-400 group-hover:text-[#d5be9b] transition-colors">
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : allProducts.length === 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center border border-white/10 rounded bg-white/[0.02] p-8">
                <p className="font-serif text-2xl text-[#f0e2ce]">
                  No Products Published in Shopify Yet
                </p>
                <p className="mt-3 max-w-md text-xs text-[#a99b85] leading-relaxed">
                  Your storefront is connected to <strong className="text-[#e4c59d]">gx9me0-fg.myshopify.com</strong>. Add or import products in Shopify Admin and publish them to your Headless sales channel to display them here automatically.
                </p>
                <a
                  href="https://admin.shopify.com/store/gx9me0-fg/products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border-b border-[#d5be9b] pb-1 text-xs uppercase tracking-widest text-[#d5be9b] hover:text-white"
                >
                  <span>Open Shopify Products Admin</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center border border-white/5 rounded bg-white/[0.01] p-8">
                <p className="font-serif text-2xl text-[#f0e2ce]">No products found</p>
                <p className="mt-3 text-xs text-[#a99b85] uppercase tracking-wider">
                  Try adjusting or clearing your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 border-b border-[#d5be9b] pb-1 text-xs uppercase tracking-widest text-[#d5be9b] hover:text-white"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* PAGINATION */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 sm:mt-20 flex items-center justify-center gap-2.5 sm:gap-3 text-xs">
                <button
                  aria-label="Previous page"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="h-8 w-8 rounded-full border border-white/15 hover:border-[#d5be9b] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>

                <button
                  onClick={() => setCurrentPage(1)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-[#d5be9b] text-[#110f0b] font-bold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  1
                </button>

                <button
                  aria-label="Next page"
                  onClick={() => setCurrentPage(1)}
                  className="h-8 w-8 rounded-full border border-white/15 hover:border-[#d5be9b] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. PRODUCT QUICK VIEW MODAL                                           */}
      {/* ===================================================================== */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative grid w-full max-w-4xl overflow-hidden bg-[#1c1813] border border-white/10 rounded-[3px] md:grid-cols-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close quick view"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-stone-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative bg-[#14120e] min-h-[300px] flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#c8a77a] font-medium">
                  {selectedProduct.category} · {selectedProduct.material}
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[#f0e2ce] font-normal leading-tight">
                  {selectedProduct.name}
                </h2>
                <p className="mt-3 text-xs leading-relaxed text-[#bcae98] font-light">
                  {selectedProduct.description}
                </p>
                <p className="mt-6 font-serif text-2xl text-[#e4c59d]">
                  {selectedProduct.priceFormatted}
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2.5 bg-[#d5be9b] hover:bg-[#e4c59d] px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-[#110f0b] font-semibold transition-all rounded-[2px]"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Bag</span>
                </button>

                <Link
                  href={`/shop/${selectedProduct.slug}`}
                  onClick={() => setSelectedProduct(null)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 hover:border-gold-300 px-5 py-3.5 text-xs uppercase tracking-[0.18em] text-[#eee0c9] hover:text-gold-300 transition-colors rounded-[2px]"
                >
                  <span>View Product</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 6. FOOTER                                                             */}
      {/* ===================================================================== */}
      <footer className="border-t border-white/10 px-6 py-14 md:px-16 lg:px-20 bg-[#0d0b08]">
        <div className="w-full max-w-[1536px] mx-auto flex flex-col justify-between gap-10 md:flex-row items-start">
          <div>
            <h2 className="font-serif text-3xl tracking-[0.2em] text-[#f2eee6]">MOSAKA</h2>
            <p className="mt-1 text-[9px] uppercase tracking-[0.55em] text-[#a99a83]">BATHWARE</p>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-[#a99b85] font-light">
              Where Elements Become Art. Sculptural forms and refined materials for exceptional spaces. Dubai, United Arab Emirates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-16 text-xs">
            <div className="space-y-3.5">
              <p className="text-[#e2c39a] font-medium tracking-wider uppercase text-[11px]">Explore</p>
              <Link className="block text-[#b6a993] hover:text-white transition-colors" href="/shop">
                Shop Catalogue
              </Link>
              <Link className="block text-[#b6a993] hover:text-white transition-colors" href="/#collections">
                Collections
              </Link>
              <Link className="block text-[#b6a993] hover:text-white transition-colors" href="/about">
                Our Story
              </Link>
            </div>
            <div className="space-y-3.5">
              <p className="text-[#e2c39a] font-medium tracking-wider uppercase text-[11px]">Connect</p>
              <Link className="block text-[#b6a993] hover:text-white transition-colors" href="/#footer">
                Contact
              </Link>
              <Link className="block text-[#b6a993] hover:text-white transition-colors" href="/shop">
                Projects
              </Link>
              <Link className="block text-[#b6a993] hover:text-white transition-colors" href="/about">
                Atelier
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1536px] mx-auto mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10.5px] text-[#857966] md:flex-row">
          <p>© 2026 MOSAKA BATHWARE. All rights reserved.</p>
          <p>Dubai, United Arab Emirates • Worldwide Shipping.</p>
        </div>
      </footer>
    </main>
  );
}

function FilterGroup({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-white/10 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="mb-2.5 flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.18em] font-medium text-[#d5c6af] hover:text-white transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          size={14}
          className={`text-[#a89472] transition-transform duration-300 ${open ? '' : '-rotate-90'}`}
        />
      </button>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
}
