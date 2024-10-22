"use client";

import { UploadButton } from "@/lib/uploadthing";
import { useClerk } from "@clerk/nextjs";

export default function Upload() {
  const { user } = useClerk();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user && (
        <UploadButton
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
    </main>
  );
}
