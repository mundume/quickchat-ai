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
          1. Screen Layout
          - Screen orientation and dimensions
          - Main container structure (top-to-bottom description)
          - Element positioning and alignment
          - Safe area considerations

           2. UI Components
          For each component, specify:
          - Type (header, card, button, input, etc.)
          - Exact position in layout
          - Dimensions and spacing (padding/margin)
          - Text content (verbatim)

           3. Styling Details
          - Background colors (exact values)
          - Text styles (size, color, weight)
          - Border styles and shadows
          - Component-specific styling

           4. Interactions
          - Touchable elements
          - State changes
          - Navigation patterns
          - Gestures/animations

           5. Platform Considerations
          - iOS/Android differences
          - Native component usage
          - Platform-specific patterns

          Please provide measurements in dp/pt and colors in hex/rgba format.

          
            `,
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
    model: groq("llama-3.2-90b-text-preview"),
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
-YOU WILL BE PUNISHED IF YOU RETURN TRIPPLE BACKTICKS OR TEXT THAT IS NOT CODE
- Feel free to have multiple components in the file, but make sure to have one main component that uses all the other components.
- Make sure the app screen looks exactly like the description provided in the prompt.
- Pay close attention to background color, text color, font size, font family, padding, margin, border, and any other styling details. Match the colors and sizes exactly.
- Make sure to code every part of the description, including navigation bars,tab bars, buttons, input fields, icons, and other interactive elements.
- Use the exact text from the description for any visible UI elements.
- Do not add comments in the code such as "<!-- Repeat for each item -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the description. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each item -->" or bad things will happen.
- For all images, please use an SVG with a white, gray, or black background and don't try to import them locally or from the internet.
- Make sure the React Native app is interactive and functional by creating state where needed and having no required props.
- If you use any imports from React, like useState or useEffect, make sure to import them directly.
- Use TypeScript as the language for the React Native component.
- Use the \`StyleSheet.create\` API for styling. DO NOT USE ARBITRARY VALUES (e.g., \`height: 600\`). Make sure to use consistent color and spacing values.
- Use margin and padding within the StyleSheet to space out the components nicely.
- Provide code responses without triple backticks, directly displaying the code only
- If you need an icon, use materialCommunity icons from \`expo/vector-icons\` but make sure they integrate seamlessly.
- Make the design look polished and avoid using borders around the entire screen even if described in the prompt. 
-AVOID REPLYING WITH TEXT EVEN IF ITS A CONTINUING CONVERSATION. JUST FIX THE CODE AND RETURN THE CODE without any text and triple backticks. YOU WILL BE PUNISHED IF YOU RETURN TRIPPLE BACKTICKS OR TEXT THAT IS NOT CODE.
- ALWAYS RETURN CODE.  ALWAYS. AVOID CODE AS Markdown. NO INDICATIONS. JUST CODE AND CODE ONLY.
- for bottom tabs use @react-navigation/bottom-tabs library with @react-navigation/native and materialCommunity icons here is an example \nimport { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';\n
import { NavigationContainer } from '@react-navigation/native';
- USE THE <TYPOGRAPHY> TAG INSTEAD OF <TEXT> IN PLACES WHERE TEXT IS NECESSARY.
- Only add Tabs to the <App /> component.
- 


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

 Here is the an example on how to use the prestyled components and how to add a navigation bar:

      import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Import UI components
import { Avatar } from './components/ui/avatar';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Typography } from './components/ui/typography';

import { Input } from './components/ui/input';
import { Divider } from './components/ui/divider';

// Component Showcase Screen
function ComponentShowcaseScreen() {
 

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <CardHeader>
          <Typography variant="h5">Components Demo</Typography>
        </CardHeader>
        
        <CardContent>
          {/* Avatar & Badge Section */}
          <View style={styles.section}>
            <Typography variant="subtitle1">Avatar & Badge</Typography>
            <View style={styles.row}>
              <Avatar 
                source={{ uri: 'https://i.pravatar.cc/150?img=1' }}
                size="large"
              />
              <Badge>New</Badge>
            </View>
          </View>

          <Divider style={styles.divider} />



          <Divider style={styles.divider} />

          {/* Buttons Section */}
          <View style={styles.section}>
            <Typography variant="subtitle1">Buttons</Typography>
            <View style={styles.buttonGroup}>
              <Button variant="contained">Primary</Button>
              <Button variant="outlined">Secondary</Button>
              <Button variant="text">Text</Button>
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* Input Fields Section */}
          <View style={styles.section}>
            <Typography variant="subtitle1">Input Fields</Typography>
            <View style={styles.inputGroup}>
              <Input 
                placeholder="Standard input"
                style={styles.input}
              />
              <Input 
                placeholder="Password input"
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>
        </CardContent>

        <CardFooter>
          <Typography variant="body2" color="textSecondary">
            Component showcase footer
          </Typography>
        </CardFooter>
      </Card>
    </ScrollView>
  );
}

// Settings Screen
function SettingsScreen() {
  return (
    <View style={styles.centered}>
      <Typography variant="h6">Settings</Typography>
      <View style={styles.buttonGroup}>
        <Button variant="contained">Account Settings</Button>
        <Button variant="outlined">Preferences</Button>
        <Button variant="text">Help</Button>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Showcase') {
              iconName = focused
                ? 'view-dashboard'
                : 'view-dashboard-outline';
            } else if (route.name === 'Settings') {
              iconName = focused 
                ? 'cog'
                : 'cog-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Showcase" 
          component={ComponentShowcaseScreen}
          options={{
            headerShown: true,
            headerTitle: 'UI Components'
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerTitle: 'Settings'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    gap: 16,
  },
  section: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  divider: {
    marginVertical: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  inputGroup: {
    gap: 8,
  },
  input: {
    width: '100%',
  },
  tabs: {
    marginTop: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
});
  



    `;

  return dedent(systemPrompt);
}
