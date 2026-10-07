import { getCategoryBySlug, getProducts } from '@/utils/api';
import { CategoryClient } from '@/components/CategoryClient';

export const revalidate = 60;

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProducts(slug),
  ]);

  return <CategoryClient category={category} products={products} slug={slug} />;
}
