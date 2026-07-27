'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Truck, CheckCircle2, MapPin, Clock, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('EM-884920');
  const [phone, setPhone] = useState('');
  const [searchedOrder, setSearchedOrder] = useState({
    id: 'EM-884920',
    item: 'Samsung Galaxy S24 Ultra 5G (512GB Titanium Gray)',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    amount: '₹1,24,999',
    orderDate: 'July 26, 2026',
    estDelivery: 'Tomorrow, 9:00 PM',
    carrier: 'ElectroMart Express / BlueDart',
    awb: 'BD-9948201934',
    address: 'Parsauni Chowk, Near Central Bank, Sitamarhi, Bihar - 843316',
    statusStep: 3 // 1: Placed, 2: Processed, 3: Shipped, 4: Out for Delivery, 5: Delivered
  });

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId) {
      toast.error('Please enter an Order ID');
      return;
    }
    toast.success(`Tracking details updated for Order #${orderId}`);
  };

  const steps = [
    { title: 'Order Placed', time: 'July 26, 10:30 AM', desc: 'Order verified & confirmed' },
    { title: 'Processing', time: 'July 26, 02:15 PM', desc: 'Packed at Sitamarhi Hub' },
    { title: 'Shipped & In Transit', time: 'July 26, 08:00 PM', desc: 'On the way to destination center' },
    { title: 'Out for Delivery', time: 'Expected Tomorrow 09:00 AM', desc: 'Assigned to delivery agent' },
    { title: 'Delivered', time: 'Expected Tomorrow 09:00 PM', desc: 'Handed over to customer' }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-8">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-black uppercase px-3 py-1 rounded-full">
            REAL-TIME SHIPMENT TRACKING
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">Track Your Order Status</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Enter your Order ID (e.g. EM-884920) or registered phone number to view live shipment progress.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <form onSubmit={handleTrackOrder} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end text-xs">
            <div className="sm:col-span-6">
              <label className="block text-slate-700 font-extrabold mb-1">Order ID *</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. EM-884920"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-slate-700 font-extrabold mb-1">Phone Number (Optional)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all uppercase"
              >
                Track Now
              </button>
            </div>
          </form>
        </div>

        {/* Tracked Order Details & Visual Stepper */}
        {searchedOrder && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8 text-xs">
            
            {/* Top Order Overview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
              <div className="flex items-center space-x-4">
                <img src={searchedOrder.image} alt="product" className="w-16 h-16 object-contain border p-1 rounded-xl bg-slate-50" />
                <div>
                  <span className="text-[10px] font-black text-blue-600 uppercase">ORDER #{searchedOrder.id}</span>
                  <h3 className="text-sm font-extrabold text-slate-900 max-w-md">{searchedOrder.item}</h3>
                  <span className="text-slate-500 text-[11px] block mt-0.5">Placed on {searchedOrder.orderDate} • {searchedOrder.amount}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-left sm:text-right">
                <span className="text-slate-500 font-bold block text-[10px] uppercase">ESTIMATED DELIVERY</span>
                <span className="font-black text-blue-600 text-sm block">{searchedOrder.estDelivery}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-6">
              <h4 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">Shipment Timeline</h4>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
                {steps.map((st, idx) => {
                  const isDone = idx + 1 <= searchedOrder.statusStep;
                  const isCurrent = idx + 1 === searchedOrder.statusStep;
                  return (
                    <div key={idx} className="relative flex items-start space-x-4">
                      {/* Node Bullet */}
                      <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isDone ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-200 text-slate-400'}`}>
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <h5 className={`font-extrabold text-xs ${isCurrent ? 'text-blue-600 text-sm font-black' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                            {st.title}
                          </h5>
                          {isCurrent && <span className="bg-blue-100 text-blue-700 text-[9px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">IN TRANSIT</span>}
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">{st.desc}</p>
                        <span className="text-[10px] text-slate-400 font-mono block pt-0.5">{st.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Info Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
              <div>
                <span className="text-slate-400 font-bold block uppercase">Courier & Tracking AWB</span>
                <span className="text-slate-900 font-extrabold block mt-0.5">{searchedOrder.carrier} ({searchedOrder.awb})</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase">Delivery Location</span>
                <span className="text-slate-900 font-extrabold block mt-0.5">{searchedOrder.address}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
