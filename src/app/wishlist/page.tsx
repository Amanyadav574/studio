"use client";

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-black font-headline uppercase">Your Wishlist is Empty</h1>
        <Heart className="mx-auto h-24 w-24 text-muted-foreground" />
        <p className="mt-4 text-lg">Looks like you haven't liked any items yet.</p>
        <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-black font-headline uppercase">Your Wishlist</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlistItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
