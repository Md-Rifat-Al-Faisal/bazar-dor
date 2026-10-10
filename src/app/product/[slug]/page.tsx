import Link from "next/link";
import { toBengaliNumber } from "@/utils/banglaConverter";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetails {
  nameBn?: string;
  slug?: string;
  today?: number;
  unit?: string;
  image?: string;
  categoryNameBn?: string;
  change?: {
    dir?: string;
    pct?: number;
  };
  markets?: Market[];
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();
  const rawProducts: ProductDetails[] = Array.isArray(data) ? data : data?.data || [];
  
  const product = rawProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">পণ্য পাওয়া যায়নি!</h2>
        <Link href="/" className="btn bg-green-700 text-white hover:bg-green-800 border-none">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const isUp = product.change?.dir === "up" || (product.change?.pct && product.change.pct > 0);
  const isDown = product.change?.dir === "down" || (product.change?.pct && product.change.pct < 0);
  const badgeColor = isUp ? "text-red-600 bg-red-50" : isDown ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50";
  const icon = isUp ? "▲" : isDown ? "▼" : "—";
  
  // ক্যালকুলেশন: সর্বনিম্ন, সর্বোচ্চ এবং গড় দাম
  const allMinPrices = product.markets?.map(m => m.min) || [product.today || 0];
  const allMaxPrices = product.markets?.map(m => m.max) || [product.today || 0];
  
  const lowestPrice = Math.min(...allMinPrices);
  const highestPrice = Math.max(...allMaxPrices);
  const averagePrice = product.today || 0;

  return (
    <main className="min-h-screen pb-20 bg-gray-50/50 pt-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-green-700">হোম</Link>
          <span className="mx-2">›</span>
          <span>{product.categoryNameBn || "ক্যাটাগরি"}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{product.nameBn}</span>
        </div>

        {/* Top Summary Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl">
              {product.image || "📦"}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.nameBn}</h1>
              <p className="text-gray-500 mt-1">প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit === 'litre' ? 'লিটার' : product.unit === 'piece' ? 'পিস' : product.unit === 'dozen' ? 'ডজন' : product.unit} • {product.categoryNameBn}</p>
              <p className="text-sm text-gray-600 mt-2">গতকালের তুলনায় আজ দাম <span className="font-bold">{isUp ? 'বেড়েছে' : isDown ? 'কমেছে' : 'অপরিবর্তিত আছে'}</span></p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl text-center min-w-50">
            <p className="text-sm text-gray-500 mb-1">আজকের গড় দাম</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">{toBengaliNumber(averagePrice)}</p>
            <p className="text-sm text-gray-500 mb-3">টাকা / {product.unit === 'kg' ? 'কেজি' : product.unit === 'litre' ? 'লিটার' : product.unit === 'piece' ? 'পিস' : product.unit === 'dozen' ? 'ডজন' : product.unit}</p>
            <div className={`inline-flex px-2 py-1 rounded-md text-sm font-bold items-center gap-1 ${badgeColor}`}>
              <span>{icon}</span> {toBengaliNumber(Math.abs(product.change?.pct || 0).toFixed(1))}%
            </div>
          </div>
        </div>

        {/* Price Summary Cards */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-green-600 mb-1">{toBengaliNumber(lowestPrice)} টাকা</p>
              <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">সর্বাধিক দাম</p>
              <p className="text-2xl font-bold text-red-600 mb-1">{toBengaliNumber(highestPrice)} টাকা</p>
              <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">গড় দাম</p>
              <p className="text-2xl font-bold text-green-700 mb-1">{toBengaliNumber(averagePrice)} টাকা</p>
              <p className="text-xs text-gray-400">প্রতি {product.unit === 'kg' ? 'কেজি' : 'একক'}-এর হিসাবে</p>
            </div>
          </div>
        </div>

        {/* Market Wise Prices Table */}
        {product.markets && product.markets.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-gray-50 text-gray-600 text-sm">
                    <tr>
                      <th className="font-medium py-4 px-6">বাজার</th>
                      <th className="font-medium py-4 px-6">বিভাগ</th>
                      <th className="font-medium py-4 px-6 text-right">সর্বনিম্ন</th>
                      <th className="font-medium py-4 px-6 text-right">সর্বাধিক</th>
                      <th className="font-medium py-4 px-6 text-right">গড়</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.markets.map((market, index) => {
                      const marketAvg = Math.round((market.min + market.max) / 2);
                      return (
                        <tr key={index} className="hover border-b border-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-900">{market.market}</td>
                          <td className="py-4 px-6 text-gray-500">{market.division}</td>
                          <td className="py-4 px-6 text-right text-gray-900">{toBengaliNumber(market.min)} টাকা</td>
                          <td className="py-4 px-6 text-right text-gray-900">{toBengaliNumber(market.max)} টাকা</td>
                          <td className="py-4 px-6 text-right font-bold text-gray-900">{toBengaliNumber(marketAvg)} টাকা</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}