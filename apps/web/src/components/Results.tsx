import { useMemo, useState } from "react";
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    rem,
} from "@mantine/core";
import { IconSelector, IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import { Item, Items, itemKeysCount } from "utils";

const useStyles = createStyles((theme) => ({
    thead: {
        position: "sticky",
        top: 0,
        backgroundColor:
            //   theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
            theme.colors[theme.primaryColor][8],
        transition: "box-shadow 150ms ease",
    },
    theadScrolled: {
        // add shadow for light theme (and custom for dark)
        boxShadow: theme.colorScheme === "light" ? theme.shadows.md : theme.shadows.dark,
    },

    th: {
        padding: "0 !important",
    },

    control: {
        width: "100%",
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: rem(21),
        height: rem(21),
        borderRadius: rem(21),
    },
}));

type TableSortProps = {
    data: Items;
};

type ThProps = {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
};

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size="0.9rem" stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

function sortData(data: Items, payload: { sortBy: keyof Item | null; reversed: boolean }) {
    const { sortBy } = payload;

    if (!sortBy) {
        return data;
    }

    return [...data].sort((a, b) => {
        if (payload.reversed) {
            return b[sortBy].localeCompare(a[sortBy]);
        }

        return a[sortBy].localeCompare(b[sortBy]);
    });
}

export default function Results({ data }: TableSortProps) {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [sortBy, setSortBy] = useState<keyof Item | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const sortedData = useMemo(() => {
        return sortData(data, { sortBy, reversed: reverseSortDirection });
    }, [data, sortBy, reverseSortDirection]);

    const setSorting = (field: keyof Item) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
    };

    const rows = sortedData.map((row) => (
        <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.company}</td>
        </tr>
    ));

    return (
        <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y > 0)}>
            <Table
                highlightOnHover
                horizontalSpacing="md"
                verticalSpacing="xs"
                miw={700}
                sx={{ tableLayout: "fixed" }}
            >
                <thead className={cx(classes.thead, scrolled && classes.theadScrolled)}>
                    <tr>
                        <Th
                            sorted={sortBy === "name"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("name")}
                        >
                            Name
                        </Th>
                        <Th
                            sorted={sortBy === "email"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("email")}
                        >
                            Email
                        </Th>
                        <Th
                            sorted={sortBy === "company"}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting("company")}
                        >
                            Company
                        </Th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={itemKeysCount}>
                                <Text weight={500} align="center">
                                    Nothing found
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
}
