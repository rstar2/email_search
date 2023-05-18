import axios, { InternalAxiosRequestConfig } from "axios";

import config from "@/config";
import { getAuthStore } from "@/state/auth";

const httpApi = axios.create({
    baseURL: `${config.apiUrl}`,
});

// add the auth token to each request
httpApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // get on the fly
    const token = getAuthStore().authToken;

    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: token && `Bearer ${token}`,
        },
    } as InternalAxiosRequestConfig;
});

export async function search(query: string) {
    const { data } = await httpApi.get(
        "/search" + (query ? `?query=${encodeURIComponent(query)}` : ""),
    );
    return data;
}
