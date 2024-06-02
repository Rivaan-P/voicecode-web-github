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
import { getAuth } from "firebase/auth";
import { RandomAvatar } from "react-random-avatars";

import { memo } from "react";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import CodeBlock from "../ui/codeblock";

const ChatMessage = ({ text, sender, nameRandom }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const MemoizedReactMarkdown = memo(
    ReactMarkdown,
    (prevProps, nextProps) =>
      prevProps.children === nextProps.children &&
      prevProps.className === nextProps.className
  );

  // console.log(nameRandom);

  // if (user) {
  //   // User is signed in.
  //   // console.log(user);
  //   setUserProfile(user.user.photoURL);
  // } else {
  //   setUserProfile("");
  // }
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
                  {user ? (
                    <AvatarImage src={user.photoURL} alt={sender} />
                  ) : (
                    // <RandomAvatar name={name} size={40} />
                    <RandomAvatar name={nameRandom} />
                  )}
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
                  sender === "user"
                    ? (navigator.clipboard.writeText(text),
                      toast("Text Copied!", {
                        action: {
                          label: "Close",
                          onClick: () => "",
                        },
                      }))
                    : "";
                }}
                className=" "
              >
                <div
                  className={` grid grid-col-1 gap-2.5 [&_>_*]:min-w-0 chat-message flex items-center items-start gap-2 ${
                    sender === "user"
                      ? "user text-left cursor-pointer"
                      : "assistant "
                  }`}
                >
                  {/* <span className="text-gray-800 text-base leading-relaxed">{text}</span> */}

                  {/* <ReactMarkdown className="textmd text-base leading-relaxed "> */}
                  <MemoizedReactMarkdown
                    className={
                      "prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                    }
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                      p: ({ children }) => {
                        return <p className="mb-2 last:mb-0">{children}</p>;
                      },
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }) => {
                        // if (children.length) {
                        //   if (children[0] === "▍") {
                        //     return (
                        //       <span className="mt-1 cursor-default animate-pulse">
                        //         ▍
                        //       </span>
                        //     );
                        //   }

                        //   // children[0] = children[0].replace("`▍`", "▍");
                        // }

                        const match = /language-(\w+)/.exec(className || "");

                        if (inline) {
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }

                        return (
                          <CodeBlock
                            key={Math.random()}
                            language={(match && match[1]) || ""}
                            value={String(children).replace(/\n$/, "")}
                            {...props}
                          />
                        );
                      },
                    }}
                  >
                    {text}
                  </MemoizedReactMarkdown>
                  {/* </ReactMarkdown> */}
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
