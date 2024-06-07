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
import { useEffect, useState } from "react";

import { IoIosArrowBack, IoIosAdd } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeSwitcherButton from "@/components/themeSwitcher";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <Sheet>
        <SheetTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="fixed right-0 top-1/2 z-40 mr-1"
                >
                  <div className="">
                    <IoIosArrowBack size={15} />
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sessions</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
        >
          <div className={cn("flex", "h-full flex-col dark:bg-zinc-950")}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4">
                <h4 className="text-sm font-medium">Chat Sessions</h4>
              </div>
              <div className="mb-2 px-2">
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10"
                  )}
                >
                  {/* <IconPlus className="-translate-x-2 stroke-2" /> */}
                  <IoIosAdd size={20} className="-translate-x-2 stroke-2" />
                  New Session
                </Link>
              </div>
              {/* <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        }
      >
        <SidebarList userId={userId} />
      </React.Suspense> */}
              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex-1 overflow-auto">
                  {/* {chats?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )} */}
                  <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No chat history
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  {/* {theme === "dark" ? (
                      <Button onClick={() => setTheme("light")}>
                        <Sun size={20} />
                      </Button>
                    ) : (
                      <Button onClick={() => setTheme("dark")}>
                        <Moon size={20} />
                      </Button>
                    )} */}
                  {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        startTransition(() => {
                          setTheme(theme === "light" ? "dark" : "light");
                        });
                      }}
                    >
                      {!theme ? null : theme === "dark" ? (
                        <Moon className="transition-all" />
                      ) : (
                        <Sun className="transition-all" />
                      )}
                      <span className="sr-only">Toggle theme</span>
                    </Button> */}
                  <ThemeSwitcherButton />
                  {/* <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} /> */}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </ResizablePanelGroup>
  );
}
