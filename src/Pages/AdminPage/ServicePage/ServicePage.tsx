import { ServiceTable } from "@/components/AdminPageComponents/DataTable/ServiceTable";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { ModalBlur } from "@/components/AdminPageComponents/ModalBlur";
import { FormAddService } from "@/components/AdminPageComponents/FormAddService/FormAddService.tsx";
import { Link } from "react-router";
import { Breadcrumb, Grid } from "antd";
import { useService } from "@/hooks/useService.ts";

export const ServicePage = () => {
    const {
        openModalService,
        setOpenModalService,
        openModalUpdateService,
        setOpenModalUpdateService,
        currentService,
        setCurrentService,
        services,
        isLoading,
        isDeleting,
        loading,
        createService,
        updateService,
        deleteService,
    } = useService();

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <>
            <ProfileMenu
                title={"Список услуг"}
                btnTitle={"Добавить услугу"}
                openAppoint={() => setOpenModalService(true)}
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
                onEdit={setCurrentService}
                openEdit={() => setOpenModalUpdateService(true)}
                onDelete={deleteService}
                isLoading={isLoading}
                loading={isDeleting}
                isMobile={isMobile}
            />

            <ModalBlur open={openModalService} onClose={() => setOpenModalService(false)}>
                <FormAddService loading={loading} onCreate={createService} />
            </ModalBlur>

            <ModalBlur open={openModalUpdateService} onClose={() => setOpenModalUpdateService(false)}>
                {currentService !== null && <FormAddService onEdit={updateService} service={currentService} loading={loading} />}
            </ModalBlur>
        </>
    );
};
