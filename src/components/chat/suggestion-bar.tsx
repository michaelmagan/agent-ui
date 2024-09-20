import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { useChatInputStore } from "@/components/chat/input"

interface Suggestion {
  title: string
  query: string
}

export function SuggestionBar() {
  const { setMessage, inputRef } = useChatInputStore()
  const [randomSuggestions, setRandomSuggestions] = useState<Suggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // Suggestions for getting YC companies based on semantic data
  const allSuggestions: Suggestion[] = [
    {
      title: "Find AI startups",
      query: "Show me YC companies working on artificial intelligence.",
    },
    {
      title: "Discover fintech",
      query: "List YC startups in the financial technology sector.",
    },
    {
      title: "Explore healthcare",
      query: "What YC companies are innovating in healthcare?",
    },
    {
      title: "Recent YC batches",
      query: "Show me startups from the most recent YC batch.",
    },
    {
      title: "Successful exits",
      query: "Which YC companies have had successful exits or IPOs?",
    },
  ]

  useEffect(() => {
    const getRandomSuggestions = () => {
      const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 4)
    }

    setIsLoading(true)
    setRandomSuggestions(getRandomSuggestions())
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
    if (inputRef.current) {
      inputRef.current.textArea.focus()
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-screen-8xl z-10 mx-auto flex w-full flex-col items-start gap-4 px-2 py-4">
        <Button variant="outline" className="animate-pulse">
          Generating suggested actions...
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-screen-8xl z-10 mx-auto flex w-full flex-col items-center gap-4 px-2 py-4">
      <div className="flex w-full items-center gap-4 overflow-x-auto">
        {randomSuggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => handleSuggestionClick(suggestion.query)}
          >
            {suggestion.title}
          </Button>
        ))}
      </div>
    </div>
  )
}
