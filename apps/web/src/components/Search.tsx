import { useState } from "react";
import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from "@mantine/core";
import { useLogger, useInputState, getHotkeyHandler } from "@mantine/hooks";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

import { createLogger } from "utils";

const logger = createLogger("Search");

type SearchProps = Pick<TextInputProps, "disabled"> & {
    onAction: (val: string) => void;
};

export default function Search(props: SearchProps) {
    const { disabled, onAction } = props;
    const theme = useMantineTheme();
    const [value, setValue] = useInputState("");
    const [usedValue, setUsedValue] = useState("");

    useLogger("Search", [value, usedValue]);

    function handleSubmit() {
        if (disabledCur) return;

        logger.log(`OnAction : value=${value}, usedValue=${usedValue}`);
        setUsedValue(value);
        onAction(value);
    }

    const disabledCur = disabled || (!!usedValue && value === usedValue);
    return (
        <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            rightSection={
                <ActionIcon
                    size={32}
                    radius="xl"
                    color={theme.primaryColor}
                    variant="filled"
                    disabled={disabledCur}
                    onClick={handleSubmit}
                >
                    {theme.dir === "ltr" ? (
                        <IconArrowRight size="1.1rem" stroke={1.5} />
                    ) : (
                        <IconArrowLeft size="1.1rem" stroke={1.5} />
                    )}
                </ActionIcon>
            }
            placeholder="Search"
            rightSectionWidth={42}
            // disabled={disabledCur}
            value={value}
            onChange={setValue}
            onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
        />
    );
}
