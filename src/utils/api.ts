import { Category, Product } from '@/types';
import { fallbackCategories, fallbackProducts } from '@/data/mockData';

const BASE_URL_1 = 'https://api.api-store.workers.dev/api/bazardor';
const BASE_URL_2 = 'https://api.abcz.workers.dev/api/bazardor';

async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  // Try BASE_URL_1
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return data as T;
    }
  } catch (err) {
    console.warn(`BASE_URL_1 failed for ${endpoint}, trying BASE_URL_2...`);
  }

  // Try BASE_URL_2
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${BASE_URL_2}${endpoint}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return data as T;
    }
  } catch (err) {
    console.warn(`BASE_URL_2 failed for ${endpoint}, falling back to local dataset...`);
  }

  return fallbackData;
}

export async function getCategories(): Promise<Category[]> {
  return fetchWithFallback<Category[]>('/categories', fallbackCategories);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  const matched = categories.find((c) => c.slug === slug || c.id === slug);
  if (matched) return matched;
  return null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : '/products';
  
  let fallback = fallbackProducts;
  if (category) {
    fallback = fallbackProducts.filter((p) => p.category === category);
  }

  const data = await fetchWithFallback<Product[]>(endpoint, fallback);
  return data;
}

export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  const isNumeric = !isNaN(Number(idOrSlug));
  
  if (isNumeric) {
    const numId = Number(idOrSlug);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${BASE_URL_1}/products/${numId}`, {
        signal: controller.signal,
        next: { revalidate: 60 },
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data && !data.error) return data as Product;
      }
    } catch {
      // Fallback below
    }
  }

  // Lookup in all products list by id or slug
  const all = await getProducts();
  const found = all.find(
    (p) => String(p.id) === String(idOrSlug) || p.slug === String(idOrSlug)
  );

  return found || null;
}
