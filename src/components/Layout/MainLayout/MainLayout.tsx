import { Header } from "../../Header";
import { Outlet } from "react-router";
import { Footer } from "../../Footer/Footer.tsx";

export const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
