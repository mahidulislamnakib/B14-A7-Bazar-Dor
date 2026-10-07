import { getProductByIdOrSlug } from '@/utils/api';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export const revalidate = 60;

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;
  const product = await getProductByIdOrSlug(id);

  return <ProductDetailClient product={product} identifier={id} />;
}
