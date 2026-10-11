"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-ink mb-3">কিছু একটা সমস্যা হয়েছে</h1>
      <p className="text-muted mb-6">তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</p>
      <button onClick={reset} className="btn bg-green-700 text-white hover:bg-green-800 border-none shadow-md">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}