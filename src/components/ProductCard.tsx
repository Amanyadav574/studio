"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="flex h-full flex-col overflow-hidden border-2 border-foreground bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="relative p-0">
          <div className="absolute top-2 right-2 z-10">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-card/50 hover:bg-card"
              onClick={handleWishlistToggle}
            >
              <Heart className={cn("h-6 w-6", isInWishlist ? "fill-red-500 text-red-500" : "text-foreground")} />
            </Button>
          </div>
          <div className="relative aspect-square w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product.dataAiHint}
            />
          </div>
        </CardHeader>
        <div className="flex flex-1 flex-col p-4">
            <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
            <p className="mt-2 text-2xl font-bold">${product.price.toFixed(2)}</p>
        </div>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
