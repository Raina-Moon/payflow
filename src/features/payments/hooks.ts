import { getPaymentById, getPaymentByUserId, listPayments } from "./api";
import { useQuery } from "@tanstack/react-query";

export const qk = {
  base: ["payments"] as const,
  list: () => ["payments", "list"] as const,
};

export function useListPaymentsQuery() {
  return useQuery({
    queryKey: qk.list(),
    queryFn: listPayments,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function usePaymentQuery(id: number) {
  return useQuery({
    queryKey: [...qk.base, id],
    queryFn: () => getPaymentById(id),
    enabled: Number.isFinite(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function usePaymentByUserIdQuery(userId: number) {
  return useQuery({
    queryKey: [...qk.base, "user", userId],
    queryFn: () => getPaymentByUserId(userId),
    enabled: Number.isFinite(userId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
