import { Modal, Button } from "@mantine/core";

import { useAuthStore } from "@/state/auth";

type LoginDialog = {
    opened: boolean;
    onClose: () => void;
};
export default function LoginDialog({ opened, onClose }: LoginDialog) {
    const login = useAuthStore((state) => state.login);

    function onLogin() {
        onClose();
        login("rumen1", "123456");
    }
    return (
        <Modal opened={opened} onClose={onClose} title="Login" centered>
            <Button onClick={onLogin}>Login</Button>
        </Modal>
    );
}
