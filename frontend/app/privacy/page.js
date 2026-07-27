'use client';

import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Server, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-10">
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-3 relative z-10">
          <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-black uppercase px-3.5 py-1 rounded-full inline-flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted & Data Protected</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-outfit text-white tracking-tight">
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your privacy is our utmost priority. Read how ElectroMart & Jaiswal Mobile safeguard your account details, order history, and payment transactions.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 4 Security Assurance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Zero Card Storage</h4>
            <p className="text-xs text-slate-500 leading-relaxed">No Credit/Debit cards or UPI PINs are ever saved on our servers.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">SSL Encryption</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Bank-grade 256-bit SSL encryption protects every checkout.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">No Third Party Sales</h4>
            <p className="text-xs text-slate-500 leading-relaxed">We never sell, rent, or trade customer contact details to advertisers.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Full Data Control</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Request profile update or account data erasure at any time.</p>
          </div>
        </div>

        {/* Detailed Policy Accordion / Document */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10 space-y-8 text-xs text-slate-700">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">1</span>
              <h3>Information We Collect & Why</h3>
            </div>
            <p className="leading-relaxed pl-8">
              When you create an account, browse products, or place an order at Jaiswal Mobile / ElectroMart, we collect essential details like your Name, Delivery Address, Mobile Phone Number, and Email Address. This data is strictly used to process orders, issue GST tax invoices, and dispatch real-time SMS delivery tracking alerts for your Sitamarhi or Mumbai orders.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">2</span>
              <h3>Payment Security & PCI-DSS Compliance</h3>
            </div>
            <p className="leading-relaxed pl-8">
              All financial payment transactions (Credit/Debit Card, Netbanking, UPI, EMI) are processed through PCI-DSS Level 1 certified payment gateways (Razorpay/Paytm). ElectroMart does not have access to or store your card security PINs or bank credentials.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">3</span>
              <h3>Logistics & Courier Data Sharing</h3>
            </div>
            <p className="leading-relaxed pl-8">
              Your delivery contact phone number and address are shared exclusively with authorized delivery partners (ElectroMart Express Logistics / BlueDart) for product fulfillment. Couriers are strictly bound by non-disclosure agreements.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">4</span>
              <h3>Cookie Policy & Customer Rights</h3>
            </div>
            <p className="leading-relaxed pl-8">
              We use functional session cookies to store your cart items and remember selected store delivery locations (Sitamarhi / Mumbai). You may request data deletion or account closure anytime by contacting our support team at <span className="font-bold text-slate-900">jaiswalmobile@gmail.com</span>.
            </p>
          </div>

        </div>

        {/* Contact CTA Strip */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div>
            <h4 className="text-base font-extrabold font-outfit">Have Privacy Questions?</h4>
            <p className="text-xs text-blue-100">Contact our Data Protection Officer at Parsauni Chowk, Sitamarhi.</p>
          </div>
          <Link href="/contact" className="bg-white text-blue-700 font-black px-5 py-2.5 rounded-xl text-xs shadow-sm hover:bg-blue-50 transition flex items-center space-x-2">
            <span>Contact Support</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
