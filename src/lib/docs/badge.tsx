export const name = "Badge";
export const importDocs = `
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
export const usageDocs = `
<Badge variant="success">Completed</Badge>
`;
