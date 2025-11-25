export function removeThinkTags(content) {
  return content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

