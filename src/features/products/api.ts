import { api } from "../../lib/apiClient";
import type { Product } from "./types";

export async function listProducts() {
  const res = await api.get<Product[]>("/products");
  return res.data;
}

export async function getProductById(id: number) {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
}
