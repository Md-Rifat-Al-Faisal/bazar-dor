"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav({ categories }: { categories: { nameBn: string; slug: string }[] }) {
  const pathname = usePathname();
  
  return (
    <nav className="border-t overflow-x-auto">
      <ul className="flex gap-2 px-4 py-2 max-w-6xl mx-auto whitespace-nowrap">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`inline-block px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  active ? "bg-green-700 text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}