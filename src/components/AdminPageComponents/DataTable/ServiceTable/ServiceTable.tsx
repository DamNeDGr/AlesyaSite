import { Table, Button, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { isAdmin } from "@/Pages/AdminPage/AdminPage.tsx";
import type { IService } from "@/types/services.type.ts";

type Props = {
    services: IService[];
    loading?: boolean;
    onEdit: (service: IService) => void;
    onDelete: (id: number) => void;
    openEdit: () => void;
};

export const ServiceTable = ({ services, loading, onEdit, onDelete, openEdit }: Props) => {
    const columns: ColumnsType<IService> = [
        {
            title: "Название",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Длительность",
            dataIndex: "duration",
            key: "duration",
            align: "center",
            render: (duration: number) => `${duration} мин`,
        },
        {
            title: "Цена",
            dataIndex: "price",
            key: "price",
            align: "center",
            sorter: (a, b) => a.duration - b.duration,
            render: (price: number) => `${price} ₽`,
        },
        {
            title: "Действия",
            key: "actions",
            align: "center",
            render: (_, record) =>
                isAdmin ? (
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                onEdit(record);
                                openEdit();
                            }}
                        >
                            Изменить
                        </Button>

                        <Popconfirm title="Удалить услугу?" onConfirm={() => onDelete(record.id)} okText="Да" cancelText="Нет">
                            <Button danger>Удалить</Button>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Button
                        type="primary"
                        onClick={() => {
                            onEdit(record);
                            openEdit();
                        }}
                    >
                        Изменить
                    </Button>
                ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={services}
            rowKey="id"
            loading={loading}
            pagination={{
                pageSize: 10,
            }}
        />
    );
};
