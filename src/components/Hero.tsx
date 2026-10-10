import Image from "next/image";

export default function Hero() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const banglaDate = today.toLocaleDateString('bn-BD', options);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="bg-green-50/50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-green-100">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {banglaDate}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#all-products" className="btn bg-green-700 text-white hover:bg-green-800 border-none px-8">
            সব পণ্য দেখুন
          </a>
        </div>
        
        <div className="flex-1 flex justify-center md:justify-end">
          <Image 
            src="/bazar-hero.png" 
            alt="Hero Basket" 
            width={400} 
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}