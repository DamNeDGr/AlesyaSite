import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/AdminPageComponents/DataTable";
import { FormAdd } from "@/components/AdminPageComponents/FormAdd";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { ModalBlur } from "@/components/AdminPageComponents/ModalBlur";
import { FormEdit } from "@/components/AdminPageComponents/FormEdit";
import { Breadcrumb } from "antd";
import { Link } from "react-router";
import { CreateAppointments, DeleteAppointments, GetAppointments, UpdateAppointments } from "@/api/Appointments.api.ts";
import type { IAppointment, IRecordAppointment } from "@/types/appointments.type.ts";
import type { IService } from "@/types/services.type.ts";
import { getServices } from "@/api/Services.api.ts";

export const isAdmin = true;
export const AdminPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<IRecordAppointment[] | []>([]);
    const [services, setServices] = useState<IService[] | []>([]);
    const [editingRecords, setEditingRecords] = useState<IRecordAppointment | null>(null);
    const [isOpenModalAppoint, setIsOpenModalAppoint] = useState(false);
    const [isOpenModalEditAppoint, setIsOpenModalEditAppoint] = useState(false);

    const handleGetAppointments = async () => {
        setLoading(true);
        try {
            const appointments = await GetAppointments();
            setDataSource(appointments);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    const GetServices = async () => {
        try {
            const services = await getServices();
            setServices(services);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };
    const handleDeleteAppointments = async (id: number) => {
        try {
            await DeleteAppointments(id);
            toast.success("Запись удалена");
            await handleGetAppointments();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };
    const handleCreate = async (data: Omit<IAppointment, "id">) => {
        try {
            await CreateAppointments(data);
            toast.success("Запись создана");
            await handleGetAppointments();
            setIsOpenModalAppoint(false);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const handleEditAppointment = async (data: Omit<IRecordAppointment, "id" | "service">, id: number) => {
        try {
            await UpdateAppointments(data, id);
            toast.success("Данные успешно изменены");
            setIsOpenModalEditAppoint(false);
            await handleGetAppointments();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        void GetServices();
        void handleGetAppointments();
    }, []);

    return (
        <>
            <ProfileMenu title={"Список клиентов"} btnTitle={"Добавить запись"} openAppoint={() => setIsOpenModalAppoint(true)} />
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
                        title: <Link to={"/services"}>Услуги</Link>,
                    },
                    {
                        key: 3,
                        title: "Список клиентов",
                    },
                ]}
            />
            <DataTable
                dataSource={dataSource}
                services={services}
                loading={loading}
                onDelete={handleDeleteAppointments}
                setEditingRecord={setEditingRecords}
                setIsOpenModalEditAppoint={setIsOpenModalEditAppoint}
            />
            <ModalBlur open={isOpenModalAppoint} onClose={() => setIsOpenModalAppoint(false)}>
                <FormAdd services={services} onCreate={handleCreate} />
            </ModalBlur>
            {editingRecords && (
                <ModalBlur open={isOpenModalEditAppoint} onClose={() => setIsOpenModalEditAppoint(false)}>
                    <FormEdit services={services} onEdit={handleEditAppointment} data={editingRecords} />
                </ModalBlur>
            )}
        </>
    );
};
