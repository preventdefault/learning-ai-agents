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
- [Tool Call](#tool-call)
- [The Loop](#the-loop)
- [Evaluations](#evaluations)

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

Run `npm start "<your prompt>"`. The prompt will be used as the user message.

## Memory

## Tool Call

## The Loop

## Evaluations
