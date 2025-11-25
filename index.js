import { argv } from "node:process";
import { fetchLLM } from "./fetch-llm.js";
import { removeThinkTags } from "./format-message.js";
import { append, getAll } from "./memory.js";
import { READ_FILE_TOOL } from "./file_reader_tool.js";
import { CALCULATOR_TOOL } from "./calculator_tool.js";
import { runTools } from "./run-tools.js";

const userPrompt = argv[2];
console.log(userPrompt);

const userMessage = { role: "user", content: userPrompt };
await append(userMessage);

while (true) {
  const messages = await getAll();
  const response = await fetchLLM({
    model: "qwen/qwen3-4b-thinking-2507",
    messages,
    tools: [READ_FILE_TOOL, CALCULATOR_TOOL],
  });

  const responseMessage = response.choices[0].message;
  await append(responseMessage);

  if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
    console.log("Tool calls:", JSON.stringify(responseMessage.tool_calls, null, 2));
    const toolResults = await runTools(responseMessage.tool_calls);
    for (const result of toolResults) {
      await append(result);
    }
  } else {
    console.log(removeThinkTags(responseMessage.content));
    break;
  }
}
