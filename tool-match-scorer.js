export async function toolMatchScorer(output, expected) {
  const toolCalls = output.choices?.[0]?.message?.tool_calls;

  if (!Array.isArray(toolCalls) || toolCalls.length === 0) {
    return {
      name: "tool-match",
      score: 0,
    };
  }

  const match = toolCalls.some((call) => call.function?.name === expected);

  return {
    name: "tool-match",
    score: match ? 1 : 0,
  };
}

