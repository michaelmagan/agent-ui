"use client"

import { ReactElement, Suspense, useEffect, useMemo, useState } from "react"
import { getHydraClient, registerHydraComponents } from "@/hydra-client"
import { create } from "zustand"

import { ScrollArea } from "../ui/scroll-area"
import { Chat } from "./chat"
import { ChatInput } from "./input"
import { SuggestionBar, useSuggestionBarStore } from "./suggestion-bar"

export interface ChatMessage {
  sender: "bot" | "user"
  message: string
  component?: ReactElement
}

const componentFlow = [
  {
    name: "Feedback",
    description:
      "Ask the user questions to clarify their query for teamates, co-founders, or friends.",
  },
  {
    name: "HydraCarousel",
    description: "Query for founders that match their Feedback.",
    title: "Check recent tweets",
    query: "Can you show me recent tweets from the co-founder I selected?",
  },
  {
    name: "RecentTweets",
    description: "Show the user recent tweets for the person they selected.",
    title: "Reach out",
    query: "Help me draft a message to send to this potential co-founder.",
  },
  {
    name: "HydraText",
    description: "Show a UI to send the person a message.",
  },
]

const getNextComponentFlow = (() => {
  let index = 0
  return () => {
    const component = componentFlow[index]
    index = (index + 1) % componentFlow.length
    return component
  }
})()

interface ChatState {
  messages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
  isAgentThinking: boolean
  setAgentThinking: (isThinking: boolean) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  isAgentThinking: false,
  setAgentThinking: (isThinking) => set({ isAgentThinking: isThinking }),
}))

export default function ChatBox() {
  const { messages, addMessage, isAgentThinking, setAgentThinking } =
    useChatStore()
  const [isHydraReady, setIsHydraReady] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const hydra = useMemo(() => getHydraClient(), [])

  useEffect(() => {
    if (!isHydraReady && !isRegistering) {
      setIsRegistering(true)
      registerHydraComponents(hydra).then(() => {
        setIsHydraReady(true)
        setIsRegistering(false)
      })
    }
  }, [hydra, isHydraReady, isRegistering])

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      addMessage({
        sender: "user",
        message: message.trim(),
      })
    }

    fetchResponse(message.trim())
  }

  const fetchResponse = async (message: string) => {
    setAgentThinking(true)
    try {
      const nextComponent = getNextComponentFlow()
      const { setRandomSuggestions } = useSuggestionBarStore.getState()
      setRandomSuggestions(
        nextComponent.title && nextComponent.query
          ? [{
              title: nextComponent.title,
              query: nextComponent.query
            }]
          : []
      )

      // This is just a hack to get the hydra client to generate the next component in the flow
      const messageWithComponent =
        message + nextComponent.name + nextComponent.description
      console.log("Message with component:", messageWithComponent)
      const response = await hydra.generateComponent(messageWithComponent)
      console.log("Hydra client result:", response)
      if (
        typeof response === "object" &&
        response.component &&
        response.message
      ) {
        addMessage({
          sender: "bot",
          message: response.message,
          component: response.component,
        })
      } else if (typeof response === "string") {
        addMessage({
          sender: "bot",
          message: response,
        })
      } else {
        console.error("Unexpected response type:", response)
        addMessage({
          sender: "bot",
          message: "Sorry, I received an unexpected response type.",
        })
      }
    } catch (error) {
      console.error("Error fetching response:", error)
      addMessage({
        sender: "bot",
        message: "Sorry, I encountered an error while processing your request.",
      })
    } finally {
      setAgentThinking(false)
    }
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollArea className="mt-[6rem] h-[calc(100vh-4rem)] w-full">
          <Chat messages={messages} isLoading={isAgentThinking} />
        </ScrollArea>
      </Suspense>
      <SuggestionBar />
      <ChatInput onSendMessage={handleSendMessage} disabled={isAgentThinking} />
    </>
  )
}
