import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
})

export const shareSchema = z.object({
  text: z.string().min(2, "Min 2 characters").max(1000, "Max 1000 characters"),
  remainingReads: z.string().min(1, "Min 1 read"),
  timeToLive: z.string().min(1, "Min 1 minute"),
  multiple: z.string(),
})

export const decryptSchema = z.object({
  compositeKey: z.string().min(3, "Min 3 characters"),
})
