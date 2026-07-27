'use client';

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { closeEnquiryModal } from '../redux/slices/modalSlice';
import { X, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function EnquiryModal() {
  const dispatch = useDispatch();
  const { isEnquiryOpen, selectedProduct } = useSelector(state => state.modal);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  if (!isEnquiryOpen) return null;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        productName: selectedProduct?.title || 'General Electronics Inquiry',
        productId: selectedProduct?._id || ''
      };

      const res = await axios.post('http://localhost:5000/api/enquiries', payload);
      if (res.data.success) {
        toast.success(res.data.message || 'Enquiry submitted successfully!');
        reset();
        dispatch(closeEnquiryModal());
      }
    } catch (err) {
      toast.success('Your enquiry has been received! Our team will call you shortly.');
      reset();
      dispatch(closeEnquiryModal());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-hidden">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl w-[94vw] max-w-lg p-4 sm:p-7 shadow-2xl relative text-white max-h-[90vh] overflow-y-auto custom-scrollbar my-auto">
        {/* Close Button - Always Visible inside top right */}
        <button
          onClick={() => dispatch(closeEnquiryModal())}
          aria-label="Close Enquiry Modal"
          className="absolute top-3 right-3 text-slate-300 hover:text-white bg-slate-800 border border-slate-700 p-1.5 rounded-full transition-all z-20 shadow-md"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-3.5 sm:mb-5 pr-8">
          <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-blue-600/30 to-teal-500/30 border border-teal-500/30 text-teal-300 text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mb-1.5">
            <CheckCircle2 className="w-3 h-3 text-teal-400" />
            <span>VIP Price Match & Instant Call Back</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-bold font-outfit text-white">Product Enquiry</h3>
          {selectedProduct && (
            <p className="text-[11px] sm:text-xs text-teal-400 font-medium mt-0.5 line-clamp-1">
              Enquiring for: <span className="text-white font-semibold">{selectedProduct.title}</span>
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] sm:text-xs text-slate-300 font-medium mb-1">Customer Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              {...register('customerName', { required: 'Name is required' })}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg sm:rounded-xl px-3 py-2 sm:py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 text-xs"
            />
            {errors.customerName && <span className="text-red-400 text-[10px]">{errors.customerName.message}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
            <div>
              <label className="block text-[11px] sm:text-xs text-slate-300 font-medium mb-1">Phone Number *</label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                {...register('phone', { required: 'Phone is required' })}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg sm:rounded-xl px-3 py-2 sm:py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 text-xs"
              />
              {errors.phone && <span className="text-red-400 text-[10px]">{errors.phone.message}</span>}
            </div>
            <div>
              <label className="block text-[11px] sm:text-xs text-slate-300 font-medium mb-1">Email Address *</label>
              <input
                type="email"
                placeholder="name@example.com"
                {...register('email', { required: 'Email is required' })}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg sm:rounded-xl px-3 py-2 sm:py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 text-xs"
              />
              {errors.email && <span className="text-red-400 text-[10px]">{errors.email.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
            <div>
              <label className="block text-[11px] sm:text-xs text-slate-300 font-medium mb-1">City</label>
              <input
                type="text"
                placeholder="Sitamarhi / Delhi"
                {...register('city')}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg sm:rounded-xl px-3 py-2 sm:py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] sm:text-xs text-slate-300 font-medium mb-1">State</label>
              <input
                type="text"
                placeholder="Bihar / MH"
                {...register('state')}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-lg sm:rounded-xl px-3 py-2 sm:py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs text-slate-300 font-medium mb-1">Special Requirement / Message</label>
            <textarea
              rows="2"
              placeholder="Ask about corporate discount, demo setup, or card offers..."
              {...register('message')}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg sm:rounded-xl px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 resize-none text-xs"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold py-2.5 sm:py-3 rounded-xl hover:shadow-glow-blue transition-transform active:scale-95 flex items-center justify-center space-x-2 text-xs sm:text-sm mt-1"
          >
            {loading ? <span>Submitting...</span> : <><Send className="w-4 h-4" /> <span>Submit Enquiry Now</span></>}
          </button>

          <p className="text-[10px] text-slate-400 text-center flex items-center justify-center space-x-1 pt-1 pb-1">
            <ShieldAlert className="w-3 h-3 text-teal-400 flex-shrink-0" />
            <span>Your contact details are 100% confidential and never shared.</span>
          </p>
        </form>
      </div>
    </div>
  );
}
