import { useEffect } from "react";
import { DataTable } from "@/components/AdminPageComponents/DataTable";
import { FormAdd } from "@/components/AdminPageComponents/FormAdd";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { ModalBlur } from "@/components/AdminPageComponents/ModalBlur";
import { FormEdit } from "@/components/AdminPageComponents/FormEdit";
import { Breadcrumb } from "antd";
import { Link } from "react-router";
import { useClient } from "@/hooks/useClient.ts";
import { useService } from "@/hooks/useService.ts";

export const isAdmin = true;
export const AdminPage = () => {
    const { services, handleGetService } = useService();
    const {
        loading,
        openModalCreateAppointment,
        setOpenModalCreateAppointment,
        openModalUpdateAppointment,
        setOpenModalUpdateAppointment,
        currentAppointment,
        setCurrentAppointment,
        appointments,
        handleCreate,
        handleGetAppointments,
        handleEditAppointment,
        handleDeleteAppointments,
    } = useClient();


    useEffect(() => {
        void handleGetAppointments();
        void handleGetService();
    }, []);

    return (
        <>
            <ProfileMenu
                title={"Список клиентов"}
                btnTitle={"Добавить запись"}
                openAppoint={() => setOpenModalCreateAppointment(true)}
            />
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
                dataSource={appointments}
                services={services}
                loading={loading}
                onDelete={handleDeleteAppointments}
                setEditingRecord={setCurrentAppointment}
                setIsOpenModalEditAppoint={setOpenModalUpdateAppointment}
            />
            <ModalBlur open={openModalCreateAppointment} onClose={() => setOpenModalCreateAppointment(false)}>
                <FormAdd services={services} onCreate={handleCreate} />
            </ModalBlur>
            {currentAppointment && (
                <ModalBlur open={openModalUpdateAppointment} onClose={() => setOpenModalUpdateAppointment(false)}>
                    <FormEdit services={services} onEdit={handleEditAppointment} data={currentAppointment} />
                </ModalBlur>
            )}
        </>
    );
};
