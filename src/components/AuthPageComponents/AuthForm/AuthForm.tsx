import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Loader } from "@/components/HomePageComponents/Loader";

interface LoginFormValues {
    username: string;
    password: string;
}

export const AuthForm = () => {
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const navigate = useNavigate();

    const onFinish = async (values: LoginFormValues) => {
        try {
            await login(values.username, values.password);
            toast.success("Успешная авторизация");
            navigate("/admin");
        } catch (error) {
            toast.error("Неверный логин или пароль");
        }
    };

    const onFinishFailed = () => {
        toast.error("Проверьте поля формы");
    };

    if (loading) return <Loader />;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#10111a",
            }}
        >
            <Card title="Авторизация" style={{ width: 350 }}>
                <Form<LoginFormValues> name="login" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="Имя пользователя" name="username" rules={[{ required: true, message: "Введите username" }]}>
                        <Input prefix={<UserOutlined />} placeholder="username..." />
                    </Form.Item>

                    <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Введите пароль" }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="Введите пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
