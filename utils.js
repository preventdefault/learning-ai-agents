/**
 * Removes thinking content from LLM responses
 * Handles various thinking tag formats commonly used by different models
 * @param {string} response - The raw LLM response
 * @returns {string} - The cleaned response without thinking content
 */
export function removeThinkingContent(response) {
  if (!response || typeof response !== 'string') {
    return response;
  }

  // Common thinking tag patterns used by different LLM models
  const thinkingPatterns = [
    // Standard thinking tags
    /<think>.*?<\/think>/gs,
    /<thinking>.*?<\/thinking>/gs,
    // Alternative formats
    /<thought>.*?<\/thought>/gs,
    /<reasoning>.*?<\/reasoning>/gs,
    // Some models use different brackets
    /\[thinking\].*?\[\/thinking\]/gs,
    /\[think\].*?\[\/think\]/gs,
    // Claude-style thinking (sometimes uses different formats)
    /<thinking>.*?<\/antml:thinking>/gs,
  ];

  let cleanedResponse = response;

  // Apply all patterns to remove thinking content
  thinkingPatterns.forEach(pattern => {
    cleanedResponse = cleanedResponse.replace(pattern, '');
  });

  // Clean up extra whitespace and newlines
  return cleanedResponse.trim().replace(/\n\s*\n\s*\n/g, '\n\n');
}
