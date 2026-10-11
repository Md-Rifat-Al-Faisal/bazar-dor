"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav({ categories }: { categories: { nameBn: string; slug: string; icon?: string }[] }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-line overflow-x-auto">
      <ul className="flex items-center max-w-6xl mx-auto px-4 py-2 whitespace-nowrap">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-green-700 text-white" : "text-ink hover:bg-canvas"
                }`}
              >
                <span className="text-base">{c.icon}</span>
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}