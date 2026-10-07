import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-pulse">
      <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded"></div>

      {/* Top summary skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="w-24 h-24 rounded-3xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex-1 space-y-3">
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="h-8 w-60 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-80 bg-slate-100 dark:bg-slate-800/60 rounded"></div>
          </div>
          <div className="h-20 w-44 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        </div>

        {/* 3 Price cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        </div>
      </div>

      {/* Market table skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
