export const CALCULATOR_TOOL = {
  type: "function",
  function: {
    name: "calculator",
    description: "Perform basic arithmetic operations (add, subtract, multiply, divide) on two numbers.",
    parameters: {
      type: "object",
      properties: {
        num_a: {
          type: "number",
          description: "The first number",
        },
        num_b: {
          type: "number",
          description: "The second number",
        },
        operation: {
          type: "string",
          enum: ["add", "subtract", "multiply", "divide"],
          description: "The operation to perform",
        },
      },
      required: ["num_a", "num_b", "operation"],
    },
  },
};

export function calculator(num_a, num_b, operation) {
  switch (operation) {
    case "add":
      return num_a + num_b;
    case "subtract":
      return num_a - num_b;
    case "multiply":
      return num_a * num_b;
    case "divide":
      if (num_b === 0) {
        return "Error: Division by zero";
      }
      return num_a / num_b;
    default:
      return "Error: Invalid operation";
  }
}

