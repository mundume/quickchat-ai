"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});
export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    prompt: ``,
    model: groq("llama3-8b-8192"),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
