'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearCart } from '../../redux/slices/cartSlice';
import { ShieldCheck, Truck, Check, Plus, CreditCard, QrCode, Building, Wallet, CheckCircle2, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const [currentStep, setCurrentStep] = useState(1); // 1: Address, 2: Order Summary, 3: Payment
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    type: 'HOME'
  });

  const addresses = [
    {
      id: 1,
      name: 'Rahul Kumar',
      phone: '+91 98765 43210',
      type: 'HOME',
      address: 'Parsauni Chowk, Near Central Bank of India, Sitamarhi, Bihar',
      pincode: '843316'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      phone: '+91 98765 43210',
      type: 'WORK',
      address: 'Plot 42, BKC Commercial Complex, Bandra East, Mumbai, Maharashtra',
      pincode: '400051'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const totalMRP = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = totalMRP - totalAmount;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (paymentMethod === 'cod' && captchaInput !== '7492') {
      toast.error('Invalid Captcha Code! Please enter 7492');
      return;
    }

    const orderId = `EM-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrderId(orderId);
    setIsOrderPlaced(true);
    dispatch(clearCart());
    toast.success('🎉 Order Placed Successfully!', { duration: 5000 });
  };

  if (isOrderPlaced) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200/80 shadow-md text-center max-w-lg mx-auto space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
            ✓
          </div>
          <div>
            <span className="bg-emerald-100 text-emerald-700 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
              CONFIRMED & VERIFIED
            </span>
            <h1 className="text-2xl font-black font-outfit text-slate-900 mt-2">Thank You for Your Order!</h1>
            <p className="text-xs text-slate-500 mt-1">Order ID: <strong className="text-slate-900 font-mono text-sm">{placedOrderId}</strong></p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Delivery:</span>
              <span className="font-extrabold text-slate-900">Tomorrow by 9:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Status:</span>
              <span className="font-extrabold text-emerald-600 uppercase">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="font-bold text-slate-800 truncate max-w-[200px]">Sitamarhi, Bihar - 843316</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/customer/dashboard"
              className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-xs shadow-md transition-all text-center"
            >
              Track Order
            </Link>
            <Link
              href="/products"
              className="flex-1 border border-slate-300 text-slate-700 font-bold py-3 rounded-lg text-xs hover:bg-slate-50 transition-all text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl border border-slate-200/80 text-center max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">No Items to Checkout</h2>
          <p className="text-xs text-slate-500">Please add products to your cart before proceeding to checkout.</p>
          <Link href="/products" className="inline-block bg-blue-600 text-white font-bold px-6 py-2.5 rounded text-xs">
            Explore Electronics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-8">
      
      {/* Checkout Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-black font-outfit text-slate-900">Electro<span className="text-blue-600">Mart</span></span>
            <span className="text-xs font-bold text-slate-400">| 100% SECURE CHECKOUT</span>
          </Link>

          {/* Steps Indicator */}
          <div className="hidden sm:flex items-center space-x-6 text-xs font-bold">
            <span className={currentStep >= 1 ? 'text-blue-600 flex items-center space-x-1' : 'text-slate-400'}>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">1</span>
              <span>Address</span>
            </span>
            <span className="text-slate-300">›</span>
            <span className={currentStep >= 2 ? 'text-blue-600 flex items-center space-x-1' : 'text-slate-400'}>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">2</span>
              <span>Order Summary</span>
            </span>
            <span className="text-slate-300">›</span>
            <span className={currentStep === 3 ? 'text-blue-600 flex items-center space-x-1' : 'text-slate-400'}>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">3</span>
              <span>Payment</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Step Accordions (8 Cols) */}
          <div className="lg:col-span-8 space-y-4 text-xs">
            
            {/* STEP 1: DELIVERY ADDRESS */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="font-extrabold text-slate-900 uppercase tracking-wider">DELIVERY ADDRESS</h3>
                </div>
                {currentStep > 1 && (
                  <button onClick={() => setCurrentStep(1)} className="text-xs font-bold text-blue-600 hover:underline">
                    CHANGE
                  </button>
                )}
              </div>

              {currentStep === 1 && (
                <div className="p-5 space-y-4">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`block border rounded-xl p-4 cursor-pointer transition ${selectedAddress === addr.id ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id)}
                          className="accent-blue-600 mt-1"
                        />
                        <div className="space-y-1 text-left flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-extrabold text-slate-900">{addr.name}</h4>
                            <span className="bg-slate-200 text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded">{addr.type}</span>
                            <span className="font-bold text-slate-800">{addr.phone}</span>
                          </div>
                          <p className="text-slate-600 font-medium leading-relaxed">{addr.address} - <strong className="text-slate-900">{addr.pincode}</strong></p>
                        </div>
                      </div>

                      {selectedAddress === addr.id && (
                        <div className="mt-4 pt-3 border-t border-blue-100 flex justify-end">
                          <button
                            onClick={() => setCurrentStep(2)}
                            className="bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded shadow-xs uppercase tracking-wider"
                          >
                            DELIVER HERE
                          </button>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* STEP 2: ORDER SUMMARY */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="font-extrabold text-slate-900 uppercase tracking-wider">ORDER SUMMARY ({totalQuantity} ITEMS)</h3>
                </div>
                {currentStep > 2 && (
                  <button onClick={() => setCurrentStep(2)} className="text-xs font-bold text-blue-600 hover:underline">
                    CHANGE
                  </button>
                )}
              </div>

              {currentStep === 2 && (
                <div className="p-5 space-y-4">
                  <div className="divide-y divide-slate-100">
                    {items.map((item) => (
                      <div key={item._id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <img src={item.images?.[0]} alt="prod" className="w-12 h-12 object-contain border p-1 rounded" />
                          <div>
                            <h4 className="font-extrabold text-slate-900 max-w-sm truncate">{item.title}</h4>
                            <span className="text-[11px] text-slate-500">Qty: {item.quantity} • {formatCurrency(item.offerPrice || item.price)}</span>
                          </div>
                        </div>
                        <span className="font-black text-slate-900">{formatCurrency((item.offerPrice || item.price) * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded text-emerald-800 text-[11px] font-bold flex items-center justify-between">
                    <span>🚚 Free Delivery by Tomorrow, 9 PM</span>
                    <span>Order updates will be sent to jaiswalmobile@gmail.com</span>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded shadow-xs uppercase tracking-wider"
                    >
                      CONTINUE TO PAYMENT
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: PAYMENT OPTIONS */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center space-x-3">
                <span className="w-6 h-6 rounded bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-extrabold text-slate-900 uppercase tracking-wider">PAYMENT OPTIONS</h3>
              </div>

              {currentStep === 3 && (
                <form onSubmit={handlePlaceOrder} className="p-5 space-y-4">
                  
                  {/* UPI Option */}
                  <label className={`block border rounded-xl p-4 cursor-pointer transition ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200'}`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-blue-600"
                      />
                      <div className="flex items-center justify-between w-full">
                        <span className="font-extrabold text-slate-900">UPI (PhonePe, Google Pay, Paytm, BHIM)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">FASTEST</span>
                      </div>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-4 pl-7 space-y-3">
                        <input
                          type="text"
                          required
                          placeholder="Enter VPA / UPI ID (e.g. 9876543210@ybl)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                        <button type="submit" className="bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded shadow-xs uppercase tracking-wider">
                          PAY {formatCurrency(totalAmount)} NOW
                        </button>
                      </div>
                    )}
                  </label>

                  {/* Credit / Debit Card Option */}
                  <label className={`block border rounded-xl p-4 cursor-pointer transition ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200'}`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-blue-600"
                      />
                      <span className="font-extrabold text-slate-900">Credit / Debit / ATM Card</span>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="mt-4 pl-7 space-y-3 max-w-md">
                        <input type="text" required placeholder="Card Number" className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs" />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" required placeholder="MM/YY" className="bg-white border border-slate-300 rounded px-3 py-2 text-xs" />
                          <input type="password" required maxLength="3" placeholder="CVV" className="bg-white border border-slate-300 rounded px-3 py-2 text-xs" />
                        </div>
                        <button type="submit" className="bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded shadow-xs uppercase tracking-wider">
                          PAY {formatCurrency(totalAmount)}
                        </button>
                      </div>
                    )}
                  </label>

                  {/* Cash on Delivery (COD) */}
                  <label className={`block border rounded-xl p-4 cursor-pointer transition ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200'}`}>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-blue-600"
                      />
                      <span className="font-extrabold text-slate-900">Cash on Delivery (COD)</span>
                    </div>

                    {paymentMethod === 'cod' && (
                      <div className="mt-4 pl-7 space-y-3 max-w-sm">
                        <p className="text-[11px] text-slate-500">Enter Captcha code <strong className="text-slate-900 font-mono text-sm bg-slate-200 px-2 py-0.5 rounded">7492</strong> to confirm order:</p>
                        <input
                          type="text"
                          required
                          placeholder="Enter 7492"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-xs font-bold text-slate-900"
                        />
                        <button type="submit" className="bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded shadow-xs uppercase tracking-wider">
                          CONFIRM ORDER
                        </button>
                      </div>
                    )}
                  </label>

                </form>
              )}
            </div>

          </div>

          {/* Right Column: Price Details Summary (4 Cols) */}
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
            </div>

            <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-baseline text-sm">
              <span className="font-extrabold text-slate-900">Amount Payable</span>
              <span className="text-xl font-black text-slate-900 font-outfit">{formatCurrency(totalAmount)}</span>
            </div>

            {totalSavings > 0 && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold p-3 rounded-lg text-[11px]">
                You will save {formatCurrency(totalSavings)} on this order!
              </div>
            )}

            <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>100% Safe & Secure Payment Guarantee.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
