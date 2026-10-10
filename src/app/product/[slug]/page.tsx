import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getProductDetails } from "@/lib/api";
import { bn, unitBn, getTrend } from "@/utils/format";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session) {
    redirect(`/signin?reason=protected&redirect=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductDetails(slug);
  
  if (!product || !product.nameBn) {
    notFound();
  }

  const trend = getTrend(product.change?.dir, product.change?.pct);
  const unit = unitBn[product.unit || ""] ?? (product.unit || "একক");
  
  const allMinPrices = product.markets?.map((m) => m.min) || [product.today || 0];
  const allMaxPrices = product.markets?.map((m) => m.max) || [product.today || 0];
  
  const lowestPrice = Math.min(...allMinPrices);
  const highestPrice = Math.max(...allMaxPrices);
  const averagePrice = product.today || 0;

  return (
    <div className="min-h-[70vh] pb-20 bg-gray-50/50 pt-8">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-green-700">হোম</Link>
          <span className="mx-2">›</span>
          <span>{product.categoryNameBn || "ক্যাটাগরি"}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{product.nameBn}</span>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="text-6xl p-4 bg-green-50 rounded-2xl">
              {product.image || "📦"}
            </div>
            <div className="grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.nameBn}</h1>
                {product.categoryNameBn && (
                  <Link href={`/category/${product.category}`} className="badge bg-green-100 text-green-700 border-none">
                    {product.categoryNameBn}
                  </Link>
                )}
              </div>
              <p className="text-gray-500 mb-4">১২টি বাজারের তথ্যের ভিত্তিতে আজকের গড় দাম</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">৳ {bn(averagePrice)}</span>
                <span className="text-gray-500">/ {unit}</span>
                <span className={`ml-3 px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1 ${trend.color}`}>
                  {trend.icon} {bn(Math.abs(product.change?.pct || 0), 1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-bold text-green-600 mb-1">{bn(lowestPrice)} টাকা</p>
              <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">সর্বাধিক দাম</p>
              <p className="text-2xl font-bold text-red-600 mb-1">{bn(highestPrice)} টাকা</p>
              <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">গড় দাম</p>
              <p className="text-2xl font-bold text-green-700 mb-1">{bn(averagePrice)} টাকা</p>
              <p className="text-xs text-gray-400">প্রতি {unit}-এর হিসাবে</p>
            </div>
          </div>
        </div>

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
                          <td className="py-4 px-6 text-right text-gray-900">{bn(market.min)} টাকা</td>
                          <td className="py-4 px-6 text-right text-gray-900">{bn(market.max)} টাকা</td>
                          <td className="py-4 px-6 text-right font-bold text-gray-900">{bn(marketAvg)} টাকা</td>
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
    </div>
  );
}