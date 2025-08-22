import { useQuery } from "@tanstack/react-query";
import { getProductById, listProducts } from "./api";
import type { Product } from "./types";

export const qk = {
  products: ["products"] as const,
  product: (id: number) => ["products", id] as const,
};

export function useProductsQuery() {
  return useQuery<Product[]>({
    queryKey: qk.products,
    queryFn: listProducts,
  });
}

export function useProductQuery(id: number) {
  return useQuery<Product>({
    queryKey: qk.product(id),
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id),
  });
}
