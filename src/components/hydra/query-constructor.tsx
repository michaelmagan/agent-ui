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
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {}
    fields.forEach((field) => {
      initialData[field.id] = ""
    })
    return initialData
  })

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const renderField = (field: HydraFormField) => {
    switch (field.type) {
      case "text":
      case "password":
      case "email":
      case "number":
        return (
          <Input
            id={field.id}
            type={field.type}
            value={formData[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
      case "checkbox":
        return (
          <Checkbox
            id={field.id}
            checked={formData[field.id] === "true"}
            onCheckedChange={(checked) =>
              handleInputChange(field.id, checked.toString())
            }
          />
        )
      default:
        return null
    }
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
            {renderField(field)}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => console.log(formData)}>Submit</Button>
      </CardFooter>
    </Card>
  )
}
