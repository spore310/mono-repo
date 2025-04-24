import { BaseError, BaseErrorOptions, ExtendedAppTypes } from "."

const defaultPrismaMessage = "The provided value for the column is not valid."
export const PrismaErrorHashMap: { [key: string]: string } = {
  P2000: "The provided value for the column is too long for the column's type.",
  P2001: defaultPrismaMessage,
  P2002: "Unique constraint failed on the field(s): `field`.",
  P2003: "Foreign key constraint failed on the field(s): `field`.",
  P2004:
    "The change you are trying to make would violate the required relation between the `field` and `field` fields.",
  P2005: "The value for the column is not valid.",
  P2006: defaultPrismaMessage,
  P2007: defaultPrismaMessage,
  P2008: defaultPrismaMessage,
  P2009: defaultPrismaMessage,
  P2010: "Input error: Invalid field value (typically type mismatch)",
  P2011: "Null constraint violation (a required field received null)",
}
export type PrismaAppType = "@prisma"
export type PrismaFeatureErrorTypes = "prisma-client" | "prisma-middleware"
export class PrismaError extends BaseError<PrismaFeatureErrorTypes> {
  protected static override app: ExtendedAppTypes<PrismaAppType> = "@prisma"
  protected static override errorCodes?: { [key: string]: string } = PrismaErrorHashMap
  constructor(options: BaseErrorOptions<PrismaFeatureErrorTypes>) {
    const { funcName = "db", feature = "prisma-client" } = options
    super({
      ...options,
      funcName,
      feature,
      statusCode: 500,
    })
    this.name = "PrismaError"
  }
}
