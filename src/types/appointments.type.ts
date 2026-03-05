import type { IService } from "@/types/services.type.ts";
import type { Dayjs } from "dayjs";
export type TStatus = "success" | "pending" | "banned" | "canceled";

export interface IAppointment {
    id: number;
    name: string;
    phone: string;
    date: string;
    serviceId: number;
    timeStart: string;
    status: TStatus;
}

export interface IRecordAppointment {
    id: number;
    name: string;
    phone: string;
    service: IService;
    serviceId: number;
    status: TStatus;
    date: string;
    timeStart: string;
}

export type TAppointmentForm = Omit<IAppointment, "id" | "date" | "timeStart"> & {
    date: Dayjs;
    timeStart: Dayjs;
};
