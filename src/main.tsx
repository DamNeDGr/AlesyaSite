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

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ConfigProvider theme={{ algorithm: THEME.darkAlgorithm }} locale={ruRU}>
            <App />
        </ConfigProvider>
    </StrictMode>,
);
