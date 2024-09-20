import React, { useState } from "react"
import { HydraShareSchema, HydraTextSchemaProps } from "@/model/hydra"
import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const HydraText: React.FC<HydraTextSchemaProps> = ({
  title,
  fields,
  className,
  share,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {}
    fields.forEach((field) => {
      initialData[field.id] = field.text || ""
    })
    return initialData
  })

  const handleInputChange = (label: string, value: string) => {
    setFormData((prev) => ({ ...prev, [label]: value }))
  }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const handleShare = (shareOption: HydraShareSchema) => {
    const { urlTemplate, encodeValues } = shareOption

    const shareUrl = urlTemplate.replace(/\{(\w+)\}/g, (match, fieldId) => {
      const value = formData[fieldId] || ""
      return encodeValues ? encodeURIComponent(value) : value
    })

    window.open(shareUrl, "_blank")
  }

  return (
    <Card className={className}>
      <CardHeader>{title && <CardTitle>{title}</CardTitle>}</CardHeader>
      <CardContent>
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === "input" ? (
              <Input
                id={field.id}
                type={field.inputType || "text"}
                value={formData[field.id] || field.text}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={field.className}
              />
            ) : (
              <Textarea
                id={field.id}
                value={formData[field.id] || field.text}
                rows={field.rows}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={field.className}
              />
            )}
            <Button
              variant="link"
              onClick={() => handleCopy(formData[field.id] || "")}
              className="mt-2"
            >
              <CopyIcon className="mr-1" /> Copy
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        {share &&
          share.map((shareOption, index) => (
            <Button key={index} onClick={() => handleShare(shareOption)}>
              {shareOption.actionLabel}
            </Button>
          ))}
      </CardFooter>
    </Card>
  )
}
