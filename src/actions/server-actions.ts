"use server";

import { createStreamableValue } from "ai/rsc";
import { generateText, streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { CoreMessage } from "ai";

export async function continueConversation({
  messages,
  imageUrl,
}: {
  messages: CoreMessage[];
  imageUrl?: string;
}) {
  let imageDescription = "";

  if (imageUrl) {
    console.log(imageUrl);
    // Step 1: Generate image description
    const descriptionResult = await generateText({
      model: groq("llama-3.2-11b-vision-preview"),
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: getDescriptionPrompt },
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
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant. If an image description is provided, incorporate it into your response.",
      },
      ...messages,
      ...(imageDescription
        ? [
            {
              role: "user" as const,
              content: `Image description: ${imageDescription}`,
            },
          ]
        : []),
    ],
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

const getDescriptionPrompt = `Describe the attached image in  great detail detail so a developer can recreate it in React Native. Follow these instructions carefully:

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

here is an example image description: \n
Layout Structure:
- Status bar at top (11:16, signal icons, battery indicator)
- Location bar with pin icon showing "Unnamed Road" and "NK" text
- Greeting header "Jamboooo, Nzai Kilonzo" with smiling emoji
- Subheader text "Where are you going to eat today?"
- Search bar with placeholder "Search here" and magnifying glass icon
- Light mint-green promotional banner for "Exclusive Vouchers"
  - Text "Claim your vouchers now"
  - Small basket icon with fruits/vegetables on right

Restaurant Section:
- "All Restaurants" header in green text
- Restaurant cards in grid layout:
  1. Bruce Delicacies
     - Restaurant image showing palm plants and neon signage
     - 5-star rating displayed with yellow stars
     - "416.31 km" distance indicator
     - "1 Reviews" text
  2. Testy
     - Food image showing what appears to be bacon/meat dish
     - 5-star rating displayed

Bottom Navigation Bar:
- Fixed at bottom
- Light green background
- 4 equally-spaced icons with labels:
  - Home (house icon)
  - Wallet (card icon)
  - Orders (cart icon)
  - Profile (person icon)

Color Scheme:
- Primary green: #00C853 (approximately)
- Background: White
- Text: Black for headers, gray for secondary text
- Cards: White with subtle shadows
- Bottom nav: Light green background

Typography:
- Headers: Bold, large size for main greeting
- Subtext: Regular weight, smaller size
- Navigation labels: Small, regular weight
\n
`;
