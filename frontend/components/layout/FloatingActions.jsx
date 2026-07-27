'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20ElectroMart%20I%20want%20to%20enquire%20about%20electronics"
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-3 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        title="Chat with Us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold py-1 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Live WhatsApp Support
        </span>
      </a>

      {/* Floating Call Button */}
      <a
        href="tel:18003003500"
        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-xl flex items-center justify-center transition-transform hover:scale-110 group relative"
        title="Call Toll Free"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold py-1 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call Toll Free
        </span>
      </a>

      {/* Back to Top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 bg-slate-800/90 text-white rounded-full p-2.5 shadow-lg border border-slate-700 hover:bg-teal-500 transition-all flex items-center justify-center"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
