'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CareersPage() {
  const jobs = [
    { title: 'Store Sales Specialist', dept: 'Retail Operations', loc: 'Sitamarhi, Bihar', type: 'Full-Time', salary: '₹2.4L - ₹3.6L / year' },
    { title: 'E-Commerce Operations Executive', dept: 'Digital Logistics', loc: 'BKC, Mumbai', type: 'Full-Time', salary: '₹3.6L - ₹4.8L / year' },
    { title: 'Customer Support Lead', dept: 'Customer Success', loc: 'Sitamarhi / Remote', type: 'Full-Time', salary: '₹2.8L - ₹3.8L / year' },
    { title: 'Electronics Service Technician', dept: 'Technical Repairs', loc: 'Sitamarhi, Bihar', type: 'Full-Time', salary: '₹2.2L - ₹3.2L / year' }
  ];

  const handleApply = (jobTitle) => {
    toast.success(`Application form opened for ${jobTitle}. Send your CV to jaiswalmobile@gmail.com!`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 space-y-8">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#040C2A] via-[#07153D] to-[#040D2B] text-white py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="bg-blue-600/30 border border-blue-400/40 text-blue-300 text-xs font-black uppercase px-3.5 py-1 rounded-full">
            CAREERS AT ELECTROMART
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white">Join Our Growing Retail Team</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            We are looking for passionate, tech-savvy individuals to help us deliver top-tier electronics experiences.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs">
        
        {/* Open Positions List */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 font-outfit">Open Positions ({jobs.length})</h2>
            <span className="text-slate-500 text-[11px]">Send resumes to: <strong>jaiswalmobile@gmail.com</strong></span>
          </div>

          <div className="space-y-4">
            {jobs.map((j, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-5 hover:border-blue-600 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/50">
                <div className="space-y-1">
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded">{j.dept}</span>
                  <h3 className="font-extrabold text-slate-900 text-sm">{j.title}</h3>
                  <div className="flex items-center space-x-3 text-slate-500 text-[11px] pt-1">
                    <span className="flex items-center space-x-1"><MapPin className="w-3 h-3 text-blue-600" /><span>{j.loc}</span></span>
                    <span>•</span>
                    <span>{j.type}</span>
                    <span>•</span>
                    <span className="font-bold text-slate-800">{j.salary}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(j.title)}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-lg text-xs shadow-xs transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
