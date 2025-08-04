"use client";

import Link from 'next/link';
import { ShoppingCart, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from './ui/skeleton';

export function Header() {
  const { getCartItemCount } = useCart();
  const { currentUser, logout, loading } = useAuth();
  const itemCount = getCartItemCount();

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b-2 border-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold font-headline uppercase tracking-widest">
          Raw Commerce
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild className="rounded-none">
            <Link href="/cart" className="relative">
              <ShoppingCart />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : currentUser ? (
            <>
              {currentUser.role === 'admin' && (
                 <Button variant="ghost" asChild className="rounded-none">
                    <Link href="/admin">
                      <Shield />
                      <span className="sr-only">Admin Dashboard</span>
                    </Link>
                  </Button>
              )}
              <span className="font-semibold">{currentUser.name}</span>
              <Button variant="ghost" size="icon" onClick={logout} className="rounded-none">
                <LogOut />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          ) : (
            <Button variant="ghost" asChild className="rounded-none">
              <Link href="/login">
                <User />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
