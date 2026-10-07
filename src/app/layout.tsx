import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getCategories } from '@/utils/api';

export const metadata: Metadata = {
  title: 'বাজার দর (Bazar Dor) — দৈনন্দিন বাজারের সঠিক ও হালনাগাদ দর',
  description:
    'সারা দেশের প্রধান বাজারগুলোর শাকসবজি, চাল, ডাল, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের আপডেটেড ও নির্ভুল মূল্য তালিকা।',
  keywords: ['বাজার দর', 'Bazar Dor', 'Market Price Bangladesh', 'কাঁচাবাজার', 'নিত্যপণ্যের দাম'],
  icons: {
    icon: '/logo-icon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#0f172a',
                color: '#f8fafc',
                fontSize: '14px',
                borderRadius: '12px',
                border: '1px solid #334155',
                padding: '12px 18px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          <Navbar categories={categories} />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
