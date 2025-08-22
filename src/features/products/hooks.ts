import { useQuery } from "@tanstack/react-query";
import { getProductById, listProducts } from "./api";
import type { Product } from "./types";

export const qk = {
  products: (filters?: ProductFilter) => ["products", filters] as const,
  product: (id: number) => ["products", id] as const,
};

export type ProductFilter = {
  q?: string;
  category?: string;
};

export function useProductsQuery(filters?: ProductFilter) {
  return useQuery<Product[]>({
    queryKey: qk.products(filters),
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.q) params.set("name_like", filters.q);
      if (filters?.category && filters.category !== "all")
        params.set("category", filters.category);

      const qs = params.toString();
      const data = await listProducts(qs ? `?${qs}` : "");

      let items = data;
      if (filters?.q) {
        const t = filters.q.toLowerCase();
        items = items.filter((p: Product) => p.name.toLowerCase().includes(t));
      }

      if (filters?.category && filters.category !== "all") {
        items = items.filter((p: Product) => p.category === filters.category);
      }
      return items;
    },
  });
}

export function useProductCategoriesQuery() {
  return useQuery<string[]>({
    queryKey: ["product-categories"],
    queryFn: async () => {
      const data = await listProducts();
      const set = new Set<string>();
      data.forEach((p) => {
        p.category && set.add(p.category);
      });
      return Array.from(set).sort();
    },
    staleTime: 1000 * 60 * 60,
  });
}
export function useProductQuery(id: number) {
  return useQuery<Product>({
    queryKey: qk.product(id),
    queryFn: () => getProductById(id),
  });
}
