"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import * as React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { NavigationMenuButton } from "./NavigationMenuButton";
import { MenubarButton } from "./MenubarButton";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push("/login");
    router.refresh();
    setOpen(false);
  }

  return (
    <nav className="sticky inset-x-0 top-0 z-50 backdrop-blur-lg  shadow-sm ">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="#">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">VoiceCode</span>
          </Link>
          <NavigationMenuButton />
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex items-center gap-4">
              <MenubarButton />
              {/* <Button size="sm" variant="outline">
              Sign in
              </Button>
            <Button size="sm">Sign up</Button> */}
            </div>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you really wanto to Log Out?</DialogTitle>
                <DialogDescription>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut,
                  ea nesciunt doloribus tempore unde ullam!
                </DialogDescription>
              </DialogHeader>
              <Button onClick={handleLogout}>Log Out</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
