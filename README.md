# Aralects monorepo

This is a [monorepo](https://monorepo.tools/) that houses the following apps and packages for Aralects:

- apps
  - `admin`: a Next.js app that serves as the admin dashboard for Aralects
  - `blog`: a Gatsby app that serves as the blog for Aralects
  - `website`: a Next.js app that serves as the main website for Aralects (to be implemented)
- packages
  - `ui`: a React component library built with [shadcn](https://ui.shadcn.com/docs) components and [Tailwind CSS](https://tailwindcss.com/docs/installation). Shared across all apps.
  - `tailwind-config`: `tailwindcss` configs - shared separately from the UI library due to the `content` property needing to be updated for each app as well as for the UI library itself
  - `typescript-config`: config files for Typescript used throughout the monorepo

## Getting started

This monorepo uses Turborepo to manage dependencies and scripts. You can find the documentation [here](https://turborepo.dev/docs/getting-started/installation).

To get started with local development, make sure you have [Node.js](https://nodejs.org/en/download/) (v20 - recommend using [nvm](https://github.com/nvm-sh/nvm)) as well as [Yarn](https://yarnpkg.com/getting-started/install) installed.

1. Clone the repo
2. Run `yarn` to install dependencies
3. Run `yarn dev` to start the development server

This will spin up both apps at the same time. You can access the admin dashboard at `http://localhost:3001` and the blog at `http://localhost:8000`.

Alternatively, you can run `yarn dev` in the `apps/admin` or `apps/blog` directories to start only one of the apps.

## Deployment

This monorepo is currently set up to be deployed automatically to [Vercel](https://vercel.com/docs/) on pushes to the `main` branch.

## Knowledge base

- How are UI components being exported?
  - The UI components are being exported from the `ui` package as a single entry point (`/packages/ui/index.ts`), allowing for a single import statement to be used in the apps that consume the UI components. This file is generated automatically as part of the build step.
  - @TODO - make sure [tree shaking](https://webpack.js.org/guides/tree-shaking/) is working as expected
