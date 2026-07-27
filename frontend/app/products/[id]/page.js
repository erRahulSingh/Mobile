'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import { toggleWishlist } from '../../../redux/slices/wishlistSlice';
import { openEnquiryModal } from '../../../redux/slices/modalSlice';
import { Heart, ShoppingCart, MessageSquare, ShieldCheck, Truck, RotateCcw, Star, Share2, Check, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const mockProductDetail = {
  _id: 'prod_1',
  title: 'Samsung Galaxy S24 Ultra 5G (512GB Titanium Gray)',
  slug: 'samsung-galaxy-s24-ultra-5g',
  brand: 'Samsung',
  category: 'Mobile Phones',
  price: 134999,
  offerPrice: 124999,
  discountPercentage: 7,
  inStock: true,
  stockCount: 15,
  emiAvailable: true,
  emiStartingAt: 5899,
  rating: 4.9,
  reviewCount: 342,
  images: [
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
  ],
  description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
  features: [
    '200MP Quad Tele Photo Camera with 100x Space Zoom',
    'Snapdragon 8 Gen 3 for Galaxy Ultra Processor',
    'Built-in Titanium Armor Frame & Corning Gorilla Armor',
    'Built-in S Pen with Air Actions'
  ],
  warranty: '1 Year Brand Manufacturer Warranty for Phone & 6 Months for Accessories',
  specifications: {
    color: 'Titanium Gray',
    ram: '12GB LPDDR5X',
    storage: '512GB UFS 4.0',
    capacity: '5000 mAh',
    weight: '232g',
    dimensions: '162.3 x 79.0 x 8.6 mm',
    display: '6.8 inch QHD+ Dynamic AMOLED 2X (120Hz)',
    processor: 'Snapdragon 8 Gen 3 for Galaxy',
    battery: '5000 mAh Super Fast Charging 2.0'
  }
};

export default function ProductDetailPage({ params }) {
  const dispatch = useDispatch();
  const [activeImg, setActiveImg] = useState(mockProductDetail.images[0]);
  
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item._id === mockProductDetail._id);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(mockProductDetail));
    toast.success('Added to your shopping cart!', { icon: '🛒' });
  };

  const handleEnquire = () => {
    dispatch(openEnquiryModal(mockProductDetail));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: mockProductDetail.title, url: window.location.href });
    } else {
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-24 sm:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 bg-white p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex items-center justify-center relative overflow-hidden group">
            <img
              src={activeImg}
              alt={mockProductDetail.title}
              className="w-full h-64 sm:h-96 object-contain group-hover:scale-110 transition-transform duration-500 cursor-zoom-in"
            />
            <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow">
              {mockProductDetail.discountPercentage}% OFF
            </span>
          </div>

          <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-1">
            {mockProductDetail.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(img)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border-2 p-1.5 sm:p-2 bg-slate-50 overflow-hidden transition flex-shrink-0 ${activeImg === img ? 'border-blue-600 shadow-md' : 'border-slate-200 opacity-70'}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Meta & Buying Actions */}
        <div className="space-y-4 sm:space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] sm:text-xs font-extrabold text-blue-600 uppercase tracking-wider">{mockProductDetail.brand}</span>
                <h1 className="text-xl sm:text-3xl font-black font-outfit text-slate-900 mt-1">{mockProductDetail.title}</h1>
              </div>
              <div className="flex space-x-2">
                <button onClick={handleShare} className="p-2 sm:p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition" title="Share">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist(mockProductDetail))}
                  className={`p-2 sm:p-2.5 rounded-full transition ${isWishlisted ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs sm:text-sm">
              <div className="flex items-center bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg font-bold">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                <span>{mockProductDetail.rating}</span>
              </div>
              <span className="text-xs text-slate-500">({mockProductDetail.reviewCount} reviews)</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">In Stock ({mockProductDetail.stockCount} units)</span>
            </div>

            {/* Pricing Box */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 mt-4 sm:mt-6 space-y-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-2xl sm:text-4xl font-black text-slate-900 font-outfit">{formatCurrency(mockProductDetail.offerPrice)}</span>
                <span className="text-xs sm:text-base text-slate-400 line-through">{formatCurrency(mockProductDetail.price)}</span>
                <span className="text-[10px] sm:text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md">Save {formatCurrency(mockProductDetail.price - mockProductDetail.offerPrice)}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-teal-700 font-semibold flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-teal-600 fill-current flex-shrink-0" />
                <span>No-Cost EMI starts at {formatCurrency(mockProductDetail.emiStartingAt)}/mo</span>
              </p>
            </div>
          </div>

          {/* Action Buttons (Desktop / Tablet) */}
          <div className="hidden sm:block space-y-3 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 sm:py-4 rounded-2xl transition shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleEnquire}
                className="bg-gradient-to-r from-teal-500 via-emerald-600 to-teal-700 text-white font-extrabold py-3.5 sm:py-4 rounded-2xl hover:shadow-glow-teal transition-transform active:scale-95 flex items-center justify-center space-x-2 text-sm sm:text-base shadow-xl"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Enquire Now (VIP Callback)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Features Tabs */}
      <div className="bg-white p-4 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sm:space-y-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-black font-outfit text-slate-900 mb-3 sm:mb-4">Technical Specifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 text-xs">
            {Object.entries(mockProductDetail.specifications).map(([key, val], idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 sm:p-3.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[9px] sm:text-[10px]">{key}</span>
                <span className="text-slate-900 font-bold text-xs sm:text-sm mt-0.5 block truncate">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 sm:pt-8">
          <h3 className="text-xl sm:text-2xl font-black font-outfit text-slate-900 mb-3 sm:mb-4">Key Features & Innovation</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs font-medium text-slate-700">
            {mockProductDetail.features.map((feat, i) => (
              <li key={i} className="flex items-center space-x-2 bg-blue-50/50 p-2.5 sm:p-3 rounded-xl border border-blue-100">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-3 border-t border-slate-200 sm:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div className="leading-tight">
          <span className="text-[10px] text-slate-500 font-semibold block">Total Price:</span>
          <span className="text-base font-black text-slate-900">{formatCurrency(mockProductDetail.offerPrice)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-slate-900 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl flex items-center space-x-1 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Cart</span>
          </button>
          <button
            onClick={handleEnquire}
            className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl flex items-center space-x-1 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </div>
  );
}
