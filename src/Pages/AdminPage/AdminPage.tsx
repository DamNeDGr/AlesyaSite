import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/AdminPageComponents/DataTable/DataTable.tsx";

export const AdminPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [services, setServices] = useState([]);
    const GetData = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/appointments?_expand=service");
            if (!res.ok) {
                throw new Error("Ошибка получения данных о клиентах");
            }
            const data = await res.json();
            setDataSource(data);
        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };
    const GetServices = async () => {
        try {
            const res = await fetch("http://localhost:3001/services");
            if (!res.ok) {
                throw new Error("Ошибка получения данных о услугах");
            }
            const services = await res.json();
            setServices(services);
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };
    useEffect(() => {
        GetServices();
        GetData();
    }, []);
    return (
        <>
            <DataTable dataSource={dataSource} services={services} loading={loading} />
        </>
    );
};
