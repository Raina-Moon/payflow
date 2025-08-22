import { deleteUser, getUserById, listUsers, updateUser } from "./api";
import type { Role, User } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const qk = {
  base: ["users"] as const,
  lists: () => ["users", "list"] as const,
  list: (filters?: UserFilter) => ["users", "list", filters ?? {}] as const,
  detail: (id: number) => ["users", "detail", id] as const,
};

export type UserFilter = {
  q?: string;
  active?: boolean;
  role?: Role | "all";
};

export function useUsersQuery(filters?: UserFilter) {
  return useQuery<User[]>({
    queryKey: qk.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.q) params.set("q", filters.q);
      if (filters?.active !== undefined)
        params.set("active", String(filters.active));
      if (filters?.role && filters.role !== "all") {
        params.set("role", filters.role);
      }
      const qs = params.toString();
      const data = await listUsers(qs ? `?${qs}` : "");

      let items = data;
      if (filters?.q) {
        const t = filters.q.toLowerCase();
        items = items.filter(
          (u: User) =>
            u.name.toLowerCase().includes(t) ||
            u.email.toLowerCase().includes(t)
        );
      }

      if (filters?.active !== undefined) {
        items = items.filter((u: User) => u.active === filters.active);
      }

      if (filters?.role && filters.role !== "all") {
        items = items.filter((u: User) => u.role === filters.role);
      }

      return items;
    },
  });
}

export function useUserQuery(id: number) {
  return useQuery<User>({
    queryKey: qk.detail(id),
    queryFn: () => getUserById(id),
    enabled: Number.isFinite(id),
  });
}

export function useDeleteUserMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onMutate: async (id: number) => {
      await qc.cancelQueries({ queryKey: qk.lists() });
      const prevUsers = qc.getQueriesData<User[]>({ queryKey: qk.lists() });

      qc.setQueriesData<User[]>({ queryKey: qk.lists() }, (old) =>
        Array.isArray(old) ? old.filter((u) => u.id !== id) : old
      );

      qc.removeQueries({ queryKey: qk.detail(id) });

      return { prevUsers };
    },
    onError: (_err, _id, ctx) => {
      ctx?.prevUsers?.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk.lists() });
    },
  });
}

export function useUpdateUserMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...user }: Partial<User> & { id: number }) =>
      updateUser(id, user),
    onMutate: async (user: Partial<User> & { id: number }) => {
      await qc.cancelQueries({ queryKey: qk.lists() });

      const prevUsers = qc.getQueriesData<User[]>({ queryKey: qk.lists() });
      const prevDetail = qc.getQueryData<User>(qk.detail(user.id));

      qc.setQueriesData<User[]>({ queryKey: qk.lists() }, (old) =>
        old ? old.map((u) => (u.id === user.id ? { ...u, ...user } : u)) : old
      );

      qc.setQueryData<User>(qk.detail(user.id), (old) =>
        old ? { ...old, ...user } : old
      );

      return { prevUsers, prevDetail };
    },
    onError: (_err, user, ctx) => {
      ctx?.prevUsers?.forEach(([key, data]) => qc.setQueryData(key, data));
      qc.setQueryData(qk.detail(user.id), ctx?.prevDetail);
    },
    onSettled: (_data, _err, user) => {
      qc.invalidateQueries({ queryKey: qk.lists() });
      qc.invalidateQueries({ queryKey: qk.detail(user.id) });
    },
  });
}
