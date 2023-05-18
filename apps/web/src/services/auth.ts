import axios from "axios";

import config from "@/config";

const httpApi = axios.create({
    baseURL: `${config.authUrl}`,
});

export async function login(name: string, password: string) {
    const { data } = await httpApi.post("/login", {
        name,
        password,
    });

    return data.token as string;
}

export async function logout() {
    // nothing for now
}
