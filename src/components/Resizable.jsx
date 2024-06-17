"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import ChatDialog from "./chatui/DialogChat";
import useKeyboardShortcut from "@/lib/hooks/useKeyboardShortcut";
import FileDirectoryPage from "./filedirectory/FileDirectoryPage";
import BranchingTree from "./branchingtree/BranchingTree";
import { useEffect, useState } from "react";
import SidebarUI from "./sessionsui/SidebarUI";

export function Resizable() {
  const [clickTree, setClickTree] = useState("");
  const [currentBranch, setCurrentBranch] = useState(0);

  if (global?.window !== undefined) {
    let nameRandom = localStorage.getItem("nameRandom");

    if (!nameRandom) {
      nameRandom = Math.random().toString(20).substr(2, 6);
      localStorage.setItem("nameRandom", nameRandom);
    }
  }

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
      <ResizablePanel id="kiri" defaultSize={30}>
        <ResizablePanelGroup direction="vertical">
          {/* FILE DIRECTORY >>> */}
          <ResizablePanel defaultSize={50}>
            <FileDirectoryPage />
          </ResizablePanel>
          <ResizableHandle withHandle />
          {/* BRANCHING TREE >>> */}
          <ResizablePanel defaultSize={50}>
            <BranchingTree
              currentBranch={currentBranch}
              setCurrentBranch={setCurrentBranch}
              onClickTree={handleClickTree}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      {/* CHAT UI >>>  */}
      <ResizablePanel defaultSize={80}>
        <ChatDialog
          currentBranch={currentBranch}
          setCurrentBranch={setCurrentBranch}
          dataTree={clickTree}
        />
      </ResizablePanel>
      {/* SESSIONS UI >>>  */}
      <SidebarUI />
    </ResizablePanelGroup>
  );
}
