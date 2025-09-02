import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User, RegisterData, LoginData } from "../types";
import { registerUser, loginUser, logoutUser } from "../api/authApi";

// state properties

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (userData: RegisterData) => Promise<void>;
  login: (userData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        register: async (userData) => {
          set({ isLoading: true, error: null });
          try {
            const user = await registerUser(userData);
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (error: any) {
            const errorMessage =
              error.response?.data?.message || "Registration failed";
            set({
              error: errorMessage,
              isLoading: false,
              isAuthenticated: false,
            });
            throw new Error(errorMessage);
          }
        },

        login: async (userData) => {
          set({ isLoading: true, error: null });
          try {
            const user = await loginUser(userData);
            set({ user, isAuthenticated: true, isLoading: false });
          } catch (error: any) {
            const errorMessage =
              error.response?.data?.message || "Login failed";
            set({
              error: errorMessage,
              isLoading: false,
              isAuthenticated: false,
            });
            throw new Error(errorMessage);
          }
        },

        logout: async () => {
          set({ isLoading: true, error: null });
          try {
            await logoutUser();
            set({ user: null, isAuthenticated: false, isLoading: false });
          } catch (error: any) {
            const errorMessage =
              error.response?.data?.message || "Logout failed";
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
          }
        },
      }),
      {
        name: "auth-storage",

        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
