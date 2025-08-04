"use client";

import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductForm } from "../../ProductForm";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
