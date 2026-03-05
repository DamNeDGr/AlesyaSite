import { Form, Input, InputNumber, Button } from "antd";
import { useEffect } from "react";

type Service = {
    id?: number;
    name: string;
    duration: number;
    price: number;
};

type Props = {
    onSubmit: (data, serviceId: number) => void;
    service?: Service;
};

export const FormAddService = ({ onSubmit, service }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (service) {
            form.setFieldsValue(service);
        }
    }, [service]);

    const handleSubmit = (values) => {
        onSubmit(values, Number(service.id));
        form.resetFields();
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
                <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Цена" name="price" rules={[{ required: true, message: "Введите цену" }]}>
                <InputNumber min={0} style={{ width: "100%" }} addonAfter="₽" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
                {service ? "Изменить услугу" : "Создать услугу"}
            </Button>
        </Form>
    );
};
