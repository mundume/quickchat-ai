"use client";

import React, { useState, useEffect } from "react";
import { Snack, getSupportedSDKVersions, SDKVersion } from "snack-sdk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LucideIcon,
  Search,
  Save,
  Download,
  Code,
  ExternalLink,
} from "lucide-react";
import defaults from "@/app/snack/defaults";

const INITIAL_CODE_CHANGES_DELAY = 500;
const VERBOSE = typeof window !== "undefined";

const INITIAL_CODE = `import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <Card>
        <AssetExample />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});`;

const IconButton = ({
  icon: Icon,
  ...props
}: { icon: LucideIcon } & React.ComponentProps<typeof Button>) => (
  <Button variant="ghost" size="icon" {...props}>
    <Icon className="h-4 w-4" />
  </Button>
);

export default function SnackEditor() {
  const [snack] = useState(
    () =>
      new Snack({
        ...defaults,
        disabled: typeof window === "undefined",
        codeChangesDelay: INITIAL_CODE_CHANGES_DELAY,
        verbose: VERBOSE,
      })
  );
  const [snackState, setSnackState] = useState(snack.getState());
  const [isClientReady, setClientReady] = useState(false);

  useEffect(() => {
    const listeners = [
      snack.addStateListener((state) => setSnackState(state)),
      snack.addLogListener(({ message }) => console.log(message)),
    ];
    if (typeof window !== "undefined") {
      setClientReady(true);
      snack.setOnline(true);
    }
    return () => {
      listeners.forEach((listener) => listener());
      snack.setOnline(false);
    };
  }, [snack]);

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode) {
      snack.updateFiles({
        "App.js": {
          type: "CODE",
          contents: newCode,
        },
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex justify-between items-center p-2 bg-white border-b">
        <div className="flex items-center space-x-2">
          <img src="/snack-icon.png" alt="Snack" className="w-6 h-6" />
          <Input
            value={snackState.name || "uplifting red blueberries"}
            onChange={(e) => snack.setName(e.target.value)}
            className="border-none text-sm font-normal w-48"
          />
          <span className="text-xs text-gray-500">Not saved yet.</span>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search API"
            className="h-8 w-48 text-sm"
            startAdornment={<Search className="h-4 w-4 text-gray-500" />}
          />
          <Button variant="primary" size="sm">
            Save
          </Button>
          <IconButton icon={Download} />
          <IconButton icon={Code} />
          <IconButton icon={ExternalLink} />
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
            N
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={INITIAL_CODE}
            onChange={handleCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              theme: "vs-light",
            }}
          />
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-100 border-t">
          <div className="flex space-x-2">
            <span className="text-sm font-medium">Open files</span>
            <Button variant="ghost" size="sm" className="text-sm">
              App.js
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="web">
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="web">Web</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Format
            </Button>
            <Select defaultValue="51.0.0">
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getSupportedSDKVersions().map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
