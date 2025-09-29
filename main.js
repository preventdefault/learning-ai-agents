import { argv } from "node:process";
import { removeThinkingContent } from "./utils.js";

const prompt = argv.at(2);

const response = await fetch("http://localhost:1234/v1/chat/completions", {
  method: "POST",
  body: JSON.stringify({
    model: "qwen3-4b-thinking-2507",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  }),
  headers: {
    "Content-Type": "application/json",
  },
});

const { choices: [{ message }] } = await response.json();

// Remove thinking content from the message before displaying
const cleanedContent = removeThinkingContent(message.content);

console.log(cleanedContent);
