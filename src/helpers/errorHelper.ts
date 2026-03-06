import { toast } from "react-toastify";

export const handleError = (error: unknown) => {
    if (error instanceof Error) {
        toast.error(error.message);
    }
};
