import { products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-8 text-5xl font-black font-headline uppercase tracking-wider text-center md:text-left">
        All Products
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
