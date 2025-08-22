export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  role: Role;
  active: boolean;
  password?: string;
}

export type Role = "manager" | "member" | "admin";
