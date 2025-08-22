export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  role: Role;
  active: boolean;
}

export type Role = "manager" | "member" | "admin";
