import { HomePage } from "./Pages/HomePage/HomePage.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./components/Layout/MainLayout";
import { NotFoundPage } from "./Pages/ErrorPages/NotFoundPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route element={<HomePage />} index />
                    </Route>
                    <Route>
                        <Route path={"*"} element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
