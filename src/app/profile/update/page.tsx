"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="min-h-[70vh] bg-gray-50/50 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </main>
    );
  }

  return <UpdateForm session={session} />;
}

function UpdateForm({
  session,
}: {
  session: { user?: { name: string } | null } | null;
}) {
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name: name,
    });

    if (error) {
      toast.error(error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
      setLoading(false);
    } else {
      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <main className="min-h-[70vh] bg-gray-50/50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
          <p className="text-gray-500 text-sm mt-1">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নতুন নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম লিখুন"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/profile" className="btn btn-outline flex-1">
              বাতিল
            </Link>
            <button
              type="submit"
              disabled={loading || !name}
              className="btn bg-green-700 text-white hover:bg-green-800 border-none flex-1 disabled:bg-gray-400"
            >
              {loading ? "আপডেট হচ্ছে..." : "সেভ করুন"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
