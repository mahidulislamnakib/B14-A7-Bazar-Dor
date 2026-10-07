'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signUp: (name: string, email: string, pass: string) => Promise<boolean>;
  signInWithSocial: (provider: 'google' | 'github') => Promise<boolean>;
  updateUser: (data: { name?: string; image?: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'bazardor_auth_user';
const USERS_DB_KEY = 'bazardor_registered_users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user session on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, pass: string): Promise<boolean> => {
    if (!email || !pass) {
      toast.error('অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড সঠিকভাবে দিন।');
      return false;
    }

    // Check stored registered users
    let registered: any[] = [];
    try {
      const usersStr = localStorage.getItem(USERS_DB_KEY);
      if (usersStr) registered = JSON.parse(usersStr);
    } catch {}

    const found = registered.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      if (found.password === pass) {
        const loggedUser: User = {
          id: found.id,
          name: found.name,
          email: found.email,
          image: found.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(found.name)}`,
          createdAt: found.createdAt,
        };
        setUser(loggedUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
        toast.success(`স্বাগতম, ${loggedUser.name}! লগইন সফল হয়েছে।`);
        return true;
      } else {
        toast.error('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।');
        return false;
      }
    }

    // Default mock user if not in registered db (for easy testing)
    const fallbackUser: User = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0] || 'ব্যবহারকারী',
      email: email,
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    };
    setUser(fallbackUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackUser));
    toast.success(`স্বাগতম, ${fallbackUser.name}! লগইন সফল হয়েছে।`);
    return true;
  };

  const signUp = async (name: string, email: string, pass: string): Promise<boolean> => {
    if (!name.trim()) {
      toast.error('অনুগ্রহ করে আপনার নাম লিখুন।');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।');
      return false;
    }
    if (!pass || pass.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return false;
    }

    // Check existing
    let registered: any[] = [];
    try {
      const usersStr = localStorage.getItem(USERS_DB_KEY);
      if (usersStr) registered = JSON.parse(usersStr);
    } catch {}

    const exists = registered.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      toast.error('এই ইমেইল দিয়ে ইতিমধ্যে একাউন্ট খোলা আছে!');
      return false;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      password: pass,
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`,
      createdAt: new Date().toISOString(),
    };

    registered.push(newUser);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(registered));

    toast.success('রেজিস্ট্রেশন সফল হয়েছে! এখন লগইন করুন।');
    return true;
  };

  const signInWithSocial = async (provider: 'google' | 'github'): Promise<boolean> => {
    const providerName = provider === 'google' ? 'Google' : 'GitHub';
    const socialUser: User = {
      id: `${provider}_` + Date.now(),
      name: provider === 'google' ? 'Google User' : 'GitHub User',
      email: `${provider.toLowerCase()}.user@example.com`,
      image: `https://api.dicebear.com/7.x/bottts/svg?seed=${providerName}`,
      createdAt: new Date().toISOString(),
    };

    setUser(socialUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(socialUser));
    toast.success(`${providerName}-এর মাধ্যমে সফলভাবে সাইন ইন হয়েছে!`);
    return true;
  };

  const updateUser = async (data: { name?: string; image?: string }): Promise<boolean> => {
    if (!user) {
      toast.error('প্রোফাইল আপডেট করতে লগইন থাকা প্রয়োজন।');
      return false;
    }

    if (data.name !== undefined && !data.name.trim()) {
      toast.error('নাম খালি রাখা যাবে না।');
      return false;
    }

    const updated: User = {
      ...user,
      name: data.name !== undefined ? data.name.trim() : user.name,
      image: data.image !== undefined ? data.image : user.image,
    };

    setUser(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Update in registered DB if present
    try {
      const usersStr = localStorage.getItem(USERS_DB_KEY);
      if (usersStr) {
        const list = JSON.parse(usersStr);
        const idx = list.findIndex((u: any) => u.id === user.id || u.email === user.email);
        if (idx !== -1) {
          list[idx].name = updated.name;
          if (updated.image) list[idx].image = updated.image;
          localStorage.setItem(USERS_DB_KEY, JSON.stringify(list));
        }
      }
    } catch {}

    toast.success('আপনার প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!');
    return true;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('সফলভাবে সাইন আউট করা হয়েছে।');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signInWithSocial,
        updateUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
