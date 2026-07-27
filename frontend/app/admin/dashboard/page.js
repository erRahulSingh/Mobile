'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, MessageSquare, Plus, Edit2, Trash2, CheckCircle2, Clock, Search, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [showAddModal, setShowAddModal] = useState(false);

  const [products, setProducts] = useState([
    { _id: 'prod_1', title: 'Samsung Galaxy S24 Ultra 5G (512GB)', brand: 'Samsung', category: 'Mobile Phones', price: 134999, offerPrice: 124999, stockCount: 15, isBestSeller: true },
    { _id: 'prod_101', title: 'Godrej 244L 3 Star Inverter Refrigerator', brand: 'Godrej', category: 'Refrigerators', price: 31990, offerPrice: 24990, stockCount: 10, isBestSeller: true },
    { _id: 'prod_6', title: 'Daikin 1.5 Ton 5 Star Inverter Split AC', brand: 'Daikin', category: 'Air Conditioners', price: 67200, offerPrice: 45490, stockCount: 18, isBestSeller: true },
    { _id: 'prod_3', title: 'LG C3 65" 4K Smart OLED TV', brand: 'LG', category: 'Smart TVs', price: 249990, offerPrice: 189990, stockCount: 8, isBestSeller: true }
  ]);

  const [orders, setOrders] = useState([
    { id: 'EM-884920', customer: 'Rahul Sharma', phone: '+91 98765 43210', item: 'Samsung Galaxy S24 Ultra 5G', amount: 124999, date: '2026-07-26', status: 'Shipped' },
    { id: 'EM-884921', customer: 'Priya Verma', phone: '+91 98123 45678', item: 'Godrej 244L Refrigerator', amount: 24990, date: '2026-07-26', status: 'Processing' },
    { id: 'EM-884922', customer: 'Vikram Singh', phone: '+91 97890 12345', item: 'Daikin 1.5 Ton AC', amount: 45490, date: '2026-07-25', status: 'Delivered' }
  ]);

  const [enquiries, setEnquiries] = useState([
    { id: 'enq_1', name: 'Amit Kumar', phone: '+91 98111 22233', product: 'Samsung Galaxy S24 Ultra 5G', query: 'Corporate discount requirement for 5 units.', date: '2026-07-26', status: 'Pending Callback' }
  ]);

  const [newProd, setNewProd] = useState({
    title: '', brand: '', category: 'Mobile Phones', price: '', offerPrice: '', stockCount: '', images: ''
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const item = {
      _id: `prod_${Date.now()}`,
      title: newProd.title,
      brand: newProd.brand,
      category: newProd.category,
      price: Number(newProd.price),
      offerPrice: Number(newProd.offerPrice) || Number(newProd.price),
      stockCount: Number(newProd.stockCount) || 10,
      isBestSeller: false
    };
    setProducts([item, ...products]);
    setShowAddModal(false);
    setNewProd({ title: '', brand: '', category: 'Mobile Phones', price: '', offerPrice: '', stockCount: '', images: '' });
    toast.success('New product added to store catalogue!');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast.success(`Order #${orderId} status updated to ${newStatus}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 space-y-8">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="uppercase tracking-widest">ELECTROMART ADMIN PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-white mt-1">
              Store Control Center & Inventory
            </h1>
            <p className="text-xs text-slate-400 mt-1">Sitamarhi, Bihar & Mumbai Flagship Store Operations</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow-md transition-all flex items-center space-x-2 w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW PRODUCT</span>
          </button>
        </div>
      </div>

      {/* 4 Analytics Overview Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Sales Revenue</span>
              <h3 className="text-2xl font-black font-outfit text-slate-900">₹14,89,500</h3>
              <span className="text-[10px] text-emerald-600 font-bold">↑ +18% this month</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              💰
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Total Orders</span>
              <h3 className="text-2xl font-black font-outfit text-slate-900">{orders.length} Orders</h3>
              <span className="text-[10px] text-blue-600 font-bold">Live tracking active</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              📦
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Live Products</span>
              <h3 className="text-2xl font-black font-outfit text-slate-900">{products.length} Items</h3>
              <span className="text-[10px] text-slate-500 font-bold">Catalog active</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
              🏷️
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">VIP Enquiries</span>
              <h3 className="text-2xl font-black font-outfit text-slate-900">{enquiries.length} Enquiries</h3>
              <span className="text-[10px] text-amber-600 font-bold">Callback pending</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
              🎧
            </div>
          </div>

        </div>
      </div>

      {/* Main Body Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex space-x-4 border-b border-slate-100 pb-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'products' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Product Management ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Orders Management ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'enquiries' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              VIP Customer Callbacks ({enquiries.length})
            </button>
          </div>

          {/* TAB 1: PRODUCT MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4 text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Brand</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Offer Price</th>
                      <th className="p-3">MRP</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-extrabold text-slate-900">{p.title}</td>
                        <td className="p-3 text-blue-600 font-bold">{p.brand}</td>
                        <td className="p-3">{p.category}</td>
                        <td className="p-3 font-black text-slate-900">{formatCurrency(p.offerPrice)}</td>
                        <td className="p-3 text-slate-400 line-through">{formatCurrency(p.price)}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                            {p.stockCount} in stock
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={() => toast.success('Edit product modal')} className="text-blue-600 font-bold hover:underline">Edit</button>
                          <button onClick={() => { setProducts(products.filter(item => item._id !== p._id)); toast.success('Product deleted.'); }} className="text-rose-600 font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4 text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Purchased Item</th>
                      <th className="p-3">Total Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-mono font-bold text-blue-600">#{o.id}</td>
                        <td className="p-3 font-bold text-slate-900">{o.customer}</td>
                        <td className="p-3">{o.phone}</td>
                        <td className="p-3">{o.item}</td>
                        <td className="p-3 font-black text-slate-900">{formatCurrency(o.amount)}</td>
                        <td className="p-3">
                          <select
                            value={o.status}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            className="bg-slate-100 font-bold text-xs px-2.5 py-1 rounded border border-slate-300 focus:outline-none focus:border-blue-600 cursor-pointer"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: VIP ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-4 text-xs">
              {enquiries.map((enq) => (
                <div key={enq.id} className="border border-slate-200 p-4 rounded-xl space-y-2 bg-slate-50">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-blue-600">{enq.product}</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">{enq.status}</span>
                  </div>
                  <p className="text-slate-800 font-bold">Client: {enq.name} ({enq.phone})</p>
                  <p className="text-slate-600">Query: "{enq.query}"</p>
                  <button onClick={() => toast.success('Marked as contacted!')} className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded text-xs">
                    Mark as Contacted
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 text-xs shadow-2xl">
            <h3 className="text-base font-extrabold text-slate-900 font-outfit">Add New Electronics Item</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input type="text" required placeholder="e.g. Godrej 244L Refrigerator" value={newProd.title} onChange={e => setNewProd({...newProd, title: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand</label>
                  <input type="text" required placeholder="Godrej, Daikin..." value={newProd.brand} onChange={e => setNewProd({...newProd, brand: e.target.value})} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select value={newProd.category} onChange={e => setNewProd({...newProd, category: e.target.value})} className="w-full border rounded px-3 py-2">
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Refrigerators">Refrigerators</option>
                    <option value="Air Conditioners">Air Conditioners</option>
                    <option value="Inverter">Inverter</option>
                    <option value="Smart TVs">Smart TVs</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Headphones">Headphones</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MRP Price (₹)</label>
                  <input type="number" required placeholder="31990" value={newProd.price} onChange={e => setNewProd({...newProd, price: e.target.value})} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Offer Price (₹)</label>
                  <input type="number" required placeholder="24990" value={newProd.offerPrice} onChange={e => setNewProd({...newProd, offerPrice: e.target.value})} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Count</label>
                  <input type="number" required placeholder="10" value={newProd.stockCount} onChange={e => setNewProd({...newProd, stockCount: e.target.value})} className="w-full border rounded px-3 py-2" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded text-slate-600 font-bold">Cancel</button>
                <button type="submit" className="bg-[#2563EB] text-white font-bold px-5 py-2 rounded shadow-xs">Publish Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
