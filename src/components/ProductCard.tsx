'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatBanglaPrice, getBengaliUnit, formatBanglaChange } from '@/utils/bangla';
import { ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const changeInfo = formatBanglaChange(product.change);
  const formattedPrice = formatBanglaPrice(product.today);
  const formattedUnit = getBengaliUnit(product.unit);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top row: Category tag & Change badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <span>{product.categoryIcon}</span>
          <span>{product.categoryNameBn || product.category}</span>
        </span>

        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border shadow-2xs ${changeInfo.bgClass}`}
        >
          {changeInfo.text}
        </span>
      </div>

      {/* Main product presentation */}
      <div className="flex items-center gap-4 my-2">
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {formattedUnit}
          </p>
        </div>
      </div>

      {/* Price row */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {formattedPrice}
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
