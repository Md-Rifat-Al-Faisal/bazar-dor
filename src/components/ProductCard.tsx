import Link from "next/link";
import { toBengaliNumber } from "@/utils/banglaConverter";

interface ProductCardProps {
  product: {
    name: string;
    slug?: string;
    price: number;
    unit: string;
    emoji: string;
    trend: string;
    change: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.trend === "up" || product.change > 0;
  const isDown = product.trend === "down" || product.change < 0;
  
  const badgeColor = isUp ? "text-red-600 bg-red-50" : isDown ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50";
  const icon = isUp ? "▲" : isDown ? "▼" : "—";
  const changeText = toBengaliNumber(Math.abs(product.change || 0).toFixed(1));
  const productSlug = product.slug || product.name;

  return (
    <Link href={`/product/${productSlug}`} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-3xl">
          {product.emoji || "📦"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-gray-500 text-sm">প্রতি {product.unit}</p>
        </div>
      </div>
      <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
        <div>
          <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
          <p className="font-bold text-2xl text-gray-900">
            {toBengaliNumber(product.price)} <span className="text-base font-normal">টাকা</span>
          </p>
        </div>
        <div className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${badgeColor}`}>
          <span>{icon}</span> {changeText}%
        </div>
      </div>
    </Link>
  );
}