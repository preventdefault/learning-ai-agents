export async function fetchLLM({ model, messages, tools }) {
  const response = await fetch("http://localhost:1234/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({ model, messages, tools }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

