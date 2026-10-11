"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/api";
import { bn } from "@/utils/format";

export default function CategoryClient({
  categoryName,
  categoryIcon,
  initialProducts,
}: {
  categoryName: string;
  categoryIcon?: string;
  initialProducts: Product[];
}) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sort === "price_asc") return (a.today || 0) - (b.today || 0);
    if (sort === "price_desc") return (b.today || 0) - (a.today || 0);
    return 0;
  });

  return (
    <div className="min-h-[70vh] pt-6 pb-20">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        <div className="bg-surface border border-line rounded-3xl p-5 flex items-center gap-4">
          <span className="text-5xl">{categoryIcon}</span>
          <div>
            <h1 className="text-3xl font-bold text-ink">{categoryName}</h1>
            <p className="text-muted mt-1">
              {bn(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {initialProducts.length === 0 ? (
          <div className="bg-surface border border-line rounded-3xl p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-ink mb-2">
              কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-muted mb-6">এই ক্যাটাগরিতে আপাতত কোনো পণ্য নেই।</p>
            <Link
              href="/"
              className="btn bg-green-700 text-white hover:bg-green-800 border-none shadow-md"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-surface border border-line rounded-2xl p-4 flex justify-end">
              <label className="flex items-center gap-3">
                <span className="text-sm text-muted whitespace-nowrap">সাজান</span>
                <select
                  className="select bg-surface border-line focus:outline-none focus:ring-2 focus:ring-green-600 font-medium"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="price_asc">দাম: কম থেকে বেশি</option>
                  <option value="price_desc">দাম: বেশি থেকে কম</option>
                </select>
              </label>
            </div>

            <p className="text-sm text-soft pt-2">
              মোট {bn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}