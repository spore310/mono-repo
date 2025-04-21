import { BaseError, BaseErrorExtendedAppTypes, BaseErrorOptions } from "."

export type PrismaErrorTypes = "prisma-client" | "prisma-middleware"
export class PrismaError extends BaseError<PrismaErrorTypes> {
  protected app: BaseErrorExtendedAppTypes = "@prisma"
  constructor(options: BaseErrorOptions<PrismaErrorTypes>) {
    const { funcName = "db", feature = "prisma-client" } = options
    super({ ...options, funcName, feature })
    this.name = "PrismaError"
  }
}
