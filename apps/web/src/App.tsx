import { useState, useEffect } from "react";
import { Flex, Container, Header, Stack, ThemeIcon, Title, Text } from "@mantine/core";
import { useLogger, useDisclosure } from "@mantine/hooks";
import { IconLogin, IconLogout } from "@tabler/icons-react";

import { createLogger } from "utils";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { LoginDialog, Search, Results } from "@/components";
import { useSearch } from "@/cache/search";
import { useAuthStore } from "@/state/auth";

const logger = createLogger("App");

function App() {
    const [openedLoginDialog, handlersLoginDialog] = useDisclosure(false);

    const [query, setQuery] = useState<string>();
    const { isInitialLoading, isError, data } = useSearch(query);

    const isAuth = useAuthStore((state) => state.isAuth);
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        if (!isAuth) setQuery(undefined);
    }, [isAuth]);

    useLogger("App", [isInitialLoading, isError, !!data]);

    function onSearch(query: string) {
        logger.log(`Search with ${query}`);
        setQuery(query);
    }

    return (
        <>
            <LoginDialog opened={openedLoginDialog} onClose={handlersLoginDialog.close} />

            <Stack h="100%">
                <Header height="auto">
                    <Flex justify={"space-around"}>
                        <Title>Email Searcher</Title>
                        <Flex align="center">
                            <Text>{isAuth ? "Logout" : "Login"}</Text>
                            <ThemeIcon
                                ml="xs"
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (isAuth) logout();
                                    else handlersLoginDialog.open();
                                }}
                            >
                                {isAuth ? <IconLogout /> : <IconLogin />}
                            </ThemeIcon>
                        </Flex>
                    </Flex>
                </Header>
                <Container
                    sx={{
                        overflow: "hidden",
                    }}
                >
                    {isAuth && (
                        <Stack h="100%" justify="flex-start" align="center">
                            <Search disabled={isInitialLoading} onAction={onSearch} />
                            {isError ? (
                                "Search failed"
                            ) : isInitialLoading ? (
                                "Searching..."
                            ) : data ? (
                                <Results data={data} />
                            ) : undefined}
                        </Stack>
                    )}
                </Container>
            </Stack>
        </>
    );
}

export default App;
