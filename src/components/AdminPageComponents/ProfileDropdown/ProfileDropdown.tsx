import { Button, Dropdown, Space } from "antd";
import type { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore.ts";

interface Props {
    children: ReactNode;
}

export const ProfileDropdown = ({ children }: Props) => {
    const logout = useAuthStore((state) => state.logout);
    const items = [
        {
            label: (
                <Button onClick={logout} color={"danger"} variant={"link"}>
                    Выйти
                </Button>
            ),
            key: "3",
        },
    ];
    return (
        <>
            <Dropdown menu={{ items }} trigger={["click"]}>
                <Space>{children}</Space>
            </Dropdown>
        </>
    );
};
