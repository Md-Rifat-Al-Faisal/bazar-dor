"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/api";

export default function CategoryClient({ 
  categoryName, 
  initialProducts 
}: { 
  categoryName: string; 
  initialProducts: Product[]; 
}) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sort === "price_asc") return (a.today || 0) - (b.today || 0);
    if (sort === "price_desc") return (b.today || 0) - (a.today || 0);
    return 0;
  });

  return (
    <div className="min-h-[70vh] bg-gray-50/50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-gray-500 mt-1">{initialProducts.length} টি পণ্য পাওয়া গেছে</p>
          </div>
          <select 
            className="select select-bordered bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 w-full md:w-auto font-medium"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ডিফল্ট সর্টিং</option>
            <option value="price_asc">দাম: কম থেকে বেশি</option>
            <option value="price_desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>

        {initialProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
            <p className="text-gray-500">এই ক্যাটাগরিতে আপাতত কোনো পণ্য নেই।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}