import React from "react"
import { Zap } from "lucide-react"

export const PoweredBy = () => {
  return (
    <div className="my-2 text-center text-sm text-zinc-500">
      <Zap className="mr-1 inline-block h-4 w-4" />
      Powered by{" "}
      <a
        href="https://usehydra.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto border-b border-zinc-200 py-1 font-bold text-black hover:border-b-2 hover:border-black dark:border-zinc-800 dark:text-white dark:hover:border-black"
      >
        hydra-ai
      </a>
    </div>
  )
}
