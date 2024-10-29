// Avatar Component

export const avatar = `
import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

type AvatarProps = {
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
};

type AvatarImageProps = {
  source: { uri: string };
};

type AvatarFallbackProps = {
  children: React.ReactNode;
};

const getSizeStyle = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return { width: 32, height: 32 };
    case "large":
      return { width: 56, height: 56 };
    default:
      return { width: 40, height: 40 };
  }
};

export const Avatar: React.FC<AvatarProps> = ({ size = "medium", children }) => {
  const sizeStyle = getSizeStyle(size);
  
  return (
    <View style={[styles.container, sizeStyle]}>
      {children}
    </View>
  );
};

export const AvatarImage: React.FC<AvatarImageProps> = ({ source }) => {
  return (
    <Image
      source={source}
      style={styles.image}
    />
  );
};

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children }) => {
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
  },
  fallbackText: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "500",
  },
});
`;

// Button Component

export const button = `
import * as React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
  onPress,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
  ];

  const textStyles = [
    styles.text,
    styles[variant + "Text"],
    styles[size + "Text"],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#000"} />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#0ea5e9",
  },
  secondary: {
    backgroundColor: "#e2e8f0",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#0ea5e9",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#0f172a",
  },
  outlineText: {
    color: "#0ea5e9",
  },
  ghostText: {
    color: "#0ea5e9",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    opacity: 0.5,
  },
});
`;

// Card Component

export const card = `import React from 'react';
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
});`;

// Input Component

export const input = `import React from 'react';
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
});`;

// Badge Component

export const badge = `
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
}) => {
  return (
    <View style={[styles.badge, styles[variant]]}>
      <Text style={[styles.text, styles[variant + "Text"]]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 9999,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
  default: {
    backgroundColor: "#f1f5f9",
  },
  defaultText: {
    color: "#475569",
  },
  success: {
    backgroundColor: "#dcfce7",
  },
  successText: {
    color: "#166534",
  },
  warning: {
    backgroundColor: "#fef3c7",
  },
  warningText: {
    color: "#92400e",
  },
  error: {
    backgroundColor: "#fee2e2",
  },
  errorText: {
    color: "#991b1b",
  },
  info: {
    backgroundColor: "#dbeafe",
  },
  infoText: {
    color: "#1e40af",
  },
});
`;

export const typography = `import React from 'react';
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
});`;
