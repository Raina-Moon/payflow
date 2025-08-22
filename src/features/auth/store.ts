import { create } from "zustand";
import type { User } from "../user/types";
import { loginApi } from "./api";

interface AuthState {
  user: User | null;
  accessToken?: string | null;
  isAuthenticated: () => boolean;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: () => !!get().user,

  login: async (email, password) => {
    try {
      const userData = await loginApi(email, password);
      const fakeToken = `${userData.id}-${new Date().getTime()}`;
      set({ user: userData, accessToken: fakeToken });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  logout: () => set({ user: null, accessToken: null }),
}));

export default useAuthStore;
