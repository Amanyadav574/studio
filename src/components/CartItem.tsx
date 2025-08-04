"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import type { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center gap-4 border-b-2 border-foreground py-4">
      <div className="relative h-24 w-24 flex-shrink-0 border-2 border-foreground">
        <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint} />
      </div>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`} className="font-bold font-headline hover:underline">
          {item.name}
        </Link>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
        <div className="mt-2 flex items-center">
          <Button size="icon" variant="outline" className="h-8 w-8 border-2 border-foreground" onClick={() => handleQuantityChange(item.quantity - 1)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="h-8 w-16 border-y-2 border-x-0 border-foreground text-center"
            aria-label={`Quantity for ${item.name}`}
          />
          <Button size="icon" variant="outline" className="h-8 w-8 border-2 border-foreground" onClick={() => handleQuantityChange(item.quantity + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
        <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Remove {item.name}</span>
        </Button>
      </div>
    </div>
  );
}
