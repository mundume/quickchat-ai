"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Download,
  Code,
  ExternalLink,
  ChevronRight,
  Folder,
  File,
  MoreVertical,
} from "lucide-react";

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

const IconButton = ({ icon: Icon }) => (
  <Button variant="ghost" size="sm" className="p-2">
    <Icon className="h-4 w-4" />
  </Button>
);

export default function SnackEditor() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [projectName, setProjectName] = useState("biased red chocolates");

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-3 py-2 border-b bg-white">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-200 rounded" />
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-48 h-8 text-sm bg-transparent border-none"
          />
          <span className="text-xs text-gray-500">Not saved yet.</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input placeholder="Search API" className="h-8 w-48 pl-8 text-sm" />
          </div>
          <Button
            size="sm"
            variant="default"
            className="bg-blue-500 hover:bg-blue-600"
          >
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

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-60 border-r bg-white">
          <div className="p-2">
            <div className="flex items-center px-2 py-1">
              <ChevronRight className="h-4 w-4" />
              <span className="text-sm ml-1">Open files</span>
            </div>
            <div className="bg-gray-100 px-2 py-1 text-sm rounded">
              <File className="h-4 w-4 inline mr-2" />
              App.js
            </div>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4" />
                <span className="text-sm ml-1">Project</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <File className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Folder className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="pl-6 text-sm space-y-1">
              <div className="flex items-center">
                <Folder className="h-4 w-4 mr-2" />
                assets
              </div>
              <div className="flex items-center">
                <Folder className="h-4 w-4 mr-2" />
                components
              </div>
              <div className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                App.js
              </div>
              <div className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                package.json
              </div>
              <div className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                README.md
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full font-mono text-sm p-4 focus:outline-none resize-none"
              spellCheck="false"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center p-2 bg-white border-t">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8">
                My Device
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Android
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                iOS
              </Button>
              <Button
                variant="default"
                size="sm"
                className="h-8 bg-blue-500 hover:bg-blue-600"
              >
                Web
              </Button>
              <IconButton icon={ExternalLink} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
