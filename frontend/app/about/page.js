'use client';

import Link from 'next/link';
import { ShieldCheck, Award, Store, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen space-y-12 pb-16">
      
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-black uppercase px-3.5 py-1 rounded-full">
            ABOUT ELECTROMART & JAISWAL MOBILE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-outfit text-white tracking-tight">
            Empowering Homes & Business with Smart Technology
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            From our flagship Experience Center in Parsauni Chowk, Sitamarhi to BKC Mumbai, we bring 100% genuine brand electronics, smartphones, TVs, ACs, and home appliances with unbeatable prices and VIP customer support.
          </p>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-blue-600 font-outfit">10,000+</h3>
            <p className="text-xs text-slate-500 font-bold mt-1">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-blue-600 font-outfit">100%</h3>
            <p className="text-xs text-slate-500 font-bold mt-1">Original Brand Warranty</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-blue-600 font-outfit">50+</h3>
            <p className="text-xs text-slate-500 font-bold mt-1">Global Retail Brands</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-blue-600 font-outfit">24x7</h3>
            <p className="text-xs text-slate-500 font-bold mt-1">Dedicated Customer Care</p>
          </div>
        </div>
      </div>

      {/* 3. Authorized Retail Partner Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 font-outfit text-center">Authorized Direct Brand Partners</h2>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          {['Samsung', 'Apple', 'Godrej', 'Daikin', 'LG', 'Sony', 'Voltas', 'Luminous', 'HP', 'Bosch', 'OnePlus', 'boAt'].map((brand, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex items-center justify-center font-black text-slate-800 text-sm">
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Experience Center Location & Contact CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h3 className="text-2xl font-black font-outfit">Visit Our Experience Store</h3>
            <p className="text-xs text-blue-100 max-w-lg leading-relaxed">
              Experience the latest 8K OLED TVs, Flagship Smartphones, and Smart ACs in person at Parsauni Chowk, Sitamarhi, Bihar - 843316.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-white text-blue-700 hover:bg-blue-50 font-extrabold px-6 py-3.5 rounded-xl text-xs shadow-md transition-all flex items-center space-x-2 flex-shrink-0"
          >
            <span>Contact Us & Directions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
