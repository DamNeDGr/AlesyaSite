import { CreateAppointments, DeleteAppointments, GetAppointments, UpdateAppointments } from "@/api/Appointments.api.ts";
import { toast } from "react-toastify";
import type { IAppointment, IRecordAppointment } from "@/types/appointments.type.ts";
import { useState } from "react";
import { handleError } from "@/helpers/errorHelper.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useClient = () => {
    // const [loading, setLoading] = useState(false);
    // const [appointments, setAppointments] = useState<IRecordAppointment[]>([]);
    const [currentAppointment, setCurrentAppointment] = useState<IRecordAppointment | null>(null);
    const [openModalCreateAppointment, setOpenModalCreateAppointment] = useState<boolean>(false);
    const [openModalUpdateAppointment, setOpenModalUpdateAppointment] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const appointmentQuery = useQuery({
        queryKey: ["appointments"],
        queryFn: GetAppointments,
    });

    const createMutation = useMutation({
        mutationFn: CreateAppointments,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appointments"],
            });
            toast.success("Запись создана");
            setOpenModalCreateAppointment(false);
        },
        onError: (error: Error) => {
            toast.error("Ошибка создания записи");
            handleError(error);
            setOpenModalCreateAppointment(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ appointmentId, data }: { appointmentId: number; data: Omit<IAppointment, "id"> }) =>
            UpdateAppointments(appointmentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appointments"],
            });
            toast.success("Данные успешно изменены");
            setOpenModalUpdateAppointment(false);
        },
        onError: (error: Error) => {
            handleError(error);
            toast.error("Ошибка изменения записи");
            setOpenModalUpdateAppointment(false);
        },
    });

    const updateAppointment = (appointmentId: number, data: Omit<IAppointment, "id">) => {
        updateMutation.mutate({
            appointmentId,
            data,
        });
    };

    const deleteMutation = useMutation({
        mutationFn: DeleteAppointments,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            toast.success("Запись удалена");
        },
        onError: (error: Error) => {
            toast.error("Ошибка удаления записи");
            handleError(error);
        },
    });

    return {
        appointments: appointmentQuery.data ?? [],
        isLoading: appointmentQuery.isLoading,
        loading: updateMutation.isPending,
        createAppointment: createMutation.mutate,
        updateAppointment,
        deleteAppointment: deleteMutation.mutate,
        currentAppointment,
        setCurrentAppointment,
        openModalCreateAppointment,
        setOpenModalCreateAppointment,
        openModalUpdateAppointment,
        setOpenModalUpdateAppointment,
    };
};
