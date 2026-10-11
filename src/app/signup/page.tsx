"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
      setLoading(false);
    } else {
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/signin");
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "সোশ্যাল সাইন আপে সমস্যা হয়েছে।");
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-ink">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="mt-2 text-sm text-muted">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <div className="max-w-md w-full bg-surface rounded-3xl border border-line p-8">
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface placeholder-gray-400 focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface placeholder-gray-400 focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface placeholder-gray-400 focus:ring-2 focus:ring-green-600 outline-none"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              className="w-full px-4 py-2 border border-line rounded-lg bg-surface placeholder-gray-400 focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn bg-green-700 text-white hover:bg-green-800 border-none shadow-md rounded-lg text-base disabled:bg-soft">
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-line"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-ink">অথবা</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button onClick={() => handleSocialLogin("google")} type="button" className="flex items-center justify-center gap-1.5 w-full px-2 py-2 border border-line rounded-lg bg-surface text-[13px] font-semibold whitespace-nowrap hover:bg-canvas">
              <FcGoogle className="text-lg shrink-0" /> Google দিয়ে চালিয়ে যান
            </button>
            <button onClick={() => handleSocialLogin("github")} type="button" className="flex items-center justify-center gap-1.5 w-full px-2 py-2 border border-line rounded-lg bg-surface text-[13px] font-semibold whitespace-nowrap hover:bg-canvas">
              <FaGithub className="text-ink text-lg shrink-0" /> GitHub দিয়ে চালিয়ে যান
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-ink">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="font-medium text-green-700 hover:text-green-600">সাইন ইন করুন</Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-sm text-muted hover:text-ink">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}