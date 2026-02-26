import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSidebar";

export const AdminLayout = () => {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger className="cursor-pointer" />
                <h2>Admin Layout</h2>
            </SidebarProvider>
            <Outlet />
        </>
    );
};
