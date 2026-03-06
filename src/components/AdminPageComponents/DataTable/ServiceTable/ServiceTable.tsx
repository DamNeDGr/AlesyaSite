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

const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins} мин`;
    if (mins === 0) return `${hours} ч`;

    return `${hours} ч ${mins} мин`;
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
            render: (duration: number) => formatDuration(duration),
        },
        {
            title: "Цена",
            dataIndex: "price",
            key: "price",
            align: "center",
            sorter: (a, b) => a.duration - b.duration,
            render: (price: number) => `${new Intl.NumberFormat("ru-RU").format(price)} ₽`,
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
