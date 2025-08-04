
'use server';

import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

// In a real app, this would be a database. For this demo, we're using an in-memory array.
let products: Product[] = [...initialProducts];

export async function getProducts(): Promise<Product[]> {
  // Return a copy to prevent direct mutation
  return JSON.parse(JSON.stringify(products));
}

export async function getProductById(id: number): Promise<Product | undefined> {
  return products.find(p => p.id === id);
}

export async function updateProduct(updatedProduct: Product): Promise<Product> {
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        return products[index];
    }
    throw new Error("Product not found");
}

export async function addProduct(newProductData: Omit<Product, 'id'>): Promise<Product> {
    const newProduct: Product = {
        ...newProductData,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    };
    products.push(newProduct);
    return newProduct;
}
