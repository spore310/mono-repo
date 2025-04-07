import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const envConfig = z.object({
  AUTH_SECRET_JTW_KEY: z.string().trim(),
  AUTH_JWT_ALGO: z.string().trim(),
  NODE_ENV: z.string().default("development"),
  AUTH_DB_URL: z.string().trim().url(),
  PLATFORM: z.string().trim().optional(),
})

export const env = envConfig.parse(process.env)
