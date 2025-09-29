import { argv } from "node:process";

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

console.log(message);
