import CategoryClient from "./CategoryClient";
import { getProducts, getCategories } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [categories, allProducts] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => [])
  ]);

  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = allProducts.filter((p) => p.category === slug);

  return (
    <CategoryClient 
      categoryName={category.nameBn} 
      initialProducts={categoryProducts} 
    />
  );
}