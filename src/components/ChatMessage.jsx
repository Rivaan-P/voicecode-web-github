import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const ChatMessage = ({ text, sender }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TooltipProvider>
          <Tooltip>
            <div
              className={`flex  gap-2 ${
                sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {sender === "user" ? (
                <Avatar>
                  <AvatarImage
                    src="
                    https://avatars.githubusercontent.com/u/69108782?v=4"
                    alt={sender}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={sender}
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              )}

              <TooltipTrigger
                asChild
                onClick={() => {
                  navigator.clipboard.writeText(text);
                  toast("Text Copied!", {
                    action: {
                      label: "Close",
                      onClick: () => "",
                    },
                  });
                }}
                className=" cursor-pointer"
              >
                <div
                  className={` grid grid-col-1 gap-2.5 [&_>_*]:min-w-0 chat-message flex items-center items-start gap-2 ${
                    sender === "user" ? "user text-right" : "assistant "
                  }`}
                >
                  {/* <span className="text-gray-800 text-base leading-relaxed">{text}</span> */}

                  <ReactMarkdown className="textmd text-base leading-relaxed">
                    {text}
                  </ReactMarkdown>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div>copy</div>
              </TooltipContent>
            </div>
          </Tooltip>
        </TooltipProvider>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            navigator.clipboard.writeText(text);
            toast("Text Copied!", {
              action: {
                label: "Close",
                onClick: () => "",
              },
            });
          }}
          inset
        >
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ChatMessage;
