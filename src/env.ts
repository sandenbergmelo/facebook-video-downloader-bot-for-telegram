import { z } from 'zod'

const envSchema = z.object({
  BOT_TOKEN: z.string({ message: 'Missing "BOT_TOKEN" env var' }).min(1),
})

export const env = envSchema.parse(process.env)
