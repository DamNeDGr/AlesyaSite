import { HomePage } from "./Pages/HomePage/HomePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./components/Layout/MainLayout";
import { NotFoundPage } from "./Pages/ErrorPages/NotFoundPage";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { AdminPage } from "@/Pages/AdminPage";
import { Bounce, ToastContainer } from "react-toastify";
import { ServicePage } from "@/Pages/AdminPage/ServicePage/ServicePage.tsx";
import { App as AntApp } from "antd";

function App() {
    return (
        <>
            <AntApp>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route element={<HomePage />} index />
                        </Route>
                        <Route path={"/admin"} element={<AdminLayout />}>
                            <Route element={<AdminPage />} index />
                            <Route element={<ServicePage />} path={"services"} />
                        </Route>
                        <Route>
                            <Route path={"*"} element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="dark"
                        transition={Bounce}
                    />
                </BrowserRouter>
            </AntApp>
        </>
    );
}

export default App;
