// src/hooks/useKeyboardShortcut.js
import { useEffect, useRef } from "react";

const useKeyboardShortcut = (keys, callback) => {
  const keysPressed = useRef(new Set());

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current.add(event.key);

      if (keys.every((key) => keysPressed.current.has(key))) {
        callback();
      }
    };

    const handleKeyUp = (event) => {
      keysPressed.current.delete(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keys, callback]);

  return null;
};

export default useKeyboardShortcut;
