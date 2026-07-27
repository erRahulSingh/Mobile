'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/product/ProductCard';
import { Sparkles, Zap, ShieldCheck, Clock, Award, ChevronRight, Star, ArrowRight, CheckCircle, HelpCircle, Truck } from 'lucide-react';

const mockProductsList = [
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
    isFeatured: false,
    isBestSeller: true,
    isTodayDeal: true,
    isNewArrival: false
  }
];

const categories21 = [
  { name: 'Mobile Phones', icon: '📱', color: 'from-blue-500 to-indigo-600' },
  { name: 'Smart TVs', icon: '📺', color: 'from-purple-500 to-pink-600' },
  { name: 'Air Conditioners', icon: '❄️', color: 'from-cyan-500 to-blue-600' },
  { name: 'Refrigerators', icon: '🧊', color: 'from-teal-500 to-emerald-600' },
  { name: 'Washing Machines', icon: '🧺', color: 'from-indigo-500 to-purple-600' },
  { name: 'Coolers', icon: '🌀', color: 'from-sky-400 to-blue-500' },
  { name: 'Laptops', icon: '💻', color: 'from-slate-700 to-slate-900' },
  { name: 'Tablets', icon: '📲', color: 'from-violet-600 to-indigo-700' },
  { name: 'Smart Watches', icon: '⌚', color: 'from-rose-500 to-red-600' },
  { name: 'Headphones', icon: '🎧', color: 'from-amber-500 to-orange-600' },
  { name: 'Speakers', icon: '🔊', color: 'from-emerald-500 to-teal-700' },
  { name: 'Kitchen Appliances', icon: '🍳', color: 'from-orange-500 to-red-600' },
  { name: 'Microwave', icon: '🍿', color: 'from-amber-600 to-yellow-600' },
  { name: 'Water Purifier', icon: '💧', color: 'from-blue-400 to-teal-500' },
  { name: 'Air Purifier', icon: '🍃', color: 'from-green-500 to-emerald-600' },
  { name: 'Geyser', icon: '♨️', color: 'from-red-500 to-orange-600' },
  { name: 'Fans', icon: '💨', color: 'from-sky-500 to-indigo-500' },
  { name: 'Inverter', icon: '⚡', color: 'from-yellow-500 to-amber-600' },
  { name: 'Battery', icon: '🔋', color: 'from-green-600 to-teal-600' },
  { name: 'Printers', icon: '🖨️', color: 'from-slate-600 to-slate-800' },
  { name: 'Accessories', icon: '🔌', color: 'from-indigo-600 to-blue-700' }
];

const topBrands = ['Samsung', 'Apple', 'LG', 'Sony', 'Daikin', 'Panasonic', 'Bosch', 'OnePlus'];

