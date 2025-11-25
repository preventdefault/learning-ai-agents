import { readFile } from "./file_reader_tool.js";
import { calculator } from "./calculator_tool.js";

export async function runTools(toolCalls) {
  const results = [];

  for (const call of toolCalls) {
    const functionName = call.function.name;
    const args = JSON.parse(call.function.arguments);

    if (functionName === "read_file") {
      const content = await readFile(args.file_path);
      results.push({
        tool_call_id: call.id,
        role: "tool",
        name: functionName,
        content: content,
      });
    } else if (functionName === "calculator") {
      const result = calculator(args.num_a, args.num_b, args.operation);
      results.push({
        tool_call_id: call.id,
        role: "tool",
        name: functionName,
        content: String(result),
      });
    }
  }

  return results;
}
