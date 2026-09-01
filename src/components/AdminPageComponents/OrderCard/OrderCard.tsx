import { Card, Tag, Button, Dropdown, Space, Typography, message } from "antd";
import {
    CopyOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    PhoneOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    ScissorOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { IRecordAppointment } from "@/types/appointments.type";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { useAuthStore } from "@/store/authStore.ts";

const { Text, Title } = Typography;

interface Props {
    record: IRecordAppointment;
    onDelete: (id: number) => void;
    setEditingRecord: (r: IRecordAppointment) => void;
    setIsOpenModalEditAppoint: (v: boolean) => void;
    loading?: boolean;
}

export const OrderCard = ({ record, onDelete, setEditingRecord, setIsOpenModalEditAppoint }: Props) => {
    const user = useAuthStore((state) => state.user);
    const endTime = dayjs(record.timeStart)
        .add(record.service?.duration || 0, "minute")
        .format("HH:mm");

    const copyPhone = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(record.phone);
            } else {
                const ta = document.createElement("textarea");
                ta.value = record.phone;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
            }
            message.success("Телефон скопирован");
        } catch {
            message.error("Не удалось скопировать");
        }
    };

    const items = [
        {
            key: "edit",
            label: (
                <Space>
                    <EditOutlined />
                    Изменить
                </Space>
            ),
        },
        ...(user?.role === "ADMIN"
            ? [
                  {
                      key: "delete",
                      label: (
                          <Space>
                              <DeleteOutlined />
                              Удалить
                          </Space>
                      ),
                      danger: true,
                  },
              ]
            : []),
    ];
    return (
        <Card
            size="small"
            style={{
                marginBottom: 12,
                borderRadius: 12,
                overflow: "hidden",
            }}
            styles={{
                header: {
                    padding: "12px 16px",
                },
                body: { padding: 16 },
            }}
            title={
                <Space direction="vertical" size={2}>
                    <Title level={5} style={{ margin: 0 }}>
                        {record.name}
                    </Title>
                    <Text type="secondary">
                        <ScissorOutlined /> {record.service?.name}
                    </Text>
                </Space>
            }
            extra={<StatusBadge status={record.status} />}
        >
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
                {/* телефон */}
                <Space onClick={copyPhone} style={{ cursor: "pointer", justifyContent: "space-between", width: "100%" }}>
                    <Space>
                        <PhoneOutlined />
                        <Text>{record.phone}</Text>
                    </Space>
                    <CopyOutlined />
                </Space>

                {/* дата */}
                <Space>
                    <CalendarOutlined />
                    <Text>{dayjs(record.date).format("D MMMM YYYY")}</Text>
                </Space>

                {/* время */}
                <Space>
                    <ClockCircleOutlined />
                    <Text>
                        {dayjs(record.timeStart).format("HH:mm")} — {endTime}
                    </Text>
                </Space>

                {/* цена */}
                <Text strong style={{ fontSize: 16 }}>
                    {record.service?.price} ₽
                </Text>

                {/* статус оплаты */}
                {record.payStatus ? (
                    <Tag color="success" icon={<CheckCircleOutlined />}>
                        ОПЛАЧЕНО
                    </Tag>
                ) : (
                    <Tag color="error" icon={<CloseCircleOutlined />}>
                        НЕ ОПЛАЧЕНО
                    </Tag>
                )}

                {/* действия */}
                <Dropdown
                    menu={{
                        items,
                        onClick: ({ key }) => {
                            if (key === "edit") {
                                setEditingRecord(record);
                                setIsOpenModalEditAppoint(true);
                            }
                            if (key === "delete") {
                                onDelete(record.id);
                            }
                        },
                    }}
                    trigger={["click"]}
                >
                    <Button block type="primary">
                        Действия
                    </Button>
                </Dropdown>
            </Space>
        </Card>
    );
};
