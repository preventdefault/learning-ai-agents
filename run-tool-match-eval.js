import { runEval } from "./run-eval.js";
import { toolMatchScorer } from "./tool-match-scorer.js";
import { fetchLLM } from "./fetch-llm.js";
import { READ_FILE_TOOL } from "./file_reader_tool.js";
import { CALCULATOR_TOOL } from "./calculator_tool.js";

const task = async (input) => {
  return await fetchLLM({
    model: "qwen/qwen3-4b-thinking-2507",
    messages: [{ role: "user", content: input }],
    tools: [READ_FILE_TOOL, CALCULATOR_TOOL],
  });
};

const data = [
  { input: "Calculate 5 + 5", expected: "calculator" },
  { input: "Read the AGENTS.md file", expected: "read_file" },
  { input: "How are you?", expected: "none" },
];

const results = await runEval("Tool Match Eval", data, task, [toolMatchScorer]);
console.log(JSON.stringify(results, null, 2));

