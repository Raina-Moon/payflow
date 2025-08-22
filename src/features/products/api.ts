import { api } from "../../lib/apiClient";
import type { Product } from "./types";

export async function listProducts(qs = ""): Promise<Product[]> {
  const res = await api.get<Product[]>(`/products${qs}`);
  return res.data;
}

export async function getProductById(id: number): Promise<Product> {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
}
