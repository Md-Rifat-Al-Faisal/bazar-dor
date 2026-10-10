import Link from "next/link";
import { Product } from "@/lib/api";
import { bn, unitBn, getTrend } from "@/utils/format";

export default function ProductCard({ product }: { product: Product }) {
  const trend = getTrend(product.change?.dir, product.change?.pct);
  const unit = unitBn[product.unit || ""] ?? (product.unit || "একক");

  return (
    <Link href={`/product/${product.slug}`} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl bg-gray-50 p-3 rounded-xl group-hover:scale-105 transition-transform">
          {product.image || "📦"}
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${trend.color}`}>
          {trend.icon} {bn(Math.abs(product.change?.pct || 0), 1)}%
        </div>
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-1">{product.nameBn}</h3>
      <div className="flex items-end gap-1">
        <span className="text-xl font-bold text-green-700">৳{bn(product.today || 0)}</span>
        <span className="text-sm text-gray-500 mb-0.5">/ {unit}</span>
      </div>
    </Link>
  );
}