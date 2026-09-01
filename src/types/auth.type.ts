export interface User {
    id: string;
    username: string;
    role: Roles;
    isActivated: boolean;
}

export interface LoginResponse {
    accessToken: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RefreshTokenPayload {
    accessToken: string;
}

export type Roles = "ADMIN" | "USER" | "SUPPORT";
