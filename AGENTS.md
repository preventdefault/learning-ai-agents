# Agents From Scratch

The purpose of this file is to provide a step-by-step guide to creating an AI agent from scratch with the help of an AI agent of your choice.

## Core ESM Compliance Instructions

### Code Style:

- Always use `import` and `export` statements instead of CommonJS `require()` and `module.exports`.
- Use explicit `.js` extensions in import paths.
- Avoid `import * as` syntax when possible; prefer named imports or default imports.
- Avoid adding newlines between imports.
- Native Node.js imports should be prefixed with `node:`. For example, `import { argv } from "node:process"`.
- Use shorthand property names.
- Use an object parameter for functions with more than one parameter.

## Tasks

This document provides a collection of tasks that the user can request.

- Plan before starting the implementation.
- Strictly follow the tasks.
- Avoid making assumptions about the purpose or intent of a task.
- Do not add steps that are not listed in a task.

### Task 1: Check Requirements

1. Verify Node.js v24 is installed.
2. Verify whether the connection to the LLM is available by running a `curl` command with the following parameters:
  - URL: http://localhost:1234/v1/chat/completions
  - Content-Type: application/json
  - Body:
    - model: qwen/qwen3-4b-thinking-2507
    - messages: an array containing an object with `role` set to `user` and `content` set to `Hi there!`.

### Task 2: Parse User Input

In `index.js`:
  - Retrieve the second command-line argument from the `argv` array; it acts as the user prompt.
  - Print it out.
  - Test it by running `node index.js "Hey there!"`.

### Task 3: Create LLM Fetch Function

**Use the built-in `fetch` function.**

1. In `fetch-llm.js`, expose a function that:
   - Has an object parameter `{ model, messages }`.
   - Sends a `POST` request (`application/json`) to `http://localhost:1234/v1/chat/completions` with only these parameters in the request body.
   - Returns the JSON response.

2. Use it in `index.js` with:
   - `qwen/qwen3-4b-thinking-2507` as the model parameter.
   - Include the user input in the `messages` parameter as `[{"role":"user","content":<user input>}]`.
   - Send the request.
   - Print the result of `response.choices[0].message.content`.

### Task 4: Clean Up Message

- Create and use a utility function that removes the `think` part of an LLM message.

### Task 5: Create Memory

The memory implementation uses a local JSON file to store the full conversation history.

1. In `memory.js`:
    - Create and export an `append` function that adds its argument to the end of the array in `memory.json`.
    - Create and export a `getAll` function that returns the parsed content of `memory.json`.
    - Create and export a `flush` function that clears the contents of `memory.json`.
    - Ensure `getAll` checks for the existence of `memory.json`.
2. Create `memory.json` containing an empty array.
3. Use it in `index.js`:
   - Append the current message to memory.
   - Send the entire memory content as `messages`.
   - Append the original (raw) response message to memory.

### Task 6: Flush Memory

1. In `flush-memory.js`:
    - Flush memory when the file executes.

### Task 7: Create File Reader Tool

In `file_reader_tool.js`:
  - Expose a JSON schema object as named export for a function tool named `read_file` that reads and extracts content from various file types. The tool accepts a required parameter `file_path` (string) representing the path or identifier of the file to read, which must match the exact filename as provided by the user or system.
  - Extend `fetchLLM` function with a required `tools` parameter and append it to the request body.
  - Pass the JSON schema to `fetchLLM` in `index.js`.
  - Expose a function that reads a given file according to the JSON schema specifications.

### Task 8: Create Run Tool Function

1. In `run-tools.js`:
    - Expose a function that receives the `tool_calls` array from the LLM.
    - Implement the file reader tool.
2. In `index.js`:
    - Integrate the run tools function.
    - Ensure the integration supports nested tool calls within one conversation by checking the `tool_calls` array `length`.

### Task 9: Create Calculator Tool

In `calculator_tool.js`:
  - Expose a JSON schema object as named export for a function tool named `calculator` that multiplies, subtracts, adds, or divides two numbers. The tool accepts three required parameters:
    - `num_a` (number): The first number.
    - `num_b` (number): The second number.
    - `operation` (string): The math operation to apply to both numbers. Must be one of: "add", "subtract", "multiply", or "divide".
  - Extend `fetchLLM` function with a required `tools` parameter and append it to the request body.
  - Pass the JSON schema to `fetchLLM` in `index.js`.
  - Expose a function that performs calculations according to the JSON schema specifications.

### Task 10: Create Evaluation Function

In `run-eval.js`:
- Expose a function that expects four parameters:
  - name: A string for the name of the eval.
  - data: An array of objects with `input` and `expected` properties.
  - task: An asynchronous function that takes the `input` property of a data item as the parameter.
  - scorers: An array of asynchronous functions that take the `expected` property of a data item and the `output` of a task as parameters.
- Implement the function body with the following behavior:
  - Map over the `data` array and pass the `input` property of each data item to the `task` function.
  - Inside the mapping above, map over the scorer functions and pass the task result and the `expected` property of each data item to each function.
  - The mapping over `data` should return:
    - data: The current data item.
    - result: The current result of the task.
    - scores: The scores.
  - Return the `name` and the `results` of the mapping.

### Task 11: Create Tool-Match Scorer Function

In `tool-match-scorer.js`:
- Expose a function that expects two parameters:
  - output: The output of an LLM with the following structure: output.choices[{message:{tool_calls:[{function:{name:"<tool-name>"}}]}}]. All fields are optional.
  - expected: The name of the expected tool call.
- Implement the function body with the following behavior:
  - If the `tool_calls` property is not an array or it is empty, return:
    - name: "tool-match".
    - score: 0.
  - Check whether any tool call’s `function.name` matches `expected`. Return:
    - name: "tool-match".
    - score: 1 if there is a match; otherwise 0.

### Task 12: Create Tool-Match Eval Runner

In `run-tool-match-eval.js`:
- Implement an evaluation runner for tool matches.
- Add data cases that should not use tools.
  