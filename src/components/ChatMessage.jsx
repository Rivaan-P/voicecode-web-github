import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

import { toast } from "sonner";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ChatMessage = ({ text, sender }) => {
  return (
    <HoverCard>
      <HoverCardTrigger
        onClick={() =>
          toast("Text Copied!", {
            description: "not yet implemented :(",
            action: {
              label: "close",
              onClick: () => console.log("Undo"),
            },
          })
        }
        className="cursor-pointer"
      >
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
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        <div className="flex justify-between space-x-4">
          <div>copy</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ChatMessage;
