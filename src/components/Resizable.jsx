"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ChatDialog from "./chatui/DialogChat";
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
  });
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="resize-chat rounded-lg border"
    >
      <ResizablePanel id="kiri" defaultSize={40}>
        <ResizablePanelGroup direction="vertical">
          {/* FILE DIRECTORY >>> */}
          <ResizablePanel defaultSize={50}>
            <FileDirectoryPage />
          </ResizablePanel>
          <ResizableHandle withHandle />
          {/* BRANCHING TREE >>> */}
          <ResizablePanel defaultSize={50}>
            <BranchingTree onClickTree={handleClickTree} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      {/* CHAT UI >>>  */}
      <ResizablePanel defaultSize={60}>
        <ChatDialog dataTree={clickTree} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
