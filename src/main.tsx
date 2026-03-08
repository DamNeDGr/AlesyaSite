import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./reset.css";
import "./index.css";

import ruRU from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");
import { ConfigProvider, theme as THEME } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider theme={{ algorithm: THEME.darkAlgorithm }} locale={ruRU}>
                <App />
                <ReactQueryDevtools />
            </ConfigProvider>
        </QueryClientProvider>
    </StrictMode>,
);
