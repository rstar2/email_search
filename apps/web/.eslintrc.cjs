// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ["custom", "plugin:react-hooks/recommended"],
    plugins: ["react-refresh"],
    rules: {
        // and overwriting rules here

        "react-refresh/only-export-components": "off",
    },
};
