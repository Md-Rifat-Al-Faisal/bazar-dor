import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getProductDetails, getCategories } from "@/lib/api";
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

  const categories = await getCategories().catch(() => []);
  const categoryName = product.categoryNameBn ?? categories.find((c) => c.slug === product.category)?.nameBn;

  const trend = getTrend(product.change?.dir, product.change?.pct);
  const unit = unitBn[product.unit || ""] ?? (product.unit || "একক");

  const today = product.today || 0;
  const markets = product.markets || [];

  const lowestPrice = markets.length ? Math.min(...markets.map((m) => m.min)) : today;
  const highestPrice = markets.length ? Math.max(...markets.map((m) => m.max)) : today;
  const averagePrice = today;

  const changePct = Math.abs(product.change?.pct || 0);
  const isUp = trend.icon === "▲";
  const isDown = trend.icon === "▼";
  const priceDiff = Math.round(Math.abs(today - (product.yesterday ?? today)));
  const trendWord = isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত আছে";

  return (
    <div className="min-h-[70vh] pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <section className="bg-surface border border-line rounded-3xl p-5 flex flex-col md:flex-row md:items-center gap-5">
          <div className="w-20 h-20 shrink-0 bg-canvas rounded-2xl flex items-center justify-center text-4xl self-start md:self-auto">
            {product.image || "📦"}
          </div>

          <div className="grow min-w-0">
            <h1 className="text-3xl font-bold text-ink">{product.nameBn}</h1>
            <p className="text-muted mt-1">
              প্রতি {unit}
              {categoryName && (
                <>
                  {" · "}
                  <Link href={`/category/${product.category}`} className="hover:text-green-700 hover:underline">
                    {categoryName}
                  </Link>
                </>
              )}
            </p>
            <p className="text-ink mt-3">
              গতকালের তুলনায় আজ দাম <strong>{trendWord}</strong>
              {priceDiff > 0 && <> · {bn(priceDiff)} টাকা</>}
            </p>
          </div>

          <div className="bg-canvas rounded-2xl px-6 py-4 text-center">
            <p className="text-sm text-muted">আজকের দাম</p>
            <p className="text-4xl font-bold text-ink">{bn(today)}</p>
            <p className="text-sm text-muted">টাকা / {unit}</p>
            <p className={`mt-1 text-sm font-bold ${trend.text}`}>
              {trend.icon} {bn(changePct, 1)}%
            </p>
          </div>
        </section>

        <section className="bg-surface border border-line rounded-3xl p-5 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-ink mb-4">দামের সারসংক্ষেপ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border border-line rounded-2xl p-4">
                <p className="text-sm text-muted mb-1">সর্বনিম্ন দাম</p>
                <p className="text-3xl font-bold text-green-600 mb-1">
                  {bn(lowestPrice)} <span className="text-base font-medium">টাকা</span>
                </p>
                <p className="text-xs text-soft">সবচেয়ে কম দামের বাজার</p>
              </div>
              <div className="border border-line rounded-2xl p-4">
                <p className="text-sm text-muted mb-1">সর্বাধিক দাম</p>
                <p className="text-3xl font-bold text-red-600 mb-1">
                  {bn(highestPrice)} <span className="text-base font-medium">টাকা</span>
                </p>
                <p className="text-xs text-soft">সবচেয়ে বেশি দামের বাজার</p>
              </div>
              <div className="border border-line rounded-2xl p-4">
                <p className="text-sm text-muted mb-1">গড় দাম</p>
                <p className="text-3xl font-bold text-green-700 mb-1">
                  {bn(averagePrice)} <span className="text-base font-medium">টাকা</span>
                </p>
                <p className="text-xs text-soft">প্রতি {unit}-এর হিসাবে</p>
              </div>
            </div>
          </div>

          {markets.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-ink mb-4">বাজারভিত্তিক আজকের দাম</h2>
              <div className="border border-line rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="text-soft text-sm">
                      <tr>
                        <th className="font-medium">বাজার</th>
                        <th className="font-medium">বিভাগ</th>
                        <th className="font-medium text-right">সর্বনিম্ন</th>
                        <th className="font-medium text-right">সর্বাধিক</th>
                        <th className="font-medium text-right">গড়</th>
                      </tr>
                    </thead>
                    <tbody className="[&>tr:nth-child(even)]:bg-canvas">
                      {markets.map((market, index) => {
                        const marketAvg = (market.min + market.max) / 2;
                        return (
                          <tr key={index} className="border-b border-ink">
                            <td className="font-medium text-ink">{market.market}</td>
                            <td className="text-muted">{market.division}</td>
                            <td className="text-right text-ink">{bn(market.min)} টাকা</td>
                            <td className="text-right text-ink">{bn(market.max)} টাকা</td>
                            <td className="text-right font-bold text-ink">
                              {bn(marketAvg, Number.isInteger(marketAvg) ? 0 : 2)} টাকা
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}