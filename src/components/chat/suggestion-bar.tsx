import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

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
  // Suggestions for finding your ideal coworker
  const allSuggestions: Suggestion[] = [
    {
      title: "Technical expertise",
      query: "Find a coworker with expertise in React and TypeScript.",
    },
    {
      title: "Collaborative spirit",
      query: "Look for a collaborative team player with great communication skills.",
    },
    {
      title: "Innovative problem-solver",
      query: "Search for a coworker who excels at creative problem-solving.",
    },
    {
      title: "Continuous learner",
      query: "Find someone who is eager to learn and grow professionally.",
    },
    {
      title: "Diligent professional",
      query: "Look for a coworker with a strong work ethic and attention to detail.",
    },
  ]

  const outlineVariants = [
    'outline277DA1', 'outline4D908E', 'outline90BE6D', 'outlineF8961E'
  ] as const

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

  const getRandomOutlineVariant = (index: number) => {
    return outlineVariants[index]
  }

  if (isLoading) {
    return (
      <div className="z-10 mx-auto w-full flex flex-col items-start gap-4 px-2 py-4 max-w-screen-8xl">
        <Button variant="ghost" className="animate-pulse">
          Generating suggested actions...
        </Button>
      </div>
    )
  }

  return (
    <div className="z-10 mx-auto w-full flex flex-col items-center gap-4 px-2 py-4 max-w-screen-8xl">
      <div className="w-full flex items-center gap-4 overflow-x-auto">
        {randomSuggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Button
              variant={getRandomOutlineVariant(index)}
              onClick={() => handleSuggestionClick(suggestion.query)}
            >
              {suggestion.title}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
