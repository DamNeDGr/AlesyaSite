import { api } from "./api";
import type { IService } from "@/types/services.type.ts";

export const createService = async (data: Omit<IService, "id">) => {
    const res = await api.post("/services/create", data);
    return res.data;
};

export const getServices = async (): Promise<IService[]> => {
    const res = await api.get("/services/all");
    return res.data;
};

export const updateService = async (data: Omit<IService, "id">, serviceId: number) => {
    const res = await api.patch(`/services/${serviceId}`, data);
    return res.data;
};

export const deleteService = async (serviceId: number) => {
    const res = await api.delete(`/services/${serviceId}`);
    return res.data;
};
