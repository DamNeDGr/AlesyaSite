import type { IAppointment, IRecordAppointment } from "@/types/appointments.type.ts";
import { api } from "@/api/api.ts";

export const GetAppointments = async (): Promise<IRecordAppointment[]> => {
    const res = await api.get("/appointments");
    return res.data;
};

export const CreateAppointments = async (data: Omit<IAppointment, "id">) => {
    const res = await api.post("/appointments", data);
    return res.data;
};

export const UpdateAppointments = async (data: Omit<IAppointment, "id">, appointmentId: number) => {
    const res = await api.patch(`/appointments/${appointmentId}`, data);
    return res.data;
};

export const DeleteAppointments = async (appointmentId: number) => {
    const res = await api.delete(`/appointments/${appointmentId}`);
    return res.data;
};
