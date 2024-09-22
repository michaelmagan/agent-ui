import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { create } from "zustand"

import { Button } from "@/components/ui/button"
import { useChatInputStore } from "@/components/chat/input"

interface Suggestion {
  title: string
  query: string
}

interface SuggestionBarState {
  randomSuggestions: Suggestion[]
  isLoading: boolean
  setRandomSuggestions: (suggestions: Suggestion[]) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useSuggestionBarStore = create<SuggestionBarState>((set) => ({
  randomSuggestions: [],
  isLoading: true,
  setRandomSuggestions: (suggestions) =>
    set({ randomSuggestions: suggestions }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))

export function SuggestionBar() {
  const { setMessage, inputRef } = useChatInputStore()
  const { randomSuggestions, isLoading, setRandomSuggestions, setIsLoading } =
    useSuggestionBarStore()

  // Suggestions for finding your ideal coworker
  const allSuggestions: Suggestion[] = [
    {
      title: "Find a co-founder",
      query: "Find a co-founder with complementary skills to my profile.",
    },
    {
      title: "Find a teammate",
      query: "Find a teammate with complementary skills to my profile.",
    },
    {
      title: "Find a mentor",
      query: "Find a mentor with complementary skills to my profile.",
    },
    {
      title: "Find a friend",
      query: "Find a friend with complementary skills to my profile.",
    },
  ]

  const outlineVariants = [
    "outline277DA1",
    "outline4D908E",
    "outline90BE6D",
    "outlineF8961E",
  ] as const

  useEffect(() => {
    const getRandomSuggestions = () => {
      const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 4)
    }

    setIsLoading(true)
    setRandomSuggestions(getRandomSuggestions())
    setIsLoading(false)
  }, [setIsLoading, setRandomSuggestions])

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
    if (inputRef.current) {
      inputRef.current.textArea.focus()
    }
  }

  const getRandomOutlineVariant = (index: number) => {
    return outlineVariants[index]
  }

  if (isLoading || randomSuggestions.length === 0) {
    return null
  }

  return (
    <div className="max-w-screen-8xl z-10 mx-auto flex w-full flex-col items-center gap-4 px-2 py-4">
      <div className="flex w-full items-center gap-4 overflow-x-auto">
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
