import { MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
    colorScheme: "dark",
    // these added to the 'body' styles
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: 1.5,

    components: {
        Header: {
            styles: {
                root: {
                    fontWeight: 800,
                    textAlign: "center",
                    lineHeight: "3rem",
                },
            },
        },
    },

    // these are added as normal CSS
    globalStyles: (theme) => ({
        body: {
            fontWeight: 400,
        },

        "html, body, #root": {
            height: "100%",
            overflow: "hidden",
        },
    }),

    headings: {
        fontWeight: 600,
    },

    shadows: {
        // add custom shadow used with 'theme.shadows.dark'
        // dark: "5px 5px 3px rgba(256, 256, 256, .25)",
        dark: "",
    },
};

export default theme;
