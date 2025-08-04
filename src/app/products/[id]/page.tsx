"use client";

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="bg-card p-8 border-2 border-foreground">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square w-full border-2 border-foreground">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <div>
          <h1 className="text-4xl font-black font-headline uppercase tracking-wide">{product.name}</h1>
          <p className="my-4 text-4xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-lg leading-relaxed">{product.description}</p>
          
          <div className="mt-8 flex items-stretch gap-4">
            <div className="flex items-center">
                <Button size="icon" variant="outline" className="h-12 w-12 border-2 border-foreground" onClick={() => handleQuantityChange(-1)}>
                    <Minus />
                </Button>
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="h-12 w-20 border-y-2 border-x-0 border-foreground text-center text-lg font-bold"
                    aria-label={`Quantity for ${product.name}`}
                />
                <Button size="icon" variant="outline" className="h-12 w-12 border-2 border-foreground" onClick={() => handleQuantityChange(1)}>
                    <Plus />
                </Button>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="flex-1 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              <ShoppingCart className="mr-2" /> Add to Cart
            </Button>
          </div>

          <Button asChild variant="link" className="mt-8">
            <Link href="/">
              &larr; Back to all products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
