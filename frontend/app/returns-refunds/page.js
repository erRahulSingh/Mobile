'use client';

import Link from 'next/link';
import { RotateCcw, ShieldCheck, Clock, CheckCircle2, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';

export default function ReturnsRefundsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-8">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase px-3.5 py-1 rounded-full">
            100% BUYER PROTECTION
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">7-Day Easy Returns & Instant Refunds</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Hassle-free replacement and refund policy for all original brand electronics bought at ElectroMart & Jaiswal Mobile.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs">
        
        {/* 3 Key Policy Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center mx-auto text-xl">
              🔄
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">7-Day Replacement</h3>
            <p className="text-slate-500 leading-relaxed">
              If your product has manufacturing defects or transport damage, request a free replacement within 7 days.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center mx-auto text-xl">
              💸
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Instant Refund Process</h3>
            <p className="text-slate-500 leading-relaxed">
              Refunds are initiated within 24 hours of doorstep product verification directly to your original payment mode.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center mx-auto text-xl">
              🚚
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Free Home Doorstep Pickup</h3>
            <p className="text-slate-500 leading-relaxed">
              Our courier executive will pick up the item directly from your delivery address without any extra fee.
            </p>
          </div>
        </div>

        {/* Return Process Guidelines */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          <h2 className="text-base font-extrabold text-slate-900 font-outfit border-b border-slate-100 pb-4">
            How to Request a Return or Replacement
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">1</span>
              <h4 className="font-extrabold text-slate-900 pt-2">Go to My Orders</h4>
              <p className="text-slate-500">Navigate to My Orders in your Account Dashboard and select the item you wish to return.</p>
            </div>

            <div className="space-y-1">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">2</span>
              <h4 className="font-extrabold text-slate-900 pt-2">Select Reason & Upload Image</h4>
              <p className="text-slate-500">Choose the reason (Defect, Damaged, Wrong Item) and upload 2 photos of the product condition.</p>
            </div>

            <div className="space-y-1">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">3</span>
              <h4 className="font-extrabold text-slate-900 pt-2">Doorstep Pickup & Refund</h4>
              <p className="text-slate-500">Our representative verifies the box and product serial number, and triggers your instant refund.</p>
            </div>
          </div>
        </div>

        {/* Refund Timeline Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 font-outfit border-b border-slate-100 pb-4">
            Refund SLA & Method Timelines
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
                  <th className="p-3">Payment Mode</th>
                  <th className="p-3">Refund Processing Method</th>
                  <th className="p-3">Estimated Credit Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="p-3 font-bold text-slate-900">UPI (PhonePe, GPay, Paytm)</td>
                  <td className="p-3">Direct VPA Refund</td>
                  <td className="p-3 font-bold text-emerald-600">Within 24 Hours</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Credit / Debit Card</td>
                  <td className="p-3">Bank Card Refund</td>
                  <td className="p-3 font-bold text-slate-900">2 to 4 Business Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Cash on Delivery (COD)</td>
                  <td className="p-3">NEFT / Bank Transfer to Savings Account</td>
                  <td className="p-3 font-bold text-slate-900">24 to 48 Hours after details provided</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
