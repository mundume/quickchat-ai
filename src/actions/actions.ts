"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function continueConversation({
  imageUrl,
  messages,
}: {
  imageUrl?: string;
  messages: CoreMessage[];
}) {
  const result = await streamText({
    model: groq("llama-3.2-11b-vision-preview"),
    messages: imageUrl
      ? [
          {
            role: "user",
            content: [
              { type: "text", text: "Describe the image in detail." },
              {
                type: "image",
                image: imageUrl,
              },
            ],
          },
        ]
      : messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}
