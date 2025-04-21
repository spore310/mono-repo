import { tryCatch } from "@shared/utils/common/tryCatch"
import { hashPassword, verifyPassword } from "./utils/common/auth/helpers/password"
import { BaseError } from "@common/error"
import { PrismaError } from "@common/error/prisma"

export { tryCatch, hashPassword, verifyPassword }
console.log("shared package loaded")

const foo = () => {
  const errorObject = new BaseError({
    message: "this is a test error",
    funcName: foo.name,
    args: [],
  })
  console.log(errorObject.getJson())
}
const bar = () => {
  const prismaErrorObject = new PrismaError({
    message: "P2011",
    funcName: foo.name,
    feature: "prisma-middleware",
    args: [],
  })
  console.log(prismaErrorObject.getJson())
}
foo()
bar()
