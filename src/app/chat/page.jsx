"use client";

import { Resizable } from "@/components/Resizable";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import React from "react";

const Chat = () => {
  useKeyboardShortcut(["Control", " "], () => {
    const button = document.getElementById("micButton");
    if (button) {
      button.click();
    }
    // console.log("pressed");
  });

  return <Resizable />;
};

export default Chat;
