import { Breadcrumb, Layout, theme } from "antd";
import { ProfileMenu } from "@/components/AdminPageComponents/ProfileMenu";
import { Link, Outlet } from "react-router";
const { Header, Content } = Layout;

export const AdminLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <ProfileMenu />
                </Header>
                <Breadcrumb
                    style={{
                        marginLeft: "20px",
                        padding: "5px 0",
                    }}
                    separator=">"
                    items={[
                        {
                            key: 1,
                            title: <Link to={"/"}>Главная</Link>,
                        },
                        {
                            key: 2,
                            title: "Список клиентов",
                        },
                    ]}
                />
                <Content
                    style={{
                        margin: "10px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
