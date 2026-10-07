'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Category } from '@/types';
import { getBanglaDate } from '@/utils/bangla';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  UserPlus, 
  ShoppingBasket,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  categories?: Category[];
}

export function Navbar({ categories = [] }: NavbarProps) {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentBanglaDate, setCurrentBanglaDate] = useState('');

  useEffect(() => {
    setCurrentBanglaDate(getBanglaDate());
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Brand, Search/Date, Auth Buttons */}
        <div className="flex items-center justify-between h-16 sm:h-20 border-b border-slate-100 dark:border-slate-800/60">
          {/* Logo & Bangla Date */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <span className="text-2xl">🛒</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  বাজার দর
                  <span className="text-xs px-2 py-0.5 font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 rounded-full">
                    লাইভ
                  </span>
                </span>
                <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
                  {currentBanglaDate || 'প্রতিদিনের তাজা বাজার দর'}
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side: Auth / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-9 w-28 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-semibold max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400">লগইন একাউন্ট</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition"
                    >
                      <UserIcon className="w-4 h-4 text-emerald-600" />
                      <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>সাইন ইন</span>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-sm hover:shadow flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>সাইন আপ</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Second Row: Category Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto scrollbar-none">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
              pathname === '/'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShoppingBasket className="w-4 h-4" />
            <span>সব বিভাগ</span>
          </Link>

          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4">
          {/* User Section Mobile */}
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full bg-emerald-100"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {user.name}
                    </div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg"
                  >
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="flex-1 text-center py-2 text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 rounded-lg"
                  >
                    সাইন আউট
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Categories Grid Mobile */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              বিভাগসমূহ
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                  pathname === '/'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                <ShoppingBasket className="w-4 h-4" />
                <span>সব পণ্য</span>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                    pathname === `/category/${cat.slug}`
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
