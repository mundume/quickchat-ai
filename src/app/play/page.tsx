"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Save, Settings } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Snack, getSupportedSDKVersions, SDKVersion } from "snack-sdk";
import { highlight, languages } from "prismjs/components/prism-core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Editor from "react-simple-code-editor";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import defaults from "@/components/defaults";

const INITIAL_CODE_CHANGES_DELAY = 500;
const VERBOSE = typeof window !== "undefined";

export default function SnackChatPreview() {
  // State for image upload
  const [isUploading, setIsUploading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>();
  const [chatMessages, setChatMessages] = useState<
    { id: string; content: string; role: "user" | "system" }[]
  >([]);
  const [chatInput, setChatInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Snack state
  const webPreviewRef = useRef<Window | null>(null);
  const [snack] = useState(
    () =>
      new Snack({
        ...defaults,
        online: true,
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
  const [isClientReady, setClientReady] = useState(false);

  // Uploadthing setup
  const { startUpload } = useUploadThing("ImageUploader", {
    onClientUploadComplete: (res) => {
      const uploadedUrl = res?.[0]?.url;
      if (uploadedUrl) {
        setCurrentImageUrl(uploadedUrl);
        toast.success("Image uploaded successfully!");
      }
      setIsUploading(false);
    },
    onUploadError: (err) => {
      toast.error(`Image upload failed: ${err.message}`);
      setIsUploading(false);
    },
  });

  // Snack effect
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

  // Handlers
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await startUpload([file]);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCodeChange = (newCode: string) => {
    snack.updateFiles({
      "App.tsx": {
        type: "CODE",
        contents: newCode,
      },
    });
  };

  // Chat message handler
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: chatInput,
      role: "user" as const,
    };
    setChatMessages((prev) => [...prev, userMessage]);

    // Optional: Add a system response (just for demonstration)
    const systemMessage = {
      id: `system-${Date.now()}`,
      content: `Echo: ${chatInput}`,
      role: "system" as const,
    };
    setChatMessages((prev) => [...prev, systemMessage]);

    // Clear input
    setChatInput("");
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-2 bg-white border-b">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">{name}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
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
            <Save className="w-4 h-4 font-normal text-slate-900 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <Button
            size="sm"
            onClick={async () => {
              setIsDownloading(true);
              try {
                const url = await snack.getDownloadURLAsync();
                window.open(url, "_blank");
              } catch (err) {
                console.error("Get download URL failed", err);
              }
              setIsDownloading(false);
            }}
            disabled={isDownloading}
          >
            <Download className="w-4 h-4 font-normal text-slate-900 mr-2" />
            {isDownloading ? "Downloading..." : "Download"}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4 font-normal text-slate-900" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
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
                    onChange={(event) =>
                      snack.setDescription(event.target.value)
                    }
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
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Chat Panel */}
          <Panel defaultSize={25} minSize={20}>
            <div className="h-full flex flex-col">
              <div className="flex-grow overflow-y-auto p-4">
                {chatMessages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "whitespace-pre-wrap p-2 rounded-lg mb-4",
                      m.role === "user"
                        ? "bg-blue-100 ml-auto max-w-[80%]"
                        : "bg-gray-100 mr-auto max-w-[80%]"
                    )}
                  >
                    {m.content}
                  </div>
                ))}
                {currentImageUrl && (
                  <div className="mb-4 relative">
                    <img
                      src={currentImageUrl}
                      alt="Uploaded image"
                      className="max-w-[200px] rounded-lg"
                    />
                    <Button
                      onClick={() => setCurrentImageUrl(undefined)}
                      className="absolute top-2 right-2"
                      size="sm"
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 border-t">
                <div className="relative flex w-full items-center rounded-lg border border-gray-300 bg-white">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-l-lg"
                    onClick={handleUploadClick}
                    disabled={isUploading}
                  >
                    <Upload
                      className={cn("h-4 w-4", isUploading && "animate-pulse")}
                    />
                  </Button>
                  <div className="h-5 w-[1px] bg-gray-200" />
                  <input
                    className={cn(
                      "flex h-10 w-full rounded-r-lg bg-transparent px-3 py-2",
                      "focus:outline-none focus:ring-0",
                      "disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                    value={chatInput}
                    placeholder={
                      currentImageUrl
                        ? "Add a message about the image..."
                        : "Say something..."
                    }
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isUploading}
                  />
                </div>
              </form>
            </div>
          </Panel>

          <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />

          {/* Code Editor Panel */}
          <Panel defaultSize={35} minSize={30}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-10px)]">
                <Editor
                  value={files["App.tsx"].contents as string}
                  onValueChange={(code) => handleCodeChange(code)}
                  highlight={(code) => highlight(code, languages.js)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              </CardContent>
            </Card>
          </Panel>

          <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />

          {/* Preview Panel */}
          <Panel defaultSize={40} minSize={30}>
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
                    allow="geolocation; camera; microphone; screen-wake-lock;"
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
    </div>
  );
}
