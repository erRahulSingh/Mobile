'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Package, MapPin, CreditCard, Tag, Star, Bell, Heart, LogOut, ChevronRight, Edit2, Plus, ShieldCheck, HelpCircle, Check, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Rahul',
    lastName: 'Kumar',
    gender: 'Male',
    email: 'jaiswalmobile@gmail.com',
    phone: '+91 98765 43210'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    toast.success('Profile details updated successfully!');
  };

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 1. Left Sidebar (Flipkart Style Account Navigation - 4 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Header User Card */}
            <div className="bg-white p-4 rounded-xs border border-slate-200/80 shadow-2xs flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-xs">
                {profileData.firstName.charAt(0)}
              </div>
              <div className="leading-tight">
                <span className="text-[11px] text-slate-500 font-medium">Hello,</span>
                <h3 className="text-sm font-extrabold text-slate-900 font-outfit">{profileData.firstName} {profileData.lastName}</h3>
              </div>
            </div>

            {/* Navigation Menu Box */}
            <div className="bg-white rounded-xs border border-slate-200/80 shadow-2xs divide-y divide-slate-100 text-xs">
              
              {/* MY ORDERS */}
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full p-4 flex items-center justify-between font-bold text-left transition ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:text-blue-600'}`}
              >
                <div className="flex items-center space-x-3">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="uppercase tracking-wider">MY ORDERS</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* ACCOUNT SETTINGS Group */}
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-3 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>ACCOUNT SETTINGS</span>
                </div>
                <div className="pl-7 space-y-2.5">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`block w-full text-left font-medium transition ${activeTab === 'profile' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    Profile Information
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`block w-full text-left font-medium transition ${activeTab === 'addresses' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    Manage Addresses
                  </button>
                  <button
                    onClick={() => setActiveTab('pan')}
                    className={`block w-full text-left font-medium transition ${activeTab === 'pan' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    PAN Card Information
                  </button>
                </div>
              </div>

              {/* PAYMENTS Group */}
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-3 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>PAYMENTS</span>
                </div>
                <div className="pl-7 space-y-2.5">
                  <button
                    onClick={() => setActiveTab('payments')}
                    className={`block w-full text-left font-medium transition ${activeTab === 'payments' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    Gift Cards <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded ml-1 font-bold">₹0</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="block w-full text-left text-slate-600 hover:text-blue-600 font-medium"
                  >
                    Saved UPI / Cards
                  </button>
                </div>
              </div>

              {/* MY STUFF Group */}
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-3 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                  <Tag className="w-4 h-4 text-blue-600" />
                  <span>MY STUFF</span>
                </div>
                <div className="pl-7 space-y-2.5">
                  <button onClick={() => setActiveTab('coupons')} className="block w-full text-left text-slate-600 hover:text-blue-600 font-medium">My Coupons</button>
                  <button onClick={() => setActiveTab('reviews')} className="block w-full text-left text-slate-600 hover:text-blue-600 font-medium">My Reviews & Ratings</button>
                  <button onClick={() => setActiveTab('wishlist')} className={`block w-full text-left font-medium transition ${activeTab === 'wishlist' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'}`}>My Wishlist (3)</button>
                </div>
              </div>

              {/* LOGOUT Button */}
              <div className="p-4">
                <Link href="/" className="flex items-center space-x-3 text-slate-700 hover:text-rose-600 font-bold transition">
                  <LogOut className="w-4 h-4 text-slate-500" />
                  <span>Logout</span>
                </Link>
              </div>

            </div>

          </div>

          {/* 2. Right Main Content Area (Flipkart Style Tabs - 8 Cols) */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-xs border border-slate-200/80 shadow-2xs min-h-[500px]">
            
            {/* VIEW 1: PROFILE INFORMATION */}
            {activeTab === 'profile' && (
              <div className="space-y-8 text-xs">
                
                {/* Personal Information Header */}
                <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
                  <h2 className="text-base font-extrabold text-slate-900 font-outfit">Personal Information</h2>
                  {!isEditingProfile ? (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="text-xs font-bold text-slate-500 hover:underline"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  
                  {/* Name Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                    <div>
                      <label className="block text-[11px] text-slate-500 font-semibold mb-1">First Name</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className={`w-full border rounded px-3 py-2.5 text-slate-900 font-bold ${isEditingProfile ? 'bg-white border-blue-600 focus:outline-none' : 'bg-slate-50 border-slate-200 cursor-not-allowed'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 font-semibold mb-1">Last Name</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className={`w-full border rounded px-3 py-2.5 text-slate-900 font-bold ${isEditingProfile ? 'bg-white border-blue-600 focus:outline-none' : 'bg-slate-50 border-slate-200 cursor-not-allowed'}`}
                      />
                    </div>
                  </div>

                  {/* Gender Selector */}
                  <div>
                    <label className="block text-[11px] text-slate-500 font-semibold mb-2">Your Gender</label>
                    <div className="flex items-center space-x-6">
                      {['Male', 'Female'].map((g) => (
                        <label key={g} className="flex items-center space-x-2 cursor-pointer font-bold text-slate-800">
                          <input
                            type="radio"
                            name="gender"
                            disabled={!isEditingProfile}
                            checked={profileData.gender === g}
                            onChange={() => setProfileData({ ...profileData, gender: g })}
                            className="accent-blue-600"
                          />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {isEditingProfile && (
                    <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded shadow-xs hover:bg-blue-700 transition">
                      SAVE CHANGES
                    </button>
                  )}
                </form>

                {/* Email Address Section */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between max-w-lg">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Email Address</h4>
                      <p className="text-xs font-bold text-slate-800 mt-1">{profileData.email}</p>
                    </div>
                    <button onClick={() => toast.success('OTP sent to email for verification')} className="text-xs font-bold text-blue-600 hover:underline">
                      Edit
                    </button>
                  </div>
                </div>

                {/* Mobile Number Section */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between max-w-lg">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Mobile Number</h4>
                      <p className="text-xs font-bold text-slate-800 mt-1">{profileData.phone}</p>
                    </div>
                    <button onClick={() => toast.success('OTP sent to mobile number')} className="text-xs font-bold text-blue-600 hover:underline">
                      Edit
                    </button>
                  </div>
                </div>

                {/* FAQs Section (Flipkart Style) */}
                <div className="pt-8 border-t border-slate-100 space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-900">Frequently Asked Questions</h4>
                  
                  <div className="space-y-3 text-slate-600 leading-relaxed">
                    <div>
                      <h5 className="font-bold text-slate-900">What happens when I update my email address (or mobile number)?</h5>
                      <p className="text-[11px] mt-0.5">Your login email id (or mobile number) changes, automatically updating all communication emails/SMS sent to your new address.</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">When will my ElectroMart account be updated with the new email address?</h5>
                      <p className="text-[11px] mt-0.5">It happens instantly after you confirm the OTP sent to your new email address or phone number.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: MY ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <h2 className="text-base font-extrabold text-slate-900 font-outfit">My Orders</h2>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search your orders here"
                      className="bg-slate-50 border border-slate-200 rounded pl-8 pr-4 py-2 text-xs focus:outline-none focus:border-blue-600 w-64"
                    />
                  </div>
                </div>

                {/* Order List Cards */}
                <div className="space-y-4">
                  
                  {/* Order Item 1 */}
                  <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=150&q=80"
                        alt="Samsung S24"
                        className="w-16 h-16 object-contain border border-slate-100 rounded p-1"
                      />
                      <div className="space-y-1 text-left">
                        <h4 className="font-extrabold text-slate-900 text-xs">Samsung Galaxy S24 Ultra 5G (512GB Titanium Gray)</h4>
                        <span className="text-[11px] text-slate-500 block">Seller: Jaiswal Mobile Sitamarhi</span>
                        <span className="font-extrabold text-slate-900 block">₹1,24,999</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1 flex-shrink-0">
                      <div className="flex items-center space-x-2 text-emerald-600 font-bold">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                        <span>Delivered on July 24, 2026</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">Your item has been delivered</span>
                    </div>
                  </div>

                  {/* Order Item 2 */}
                  <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=150&q=80"
                        alt="Godrej Fridge"
                        className="w-16 h-16 object-contain border border-slate-100 rounded p-1"
                      />
                      <div className="space-y-1 text-left">
                        <h4 className="font-extrabold text-slate-900 text-xs">Godrej 244L 3 Star Inverter Frost Free Double Door Refrigerator</h4>
                        <span className="text-[11px] text-slate-500 block">Seller: Godrej Official Store</span>
                        <span className="font-extrabold text-slate-900 block">₹24,990</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1 flex-shrink-0">
                      <div className="flex items-center space-x-2 text-blue-600 font-bold">
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping"></div>
                        <span>Arriving by Tomorrow, 9 PM</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">Item is out for delivery</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* VIEW 3: MANAGE ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 text-xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h2 className="text-base font-extrabold text-slate-900 font-outfit">Manage Addresses</h2>
                  <button
                    onClick={() => toast.success('Open add address modal')}
                    className="border border-blue-600 text-blue-600 font-bold px-4 py-2 rounded flex items-center space-x-1 hover:bg-blue-50 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD A NEW ADDRESS</span>
                  </button>
                </div>

                {/* Saved Address Cards */}
                <div className="space-y-4">
                  
                  {/* Address 1: Home */}
                  <div className="border border-slate-200 rounded p-5 space-y-2 bg-white relative">
                    <div className="flex items-center space-x-3">
                      <span className="bg-slate-100 text-slate-700 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">HOME</span>
                      <h4 className="font-extrabold text-slate-900">{profileData.firstName} {profileData.lastName}</h4>
                      <span className="font-bold text-slate-800">{profileData.phone}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Parsauni Chowk, Near Central Bank of India, Sitamarhi, Bihar - <span className="font-bold text-slate-900">843316</span>
                    </p>
                  </div>

                  {/* Address 2: Work */}
                  <div className="border border-slate-200 rounded p-5 space-y-2 bg-white relative">
                    <div className="flex items-center space-x-3">
                      <span className="bg-slate-100 text-slate-700 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">WORK</span>
                      <h4 className="font-extrabold text-slate-900">{profileData.firstName} {profileData.lastName}</h4>
                      <span className="font-bold text-slate-800">{profileData.phone}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Plot 42, BKC Commercial Complex, Bandra East, Mumbai, Maharashtra - <span className="font-bold text-slate-900">400051</span>
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* VIEW 4: PAYMENTS & GIFT CARDS */}
            {activeTab === 'payments' && (
              <div className="space-y-6 text-xs">
                <h2 className="text-base font-extrabold text-slate-900 font-outfit border-b border-slate-100 pb-4">Gift Cards & Saved Payments</h2>
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-sm">ElectroMart Wallet Balance</h4>
                  <div className="text-3xl font-black text-blue-600 font-outfit">₹0.00</div>
                  <button onClick={() => toast.success('Gift Card redemption feature enabled')} className="bg-blue-600 text-white font-bold px-4 py-2 rounded text-xs">
                    + Add ElectroMart Gift Card
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 5: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6 text-xs">
                <h2 className="text-base font-extrabold text-slate-900 font-outfit border-b border-slate-100 pb-4">My Wishlist (3 items)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-slate-200 p-4 rounded text-center space-y-2">
                    <img src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=150&q=80" alt="Phone" className="h-24 mx-auto object-contain" />
                    <h4 className="font-bold text-slate-900 truncate">Samsung Galaxy S24 Ultra</h4>
                    <span className="font-black text-blue-600 text-sm block">₹1,24,999</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

