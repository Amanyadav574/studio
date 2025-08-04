"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is required"),
  zip: z.string().regex(/^\d{5}$/, "Invalid ZIP code"),
  card: z.string().regex(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/, "Invalid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
});

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const total = getCartTotal();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", address: "", city: "", zip: "", card: "4242424242424242", expiry: "12/28", cvc: "123" },
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, router]);

  function onSubmit(values: z.infer<typeof checkoutSchema>) {
    console.log(values);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push("/");
  }

  if (cartItems.length === 0) {
    return null; 
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-black font-headline uppercase">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-2 border-foreground bg-card">
            <CardHeader><CardTitle className="font-headline uppercase">Shipping & Payment</CardTitle></CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} className="border-2 border-foreground" /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} className="border-2 border-foreground" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} className="border-2 border-foreground" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} className="border-2 border-foreground" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="zip" render={({ field }) => (
                      <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} className="border-2 border-foreground" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="card" render={({ field }) => (
                    <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input {...field} className="border-2 border-foreground" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="expiry" render={({ field }) => (
                      <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input {...field} className="border-2 border-foreground" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="cvc" render={({ field }) => (
                      <FormItem><FormLabel>CVC</FormLabel><FormControl><Input {...field} className="border-2 border-foreground" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90 text-lg">
                    Place Order - ${total.toFixed(2)}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="border-2 border-foreground bg-card sticky top-20">
            <CardHeader><CardTitle className="font-headline uppercase">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-xl font-bold border-t-2 border-foreground pt-4 mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
