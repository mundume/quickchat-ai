export const name = "Card";
export const importDocs = `
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

export const usageDocs = `
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
`;
