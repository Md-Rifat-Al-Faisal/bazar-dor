import Link from "next/link";
import CategoryClient from "./CategoryClient";

interface RawCategory {
  nameBn?: string;
  slug?: string;
  icon?: string;
}

interface RawProduct {
  nameBn?: string;
  slug?: string;
  today?: number;
  unit?: string;
  image?: string;
  categoryIcon?: string;
  category?: string;
  change?: {
    dir?: string;
    pct?: number;
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const catRes = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
  const catData = await catRes.json();
  const categories: RawCategory[] = Array.isArray(catData) ? catData : catData?.data || [];
  const currentCategory = categories.find((c: RawCategory) => c.slug === slug);

  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`);
  const data = await res.json();
  const rawProducts: RawProduct[] = Array.isArray(data) ? data : data?.data || [];

  if (!currentCategory || rawProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">দুঃখিত, কোনো পণ্য পাওয়া যায়নি!</h2>
        <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই অথবা লিংকটি সঠিক নয়।</p>
        <Link href="/" className="btn bg-green-700 text-white hover:bg-green-800 border-none">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const products = rawProducts.map((p: RawProduct) => ({
    name: p.nameBn || "Unknown",
    slug: p.slug || "unknown",
    price: p.today || 0,
    unit: p.unit || "kg",
    emoji: p.image || p.categoryIcon || "📦",
    trend: p.change?.dir || "flat",
    change: p.change?.pct || 0,
    category: p.category || "Uncategorized"
  }));

  return (
    <main className="min-h-screen pb-20 bg-gray-50/50 pt-8">
      <CategoryClient 
        categoryName={currentCategory.nameBn || "Unknown"} 
        categoryIcon={currentCategory.icon || "📦"} 
        initialProducts={products} 
      />
    </main>
  );
}