import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import NavbarAuth from "./NavbarAuth";
import CategoryNav from "./CategoryNav";
import { getCategories, getProducts } from "@/lib/api";
import { bn, unitBn, getTrend } from "@/utils/format";

export default async function Navbar() {
  const categories = await getCategories().catch(() => []);
  const products = await getProducts().catch(() => []);

  const today = new Date();
  const banglaDate = today.toLocaleDateString('bn-BD', {
    timeZone: "Asia/Dhaka",
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-base-100 shadow-sm border-b">
      <div className="navbar max-w-6xl mx-auto px-4">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-green-700 text-white rounded-lg">
              <FiShoppingCart size={24} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">বাজার দর</div>
              <p className="text-xs text-gray-500">{banglaDate}</p>
            </div>
          </Link>
        </div>

        <div className="navbar-end gap-2">
          <NavbarAuth />
        </div>
      </div>

      <CategoryNav categories={categories} />

      <div className="bg-gray-50 border-t py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 text-sm pr-8">
          {products.map((product, index) => {
            const trend = getTrend(product.change?.dir, product.change?.pct);
            const unit = unitBn[product.unit || ""] ?? (product.unit || "একক");
            
            return (
              <span key={product.slug || index} className="flex items-center gap-1">
                {product.image || "📦"} {product.nameBn} {bn(product.today || 0)} টাকা/{unit}
                <span className={`ml-1 font-medium ${trend.color.split(" ")[0]}`}>
                  {trend.icon} {bn(Math.abs(product.change?.pct || 0), 1)}%
                </span>
              </span>
            );
          })}
          {products.map((product, index) => {
            const trend = getTrend(product.change?.dir, product.change?.pct);
            const unit = unitBn[product.unit || ""] ?? (product.unit || "একক");
            
            return (
              <span key={`dup-${product.slug || index}`} aria-hidden="true" className="flex items-center gap-1">
                {product.image || "📦"} {product.nameBn} {bn(product.today || 0)} টাকা/{unit}
                <span className={`ml-1 font-medium ${trend.color.split(" ")[0]}`}>
                  {trend.icon} {bn(Math.abs(product.change?.pct || 0), 1)}%
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}