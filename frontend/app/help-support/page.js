'use client';

import Link from 'next/link';
import { HelpCircle, PhoneCall, MessageSquare, Mail, Package, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export default function HelpSupportPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-8">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-black uppercase px-3.5 py-1 rounded-full">
            WE ARE HERE TO HELP YOU 24X7
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">Customer Help & Support Center</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Have questions about your order, warranty claims, EMI options, or delivery status? Find answers or get in touch.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs">
        
        {/* 4 Support Topics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link href="/track-order" className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition text-center space-y-2 group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center mx-auto text-xl group-hover:scale-110 transition-transform">
              📦
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Order & Delivery</h3>
            <p className="text-slate-500 text-[11px]">Track your package status and delivery SLA.</p>
          </Link>

          <Link href="/returns-refunds" className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition text-center space-y-2 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center mx-auto text-xl group-hover:scale-110 transition-transform">
              🔄
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Returns & Refunds</h3>
            <p className="text-slate-500 text-[11px]">Request 7-day replacement or refund.</p>
          </Link>

          <Link href="/checkout" className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition text-center space-y-2 group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 font-bold flex items-center justify-center mx-auto text-xl group-hover:scale-110 transition-transform">
              💳
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Payments & EMI</h3>
            <p className="text-slate-500 text-[11px]">UPI, Credit Cards, and No-Cost EMI help.</p>
          </Link>

          <Link href="/about" className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition text-center space-y-2 group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center mx-auto text-xl group-hover:scale-110 transition-transform">
              🛡️
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Brand Warranty</h3>
            <p className="text-slate-500 text-[11px]">Official service center claim guidelines.</p>
          </Link>

        </div>

        {/* Contact Channels Grid */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          <h2 className="text-base font-extrabold text-slate-900 font-outfit border-b border-slate-100 pb-4">
            Connect Directly with Customer Care
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-2">
              <div className="flex items-center space-x-2 text-blue-600 font-bold">
                <PhoneCall className="w-4 h-4" />
                <span>Call Us (Toll-Free)</span>
              </div>
              <p className="text-slate-900 font-extrabold text-sm">+91 98765 43210</p>
              <p className="text-slate-500 text-[11px]">Mon - Sun : 9:00 AM - 9:00 PM</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-600 font-bold">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Support</span>
              </div>
              <p className="text-slate-900 font-extrabold text-sm">+91 98765 43210</p>
              <p className="text-slate-500 text-[11px]">Instant automated response</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-2">
              <div className="flex items-center space-x-2 text-indigo-600 font-bold">
                <Mail className="w-4 h-4" />
                <span>Email Support</span>
              </div>
              <p className="text-slate-900 font-extrabold text-sm">jaiswalmobile@gmail.com</p>
              <p className="text-slate-500 text-[11px]">24-hour response SLA</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
