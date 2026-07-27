'use client';

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { addToCart, decreaseQuantity, removeFromCart, clearCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { ShoppingBag, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Heart, Truck, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const totalMRP = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = totalMRP - totalAmount;

  const handleMoveToWishlist = (item) => {
    dispatch(toggleWishlist(item));
    dispatch(removeFromCart(item._id));
    toast.success('Moved to your wishlist!');
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart.');
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-10 sm:p-14 rounded-2xl border border-slate-200/80 shadow-xs text-center max-w-lg mx-auto space-y-5">
          <div className="w-24 h-24 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
            🛒
          </div>
          <h2 className="text-2xl font-black font-outfit text-slate-900">Your Shopping Cart is Empty!</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            Explore our flagship electronics, smartphones, TVs, ACs & refrigerators to fill your cart with great deals!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-xl text-xs shadow-md transition-all"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Pincode Delivery Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="w-4 h-4 text-[#2563EB]" />
            <span className="text-slate-600">From Saved Address:</span>
            <span className="font-extrabold text-slate-900">Sitamarhi - 843316</span>
          </div>
          <button onClick={() => toast.success('Pincode updated')} className="border border-blue-600 text-blue-600 font-bold px-3 py-1 rounded hover:bg-blue-50 transition">
            Change Pincode
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
            
            {/* Header */}
            <div className="p-4 sm:p-5 flex justify-between items-center">
              <h1 className="text-base font-extrabold text-slate-900 font-outfit">
                My Shopping Cart ({totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'})
              </h1>
              <button
                onClick={() => { dispatch(clearCart()); toast.success('Cart cleared.'); }}
                className="text-xs font-bold text-rose-600 hover:underline flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Items List */}
            {items.map((item) => (
              <div key={item._id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-6">
                
                {/* Product Thumbnail & Quick Specs */}
                <div className="flex space-x-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 border border-slate-200/60 rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">{item.brand}</span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 max-w-md leading-snug">
                      {item.title}
                    </h3>
                    
                    {/* Price Info */}
                    <div className="flex items-baseline space-x-2 pt-1">
                      <span className="text-base font-black text-slate-900 font-outfit">{formatCurrency(item.offerPrice || item.price)}</span>
                      {item.price > item.offerPrice && (
                        <>
                          <span className="text-xs text-slate-400 line-through">{formatCurrency(item.price)}</span>
                          <span className="text-xs font-extrabold text-emerald-600">{item.discountPercentage}% OFF</span>
                        </>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 flex items-center space-x-1 pt-0.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Free Delivery by <strong className="text-slate-800">Tomorrow, 9 PM</strong></span>
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Removal Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto space-y-3">
                  
                  {/* Quantity Counter Pill */}
                  <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="w-7 h-7 bg-white rounded flex items-center justify-center text-slate-700 font-bold hover:bg-slate-200 transition shadow-2xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black text-slate-900 px-2">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="w-7 h-7 bg-white rounded flex items-center justify-center text-slate-700 font-bold hover:bg-slate-200 transition shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4 text-xs font-extrabold uppercase tracking-wider pt-2">
                    <button
                      onClick={() => handleMoveToWishlist(item)}
                      className="text-slate-700 hover:text-blue-600 transition"
                    >
                      MOVE TO WISHLIST
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-slate-700 hover:text-rose-600 transition"
                    >
                      REMOVE
                    </button>
                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Right Column: Price Details Summary Card (Flipkart Style - 4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs p-5 space-y-4 text-xs">
            
            <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
              PRICE DETAILS
            </h2>

            <div className="space-y-3 text-slate-700">
              <div className="flex justify-between">
                <span>Price ({totalQuantity} items)</span>
                <span className="font-bold text-slate-900">{formatCurrency(totalMRP)}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-bold">- {formatCurrency(totalSavings)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>

              <div className="flex justify-between">
                <span>Protect / GST</span>
                <span className="font-bold text-slate-900">Included</span>
              </div>
            </div>

            {/* Total Amount Divider */}
            <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-baseline text-sm">
              <span className="font-extrabold text-slate-900">Total Amount</span>
              <span className="text-xl font-black text-slate-900 font-outfit">{formatCurrency(totalAmount)}</span>
            </div>

            {/* Total Savings Highlight Banner */}
            {totalSavings > 0 && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold p-3 rounded-lg text-[11px] flex items-center space-x-2">
                <Tag className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>You will save {formatCurrency(totalSavings)} on this order!</span>
              </div>
            )}

            {/* Place Order Button */}
            <button
              onClick={() => toast.success('Proceeding to Checkout & Payment!')}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-lg text-xs shadow-md transition-all uppercase tracking-wider flex items-center justify-center space-x-2 active:scale-95"
            >
              <span>PLACE ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Safety Guarantee */}
            <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Safe and Secure Payments. 100% Authentic Warranty.</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

function MapPinIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  );
}
