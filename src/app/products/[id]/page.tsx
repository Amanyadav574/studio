
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/product-service';
import { ProductClient } from './ProductClient';
import type { Product } from '@/lib/types';

// Force dynamic rendering to ensure latest data is fetched
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }
  
  return <ProductClient product={product} />
}
