import Link from "next/link";
import NavbarAuth from "./NavbarAuth";
import CategoryNav from "./CategoryNav";
import { getCategories, getProducts } from "@/lib/api";
import { bn, unitBn, getTrend } from "@/utils/format";

export default async function Navbar() {
  const categories = await getCategories().catch(() => []);
  const products = await getProducts().catch(() => []);

  const banglaDate = new Date().toLocaleDateString("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tickerItems = [...products, ...products];

  return (
    <header className="bg-surface">
      <div className="border-b border-line">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 shrink-0 rounded-xl bg-green-700 flex items-center justify-center text-xl">🛒</span>
            <span className="min-w-0">
              <span className="block text-xl font-bold text-ink leading-tight">বাজার দর</span>
              <span className="block text-xs text-soft truncate">{banglaDate}</span>
            </span>
          </Link>
          <NavbarAuth />
        </div>
      </div>

      <CategoryNav categories={categories} />

      <div className="border-b border-line overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex text-sm">
          {tickerItems.map((product, index) => {
            const trend = getTrend(product.change?.dir, product.change?.pct);
            const unit = unitBn[product.unit || ""] ?? (product.unit || "একক");

            return (
              <span
                key={`${product.slug}-${index}`}
                aria-hidden={index >= products.length}
                className="flex items-center gap-2 px-6 py-2.5 border-r border-line"
              >
                <span className="text-lg">{product.image || "📦"}</span>
                <span className="font-medium text-ink">{product.nameBn}</span>
                <span className="text-ink">{bn(product.today || 0)} টাকা/{unit}</span>
                <span className={`font-bold ${trend.text}`}>
                  {trend.icon} {bn(Math.abs(product.change?.pct || 0), 1)}%
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
}