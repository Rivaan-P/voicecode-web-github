"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ChatDialog from "./DialogChat";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import FileDirectoryPage from "./filedirectory/FileDirectoryPage";
import BranchingTree from "./branchingtree/BranchingTree";
import { useState } from "react";

export function Resizable() {
  const [clickTree, setClickTree] = useState("");
  const handleClickTree = (newTree) => {
    setClickTree(newTree);
  };

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
      <ResizablePanel id="kiri" defaultSize={40}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <FileDirectoryPage />
            {/* <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">File Directory UI</span>
            </div> */}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <BranchingTree onClickTree={handleClickTree} />
            {/* <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Prompt Branching UI</span>
            </div> */}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      {/*  */}
      <ResizableHandle withHandle />
      {/*  */}
      <ResizablePanel defaultSize={60}>
        <div className="app-container">
          <ChatDialog dataTree={clickTree} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
