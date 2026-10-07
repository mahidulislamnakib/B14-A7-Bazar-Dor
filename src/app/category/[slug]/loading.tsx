import React from 'react';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Skeleton Header */}
      <div className="h-40 rounded-3xl bg-slate-200 dark:bg-slate-800"></div>

      {/* Skeleton Controls */}
      <div className="flex justify-between items-center py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-9 w-44 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
