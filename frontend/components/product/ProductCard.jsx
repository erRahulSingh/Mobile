'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { openEnquiryModal } from '../../redux/slices/modalSlice';
import { Heart, ShoppingCart, MessageSquare, Star, Zap, Truck, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist?.items || []);
  const isWishlisted = wishlistItems.some(item => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`, { icon: '🛒' });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast('Removed from Wishlist');
    } else {
      toast.success('Added to Wishlist!', { icon: '❤️' });
    }
  };

  const handleEnquire = (e) => {
    e.preventDefault();
    dispatch(openEnquiryModal(product));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const savings = (product.price || 0) - (product.offerPrice || product.price || 0);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Top Badges (Discount, Flash Deal, Free Shipping) */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
        {product.discountPercentage > 0 && (
          <span className="bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
            {product.discountPercentage}% OFF
          </span>
        )}
        {product.isTodayDeal && (
          <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm flex items-center gap-0.5">
            <Zap className="w-3 h-3 fill-slate-950" /> HOT DEAL
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full border border-slate-100 shadow-sm flex items-center justify-center transition-all ${
          isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:scale-110'
        }`}
        title="Add to Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Product Image Showcase */}
      <Link href={`/products/${product._id}`} className="block overflow-hidden p-3 sm:p-5 bg-gradient-to-b from-slate-50 to-white relative group-hover:bg-blue-50/20 transition-colors">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="w-full h-36 sm:h-48 object-contain group-hover:scale-108 transition-transform duration-500"
        />
        
        {/* Free Shipping Tag on image bottom */}
        <div className="absolute bottom-2 left-2 sm:left-3 flex items-center space-x-1 text-[9px] sm:text-[10px] font-semibold text-slate-500 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-100 shadow-2xs">
          <Truck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
          <span>Free Delivery</span>
        </div>
      </Link>

      {/* Details & Pricing Area */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div>
          {/* Brand & Ratings */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-blue-600 font-extrabold uppercase tracking-wide text-[10px] sm:text-[11px] truncate max-w-[55%]">{product.brand}</span>
            <span className="flex items-center space-x-0.5 sm:space-x-1 text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating || 4.9}</span>
              <span className="text-slate-400 font-normal hidden sm:inline">({product.reviewCount || 128})</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/products/${product._id}`}>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors font-outfit">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Pricing Block */}
        <div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-base sm:text-xl font-black text-slate-900 font-outfit">
              {formatCurrency(product.offerPrice || product.price)}
            </span>
            {product.price > product.offerPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through font-medium">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Savings & EMI Info */}
          <div className="flex flex-wrap items-center gap-1 mt-1">
            {savings > 0 && (
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                Save {formatCurrency(savings)}
              </span>
            )}
            {product.emiAvailable && (
              <span className="text-[9px] sm:text-[10px] text-blue-600 font-semibold truncate max-w-full">
                No-Cost EMI available
              </span>
            )}
          </div>

          {/* Action Buttons (Add to Cart & Enquire Now) */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2 sm:mt-3 pt-2 border-t border-slate-100">
            <button
              onClick={handleAddToCart}
              className="bg-slate-900 hover:bg-blue-600 text-white font-bold text-[10px] sm:text-xs py-1.5 sm:py-2 rounded-xl transition-all flex items-center justify-center space-x-1 shadow-sm active:scale-95"
            >
              <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleEnquire}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] sm:text-xs py-1.5 sm:py-2 rounded-xl transition-all flex items-center justify-center space-x-1 shadow-sm active:scale-95"
            >
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

