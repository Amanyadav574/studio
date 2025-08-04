
"use client";

import { notFound, useParams } from "next/navigation";
import { getProductById } from "@/lib/product-service";
import { ProductForm } from "../../ProductForm";
import type { Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(parseInt(id));
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        notFound();
      }
    };
    fetchProduct();
  }, [id]);


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
