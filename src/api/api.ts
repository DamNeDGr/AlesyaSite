import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/api/Auth.api";
import type { InternalAxiosRequestConfig } from "axios";



export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let refreshAttempts = 0;
const MAX_REFRESH = 3;

api.interceptors.response.use(
    (response) => {
        refreshAttempts = 0;
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // если это refresh — не перехватываем
        if (originalRequest.url?.includes("/auth/refresh")) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (refreshAttempts >= MAX_REFRESH) {
                useAuthStore.getState().logout();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            refreshAttempts++;

            try {
                const data = await authApi.refreshToken();

                useAuthStore.getState().setAccessToken(data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                return api(originalRequest);
            } catch (e) {
                useAuthStore.getState().logout();
                window.location.href = "/login";
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    },
);
