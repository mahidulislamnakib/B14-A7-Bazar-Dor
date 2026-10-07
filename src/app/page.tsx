import { getProducts, getCategories } from '@/utils/api';
import { PriceTicker } from '@/components/PriceTicker';
import { Hero } from '@/components/Hero';
import { HomeClient } from '@/components/HomeClient';

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="space-y-0">
      {/* Price Marquee Ticker */}
      <PriceTicker products={products} />

      {/* Hero Banner */}
      <Hero />

      {/* Main Product Sections */}
      <div className="pt-6">
        <HomeClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}
