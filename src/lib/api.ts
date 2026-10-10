export interface Category {
  nameBn: string;
  slug: string;
}

export interface Product {
  nameBn?: string;
  slug?: string;
  today?: number;
  unit?: string;
  image?: string;
  change?: { dir?: string; pct?: number; };
  category?: string;
  categoryNameBn?: string;
  markets?: { market: string; division: string; min: number; max: number; }[];
}

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get<T>(path: string): Promise<T> {
  let err: unknown;
  for (const b of BASES) {
    try {
      const r = await fetch(b + path, { next: { revalidate: 3600 } });
      if (!r.ok) throw new Error(String(r.status));
      const data = await r.json();
      return (Array.isArray(data) ? data : data?.data || []) as T;
    } catch (e) {
      err = e;
    }
  }
  throw err;
}

export const getProducts = () => get<Product[]>("/products");
export const getCategories = () => get<Category[]>("/categories");

export const getProductDetails = async (slug: string) => {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
};