import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts().catch(() => []);

  const risers = [...products]
    .filter(p => p.change?.dir === "up" || (p.change?.pct || 0) > 0)
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);
    
  const fallers = [...products]
    .filter(p => p.change?.dir === "down" || (p.change?.pct || 0) < 0)
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="min-h-[70vh] pb-20 bg-gray-50/50">
      <Hero />
      
      <div className="max-w-6xl mx-auto px-4 mt-16 space-y-16">
        
        {risers.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <span className="text-green-500 text-xl">▲</span> আজ দাম বেড়েছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {risers.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {fallers.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <span className="text-red-500 text-xl">▼</span> আজ দাম কমেছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fallers.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        <section id="সব-পণ্য" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-gray-500 text-sm mt-1">নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজার দর</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}