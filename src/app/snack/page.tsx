"use client";

import { useState, useEffect, useRef } from "react";
import { Snack, getSupportedSDKVersions, SDKVersion } from "snack-sdk";
import { QRCodeSVG } from "qrcode.react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import defaults from "./defaults";

const INITIAL_CODE_CHANGES_DELAY = 500;
const VERBOSE = typeof window !== "undefined";

const INITIAL_CODE = `
import * as React from 'react';
import { View, Text } from 'react-native';

export default () => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Text style={{fontSize: 20, textAlign: 'center'}}>
      Hello Snack!
    </Text>
  </View>
);
`;

export default function Home() {
  const webPreviewRef = useRef<Window | null>(null);
  const [snack] = useState(
    () =>
      new Snack({
        ...defaults,
        disabled: typeof window === "undefined",
        codeChangesDelay: INITIAL_CODE_CHANGES_DELAY,
        verbose: VERBOSE,
        webPreviewRef:
          typeof window !== "undefined" ? webPreviewRef : undefined,
      })
  );
  const [snackState, setSnackState] = useState(snack.getState());
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [codeChangesDelay, setCodeChangesDelay] = useState(
    INITIAL_CODE_CHANGES_DELAY
  );
  const [isClientReady, setClientReady] = useState(false);

  useEffect(() => {
    const listeners = [
      snack.addStateListener((state) => {
        setSnackState(state);
      }),
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

  const {
    files,
    url,
    deviceId,
    online,
    onlineName,
    connectedClients,
    name,
    description,
    sdkVersion,
    webPreviewURL,
  } = snackState;

  const handleCodeChange = (newCode: string) => {
    snack.updateFiles({
      "App.js": {
        type: "CODE",
        contents: newCode,
      },
    });
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => snack.setName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(event) => snack.setDescription(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sdkVersion">SDK Version</Label>
              <Select
                value={sdkVersion}
                onValueChange={(value) =>
                  snack.setSDKVersion(value as SDKVersion)
                }
              >
                <SelectTrigger id="sdkVersion">
                  <SelectValue placeholder="Select SDK Version" />
                </SelectTrigger>
                <SelectContent>
                  {getSupportedSDKVersions().map((ver) => (
                    <SelectItem key={ver} value={ver}>
                      {ver}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deviceId">Device ID</Label>
              <Input
                id="deviceId"
                placeholder="xxxx-xxxx"
                value={deviceId}
                onChange={(event) => snack.setDeviceId(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeChangesDelay">
                Send Code changes automatically
              </Label>
              <Select
                value={codeChangesDelay.toString()}
                onValueChange={(value) => {
                  const delay = Number(value);
                  snack.setCodeChangesDelay(delay);
                  setCodeChangesDelay(delay);
                }}
              >
                <SelectTrigger id="codeChangesDelay">
                  <SelectValue placeholder="Select delay" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Disabled (-1)</SelectItem>
                  <SelectItem value="0">Immediately (0)</SelectItem>
                  <SelectItem value="500">Debounced (after 500ms)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Button onClick={() => snack.setOnline(!online)}>
                {online ? "Go Offline" : "Go Online"}
              </Button>
              {online && (
                <div>
                  <p>Status: Online</p>
                  <p>Online name: {onlineName}</p>
                  <p>
                    {Object.keys(connectedClients).length} connected client(s)
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Button
                onClick={async () => {
                  setIsSaving(true);
                  try {
                    const { id } = await snack.saveAsync();
                    console.log(`Saved with id ${id}`);
                  } catch (err) {
                    console.error("Save failed", err);
                  }
                  setIsSaving(false);
                }}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={async () => {
                  setIsDownloading(true);
                  try {
                    const url = await snack.getDownloadURLAsync();
                    console.log(`Download URL: ${url}, starting download...`);
                    window.open(url, "_blank");
                  } catch (err) {
                    console.error("Get download URL failed", err);
                  }
                  setIsDownloading(false);
                }}
                disabled={isDownloading}
              >
                {isDownloading ? "Downloading..." : "Download"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex-grow">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={30}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-60px)]">
                <Textarea
                  className="min-h-[300px] h-full font-mono"
                  value={files["App.js"].contents as string}
                  onChange={(event) => handleCodeChange(event.target.value)}
                />
              </CardContent>
            </Card>
          </Panel>
          <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />
          <Panel defaultSize={50} minSize={30}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-60px)]">
                <div className="relative h-full w-full overflow-hidden rounded border border-gray-300">
                  <iframe
                    className="h-full w-full border-0 bg-white"
                    ref={(c) =>
                      (webPreviewRef.current = c?.contentWindow ?? null)
                    }
                    src={isClientReady ? webPreviewURL : undefined}
                    allow="geolocation; camera; microphone"
                    title="Snack Preview"
                  />
                  {isClientReady && !webPreviewURL && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <p className="text-center text-sm text-gray-500">
                        Set the SDK Version to 40.0.0 or higher to use Web
                        preview
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Panel>
        </PanelGroup>
      </div>

      {online && (
        <div className="mt-4 flex justify-center">
          <QRCodeSVG className="h-[260px] w-[260px]" value={url} />
        </div>
      )}
      {online && (
        <div className="mt-2 text-center">
          <a href={url} className="text-blue-500 hover:underline">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
