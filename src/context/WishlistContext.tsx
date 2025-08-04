"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      if (prevItems.find(item => item.id === product.id)) {
        return prevItems;
      }
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    const itemToRemove = wishlistItems.find(item => item.id === productId);
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    if(itemToRemove) {
        toast({
            title: "Removed from wishlist",
            description: `${itemToRemove.name} has been removed from your wishlist.`,
            variant: "destructive"
        });
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
