/**
 * @typedef {object} Message
 * @property {"user" | "assistant" | "system" | "tool"} role - The role of the message sender.
 * @property {string} content - The content of the message.
 */

/**
 * Fetches an LLM response
 * 
 * @param {Object} params - The parameters for the LLM request
 * @param {string} params.model - The model to use
 * @param {Message[]} params.messages - The messages to send to the LLM
 * 
 * @returns {Promise<Object>} - The LLM response
 */
export async function fetchLLM({ model, messages }) {
  const response = await fetch("http://localhost:1234/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({ model, messages }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

