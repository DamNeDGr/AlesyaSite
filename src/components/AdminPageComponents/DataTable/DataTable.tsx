import dayjs from "dayjs";

import { App as AntApp, Tag } from "antd";

import { Button, Dropdown, Input, message, Table } from "antd";
import { useMemo } from "react";
import { StatusBadge } from "../StatusBadge/StatusBadge.tsx";
import type { ColumnsType } from "antd/es/table";
import { isAdmin } from "@/Pages/AdminPage/AdminPage.tsx";
import { CheckCircleOutlined, CloseCircleOutlined, CopyOutlined } from "@ant-design/icons";
import { type IRecordAppointment } from "@/types/appointments.type.ts";
import type { IService } from "@/types/services.type.ts";

type DataTableProps = {
    dataSource: IRecordAppointment[] | undefined;
    services: IService[];
    isLoading: boolean;
    loading?: boolean;
    onDelete: (id: number) => void;
    setEditingRecord: (record: IRecordAppointment) => void;
    setIsOpenModalEditAppoint: (isOpen: boolean) => void;
};

export const DataTable = ({
    dataSource,
    services,
    loading,
    isLoading,
    onDelete,
    setEditingRecord,
    setIsOpenModalEditAppoint,
}: DataTableProps) => {
    const { modal } = AntApp.useApp();
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
                <Button color="danger" variant="solid" style={{ width: "100%" }} loading={loading}>
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
    const columns: ColumnsType<IRecordAppointment> = useMemo(
        () => [
            {
                title: "№",
                render: (_: unknown, __: unknown, index: number) => index + 1,
                width: 70,
                align: "center",
            },
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
                            onPressEnter={() => confirm()}
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
                            <Button style={{ width: "50%" }} type="primary" onClick={() => confirm()} size="small">
                                Найти
                            </Button>
                            <Button
                                style={{ width: "50%" }}
                                onClick={() => {
                                    if (clearFilters) {
                                        clearFilters();
                                    }
                                    confirm();
                                }}
                                size="small"
                            >
                                Сбросить
                            </Button>
                        </div>
                    </div>
                ),
                onFilter: (value, record) => record.name.toLowerCase().includes(String(value).toLowerCase()),
            },
            {
                title: "Телефон",
                dataIndex: "phone",
                key: "phone",
                align: "center",
                render: (text: string) => (
                    <span
                        style={{ cursor: "pointer", display: "flex", gap: 6, justifyContent: "center" }}
                        onClick={() => {
                            void navigator.clipboard.writeText(text);
                            void message.success("Телефон скопирован");
                        }}
                    >
                        {text} <CopyOutlined />
                    </span>
                ),
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
                onFilter: (value, record) => record.service.id === Number(value),
            },
            {
                title: "Цена",
                dataIndex: ["service", "price"],
                key: "service",
                align: "center",
                render: (price) => <span>{price} ₽</span>,
            },
            {
                title: "Дата записи",
                dataIndex: "date",
                key: "date",
                align: "center",
                sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
                render: (date) => <span>{dayjs(date)?.format("D MMMM YYYY") || "none"}</span>,
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
                        render: (timeStart) => <span>{dayjs(timeStart)?.format("HH:mm")}</span>,
                    },
                    {
                        title: "Конец занятия",
                        align: "center",
                        key: "timeEnd",
                        render: (_, record) => {
                            const endAt = dayjs(record.timeStart).add(record.service?.duration || 0, "minute");
                            return <span>{dayjs(endAt)?.format("HH:mm")}</span>;
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
                title: "Статус оплаты",
                dataIndex: "payStatus",
                key: "payStatus",
                align: "center",
                sorter: (a, b) => Number(a.payStatus) - Number(b.payStatus),
                render: (statusPay) =>
                    statusPay ? (
                        <Tag color={"success"} variant={"outlined"} icon={<CheckCircleOutlined />}>
                            ОПЛАЧЕНО
                        </Tag>
                    ) : (
                        <Tag color={"error"} variant={"outlined"} icon={<CloseCircleOutlined />}>
                            НЕ ОПЛАЧЕНО
                        </Tag>
                    ),
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
                                        modal.confirm({
                                            title: "Удалить услугу?",
                                            okText: "Да",
                                            cancelText: "Нет",
                                            width: 200,
                                            onOk: () => onDelete(record.id),
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
        [services, modal, onDelete, setEditingRecord, setIsOpenModalEditAppoint, adminActions, moderatorActions],
    );

    return (
        <>
            <Table<IRecordAppointment>
                columns={columns}
                dataSource={dataSource}
                rowKey="id"
                size={"middle"}
                loading={isLoading}
                pagination={{
                    defaultPageSize: 10,
                    pageSizeOptions: ["5", "10", "20"],
                    showSizeChanger: true,
                }}
            />
        </>
    );
};
