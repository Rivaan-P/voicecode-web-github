"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ChatDialog from "./DialogChat";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import FileDirectoryPage from "./filedirectory/FileDirectoryPage";

export function Resizable() {
  useKeyboardShortcut(["Control", " "], () => {
    const button = document.getElementById("micButton");
    if (button) {
      button.click();
    }
    // console.log("pressed");
  });
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="resize-chat rounded-lg border"
    >
      <ResizablePanel id="kiri" defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <FileDirectoryPage />
            {/* <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">File Directory UI</span>
            </div> */}
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
