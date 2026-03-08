import { useState } from "react";
import type { IService } from "@/types/services.type.ts";
import { CreateServices, DeleteServices, GetServices, UpdateServices } from "@/api/Services.api.ts";
import { toast } from "react-toastify";
import { handleError } from "@/helpers/errorHelper.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useService = () => {
    const [currentService, setCurrentService] = useState<IService | null>(null);
    const [openModalService, setOpenModalService] = useState(false);
    const [openModalUpdateService, setOpenModalUpdateService] = useState(false);

    const queryClient = useQueryClient();

    const serviceQuery = useQuery({
        queryKey: ["services"],
        queryFn: GetServices,
    });

    const createService = useMutation({
        mutationFn: CreateServices,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["services"],
            });
            toast.success("Услуга создана");
            setOpenModalService(false);
        },
        onError: (error: Error) => {
            toast.error("Ошибка создания услуги");
            handleError(error);
            setOpenModalService(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ serviceId, data }: { serviceId: number; data: Omit<IService, "id"> }) => {
            return UpdateServices(serviceId, data);
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["services"],
            });
            toast.success("Услуга успешно изменена");
            setOpenModalUpdateService(false);
        },
        onError: (error) => {
            handleError(error);
            toast.error("Ошибка изменения услуги");
            setOpenModalUpdateService(false);
        },
    });

    const updateService = (serviceId: number, data: Omit<IService, "id">) => {
        updateMutation.mutate({
            serviceId,
            data,
        });
    };

    const deleteService = useMutation({
        mutationFn: DeleteServices,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["services"],
            });
            toast.success("Услуга удалена");
        },
        onError: (error: Error) => {
            toast.error("Ошибка удаления услуги");
            handleError(error);
        },
    });

    const tanstackActions = {
        isLoading: serviceQuery.isLoading,
        loading: updateMutation.isPending,
        services: serviceQuery.data ?? [],
        createService: createService.mutate,
        updateService,
        deleteService: deleteService.mutate,
    };

    const serviceStates = {
        openModalService,
        setOpenModalService,
        openModalUpdateService,
        setOpenModalUpdateService,
        currentService,
        setCurrentService,
    };

    return {
        ...tanstackActions,
        ...serviceStates,
    };
};
