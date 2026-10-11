"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NavbarAuth() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const closeMenu = () => {
    (document.activeElement as HTMLElement | null)?.blur();
  };

  const handleSignOut = async () => {
    closeMenu();
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="h-10 w-28 bg-canvas animate-pulse rounded-xl"></div>;
  }

  if (session?.user) {
    const name = session.user.name || "";
    const email = session.user.email || "";
    const image = session.user.image;
    const firstName = name.split(" ")[0];
    return (
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-3 cursor-pointer"
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              width={40}
              height={40}
              unoptimized
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover border border-green-100"
            />
          ) : (
            <span className="w-10 h-10 rounded-xl bg-green-100 text-green-700 border border-green-100 flex items-center justify-center font-bold">
              {name.charAt(0).toUpperCase() || "U"}
            </span>
          )}
          <span className="hidden sm:inline text-sm font-medium text-ink">
            {firstName}
          </span>
          <span className="text-xs text-soft">▾</span>
        </div>
        <div
          tabIndex={0}
          className="dropdown-content bg-surface border border-line rounded-2xl shadow-lg w-72 px-6 pt-5 pb-10 mt-2 z-50"
        >
          <p className="font-semibold text-ink truncate">{name}</p>
          <p className="text-sm text-muted truncate">{email}</p>
          <Link
            href="/profile"
            onClick={closeMenu}
            className="mt-2 flex items-center gap-2.5 py-2 text-[15px] font-medium text-gray-800 hover:text-green-700"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="text-[#597187] text-[19px]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
            আমার প্রোফাইল
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full cursor-pointer items-center gap-2.5 py-2 text-[15px] font-medium text-[#b43535] transition-colors hover:text-red-700 hover:bg-red-50 rounded-md px-2 -ml-2"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              className="text-[#b43535] text-[19px]"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
              ></path>
            </svg>
            সাইন আউট
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md font-bold">
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="btn btn-sm sm:btn-md bg-green-700 text-white hover:bg-green-800 border-none shadow-md"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
