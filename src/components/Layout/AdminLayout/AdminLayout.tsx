import { Layout, theme } from "antd";
import { Outlet } from "react-router";
const { Content } = Layout;

export const AdminLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: "100dvh",
                backgroundColor: "black",
            }}
        >
            <Layout>
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
