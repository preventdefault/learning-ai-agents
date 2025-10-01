# Agents From Scratch

## Core ESM Compliance Instructions

### Module System Requirements:

- Always use `import` and `export` statements instead of CommonJS `require()` and `module.exports`
- Use explicit `.js` extensions in import paths
- Avoid `import * as` syntax when possible; prefer named imports or default imports
- Avoid adding newlines between imports
- Native Node.js imports should be prefixed with `node:`. For example, `import { argv } from "node:process"`

## Tasks

Provides a collection of tasks the user can request.

- Plan before starting implementation.
- Strictly follow the tasks.
- Avoid making assumptions about purpose or intent.
- Do not add steps not listed in a task.

### Create Project

1. Run `npm init --yes`.
2. In `package.json`:
    - Set `main` to `index.js`.
    - Set `type` to `module`.
    - Add an npm start script: `node main.js`.
    - Add `@types/node` as a dev dependency.
3. Run `npm install`.

### Create Memory

The memory implementation uses a local JSON file to store the full conversation history.

1. In `memory.js`:
    - Create and export an `append` function that adds its argument to the end of the array in `memory.json`.
    - Create and export a `getAll` function that returns the parsed content of `memory.json`.
    - Create and export a `reset` function that clears the contents of `memory.json`.
    - Ensure `getAll` checks for the existence of `memory.json`.
2. Create `memory.json` containing an empty array.

**Notes**:

- For simplicity, prefer synchronous functions.

### Create LLM Fetch Function

In `fetch-llm.js`, expose a function that:
  - Has an object parameter `{ model, messages }`.
  - Makes a `POST` request (`application/json`) to `http://localhost:1234/v1/chat/completions`.
  - Returns the JSON response.

### Create Index File

In `index.js`:
  - Get the second command-line argument from the `argv` array; it acts as the user prompt.
  - Take this prompt and append it to memory as `{ role: "user", prompt: prompt }`.
  - Fetch the LLM with the complete memory as the `messages` parameter and with the model parameter `http://localhost:1234/v1/chat/completions`.