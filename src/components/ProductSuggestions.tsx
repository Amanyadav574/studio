"use client";

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { suggestRelatedProducts } from '@/ai/flows/suggest-related-products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb } from 'lucide-react';

export function ProductSuggestions() {
  const { cartItems } = useCart();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setLoading(true);
      const itemNames = cartItems.map(item => item.name);
      suggestRelatedProducts({ cartItems: itemNames })
        .then(result => {
          setSuggestions(result.suggestions);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setSuggestions([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.map(item => item.id).join(',')]); // Depend on item IDs to refetch when cart changes

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 border-2 border-foreground bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline uppercase">
          <Lightbulb />
          You Might Also Like
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg">Getting smart suggestions...</span>
          </div>
        ) : suggestions.length > 0 ? (
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className='font-mono'>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No suggestions available right now.</p>
        )}
      </CardContent>
    </Card>
  );
}
