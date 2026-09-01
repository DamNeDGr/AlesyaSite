import { Header } from "../../HomePageComponents/Header";
import { Outlet } from "react-router";
import { Footer } from "@/components/HomePageComponents/Footer/Footer.tsx";

export const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
