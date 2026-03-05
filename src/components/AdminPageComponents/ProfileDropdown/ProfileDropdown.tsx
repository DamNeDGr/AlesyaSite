import { Button, Dropdown, Space } from "antd";
import type { ReactNode } from "react";

const items = [
    {
        label: (
            <Button href="#" color={"danger"} variant={"link"}>
                Выйти
            </Button>
        ),
        key: "3",
    },
];

interface Props {
    children: ReactNode;
}

export const ProfileDropdown = ({ children }: Props) => {
    return (
        <>
            <Dropdown menu={{ items }} trigger={["click"]}>
                <Space>
                    {children}
                </Space>
            </Dropdown>
        </>
    );
};