const heroSlides = [
  {
    id: 1,
    tag: 'BIG SALE',
    titleLine1: 'Upgrade Your',
    titleLine2: 'Digital Experience',
    titleColor: 'text-[#3B82F6]',
    subtitle: 'Best Deals on Mobiles, Laptops, Audio, Smart TVs & More.',
    primaryBtnText: 'Shop Now',
    primaryBtnLink: '/products',
    secondaryBtnText: 'Explore Deals',
    badgeTop: 'UP TO',
    badgeMid: '60%',
    badgeBot: 'OFF',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    tag: 'FLAGSHIP LAUNCH',
    titleLine1: 'Samsung S24 Ultra',
    titleLine2: 'Galaxy AI Era',
    titleColor: 'text-teal-400',
    subtitle: '200MP Quad Camera | Titanium Frame | Instant ₹10,000 Bank Cashback.',
    primaryBtnText: 'Pre-Order Now',
    primaryBtnLink: '/products',
    secondaryBtnText: 'View Specs',
    badgeTop: 'SAVE',
    badgeMid: '₹12K',
    badgeBot: 'OFFER',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    tag: 'SOUND REVOLUTION',
    titleLine1: 'Sony WH-1000XM5',
    titleLine2: 'Pure ANC Audio',
    titleColor: 'text-amber-400',
    subtitle: 'Industry-Leading Noise Cancellation | 30 Hours Battery | No Cost EMI.',
    primaryBtnText: 'Claim Offer',
    primaryBtnLink: '/products',
    secondaryBtnText: 'Compare Audio',
    badgeTop: 'FLAT',
    badgeMid: '25%',
    badgeBot: 'OFF',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 22 });
  const [activeFaq, setActiveFaq] = useState(null);

  // Auto-play Carousel Timer (Every 4 seconds)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        return { hours: prev.hours > 0 ? prev.hours - 1 : 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="space-y-8 pb-16 bg-[#F8FAFC] min-h-screen">
      
      {/* 1. HERO BANNER CAROUSEL (REDUCED HEIGHT COMPACT MOBILE LAYOUT) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        <div className="relative bg-gradient-to-br from-[#090D2A] via-[#10194E] to-[#160B3A] text-white p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-900/40 shadow-2xl transition-all duration-700">
          
          {/* Background Neon Radial Glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-blue-600/25 rounded-full blur-[70px] sm:blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-row items-center justify-between gap-2 sm:gap-6 min-h-[160px] sm:min-h-[290px]">
            
            {/* Left Text Content (Flex-1) */}
            <div className="flex-1 space-y-1.5 sm:space-y-3 text-left pr-1">
              
              {/* Tag Badge */}
              <div className="inline-flex items-center space-x-1 bg-slate-900/90 border border-slate-700/80 text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-inner">
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
                <span>BIG SALE</span>
              </div>

              {/* Main Title */}
              <h1 className="text-base sm:text-4xl font-extrabold tracking-tight text-white leading-snug sm:leading-tight font-outfit">
                Upgrade Your <br />
                <span className="text-[#00D2FE] font-black">Digital </span>
                <span className="text-[#A855F7] font-black">Experience</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-[10px] sm:text-sm max-w-md font-normal leading-tight line-clamp-2">
                Best Deals on Mobiles, Laptops, Audio & More.
              </p>

              {/* Action Button: Compact Gradient Pill Button */}
              <div className="pt-0.5 sm:pt-1">
                <Link
                  href="/products"
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full shadow-md shadow-blue-600/30 hover:scale-105 transition-all inline-flex items-center space-x-1.5 text-[10px] sm:text-xs"
                >
                  <span>Shop Now</span>
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/20 flex items-center justify-center text-[8px] sm:text-[10px]">➔</div>
                </Link>
              </div>
            </div>

            {/* Right Showcase: Compact 3D Podium + 4 Layered Gadgets + Yellow Badge */}
            <div className="relative flex-shrink-0 flex justify-center items-center py-1">
              
              {/* Yellow Circular Discount Badge Top Right */}
              <div className="absolute -top-3 -right-1 sm:-top-2 sm:right-4 z-30 w-11 h-11 sm:w-20 sm:h-20 rounded-full bg-[#FACC15] text-slate-950 p-0.5 shadow-lg shadow-amber-400/30 flex flex-col items-center justify-center font-black text-center border sm:border-2 border-white">
                <span className="text-[5px] sm:text-[8px] uppercase font-extrabold tracking-wider text-slate-900 leading-none">UP TO</span>
                <span className="text-[11px] sm:text-xl font-black leading-none my-0.5">60%</span>
                <span className="text-[5px] sm:text-[8px] uppercase font-extrabold text-slate-900 leading-none">OFF</span>
              </div>

              {/* 3D Metallic Podium Graphics Container */}
              <div className="relative w-32 sm:w-72 h-28 sm:h-52 flex items-center justify-center">
                
                {/* 3D Oval Pedestal Stand at Bottom */}
                <div className="absolute bottom-1 w-28 sm:w-64 h-6 sm:h-12 bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-[100%] border-t sm:border-t-2 border-[#00D2FE] shadow-[0_0_15px_rgba(0,210,254,0.5)] pointer-events-none"></div>
                
                {/* Composite Layered Gadget Images */}
                <div className="relative z-20 w-full h-full flex items-center justify-center">
                  {/* Gadget 1: Gaming Laptop in Background */}
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
                    alt="Gaming Laptop"
                    className="absolute top-1 w-24 sm:w-56 h-16 sm:h-36 object-contain z-1 drop-shadow-md"
                  />
                  {/* Gadget 2: iPhone 14 Pro Deep Purple Front-Left */}
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=200&q=80"
                    alt="iPhone 14 Pro"
                    className="absolute bottom-2 left-1 sm:left-6 w-8 sm:w-18 h-11 sm:h-26 object-contain z-3 drop-shadow-lg"
                  />
                  {/* Gadget 3: Headphones Front-Right */}
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
                    alt="Headphones"
                    className="absolute bottom-2 right-1 sm:right-4 w-9 sm:w-20 h-9 sm:h-20 object-contain z-3 drop-shadow-lg"
                  />
                  {/* Gadget 4: Smartwatch Center-Front */}
                  <img
                    src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=200&q=80"
                    alt="Smartwatch"
                    className="absolute bottom-1 left-12 sm:left-28 w-5 sm:w-12 h-5 sm:h-12 object-contain z-4 drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center items-center space-x-1.5 sm:space-x-2 mt-1 sm:mt-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 ${
                  currentSlide === idx ? 'w-4 sm:w-6 h-1 sm:h-1.5 bg-[#00D2FE] rounded-full' : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/40 rounded-full hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. 7-CIRCLE CATEGORY STRIP BAR (EXACT MATCH TO SCREENSHOT BELOW HERO BANNER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-3 sm:p-4 flex items-center justify-between overflow-x-auto gap-2 sm:gap-4 no-scrollbar">
          {[
            { title: 'Mobiles', bg: 'bg-[#E0F2FE]', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&q=80' },
            { title: 'Laptops', bg: 'bg-[#F3E8FF]', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=80' },
            { title: 'Audio', bg: 'bg-[#E0F2FE]', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80' },
            { title: 'TVs', bg: 'bg-[#E0F2FE]', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=150&q=80' },
            { title: 'Wearables', bg: 'bg-[#FCE7F3]', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=150&q=80' },
            { title: 'Accessories', bg: 'bg-[#F3E8FF]', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=150&q=80' },
            { title: 'View All', bg: 'bg-[#F1F5F9]', isGrid: true }
          ].map((cat, idx) => (
            <Link
              key={idx}
              href={cat.isGrid ? '/products' : `/products?category=${encodeURIComponent(cat.title)}`}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer min-w-[56px] sm:min-w-[70px]"
            >
              <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full ${cat.bg} flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 shadow-2xs`}>
                {cat.isGrid ? (
                  <div className="w-5 h-5 grid grid-cols-2 gap-0.5 p-0.5">
                    <div className="bg-slate-600 rounded-2xs"></div>
                    <div className="bg-slate-600 rounded-2xs"></div>
                    <div className="bg-slate-600 rounded-2xs"></div>
                    <div className="bg-slate-600 rounded-2xs"></div>
                  </div>
                ) : (
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
                  />
                )}
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-center leading-tight">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PROMO OFFER CARDS GRID (3 Pastel Blue Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: No Cost EMI */}
          <div className="bg-[#EEF4FE] rounded-2xl p-4 sm:p-6 relative overflow-hidden border border-blue-100/80 flex flex-col justify-between h-40 sm:h-48 group">
            <div className="z-10 max-w-[62%]">
              <span className="text-[11px] sm:text-xs font-bold text-[#2563EB] block">No Cost EMI</span>
              <h3 className="text-base sm:text-xl font-extrabold text-slate-900 mt-0.5 sm:mt-1">Up to 12 Months</h3>
              <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-snug">Easy EMI Options on Credit Cards</p>
            </div>
            <div className="z-10 pt-2 sm:pt-4">
              <Link
                href="/products"
                className="inline-block border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all shadow-sm"
              >
                Shop Now
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80"
              alt="Credit Cards EMI"
              className="absolute -right-3 -bottom-3 w-28 h-28 sm:w-36 sm:h-36 object-contain group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Card 2: Exchange Offer */}
          <div className="bg-[#EEF4FE] rounded-2xl p-4 sm:p-6 relative overflow-hidden border border-blue-100/80 flex flex-col justify-between h-40 sm:h-48 group">
            <div className="z-10 max-w-[62%]">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">Exchange Offer</h3>
              <span className="text-xs sm:text-sm font-bold text-[#2563EB] block mt-0.5">Up to ₹15,000 Off</span>
              <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-snug">Exchange your old device for a new one</p>
            </div>
            <div className="z-10 pt-2 sm:pt-4">
              <Link
                href="/products"
                className="inline-block border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all shadow-sm"
              >
                Exchange Now
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80"
              alt="Exchange Phones"
              className="absolute -right-2 -bottom-2 w-28 h-28 sm:w-36 sm:h-36 object-contain group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Card 3: Bank Offers */}
          <div className="bg-[#EEF4FE] rounded-2xl p-4 sm:p-6 relative overflow-hidden border border-blue-100/80 flex flex-col justify-between h-40 sm:h-48 group">
            <div className="z-10 max-w-[62%]">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">Bank Offers</h3>
              <span className="text-xs sm:text-sm font-bold text-[#2563EB] block mt-0.5">Up to 10% Instant Discount</span>
              <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-snug">On Select Credit & Debit Cards</p>
            </div>
            <div className="z-10 pt-2 sm:pt-4">
              <Link
                href="/products"
                className="inline-block border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all shadow-sm"
              >
                View Offers
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=400&q=80"
              alt="Bank Offers"
              className="absolute -right-2 -bottom-2 w-28 h-28 sm:w-36 sm:h-36 object-contain group-hover:scale-105 transition-transform"
            />
          </div>

        </div>
      </section>

      {/* 4. TOP DEALS OF THE DAY HEADER & GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Top Deals of the Day</h2>
          <Link href="/products?todayDeal=true" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {mockProductsList.slice(0, 3).map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. SHOP BY DEPARTMENT (Ultra Premium Luxury Categories Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-black text-[#2563EB] uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-blue-100">
              EXPLORE DEPARTMENTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-outfit mt-1.5">
              Shop by Department
            </h2>
          </div>
          
          <Link
            href="/products"
            className="text-xs font-bold text-[#2563EB] hover:text-blue-700 flex items-center space-x-1 bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-200 shadow-xs hover:shadow transition"
          >
            <span>Browse All 21 Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Top Departments (6 Luxury Wide Visual Cards Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              title: 'Mobile Phones & Tablets',
              sub: 'Flagship Smartphones, iPads & Accessories',
              count: '1,450+ Products',
              img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
              bgGradient: 'from-blue-600/10 via-indigo-50/40 to-white',
              badgeColor: 'bg-blue-600 text-white',
              category: 'Mobile Phones'
            },
            {
              title: 'Laptops & Computers',
              sub: 'Gaming Laptops, MacBooks & Workstations',
              count: '890+ Products',
              img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
              bgGradient: 'from-slate-900/10 via-slate-50/60 to-white',
              badgeColor: 'bg-slate-900 text-white',
              category: 'Laptops'
            },
            {
              title: 'Smart TVs & Audio',
              sub: '4K OLED TVs, Soundbars & Home Theater',
              count: '640+ Products',
              img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
              bgGradient: 'from-purple-600/10 via-pink-50/40 to-white',
              badgeColor: 'bg-purple-600 text-white',
              category: 'Smart TVs'
            },
            {
              title: 'Air Conditioners & Cooling',
              sub: '5-Star Inverter Split ACs & Tower Coolers',
              count: '420+ Products',
              img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80',
              bgGradient: 'from-cyan-600/10 via-teal-50/40 to-white',
              badgeColor: 'bg-teal-600 text-white',
              category: 'Air Conditioners'
            },
            {
              title: 'Refrigerators & Washers',
              sub: 'Smart Double Door Fridges & Front Loaders',
              count: '750+ Products',
              img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
              bgGradient: 'from-emerald-600/10 via-green-50/40 to-white',
              badgeColor: 'bg-emerald-600 text-white',
              category: 'Refrigerators'
            },
            {
              title: 'Headphones & Wearables',
              sub: 'Wireless ANC Earbuds & Smart Watches',
              count: '1,120+ Products',
              img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
              bgGradient: 'from-amber-600/10 via-orange-50/40 to-white',
              badgeColor: 'bg-amber-600 text-white',
              category: 'Headphones'
            }
          ].map((dept, idx) => (
            <Link
              key={idx}
              href={`/products?category=${encodeURIComponent(dept.category)}`}
              className={`group relative bg-gradient-to-br ${dept.bgGradient} rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 sm:h-56 overflow-hidden`}
            >
              <div className="z-10 max-w-[65%]">
                <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-xs inline-block mb-1.5 ${dept.badgeColor}`}>
                  {dept.count}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-outfit leading-tight group-hover:text-blue-600 transition-colors">
                  {dept.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug line-clamp-2">
                  {dept.sub}
                </p>
              </div>

              <div className="z-10 pt-2 sm:pt-4 flex items-center space-x-1 text-xs font-extrabold text-[#2563EB] group-hover:translate-x-1 transition-transform">
                <span>Explore Department</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              <img
                src={dept.img}
                alt={dept.title}
                className="absolute -right-2 -bottom-2 w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>

        {/* Full 21 Categories Quick Pill Selector Bar */}
        <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">All 21 Product Categories:</span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold">Click to filter store</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories21.map((cat, idx) => (
              <Link
                key={idx}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-700 font-bold text-[11px] sm:text-xs px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full transition-all flex items-center space-x-1.5 border border-slate-200/60"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Best Selling Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="flex justify-between items-end mb-4 sm:mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-extrabold text-teal-600 uppercase tracking-widest">Customer Favorites</span>
            <h2 className="text-2xl sm:text-4xl font-black font-outfit text-slate-900 mt-0.5">Best Selling Electronics</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {mockProductsList.slice(0, 3).map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE ELECTROMART? (6 Highlights Strip) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <h2 className="text-xl font-extrabold text-slate-900 mb-3 sm:mb-4 font-outfit">Why Choose ElectroMart?</h2>
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            {
              title: '100% Original Products',
              desc: 'Sourced directly from authorized sellers',
              icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
            },
            {
              title: 'Best Price Guarantee',
              desc: 'We ensure you get best prices always',
              icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
            },
            {
              title: 'Secure Payments',
              desc: 'Multiple secure options available',
              icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
            },
            {
              title: 'Fast Delivery',
              desc: 'Quick delivery at your doorstep',
              icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
            },
            {
              title: 'Easy Returns',
              desc: 'Hassle-free 7-day return policy',
              icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
            },
            {
              title: '24x7 Customer Support',
              desc: 'We are here to help you anytime',
              icon: <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
            }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-left">
              <div className="p-1.5 sm:p-2 bg-white rounded-xl shadow-2xs flex-shrink-0 border border-slate-200/60 mt-0.5">
                {item.icon}
              </div>
              <div className="leading-tight">
                <h4 className="text-[11px] sm:text-xs font-extrabold text-slate-900">{item.title}</h4>
                <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 leading-snug font-medium line-clamp-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHAT OUR CUSTOMERS SAY (Testimonials Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">What Our Customers Say</h2>
          <Link href="/contact" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center space-x-1">
            <span>View All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'ElectroMart has the best collection of products with unbeatable prices. Delivery was super fast and packaging was premium.',
              name: 'Rahul Sharma',
              role: 'Verified Buyer',
              img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
            },
            {
              quote: 'Amazing shopping experience! The product quality is top-notch and customer support is very responsive.',
              name: 'Priya Verma',
              role: 'Verified Buyer',
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
            },
            {
              quote: 'I got the best deal on my laptop. Highly recommended ElectroMart for all tech lovers!',
              name: 'Vikram Singh',
              role: 'Verified Buyer',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
            }
          ].map((rev, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl font-serif text-[#2563EB] font-black leading-none">“</span>
                  <div className="flex items-center space-x-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                <img
                  src={rev.img}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="text-left leading-tight">
                  <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-slate-300 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-slate-300 rounded-full"></div>
        </div>
      </section>

      {/* 8. TOP BRANDS YOU CAN TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <h2 className="text-xl font-extrabold text-slate-900 mb-3 sm:mb-4 font-outfit">Top Brands You Can Trust</h2>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-4">
          {[
            { name: 'Apple', logo: <span className="text-base sm:text-lg font-black text-slate-900"></span> },
            { name: 'SAMSUNG', logo: <span className="text-xs sm:text-sm font-black text-blue-600 tracking-wider">SAMSUNG</span> },
            { name: 'DELL', logo: <span className="text-xs sm:text-sm font-black text-blue-600 tracking-widest">DELL</span> },
            { name: 'hp', logo: <span className="text-xs sm:text-sm font-black italic text-blue-600 border border-blue-600 rounded-full px-1.5 py-0.5">hp</span> },
            { name: 'SONY', logo: <span className="text-xs sm:text-sm font-black text-slate-900 tracking-widest">SONY</span> },
            { name: 'LG', logo: <span className="text-xs sm:text-sm font-black text-rose-600 flex items-center gap-0.5 sm:gap-1"><span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-rose-600 text-white text-[9px] sm:text-[10px] flex items-center justify-center font-bold">L</span>LG</span> },
            { name: 'boAt', logo: <span className="text-xs sm:text-sm font-black text-slate-900">boAt</span> },
            { name: 'ONEPLUS', logo: <span className="text-[10px] sm:text-xs font-black text-rose-600 flex items-center gap-0.5 sm:gap-1"><span className="bg-rose-600 text-white px-0.5 sm:px-1 rounded text-[8px] sm:text-[10px] font-bold">1+</span>ONEPLUS</span> }
          ].map((brand, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200/80 p-2 sm:p-4 h-12 sm:h-16 flex items-center justify-center shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS & STILL HAVE QUESTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold text-slate-900 mb-6 font-outfit">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* FAQ Accordion Grid (2 Cols = 8 cols span) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'How can I place an order?', a: 'Browse products, click Add to Cart or Enquire Now, fill in your address and choose your payment method.' },
              { q: 'What is your return policy?', a: 'We offer a hassle-free 7-day return policy for all genuine electronics with full refund options.' },
              { q: 'What payment methods are available?', a: 'We accept UPI, Credit/Debit cards, NetBanking, COD (Cash on Delivery), and No-Cost EMI.' },
              { q: 'How long does delivery take?', a: 'Express delivery takes 24-48 hours in metro cities and 3-5 business days across India.' },
              { q: 'How can I track my order?', a: 'Go to Customer Dashboard -> Track Order to view real-time shipping updates and courier status.' },
              { q: 'Do you offer cash on delivery?', a: 'Yes! Cash on Delivery (COD) is available for eligible pin codes across India.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:border-blue-200 transition">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left flex justify-between items-center text-xs font-bold text-slate-900 font-outfit hover:text-[#2563EB] transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-base font-extrabold text-slate-400">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <p className="text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-100 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right Card: Still Have Questions? (4 cols span) */}
          <div className="lg:col-span-4 bg-[#EEF4FE] rounded-2xl border border-blue-100 p-6 flex flex-col items-center text-center justify-between space-y-4 shadow-xs">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg text-white">
                🎧
              </div>
              <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white">
                24x7
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-outfit">Still Have Questions?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Our support team is here to help you 24x7
              </p>
            </div>

            <Link
              href="/contact"
              className="border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

