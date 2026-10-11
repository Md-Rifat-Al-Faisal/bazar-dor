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

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(BASE_URL + path, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(String(res.status));
  const data = await res.json();
  return (Array.isArray(data) ? data : data?.data || []) as T;
}

export const getProducts = () => get<Product[]>("/products");
export const getCategories = () => get<Category[]>("/categories");

export const getProductDetails = async (slug: string) => {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
};