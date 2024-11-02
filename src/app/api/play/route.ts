import { initialSystemPrompt } from "@/lib/prompts";
import { groq } from "@ai-sdk/groq";
import { generateText, streamText } from "ai";

// onSubmit={(e) => {
//                   handleSubmit(e, {
//                     data: currentImageUrl
//                       ? { imageUrl: currentImageUrl }
//                       : undefined,
//                   });
//                 }}
export async function POST(req: Request) {
  const { messages, data } = await req.json();

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  let imageDescription = "";

  if (data?.imageUrl) {
    console.log("heya");
  }

  // Step 2: Generate content based on conversation and image description
  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    maxTokens: 8000,
    messages: [
      {
        role: "system",
        content: initialSystemPrompt,
      },
      ...(imageDescription
        ? [
            {
              role: "user",
              content: [{ type: "text", text: imageDescription }],
            },
          ]
        : []),
      ...initialMessages,
      {
        role: "user",
        content: currentMessage.content,
      },
    ],
  });

  return result.toDataStreamResponse();
}
