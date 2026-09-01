import { Form, Input, InputNumber, Button } from "antd";
import { useEffect } from "react";
import type { IService } from "@/types/services.type.ts";

type serviceForm = Omit<IService, "id">;

type Props = {
    onEdit?: (id: number, service: serviceForm) => void;
    onCreate?: (service: serviceForm) => void;
    service?: IService;
    loading?: boolean;
};

export const FormAddService = ({ onCreate, onEdit, service, loading }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!service) return;
        if (service) {
            form.setFieldsValue(service);
        }
    }, [service, form]);

    const handleSubmit = (value: serviceForm) => {
        if (onCreate) {
            onCreate?.(value);
            form.resetFields();
            return;
        }
        if (service) {
            onEdit?.(service?.id, value);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Название услуги" name="name" rules={[{ required: true, message: "Введите название услуги" }]}>
                <Input placeholder="Например: Массаж" />
            </Form.Item>

            <Form.Item
                label="Длительность (минуты)"
                name="duration"
                rules={[{ required: true, message: "Введите длительность" }]}
            >
                <InputNumber min={1} style={{ width: "100%" }} suffix={"Минуты"} />
            </Form.Item>

            <Form.Item label="Цена" name="price" rules={[{ required: true, message: "Введите цену" }]}>
                <InputNumber min={0} style={{ width: "100%" }} suffix="₽" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={loading}>
                {service ? "Изменить услугу" : "Создать услугу"}
            </Button>
        </Form>
    );
};
