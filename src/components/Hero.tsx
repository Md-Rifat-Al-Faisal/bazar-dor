import Image from "next/image";

export default function Hero() {
  const banglaDate = new Date().toLocaleDateString("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <div className="bg-surface border border-line rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1 space-y-4">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            {banglaDate}
          </span>
          <h1 className="text-3xl font-bold text-ink">আজকের বাজারের দাম এক নজরে</h1>
          <p className="text-muted max-w-2xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn bg-green-700 text-white hover:bg-green-800 border-none shadow-md px-6">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center md:justify-end md:self-center">
          <Image
            src="/bazar-hero.png"
            alt="ফলের ঝুড়ি"
            width={315}
            height={263}
            className="w-56 h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}