import { PrismaClient } from "@prisma/core/generated/auth/index"

// eslint-disable-next-line node/no-unsupported-features/es-builtins
const globalForPrisma = globalThis as unknown as {
  prismaAuth: PrismaClient | undefined
}

const prisma =
  process.env.PLATFORM === "cold"
    ? (globalForPrisma.prismaAuth ?? (globalForPrisma.prismaAuth = new PrismaClient()))
    : new PrismaClient()

export default prisma
