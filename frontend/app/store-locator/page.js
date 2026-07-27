'use client';

import Link from 'next/link';
import { MapPin, PhoneCall, Clock, Navigation, CheckCircle2 } from 'lucide-react';

export default function StoreLocatorPage() {
  const stores = [
    {
      name: 'Jaiswal Mobile & ElectroMart Flagship Store',
      city: 'Sitamarhi, Bihar',
      address: 'Parsauni Chowk, Near Central Bank of India, Sitamarhi, Bihar - 843316',
      phone: '+91 98765 43210',
      owner: 'Rahul Kumar',
      hours: 'Mon - Sun : 9:00 AM - 9:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57186.20863833215!2d85.46746815!3d26.59253455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edc513e4b7899d%3A0x6b9766bbd0873a4b!2sSitamarhi%2C%20Bihar%20843302!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
    },
    {
      name: 'ElectroMart Experience Hub BKC',
      city: 'Mumbai, Maharashtra',
      address: 'Plot 42, BKC Commercial Complex, Bandra East, Mumbai, Maharashtra - 400051',
      phone: '+91 98123 45678',
      owner: 'Store Manager',
      hours: 'Mon - Sat : 10:00 AM - 9:30 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.792437648356!2d72.8665!3d19.0657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e14a82efd1%3A0x5a1811e592789f25!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-8">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-black uppercase px-3.5 py-1 rounded-full">
            EXPERIENCE STORES & SERVICE HUBS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">Find a Store Near You</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Visit our physical retail showrooms to experience 8K TVs, flagship smartphones, and smart ACs before buying.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stores.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <span className="bg-blue-100 text-blue-700 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded">{s.city}</span>
                <h3 className="text-base font-extrabold text-slate-900 font-outfit">{s.name}</h3>
                
                <div className="space-y-2 text-slate-600 text-[11px] pt-1">
                  <p className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{s.address}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <PhoneCall className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-bold text-slate-900">{s.phone} ({s.owner})</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{s.hours}</span>
                  </p>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="h-48 rounded-xl overflow-hidden border border-slate-200">
                <iframe
                  title={s.name}
                  src={s.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
