import dayjs from "dayjs";

import { Button, Dropdown, Input, Modal, Popconfirm, Table } from "antd";
import { useMemo } from "react";
import { StatusBadge } from "../StatusBadge/StatusBadge.tsx";
import type { ColumnsType } from "antd/es/table";
import { isAdmin } from "@/Pages/AdminPage/AdminPage.tsx";

type TService = {
    id: string;
    name: string;
    duration: number;
};

type Status = "success" | "pending" | "canceled" | "banned";

export type RecordType = {
    id: string;
    name: string;
    phone: string;
    date: string;
    timeStart: string;
    status: Status;
    service: TService;
};

type DataTableProps = {
    dataSource: RecordType[];
    services: TService[];
    loading: boolean;
    onDelete: (id: number) => void;
    setEditingRecord: (record: RecordType) => void;
    setIsOpenModalEditAppoint: (isOpen: boolean) => void;
};

export const DataTable = ({
    dataSource,
    services,
    loading,
    onDelete,
    setEditingRecord,
    setIsOpenModalEditAppoint,
}: DataTableProps) => {
    const adminActions = [
        {
            key: "edit",
            label: (
                <Button color={"primary"} variant={"solid"} style={{ width: "100%" }}>
                    Изменить
                </Button>
            ),
        },
        {
            key: "delete",
            label: (
                <Button color="danger" variant="solid" style={{ width: "100%" }}>
                    Удалить
                </Button>
            ),
        },
    ];
    const moderatorActions = [
        {
            key: "edit",
            label: (
                <Button color={"primary"} variant={"solid"} style={{ width: "100%" }}>
                    Изменить
                </Button>
            ),
        },
    ];
    const columns: ColumnsType<RecordType> = useMemo(
        () => [
            {
                title: "Имя",
                dataIndex: "name",
                key: "name",
                align: "center",
                filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                    <div
                        style={{
                            padding: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Input
                            placeholder="Поиск"
                            value={selectedKeys[0]}
                            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={confirm}
                            style={{ marginBottom: 8, display: "block" }}
                        />
                        <div
                            style={{
                                width: "100%",
                                paddingTop: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                            }}
                        >
                            <Button style={{ width: "50%" }} type="primary" onClick={confirm} size="small">
                                Найти
                            </Button>
                            <Button
                                style={{ width: "50%" }}
                                onClick={() => {
                                    clearFilters();
                                    confirm();
                                }}
                                size="small"
                            >
                                Сбросить
                            </Button>
                        </div>
                    </div>
                ),
                onFilter: (value: string, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            },
            {
                title: "Телефон",
                dataIndex: "phone",
                key: "phone",
                align: "center",
                render: (text) => {
                    return (
                        <p style={{ cursor: "pointer" }} onClick={() => navigator.clipboard.writeText(text)}>
                            {text}
                        </p>
                    );
                },
            },
            {
                title: "Услуга",
                dataIndex: ["service", "name"],
                key: "service",
                align: "center",
                filters: services.map((service) => ({
                    text: service.name,
                    value: service.id,
                })),
                onFilter: (value, record) => record.service.id === value,
            },
            {
                title: "Цена",
                dataIndex: ["service", "price"],
                key: "service",
                align: "center",
                render: (price) => <p>{price} ₽</p>
            },
            {
                title: "Дата записи",
                dataIndex: "date",
                key: "date",
                align: "center",
                sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
                render: (date) => <p>{dayjs(date)?.format("D MMMM YYYY") || "none"}</p>,
            },
            {
                title: "Время",
                dataIndex: "time",
                key: "time",
                align: "center",
                children: [
                    {
                        title: "Начало занятия",
                        dataIndex: "timeStart",
                        key: "timeStart",
                        align: "center",
                        render: (timeStart) => <p>{dayjs(timeStart)?.format("HH:mm")}</p>,
                    },
                    {
                        title: "Конец занятия",
                        align: "center",
                        key: "timeEnd",
                        render: (_, record) => {
                            const endAt = dayjs(record.timeStart).add(record.service?.duration || 0, "minute");
                            return <p>{dayjs(endAt)?.format("HH:mm")}</p>;
                        },
                    },
                ],
            },
            {
                title: "Статус",
                dataIndex: "status",
                key: "status",
                filters: [
                    { text: "Подтвержден", value: "success" },
                    { text: "Ожидание", value: "pending" },
                    { text: "Отменен", value: "canceled" },
                    { text: "Черный список", value: "banned" },
                ],
                onFilter: (value, record) => record.status === value,
                align: "center",
                render: (status) => <StatusBadge status={status} />,
            },
            {
                title: "Действия",
                key: "actions",
                align: "center",
                render: (_, record) => (
                    <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                        <Dropdown
                            menu={{
                                items: isAdmin ? adminActions : moderatorActions,
                                onClick: ({ key }) => {
                                    if (key === "edit") {
                                        setEditingRecord(record);
                                        setIsOpenModalEditAppoint(true);
                                    }

                                    if (key === "delete") {
                                        Modal.confirm({
                                            title: "Удалить услугу?",
                                            okText: "Да",
                                            cancelText: "Нет",
                                            onOk: () => onDelete(Number(record.id)),
                                        });
                                    }
                                },
                            }}
                            placement="bottom"
                            trigger={["click"]}
                        >
                            <Button>Действия</Button>
                        </Dropdown>
                    </div>
                ),
            },
        ],
        [services],
    );

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource || []}
                rowKey="id"
                size={"middle"}
                loading={loading}
                pagination={{
                    defaultPageSize: 10,
                    pageSizeOptions: ["5", "10", "20"],
                    showSizeChanger: true,
                }}
            />
        </>
    );
};
