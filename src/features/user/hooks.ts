import { api } from "../../lib/apiClient";
import { getUserById, listUsers } from "./api";
import type { User } from "./types";
import { useQuery } from "@tanstack/react-query";

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
