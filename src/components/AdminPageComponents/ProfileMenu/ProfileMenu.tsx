import { Avatar, Button, Flex } from "antd";
import { ProfileDropdown } from "@/components/AdminPageComponents/ProfileDropdown";
import { useAuthStore } from "@/store/authStore.ts";

interface ProfileMenuProps {
    title: string;
    btnTitle: string;
    openAppoint: () => void;
    isMobile: boolean;
}

export const ProfileMenu = ({ title, btnTitle, openAppoint, isMobile }: ProfileMenuProps) => {
    const user = useAuthStore((state) => state.user);
    return (
        <>
            <Flex
                style={{
                    padding: "5px 0",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <h2
                        style={{
                            fontSize: isMobile ? "16px" : "26px",
                            marginBottom: 0,
                        }}
                    >
                        {title}
                    </h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                    }}
                >
                    <Button
                        style={{
                            fontSize: isMobile ? "12px" : "16px",
                        }}
                        onClick={openAppoint}
                    >
                        {btnTitle}
                    </Button>
                    <ProfileDropdown>
                        {user && (
                            <Avatar style={{ backgroundColor: "blue", verticalAlign: "middle" }} size="large" gap={3}>
                                {user?.username.slice(0, 1).toUpperCase()}
                            </Avatar>
                        )}
                    </ProfileDropdown>
                </div>
            </Flex>
        </>
    );
};
