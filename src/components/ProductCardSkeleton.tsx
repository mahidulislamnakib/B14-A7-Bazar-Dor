'use client';

import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-pulse flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>

      <div className="flex items-center gap-4 my-2">
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-3.5 w-1/2 bg-slate-100 dark:bg-slate-800/60 rounded"></div>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between">
        <div className="space-y-1">
          <div className="h-3 w-14 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
      </div>
    </div>
  );
}
