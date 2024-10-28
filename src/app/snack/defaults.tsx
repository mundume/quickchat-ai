import type { SnackOptions, SnackFiles } from "snack-sdk";

const defaultFiles: SnackFiles = {
  "App.js": {
    type: "CODE",
    contents: `import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ComponentShowcase from './components/ComponentShowcase';
import {Badge} from './components/ui/badge';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <ComponentShowcase />
        <Badge>pleb</Badge>
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
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export default function ComponentShowcase() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.section}>
          <Avatar 
            source={{ uri: "https://github.com/shadcn.png" }}
            size="large"
            fallback="CN"
          />
          <Badge variant="default">New</Badge>
        </View>
        
        <View style={styles.section}>
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 16,
    gap: 16,
  },
  section: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
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

  "components/ui/card.js": {
    type: "CODE",
    contents: `import React from 'react';
import { View, StyleSheet } from 'react-native';

export function Card({ children, style }) {
  return (
    <View style={[styles.container, style]}>
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
