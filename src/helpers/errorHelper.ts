import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
            toast.error("Сервер недоступен. Проверьте подключение.");
            return;
        }

        if (error.code === "ECONNABORTED") {
            toast.error("Сервер долго отвечает. Попробуйте позже.");
            return;
        }

        const message = error.response?.data?.message || "Ошибка сервера";

        toast.error(message);
    } else if (error instanceof Error) {
        toast.error(error.message);
    } else {
        toast.error("Неизвестная ошибка");
    }
};
