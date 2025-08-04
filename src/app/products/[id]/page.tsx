"use client";

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Star, MessageSquare, Utensils } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-card p-4 sm:p-8 border-2 border-foreground">
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
            <Button asChild variant="link" className="p-0 mb-4">
              <Link href="/">
                &larr; Back to all products
              </Link>
            </Button>
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
          </div>
        </div>
        <div className="mt-12">
          <Tabs defaultValue="reviews">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews"><MessageSquare className="mr-2" />Reviews ({product.reviews?.length || 0})</TabsTrigger>
              <TabsTrigger value="nutrition"><Utensils className="mr-2" />Nutrition Facts</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews">
              <Card className="border-0">
                <CardContent className="pt-6">
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {product.reviews.map((review, index) => (
                        <div key={index}>
                          <div className="flex items-center gap-4">
                             <div className="font-bold">{review.author}</div>
                             <div className="flex">{renderStars(review.rating)}</div>
                             <div className="text-sm text-muted-foreground">{format(new Date(review.date), 'PPP')}</div>
                          </div>
                          <p className="mt-2 text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No reviews for this product yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="nutrition">
              <Card className="border-0">
                 <CardContent className="pt-6">
                  {product.nutrition && product.nutrition.length > 0 ? (
                     <div className="space-y-2">
                      {product.nutrition.map((fact, index) => (
                          <div key={index} className="flex justify-between border-b py-2">
                              <span className="font-semibold">{fact.name}</span>
                              <span>{fact.value}</span>
                          </div>
                      ))}
                     </div>
                  ) : (
                    <p>No nutrition information available for this product.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
