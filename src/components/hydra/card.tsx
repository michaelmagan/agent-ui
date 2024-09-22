import React, { useState } from "react"
import { HydraCard as HydraCardType } from "@/model/hydra"
import { useChatStore } from "@/components/chat/box"
import { useChatInputStore } from "@/components/chat/input"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { HydraButton } from "./button"

export const HydraCard: React.FC<HydraCardType> = ({
  title,
  description,
  header,
  badges,
  content,
  buttons,
  footer,
  className,
}) => {
  const { setSelectedCofounder } = useChatStore()
  const { setMessage } = useChatInputStore()
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    if (title) {
      setSelectedCofounder(title)
      setMessage(`Tell me more about ${title}`)
      setIsSelected(prevState => !prevState)
    }
  }

  return (
    <Card 
      className={`${className} cursor-pointer ${isSelected ? 'border-green-500 border-2' : ''}`}
      onClick={handleClick}
    >
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {badges && badges.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`rounded-full px-2 py-1 text-xs font-semibold ${badge.className}`}
              >
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
        {header && <div className="mb-2 text-lg font-medium">{header}</div>}
        <div>{content}</div>
      </CardContent>
      {buttons && buttons.length > 0 && (
        <>
          <h3 className="px-6 text-md font-semibold">Social Links</h3>
          <div className="flex justify-start gap-2 p-4 pt-2">
            {buttons.map((button, index) => (
              <HydraButton key={index} {...button} className="w-auto pl-2 underline text-green" />
            ))}
          </div>
        </>
      )}
      {footer && (
        <>
          <h3 className="px-6 text-md mb-4 font-semibold">Additional Information</h3>
          <CardFooter>{footer}</CardFooter>
        </>
      )}
    </Card>
  )
}
