import { Form, Input, InputNumber, Button } from "antd";
import { useEffect } from "react";
import type { IService } from "@/types/services.type.ts";

type serviceForm = Omit<IService, "id">;

type Props = {
    // eslint-disable-next-line no-unused-vars
    onEdit?: (service: serviceForm, id: number) => void;
    // eslint-disable-next-line no-unused-vars
    onCreate?: (service: serviceForm) => void;
    service?: IService;
};

export const FormAddService = ({ onCreate, onEdit, service }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
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
            onEdit?.(value, service?.id);
            form.resetFields();
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

            <Button type="primary" htmlType="submit" block>
                {service ? "Изменить услугу" : "Создать услугу"}
            </Button>
        </Form>
    );
};
