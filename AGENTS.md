# Agents From Scratch

## Core ESM Compliance Instructions

### Module System Requirements:

- Always use `import` and `export` statements instead of CommonJS `require()` and `module.exports`
- Use explicit `.js` extensions in import paths
- Avoid `import * as` syntax when possible; prefer named imports or default imports
- Avoid adding newlines between imports
- Native Node.js imports should be prefixed with `node:`. For example, `import { argv } from "node:process"`

## Tasks

- Always make a plan before starting implementation
- Strictly follow the tasks
- Avoid making assumptions about purpose or intent
- Do not add steps not listed in a task

### Run Project Setup

1. Run `npm init --yes`
2. In `package.json`, set `main` to `main.js` and `type` to `module`
3. Add an npm start script `node main.js`
4. Add the dev dependency `@types/node`
5. Run `npm install`
6. Create an empty `main.js` file

### Create Memory Implementation

The memory implementation is based on a local JSON file that holds the full history of a conversation.

1. Create an empty `memory.js` file
2. Create a `memory.json` file that contains an empty array
3. Create and expose a function `append` that puts its argument at the end of the array in the `memory.json` file
4. Create and expose a function `getAll` that returns the parsed content of `memory.json`
5. Create and expose a function `reset` that resets the contents of `memory.json`

**Notes**:

- For simplicity, prefer synchronous functions
