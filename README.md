# React App

- [React App](#react-app)
  - [Initialize the git repository](#initialize-the-git-repository)
    - [Create .gitignore](#create-gitignore)
  - [Initialize the project](#initialize-the-project)
    - [Create `package.json` file](#create-packagejson-file)
    - [Create source folder](#create-source-folder)
    - [Create html entry point](#create-html-entry-point)
    - [And our application components](#and-our-application-components)
  - [Run](#run)
  - [Build](#build)
  - [Init **Typescript**](#init-typescript)
    - [Enable `jsx/tsx` support](#enable-jsxtsx-support)
  - [Other tweaks](#other-tweaks)
    - [Generating typings.](#generating-typings)
    - [Jest and ESLint](#jest-and-eslint)
      - [ESLint](#eslint)
      - [Jest](#jest)

## Initialize the git repository
```bash
$ echo "# react_simple_form" >> README.md
$ git init
# Initialized empty Git repository in /home/mprymak/work/my/react_simple_form/.git/
$ git add README.md
$ git commit -m "first commit"
$ git branch -M main
$ git remote add origin git@github.com:MykolaPrymak/react_simple_form.git
$ git push -u origin main
```

### Create .gitignore

Also let's create list of files/folders that Git should ignore.

To do so - create `.gitignore` file with next content:

```bash
# IDE/Editors
.vscode/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage
lib-cov
coverage
.nyc_output

# Dependency directories
node_modules/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm
.parcel-cache
.cache

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Build files
dist/
```

## Initialize the project

### Create `package.json` file
```bash
$ yarn init

# yarn init v1.22.17
# warning package.json: No license field
question name (react_app_repo): react_app
question version (1.0.0): 0.0.1
question description: React Simple App with Parcel
question entry point (index.js): src/index.tsx
question repository url (git@github.com:JohnDoe/react_app_repo.git): 
question author (John Doe <John.Doe@example.com>): 
question license (MIT): 
question private: yes
# success Saved package.json
# Done in **.**s.
```

and add project requirements
```bash
$ yarn add react react-dom
$ yarn add parcel parcel-bundler typescript @types/react @types/react-dom --dev
```

Now our `project.json` will looks like

```json
{

  "name": "react_app",
  "version": "0.0.1",
  "description": "React Simple App with Parcel",
  "main": "src/index.tsx",
  "repository": "git@github.com:JohnDoe/react_app_repo.git",
  "author": "John Doe <John.Doe@example.com>",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "parcel": "^2.6.2",
    "parcel-bundler": "^1.12.5",
    "typescript": "^4.7.4",
    "@types/react": "^18.0.15",
    "@types/react-dom": "^18.0.6",
    "process": "^0.11.10"
  }
}
```


### Create source folder

This folder which will contains our application

```bash
$ mkdir src
```

### Create html entry point

```bash
$ touch index.html
```

With next basic content

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable Javascript to run this application.</noscript>
    <div id="app">
      <!-- Your react app will be rendered here -->
    </div>
    <script src="./index.tsx"></script>
  </body>
</html>
```

### And our application components

**Container:**

```javascript
import ReactDOM from "react-dom";
import { App } from "./App";

const app = document.getElementById("app");
ReactDOM.render(<App />, app);
```

**And the application itself:**
```javascript
export function App() {
  return <h1>Hello world!</h1>;
}
```

## Run

Now we start run our [Parcel](https://parceljs.org/) application with next command:

```bash
$ yarn parcel src/index.html
```

But let's add useful commands into our `package.json` file
```json
{
   "scripts": {
    "start": "parcel src/index.html --open",
    "prebuild": "run-s clean",
    "build": "parcel build src/index.html",
    "clean": "rimraf ./dist"
  },
}
```

so we could run our app with just

```bash
$ yarn start
```

## Build

To build the production ready application version just run

```bash
$ yarn build
```

This command will remove old build in `dist` folder and create the new one.

## Init **Typescript**

We also want to benefit from the type check and other features of **Typescript**. So let's init our **Typescript** configuration.

```bash
$ npx tsc --init
```
This command will create `tsconfig.json` with basic configuration.


### Enable `jsx/tsx` support

To enable `jsx/tsx` files support we must add `"jsx": "react"` config option in `tsconfig.json` file.

```json
{
    "jsx": "react",
}
```

## Other tweaks


### [Generating](https://parceljs.org/languages/typescript/#generating-typings) typings.

Use the types field in package.json alongside a target such as main or module to enable this.

```json
{
  "source": "src/index.tsx",
  "module": "dist/index.js",
  "types": "dist/index.d.ts"
 }
```
[Type checking](https://parceljs.org/languages/typescript/#type-checking)


### Jest and ESLint
Add dependencies for `jest` and `eslint`:

```bash
$ yarn add jest eslint @eslint/create-config @types/jest eslint-plugin-react@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest --dev
```

#### ESLint

Initialize the eslint config:

```bash
$ npx eslint --init
```

`package.json:`

```json
{
  "scripts": {
    "test": "jest",
    "lint": "eslint --ext ts,tsx src",
    "ci": "yarn build && yarn test && yarn lint"
  }
}
```

#### Jest
Add jest support for `eslint`. - add jest as env in `.eslintrc.json` or `js`/`yaml` file:

```json
"env": {
    "jest": true
}
```

And create empty test file `src/index.test.ts` in src folder.

```typescript
describe("Empty Test Collection", () => {
    it("Empty Test", () => {
        expect(true).toBeTruthy();
    });
});
```
