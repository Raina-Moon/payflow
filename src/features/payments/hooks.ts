import {
  deletePayment,
  getPaymentById,
  getPaymentByUserId,
  listPayments,
} from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Payment } from "./types";

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

export function usePaymentDeleteMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePayment(id),
    onMutate: async (id: number) => {
      await qc.cancelQueries({ queryKey: qk.base });
      const prevPayments = qc.getQueriesData<Payment[]>({
        queryKey: qk.base,
      });

      qc.setQueriesData<Payment[]>({ queryKey: qk.base }, (old) =>
        Array.isArray(old) ? old.filter((p) => p.id !== id) : old
      );

      qc.removeQueries({ queryKey: [...qk.base, id] });

      return { prevPayments };
    },
    onError: (_err, _id, ctx) => {
      ctx?.prevPayments?.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk.base });
    },
  });
}
