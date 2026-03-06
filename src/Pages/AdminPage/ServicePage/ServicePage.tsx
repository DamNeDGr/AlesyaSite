import { ServiceTable } from "@/components/AdminPageComponents/DataTable/ServiceTable";
import { useEffect } from "react";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { ModalBlur } from "@/components/AdminPageComponents/ModalBlur";
import { FormAddService } from "@/components/AdminPageComponents/FormAddService/FormAddService.tsx";
import { Link } from "react-router";
import { Breadcrumb } from "antd";
import { useService } from "@/hooks/useService.ts";

export const ServicePage = () => {
    const {
        loading,
        services,
        currentService,
        setCurrentService,
        openModalService,
        setOpenModalService,
        openModalUpdateService,
        setOpenModalUpdateService,
        handleGetService,
        handleEditService,
        handleDeleteService,
        handleCreateService,
    } = useService();

    useEffect(() => {
        void handleGetService();
    }, []);

    return (
        <>
            <ProfileMenu title={"Список услуг"} btnTitle={"Добавить услугу"} openAppoint={() => setOpenModalService(true)} />
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
                    onEdit={setCurrentService}
                    openEdit={() => setOpenModalUpdateService(true)}
                    onDelete={handleDeleteService}
                    loading={loading}
                />
            )}
            <ModalBlur open={openModalService} onClose={() => setOpenModalService(false)}>
                <FormAddService onCreate={handleCreateService} />
            </ModalBlur>

            <ModalBlur open={openModalUpdateService} onClose={() => setOpenModalUpdateService(false)}>
                {currentService !== null && <FormAddService onEdit={handleEditService} service={currentService} />}
            </ModalBlur>
        </>
    );
};
