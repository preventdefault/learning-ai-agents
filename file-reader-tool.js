import { readFile as fsReadFile } from "node:fs/promises";

export const READ_FILE_TOOL = {
  type: "function",
  function: {
    name: "read_file",
    description: "Read and extract content from a file",
    parameters: {
      type: "object",
      properties: {
        file_path: {
          type: "string",
          description: "The path to the file to read",
        },
      },
      required: ["file_path"],
    },
  },
};

export async function readFile(filePath) {
  try {
    const content = await fsReadFile(filePath, "utf-8");
    return content;
  } catch (error) {
    return `Error reading file: ${error.message}`;
  }
}

