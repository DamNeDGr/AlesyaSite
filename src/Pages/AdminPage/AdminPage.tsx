import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/AdminPageComponents/DataTable/DataTable.tsx";
import { FormAdd } from "@/components/AdminPageComponents/FormAdd";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { ModalBlur } from "@/components/AdminPageComponents/ModalBlur";
import { FormEdit } from "@/components/AdminPageComponents/FormEdit/FormEdit.tsx";
import { Breadcrumb } from "antd";
import { Link } from "react-router";

export const isAdmin = false;

export const AdminPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [services, setServices] = useState([]);
    const [editingRecords, setEditingRecords] = useState(null);
    const [isOpenModalAppoint, setIsOpenModalAppoint] = useState(false);
    const [isOpenModalService, setIsOpenModalService] = useState(false);
    const [isOpenModalEditAppoint, setIsOpenModalEditAppoint] = useState(false);
    const GetData = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/appointments?_expand=service");
            if (!res.ok) {
                throw new Error("Ошибка получения данных о клиентах");
            }
            const data = await res.json();
            setDataSource(data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };
    const GetServices = async () => {
        try {
            const res = await fetch("http://localhost:3001/services");
            if (!res.ok) {
                throw new Error("Ошибка получения данных о услугах");
            }
            const services = await res.json();
            setServices(services);
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3001/appointments/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Ошибка удаления записи");
            }
            toast.success("Запись удалена");
            GetData();
        } catch (err) {
            toast.error("Ошибка удаления записи");
        }
    };
    const handleCreate = async (data: any) => {
        try {
            const res = await fetch("http://localhost:3001/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Ошибка создания записи!");
            }
            toast.success("Запись создана");
            GetData();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleEditAppointment = async (data: any, id) => {
        try {
            const res = await fetch(`http://localhost:3001/appointments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Ошибка при изменении данных");
            }
            toast.success("Данные успешно изменены");
            setIsOpenModalEditAppoint(false);
            GetData();
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        GetServices();
        GetData();
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
                onDelete={handleDelete}
                setEditingRecord={setEditingRecords}
                setIsOpenModalEditAppoint={setIsOpenModalEditAppoint}
            />
            <ModalBlur open={isOpenModalAppoint} onClose={() => setIsOpenModalAppoint(false)}>
                <FormAdd services={services} onCreate={handleCreate} />
            </ModalBlur>

            <ModalBlur open={isOpenModalEditAppoint} onClose={() => setIsOpenModalEditAppoint(false)}>
                <FormEdit services={services} onEdit={handleEditAppointment} data={editingRecords} />
            </ModalBlur>
        </>
    );
};
