import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-green-700 mb-4">৪০৪</h1>
      <h2 className="text-2xl font-semibold text-ink mb-2">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
      <p className="text-muted mb-6">আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে বা লিংকটি ভুল।</p>
      <Link href="/" className="btn bg-green-700 text-white hover:bg-green-800 border-none shadow-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}