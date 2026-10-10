import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

interface Category {
  name: string;
  slug: string;
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
  const categoriesRes = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const categoriesData = await categoriesRes.json();
  const categories: Category[] = Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [];

  const productsRes = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const productsData = await productsRes.json();
  const products: Product[] = Array.isArray(productsData) ? productsData : productsData?.data || [];

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const banglaDate = today.toLocaleDateString('bn-BD', options);

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
            {categories.map((category, index) => (
              <li key={index}>
                <Link href={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <Link href="/signin" className="btn btn-ghost font-bold">সাইন ইন</Link>
          <Link href="/signup" className="btn bg-green-700 text-white hover:bg-green-800 border-none">সাইন আপ</Link>
        </div>
      </div>

      <div className="bg-gray-50 border-t py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 text-sm">
          {products.map((product, index) => {
            const isUp = product.trend === "up" || product.change > 0;
            const isDown = product.trend === "down" || product.change < 0;
            const changeColor = isUp ? "text-red-500" : isDown ? "text-green-500" : "text-gray-500";
            const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";
            
            return (
              <span key={index} className="flex items-center gap-1">
                {product.emoji || "📦"} {product.name} {product.price} টাকা/{product.unit}
                <span className={`ml-1 ${changeColor}`}>
                  {changeIcon} {Math.abs(product.change || 0)}%
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}