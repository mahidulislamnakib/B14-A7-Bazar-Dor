'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getBanglaDate } from '@/utils/bangla';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Edit3, 
  LogOut, 
  ArrowLeft, 
  ShieldCheck,
  CheckCircle2 
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 px-4 text-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="text-5xl">🔒</div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            লগইন প্রয়োজন
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            আপনার প্রোফাইল দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।
          </p>
          <div className="pt-2">
            <Link
              href="/signin?redirect=/profile"
              className="inline-flex items-center justify-center w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Top navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Banner Cover */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 relative">
          <div className="absolute right-6 bottom-4 text-white/10 text-8xl select-none pointer-events-none">
            👤
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-10 pb-10 relative">
          {/* Avatar and Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="relative">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-lg object-cover"
                />
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-emerald-600 text-white font-black text-4xl flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="absolute bottom-1 right-1 p-1.5 bg-emerald-500 text-white rounded-full shadow-md">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Challenge C3: Update Information Button -> Navigates to /profile/update */}
            <div className="flex items-center gap-3">
              <Link
                href="/profile/update"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition"
              >
                <Edit3 className="w-4 h-4" />
                <span>তথ্য পরিবর্তন করুন</span>
              </Link>

              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 font-bold rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">সাইন আউট</span>
              </button>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>{user.name}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 font-semibold">
                  ভেরিফাইড ইউজার
                </span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                বাজার দর রেজিস্টার্ড মেম্বার
              </p>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    ইমেইল ঠিকানা
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                    {user.email}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    যুক্ত হওয়ার সময়
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                    {user.createdAt ? getBanglaDate(new Date(user.createdAt)) : 'সম্প্রতি'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
