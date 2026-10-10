"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।");
      setLoading(false);
    } else {
      toast.success("সফলভাবে লগইন হয়েছে!");
      router.push("/");
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">সাইন ইন</h2>
        <p className="mt-2 text-sm text-gray-600">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required 
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn bg-green-700 text-white hover:bg-green-800 border-none rounded-lg text-base disabled:bg-gray-400">
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">অথবা</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={() => handleSocialLogin("google")} type="button" className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium hover:bg-gray-50">
              <FaGoogle className="text-red-500 text-lg" /> Google
            </button>
            <button onClick={() => handleSocialLogin("github")} type="button" className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium hover:bg-gray-50">
              <FaGithub className="text-gray-900 text-lg" /> GitHub
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="font-medium text-green-700 hover:text-green-600">সাইন আপ করুন</Link>
        </p>
      </div>
    </main>
  );
}