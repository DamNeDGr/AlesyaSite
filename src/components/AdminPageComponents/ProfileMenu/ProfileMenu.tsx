import { Avatar, Button, Flex } from "antd";
import { ProfileDropdown } from "@/components/AdminPageComponents/ProfileDropdown";

interface ProfileMenuProps {
    title: string;
    btnTitle: string;
    openAppoint: () => void;
}

export const ProfileMenu = ({ title, btnTitle, openAppoint }: ProfileMenuProps) => {
    return (
        <>
            <Flex
                style={{
                    padding: "5px 0",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <h2>{title}</h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                    }}
                >
                    <Button onClick={openAppoint}>{btnTitle}</Button>
                    <ProfileDropdown>
                        <Avatar
                            style={{ cursor: "pointer" }}
                            src={
                                <img
                                    draggable={false}
                                    src={"https://avatars.githubusercontent.com/u/194438934?v=4&size=64"}
                                    alt="avatar"
                                />
                            }
                        />
                    </ProfileDropdown>
                </div>
            </Flex>
        </>
    );
};
