"use client"

import { createRef, KeyboardEvent, useEffect, useRef, useState } from "react"
import { create } from "zustand"

import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/auto-resize-textarea"
import { Button } from "@/components/ui/button"
import Loader from "@/app/components/loader"

interface ChatInputState {
  message: string
  inputRef: React.RefObject<AutosizeTextAreaRef>
  setMessage: (message: string) => void
  clearMessage: () => void
  setInputRef: (ref: React.RefObject<AutosizeTextAreaRef>) => void
}

export const useChatInputStore = create<ChatInputState>((set) => ({
  message: "",
  inputRef: createRef<AutosizeTextAreaRef>(),
  setMessage: (message: string) => set({ message }),
  clearMessage: () => set({ message: "" }),
  setInputRef: (ref: React.RefObject<AutosizeTextAreaRef>) =>
    set({ inputRef: ref }),
}))

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [currMaxHeight, setCurrMaxHeight] = useState(0)
  const textareaRef = useRef<AutosizeTextAreaRef>(null)
  const { message, setMessage, setInputRef } = useChatInputStore()

  useEffect(() => {
    setInputRef(textareaRef)
  }, [setInputRef])

  useEffect(() => {
    if (textareaRef.current) {
      setCurrMaxHeight(textareaRef.current.maxHeight)
    }
  }, [])

  const handleSendMessage = () => {
    setMessage("")
    onSendMessage(message)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
      e.preventDefault()
      if (message.trim() && !disabled) {
        handleSendMessage()
      }
    }
  }

  return (
    <div className="max-w-screen-8xl z-10 mx-auto flex w-full flex-col items-center gap-4 px-2">
      <div className="flex w-full items-center gap-4">
        <AutosizeTextarea
          ref={textareaRef}
          maxHeight={200}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow resize-none px-4 py-4"
          disabled={disabled}
        />
        <Button 
          onClick={handleSendMessage} 
          className={`h-14 ${disabled ? 'disabled:cursor-not-allowed' : ''}`} 
          disabled={disabled}
        >
          {disabled ? <Loader size={16} className="mr-2" /> : null}
          Send
        </Button>
      </div>
    </div>
  )
}
