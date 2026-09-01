import { DataTable } from "@/components/AdminPageComponents/DataTable";
import { FormAdd } from "@/components/AdminPageComponents/FormAdd";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { ModalBlur } from "@/components/AdminPageComponents/ModalBlur";
import { FormEdit } from "@/components/AdminPageComponents/FormEdit";
import { Breadcrumb, Drawer, Grid } from "antd";
import { Link } from "react-router";
import { useClient } from "@/hooks/useClient.ts";
import { useService } from "@/hooks/useService.ts";

export const isAdmin = true;
export const AdminPage = () => {
    const {
        appointments,
        isLoading,
        loading,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        currentAppointment,
        setCurrentAppointment,
        openModalCreateAppointment,
        setOpenModalCreateAppointment,
        openModalUpdateAppointment,
        setOpenModalUpdateAppointment,
    } = useClient();
    const { services } = useService();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <>
            <ProfileMenu
                title={"Список клиентов"}
                btnTitle={"Добавить запись"}
                openAppoint={() => setOpenModalCreateAppointment(true)}
                isMobile={isMobile}
            />
            <Breadcrumb
                style={{
                    padding: "20px 0",
                }}
                separator=">"
                items={[
                    {
                        key: 1,
                        title: <Link to={"/"}>Главная</Link>,
                    },
                    {
                        key: 2,
                        title: <Link to={"/admin/services"}>Услуги</Link>,
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
                isLoading={isLoading}
                onDelete={deleteAppointment}
                setEditingRecord={setCurrentAppointment}
                setIsOpenModalEditAppoint={() => setOpenModalUpdateAppointment(true)}
                isMobile={isMobile}
            />

            {isMobile ? (
                <Drawer
                    open={openModalCreateAppointment}
                    onClose={() => setOpenModalCreateAppointment(false)}
                    title="Создать запись"
                >
                    <FormAdd services={services} onCreate={createAppointment} />
                </Drawer>
            ) : (
                <ModalBlur open={openModalCreateAppointment} onClose={() => setOpenModalCreateAppointment(false)}>
                    <FormAdd services={services} onCreate={createAppointment} />
                </ModalBlur>
            )}

            {isMobile ? (
                <Drawer open={openModalUpdateAppointment} onClose={() => setOpenModalUpdateAppointment(false)}>
                    <FormEdit services={services} onEdit={updateAppointment} data={currentAppointment} loading={loading} />
                </Drawer>
            ) : (
                <ModalBlur open={openModalUpdateAppointment} onClose={() => setOpenModalUpdateAppointment(false)}>
                    <FormEdit services={services} onEdit={updateAppointment} data={currentAppointment} loading={loading} />
                </ModalBlur>
            )}
        </>
    );
};
