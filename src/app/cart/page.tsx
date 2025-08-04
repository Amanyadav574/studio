"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductSuggestions } from '@/components/ProductSuggestions';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, getCartTotal, getCartItemCount } = useCart();
  const cartTotal = getCartTotal();
  const itemCount = getCartItemCount();

  if (itemCount === 0) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-black font-headline uppercase">Your Cart is Empty</h1>
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <p className="mt-4 text-lg">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-black font-headline uppercase">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="border-2 border-foreground bg-card sticky top-20">
            <CardHeader>
              <CardTitle className="font-headline uppercase">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="font-bold">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t-2 border-foreground pt-4 mt-4">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button asChild size="lg" className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 text-lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <ProductSuggestions />
    </div>
  );
}
