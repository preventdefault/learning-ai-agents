import { readFile } from "node:fs/promises";

export const readFileTool = {
  type: "function",
  function: {
    name: "read_file",
    description: "Reads and extracts content from various file types.",
    parameters: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "The path or identifier of the file to read. Must match the exact filename as provided by the user or system.",
        },
      },
      required: ["file_path"],
    },
  },
};

export async function readFileFunction({ file_path }) {
  return await readFile(file_path, "utf-8");
}

