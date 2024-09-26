import SnackDe from "@/components/snack";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Page() {
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Left Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Main Content</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Right Sidebar</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <SnackDe />
    </>
  );
}
