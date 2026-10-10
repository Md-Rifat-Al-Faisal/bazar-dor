import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-green-50/50 border-b border-green-100">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-6">
            প্রতিদিনের বাজার আপডেট
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            সঠিক দাম জানুন, <br className="hidden md:block" />
            <span className="text-green-700">স্মার্ট শপিং করুন</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
            বাজার দর-এ আপনি পাচ্ছেন নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ এবং সঠিক দামের তালিকা। বাজারে যাওয়ার আগে আপনার বাজেট মিলিয়ে নিন।
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            {/* অ্যাঙ্কর লিংকটি ঠিক করা হয়েছে */}
            <Link href="#সব-পণ্য" className="btn bg-green-700 text-white hover:bg-green-800 border-none px-8">
              আজকের দাম দেখুন
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          {/* ইমেজের সাইজ ঠিক করা হয়েছে যাতে ব্লার না হয় */}
          <Image 
            alt="বাজার দর হিরো" 
            className="w-auto h-auto max-w-full drop-shadow-xl" 
            height={263} 
            src="/bazar-hero.png" 
            width={315} 
            priority
          />
        </div>
      </div>
    </div>
  );
}