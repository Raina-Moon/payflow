import { api } from "../../lib/apiClient";
import type { User } from "./types";

export async function listUsers() {
  const res = await api.get<User[]>("/users");
  return res.data;
}

export async function getUserById(id: number) {
  const res = await api.get<User>(`/users/${id}`);
  return res.data;
}

export async function deleteUser(id:number) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}