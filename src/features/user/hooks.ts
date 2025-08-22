import { api } from "../../lib/apiClient";
import { deleteUser, getUserById, listUsers, updateUser } from "./api";
import type { User } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const qk = {
  users: ["users"] as const,
  user: (id: number) => ["users", id] as const,
};

export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: qk.users,
    queryFn: listUsers,
  });
}

export function useUserQuery(id: number) {
  return useQuery<User>({
    queryKey: qk.user(id),
    queryFn: () => getUserById(id),
    enabled: Number.isFinite(id),
  });
}

export function useDeleteUserMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id: number) => {
      await qc.cancelQueries({ queryKey: qk.users });
      const prevUsers = qc.getQueryData<User[]>(qk.users);

      qc.setQueryData<User[]>(qk.users, (old) =>
        old ? old.filter((u) => u.id !== id) : []
      );

      qc.removeQueries({ queryKey: qk.user(id) });

      return { prevUsers };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.users });
    },
    onError: (_err, _id, ctx) => {
      qc.setQueryData(qk.users, ctx?.prevUsers);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk.users });
    },
  });
}

export function useUpdateUserMutation() {
  const qc= useQueryClient();
  return useMutation({
    mutationFn: ({id,...user}) => updateUser(id, user),
    onMutate: async (user: Partial<User> & { id: number }) => {
      await qc.cancelQueries({ queryKey: qk.users });
      const prevUsers = qc.getQueryData<User[]>(qk.users);

      qc.setQueryData<User[]>(qk.users, (old) =>
        old ? old.map((u) => (u.id === user.id ? { ...u, ...user } : u)) : []
      );

      qc.removeQueries({ queryKey: qk.user(user.id) });

      return { prevUsers };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.users });
    },
    onError: (_err, _user, ctx) => {
      qc.setQueryData(qk.users, ctx?.prevUsers);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk.users });
    },
  });
}
