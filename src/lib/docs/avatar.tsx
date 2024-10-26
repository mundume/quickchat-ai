export const name = "Avatar";
export const importDocs = `
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
export const usageDocs = `
<Avatar size="medium">
  <AvatarImage source={{ uri: "https://github.com/nutlope.png" }} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
`;
