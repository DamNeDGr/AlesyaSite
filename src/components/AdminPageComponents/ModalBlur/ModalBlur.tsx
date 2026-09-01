import { Modal } from "antd";
import type { ReactNode } from "react";

interface ModalBlurProps {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export const ModalBlur = ({ open, onClose, children }: ModalBlurProps) => {
    return (
        <>
            <Modal open={open} onCancel={onClose} footer={null}>
                {children}
            </Modal>
        </>
    );
};
