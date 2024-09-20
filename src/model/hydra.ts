import { z } from "zod"

import { BadgeProps } from "@/components/ui/badge"

export const HydraButtonSchema = z.object({
  text: z.string(),
  variant: z
    .enum(["default", "destructive", "outline", "secondary", "ghost", "link"])
    .optional(),
  size: z.enum(["default", "sm", "lg", "icon"]).optional(),
  href: z.string(),
  className: z.string().optional(),
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
  inputType: z.enum(["text", "password", "email", "number"]),
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

export type HydraTextInput = z.infer<typeof HydraTextInputSchema>
export type HydraTextarea = z.infer<typeof HydraTextareaSchema>
export type HydraTextSchemaProps = z.infer<typeof HydraTextSchema>
export type HydraCard = z.infer<typeof HydraCardSchema>
export type HydraButton = z.infer<typeof HydraButtonSchema>
export type HydraBadge = z.infer<typeof HydraBadgeSchema>
export type HydraCarousel = z.infer<typeof HydraCarouselSchema>
export type HydraShareSchema = z.infer<typeof HydraShareSchema>
