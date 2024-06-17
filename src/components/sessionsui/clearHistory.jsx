"use client";
import * as React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
// import { IconSpinner } from "@/components/ui/icons";

const ClearHistory = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          // disabled={!isEnabled || isPending}
        >
          {/* {isPending && <IconSpinner className="mr-2" />} */}
          Clear history
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your chat history and remove your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
          //   disabled={isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
          // disabled={isPending}
          // onClick={(event) => {
          //   event.preventDefault();
          //   startTransition(async () => {
          //     const result = await clearChats();
          //     if (result && "error" in result) {
          //       toast.error(result.error);
          //       return;
          //     }

          //     setOpen(false);
          //   });
          // }}
          >
            {/* {isPending && <IconSpinner className="mr-2 animate-spin" />} */}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearHistory;
