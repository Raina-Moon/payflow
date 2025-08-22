import { api } from "../../lib/apiClient";
import type { User } from "./types";

export async function listUsers(qs=""): Promise<User[]> {
  const res = await api.get<User[]>(`/users${qs}`);
  return res.data;
}

export async function getUserById(id: number) {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}

export async function deleteUser(id: number) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}

export async function updateUser(id: number, user: Partial<User>) {
  const res = await api.put<User>(`/users/${id}`, user);
  return res.data;
}
