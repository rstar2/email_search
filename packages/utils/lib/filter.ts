export function filter<T extends Record<string, string>[]>(data: T, search: string): T {
    const query = search.toLowerCase().trim();
    if (!query) return data;
    return data.filter((item) =>
        Object.keys(data[0]).some((key) => item[key].toLowerCase().includes(query)),
    ) as T;
}
