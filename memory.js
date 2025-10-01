import { existsSync, readFileSync, writeFileSync } from "node:fs";

/** @typedef {import("./fetch-llm.js").Message} Message */

const MEMORY_FILE = "memory.json";

/**
 * Appends an item to the memory
 * @param {Message} item - The item to append
 */
export function append(item) {
  const memory = getAll();
  memory.push(item);
  writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}

/**
 * Returns the entire memory
 * @returns {Message[]} - The entire memory
 */
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

/**
 * Resets the memory
 */
export function reset() {
  writeFileSync(MEMORY_FILE, JSON.stringify([], null, 2));
}


