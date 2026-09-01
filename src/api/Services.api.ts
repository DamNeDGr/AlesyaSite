import { api } from "./api";
import type { IService } from "@/types/services.type.ts";

export const CreateServices = async (data: Omit<IService, "id">) => {
    const res = await api.post("/services/create", data);
    return res.data;
};

export const GetServices = async (): Promise<IService[]> => {
    const res = await api.get("/services/all");
    return res.data;
};

export const UpdateServices = async (serviceId: number, data: Omit<IService, "id">): Promise<IService> => {
    const res = await api.patch(`/services/${serviceId}`, data);
    return res.data;
};

export const DeleteServices = async (serviceId: number) => {
    const res = await api.delete(`/services/${serviceId}`);
    return res.data;
};
