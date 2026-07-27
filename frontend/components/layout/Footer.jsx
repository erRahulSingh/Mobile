import Link from 'next/link';
import { ShoppingBag, Facebook, Instagram, Twitter, Youtube, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#040C26] text-slate-300 pt-12 pb-6 border-t border-slate-800">
      
      {/* 5 Column Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-10 border-b border-slate-800/80">
        
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-1 space-y-3.5">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center relative shadow-sm">
              <ShoppingBag className="w-4 h-4 text-white" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-900">
                e
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white font-outfit">
                Electro<span className="text-blue-500">Mart</span>
              </span>
              <span className="block text-[9px] font-medium text-slate-400 -mt-1">
                Smart Technology, Better Life
              </span>
            </div>
          </Link>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Your one-stop destination for the latest electronics, accessories & smart gadgets.
          </p>

          <div className="flex items-center space-x-2 pt-1">
            <a href="#" className="w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 text-slate-400 hover:text-white transition text-xs"><Facebook className="w-3.5 h-3.5" /></a>
            <a href="#" className="w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center hover:bg-pink-600 text-slate-400 hover:text-white transition text-xs"><Instagram className="w-3.5 h-3.5" /></a>
            <a href="#" className="w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center hover:bg-sky-500 text-slate-400 hover:text-white transition text-xs"><Twitter className="w-3.5 h-3.5" /></a>
            <a href="#" className="w-7 h-7 bg-slate-900 rounded-full flex items-center justify-center hover:bg-red-600 text-slate-400 hover:text-white transition text-xs"><Youtube className="w-3.5 h-3.5" /></a>
          </div>
        </div>

        {/* Col 2: Shop */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Shop</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><Link href="/products?category=Mobile%20Phones" className="hover:text-white transition">Mobiles</Link></li>
            <li><Link href="/products?category=Laptops" className="hover:text-white transition">Laptops</Link></li>
            <li><Link href="/products?category=Headphones" className="hover:text-white transition">Audio</Link></li>
            <li><Link href="/products?category=Smart%20TVs" className="hover:text-white transition">Smart TVs</Link></li>
            <li><Link href="/products?category=Home%20Appliances" className="hover:text-white transition">Home Appliances</Link></li>
            <li><Link href="/products?category=Accessories" className="hover:text-white transition">Accessories</Link></li>
          </ul>
        </div>

        {/* Col 3: Customer Service */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Customer Service</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><Link href="/track-order" className="hover:text-white transition">Track Order</Link></li>
            <li><Link href="/returns-refunds" className="hover:text-white transition">Returns & Refunds</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/help-support" className="hover:text-white transition">Help & Support</Link></li>
          </ul>
        </div>

        {/* Col 4: Company */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Company</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="/store-locator" className="hover:text-white transition">Store Locator</Link></li>
            <li><Link href="/press-media" className="hover:text-white transition">Press & Media</Link></li>
          </ul>
        </div>

        {/* Col 5: My Account */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">My Account</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><Link href="/customer/dashboard" className="hover:text-white transition">My Orders</Link></li>
            <li><Link href="/products" className="hover:text-white transition">Wishlist</Link></li>
            <li><Link href="/customer/dashboard" className="hover:text-white transition">Account Settings</Link></li>
            <li><Link href="/customer/dashboard" className="hover:text-white transition">Addresses</Link></li>
            <li><Link href="/customer/dashboard" className="hover:text-white transition">Logout</Link></li>
          </ul>
        </div>

        {/* Col 6: Secure Payments */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider">Secure Payments</h4>
          <p className="text-[11px] text-slate-400 leading-snug">
            We accept all major credit cards, debit cards & net banking.
          </p>

          {/* Payment Cards Badges */}
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-white text-blue-900 font-extrabold text-[10px] px-2 py-0.5 rounded shadow-2xs">VISA</span>
            <span className="bg-white text-rose-600 font-extrabold text-[10px] px-2 py-0.5 rounded shadow-2xs">Mastercard</span>
            <span className="bg-white text-blue-700 font-extrabold text-[10px] px-2 py-0.5 rounded shadow-2xs">RuPay</span>
            <span className="bg-white text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded shadow-2xs">UPI</span>
          </div>

          {/* Security Badges */}
          <div className="flex items-center space-x-2 text-[10px] text-slate-400 pt-1">
            <span className="flex items-center space-x-1 bg-slate-900 px-2 py-1 rounded border border-slate-800">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>100% SECURE</span>
            </span>
            <span className="flex items-center space-x-1 bg-slate-900 px-2 py-1 rounded border border-slate-800">
              <Lock className="w-3 h-3 text-blue-400" />
              <span>PCI DSS</span>
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 text-center text-[11px] text-slate-500 pt-4">
        <p>© 2026 Jaiswal Mobile / ElectroMart. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

