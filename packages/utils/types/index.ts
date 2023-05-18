// ----------- Items

// a clever way to declare the fields and from them to create the type,
// thus the count of the fields can be calculated (if the type is first the it cannot)
// const result = ["name", "email", "company"] as const;
// type ResultKey = (typeof result)[number];
// type ResultType = {
//     [x in ResultKey]: string;
// };

export type Item = {
    name: string;
    email: string;
    company: string;
};

export type Items = Item[];

const fakeItem: Item = { name: "", email: "", company: "" };
export const itemKeysCount: number = Object.keys(fakeItem).length;

// ----------- Users

export type User = {
    id: string;
    name: string;
};
