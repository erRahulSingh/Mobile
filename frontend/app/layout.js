import './globals.css';
import { Suspense } from 'react';
import Providers from '../components/Providers';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import EnquiryModal from '../components/EnquiryModal';
import FloatingActions from '../components/layout/FloatingActions';

export const metadata = {
  title: 'ElectroMart | Full Stack Premium Electronics Platform',
  description: 'Buy flagship smartphones, 4K Smart TVs, gaming laptops, and smart home appliances from Samsung, Apple, LG, Sony, and Daikin.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
        <Providers>
          <Suspense fallback={<div className="h-16 bg-[#040C2A]" />}>
            <Navbar />
          </Suspense>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <EnquiryModal />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
