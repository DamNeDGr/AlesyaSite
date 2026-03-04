import { Tag } from "antd";

interface IStatusConfig {
    success: {
        label: string;
        color: "green";
    };
    pending: {
        label: string;
        color: "gold";
    };
    canceled: {
        label: string;
        color: "volcano";
    };
    banned: {
        label: string;
        color: "red";
    };
}

const STATUS_CONFIG: IStatusConfig = {
    success: {
        label: "ПОДТВЕРЖДЕН",
        color: "green",
    },
    pending: {
        label: "ОЖИДАНИЕ",
        color: "gold",
    },
    canceled: {
        label: "ОТМЕНЕН",
        color: "volcano",
    },
    banned: {
        label: "ЧЕРНЫЙ СПИСОК",
        color: "red",
    },
};

type Status = "success" | "pending" | "canceled" | "banned";

interface IStatusBadgeProps {
    status: Status;
}

export const StatusBadge = ({ status }: IStatusBadgeProps) => {
    const config = STATUS_CONFIG[status];
    if (!config) {
        return <Tag color={"cyan"}>{status}</Tag>;
    }
    return <Tag color={config.color}>{config.label}</Tag>;
};
