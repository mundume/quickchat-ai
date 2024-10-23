"use client";

import { type CoreMessage } from "ai";
import { useState, useRef } from "react";
import { continueConversation } from "@/actions/actions";
import { readStreamableValue } from "ai/rsc";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("ImageUploader", {
    onClientUploadComplete: (res) => {
      const uploadedUrl = res?.[0]?.url;
      if (uploadedUrl) {
        setInput((prev) => prev + uploadedUrl);
        toast.success("Image uploaded successfully!");
      }
      setIsUploading(false);
    },
    onUploadError: (err) => {
      toast.error(`Image upload failed: ${err.message}`);
      setIsUploading(false);
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await startUpload([file]);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isUploading) return;

    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: "user" },
    ];

    setMessages(newMessages);
    setInput("");

    const result = await continueConversation(newMessages);

    for await (const content of readStreamableValue(result)) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: content as string,
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m, i) => (
        <div
          key={i}
          className={cn(
            "whitespace-pre-wrap p-2 rounded-lg mb-4",
            m.role === "user"
              ? "bg-blue-100 ml-auto max-w-[80%]"
              : "bg-gray-100 mr-auto max-w-[80%]"
          )}
        >
          {m.content as string}
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mb-8"
      >
        <div className="relative flex w-full items-center rounded-lg border border-gray-300 bg-white shadow-xl">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-l-lg"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            <Upload className={cn("h-4 w-4", isUploading && "animate-pulse")} />
          </Button>

          <div className="h-5 w-[1px] bg-gray-200" />

          <input
            className={cn(
              "flex h-10 w-full rounded-r-lg bg-transparent px-3 py-2",
              "focus:outline-none focus:ring-0",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.target.value)}
            disabled={isUploading}
          />
        </div>
      </form>
    </div>
  );
}
