'use client';

import Link from 'next/link';
import { Newspaper, Download, Mail, ExternalLink, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PressMediaPage() {
  const articles = [
    {
      date: 'July 20, 2026',
      title: 'ElectroMart Announces Expansion of Flagship Retail Stores & 24-Hour Express Electronics Delivery in Bihar',
      publication: 'Tech Retail India',
      snippet: 'Jaiswal Mobile & ElectroMart expand direct retail operations in Sitamarhi, delivering genuine Apple, Samsung, Daikin, and Godrej appliances.'
    },
    {
      date: 'June 15, 2026',
      title: 'Jaiswal Mobile Recognized as Top Authorized Electronics Retailer for Flagship Smartphones & 8K OLED TVs',
      publication: 'Consumer Electronics Digest',
      snippet: 'Celebrating over 10,000 satisfied customers with 100% original brand warranty and No-Cost EMI options.'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-8">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-black uppercase px-3.5 py-1 rounded-full">
            NEWSROOM & MEDIA KIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">Press & Media Center</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Latest announcements, media coverage, and brand assets for ElectroMart & Jaiswal Mobile.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs">
        
        {/* Press Releases List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 font-outfit">Press Releases & News Coverage</h2>
            <button
              onClick={() => toast.success('Media Kit zip file download started!')}
              className="border border-blue-600 text-blue-600 font-bold px-3.5 py-1.5 rounded-lg text-xs hover:bg-blue-50 transition flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Media Kit (.ZIP)</span>
            </button>
          </div>

          <div className="space-y-4">
            {articles.map((art, idx) => (
              <div key={idx} className="border border-slate-200 p-5 rounded-xl space-y-2 bg-slate-50/60 hover:border-blue-600 transition">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-extrabold text-blue-600 uppercase">{art.publication}</span>
                  <span className="text-slate-400">{art.date}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{art.title}</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed">{art.snippet}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
