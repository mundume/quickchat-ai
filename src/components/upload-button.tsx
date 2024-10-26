"use client";

import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Upload() {
  const { user } = useClerk();
  const {isUploading, routeConfig, startUpload} = useUploadThing(
    "pdfUploader",
    {
      
    }
    
  )
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user && (
        <UploadButton
        content={}
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
      <Button onClick={() => startUpload({
        
      })}>Upload</Button>
    </main>
  );
}
