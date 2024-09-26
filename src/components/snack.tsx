// app/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import { Snack, getSupportedSDKVersions } from "snack-sdk";
import { StyleSheet, css } from "aphrodite";

const INITIAL_CODE = `
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, Snack!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
`;

export default function SnackDe() {
  const webPreviewRef = useRef(null);
  const [snack, setSnack] = useState(null);
  const [snackState, setSnackState] = useState(null);
  const [isClientReady, setClientReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newSnack = new Snack({
        files: {
          "App.js": {
            type: "CODE",
            contents: INITIAL_CODE,
          },
        },
        webPreviewRef,
      });
      setSnack(newSnack);
      setSnackState(newSnack.getState());
      setClientReady(true);
    }
  }, []);

  useEffect(() => {
    if (snack) {
      const unsubscribe = snack.addStateListener((state) => {
        setSnackState(state);
      });
      return () => unsubscribe();
    }
  }, [snack]);

  const handleCodeChange = (event) => {
    snack.updateFiles({
      "App.js": {
        type: "CODE",
        contents: event.target.value,
      },
    });
  };

  const handleSDKVersionChange = (event) => {
    snack.setSDKVersion(event.target.value);
  };

  if (!snackState) return <div>Loading...</div>;

  const { files, sdkVersion, webPreviewURL } = snackState;

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.left)}>
        <h2>Code</h2>
        <textarea
          className={css(styles.code)}
          value={files["App.js"].contents}
          onChange={handleCodeChange}
        />
      </div>
      <div className={css(styles.right)}>
        <div className={css(styles.settings)}>
          <h2>Settings</h2>
          <label>SDK Version</label>
          <select value={sdkVersion} onChange={handleSDKVersionChange}>
            {getSupportedSDKVersions().map((ver) => (
              <option key={ver} value={ver}>
                {ver}
              </option>
            ))}
          </select>
        </div>
        <div className={css(styles.preview)}>
          <h2>Preview</h2>
          <div className={css(styles.previewContainer)}>
            {isClientReady && (
              <iframe
                className={css(styles.previewFrame)}
                ref={(c) => (webPreviewRef.current = c?.contentWindow ?? null)}
                src={webPreviewURL}
                allow="geolocation; camera; microphone"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    height: "100vh",
  },
  left: {
    flex: 1,
    marginRight: 20,
  },
  right: {
    width: 300,
  },
  code: {
    width: "100%",
    height: "calc(100% - 40px)",
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: 10,
  },
  settings: {
    marginBottom: 20,
  },
  preview: {
    height: "calc(100% - 100px)",
  },
  previewContainer: {
    height: "calc(100% - 40px)",
    border: "1px solid #ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
  previewFrame: {
    width: "100%",
    height: "100%",
    border: 0,
  },
});
