"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, generateText, streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import dedent from "dedent";

import shadcnDocs from "@/lib/docs/index";

export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant";
  display: string;
};

export async function continueConversation({
  messages,
  imageUrl,
}: {
  messages: CoreMessage[];
  imageUrl?: string;
}) {
  let imageDescription = "";
  if (imageUrl) {
    // Step 1: Generate image description
    const descriptionResult = await generateText({
      model: groq("llama-3.2-90b-vision-preview"),

      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Describe the  image in  great detail detail so a developer can recreate it in React Native.`,
            },
            { type: "image", image: imageUrl },
          ],
        },
      ],
    });
    imageDescription = descriptionResult.text;
    console.log("image description", imageDescription);
  }

  // Step 2: Generate content based on conversation and image description
  const result = await streamText({
    model: groq("llama3-groq-70b-8192-tool-use-preview"),
    maxTokens: 8192,
    messages: [
      {
        role: "system",
        content: getCodingPrompt(),
      },
      ...messages,
    ],
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

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

const getDescriptionPrompt = `Describe the  image in  great detail detail so a developer can recreate it in React Native. Follow these instructions carefully:

Describe Overall Layout and Structure:

Identify all sections in the image, such as headers, sidebars, footers, navigation, or content areas.
Describe the layout of these sections, specifying their exact placement and alignment (e.g., centered, left-aligned, stacked vertically, etc.).
Text and Fonts:

Identify all text in the image. Provide the exact wording, font family, size, weight, and color for each text element.
Describe any unique text styling, including line height, letter spacing, or text alignment.
Background and Colors:

Describe the background color for the entire screen and each section within the image, using exact hex or RGB values.
Specify if any gradients, shadows, or overlays are applied to backgrounds or sections.
Spacing, Padding, and Margins:

Describe the padding and margin values for each section and element, specifying the spacing between elements and how elements are aligned.
Note any specific spacing details that ensure the structure matches the image.
Borders and Shadows:

Describe any visible borders, including their color, width, and style. Specify if corners are rounded and include border radius values.
Note any shadows, detailing their color, opacity, offset, and blur.
Exact Components and Elements:

Identify each visual element (buttons, icons, images, etc.) in the image and describe its size, position, and alignment.
For buttons, icons, or other UI components, include details like shape, color, and exact size.
Alignment and Responsiveness:

Explain how elements should align as screen size changes, maintaining consistency with the image's original design.

Use the example to copy the format structure only but not anything else.

here is an example image description format : \n

**Layout Structure:**


**Main Section:**

**Bottom Navigation Bar:**

**Color Scheme:**

**Typography:**

\n
`;
