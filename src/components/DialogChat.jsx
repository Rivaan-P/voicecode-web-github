"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

import { useChat } from "ai/react";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import ChatMessage from "./ChatMessage";
import { Mic, Send } from "lucide-react";

const ChatDialog = () => {
  const {
    messages: messagesAI,
    input,
    handleInputChange: handleInputChangeAI,
    handleSubmit: handleSubmitAI,
  } = useChat();
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
    <div className="chat-window">
      <div className="chat-messages">
        {messagesAI.map((m) => (
          <ChatMessage key={m.id} text={m.content} sender={m.role} />
        ))}
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
        </div>
      </form>
    </div>
  );
};

export default ChatDialog;
