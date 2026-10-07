'use client';

import React, { useState, useMemo } from 'react';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  SlidersHorizontal, 
  ArrowUpDown,
  Search,
  Filter
} from 'lucide-react';

interface HomeClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export function HomeClient({ initialProducts, categories }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'default' | 'lowToHigh' | 'highToLow'>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Section A: Top 6 Risers (আজ দাম বেড়েছে ▲)
  const topRisers = useMemo(() => {
    return [...initialProducts]
      .filter((p) => p.change && p.change.dir === 'up')
      .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
      .slice(0, 6);
  }, [initialProducts]);

  // Section B: Top 6 Fallers (আজ দাম কমেছে ▼)
  const topFallers = useMemo(() => {
    return [...initialProducts]
      .filter((p) => p.change && p.change.dir === 'down')
      .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0))
      .slice(0, 6);
  }, [initialProducts]);

  // Section C: All Products with Category Filter, Search, and Numeric Sorting (C1)
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.categoryNameBn?.toLowerCase().includes(q)
      );
    }

    // Sort numerically (Challenge C1)
    if (sortOption === 'lowToHigh') {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'highToLow') {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [initialProducts, selectedCategory, searchQuery, sortOption]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* SECTION A: আজ দাম বেড়েছে ▲ */}
      {topRisers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-xl font-bold">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  গতকালের তুলনায় যেসব পণ্যের দাম বৃদ্ধি পেয়েছে
                </p>
              </div>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 self-start sm:self-auto">
              শীর্ষ ৬টি মূল্যবৃদ্ধির পণ্য
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRisers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION B: আজ দাম কমেছে ▼ */}
      {topFallers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-rose-600 dark:text-rose-400 text-xl font-bold">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  গতকালের তুলনায় যেসব পণ্যের দাম হ্রাস পেয়েছে
                </p>
              </div>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800 self-start sm:self-auto">
              শীর্ষ ৬টি মূল্যহ্রাসের পণ্য
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION C: সব পণ্য (#সব-পণ্য) */}
      <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>সম্পূর্ণ ক্যাটালগ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              সব পণ্য
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              সকল নিত্যপ্রয়োজনীয় খাদ্য ও ভোগ্যপণ্যের বিস্তারিত তালিকা ও বর্তমান বাজার দর
            </p>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quick Search */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন (যেমন: চাল, আলু)..."
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Sort Dropdown (Challenge C1) */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm shadow-xs">
              <ArrowUpDown className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 font-medium">
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
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>সব পণ্য</span>
            <span className="text-xs opacity-80">({initialProducts.length})</span>
          </button>

          {categories.map((cat) => {
            const count = initialProducts.filter((p) => p.category === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
                {count > 0 && <span className="text-xs opacity-70">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              আপনার অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোনো পণ্য তালিকাভুক্ত নেই।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortOption('default');
              }}
              className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition"
            >
              সব পণ্য পুনরায় দেখুন
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
