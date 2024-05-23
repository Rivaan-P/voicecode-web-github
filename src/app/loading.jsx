"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

const Loading = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      <Progress value={progress} className=" w-[30%]" />
    </div>
  );
};

export default Loading;
