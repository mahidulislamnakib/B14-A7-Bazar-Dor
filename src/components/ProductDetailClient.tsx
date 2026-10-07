'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Product } from '@/types';
import { 
  toBengaliDigits, 
  formatBanglaPrice, 
  getBengaliUnit, 
  formatBanglaChange, 
  formatBanglaNumber 
} from '@/utils/bangla';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Building2, 
  Layers, 
  Calendar, 
  Lock, 
  Sparkles,
  ShoppingBag,
  Filter
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product | null;
  identifier: string;
}

export function ProductDetailClient({ product, identifier }: ProductDetailClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [hasRedirected, setHasRedirected] = useState(false);

  // Authentication Protection Guard
  useEffect(() => {
    if (!loading && !user && !hasRedirected) {
      setHasRedirected(true);
      toast.error('পণ্যটির বিস্তারিত তথ্য দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।');
      router.push(`/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname, hasRedirected]);

  // Calculations for Price Summary
  const { minPrice, maxPrice, avgPrice, divisions } = useMemo(() => {
    if (!product || !product.markets || product.markets.length === 0) {
      return {
        minPrice: product?.today || 0,
        maxPrice: product?.today || 0,
        avgPrice: product?.today || 0,
        divisions: [] as string[],
      };
    }

    let min = Infinity;
    let max = -Infinity;
    let totalSum = 0;
    let count = 0;
    const divSet = new Set<string>();

    product.markets.forEach((m) => {
      if (m.min < min) min = m.min;
      if (m.max > max) max = m.max;
      totalSum += (m.min + m.max) / 2;
      count++;
      if (m.division) divSet.add(m.division);
    });

    return {
      minPrice: min === Infinity ? product.today : min,
      maxPrice: max === -Infinity ? product.today : max,
      avgPrice: count > 0 ? Math.round(totalSum / count) : product.today,
      divisions: Array.from(divSet),
    };
  }, [product]);

  // Filtered Markets
  const filteredMarkets = useMemo(() => {
    if (!product || !product.markets) return [];
    if (selectedDivision === 'all') return product.markets;
    return product.markets.filter((m) => m.division === selectedDivision);
  }, [product, selectedDivision]);

  // While checking auth
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">নিরাপত্তা ও অথেনটিকেশন যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  // If not logged in, show protected screen while redirect takes place
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto text-2xl">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            সংরক্ষিত পাতা
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            বাজার ভিত্তিক বিস্তারিত তথ্য ও দামের বিশ্লেষণ দেখতে অনুগ্রহ করে লগইন করুন।
          </p>
          <div className="pt-2">
            <Link
              href={`/signin?redirect=${encodeURIComponent(pathname)}`}
              className="inline-flex items-center gap-2 w-full justify-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 sm:p-14 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="text-6xl">🔍</div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            পণ্যটি পাওয়া যায়নি
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            দুঃখিত, ‘{identifier}’ সম্পর্কিত কোনো পণ্য তথ্য আমাদের সিস্টেমে নেই।
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

  const changeInfo = formatBanglaChange(product.change);
  const formattedUnit = getBengaliUnit(product.unit);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমে ফিরে যান</span>
        </Link>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
          <Link href={`/category/${product.category}`} className="hover:text-emerald-600">
            {product.categoryNameBn || product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-semibold">{product.nameBn}</span>
        </div>
      </div>

      {/* TOP SUMMARY CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-slate-800 dark:to-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-5xl sm:text-6xl shadow-sm shrink-0">
              {product.image}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition"
                >
                  <span>{product.categoryIcon}</span>
                  <span>{product.categoryNameBn || product.category}</span>
                </Link>
                <span className="text-xs text-slate-500 font-medium">
                  {formattedUnit}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {product.nameBn}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                বাজার সামারি: সারা দেশে আজকের গড় পাইকারি ও খুচরা মূল্য পরিস্থিতি
              </p>
            </div>
          </div>

          {/* Today's Price Main Callout */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 text-left md:text-right w-full md:w-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
              আজকের মূল দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 my-0.5">
              {formatBanglaPrice(product.today)}
            </div>
            <div className="flex items-center md:justify-end gap-2 mt-1">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${changeInfo.bgClass}`}>
                {changeInfo.text}
              </span>
              <span className="text-[11px] text-slate-400">গতকালের সাপেক্ষে</span>
            </div>
          </div>
        </div>

        {/* PRICE SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          {/* Min Price */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl p-5">
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
              সর্বনিম্ন বাজার দর (Min)
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
              {formatBanglaPrice(minPrice)}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-500 mt-1">
              সর্বনিম্ন খুচরা বিক্রয় মূল্য
            </div>
          </div>

          {/* Average Price */}
          <div className="bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-800/60 rounded-2xl p-5">
            <div className="text-xs font-semibold text-teal-800 dark:text-teal-300 mb-1">
              গড় বাজার দর (Average)
            </div>
            <div className="text-2xl sm:text-3xl font-black text-teal-700 dark:text-teal-400">
              {formatBanglaPrice(avgPrice)}
            </div>
            <div className="text-[11px] text-teal-600 dark:text-teal-500 mt-1">
              সারা দেশের গড় দর
            </div>
          </div>

          {/* Max Price */}
          <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-5">
            <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">
              সর্বোচ্চ বাজার দর (Max)
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-400">
              {formatBanglaPrice(maxPrice)}
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-500 mt-1">
              সর্বোচ্চ খুচরা বিক্রয় মূল্য
            </div>
          </div>
        </div>

        {/* Historical Price Trends */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>পূর্ববর্তী বাজার ইতিহাসের সারসংক্ষেপ</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500">গতকাল</div>
              <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                {formatBanglaPrice(product.yesterday || product.today)}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500">গত সপ্তাহ</div>
              <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                {formatBanglaPrice(product.lastWeek || product.today)}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500">গত মাস</div>
              <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                {formatBanglaPrice(product.lastMonth || product.today)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Market-wise Table/Cards) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-emerald-600" />
              <span>বাজারভিত্তিক আজকের দাম</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              বিভিন্ন বিভাগ ও আঞ্চলিক প্রধান বাজারে {product.nameBn}-এর আজকের খুচরা মূল্য তালিকা
            </p>
          </div>

          {/* Division Filter Pills / Dropdown */}
          {divisions.length > 0 && (
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">বিভাগ:</span>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="all" className="dark:bg-slate-900">সব বিভাগ ({product.markets.length})</option>
                {divisions.map((div) => (
                  <option key={div} value={div} className="dark:bg-slate-900">
                    {div}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Markets Table */}
        {filteredMarkets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-bold">
                  <th className="py-3.5 px-4 rounded-l-xl">বাজারের নাম</th>
                  <th className="py-3.5 px-4">বিভাগ</th>
                  <th className="py-3.5 px-4 text-center">সর্বনিম্ন (Min)</th>
                  <th className="py-3.5 px-4 text-center">সর্বোচ্চ (Max)</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">গড় দাম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredMarkets.map((m, idx) => {
                  const mAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr
                      key={`${m.market}-${idx}`}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{m.market}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
                          {m.division}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-emerald-600 dark:text-emerald-400 font-semibold">
                        {toBengaliDigits(m.min)} ৳
                      </td>
                      <td className="py-3.5 px-4 text-center text-amber-600 dark:text-amber-400 font-semibold">
                        {toBengaliDigits(m.max)} ৳
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                        {toBengaliDigits(mAvg)} ৳
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-500 text-sm">
            নির্বাচিত বিভাগে কোনো বাজার তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
