import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import NavbarAuth from "./NavbarAuth";

interface RawCategory {
  slug?: string;
  nameBn?: string;
}

interface Category {
  name: string;
  slug: string;
}

interface RawProduct {
  nameBn?: string;
  unit?: string;
  image?: string;
  today?: number;
  change?: {
    dir?: string;
    pct?: number;
  };
}

interface Product {
  name: string;
  price: number;
  unit: string;
  emoji: string;
  trend: string;
  change: number;
}

export default async function Navbar() {
  const categoriesRes = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
  const categoriesData = await categoriesRes.json();
  const rawCategories: RawCategory[] = Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [];

  const categories: Category[] = rawCategories.map((c: RawCategory) => ({
    name: c.nameBn || "Unknown",
    slug: c.slug || "unknown"
  }));

  const productsRes = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const productsData = await productsRes.json();
  const rawProducts: RawProduct[] = Array.isArray(productsData) ? productsData : productsData?.data || [];

  const products: Product[] = rawProducts.map((p: RawProduct) => ({
    name: p.nameBn || "Unknown",
    price: p.today || 0,
    unit: p.unit || "kg",
    emoji: p.image || "📦",
    trend: p.change?.dir || "flat",
    change: p.change?.pct || 0
  }));

  const today = new Date();
  const banglaDate = today.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-base-100 shadow-sm border-b">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-green-700 text-white rounded-lg">
              <FiShoppingCart size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">বাজার দর</h1>
              <p className="text-xs text-gray-500">{banglaDate}</p>
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium">
            {categories.map((category: Category, index: number) => (
              <li key={index}>
                <Link href={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <NavbarAuth />
        </div>
      </div>

      <div className="bg-gray-50 border-t py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 text-sm pr-8">
          {products.map((product: Product, index: number) => {
            const isUp = product.trend === "up" || product.change > 0;
            const isDown = product.trend === "down" || product.change < 0;
            const changeColor = isUp ? "text-red-500" : isDown ? "text-green-500" : "text-gray-500";
            const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";
            
            return (
              <span key={index} className="flex items-center gap-1">
                {product.emoji} {product.name} {product.price} টাকা/{product.unit === 'kg' ? 'কেজি' : product.unit === 'litre' ? 'লিটার' : product.unit === 'piece' ? 'পিস' : product.unit === 'dozen' ? 'ডজন' : product.unit}
                <span className={`ml-1 ${changeColor}`}>
                  {changeIcon} {Math.abs(product.change)}%
                </span>
              </span>
            );
          })}
          {products.map((product: Product, index: number) => {
            const isUp = product.trend === "up" || product.change > 0;
            const isDown = product.trend === "down" || product.change < 0;
            const changeColor = isUp ? "text-red-500" : isDown ? "text-green-500" : "text-gray-500";
            const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";
            
            return (
              <span key={`dup-${index}`} className="flex items-center gap-1">
                {product.emoji} {product.name} {product.price} টাকা/{product.unit === 'kg' ? 'কেজি' : product.unit === 'litre' ? 'লিটার' : product.unit === 'piece' ? 'পিস' : product.unit === 'dozen' ? 'ডজন' : product.unit}
                <span className={`ml-1 ${changeColor}`}>
                  {changeIcon} {Math.abs(product.change)}%
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}