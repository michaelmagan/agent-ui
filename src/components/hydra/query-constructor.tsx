import React, { useState } from "react"
import { HydraForm, HydraFormField } from "@/model/hydra"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const HydraQueryConstructor: React.FC<HydraForm> = ({
  title,
  fields,
  className,
}) => {
  const [formData, setFormData] = useState<Record<string, string | string[]>>(() => {
    console.log('is this working?')
    const initialData: Record<string, string | string[]> = {}
    fields.forEach((field) => {
      if (field.type === "checkbox" && field.options) {
        initialData[field.id] = []
      } else {
        initialData[field.id] = 'text' in field ? field.text || "" : ""
      }
    })
    return initialData
  })

  const handleInputChange = (id: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (id: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentValues = Array.isArray(prev[id]) ? prev[id] as string[] : []
      if (checked) {
        return { ...prev, [id]: [...currentValues, value] }
      } else {
        return { ...prev, [id]: currentValues.filter((v) => v !== value) }
      }
    })
  }

  const addSuggestionToInput = (id: string, suggestion: string) => {
    setFormData((prev) => {
      const currentValue = prev[id] || ""
      const newValue = currentValue
        ? `${currentValue}, ${suggestion}`
        : suggestion
      return { ...prev, [id]: newValue }
    })
  }

  return (
    <Card className={className}>
      <CardHeader>{title && <CardTitle>{title}</CardTitle>}</CardHeader>
      <CardContent>
        {fields.map((field: HydraFormField, index) => (
          <div key={index} className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-400">
              {field.label}
            </label>
            {field.type === "text" || field.type === "password" || field.type === "email" || field.type === "number" ? (
              <>
                <Input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id] as string || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className={field.className}
                  placeholder={field.placeholder}
                />
                {field.suggestions && field.suggestions.length > 0 && (
                  <div className="mt-2">
                    {field.suggestions.map((suggestion, suggestionIndex) => (
                      <Button
                        key={suggestionIndex}
                        onClick={() =>
                          addSuggestionToInput(field.id, suggestion)
                        }
                        className="mr-2"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : field.type === "checkbox" ? (
              <div className="space-y-2">
                {field.options && field.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${field.id}-${option.value}`}
                      checked={(formData[field.id] as string[])?.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(field.id, option.value, checked as boolean)
                      }
                      className={`${field.className} mb-0`}
                    />
                    <label
                      htmlFor={`${field.id}-${option.value}`}
                      className="text-sm text-gray-400"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            ) : field.type === "select" ? (
              <Select
                onValueChange={(value: string) =>
                  handleInputChange(field.id, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.label} />
                </SelectTrigger>
                <SelectContent>
                  {field.options && field.options.map((option, optionIndex) => (
                    <SelectItem key={optionIndex} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "radio-group" ? (
              <RadioGroup
                value={formData[field.id] as string}
                onValueChange={(value) => handleInputChange(field.id, value)}
              >
                {field.options && field.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                    <label htmlFor={`${field.id}-${option.value}`} className="text-gray-400">{option.label}</label>
                  </div>
                ))}
              </RadioGroup>
            ) : null}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => console.log(formData)}>Submit</Button>
      </CardFooter>
    </Card>
  )
}
