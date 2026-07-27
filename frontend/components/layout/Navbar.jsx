'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Search, ShoppingBag, Heart, User, ShoppingCart, Menu, ChevronDown, Flame, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const mainCategories = [
  { name: 'Mobile Phones', icon: '📱' },
  { name: 'Refrigerators', icon: '❄️' },
  { name: 'Air Conditioners', icon: '🌬️' },
  { name: 'Inverter', icon: '🔋' },
  { name: 'Smart TVs', icon: '📺' },
  { name: 'Laptops', icon: '💻' },
  { name: 'Headphones', icon: '🎧' },
  { name: 'Washing Machines', icon: '🧺' },
  { name: 'Kitchen Appliances', icon: '🍳' }
];

function NavbarContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cartCount = useSelector(state => state.cart?.totalQuantity || 0);
  const wishlistCount = useSelector(state => state.wishlist?.items?.length || 0);

  const isTodayDealActive = pathname === '/products' && searchParams.get('todayDeal') === 'true';
  const isNewArrivalActive = pathname === '/products' && searchParams.get('newArrival') === 'true';
  const isBestSellerActive = pathname === '/products' && searchParams.get('bestSeller') === 'true';
  const isFeaturedActive = pathname === '/products' && searchParams.get('featured') === 'true';
  const isProductsActive = pathname === '/products' && !isTodayDealActive && !isNewArrivalActive && !isBestSellerActive && !isFeaturedActive;
  const isHomeActive = pathname === '/';
  const isContactActive = pathname === '/contact';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      let query = `/products?search=${encodeURIComponent(searchTerm.trim())}`;
      if (selectedCategory !== 'All Categories') {
        query += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      router.push(query);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group flex-shrink-0">
          <div className="w-11 h-11 rounded-xl bg-[#2563EB] flex items-center justify-center relative shadow-md">
            <ShoppingBag className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900">
              e
            </div>
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Electro<span className="text-[#2563EB]">Mart</span>
            </span>
            <span className="block text-[11px] font-medium text-slate-500 -mt-1 tracking-wide">
              Smart Technology, Better Life
            </span>
          </div>
        </Link>

        {/* Search Bar with Category Selector */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex items-center">
          <div className="w-full flex items-center bg-slate-50 border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#2563EB] focus-within:border-[#2563EB] transition-all">
            
            {/* Category Dropdown inside Search */}
            <div className="relative border-r border-slate-200 bg-slate-100 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                className="px-3.5 py-2.5 text-xs font-medium text-slate-700 flex items-center space-x-1.5 hover:bg-slate-200 transition"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isCatDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto py-1">
                  <button
                    type="button"
                    onClick={() => { setSelectedCategory('All Categories'); setIsCatDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#2563EB]"
                  >
                    All Categories
                  </button>
                  {mainCategories.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => { setSelectedCategory(cat.name); setIsCatDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] truncate flex items-center space-x-2"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-3 transition-colors flex items-center justify-center flex-shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          
          {/* My Account */}
          <Link href="/customer/dashboard" className="hidden sm:flex items-center space-x-2 text-slate-700 hover:text-[#2563EB] transition group">
            <User className="w-6 h-6 text-slate-600 group-hover:text-[#2563EB] transition-colors" />
            <div className="text-left text-xs leading-tight">
              <span className="block font-semibold text-slate-900">My Account</span>
              <span className="text-[11px] text-slate-500">Sign in / Register</span>
            </div>
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative flex items-center space-x-1.5 text-slate-700 hover:text-[#2563EB] transition group">
            <div className="relative">
              <Heart className="w-6 h-6 text-slate-600 group-hover:text-[#2563EB] transition-colors" />
              <span className="absolute -top-1.5 -right-2 bg-[#2563EB] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {wishlistCount}
              </span>
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-slate-800">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center space-x-1.5 text-slate-700 hover:text-[#2563EB] transition group">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-slate-600 group-hover:text-[#2563EB] transition-colors" />
              <span className="absolute -top-1.5 -right-2 bg-[#2563EB] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-slate-800">Cart</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-700 p-1"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Row (Shown on small screens) */}
      <div className="px-4 pb-3 pt-1 border-t border-slate-100 md:hidden bg-white">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="w-full flex items-center bg-slate-100 border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2563EB]">
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#2563EB] text-white px-4 py-2 text-xs flex items-center justify-center font-bold"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Sub Navigation Bar (Browse Categories + Links + Today's Deals) */}
      <div className="border-t border-slate-200 bg-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2.5 text-xs font-medium">
          
          {/* Browse Categories Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 font-bold text-xs transition shadow-xs"
            >
              <Menu className="w-4 h-4" />
              <span>Browse Categories</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-80" />
            </button>

            {/* Browse Categories Dropdown */}
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-0.5">
                {mainCategories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center space-x-2.5 text-slate-700 hover:text-[#2563EB] hover:bg-blue-50 px-3 py-2 rounded-lg transition text-xs font-semibold"
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Nav Links with Dynamic Active Highlight */}
          <nav className="flex items-center space-x-7 text-xs font-semibold">
            
            {/* Home */}
            <Link
              href="/"
              className={`transition-colors py-1 ${isHomeActive ? 'text-[#2563EB] font-extrabold border-b-2 border-[#2563EB]' : 'text-slate-700 hover:text-[#2563EB]'}`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                className={`flex items-center space-x-1 py-1 transition-colors ${isProductsActive ? 'text-[#2563EB] font-extrabold border-b-2 border-[#2563EB]' : 'text-slate-700 hover:text-[#2563EB]'}`}
              >
                <span>Products</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isProductsDropdownOpen && (
                <div
                  onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-1"
                >
                  <Link
                    href="/products"
                    onClick={() => setIsProductsDropdownOpen(false)}
                    className="block px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 hover:bg-blue-50 hover:text-[#2563EB]"
                  >
                    View All Products
                  </Link>
                  <div className="border-t border-slate-100 my-1"></div>
                  {mainCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setIsProductsDropdownOpen(false)}
                      className="block px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-blue-50 hover:text-[#2563EB]"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Top Deals */}
            <Link
              href="/products?todayDeal=true"
              className={`transition-colors py-1 ${isTodayDealActive ? 'text-[#2563EB] font-extrabold border-b-2 border-[#2563EB]' : 'text-slate-700 hover:text-[#2563EB]'}`}
            >
              Top Deals
            </Link>

            {/* Brands */}
            <Link
              href="/products?featured=true"
              className={`transition-colors py-1 ${isFeaturedActive ? 'text-[#2563EB] font-extrabold border-b-2 border-[#2563EB]' : 'text-slate-700 hover:text-[#2563EB]'}`}
            >
              Brands
            </Link>

            {/* New Arrivals */}
            <Link
              href="/products?newArrival=true"
              className={`transition-colors py-1 ${isNewArrivalActive ? 'text-[#2563EB] font-extrabold border-b-2 border-[#2563EB]' : 'text-slate-700 hover:text-[#2563EB]'}`}
            >
              New Arrivals
            </Link>

            {/* Best Sellers */}
            <Link
              href="/products?bestSeller=true"
              className={`transition-colors py-1 ${isBestSellerActive ? 'text-[#2563EB] font-extrabold border-b-2 border-[#2563EB]' : 'text-slate-700 hover:text-[#2563EB]'}`}
            >
              Best Sellers
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              className={`transition-colors py-1 ${isContactActive ? 'text-[#2563EB] font-extrabold border-b-2 border-[#2563EB]' : 'text-slate-700 hover:text-[#2563EB]'}`}
            >
              Contact Us
            </Link>

          </nav>

          {/* Today's Deals Button */}
          <Link
            href="/products?todayDeal=true"
            className={`border px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center space-x-1.5 shadow-2xs ${isTodayDealActive ? 'bg-blue-50 border-[#2563EB] text-[#2563EB]' : 'border-slate-200 text-slate-800 hover:bg-slate-50'}`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>Today's Deals</span>
          </Link>

        </div>
      </div>

      {/* SLIDE-OVER MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 bg-[#040C26] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold">
                  e
                </div>
                <div>
                  <span className="font-extrabold text-lg tracking-tight">Electro<span className="text-[#2563EB]">Mart</span></span>
                  <span className="block text-[9px] text-slate-400">Smart Technology</span>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-300 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick User Account Banner */}
            <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  RK
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">Rahul Kumar</div>
                  <div className="text-[10px] text-slate-500">rahul@electromart.in</div>
                </div>
              </div>
              <Link
                href="/customer/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[10px] font-bold text-blue-600 bg-white px-2.5 py-1 rounded-full border border-blue-200"
              >
                Profile ›
              </Link>
            </div>

            {/* Navigation List */}
            <div className="p-4 space-y-4 text-xs font-semibold">
              <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Navigation</div>
              
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-slate-800 hover:text-[#2563EB] py-1">
                <span>🏠 Home</span>
              </Link>
              
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-slate-800 hover:text-[#2563EB] py-1">
                <span>📦 All Products</span>
              </Link>

              <Link href="/products?todayDeal=true" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-slate-800 hover:text-[#2563EB] py-1">
                <span>🔥 Top Deals</span>
              </Link>

              <Link href="/products?newArrival=true" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-slate-800 hover:text-[#2563EB] py-1">
                <span>✨ New Arrivals</span>
              </Link>

              <Link href="/products?bestSeller=true" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-slate-800 hover:text-[#2563EB] py-1">
                <span>⭐ Best Sellers</span>
              </Link>

              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 text-slate-800 hover:text-[#2563EB] py-1">
                <span>📞 Contact Us</span>
              </Link>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-2">Categories</div>
                <div className="grid grid-cols-1 gap-1">
                  {mainCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 text-slate-700 hover:text-[#2563EB] py-1.5 px-2 rounded-lg hover:bg-slate-50"
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span className="text-xs">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="mt-auto p-4 bg-slate-50 border-t border-slate-200 text-center">
              <p className="text-[10px] text-slate-500">© 2026 ElectroMart Sitamarhi</p>
              <p className="text-[9px] text-slate-400">Smart Technology, Better Life</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-[#040C2A]" />}>
      <NavbarContent />
    </Suspense>
  );
}


