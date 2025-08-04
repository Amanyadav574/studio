
"use client";

import { notFound } from "next/navigation";
import { getProductById } from "@/lib/product-service";
import { ProductForm } from "../../ProductForm";
import type { Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(parseInt(params.id));
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        notFound();
      }
    };
    fetchProduct();
  }, [params.id]);


  if (!product) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
