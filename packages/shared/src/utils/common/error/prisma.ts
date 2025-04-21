import { BaseError, BaseErrorExtendedAppTypes, BaseErrorOptions } from "."

export const PrismaErrorHashMap: { [key: string]: string } = {
  P2000: "The provided value for the column is too long for the column's type.",
  P2001: "The provided value for the column is not valid.",
  P2002: "Unique constraint failed on the field(s): `field`.",
  P2003: "Foreign key constraint failed on the field(s): `field`.",
  P2004:
    "The change you are trying to make would violate the required relation between the `field` and `field` fields.",
  P2005: "The value for the column is not valid.",
  P2006: "The provided value for the column is not valid.",
  P2007: "The provided value for the column is not valid.",
  P2008: "The provided value for the column is not valid.",
  P2009: "The provided value for the column is not valid.",
  P2010: "Input error: Invalid field value (typically type mismatch)",
  P2011: "Null constraint violation (a required field received null)",
}
export const getPrismaErorrorMessage = (errorCode: string): string => {
  return PrismaErrorHashMap[errorCode]
}
export type PrismaErrorTypes = "prisma-client" | "prisma-middleware"
export class PrismaError extends BaseError<PrismaErrorTypes> {
  protected app: BaseErrorExtendedAppTypes = "@prisma"
  constructor(options: BaseErrorOptions<PrismaErrorTypes>) {
    const { funcName = "db", feature = "prisma-client", message } = options
    super({
      ...options,
      funcName,
      feature,
      statusCode: 500,
      message: getPrismaErorrorMessage(message) ?? message,
    })
    this.name = "PrismaError"
  }
}
