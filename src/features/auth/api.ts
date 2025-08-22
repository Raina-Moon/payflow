import type { User } from "../user/types";
import { api } from "../../lib/apiClient";

export const loginApi = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const response = await api.get<User[]>(
      `/users?email=${email}&password=${password}`
    );

    if (response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.error("Login API failed:", error);
    throw error;
  }
};
