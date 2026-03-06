import { useState } from "react";
import type { IService } from "@/types/services.type.ts";
import { createService, deleteService, getServices, updateService } from "@/api/Services.api.ts";
import { toast } from "react-toastify";
import { handleError } from "@/helpers/errorHelper.ts";

export const useService = () => {
    const [services, setServices] = useState<IService[]>([]);
    const [currentService, setCurrentService] = useState<IService | null>(null);
    const [loading, setLoading] = useState(false);
    const [openModalService, setOpenModalService] = useState(false);
    const [openModalUpdateService, setOpenModalUpdateService] = useState(false);

    const handleGetService = async () => {
        setLoading(true);
        try {
            const res = await getServices();
            setServices(res);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditService = async (service: Omit<IService, "id">, serviceId: number) => {
        setLoading(true);
        try {
            await updateService(service, serviceId);
            toast.success("Данные об услугах успешно изменены");
            await handleGetService();
            setOpenModalUpdateService(false);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteService = async (id: number) => {
        setLoading(true);
        try {
            await deleteService(id);
            toast.success("Услуга удалена");
            await handleGetService();
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateService = async (data: Omit<IService, "id">) => {
        setLoading(true);
        try {
            await createService(data);
            toast.success("Услуга создана");
            setOpenModalService(false);
            await handleGetService();
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const states = {
        loading,
        services,
        currentService,
        setCurrentService,
        openModalService,
        setOpenModalService,
        openModalUpdateService,
        setOpenModalUpdateService,
    };

    const actions = {
        handleGetService,
        handleEditService,
        handleDeleteService,
        handleCreateService,
    };

    return {
        ...states,
        ...actions,
    };
};
