import React, { useState } from "react"
import { HydraCard as HydraCardType } from "@/model/hydra"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, X } from "lucide-react"

import { HydraButton } from "./button"

type HydraCardProps = HydraCardType

export const HydraCard: React.FC<HydraCardProps> = ({
  title,
  description,
  header,
  badges,
  content,
  buttons,
  footer,
  className,
}) => {
  const [feedbacks, setFeedbacks] = useState<Record<string, 'positive' | 'negative' | null>>({})

  const handleFeedback = (id: string, type: 'positive' | 'negative' | null) => {
    setFeedbacks(prev => ({ ...prev, [id]: type }))
  }

  const getFeedbackBorderClass = (id: string) => {
    if (feedbacks[id] === 'positive') return 'border-2 border-green-500'
    if (feedbacks[id] === 'negative') return 'border-2 border-red-500'
    return ''
  }

  const renderWithPopover = (id: string, element: React.ReactNode) => (
    <Popover key={id}>
      <PopoverTrigger asChild>
        <div className={`${getFeedbackBorderClass(id)} transition-colors duration-200 relative`}>
          {element}
          <div className="absolute bottom-0 left-0">
            <PopoverContent className="w-auto p-0" align="start" side="bottom">
              <div className="flex space-x-2 p-2">
                <Button size="sm" variant="ghost" onClick={() => handleFeedback(id, 'positive')}>
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleFeedback(id, 'negative')}>
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleFeedback(id, null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </PopoverContent>
          </div>
        </div>
      </PopoverTrigger>
    </Popover>
  )

  return (
    <Card className={className}>
      <CardHeader>
        {title && renderWithPopover('title', <CardTitle>{title}</CardTitle>)}
        {description && renderWithPopover('description', <CardDescription>{description}</CardDescription>)}
      </CardHeader>
      <CardContent>
        {badges && badges.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {badges.map((badge, index) => renderWithPopover(`badge-${index}`,
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
        {header && renderWithPopover('header', <div className="mb-2 text-lg font-medium">{header}</div>)}
        {renderWithPopover('content', <div>{content}</div>)}
      </CardContent>
      {buttons && buttons.length > 0 && (
        <div className="flex justify-end gap-2 p-4">
          {buttons.map((button, index) => renderWithPopover(`button-${index}`,
            <HydraButton key={index} {...button} className="w-full sm:w-auto" />
          ))}
        </div>
      )}
      {footer && renderWithPopover('footer', <CardFooter>{footer}</CardFooter>)}
    </Card>
  )
}
