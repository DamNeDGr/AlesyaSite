import type { IService } from "@/types/services.type.ts";
import type { Dayjs } from "dayjs";
export type TStatus = "success" | "pending" | "banned" | "canceled";

// @ts-ignore
export enum EStatus {
    PENDING = "pending",
    BANNED = "banned",
    SUCCESS = "success",
    CANCELED = "canceled",
}

export interface IAppointment {
    id: number;
    name: string;
    phone: string;
    date: string;
    serviceId: number;
    payStatus: boolean;
    timeStart: string;
    status: TStatus;
}

export interface IRecordAppointment {
    id: number;
    name: string;
    phone: string;
    service: IService;
    serviceId: number;
    payStatus: boolean;
    status: TStatus;
    date: string;
    timeStart: string;
}

export type TAppointmentForm = Omit<IAppointment, "id" | "date" | "timeStart"> & {
    date: Dayjs;
    timeStart: Dayjs;
};
