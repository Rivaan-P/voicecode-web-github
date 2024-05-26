"use client";
import * as React from "react";
import Link from "next/link";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";

export function MenubarButton() {
  const [isFullscreen, setisFullscreen] = React.useState(false);
  const [isUser, setIsUser] = React.useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <Menubar
      onClick={() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          // User is signed in.
          // console.log(user);
          setIsUser(user.displayName);
        } else {
          setIsUser("");
        }
      }}
    >
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => {
              console.log(!isFullscreen);
              if (!isFullscreen) {
                // Enter fullscreen mode
                if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                  document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                  document.documentElement.msRequestFullscreen();
                }
                setisFullscreen(true);
              } else {
                try {
                  if (document.exitFullscreen) {
                    document.exitFullscreen();
                  } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                  } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                  }
                } catch (e) {
                  console.log("ye");
                } finally {
                  setisFullscreen(false);
                  // Exit fullscreen mode
                }
              }
            }}
            inset
          >
            Toggle Fullscreen
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="cursor-pointer"
            onClick={() => {
              console.log("cliked");
              const divElement = document.getElementById("kiri");
              if (divElement) {
                divElement.setAttribute("data-panel-size", "0");
                divElement.setAttribute("size", "0");
                divElement.style.flex = "0 1 0px";
                divElement.style.overflow = "hidden";
              } else {
                toast("You are not in chat page!", {
                  action: {
                    label: "Close",
                    onClick: () => "",
                  },
                });
              }
            }}
            inset
          >
            Hide Sidebar
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
              // User is signed in.
              // console.log(user);
              setIsUser(user.displayName);
            } else {
              setIsUser("");
            }
          }}
        >
          Profiles
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={isUser}>
            {/* <MenubarRadioItem value="myudak">myudak</MenubarRadioItem>
            <MenubarRadioItem value="anonis">anonis</MenubarRadioItem> */}
            {!isUser ? (
              ""
            ) : (
              <MenubarRadioItem value={isUser}>{isUser}</MenubarRadioItem>
            )}
          </MenubarRadioGroup>
          <MenubarSeparator />
          {!isUser ? (
            ""
          ) : (
            <Link href="/chat/settings">
              {" "}
              <MenubarItem className="cursor-pointer" inset>
                Settings
              </MenubarItem>{" "}
            </Link>
          )}
          <MenubarSeparator />
          {isUser ? (
            <MenubarItem
              onClick={() => {
                toast("Already Logged in!", {
                  action: {
                    label: "Close",
                    onClick: () => "",
                  },
                });
              }}
              className="cursor-pointer"
              inset
            >
              Add Profile...
            </MenubarItem>
          ) : (
            <Link href="/login">
              <MenubarItem className="cursor-pointer" inset>
                Add Profile...
              </MenubarItem>
            </Link>
          )}

          <DialogTrigger asChild>
            <MenubarItem className="cursor-pointer" inset>
              Logout
            </MenubarItem>
          </DialogTrigger>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
