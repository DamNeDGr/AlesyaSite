import { Form, Input, Select, DatePicker, TimePicker, Button, Flex } from "antd";
import type { IService } from "@/types/services.type.ts";
import type { IAppointment, TAppointmentForm } from "@/types/appointments.type.ts";
import dayjs from "dayjs";
import { Navigate } from "react-router";

type CreateAppointmentDTO = Omit<IAppointment, "id">;

type Props = {
    services: IService[];
    onCreate: (data: CreateAppointmentDTO) => void;
};

export const FormAdd = ({ services, onCreate }: Props) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: TAppointmentForm) => {
        const data: Omit<IAppointment, "id"> = {
            ...values,
            date: values.date.format("YYYY-MM-DD"),
            timeStart: values.timeStart.format(),
            status: "pending",
        };

        onCreate(data);
        form.resetFields();
    };

    if (services.length === 0) return <Navigate to={"/services"} />;

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
                    <DatePicker
                        style={{ width: "100%" }}
                        format={"DD.MM.YYYY"}
                        disabledDate={(current) =>
                            current && (current < dayjs().startOf("day") || current > dayjs().add(40, "day").endOf("day"))
                        }
                    />
                </Form.Item>

                <Form.Item label="Время" name="timeStart" rules={[{ required: true, message: "Выберите время" }]}>
                    <TimePicker
                        format="HH:mm"
                        style={{ width: "100%" }}
                        minuteStep={10}
                        disabledTime={() => ({
                            disabledHours: () => [
                                ...Array.from({ length: 9 }, (_, i) => i),
                                ...Array.from({ length: 3 }, (_, i) => i + 21),
                            ],
                            disabledMinutes: (hour) => {
                                if (hour === 20) {
                                    return [30];
                                }
                                return [];
                            },
                        })}
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Добавить запись
                </Button>
            </Form>
        </Flex>
    );
};
