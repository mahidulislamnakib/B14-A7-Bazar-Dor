'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('সব-পণ্য');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'সব-পণ্য';
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 py-10 sm:py-16 lg:py-20 border-b border-slate-200/70 dark:border-slate-800">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-300/20 dark:bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>দৈনন্দিন বাজার মনিটরিং ও সঠিক মূল্য তালিকা</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.2]">
              প্রতিদিনের <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500">বাজার দর</span> জানুন এক নিমিষে
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              সারা দেশের প্রধান বাজারগুলোর শাকসবজি, চাল, ডাল, তেল, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের আপডেটেড ও নির্ভুল মূল্য তালিকা এখন আপনার হাতের মুঠোয়।
            </p>

            {/* Key Value Points */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>দৈনিক মূল্য হ্রাস-বৃদ্ধি ট্র্যাক</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>বাজারভিত্তিক নির্ভরযোগ্য তথ্য</span>
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-3">
              <a
                href="#সব-পণ্য"
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>আজকের বাজার দর দেখুন</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-white/80 to-emerald-50/50 dark:from-slate-800/80 dark:to-slate-900/60 border border-slate-200/80 dark:border-slate-700 shadow-2xl shadow-emerald-500/10">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Image
                    src="/bazar-hero.png"
                    alt="বাজার দর হিরো ব্যানার"
                    width={600}
                    height={450}
                    priority
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-pulse">
                <span className="text-2xl">🍚</span>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">স্বর্ণমাছি চাল</div>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">১৪৮ ৳ / কেজি</div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <span className="text-2xl">🐟</span>
                <div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">পদ্মার ইলিশ</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100">১,৮৫০ ৳ / কেজি</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
