import { HomePage } from "./Pages/HomePage/HomePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./components/Layout/MainLayout";
import { NotFoundPage } from "./Pages/ErrorPages/NotFoundPage";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { AdminPage } from "@/Pages/AdminPage";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route element={<HomePage />} index />
                    </Route>
                    <Route element={<AdminLayout />}>
                        <Route element={<AdminPage />} path={"/admin"} />
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
        </>
    );
}

export default App;
