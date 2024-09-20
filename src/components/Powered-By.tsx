import { Zap } from "lucide-react";
import React from "react";

export const PoweredBy = () => {
  return (
    <div className="text-sm text-center my-2 text-zinc-500">
      <Zap className="w-4 h-4 inline-block mr-1" />
      Powered by{" "}
      <a
        href="https://github.com/michaelmagan/hydraai"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto font-bold py-1 border-b text-black dark:text-white border-zinc-200 dark:border-zinc-800 hover:border-b-2 hover:border-black dark:hover:border-black"
      >
        hydra-ai
      </a>{" "}
      and{" "}
      <a
        href="https://mainframe.so"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto font-bold py-1 border-b text-black dark:text-white border-zinc-200 dark:border-zinc-800 hover:border-b-2 hover:border-black dark:hover:border-black"
      >
        Mainframe
      </a>
    </div>
  );
};
