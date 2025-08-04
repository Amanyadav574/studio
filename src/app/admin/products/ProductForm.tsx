
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { generateAndSaveImage } from "@/ai/flows/generate-and-save-image";
import { useState, useRef } from "react";
import { Loader2, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import { updateProduct, addProduct } from "@/lib/product-service";

const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.coerce.number().min(0.01, "Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().min(1, "Image is required."),
});

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      description: product?.description || "",
      image: product?.image || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    setIsSaving(true);
    try {
      if (product) {
        await updateProduct({ ...product, ...values });
        toast({
          title: "Product Updated!",
          description: `The product "${values.name}" has been saved.`,
        });
      } else {
        await addProduct(values);
        toast({
          title: "Product Created!",
          description: `The product "${values.name}" has been created.`,
        });
      }
      router.push("/admin/products");
      router.refresh(); // Force a refresh to reflect changes
    } catch (error) {
      console.error("Failed to save product:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving the product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateImage = async () => {
    const { name, description } = form.getValues();
    const prompt = name || description;
    if (!prompt) {
      toast({
        title: "Cannot generate image",
        description: "Please enter a name or description for the product first.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateAndSaveImage({ prompt });
      form.setValue("image", result.imageUrl, { shouldValidate: true });
      toast({
        title: "Image Generated!",
        description: "A new image has been created and added to the form.",
      });
    } catch (error) {
      console.error("Image generation failed:", error);
      toast({
        title: "Image Generation Failed",
        description: "There was an error generating the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        form.setValue("image", result, { shouldValidate: true });
        toast({
          title: "Image Uploaded!",
          description: "The image has been added to the form.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const imageUrl = form.watch("image");

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input {...field} placeholder="Enter image URL or upload/generate one" />
                    </FormControl>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*"
                    />
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <Upload />
                      Upload
                    </Button>
                    <Button type="button" variant="outline" onClick={handleGenerateImage} disabled={isGenerating}>
                      {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
                      Generate
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imageUrl && (
              <div className="relative aspect-square w-48 rounded border p-2">
                <Image src={imageUrl} alt="Product preview" fill className="object-contain" />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving || isGenerating}>
                {isSaving ? <Loader2 className="animate-spin" /> : (product ? "Save Changes" : "Create Product")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
