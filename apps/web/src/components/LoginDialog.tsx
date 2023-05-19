import { Modal, Button, TextInput, Stack } from "@mantine/core";
import { useValidatedState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import { useAuthStore } from "@/state/auth";

type LoginDialog = {
    opened: boolean;
    onClose: () => void;
};
export default function LoginDialog({ opened, onClose }: LoginDialog) {
    const login = useAuthStore((state) => state.login);

    const [{ value: name, valid: isValidName }, setName] = useValidatedState(
        "",
        (val) => /^\S+$/.test(val),
        true,
    );
    const [{ value: password, valid: isValidPassword }, setPassword] = useValidatedState(
        "",
        (val) => /^\S+$/.test(val),
        true,
    );

    async function onLogin() {
        onClose();
        try {
            await login(name, password);
            notifications.show({ color: "green", message: "Logged in" });
        } catch (e) {
            notifications.show({ color: "red", message: "Failed to log in" });
        }
    }
    return (
        <Modal opened={opened} onClose={onClose} title="Login" centered>
            <Stack>
                <TextInput
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    withAsterisk
                    error={!isValidName}
                    placeholder="Name"
                    label="Your name"
                />

                <TextInput
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    withAsterisk
                    error={!isValidPassword}
                    placeholder="Password"
                    label="Your password"
                    type="password"
                />

                <Button
                    onClick={onLogin}
                    disabled={!name || !isValidName || !password || !isValidPassword}
                >
                    Login
                </Button>
            </Stack>
        </Modal>
    );
}
