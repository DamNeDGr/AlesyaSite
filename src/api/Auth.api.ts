import type { LoginPayload, LoginResponse, User } from "@/types/auth.type.ts";
import { api } from "@/api/api.ts";

export const authApi = {
    login: async (payload: LoginPayload) => {
        const { data } = await api.post<LoginResponse>("/auth/login", payload);
        return data;
    },

    refreshToken: async () => {
        const { data } = await api.post<LoginResponse>("/auth/refresh");
        return data;
    },

    logout: async () => {
        await api.post("auth/logout");
    },

    me: async () => {
        const { data } = await api.get<User>("/auth/@me");
        return data;
    },
};
