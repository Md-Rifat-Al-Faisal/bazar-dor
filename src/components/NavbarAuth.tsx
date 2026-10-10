"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function NavbarAuth() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে লগআউট হয়েছে");
  };

  if (isPending) {
    return <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/profile" className="text-sm font-bold text-gray-700 hover:text-green-700 hidden sm:block">
          {session.user.name}
        </Link>
        <button 
          onClick={handleSignOut} 
          className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-100 border-none"
        >
          লগআউট
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/signin" className="btn btn-ghost font-bold">সাইন ইন</Link>
      <Link href="/signup" className="btn bg-green-700 text-white hover:bg-green-800 border-none">সাইন আপ</Link>
    </div>
  );
}