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

export const card = `
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

type CardProps = {
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export const CardHeader: React.FC<CardProps> = ({ children }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{children}</Text>
    </View>
  );
};

export const CardContent: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.content}>{children}</View>;
};

export const CardFooter: React.FC<CardProps> = ({ children }) => {
  return <View style={styles.footer}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
});
`;

// Input Component

export const input = `
import * as React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  leftIcon?: string;
  rightIcon?: string;
  secureTextEntry?: boolean;
  error?: boolean;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  leftIcon,
  rightIcon,
  secureTextEntry,
  error,
  disabled,
}) => {
  return (
    <View style={[styles.container, error && styles.error, disabled && styles.disabled]}>
      {leftIcon && (
        <Ionicons
          name={leftIcon as any}
          size={20}
          color={error ? "#ef4444" : "#64748b"}
          style={styles.leftIcon}
        />
      )}
      <TextInput
        style={[
          styles.input,
          leftIcon && styles.paddingLeft,
          rightIcon && styles.paddingRight,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        placeholderTextColor="#94a3b8"
      />
      {rightIcon && (
        <Ionicons
          name={rightIcon as any}
          size={20}
          color={error ? "#ef4444" : "#64748b"}
          style={styles.rightIcon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0f172a",
  },
  leftIcon: {
    marginLeft: 12,
  },
  rightIcon: {
    marginRight: 12,
  },
  paddingLeft: {
    paddingLeft: 8,
  },
  paddingRight: {
    paddingRight: 8,
  },
  error: {
    borderColor: "#ef4444",
  },
  disabled: {
    backgroundColor: "#f1f5f9",
    opacity: 0.5,
  },
});
`;

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
