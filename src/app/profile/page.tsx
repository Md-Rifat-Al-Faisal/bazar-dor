import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="min-h-[70vh] bg-gray-50/50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-4 mb-8 border-b pb-6">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-2xl font-bold">
            {session.user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">মাই প্রোফাইল</h1>
            <p className="text-gray-500 text-sm">আপনার অ্যাকাউন্টের বিস্তারিত তথ্য</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">নাম</p>
            <p className="font-medium text-gray-900">{session.user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">ইমেইল ঠিকানা</p>
            <p className="font-medium text-gray-900">{session.user.email}</p>
          </div>
        </div>

        <Link href="/profile/update" className="btn bg-green-700 text-white hover:bg-green-800 border-none w-full">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </main>
  );
}