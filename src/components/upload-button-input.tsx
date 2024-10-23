"use client";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

const CombinedUploadInput = () => {
  const [text, setText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("ImageUploader", {
    onClientUploadComplete: (res) => {
      const uploadedUrl = res?.[0]?.url;
      if (uploadedUrl) {
        setText(uploadedUrl);
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

  return (
    <div className="relative flex w-full max-w-xl">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Custom combined input */}
      <div className="flex w-full items-center rounded-md border border-input bg-background ring-offset-background">
        {/* Upload button positioned inside the input on the left */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-none"
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          <Upload className={cn("h-4 w-4", isUploading && "animate-pulse")} />
        </Button>

        {/* Vertical separator line */}
        <div className="h-4 w-[1px] bg-border" />

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={cn(
            "flex h-9 w-full rounded-none bg-transparent px-3 py-1 text-sm",
            "ring-offset-background file:border-0",
            "focus-visible:outline-none focus-visible:ring-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-muted-foreground"
          )}
          placeholder="Type or upload an image..."
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

export default CombinedUploadInput;
