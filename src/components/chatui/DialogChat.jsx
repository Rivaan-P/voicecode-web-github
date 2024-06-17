"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState, useTransition } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

import { useChat } from "ai/react";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import ChatMessage from "./ChatMessage";
import { Mic, Send } from "lucide-react";
import { Spinner } from "../ui/spinner";

// import { IconPlus } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeSwitcherButton from "../sessionsui/themeSwitcher";

const ChatDialog = ({ dataTree, currentBranch, setCurrentBranch }) => {
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
  } = useChat({
    headers: {
      "Content-Type": "application/json",
      kodeUnik: nameRandom,
      currentBranch: currentBranch,
    },
    async onFinish(newMessage) {
      // Store the new message in IndexedDB
      console.log("Stored message:", newMessage);
    },
  });

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
    // console.log(messagesAI);
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
            <Toggle id="micButton" aria-label="Toggle bold">
              <Mic />
            </Toggle>
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
      </div>
    </div>
  );
};

export default ChatDialog;
