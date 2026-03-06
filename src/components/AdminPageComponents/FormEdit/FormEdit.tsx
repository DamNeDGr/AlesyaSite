import { Form, Input, Select, DatePicker, TimePicker, Button, Flex } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import type { IAppointment, IRecordAppointment, TAppointmentForm } from "@/types/appointments.type.ts";
import type { IService } from "@/types/services.type.ts";

type formAppointmentsType = Omit<IRecordAppointment, "id" | "service">;

type Props = {
    services: IService[];
    onEdit: (data: formAppointmentsType, id: number) => void;
    data: IRecordAppointment;
    loading?: boolean;
};

const STATUS_OPTIONS = [
    { value: "pending", label: "Ожидание" },
    { value: "success", label: "Подтвержден" },
    { value: "canceled", label: "Отменен" },
    { value: "banned", label: "Черный список" },
];

export const FormEdit = ({ services, onEdit, data, loading }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
                date: dayjs(data.date),
                timeStart: dayjs(data.timeStart),
            });
        }
    }, [data, form]);

    const handleSubmit = (values: TAppointmentForm) => {
        const payload: Omit<IAppointment, "id"> = {
            ...values,
            date: values.date.format("YYYY-MM-DD"),
            timeStart: values.timeStart.format(),
        };

        onEdit(payload, data.id);
        form.resetFields();
    };

    return (
        <Flex
            style={{
                width: "100%",
                padding: "15px 10px",
            }}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ width: "100%" }}>
                <Form.Item label="Имя" name="name" rules={[{ required: true, message: "Введите имя" }]}>
                    <Input placeholder="Имя клиента" />
                </Form.Item>

                <Form.Item label="Телефон" name="phone" rules={[{ required: true, message: "Введите телефон" }]}>
                    <Input placeholder="+7..." />
                </Form.Item>

                <Form.Item label="Услуга" name="serviceId" rules={[{ required: true, message: "Выберите услугу" }]}>
                    <Select
                        placeholder="Выберите услугу"
                        options={services.map((s) => ({
                            label: s.name,
                            value: s.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item label="Дата" name="date" rules={[{ required: true, message: "Выберите дату" }]}>
                    <DatePicker style={{ width: "100%" }} format={"DD.MM.YYYY"} />
                </Form.Item>

                <Form.Item label="Время" name="timeStart" rules={[{ required: true, message: "Выберите время" }]}>
                    <TimePicker format="HH:mm" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Статус" name="status" rules={[{ required: true, message: "Выберите статус" }]}>
                    <Select placeholder="Выберите статус" options={STATUS_OPTIONS} />
                </Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Изменить запись
                </Button>
            </Form>
        </Flex>
    );
};
