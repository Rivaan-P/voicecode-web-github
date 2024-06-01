"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

import { IoIosArrowBack } from "react-icons/io";

import { useChat } from "ai/react";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import ChatMessage from "./ChatMessage";
import { Mic, Send } from "lucide-react";
import { Spinner } from "../ui/spinner";

import { CiDark } from "react-icons/ci";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// import { IconPlus } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ChatDialog = ({ dataTree }) => {
  const { setTheme, theme } = useTheme();
  const nameRandom = localStorage.getItem("nameRandom");

  const {
    messages: messagesAI,
    input,
    handleInputChange: handleInputChangeAI,
    handleSubmit: handleSubmitAI,
    setMessages: setMessagesAI,
    isLoading,
    reload,
    stop,
  } = useChat();

  useEffect(() => {
    setMessagesAI(dataTree);
  }, [dataTree]);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log("berubah");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Enter" && e.shiftKey) {
      // Insert a new line
      setInputValue(inputValue + "\n");
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (inputValue.trim()) {
    //   setMessages([...messages, { text: inputValue, sender: "user" }]);
    //   // Call your API or handle the user's input here

    //   setInputValue("");
    // }

    handleSubmitAI(e);
    console.log(messagesAI);
    const inputcet = document.getElementById("inputchet");
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(inputcet, "");
    const event = new Event("input", { bubbles: true });
    inputcet.dispatchEvent(event);
  };

  return (
    <div className="app-container">
      <div className="chat-window">
        <div className="chat-messages">
          {messagesAI.map((m) => (
            <ChatMessage
              key={m.id}
              text={m.content}
              nameRandom={nameRandom}
              sender={m.role}
            />
          ))}
          {isLoading ? <Spinner /> : null}
        </div>
        <Separator className="my-4" />
        <form className="flex gap-4 items-center" onSubmit={handleSubmit}>
          <AutosizeTextarea
            id="inputchet"
            className="min-h-[60px] w-full bg-transparent  resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
            rows={1}
            name="message"
            autoComplete="off"
            value={input}
            onChange={handleInputChangeAI}
            onKeyDown={handleKeyDown}
            placeholder="Tip: Use Ctrl + Space as a voice shortcut."
          />
          <div className="flex  items-center gap-2">
            <Toggle id="micButton" aria-label="Toggle bold">
              <Mic />
            </Toggle>
            <Button onClick={() => {}} type="submit" variant="outline">
              <Send />
            </Button>
            {isLoading ? (
              <Button onClick={stop} type="submit" variant="outline">
                Stop
              </Button>
            ) : null}
          </div>
        </form>
        <Sheet>
          <SheetTrigger>
            <div className="fixed right-0 top-1/2 z-40 mr-2">
              <IoIosArrowBack size={20} />
            </div>
          </SheetTrigger>
          <SheetContent className="w-[200px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle>Chat Sessions</SheetTitle>
              <SheetDescription>
                <div className="mb-2">
                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-10 w-full text-white justify-start bg-zinc-200/40 px-4 shadow-none transition-colors "
                    )}
                  >
                    {/* <IconPlus className="-translate-x-2 stroke-2" /> */}
                    New Chat
                  </Link>
                </div>
              </SheetDescription>
              <Separator className="my-2" />
            </SheetHeader>
            {/* <div className="mt-2 mb-2">
            <Button className="w-full text-left " variant="ghost">
              Traverse Object Recursively
            </Button>
            <Button className="w-full text-left " variant="ghost">
              General
            </Button>
            <Button className="w-full text-left " variant="ghost">
              General
            </Button>
          </div> */}
            <div className="h-[80vh] flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-auto">
                <div className="space-y-2 px-2">
                  {/* <SidebarItems chats={chats} /> */}
                  <Button className="w-full  " variant="ghost">
                    <div className="text-left ">General</div>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                {/* <ThemeToggle /> */}
                {theme === "dark" ? (
                  <Button onClick={() => setTheme("light")}>
                    <Sun size={20} />
                  </Button>
                ) : (
                  <Button onClick={() => setTheme("dark")}>
                    <Moon size={20} />
                  </Button>
                )}
                {/* <Button>

                </Button>
                <Toggle
                  onClick={() => {
                    console.log(theme);
                    setTheme("light");
                  }}
                >
                  <CiDark size={20} />
                </Toggle> */}
                <div>clearHistory</div>
                {/* <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} /> */}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ChatDialog;
