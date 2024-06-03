"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState, useTransition } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

import { IoIosArrowBack, IoIosAdd } from "react-icons/io";

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
import ThemeSwitcherButton from "../themeSwitcher";

const ChatDialog = ({ dataTree }) => {
  const { setTheme, theme } = useTheme();
  const [_, startTransition] = useTransition();

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
      <div className="chat-window pt-[2rem]">
        <div className="chat-messages  pb-40">
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
        <div className="w-[inherit] max-w-[-webkit-fill-available] space-y-4 border-t dark:bg-black  bg-white px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4 fixed bottom-0">
          <form
            className=" flex pr-3 pl-3 gap-4 items-center"
            onSubmit={handleSubmit}
          >
            <AutosizeTextarea
              maxHeight={150}
              id="inputchet"
              className="min-h-[60px] w-full bg-transparent  resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
              rows={1}
              name="message"
              autoComplete="off"
              value={input}
              onChange={handleInputChangeAI}
              onKeyDown={handleKeyDown}
              placeholder="Use Ctrl + Space as a voice shortcut."
            />
            <div className="flex  items-center gap-2">
              <Toggle id="micButton" aria-label="Toggle bold">
                <Mic />
              </Toggle>
              <Button
                onClick={() => {}}
                disabled={!input}
                type="submit"
                variant="outline"
              >
                <Send />
              </Button>
              {isLoading ? (
                <Button onClick={stop} type="submit" variant="outline">
                  Stop
                </Button>
              ) : null}
            </div>
          </form>
        </div>
        {/* <Separator className="my-4" /> */}
        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="fixed right-0 top-1/2 z-40 mr-1"
            >
              <div className="">
                <IoIosArrowBack size={15} />
              </div>
            </Button>
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
      </div>
    </div>
  );
};

export default ChatDialog;
