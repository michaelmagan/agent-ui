import React, { useState } from "react"
import { HydraForm as HydraFormType } from "@/model/hydra"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Field = {
  id: string
  label: string
  type: string
  placeholder?: string
  required?: boolean
}

type HydraFormProps = HydraFormType & {
  fields: Field[]
}

export const HydraForm: React.FC<HydraFormProps> = ({
  title,
  fields,
  submitButton,
  onSubmit,
  className,
}) => {
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data: Record<string, string> = {}
    fields.forEach((field: Field) => {
      data[field.id] = formData.get(field.id) as string
    })
    onSubmit(data)
  }

  const togglePasswordVisibility = (fieldId: string) => {
    setShowPassword(prev => ({ ...prev, [fieldId]: !prev[fieldId] }))
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {fields.map((field: Field) => (
        <div key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <div className="relative">
            <Input
              id={field.id}
              name={field.id}
              type={field.type === 'password' && showPassword[field.id] ? 'text' : field.type}
              placeholder={field.placeholder}
              required={field.required}
            />
            {field.type === 'password' && (
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => togglePasswordVisibility(field.id)}
              >
                {showPassword[field.id] ? 'Hide' : 'Show'}
              </Button>
            )}
          </div>
        </div>
      ))}
      <Button type="submit">{submitButton}</Button>
    </form>
  )
}
