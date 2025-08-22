import { api } from "../../lib/apiClient";
import type { Payment } from "./types";

export async function listPayments() {
  const res = await api.get<Payment[]>("/payments");
  return res.data;
}

export async function getPaymentById(id: number) {
  const res = await api.get<Payment>(`/payments/${id}`);
  return res.data;
}

export async function getPaymentByUserId(userId: number) {
  const res = await api.get<Payment[]>(`/payments`, {
    params: { userId },
  });
  return res.data;
}

export async function deletePayment(id: number) {
  await api.delete(`/payments/${id}`);
}
