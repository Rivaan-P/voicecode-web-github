"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import ChatMessage from "./ChatMessage";
import { Mic } from "lucide-react";

const ChatDialog = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      // Call your API or handle the user's input here
      setInputValue("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            text={message.text}
            sender={message.sender}
          />
        ))}
      </div>
      <Separator className="my-4" />
      <form className="flex gap-4 items-center" onSubmit={handleSubmit}>
        <AutosizeTextarea
          maxHeight={200}
          name="message"
          autoComplete="off"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Reply to VoiceCode..."
        />
        <Toggle id="micButton" aria-label="Toggle bold">
          <Mic />
        </Toggle>
      </form>
    </div>
  );
};

export default ChatDialog;
