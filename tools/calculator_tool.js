export const calculatorTool = {
  type: "function",
  function: {
    name: "calculator",
    description: "Multiply, substract, add, divide two numbers.",
    parameters: {
      type: "object",
      properties: {
        num_a: {
          type: "number",
          description: "The first number.",
        },
        num_b: {
          type: "number",
          description: "The second number.",
        },
        operation: {
          type: "string",
          enum: ["add", "substract", "multiply", "divide"],
          description: "Math operation of both numbers.",
        },
      },
      required: ["num_a", "num_b", "operation"],
    },
  },
};

export function calculatorFunction({ num_a, num_b, operation }) {
  switch (operation) {
    case "add":
      return num_a + num_b;
    case "substract":
      return num_a - num_b;
    case "multiply":
      return num_a * num_b;
    case "divide":
      if (num_b === 0) {
        throw new Error("Division by zero is not allowed");
      }
      return num_a / num_b;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}

