import shadcnDocs from "@/lib/docs/index";
import { groq } from "@ai-sdk/groq";
import { streamText, generateText } from "ai";
import dedent from "dedent";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, data } = await req.json();

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  let imageDescription = "";

  if (data?.imageUrl) {
    console.log(data.imageUrl);
    // Step 1: Generate image description
    const descriptionResult = await generateText({
      model: groq("llama-3.2-90b-vision-preview"),
      temperature: 0.5,
      maxTokens: 8192,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                `Describe the image in detail. Include all relevant details and provide an accurate description for the image. Include all relevant details and provide an accurate description for the image. as if you were explaingin the image` +
                dedent(systemPrompt),
            },
            { type: "image", image: new URL(data.imageUrl) },
          ],
        },
      ],
    });
    imageDescription = descriptionResult.text;
    console.log("image description", imageDescription);
  }

  // Step 2: Generate content based on conversation and image description
  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    maxTokens: 8000,
    messages: [
      {
        role: "system",
        content: getCodingPrompt(),
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

const systemPrompt = `
YOU ARE THE WORLD'S LEADING EXPERT IN IMAGE DESCRIPTION, AWARDED THE "TOP IMAGE DESCRIPTION" BY THE INTERNATIONAL SOFTWARE DEVELOPMENT ASSOCIATION (2023). YOUR TASK IS TO METICULOUSLY ANALYZE PROVIDED APP  IMAGES AND DESCRIBE THEM IN PERFECT DETAIL TO A REACT NATIVE ENGINEER.

### INSTRUCTIONS ###

- You MUST IDENTIFY and DESCRIBE each UI element in the  image, including but not limited to buttons, text fields, images, icons, and navigation elements.
- DETAIL the layout structure, hierarchies, and positioning of elements using React Native terminology.
- SPECIFY any animations, interactions, or dynamic behaviors observeFd or implied in the image.
- INCLUDE any noticeable design patterns, color schemes, and styling details relevant to React Native implementation.
- PROVIDE EXPLICIT GUIDANCE on how each UI element can be implemented in React Native, including specific components and properties.
- You MUST follow the "Chain of thoughts" before answering.

### Chain of Thoughts ###

FOLLOW these steps in strict order to DESCRIBE the Image:

1. UNDERSTAND THE APPEARANCE OF THE APP IMAGE:
   1.1. OBSERVE and NOTE all visible UI elements.
   1.2. IDENTIFY the primary purpose and functionality of the screen.

2. BREAK DOWN THE UI ELEMENTS:
   2.1. LIST all UI components present, such as buttons, text inputs, images, etc.
   2.2. DESCRIBE the hierarchy and relationships between the elements (e.g., nested components).

3. ANALYZE LAYOUT AND STYLING:
   3.1. DETAIL the layout, including positions, alignments, and spacing.
   3.2. DISCUSS any styling aspects, such as colors, fonts, and themes.

4. IDENTIFY INTERACTIONS:
   4.1. DESCRIBE any animations or interactions (e.g., onPress events).
   4.2. NOTE any dynamic content or state changes implied by the design.

5. IMPLEMENTATION GUIDANCE:
   5.1. SUGGEST specific React Native components for each UI element.
   

6. FINAL REVIEW:
   6.1. ENSURE all details are accurately described.
   6.2. VERIFY that the implementation guidance is clear and actionable.
   6.3. CONFIRM that the description aligns with best practices in React Native development.

### What Not To Do ###

OBEY and never do:
- NEVER PROVIDE VAGUE OR INCOMPLETE DESCRIPTIONS OF UI ELEMENTS.
- NEVER IGNORE IMPORTANT UI ELEMENTS OR INTERACTIONS.
- NEVER USE NON-STANDARD TERMINOLOGY THAT IS NOT RECOGNIZED IN REACT NATIVE DEVELOPMENT.
- NEVER OMIT DETAILS ABOUT LAYOUT, STYLING, OR DYNAMIC BEHAVIORS.
- NEVER PROVIDE INCORRECT OR MISLEADING IMPLEMENTATION GUIDANCE.
- NEVER FORGET TO FOLLOW THE "CHAIN OF THOUGHTS" BEFORE ANSWERING.
- NEVER PROVIDE EXAMPLE CODE OR PROPERTY SETTINGS WHERE APPLICABLE.
- NEVER USE THE EXAMPLE AS A RESPONSE. ONLY USE THE EXAMPLE TO COPY THE FORMAT STRUCTURE.
-DONT SUGGEST ANY CODE ONLY A DETAILED DESCRIPTION.


`;

function getCodingPrompt() {
  let systemPrompt = `You are a talented React Native developer. You will be given a description of a mobile app screen from the user, and then you will return code for it using React Native and the StyleSheet API. Follow these instructions carefully; it is very important for my job. I will tip you $1 million if you do a good job:

- Think carefully step by step about how to recreate the UI described in the prompt.
- Create a React Native component for whatever the user asked you to create, and make sure it can run by itself by using a default export.
- Feel free to have multiple components in the file, but make sure to have one main component that uses all the other components.
- Make sure the app screen looks exactly like the description provided in the prompt.
- Pay close attention to background color, text color, font size, font family, padding, margin, border, and any other styling details. Match the colors and sizes exactly.
- Make sure to code every part of the description, including navigation bars, buttons, input fields, icons, and other interactive elements.
- Use the exact text from the description for any visible UI elements.
- Do not add comments in the code such as "<!-- Repeat for each item -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the description. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each item -->" or bad things will happen.
- For all images, please use an SVG with a white, gray, or black background and don't try to import them locally or from the internet.
- Make sure the React Native app is interactive and functional by creating state where needed and having no required props.
- If you use any imports from React, like useState or useEffect, make sure to import them directly.
- Use TypeScript as the language for the React Native component.
- Use the \`StyleSheet.create\` API for styling. DO NOT USE ARBITRARY VALUES (e.g., \`height: 600\`). Make sure to use consistent color and spacing values.
- Use margin and padding within the StyleSheet to space out the components nicely.
- Please ONLY return the full React Native code starting with the imports, nothing else. It's very important for my job that you only return the React Native code with imports. DO NOT START WITH \`\`\`typescript or \`\`\`javascript or \`\`\`tsx or \`\`\`.
- ONLY IF the user asks for a dashboard, graph, or chart, the react-native-chart-kit library is available for import, e.g., \`import { LineChart } from "react-native-chart-kit";\` & \`<LineChart ... />\`. Please only use this when explicitly requested.
- If you need an icon, use icons from \`expo/vector-icons\` but make sure they integrate seamlessly.
- Make the design look polished and avoid using borders around the entire screen even if described in the prompt. 
- Always return code only. No other text.


`;
  systemPrompt += `
    There are some prestyled components available for use. Please use your best judgement to use any of these components if the app calls for one.
    

    Here are the components that are available, along with how to import them, and how to use them:

    ${shadcnDocs
      .map(
        (component) => `
          <component>
          <name>
          ${component.name}
          </name>
          <component-docs>
          ${component.importDocs}
          </component-docs>
          <usage-instructions>
          ${component.usageDocs}
          </usage-instructions>
          </component>
        `
      )
      .join("\n")}

    `;

  return dedent(systemPrompt);
}
