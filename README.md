# Turborepo project

## What's inside?

It includes the following packages/apps:

### Apps and Packages

-   `web`: a simple web app powered by [Vite](https://vitejs.dev/)
-   `ui`: a stub React component library shared by all `web` applications
-   `eslint-config-custom`: `eslint` configurations (includes `eslint-config-prettier`)
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting
    > The `.prettierrc` has to be in the root it's used by VSCode.
    > Changes to `.prettierrc` requires VSCode restart

### Build

To build all apps and packages, run the following command:

```bash
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
npm run dev
```

## Useful Links

Learn more about the power of Turborepo:

-   [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
-   [Caching](https://turbo.build/repo/docs/core-concepts/caching)
-   [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
-   [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
-   [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
-   [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
