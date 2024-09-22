"use client"

import { ReactElement, Suspense, useEffect, useMemo, useState } from "react"
import { getHydraClient, registerHydraComponents } from "@/hydra-client"
import { create } from "zustand"

import { ScrollArea } from "../ui/scroll-area"
import { Chat } from "./chat"
import { ChatInput } from "./input"
import { SuggestionBar } from "./suggestion-bar"

export interface ChatMessage {
  sender: "bot" | "user"
  message: string
  component?: ReactElement
}

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
  const { messages, addMessage, isAgentThinking, setAgentThinking } = useChatStore()
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
      const response = await hydra.generateComponent(message)
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
