import { create } from "zustand";
import computed from "zustand-computed";

import { login, logout } from "@/services/auth";

type AuthStore = {
    authToken?: string;
    login: (name: string, password: string) => void;
    logout: () => void;
};

type AuthStoreComputed = {
    isAuth: boolean;
};

const AUTH_TOKEN = "auth_token";

const useAuthStore = create<AuthStore>()(
    computed(
        (set) => ({
            authToken: localStorage.getItem(AUTH_TOKEN) ?? undefined,

            login: async (name: string, password: string) => {
                const token = await login(name, password);
                set(() => ({ authToken: token }));
                localStorage.setItem(AUTH_TOKEN, token);
            },
            logout: async () => {
                await logout();
                set({ authToken: undefined });
                localStorage.removeItem(AUTH_TOKEN);
            },
        }),
        (state: AuthStore): AuthStoreComputed => ({
            isAuth: !!state.authToken,
        }),
    ),
);

export { useAuthStore };

/**
 * For usage outside of React Components
 */
export const getAuthStore = () => useAuthStore.getState();
