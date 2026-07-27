'use client';

import Link from 'next/link';
import { FileText, ShieldCheck, Award, CheckCircle, Scale, ArrowRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-10">
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-3 relative z-10">
          <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-black uppercase px-3.5 py-1 rounded-full inline-flex items-center space-x-1.5">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Legal Agreement & Brand Authorization</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-outfit text-white tracking-tight">
            Terms & Conditions Agreement
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before placing orders or using services at Jaiswal Mobile & ElectroMart.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 4 Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">100% Genuine Brand</h4>
            <p className="text-xs text-slate-500 leading-relaxed">All products backed by official manufacturer warranties.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">7-Day Replacement</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Easy replacement for manufacturing defects upon store inspection.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">GST Invoice</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Official tax invoice provided with every smartphone and appliance.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900">Fair Pricing</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Transparent Indian Rupee (INR) prices inclusive of all taxes.</p>
          </div>
        </div>

        {/* Detailed Document */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10 space-y-8 text-xs text-slate-700">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">1</span>
              <h3>User Account & Eligibility</h3>
            </div>
            <p className="leading-relaxed pl-8">
              By placing an order on ElectroMart, you warrant that you are at least 18 years of age or accessing under the supervision of a parent or legal guardian. Users are responsible for maintaining account credential confidentiality.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">2</span>
              <h3>Brand Authorization & Original Warranty</h3>
            </div>
            <p className="leading-relaxed pl-8">
              Jaiswal Mobile is an authorized direct retail seller of Apple, Samsung, LG, Sony, Daikin, Godrej, HP, boAt, and OnePlus products. All products include manufacturer serial numbers and valid brand warranty certificates valid across official service centers in India.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">3</span>
              <h3>Product Pricing & Taxes</h3>
            </div>
            <p className="leading-relaxed pl-8">
              All prices listed on ElectroMart are displayed in Indian Rupees (INR) and include GST taxes. Promotional discount codes (e.g. WELCOME10) apply to eligible products prior to checkout.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">4</span>
              <h3>Returns, Replacement & Order Cancellations</h3>
            </div>
            <p className="leading-relaxed pl-8">
              In the rare event of receiving a physically damaged or defective item, customer must notify ElectroMart support within 7 days. Replacements are issued following verification at Parsauni Chowk Sitamarhi store or online inspection.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm font-outfit">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">5</span>
              <h3>Jurisdiction & Legal Terms</h3>
            </div>
            <p className="leading-relaxed pl-8">
              These terms shall be governed by and construed in accordance with the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in Sitamarhi, Bihar or Mumbai, Maharashtra.
            </p>
          </div>

        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div>
            <h4 className="text-base font-extrabold font-outfit">Need Terms Assistance?</h4>
            <p className="text-xs text-blue-100">Contact Jaiswal Mobile Store at Parsauni Chowk, Sitamarhi.</p>
          </div>
          <Link href="/contact" className="bg-white text-blue-700 font-black px-5 py-2.5 rounded-xl text-xs shadow-sm hover:bg-blue-50 transition flex items-center space-x-2">
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
