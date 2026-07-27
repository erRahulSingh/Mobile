'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Store, MapPin, Phone, Mail, Clock, FileText, MessageSquare, Send, ShieldCheck, CreditCard, Truck, Headphones, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Thank you ${formData.name || 'Customer'}! Your message has been sent to Jaiswal Mobile support.`, { icon: '🚀' });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen space-y-10 pb-16">
      
      {/* 1. Top Hero Banner (Dark Royal Blue with 3D Support Graphics) */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left Title & Breadcrumb */}
          <div className="space-y-2 sm:space-y-3 max-w-xl text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-black font-outfit text-white tracking-tight">
              Contact Us
            </h1>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-xs text-slate-400 font-semibold">
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
              <span>›</span>
              <span className="text-slate-200">Contact Us</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed pt-1">
              We're here to help! Reach out to us for any queries, support or business inquiries.
            </p>
          </div>

          {/* Right 3D Illustration Graphic */}
          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-xs sm:w-80 h-32 sm:h-44 bg-gradient-to-tr from-blue-600/30 to-indigo-500/20 rounded-2xl sm:rounded-3xl backdrop-blur-xl border border-blue-500/30 shadow-2xl flex items-center justify-center p-4 sm:p-6 text-center">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg animate-bounce flex-shrink-0">
                  🎧
                </div>
                <div className="text-left">
                  <span className="bg-amber-400 text-slate-900 text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full">24x7 ASSISTANCE</span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white mt-0.5">Live Customer Care</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-300">Fast response within 2 hours</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* 2. Main Two-Column Section (Get In Touch & Send Us a Message) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Get In Touch (6 Info Cards + Store Location Map) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-outfit">Get In Touch</h2>

            {/* 6 Info Cards Grid (2 cols on mobile) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
              
              {/* Owner Name */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <User className="w-5 h-5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[11px] text-slate-500 font-semibold block">Owner Name</span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">Rahul Kumar</h4>
                </div>
              </div>

              {/* Shop Name */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Store className="w-5 h-5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[11px] text-slate-500 font-semibold block">Shop Name</span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">Jaiswal Mobile</h4>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[11px] text-slate-500 font-semibold block">Address</span>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5 leading-snug">Parsauni Chowk, Sitamarhi, Bihar - 843316</h4>
                </div>
              </div>

              {/* Phone Number */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[11px] text-slate-500 font-semibold block">Phone Number</span>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">+91 98765 43210</h4>
                </div>
              </div>

              {/* Email Address */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[11px] text-slate-500 font-semibold block">Email Address</span>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5 truncate">jaiswalmobile@gmail.com</h4>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="leading-tight text-left">
                  <span className="text-[11px] text-slate-500 font-semibold block">Working Hours</span>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">Mon - Sun : 9:00 AM - 9:00 PM</h4>
                </div>
              </div>

            </div>

            {/* Store Location Map */}
            <div className="rounded-xl overflow-hidden border border-slate-200/80 shadow-xs h-56 relative bg-white">
              <iframe
                title="Jaiswal Mobile Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57224.28114006121!2d85.46747209999999!3d26.59330965!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edcd66c0d0a793%3A0xb30e3bb474f885e3!2sSitamarhi%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Send Us a Message Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 font-outfit">Send Us a Message</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number */}
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>

              {/* Row 3: Subject */}
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>

              {/* Row 4: Message */}
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <textarea
                  rows="4"
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white resize-none transition"
                ></textarea>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center space-x-2 text-xs shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          </div>

        </div>

        {/* 3. Bottom Strip Bar (100% Genuine, Secure Payments, Fast Delivery, 24x7 Customer Support) */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <h4 className="text-xs font-extrabold text-slate-900">100% Genuine Products</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Sourced directly from brands</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <h4 className="text-xs font-extrabold text-slate-900">Secure Payments</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Multiple payment options available</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <h4 className="text-xs font-extrabold text-slate-900">Fast Delivery</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Quick & reliable delivery at your doorstep</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <h4 className="text-xs font-extrabold text-slate-900">24x7 Customer Support</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">We are here to help you anytime</p>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

