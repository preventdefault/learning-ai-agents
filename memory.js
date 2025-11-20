import { existsSync, readFileSync, writeFileSync } from "node:fs";

const MEMORY_FILE = "memory.json";

export function append(item) {
  const memory = getAll();
  memory.push(item);
  writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

export function getAll() {
  if (!existsSync(MEMORY_FILE)) {
    return [];
  }
  const content = readFileSync(MEMORY_FILE, "utf-8");
  if (content.trim() === "") {
    return [];
  }
  return JSON.parse(content);
}

export function reset() {
  writeFileSync(MEMORY_FILE, JSON.stringify([], null, 2));
}


