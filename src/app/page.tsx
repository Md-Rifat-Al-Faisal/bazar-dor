import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

interface RawProduct {
  nameBn?: string;
  slug?: string;
  today?: number;
  unit?: string;
  image?: string;
  category?: string;
  change?: {
    dir?: string;
    pct?: number;
  };
}

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

export default async function Home() {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();
  const rawProducts: RawProduct[] = Array.isArray(data) ? data : data?.data || [];

  const products: Product[] = rawProducts.map((p: RawProduct) => ({
    name: p.nameBn || "Unknown",
    slug: p.slug || "unknown",
    price: p.today || 0,
    unit: p.unit || "kg",
    emoji: p.image || "📦",
    trend: p.change?.dir || "flat",
    change: p.change?.pct || 0,
    category: p.category || "Uncategorized"
  }));

  const risers = [...products]
    .filter(p => p.trend === "up" || p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
    
  const fallers = [...products]
    .filter(p => p.trend === "down" || p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <main className="min-h-screen pb-20 bg-gray-50/50">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">
        
        {risers.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <span className="text-red-500 text-xl">▲</span> আজ দাম বেড়েছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {risers.map((product: Product, i: number) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </section>
        )}

        {fallers.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <span className="text-green-500 text-xl">▼</span> আজ দাম কমেছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fallers.map((product: Product, i: number) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
          </section>
        )}

        <section id="all-products" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-gray-500 text-sm mt-1">নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজার দর</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product, i: number) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}