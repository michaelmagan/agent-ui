import React from "react"
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
  return (
    <Card className={className}>
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
        <div className="flex justify-end gap-2 p-4">
          {buttons.map((button, index) => (
            <HydraButton key={index} {...button} className="w-full sm:w-auto" />
          ))}
        </div>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
