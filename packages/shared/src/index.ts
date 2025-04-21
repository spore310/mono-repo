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
  const prismaErrorObject = new PrismaError({
    message: "this is a test error",
    funcName: foo.name,
    feature: "prisma-middleware",
    args: [],
  })
  console.log(errorObject.getJson(), prismaErrorObject.getJson())
}
foo()
