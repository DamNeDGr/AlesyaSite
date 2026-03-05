import { ServiceTable } from "@/components/AdminPageComponents/DataTable/ServiceTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { ModalBlur } from "@/components/AdminPageComponents/ModalBlur";
import { FormAddService } from "@/components/AdminPageComponents/FormAddService/FormAddService.tsx";
import { Link } from "react-router";
import { Breadcrumb } from "antd";
import { createService, deleteService, getServices, updateService } from "@/api/Services.api.ts";
import type { IService } from "@/types/services.type.ts";

export const ServicePage = () => {
    const [services, setServices] = useState<IService[] | null>(null);
    const [editingService, setEditingService] = useState<IService | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpenModalService, setIsOpenModalService] = useState(false);
    const [isOpenModalEditService, setIsOpenModalEditService] = useState(false);

    const GetServiceHandler = async () => {
        setLoading(true);
        try {
            const res = await getServices();
            setServices(res);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditService = async (service: Omit<IService, "id">, serviceId: number) => {
        setLoading(true);
        try {
            await updateService(service, serviceId);
            toast.success("Данные об услугах успешно изменены");
            await GetServiceHandler();
            setIsOpenModalEditService(false);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await deleteService(id);
            toast.success("Услуга удалена");
            await GetServiceHandler();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateService = async (data: Omit<IService, "id">) => {
        setLoading(true);
        try {
            await createService(data);
            toast.success("Услуга создана");
            setIsOpenModalService(false);
            await GetServiceHandler();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void GetServiceHandler();
    }, []);

    return (
        <>
            <ProfileMenu title={"Список услуг"} btnTitle={"Добавить услугу"} openAppoint={() => setIsOpenModalService(true)} />
            <Breadcrumb
                style={{
                    padding: "5px 0",
                }}
                separator=">"
                items={[
                    {
                        key: 1,
                        title: <Link to={"/"}>Главная</Link>,
                    },
                    {
                        key: 2,
                        title: <Link to={"/admin"}>Клиенты</Link>,
                    },
                    {
                        key: 3,
                        title: "Услуги",
                    },
                ]}
            />
            {services !== null && (
                <ServiceTable
                    services={services}
                    onEdit={setEditingService}
                    openEdit={() => setIsOpenModalEditService(true)}
                    onDelete={handleDelete}
                    loading={loading}
                />
            )}
            <ModalBlur open={isOpenModalService} onClose={() => setIsOpenModalService(false)}>
                <FormAddService onCreate={handleCreateService} />
            </ModalBlur>

            <ModalBlur open={isOpenModalEditService} onClose={() => setIsOpenModalEditService(false)}>
                {editingService !== null && <FormAddService onEdit={handleEditService} service={editingService} />}
            </ModalBlur>
        </>
    );
};
