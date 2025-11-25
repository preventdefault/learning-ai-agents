export async function fetchLLM({ model, messages, tools }) {
  const body = {
    model,
    messages,
  };

  if (tools) {
    body.tools = tools;
  }

  const response = await fetch("http://localhost:1234/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
