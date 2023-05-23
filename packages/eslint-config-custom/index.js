// eslint-disable-next-line no-undef
module.exports = {
    extends: ["turbo", "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
        "prettier/prettier": "error",

        "react/jsx-key": "off",

        "no-console": "error",
    },
};
