import React from "react";
import ReactDOM from "react-dom/client";

import { MantineProvider } from "@mantine/core";

import App from "./App";
import theme from "./theme";
import { CacheProvider } from "./cache";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <CacheProvider>
                <App />
            </CacheProvider>
        </MantineProvider>
    </React.StrictMode>,
);
