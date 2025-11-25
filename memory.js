import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const MEMORY_PATH = resolve("memory.json");

export async function getAll() {
  if (!existsSync(MEMORY_PATH)) {
    return [];
  }
  const content = await readFile(MEMORY_PATH, "utf-8");
  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function append(message) {
  const messages = await getAll();
  messages.push(message);
  await writeFile(MEMORY_PATH, JSON.stringify(messages, null, 2));
}

export async function flush() {
  await writeFile(MEMORY_PATH, JSON.stringify([], null, 2));
}

