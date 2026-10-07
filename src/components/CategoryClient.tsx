'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { ArrowUpDown, ArrowLeft, Layers, ShoppingBag } from 'lucide-react';

interface CategoryClientProps {
  category: Category | null;
  products: Product[];
  slug: string;
}

export function CategoryClient({ category, products, slug }: CategoryClientProps) {
  const [sortOption, setSortOption] = useState<'default' | 'lowToHigh' | 'highToLow'>('default');

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortOption === 'lowToHigh') {
      return list.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'highToLow') {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, sortOption]);

  // If category is not found or empty
  if (!category && products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 sm:p-14 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="text-6xl animate-bounce">📦</div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            বিভাগটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            দুঃখিত, ‘{slug}’ নামের কোনো পণ্যের বিভাগ বা ক্যাটাগরি আমাদের ডাটাবেজে নেই।
          </p>
          <div className="pt-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const title = category?.nameBn || slug;
  const icon = category?.icon || '🛒';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-emerald-600 transition flex items-center gap-1">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>হোম</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{title}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 text-9xl transform translate-x-10 translate-y-10 select-none pointer-events-none">
          {icon}
        </div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-emerald-100">
            <Layers className="w-3.5 h-3.5" />
            <span>বিভাগীয় দর তালিকা</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black flex items-center gap-3 tracking-tight">
            <span>{icon}</span>
            <span>{title}</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-50 max-w-xl">
            বর্তমান বাজারে {title} পণ্যের আপডেটেড মূল্য তালিকা ও বিভিন্ন বাজারের তুলনামূলক চিত্র।
          </p>
        </div>
      </div>

      {/* Controls Bar: Count & Sort (C1) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          মোট পণ্য: <span className="text-emerald-600 font-bold">{sortedProducts.length}</span> টি
        </div>

        {/* Sort Dropdown (Challenge C1) */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-sm shadow-xs self-start sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
            সাজান:
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="default" className="dark:bg-slate-900">ডিফল্ট</option>
            <option value="lowToHigh" className="dark:bg-slate-900">দাম: কম থেকে বেশি</option>
            <option value="highToLow" className="dark:bg-slate-900">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
          <div className="text-5xl">🛒</div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            এই বিভাগে বর্তমানে কোনো পণ্য নেই
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            শীঘ্রই নতুন পণ্য যোগ করা হবে।
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
