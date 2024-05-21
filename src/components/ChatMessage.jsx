import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ text, sender }) => {
  return (
    <div
      className={`chat-message flex items-start gap-2 ${
        sender === "user" ? "user" : "assistant"
      }`}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt={sender} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      {/* <span className="text-gray-800 text-base leading-relaxed">{text}</span> */}
      <ReactMarkdown className="text-gray-800 text-base leading-relaxed">
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMessage;
