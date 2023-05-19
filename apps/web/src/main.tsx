import React from "react";
import ReactDOM from "react-dom/client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import App from "./App";
import theme from "./theme";
import { CacheProvider } from "./cache";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <CacheProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
                <Notifications />
                <App />
            </MantineProvider>
        </CacheProvider>
    </React.StrictMode>,
);
