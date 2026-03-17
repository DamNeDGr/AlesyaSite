import { Card, Button, Dropdown, Space, Typography } from "antd";
import { EditOutlined, DeleteOutlined, ClockCircleOutlined } from "@ant-design/icons";
import type { IService } from "@/types/services.type";

const { Title, Text } = Typography;

interface Props {
    service: IService;
    onEdit: (service: IService) => void;
    openEdit: () => void;
    onDelete: (id: number) => void;
    loading?: boolean;
}

export const ServiceCard = ({ service, onEdit, openEdit, onDelete }: Props) => {
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
        {
            key: "delete",
            danger: true,
            label: (
                <Space>
                    <DeleteOutlined />
                    Удалить
                </Space>
            ),
        },
    ];

    return (
        <Card
            size="small"
            style={{
                marginBottom: 12,
                borderRadius: 12,
            }}
            styles={{
                header: {
                    padding: "12px 16px",
                },
                body: {
                    padding: 16,
                },
            }}
            title={
                <Title level={5} style={{ margin: 0 }}>
                    {service.name}
                </Title>
            }
        >
            <Space orientation="vertical" size={8} style={{ width: "100%" }}>
                <Text strong style={{ fontSize: 18 }}>
                    {service.price} ₽
                </Text>

                <Space>
                    <ClockCircleOutlined />
                    <Text type="secondary">{service.duration} минут</Text>
                </Space>

                <Dropdown
                    menu={{
                        items,
                        onClick: ({ key }) => {
                            if (key === "edit") {
                                onEdit(service);
                                openEdit();
                            }

                            if (key === "delete") {
                                onDelete(service.id);
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
