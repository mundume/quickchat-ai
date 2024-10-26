export const name = "Input";
export const importDocs = `
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
    <View
      style={[
        styles.container,
        error && styles.error,
        disabled && styles.disabled,
      ]}
    >
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

export const usageDocs = `
<Input
  placeholder="Enter your name"
  leftIcon="user"
  onChangeText={(text) => console.log(text)}
/>
`;
