import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/auth.type";
import { authApi } from "@/api/Auth.api";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    loading: boolean;

    login: (username: string, password: string) => Promise<void>;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
    setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            loading: false,

            login: async (username, password) => {
                try {
                    set({ loading: true });

                    const { accessToken } = await authApi.login({
                        username,
                        password,
                    });

                    set({ accessToken });

                    const user = await authApi.me();

                    set({
                        user,
                        loading: false,
                    });
                } catch (error) {
                    set({ loading: false });
                    throw error;
                }
            },

            fetchUser: async () => {
                const user = await authApi.me();
                set({ user });
            },

            logout: async () => {
                await authApi.logout();

                set({
                    user: null,
                    accessToken: null,
                });
            },

            setAccessToken: (accessToken) => {
                set({ accessToken });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
            }),
        },
    ),
);
