import { Category, Product } from '@/types';

export const fallbackCategories: Category[] = [
  { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

export const fallbackProducts: Product[] = [
  {
    id: 1,
    slug: 'sorno-machi-chal',
    nameBn: 'স্বর্ণমাছি চাল',
    category: 'chal',
    categoryNameBn: 'চাল',
    categoryIcon: '🍚',
    unit: 'kg',
    image: '🍚',
    today: 148,
    yesterday: 145,
    lastWeek: 142,
    lastMonth: 138,
    change: { dir: 'up', pct: 2.1 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 146, max: 165 },
      { market: 'গ্রীন মার্কেট, মিরপুর', division: 'ঢাকা', min: 143, max: 159 },
      { market: 'চৌদগ্রাম বাজার', division: 'চট্টগ্রাম', min: 142, max: 163 },
      { market: 'আমতলী বাজার', division: 'চট্টগ্রাম', min: 138, max: 155 },
      { market: 'সদর বাজার', division: 'রাজশাহী', min: 134, max: 148 },
      { market: 'বাসারহাট বাজার', division: 'রাজশাহী', min: 135, max: 152 },
      { market: 'মাঠ বাজার', division: 'ময়মনসিংহ', min: 132, max: 146 },
      { market: 'চৌর বাজার', division: 'ময়মনসিংহ', min: 135, max: 155 },
      { market: 'বাজারহাট', division: 'খুলনা', min: 134, max: 151 },
      { market: 'ডবলগেট বাজার', division: 'খুলনা', min: 139, max: 154 },
      { market: 'আমবাজার', division: 'সিলেট', min: 143, max: 165 },
      { market: 'চৌরাস্তা বাজার', division: 'সিলেট', min: 141, max: 158 }
    ]
  },
  {
    id: 2,
    slug: 'miniket-chal',
    nameBn: 'মিনিকেট চাল',
    category: 'chal',
    categoryNameBn: 'চাল',
    categoryIcon: '🍚',
    unit: 'kg',
    image: '🍚',
    today: 99,
    yesterday: 102,
    lastWeek: 105,
    lastMonth: 100,
    change: { dir: 'down', pct: -2.9 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 98, max: 110 },
      { market: 'গ্রীন মার্কেট, মিরপুর', division: 'ঢাকা', min: 96, max: 106 },
      { market: 'চৌদগ্রাম বাজার', division: 'চট্টগ্রাম', min: 95, max: 109 },
      { market: 'আমতলী বাজার', division: 'চট্টগ্রাম', min: 92, max: 104 },
      { market: 'সদর বাজার', division: 'রাজশাহী', min: 89, max: 99 },
      { market: 'বাসারহাট বাজার', division: 'রাজশাহী', min: 90, max: 102 },
      { market: 'মাঠ বাজার', division: 'ময়মনসিংহ', min: 88, max: 98 },
      { market: 'চৌর বাজার', division: 'ময়মনসিংহ', min: 90, max: 104 },
      { market: 'বাজারহাট', division: 'খুলনা', min: 89, max: 101 },
      { market: 'ডবলগেট বাজার', division: 'খুলনা', min: 93, max: 103 },
      { market: 'আমবাজার', division: 'সিলেট', min: 96, max: 110 },
      { market: 'চৌরাস্তা বাজার', division: 'সিলেট', min: 94, max: 106 }
    ]
  },
  {
    id: 3,
    slug: 'nazir-chal',
    nameBn: 'নাজির চাল',
    category: 'chal',
    categoryNameBn: 'চাল',
    categoryIcon: '🍚',
    unit: 'kg',
    image: '🍚',
    today: 74,
    yesterday: 74,
    lastWeek: 72,
    lastMonth: 70,
    change: { dir: 'flat', pct: 0 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 73, max: 82 },
      { market: 'গ্রীন মার্কেট, মিরপুর', division: 'ঢাকা', min: 72, max: 79 },
      { market: 'চৌদগ্রাম বাজার', division: 'চট্টগ্রাম', min: 71, max: 82 },
      { market: 'আমতলী বাজার', division: 'চট্টগ্রাম', min: 69, max: 78 },
      { market: 'সদর বাজার', division: 'রাজশাহী', min: 67, max: 74 },
      { market: 'বাসারহাট বাজার', division: 'রাজশাহী', min: 67, max: 76 }
    ]
  },
  {
    id: 4,
    slug: 'batam-size-chal',
    nameBn: 'বাটাম সাইজ চাল',
    category: 'chal',
    categoryNameBn: 'চাল',
    categoryIcon: '🍚',
    unit: 'kg',
    image: '🍚',
    today: 66,
    yesterday: 64,
    lastWeek: 63,
    lastMonth: 61,
    change: { dir: 'up', pct: 3.1 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 65, max: 73 },
      { market: 'গ্রীন মার্কেট, মিরপুর', division: 'ঢাকা', min: 64, max: 71 },
      { market: 'চৌদগ্রাম বাজার', division: 'চট্টগ্রাম', min: 63, max: 73 },
      { market: 'সদর বাজার', division: 'রাজশাহী', min: 60, max: 66 }
    ]
  },
  {
    id: 5,
    slug: 'mushur-dal',
    nameBn: 'দেশি মসুর ডাল',
    category: 'dal',
    categoryNameBn: 'ডাল',
    categoryIcon: '🫘',
    unit: 'kg',
    image: '🫘',
    today: 135,
    yesterday: 130,
    lastWeek: 128,
    lastMonth: 125,
    change: { dir: 'up', pct: 3.8 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 132, max: 145 },
      { market: 'সদর বাজার', division: 'রাজশাহী', min: 128, max: 140 }
    ]
  },
  {
    id: 6,
    slug: 'mung-dal',
    nameBn: 'মুগ ডাল',
    category: 'dal',
    categoryNameBn: 'ডাল',
    categoryIcon: '🫘',
    unit: 'kg',
    image: '🫘',
    today: 155,
    yesterday: 160,
    lastWeek: 162,
    lastMonth: 165,
    change: { dir: 'down', pct: -3.1 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 150, max: 165 },
      { market: 'আমবাজার', division: 'সিলেট', min: 152, max: 170 }
    ]
  },
  {
    id: 7,
    slug: 'shorisha-tel',
    nameBn: 'সরিষার তেল',
    category: 'tel',
    categoryNameBn: 'তেল',
    categoryIcon: '🛢️',
    unit: 'litre',
    image: '🛢️',
    today: 280,
    yesterday: 275,
    lastWeek: 270,
    lastMonth: 260,
    change: { dir: 'up', pct: 1.8 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 275, max: 295 },
      { market: 'বাজারহাট', division: 'খুলনা', min: 270, max: 290 }
    ]
  },
  {
    id: 8,
    slug: 'soybine-tel',
    nameBn: 'সয়াবিন তেল',
    category: 'tel',
    categoryNameBn: 'তেল',
    categoryIcon: '🛢️',
    unit: 'litre',
    image: '🛢️',
    today: 175,
    yesterday: 180,
    lastWeek: 185,
    lastMonth: 182,
    change: { dir: 'down', pct: -2.8 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 172, max: 185 },
      { market: 'ডবলগেট বাজার', division: 'খুলনা', min: 170, max: 182 }
    ]
  },
  {
    id: 9,
    slug: 'alu',
    nameBn: 'গোল আলু',
    category: 'sobji',
    categoryNameBn: 'সবজি',
    categoryIcon: '🥬',
    unit: 'kg',
    image: '🥔',
    today: 55,
    yesterday: 60,
    lastWeek: 65,
    lastMonth: 70,
    change: { dir: 'down', pct: -8.3 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 50, max: 62 },
      { market: 'সদর বাজার', division: 'রাজশাহী', min: 48, max: 58 }
    ]
  },
  {
    id: 10,
    slug: 'peyaj',
    nameBn: 'দেশি পেঁয়াজ',
    category: 'sobji',
    categoryNameBn: 'সবজি',
    categoryIcon: '🥬',
    unit: 'kg',
    image: '🧅',
    today: 110,
    yesterday: 105,
    lastWeek: 100,
    lastMonth: 95,
    change: { dir: 'up', pct: 4.8 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 105, max: 120 },
      { market: 'চৌদগ্রাম বাজার', division: 'চট্টগ্রাম', min: 108, max: 122 }
    ]
  },
  {
    id: 11,
    slug: 'ilish-mach',
    nameBn: 'পদ্মার ইলিশ (১ কেজি)',
    category: 'mach',
    categoryNameBn: 'মাছ',
    categoryIcon: '🐟',
    unit: 'kg',
    image: '🐟',
    today: 1850,
    yesterday: 1900,
    lastWeek: 2000,
    lastMonth: 1800,
    change: { dir: 'down', pct: -2.6 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 1750, max: 2000 },
      { market: 'আমতলী বাজার', division: 'চট্টগ্রাম', min: 1700, max: 1950 }
    ]
  },
  {
    id: 12,
    slug: 'rui-mach',
    nameBn: 'রুই মাছ',
    category: 'mach',
    categoryNameBn: 'মাছ',
    categoryIcon: '🐟',
    unit: 'kg',
    image: '🐟',
    today: 380,
    yesterday: 360,
    lastWeek: 350,
    lastMonth: 340,
    change: { dir: 'up', pct: 5.5 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 360, max: 410 },
      { market: 'সদর বাজার', division: 'রাজশাহী', min: 340, max: 390 }
    ]
  },
  {
    id: 13,
    slug: 'deshi-murgi',
    nameBn: 'দেশি মুরগি',
    category: 'mangsho',
    categoryNameBn: 'মাংস',
    categoryIcon: '🍗',
    unit: 'kg',
    image: '🍗',
    today: 580,
    yesterday: 560,
    lastWeek: 550,
    lastMonth: 530,
    change: { dir: 'up', pct: 3.6 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 550, max: 620 },
      { market: 'আমবাজার', division: 'সিলেট', min: 560, max: 630 }
    ]
  },
  {
    id: 14,
    slug: 'broiler-murgi',
    nameBn: 'ব্রয়লার মুরগি',
    category: 'mangsho',
    categoryNameBn: 'মাংস',
    categoryIcon: '🍗',
    unit: 'kg',
    image: '🍗',
    today: 185,
    yesterday: 195,
    lastWeek: 200,
    lastMonth: 210,
    change: { dir: 'down', pct: -5.1 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 180, max: 195 },
      { market: 'বাজারহাট', division: 'খুলনা', min: 175, max: 190 }
    ]
  },
  {
    id: 15,
    slug: 'gorur-mangsho',
    nameBn: 'গরুর মাংস',
    category: 'mangsho',
    categoryNameBn: 'মাংস',
    categoryIcon: '🍗',
    unit: 'kg',
    image: '🥩',
    today: 750,
    yesterday: 750,
    lastWeek: 750,
    lastMonth: 780,
    change: { dir: 'flat', pct: 0 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 720, max: 780 },
      { market: 'চৌরাস্তা বাজার', division: 'সিলেট', min: 730, max: 790 }
    ]
  },
  {
    id: 16,
    slug: 'dim-farm',
    nameBn: 'ফার্মের লাল ডিম (হালি)',
    category: 'dim-dui',
    categoryNameBn: 'ডিম-দুধ',
    categoryIcon: '🥛',
    unit: 'dozen',
    image: '🥚',
    today: 145,
    yesterday: 155,
    lastWeek: 160,
    lastMonth: 150,
    change: { dir: 'down', pct: -6.5 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 140, max: 155 },
      { market: 'ডবলগেট বাজার', division: 'খুলনা', min: 138, max: 150 }
    ]
  },
  {
    id: 30,
    slug: 'ada',
    nameBn: 'আদা',
    category: 'mosla',
    categoryNameBn: 'মসলা',
    categoryIcon: '🌶️',
    unit: 'kg',
    image: '🫚',
    today: 85,
    yesterday: 78,
    lastWeek: 72,
    lastMonth: 70,
    change: { dir: 'up', pct: 9.0 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 84, max: 95 },
      { market: 'গ্রীন মার্কেট, মিরপুর', division: 'ঢাকা', min: 82, max: 91 }
    ]
  },
  {
    id: 31,
    slug: 'roshun',
    nameBn: 'রসুন',
    category: 'mosla',
    categoryNameBn: 'মসলা',
    categoryIcon: '🌶️',
    unit: 'kg',
    image: '🧄',
    today: 125,
    yesterday: 135,
    lastWeek: 140,
    lastMonth: 150,
    change: { dir: 'down', pct: -7.4 },
    markets: [
      { market: 'কারওয়ান বাজার', division: 'ঢাকা', min: 123, max: 139 },
      { market: 'সদর বাজার', division: 'রাজশাহী', min: 113, max: 125 }
    ]
  }
];
