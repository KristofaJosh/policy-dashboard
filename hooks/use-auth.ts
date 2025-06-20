"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, User } from "@/types";

interface AuthStore extends AuthState {
  login: (values: { user: User;}) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async ({ user }) => {
        localStorage.setItem("auth_token", "true");
        set({ user, isAuthenticated: true });
      },

      logout: async () => {
        localStorage.removeItem("auth_token");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const useAuth = () => {
  const store = useAuthStore();
  return store;
};
