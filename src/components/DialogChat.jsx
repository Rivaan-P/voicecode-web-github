"use client";
// ChatWindow.js
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import ChatMessage from "./ChatMessage";

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
      <form onSubmit={handleSubmit}>
        <Textarea
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Reply to VoiceCode..."
        />
      </form>
    </div>
  );
};

export default ChatDialog;
