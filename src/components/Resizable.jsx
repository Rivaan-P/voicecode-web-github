import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ChatDialog from "./DialogChat";

export function Resizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="resize-chat rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">File Directory UI</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Prompt Branching UI</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      {/*  */}
      <ResizableHandle withHandle />
      {/*  */}
      <ResizablePanel defaultSize={50}>
        <div class="app-container">
          <ChatDialog />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
