'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/product/ProductCard';
import { Filter, Grid, List, SlidersHorizontal, Search, RotateCcw, Check, Star, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const allProducts = [
  // MOBILE PHONES
  {
    _id: 'prod_1',
    title: 'Samsung Galaxy S24 Ultra 5G (512GB Titanium Gray)',
    slug: 'samsung-galaxy-s24-ultra-5g',
    brand: 'Samsung',
    category: 'Mobile Phones',
    price: 134999,
    offerPrice: 124999,
    discountPercentage: 7,
    rating: 4.9,
    reviewCount: 342,
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 5899,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: true
  },
  {
    _id: 'prod_2',
    title: 'Apple iPhone 15 Pro Max (256GB Natural Titanium)',
    slug: 'apple-iphone-15-pro-max',
    brand: 'Apple',
    category: 'Mobile Phones',
    price: 159900,
    offerPrice: 148900,
    discountPercentage: 7,
    rating: 4.9,
    reviewCount: 512,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 6999,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  },
  {
    _id: 'prod_112',
    title: 'OnePlus 12 5G (256GB Silky Black, 12GB RAM)',
    slug: 'oneplus-12-5g',
    brand: 'OnePlus',
    category: 'Mobile Phones',
    price: 69999,
    offerPrice: 64999,
    discountPercentage: 7,
    rating: 4.8,
    reviewCount: 210,
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 3199,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isTodayDeal: false
  },

  // REFRIGERATORS & FRIDGES
  {
    _id: 'prod_101',
    title: 'Godrej 244L 3 Star Inverter Frost Free Double Door Refrigerator',
    slug: 'godrej-244l-double-door-refrigerator',
    brand: 'Godrej',
    category: 'Refrigerators',
    price: 31990,
    offerPrice: 24990,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 156,
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 1199,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  },
  {
    _id: 'prod_102',
    title: 'Samsung 236L 3 Star Digital Inverter Frost Free Refrigerator',
    slug: 'samsung-236l-refrigerator',
    brand: 'Samsung',
    category: 'Refrigerators',
    price: 33990,
    offerPrice: 25990,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 289,
    images: ['https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 1249,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    isTodayDeal: false
  },

  // AIR CONDITIONERS (AC)
  {
    _id: 'prod_6',
    title: 'Daikin 1.5 Ton 5 Star Inverter Split AC Dew Clean',
    slug: 'daikin-1-5-ton-5-star-inverter-ac',
    brand: 'Daikin',
    category: 'Air Conditioners',
    price: 67200,
    offerPrice: 45490,
    discountPercentage: 32,
    rating: 4.7,
    reviewCount: 230,
    images: ['https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 2199,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  },
  {
    _id: 'prod_105',
    title: 'Voltas 1.5 Ton 3 Star Adjustable Inverter Split AC',
    slug: 'voltas-1-5-ton-3-star-inverter-ac',
    brand: 'Voltas',
    category: 'Air Conditioners',
    price: 62990,
    offerPrice: 37990,
    discountPercentage: 39,
    rating: 4.6,
    reviewCount: 412,
    images: ['https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 1799,
    isFeatured: false,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  },

  // INVERTERS & BATTERIES
  {
    _id: 'prod_107',
    title: 'Luminous Zelio+ 1100 Sine Wave Inverter & Red Charge 150Ah Battery',
    slug: 'luminous-zelio-1100-inverter-battery-combo',
    brand: 'Luminous',
    category: 'Inverter',
    price: 24990,
    offerPrice: 18990,
    discountPercentage: 24,
    rating: 4.8,
    reviewCount: 178,
    images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 899,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTodayDeal: false
  },

  // SMART TVS
  {
    _id: 'prod_3',
    title: 'LG C3 65" 4K Smart OLED TV Dolby Vision & Atmos',
    slug: 'lg-c3-65-inch-4k-oled-tv',
    brand: 'LG',
    category: 'Smart TVs',
    price: 249990,
    offerPrice: 189990,
    discountPercentage: 24,
    rating: 4.8,
    reviewCount: 189,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 8999,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: false,
    isNewArrival: true
  },
  {
    _id: 'prod_115',
    title: 'Sony Bravia 55" 4K Ultra HD Smart LED Google TV',
    slug: 'sony-bravia-55-4k-google-tv',
    brand: 'Sony',
    category: 'Smart TVs',
    price: 99900,
    offerPrice: 62990,
    discountPercentage: 37,
    rating: 4.9,
    reviewCount: 520,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 2999,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  },

  // LAPTOPS
  {
    _id: 'prod_5',
    title: 'Apple MacBook Pro 16" M3 Max (36GB RAM, 1TB SSD)',
    slug: 'apple-macbook-pro-16-m3-max',
    brand: 'Apple',
    category: 'Laptops',
    price: 399900,
    offerPrice: 374900,
    discountPercentage: 6,
    rating: 5.0,
    reviewCount: 94,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 16999,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isTodayDeal: false
  },
  {
    _id: 'prod_118',
    title: 'HP Pavilion 15 Intel Core i5 13th Gen (16GB RAM / 512GB SSD)',
    slug: 'hp-pavilion-15-core-i5-13th-gen',
    brand: 'HP',
    category: 'Laptops',
    price: 74990,
    offerPrice: 58990,
    discountPercentage: 21,
    rating: 4.7,
    reviewCount: 310,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 2799,
    isFeatured: false,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  },

  // HEADPHONES & AUDIO
  {
    _id: 'prod_4',
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    brand: 'Sony',
    category: 'Headphones',
    price: 34990,
    offerPrice: 26990,
    discountPercentage: 22,
    rating: 4.9,
    reviewCount: 840,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: true,
    emiStartingAt: 1299,
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: true
  },

  // KITCHEN APPLIANCES
  {
    _id: 'prod_124',
    title: 'Bajaj Rex 500W Mixer Grinder with 3 Stainless Steel Jars',
    slug: 'bajaj-rex-500w-mixer-grinder',
    brand: 'Bajaj',
    category: 'Kitchen Appliances',
    price: 3899,
    offerPrice: 2299,
    discountPercentage: 41,
    rating: 4.5,
    reviewCount: 640,
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80'],
    emiAvailable: false,
    emiStartingAt: 0,
    isFeatured: false,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  }
];

const categoriesList = [
  'All',
  'Mobile Phones',
  'Refrigerators',
  'Air Conditioners',
  'Inverter',
  'Smart TVs',
  'Laptops',
  'Headphones',
  'Kitchen Appliances'
];

const brandsList = ['All', 'Samsung', 'Apple', 'Godrej', 'LG', 'Sony', 'Daikin', 'Voltas', 'Luminous', 'OnePlus', 'HP', 'Bajaj'];

function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(400000);
  const [minRating, setMinRating] = useState(0);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      if (selectedBrand !== 'All' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      if (p.offerPrice > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (onlyDeals && !p.isTodayDeal) return false;
      if (onlyBestSeller && !p.isBestSeller) return false;
      if (initialSearch) {
        const q = initialSearch.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.offerPrice - b.offerPrice;
      if (sortBy === 'price-high') return b.offerPrice - a.offerPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      return 0;
    });
  }, [selectedCategory, selectedBrand, maxPrice, minRating, onlyDeals, onlyBestSeller, sortBy, initialSearch]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMaxPrice(400000);
    setMinRating(0);
    setOnlyDeals(false);
    setOnlyBestSeller(false);
    setSortBy('featured');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 space-y-8">
      
      {/* 1. Header Banner & Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md">
                FLIPKART & AMAZON STYLE CATALOGUE
              </span>
              <span className="text-xs text-slate-400 font-bold">• Verified Genuine Electronics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-slate-900 mt-2">
              {initialSearch ? `Search results for "${initialSearch}"` : selectedCategory !== 'All' ? selectedCategory : 'All Electronics, Mobiles, TVs, ACs & Fridges'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">Showing {filteredProducts.length} top rated items with official brand warranty & EMI</p>
          </div>

          {/* Controls: Grid/List Toggle & Sort By */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-white shadow text-blue-600 font-bold' : 'text-slate-500'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-white shadow text-blue-600 font-bold' : 'text-slate-500'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-400 cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Highest Discount %</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Main Body (Filters Sidebar + Products Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filters (4 cols) */}
          <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 font-black text-slate-900 font-outfit text-base">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Filters</span>
              </div>
              <button onClick={resetFilters} className="text-xs text-rose-600 font-bold hover:underline flex items-center space-x-1">
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>

            {/* Department Category Tree */}
            <div>
              <h4 className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-2.5">Category</h4>
              <div className="space-y-1 text-xs">
                {categoriesList.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center justify-between ${selectedCategory === cat ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-2.5">Select Brand</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                {brandsList.map((brand, i) => (
                  <label key={i} className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer hover:text-blue-600">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="accent-blue-600"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Max Price</span>
                <span className="text-blue-600 font-extrabold">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="400000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Rating Filter */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-2.5">Customer Rating</h4>
              <div className="space-y-1.5 text-xs">
                {[4.5, 4.0, 3.5, 0].map((rate, i) => (
                  <label key={i} className="flex items-center space-x-2 cursor-pointer font-medium text-slate-700 hover:text-blue-600">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rate}
                      onChange={() => setMinRating(rate)}
                      className="accent-blue-600"
                    />
                    <span>{rate > 0 ? `${rate}★ & above` : 'All Ratings'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Badges Toggles */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
              <label className="flex items-center space-x-2 font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyDeals}
                  onChange={(e) => setOnlyDeals(e.target.checked)}
                  className="accent-blue-600 rounded"
                />
                <span className="flex items-center gap-1 text-blue-600">⚡ Today's Hot Deals</span>
              </label>
              <label className="flex items-center space-x-2 font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyBestSeller}
                  onChange={(e) => setOnlyBestSeller(e.target.checked)}
                  className="accent-blue-600 rounded"
                />
                <span className="flex items-center gap-1 text-amber-600">🔥 Best Sellers Only</span>
              </label>
            </div>

          </div>

          {/* Right Product Grid Area (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/80 space-y-4 shadow-xs">
                <span className="text-5xl">🔍</span>
                <h3 className="text-xl font-extrabold font-outfit text-slate-900">No matching electronics found</h3>
                <p className="text-xs text-slate-500">Try adjusting your filters or price limit to explore more items.</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#2563EB] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs hover:bg-blue-700 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6' : 'space-y-4'}>
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-bold">Loading Store Catalog...</div>}>
      <ShopPageContent />
    </Suspense>
  );
}
