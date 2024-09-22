// This is where you define the zod schema for your components.

import { z } from "zod"

export const HydraButtonSchema = z.object({
  text: z.string(),
  variant: z
    .enum(["default", "destructive", "outline", "secondary", "ghost", "link"])
    .optional(),
  size: z.enum(["default", "sm", "lg", "icon"]).optional(),
  href: z.string(),
  className: z.string().optional(),
  onClick: z.function().optional(),
})

export const HydraBadgeSchema = z.object({
  text: z.string(),
  variant: z
    .enum(["default", "secondary", "destructive", "outline"])
    .optional(),
  className: z.string().optional(),
})

export const HydraCardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  header: z.string().optional(),
  badges: z.array(HydraBadgeSchema),
  content: z.string(),
  buttons: z.array(HydraButtonSchema),
  footer: z.string().optional(),
  className: z.string().optional(),
})

export const HydraCarouselSchema = z.object({
  cards: z.array(HydraCardSchema),
  className: z.string().optional(),
})

export const HydraTextInputSchema = z.object({
  type: z.literal("input"),
  id: z.string(),
  label: z.string(),
  text: z.string(),
  inputType: z.enum(["text", "password", "email", "number", "input"]),
  className: z.string().optional(),
})

export const HydraTextareaSchema = z.object({
  type: z.literal("textarea"),
  id: z.string(),
  label: z.string(),
  text: z.string(),
  rows: z.number().optional(),
  className: z.string().optional(),
})

export const HydraShareSchema = z.object({
  actionLabel: z.string(),
  urlTemplate: z
    .string()
    .describe(
      "URL template with placeholders for field values that match the input ids"
    ),
  encodeValues: z.boolean().default(true),
})

export const HydraTextSchema = z.object({
  title: z.string().optional(),
  fields: z.array(z.union([HydraTextInputSchema, HydraTextareaSchema])),
  className: z.string().optional(),
  share: z.array(HydraShareSchema).optional(),
})

export const HydraFormFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(["text", "password", "email", "number", "checkbox", "select", "radio-group"]),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  suggestions: z.array(z.string()).optional(),
  options: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  text: z.string().optional(),
  className: z.string().optional(),
})

export const HydraCheckboxSchema = z.object({
  type: z.literal("checkbox"),
  id: z.string(),
  label: z.string(),
  options: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).optional(),
  className: z.string().optional(),
})

export const HydraFormSchema = z.object({
  title: z.string().optional(),
  fields: z.array(z.union([HydraFormFieldSchema, HydraCheckboxSchema])),
  submitButton: z.string(),
  onSubmit: z.function().args(z.record(z.string(), z.union([z.string(), z.array(z.string())]))).returns(z.void()),
  className: z.string().optional(),
})

export const HydraProfileSchema = z.object({
  name: z.string(),
  avatarUrl: z.string(),
  xUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  compatibilityScore: z.number().min(0).max(100),
})

export const HydraFeedbackSchema = z.object({
  onFeedback: z.function().args(z.boolean()).returns(z.void()),
})

export const HydraRecentTweetsSchema = z.object({
  tweets: z.array(z.object({
    id: z.string(),
    content: z.string(),
    createdAt: z.string(),
    author: z.object({
      name: z.string(),
      handle: z.string(),
      avatarUrl: z.string(),
    }),
  })),
})


export type HydraTextInput = z.infer<typeof HydraTextInputSchema>
export type HydraTextarea = z.infer<typeof HydraTextareaSchema>
export type HydraTextSchemaProps = z.infer<typeof HydraTextSchema>
export type HydraCard = z.infer<typeof HydraCardSchema>
export type HydraButton = z.infer<typeof HydraButtonSchema>
export type HydraBadge = z.infer<typeof HydraBadgeSchema>
export type HydraCarousel = z.infer<typeof HydraCarouselSchema>
export type HydraShareSchema = z.infer<typeof HydraShareSchema>
export type HydraForm = z.infer<typeof HydraFormSchema>
export type HydraFormField = z.infer<typeof HydraFormFieldSchema>
export type HydraProfile = z.infer<typeof HydraProfileSchema>
export type HydraFeedback = z.infer<typeof HydraFeedbackSchema>
export type HydraRecentTweets = z.infer<typeof HydraRecentTweetsSchema>
