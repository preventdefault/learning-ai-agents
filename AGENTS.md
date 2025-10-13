# Agents From Scratch

The purpose of this file is to provide a step-by-step guide to creating an AI agent from scratch with the help of an AI agent of your choice.

## Core ESM Compliance Instructions

### Module System Requirements:

- Always use `import` and `export` statements instead of CommonJS `require()` and `module.exports`
- Use explicit `.js` extensions in import paths
- Avoid `import * as` syntax when possible; prefer named imports or default imports
- Avoid adding newlines between imports
- Native Node.js imports should be prefixed with `node:`. For example, `import { argv } from "node:process"`

## Tasks

This document provides a collection of tasks that the user can request.

- Plan before starting the implementation.
- Strictly follow the tasks.
- Avoid making assumptions about the purpose or intent.
- Do not add steps that are not listed in a task.

### Task 1: Check LLM Connection

Verify whether the LLM connection is available by running the following command:

```sh
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen3-4b-thinking-2507",
    "messages": [
      { "role": "user", "content": "Say Hello World!" }
    ],
    "temperature": 0.7,
    "max_tokens": -1,
    "stream": false
}'
```

### Task 2: Initialize Project

1. Run `npm init --yes`.
2. In `package.json`:
    - Set `main` to `index.js`.
    - Set `type` to `module`.
    - Add an npm start script: `node index.js`.
    - Add `@types/node` as a dev dependency.
3. Run `npm install`.

### Task 3: Parse User Input

In `index.js`:
  - Retrieve the second command-line argument from the `argv` array; it acts as the user prompt.
  - Print it out.

### Task 4: Create LLM Fetch Function

**Use built-in `fetch` function.**

1. In `fetch-llm.js`, expose a function that:
   - Has an object parameter `{ model, messages }`.
   - Sends a `POST` request (`application/json`) to `http://localhost:1234/v1/chat/completions` with only the provided parameters in the request body.
   - Returns the JSON response.

2. Use it in `index.js` with:
   - `qwen/qwen3-4b-thinking-2507` as model parameter.
   - Take the user input and add it to the messages parameter `[ { "role": "user", "content": <user input> } ]`.
   - Send the request.
   - Print the result of `response.choices[0].message.content`.

### Task 5: Clean Up Message

- Create a utility function that removes the `think` part of an LLM message.

### Task 6: Create Memory

The memory implementation uses a local JSON file to store the full conversation history.

1. In `memory.js`:
    - Create and export an `append` function that adds its argument to the end of the array in `memory.json`.
    - Create and export a `getAll` function that returns the parsed content of `memory.json`.
    - Create and export a `flush` function that clears the contents of `memory.json`.
    - Ensure `getAll` checks for the existence of `memory.json`.
2. Create `memory.json` containing an empty array.
3. Use it in `index.js`:
   - Append the current message to memory.
   - Send the whole memory content as messages.
   - Append the response message to memory. 

**Notes**:

- For simplicity, prefer synchronous functions.

### Task 7: Flush Memory

1. In `flush-memory.js`:
    - Flush memory when the file executes.
2. Add NPM script `flush` that executes the file above.

### Implement Calculator Tool

Implement a tool for the LLM that:
- adds
- multiplies
- subtracts
- divides
two numbers.