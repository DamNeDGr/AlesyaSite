import { ServiceTable } from "@/components/AdminPageComponents/DataTable/ServiceTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { ModalBlur } from "@/components/AdminPageComponents/ModalBlur";
import { FormAddService } from "@/components/AdminPageComponents/FormAddService/FormAddService.tsx";
import { Link } from "react-router";
import { Breadcrumb } from "antd";

export const ServicePage = () => {
    const [services, setServices] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpenModalService, setIsOpenModalService] = useState(false);
    const [isOpenModalEditService, setIsOpenModalEditService] = useState(false);

    const GetServices = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/services");
            if (!res.ok) {
                throw new Error("Ошибка получения данных о услугах");
            }
            const services = await res.json();
            setServices(services);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditService = async (service, serviceId: number) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/services/${serviceId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(service),
            });
            if (!res.ok) {
                throw new Error("Ошибка изменения данных об услугах");
            }
            toast.success("Данные об услугах успешно изменены");
            GetServices();
            setIsOpenModalEditService(false);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/services/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Ошибка удаления услуги");
            }
            toast.success("Услуга удалена");
            GetServices();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateService = async (data: any) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Ошибка создания услуги");
            }
            toast.success("Услуга создана");
            GetServices();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetServices();
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
            <ServiceTable
                services={services}
                onEdit={setEditingService}
                openEdit={() => setIsOpenModalEditService(true)}
                onDelete={handleDelete}
                loading={loading}
            />
            <ModalBlur open={isOpenModalService} onClose={() => setIsOpenModalService(false)}>
                <FormAddService onSubmit={handleCreateService} />
            </ModalBlur>

            <ModalBlur open={isOpenModalEditService} onClose={() => setIsOpenModalEditService(false)}>
                <FormAddService onSubmit={handleEditService} service={editingService} />
            </ModalBlur>
        </>
    );
};
