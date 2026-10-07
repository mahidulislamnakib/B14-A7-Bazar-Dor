'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { toBengaliDigits, getBengaliUnit, formatBanglaChange } from '@/utils/bangla';

interface PriceTickerProps {
  products: Product[];
}

export function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate items to ensure smooth continuous infinite loop
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-slate-900 border-y border-slate-800 text-slate-200 text-xs sm:text-sm py-2 overflow-hidden select-none relative z-20">
      <div className="flex items-center">
        <div className="shrink-0 bg-emerald-600 text-white font-semibold px-3 py-1 text-xs rounded-r-md flex items-center gap-1 shadow-sm mr-2 z-10">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
          লাইভ দর
        </div>
        
        <div className="relative w-full overflow-hidden whitespace-nowrap group">
          <div className="inline-flex gap-8 animate-marquee group-hover:[animation-play-state:paused]">
            {tickerItems.map((item, index) => {
              const changeInfo = formatBanglaChange(item.change);
              return (
                <Link
                  key={`${item.id}-${index}`}
                  href={`/product/${item.id}`}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="text-base">{item.image}</span>
                  <span className="font-medium text-slate-100">{item.nameBn}:</span>
                  <span className="font-bold text-amber-300">
                    {toBengaliDigits(item.today)} ৳
                  </span>
                  <span className="text-slate-400 text-xs">/ {getBengaliUnit(item.unit).replace('প্রতি ', '')}</span>
                  <span
                    className={`font-semibold px-1.5 py-0.5 rounded text-[11px] flex items-center ${
                      item.change?.dir === 'up'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                        : item.change?.dir === 'down'
                        ? 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {changeInfo.text}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
