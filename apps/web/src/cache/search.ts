import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { Items } from "utils";
import { search } from "@/services/search";

export function useSearch(query?: string): UseQueryResult<Items | undefined> {
    return useQuery({
        queryKey: ["search", query],
        queryFn: async () => {
            return await search(query!);
        },
        enabled: query !== undefined,
    });
}
