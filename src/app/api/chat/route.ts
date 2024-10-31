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
              text: `Please analyze this UI/app screen in detail with a technical focus. Describe:
                    1. Core UI elements and their hierarchy (buttons, inputs, layout structure)
                    2. Visual styling (colors, spacing, typography)
                    3. Apparent interactions and states
                    4. Notable UX patterns

                    Please be specific and thorough, as this will be used for development reference.Please be specific and thorough, as this will be used for React Native development reference.`,
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
- Please ONLY return the full React Native code starting with the imports, nothing else. It's very important for my job that you only return the React Native code with imports. DO NOT START WITH \`\`\`typescript or \`\`\`javascript or \`\`\`tsx or \`\`\`. just return the React Native code.

- If you need an icon, use icons from \`expo/vector-icons\` but make sure they integrate seamlessly.
- Make the design look polished and avoid using borders around the entire screen even if described in the prompt. 
-AVOID REPLYING WITH TEXT EVEN IF ITS A CONTINUING CONVERSATION. JUST FIX THE CODE AND RETURN THE CODE
- ALWAYS RETURN CODE.  ALWAYS. AVOID CODE AS Markdown. NO INDICATIONS. JUST CODE AND CODE ONLY.
- USE THE <TYPOGRAPHY> TAG INSTEAD OF <TEXT> IN PLACES WHERE TEXT IS NECESSARY.


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

 Here is the an example on how to use the prestyled components:
 \n
 \`\`\`tsx
      import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Typography } from './ui/typography';
import { Tabs, Tab } from './ui/tabs';
import { Input } from './ui/input';
import { Divider } from './ui/divider';

export default function ComponentShowcase() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>

         <Card style={styles.card}>
       
        
       
      </Card>
        <CardHeader>
          <Typography variant="h3">Components Demo</Typography>
        </CardHeader>
        
        <CardContent>
          <View style={styles.section}>
            <Typography variant="h4">Avatar & Badge</Typography>
            <Avatar 
              source={{ uri: "https://github.com/shadcn.png" }}
              size="large"
              fallback="CN"
            />
            <Badge variant="default">New</Badge>
          </View>
          
          <Divider />
          
          
          
          <Divider />
          
          <View style={styles.section}>
            <Typography variant="h4">Navigation Tabs</Typography>
            <Tabs>
              <Tab label="Tab 1" isActive={false} />
              <Tab label="Tab 2"  onPress={() => {}} />
              <Tab label="Tab 3" />
            </Tabs>
          </View>
          
          <Divider />
          <View style={styles.section}>
            <Typography variant="h4">Buttons</Typography>
          
            <Button variant="secondary">Button</Button>
          </View>
          
          <Divider />
          
          <View style={styles.section}>
            <Typography variant="h4">Input Fields</Typography>
            <Input placeholder="Enter your name" />
            <Input placeholder="Enter your email" />
          </View>
        </CardContent>
        
        <CardFooter>
          <Typography variant="muted">Component showcase footer</Typography>
        </CardFooter>
      </Card>
    </View>
  );
}
  const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    gap: 16,
  },
  section: {
    gap: 8,
  },
  
  



    `;

  return dedent(systemPrompt);
}
