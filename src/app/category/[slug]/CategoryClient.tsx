"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { toBengaliNumber } from "@/utils/banglaConverter";

interface Product {
  name: string;
  slug: string;
  price: number;
  unit: string;
  emoji: string;
  trend: string;
  change: number;
  category: string;
}

interface CategoryClientProps {
  categoryName: string;
  categoryIcon: string;
  initialProducts: Product[];
}

export default function CategoryClient({ categoryName, categoryIcon, initialProducts }: CategoryClientProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0; 
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="text-4xl bg-gray-50 p-3 rounded-full">{categoryIcon}</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-gray-500 text-sm mt-1">{toBengaliNumber(initialProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500 text-sm">মোট {toBengaliNumber(initialProducts.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">সাজান:</span>
          <select 
            className="select select-bordered select-sm bg-white font-medium outline-none focus:outline-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
}