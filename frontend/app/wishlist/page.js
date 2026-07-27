'use client';

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { toggleWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { Heart, ShoppingCart, Trash2, Star, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item._id));
    toast.success('Moved to Shopping Cart!', { icon: '🛒' });
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success('Removed from Wishlist.');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-10 sm:p-14 rounded-2xl border border-slate-200/80 shadow-xs text-center max-w-lg mx-auto space-y-5">
          <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
            ❤️
          </div>
          <h2 className="text-2xl font-black font-outfit text-slate-900">Your Wishlist is Empty!</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            Save items that you like in your wishlist to review or purchase them anytime later!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-xl text-xs shadow-md transition-all"
          >
            <span>Explore Electronics</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Bar */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest block">SAVED FAVORITES</span>
            <h1 className="text-xl font-black font-outfit text-slate-900 mt-0.5">
              My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'})
            </h1>
          </div>

          <Link
            href="/products"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group relative"
            >
              {/* Delete Button at top right */}
              <button
                onClick={() => handleRemove(item._id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition flex items-center justify-center z-10"
                title="Remove from Wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Product Visual */}
              <div className="space-y-3">
                <div className="h-44 bg-slate-50 rounded-lg p-4 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.discountPercentage > 0 && (
                    <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                      {item.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Rating Badge & Brand */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">{item.brand}</span>
                  <div className="flex items-center space-x-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{item.rating || 4.8}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xs font-extrabold text-slate-900 line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                {/* Pricing */}
                <div className="flex items-baseline space-x-2 pt-1">
                  <span className="text-base font-black text-slate-900 font-outfit">{formatCurrency(item.offerPrice || item.price)}</span>
                  {item.price > item.offerPrice && (
                    <span className="text-xs text-slate-400 line-through">{formatCurrency(item.price)}</span>
                  )}
                </div>
              </div>

              {/* Action Button: Move to Cart */}
              <button
                onClick={() => handleMoveToCart(item)}
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold py-2.5 rounded-lg text-xs transition shadow-xs flex items-center justify-center space-x-2 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Move to Cart</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
