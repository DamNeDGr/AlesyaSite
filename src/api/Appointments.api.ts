import type { IAppointment, IRecordAppointment } from "@/types/appointments.type.ts";
import { api } from "@/api/api.ts";

export const GetAppointments = async (): Promise<IRecordAppointment[]> => {
    const res = await api.get("/orders/all");
    return res.data;
};

export const CreateAppointments = async (data: Omit<IAppointment, "id">) => {
    const res = await api.post("/orders/create", data);
    return res.data;
};

export const UpdateAppointments = async (appointmentId: number, data: Partial<Omit<IAppointment, "id">>) => {
    const res = await api.patch(`/orders/${appointmentId}`, data);
    return res.data;
};

export const DeleteAppointments = async (appointmentId: number) => {
    const res = await api.delete(`/orders/${appointmentId}`);
    return res.data;
};
