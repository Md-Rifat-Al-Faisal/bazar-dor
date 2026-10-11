import Link from "next/link";
import { Product } from "@/lib/api";
import { bn, unitBn, getTrend } from "@/utils/format";

export default function ProductCard({ product }: { product: Product }) {
  const trend = getTrend(product.change?.dir, product.change?.pct);
  const unit = unitBn[product.unit || ""] ?? (product.unit || "একক");

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-surface border border-line rounded-2xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 shrink-0 bg-canvas rounded-xl flex items-center justify-center text-2xl">
          {product.image || "📦"}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-ink text-lg leading-tight">{product.nameBn}</h3>
          <p className="text-sm text-muted">প্রতি {unit}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-soft">আজকের দাম</p>
          <p className="text-xl font-bold text-ink">
            {bn(product.today || 0)} <span className="text-base font-medium text-muted">টাকা</span>
          </p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${trend.color}`}>
          {trend.icon} {bn(Math.abs(product.change?.pct || 0), 1)}%
        </span>
      </div>
    </Link>
  );
}