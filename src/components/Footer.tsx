'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBasket, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-800">
          {/* Left Brand info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-2xl shadow-sm">
                🛒
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                বাজার দর
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Right Disclaimer Notice */}
          <div className="md:col-span-6 md:text-right space-y-2">
            <p className="text-xs sm:text-sm text-slate-400 italic">
              “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
            </p>
            <p className="text-xs text-slate-500">
              দৈনিক বাজার পরিস্থিতি ও সরবরাহের ওপর ভিত্তি করে পণ্যের মূল্যে পরিবর্তন ঘটতে পারে।
            </p>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} বাজার দর (Bazar Dor). সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-1">
            <span>ভালোবাসা ও নিষ্ঠা সহকারে তৈরি</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>শিক্ষামূলক প্রজেক্ট</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
