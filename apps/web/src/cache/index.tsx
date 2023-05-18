import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // default is 0
            staleTime: 3000, // 3 seconds, to "combine" simultaneous same requests from different components, on same "screen"

            // Specifying a longer staleTime means queries will not refetch their data as often
            // Infinity will mean that queries never get stale (always stay fresh),
            // so they are not re-fetched id there's data in the cache for the same key
            //staleTime: Infinity,

            refetchOnWindowFocus: true,
        },
    },
});

/**
 * The cache react-query provider component.
 * Any component that will use any of the cache hooks must be whapped in such a provider component.
 */
export const CacheProvider: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
