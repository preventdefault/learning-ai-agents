# Learning about AI Agents by Building One from Scratch

AI agents still feel like magic to me. They act on their own, complete tasks independently, and are becoming increasingly reliable. With every passing week, their capabilities appear to grow without limit.

But what is an agent, exactly? What components and principles make an LLM into an agent? How does it work conceptually?

I have so many questions about AI agents that I decided the best way to learn more is to build one from scratch.

This is where the journey begins.

## Table of Contents

- [Introduction](#introduction)
- [LLM](#llm)
- [Setup](#setup)
- [Usage](#usage)
- [Memory](#memory)
- [Tool Calling](#tool-calling)
- [Evaluations](#evaluations)
- [AGENTS.md](#agentsmd)

## Introduction

### What makes an AI system an agent?

This is often the first question: What is an agent, exactly?

In a nutshell, an AI agent is a system designed to perceive its environment and take actions to achieve a specific goal. It extends a large language model (LLM) with the abilities to plan, use tools, and interact with its environment.

Or, more simply: an AI agent is like a smart helper that understands its environment and takes actions to reach a goal.

This project runs entirely locally—without any special tooling, frameworks, or APIs. Just plain JavaScript.

## LLM

The LLM used is a Qwen small language model (SLM) available in LM Studio: [Qwen3-4B-Thinking 2507](https://lmstudio.ai/models/qwen/qwen3-4b-thinking-2507).

This model has reasoning capabilities and is trained for tool use.
It is small (around 2 GB), so it should run on most modern consumer hardware.

## Setup

1. Install [Node.js](https://nodejs.org)
2. Install [LM Studio](https://lmstudio.ai)
3. Download and activate the Qwen model
4. Start the LM Studio server so the model can be accessed at `http://localhost:1234/v1/chat/completions`

## Usage

Run `node index.js "<your prompt>"`. The prompt will be used as the user message.

## Memory

LLMs are stateless - they processes each query independently with no memory of past interactions. Every conversation starts from scratch.

Memory in AI Agents is not as simple as it is for humans. LLMs have limited context windows - they can only consider a fixed amount of text at a time.

If you simply add the entire conversation history every time, you quickly hit these limits. The model might start ignoring older content or lose coherence if the context is too long. Moreover, storing everything slows down processing and increases costs.

The challenge is clear: how to keep important information without overloading the system.

### Main Types of Memory

#### Short-Term Memory (Contextual Memory)

This is the AI's context within a single session. That might be the chat history, or the results of tool calls. It contains all information about the current conversation, which is discarded once the session ends.

#### Long-Term Memory (Persistent Memory)

This is information the AI agent keeps across sessions and over time. It's often stored in external databases so the agent can look it up when needed.

### Memory Strategies

In this project, the Sequential strategy is used because it is the simplest one.

#### Sequential

The most basic method is what early chatbots did: keep adding every new message to the conversation history, and feed the whole thing to the model each time. This sequential memory chain keeps the full conversation record. It's like carrying the entire transcript of a conversation as context.

The benefit is simplicity – nothing fancy, just raw memory of everything said. In short conversations, this works fine and ensures no detail is lost. However, as conversations grow, this approach runs into trouble. The context can quickly overflow the model's limit, or become so large that processing it is slow and expensive.

#### Sliding Window

Instead of keeping the entire history, the agent keeps only the most recent N messages as context. As new messages come in, the oldest ones get dropped – the window slides forward.

This approach ensures the context stays within a manageable size. It keeps the conversation relevant and recent, which is often enough since recent dialogue usually guides the next response. Performance stays consistent no matter how long the overall conversation.

But the agent might "forget" important information from earlier in the conversation. If a crucial detail was mentioned 50 messages ago and falls out of the window, it won't remember it.

#### Summarization

The idea is to regularly take the conversation so far, create a brief summary of the important points, and use that summary as a stand-in for the full history.

It allows the AI to keep relevant information over very long conversations without exceeding context limits. The agent can maintain awareness of past topics, decisions, or user preferences that occurred far back in the conversation.

The quality of this approach depends on the quality of the summaries. Important details can be lost – a summary might miss a seemingly minor detail that later turns out to be crucial.

#### Retrieval Based

This advanced approach gives the AI agent something like an external brain or a personal search engine.
Instead of pushing a fixed window or a summary into the model, the conversation history is stored in an external database, and when needed, the agent retrieves the most relevant pieces to include in context.

Retrieval-based memory allows an agent to remember large amounts of information over long periods. The agent can surface details from much earlier in a conversation or from long-term knowledge even if the current context window is small.

The complexity of setup and maintenance is higher. You need systems to store information, algorithms for fast search, and careful tuning to ensure relevant information is retrieved. If the retrieval isn't accurate, the agent might not behave optimally.

## Tool Calling

### Converting Natural Language into Structured Tool Calls

A fundamental design pattern in the development of intelligent agents involves the **conversion of natural language into structured tool calls**.  
This approach enables agents to both **reason about complex tasks** and **execute actions** in a controlled and interpretable manner.

### The Role and Limitations of LLMs

Large Language Models (LLMs) are inherently **text-processing systems**. They operate solely on textual input and output, without direct interaction with their execution environment.  
Consequently, an LLM **cannot independently**:

- send HTTP requests,
- access or read files,
- execute command-line operations,
- run arbitrary code, or
- perform any other form of external computation.

> **Note:**  
> The model itself does **not** execute tool calls.  
> Instead, it produces **structured textual representations** of those calls, which must be **interpreted and executed programmatically** by an external system.  
> This mechanism ensures that the LLM remains a reasoning component, while the surrounding system manages actual execution.

In this context, **tools and functions serve as controlled extensions** of the model’s capabilities, allowing it to interact with the external environment in a structured and auditable way.

### Operational Process

The integration of tools with an LLM typically follows the sequence below:

1. **Tool Definition**  
    The system provides the model with detailed descriptions of available tools, including their purpose, input parameters, and invocation rules.
    
2. **Reasoning and Invocation**  
    Based on the user’s request, the model determines whether invoking a tool is necessary to complete the task.
    
3. **Tool Execution**  
    If tool usage is required, the model generates a structured function call adhering to the predefined schema.  
    The external system parses this output, executes the corresponding function, and returns the results to the model.
    
4. **Response Composition**  
    The model incorporates the tool output into its reasoning process to produce a final, contextually informed response.
    
### Integration Methods

Tools can be supplied to the model using one of two standard methods:

#### 1. Via the `tools` Parameter in the Request Body

```json 
[
  {
    "type": "function",
    "function": {
      "name": "your_function_name",
      "description": "Description of the function’s purpose.",
      "parameters": {
        "type": "object",
        "properties": {           
          "tool_parameter": {             
            "type": "string"           
          }
        },
        "required": ["tool_parameter"]
      }
    }  
  }
]
```

#### 2. Embedded within the `system` Prompt

```
<|im_start|>system 
....

# Tools  

You may call one or more functions to assist with the user query.  Function signatures are provided within <tools></tools> XML tags: 

<tools> 
{"type": "function", "function": {"name": "your_function_name", "description": "Description of the function’s purpose.", "parameters": {"type": "object", "properties": {"tool_parameter": {"type": "string"}}, "required": ["tool_parameter"]}}} 
</tools>  

For each function call, return a JSON object specifying the function name and its arguments within <tool_call></tool_call> XML tags: 
<tool_call> 
{"name": "<function-name>", "arguments": <args-json-object>} 
</tool_call><|im_end|>
```
### Summary

The conversion of natural language into structured tool calls represents a critical mechanism for extending the functional boundaries of LLMs.  
By clearly separating **reasoning (handled by the model)** from **execution (managed by the system)**, this approach ensures **robustness, security, and transparency** in agent behavior.  
It forms the foundation for modern LLM-based systems that can both **comprehend intent** and **take meaningful, reliable action**.


## Evaluations

Unlike traditional software, AI models are non-deterministic. They don’t always give the same output for the same input, which can make your usual unit tests insufficient for knowing if a change actually made things better.

To know if your AI application really works for a specific use case, you need your own AI evals. Instead of spending hours “vibe testing” every time you try a new model or tweak a prompt, evals give you clearer metrics to help understand what’s actually better.

**We cannot unit test an Agent.**

Unlike traditional software, AI models are non-deterministic. Engineers can waste time seeking binary correctness in probabilistic systems, but "correctness" is fluid in creative tasks. A prompt like "summarize this email" has infinite valid outputs. If we mock the LLM, we aren't testing the agent; we are merely testing string concatenation.

**We must evaluate behavior.**

To succeed, we must replace manual "vibe testing" with systematic AI evals. We are managing risk, not eliminating variance. Therefore, our metrics must validate three specific areas:

- **Reliability:** We don't ask if it worked once; we measure how often it works consistently.
- **Quality:** We quantify the subjective: Is the answer helpful, accurate, and tonal, correct?
- **Tracing:** We validate the reasoning path, ensuring the agent accessed the right context before answering.

## AGENTS.md

The AGENTS.md file provides a step-by-step guide for creating an AI agent that is being used in workshops I give to others.
