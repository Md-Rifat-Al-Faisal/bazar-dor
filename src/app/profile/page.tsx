"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const signingOut = useRef(false);

  useEffect(() => {
    if (!isPending && !session && !signingOut.current) {
      router.replace("/signin?reason=protected&redirect=%2Fprofile");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    signingOut.current = true;
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending || !session) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
      </div>
    );
  }

  const name = session.user.name || "";
  const email = session.user.email;
  const image = session.user.image;

  return (
    <div className="min-h-[70vh] pt-6 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">আমার প্রোফাইল</h1>
          <p className="text-muted mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        <div className="bg-surface border border-line rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={80}
              height={80}
              unoptimized
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-2xl object-cover border border-line"
            />
          ) : (
            <span className="w-20 h-20 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-3xl font-bold">
              {name.charAt(0).toUpperCase() || "U"}
            </span>
          )}
          <div className="grow min-w-0">
            <p className="text-2xl font-semibold text-ink truncate">{name}</p>
            <p className="text-muted truncate">{email}</p>
          </div>
          <button
  type="button"
  onClick={handleSignOut}
  className="flex items-center gap-2 px-5 py-2 bg-transparent border border-red-700 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors"
>
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"></path>
  </svg>
  সাইন আউট
</button>
        </div>

        <div className="bg-surface border border-line rounded-3xl p-5">
          <h2 className="text-xl font-bold text-ink mb-4">তথ্য</h2>
          <label className="block text-sm font-medium text-ink mb-1">নাম</label>
          <input
            readOnly
            value={name}
            className="w-full px-4 py-2 border border-line rounded-lg bg-surface text-ink outline-none mb-4"
          />
          <Link
            href="/profile/update"
            className="btn w-full bg-green-700 text-white hover:bg-green-800 border-none shadow-md"
          >
            আপডেট
          </Link>
        </div>
      </div>
    </div>
  );
}