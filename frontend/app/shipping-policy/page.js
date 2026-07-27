'use client';

import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-8">
      
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-black uppercase px-3.5 py-1 rounded-full">
            NATIONWIDE SAFE LOGISTICS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">Shipping & Delivery Policy</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Learn about our express delivery slots, transit insurance, free shipping threshold, and packaging standards.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs">
        
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          
          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 font-outfit">1. Delivery Zones & Estimated Timelines</h2>
            <p className="text-slate-600 leading-relaxed">
              ElectroMart operates express fulfillment centers in **Sitamarhi (Bihar)** and **BKC (Mumbai)**, partnering with BlueDart, Delhivery, and ElectroMart Local Fleet.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <span className="font-extrabold text-blue-600 text-sm block">Express Local Delivery</span>
                <p className="text-slate-600 mt-1 font-medium">Same Day / Next Day delivery for Sitamarhi urban districts and Mumbai Metropolitan area.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <span className="font-extrabold text-blue-600 text-sm block">Standard National Delivery</span>
                <p className="text-slate-600 mt-1 font-medium">2 to 4 business days across all 28 states & union territories in India.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900 font-outfit">2. Shipping Charges</h2>
            <ul className="space-y-2 text-slate-700 font-medium">
              <li className="flex items-center space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Free Shipping:</strong> Available on all orders above ₹999 across India.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>For orders below ₹999, a nominal flat shipping fee of ₹49 applies.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900 font-outfit">3. Transit Insurance & Open Box Delivery</h2>
            <p className="text-slate-600 leading-relaxed">
              All high-value electronics (smartphones, OLED TVs, refrigerators, laptops) are shipped with 100% transit insurance. For select TV and appliance models, we offer <strong>Open Box Delivery</strong> where the courier agent unboxes the item in your presence to verify screen integrity.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
