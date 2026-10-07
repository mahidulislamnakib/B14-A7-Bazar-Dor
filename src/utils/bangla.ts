import { PriceChange } from '@/types';

const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliDigits(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '০';
  const str = num.toString();
  return str.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function formatBanglaPrice(amount: number | string | undefined): string {
  if (amount === undefined || amount === null) return '০ টাকা';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${toBengaliDigits(num)} টাকা`;
}

export function formatBanglaNumber(val: number | string, decimals = 1): string {
  if (typeof val === 'number') {
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(decimals);
    return toBengaliDigits(formatted);
  }
  return toBengaliDigits(val);
}

export function getBengaliUnit(unit: string | undefined): string {
  if (!unit) return 'প্রতি একক';
  const map: Record<string, string> = {
    kg: 'প্রতি কেজি',
    'কেজি': 'প্রতি কেজি',
    litre: 'প্রতি লিটার',
    liter: 'প্রতি লিটার',
    'লিটার': 'প্রতি লিটার',
    dozen: 'প্রতি ডজন',
    'ডজন': 'প্রতি ডজন',
    piece: 'প্রতি পিস',
    'পিস': 'প্রতি পিস',
    gram: 'প্রতি ১০০ গ্রাম',
    'গ্রাম': 'প্রতি গ্রাম',
  };
  return map[unit.toLowerCase()] || `প্রতি ${unit}`;
}

export function formatBanglaChange(change?: PriceChange): {
  text: string;
  colorClass: string;
  bgClass: string;
  icon: string;
} {
  if (!change) {
    return {
      text: '— ০.০%',
      colorClass: 'text-slate-500',
      bgClass: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
      icon: '—',
    };
  }

  const absPct = Math.abs(change.pct);
  const formattedPct = toBengaliDigits(absPct.toFixed(1));

  if (change.dir === 'up') {
    return {
      text: `▲ ${formattedPct}%`,
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
      icon: '▲',
    };
  } else if (change.dir === 'down') {
    return {
      text: `▼ ${formattedPct}%`,
      colorClass: 'text-rose-600 dark:text-rose-400',
      bgClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800',
      icon: '▼',
    };
  }

  return {
    text: `— ০.০%`,
    colorClass: 'text-slate-500 dark:text-slate-400',
    bgClass: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    icon: '—',
  };
}

export function getBanglaDate(customDate?: Date): string {
  const d = customDate || new Date();
  
  const daysBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const monthsBn = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const dayName = daysBn[d.getDay()];
  const day = toBengaliDigits(d.getDate());
  const monthName = monthsBn[d.getMonth()];
  const year = toBengaliDigits(d.getFullYear());

  return `${dayName}, ${day} ${monthName} ${year}`;
}
