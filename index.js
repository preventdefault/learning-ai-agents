import { argv, exit } from "node:process";
import { removeThinkingContent } from "./utils.js";
import { append, getAll } from "./memory.js";
import { fetchLLM } from "./fetch-llm.js";

async function main() {
  const prompt = argv.at(2);

  append({ role: "user", content: prompt });
  const memory = getAll();

  const response = await fetchLLM({
    model: "qwen3-4b-thinking-2507",
    messages: memory,
  });

  const {
    choices: [{ message }],
  } = response;

  const cleanedContent = removeThinkingContent(message.content);

  console.log(cleanedContent);
}

main().catch((error) => {
  console.error(error);
  exit(1);
});

