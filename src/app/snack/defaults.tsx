import type { SnackOptions, SnackFiles } from "snack-sdk";

const defaultFiles: SnackFiles = {
  "App.js": {
    type: "CODE",
    contents: `
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Badge } from './components/ui/badge';
import ComponentShowcase from './components/ComponentShowcase';
import { Typography } from './components/ui/typography';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
       
        
        <ComponentShowcase />
        <Typography variant="h1">Heading 1</Typography>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});`,
  },

  "components/ComponentShowcase.js": {
    type: "CODE",
    contents: `import React from 'react';
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
});`,
  },

  "components/ui/avatar.js": {
    type: "CODE",
    contents: `import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SIZES = {
  small: 24,
  medium: 32,
  large: 40,
};

export function Avatar({ source, size = 'medium', fallback }) {
  const [hasError, setHasError] = React.useState(false);
  const dimension = SIZES[size];

  const containerStyle = {
    width: dimension,
    height: dimension,
    borderRadius: dimension / 2,
  };

  if (hasError || !source) {
    return (
      <View style={[styles.fallback, containerStyle]}>
        <Text style={styles.fallbackText}>{fallback}</Text>
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={[styles.image, containerStyle]}
      onError={() => setHasError(true)}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#e5e7eb',
  },
  fallback: {
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
});`,
  },

  "components/ui/button.js": {
    type: "CODE",
    contents: `import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const variants = {
  default: {
    container: {
      backgroundColor: '#000000',
    },
    text: {
      color: '#ffffff',
    },
  },
  destructive: {
    container: {
      backgroundColor: '#ef4444',
    },
    text: {
      color: '#ffffff',
    },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    text: {
      color: '#000000',
    },
  },
};

export function Button({ 
  children, 
  variant = 'default',
  onPress,
  disabled,
}) {
  const variantStyles = variants[variant];

  return (
    <Pressable
      style={[
        styles.container,
        variantStyles.container,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, variantStyles.text]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});`,
  },

  "components/ui/badge.js": {
    type: "CODE",
    contents: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const variants = {
  default: {
    container: {
      backgroundColor: '#000000',
    },
    text: {
      color: '#ffffff',
    },
  },
  secondary: {
    container: {
      backgroundColor: '#e5e7eb',
    },
    text: {
      color: '#374151',
    },
  },
  destructive: {
    container: {
      backgroundColor: '#ef4444',
    },
    text: {
      color: '#ffffff',
    },
  },
};

export function Badge({ 
  children, 
  variant = 'default',
}) {
  const variantStyles = variants[variant];

  return (
    <View style={[styles.container, variantStyles.container]}>
      <Text style={[styles.text, variantStyles.text]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});`,
  },

  "components/ui/typography.js": {
    type: "CODE",
    contents: `import React from 'react';
import { Text, StyleSheet } from 'react-native';

const variants = {
  h1: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  p: {
    fontSize: 14,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  muted: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6b7280',
  },
};

export function Typography({ 
  variant = 'p', 
  children, 
  style,
  ...props 
}) {
  return (
    <Text 
      style={[
        styles.base,
        variants[variant],
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: '#000000',
  },
});`,
  },

  "components/ui/tabs.js": {
    type: "CODE",
    contents: `import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Typography } from './typography';

export function Tabs({ children }) {
  return (
    <View style={styles.tabContainer}>
      {children}
    </View>
  );
}

export function Tab({ 
  label, 
  icon, 
  isActive, 
  onPress 
}) {
  return (
    <Pressable 
      style={[
        styles.tab,
        isActive && styles.activeTab
      ]}
      onPress={onPress}
    >
      {icon}
      <Typography 
        variant="small" 
        style={[
          styles.tabText,
          isActive && styles.activeTabText
        ]}
      >
        {label}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#f3f4f6',
  },
  tabText: {
    color: '#6b7280',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '500',
  },
});`,
  },

  "components/ui/input.js": {
    type: "CODE",
    contents: `import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export function Input({
  placeholder,
  leftIcon,
  rightIcon,
  error,
  ...props
}) {
  return (
    <View style={[
      styles.container,
      error && styles.errorContainer
    ]}>
      {leftIcon && (
        <View style={styles.iconContainer}>
          {leftIcon}
        </View>
      )}
      <TextInput
        style={[
          styles.input,
          leftIcon && styles.inputWithLeftIcon,
          rightIcon && styles.inputWithRightIcon,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {rightIcon && (
        <View style={styles.iconContainer}>
          {rightIcon}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  errorContainer: {
    borderColor: '#ef4444',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000000',
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  iconContainer: {
    padding: 12,
  },
});`,
  },

  "components/ui/card.js": {
    type: "CODE",
    contents: `import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

export function Card({ 
  children, 
  onPress,
  style 
}) {
  const CardComponent = onPress ? Pressable : View;
  
  return (
    <CardComponent 
      style={[styles.container, style]}
      onPress={onPress}
    >
      {children}
    </CardComponent>
  );
}

export function CardHeader({ children, style }) {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
}

export function CardContent({ children, style }) {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
}

export function CardFooter({ children, style }) {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    backgroundColor: '#f9fafb',
  },
});`,
  },

  "components/ui/divider.js": {
    type: "CODE",
    contents: `import React from 'react';
import { View, StyleSheet } from 'react-native';

export function Divider({ 
  orientation = 'horizontal',
  style 
}) {
  return (
    <View 
      style={[
        styles.base,
        orientation === 'vertical' ? styles.vertical : styles.horizontal,
        style
      ]} 
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#e5e7eb',
  },
  horizontal: {
    height: 1,
    width: '100%',
    marginVertical: 16,
  },
  vertical: {
    width: 1,
    height: '100%',
    marginHorizontal: 16,
  },
});`,
  },
};

const defaultOptions: SnackOptions = {
  name: "UI Components Demo",
  description: "A collection of reusable UI components for React Native",
  files: defaultFiles,
  dependencies: {
    "react-native-gesture-handler": { version: "~2.14.0" },
    "@expo/vector-icons": { version: "^13.0.0" },
    "react-native-reanimated": { version: "~3.6.0" },
  },
  codeChangesDelay: 500,
};

export default defaultOptions;
