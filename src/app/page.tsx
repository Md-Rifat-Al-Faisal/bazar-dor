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
    <div className="min-h-[70vh] pb-20">
      <Hero />

      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-12">

        {risers.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-ink flex items-center gap-2 mb-5">
              <span className="text-rise text-base">▲</span> আজ দাম বেড়েছে
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {risers.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {fallers.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-ink flex items-center gap-2 mb-5">
              <span className="text-fall text-base">▼</span> আজ দাম কমেছে
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fallers.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        <section id="সব-পণ্য" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-ink">সব পণ্য</h2>
            <p className="text-soft text-sm mt-1">নিত্যপ্রয়োজনীয় সকল পণ্যের আজকের বাজার দর</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}