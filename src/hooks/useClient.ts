import { CreateAppointments, DeleteAppointments, GetAppointments, UpdateAppointments } from "@/api/Appointments.api.ts";
import { toast } from "react-toastify";
import type { IAppointment, IRecordAppointment } from "@/types/appointments.type.ts";
import { useState } from "react";
import { handleError } from "@/helpers/errorHelper.ts";

export const useClient = () => {
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState<IRecordAppointment[]>([]);
    const [currentAppointment, setCurrentAppointment] = useState<IRecordAppointment | null>(null);
    const [openModalCreateAppointment, setOpenModalCreateAppointment] = useState<boolean>(false);
    const [openModalUpdateAppointment, setOpenModalUpdateAppointment] = useState<boolean>(false);

    const handleGetAppointments = async () => {
        setLoading(true);
        try {
            const appointments = await GetAppointments();
            setAppointments(appointments);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAppointments = async (id: number) => {
        try {
            await DeleteAppointments(id);
            toast.success("Запись удалена");
            await handleGetAppointments();
        } catch (error) {
            handleError(error);
        }
    };

    const handleCreate = async (data: Omit<IAppointment, "id">) => {
        try {
            await CreateAppointments(data);
            toast.success("Запись создана");
            await handleGetAppointments();
            setOpenModalCreateAppointment(false);
        } catch (error) {
            handleError(error);
        }
    };

    const handleEditAppointment = async (data: Omit<IRecordAppointment, "id" | "service">, id: number) => {
        try {
            await UpdateAppointments(data, id);
            toast.success("Данные успешно изменены");
            setOpenModalUpdateAppointment(false);
            await handleGetAppointments();
        } catch (error) {
            handleError(error);
        }
    };

    const state = {
        loading,
        openModalCreateAppointment,
        setOpenModalCreateAppointment,
        openModalUpdateAppointment,
        setOpenModalUpdateAppointment,
        currentAppointment,
        setCurrentAppointment,
        appointments,
    };

    const actions = {
        handleCreate,
        handleGetAppointments,
        handleEditAppointment,
        handleDeleteAppointments,
    };

    return { ...state, ...actions };
};
