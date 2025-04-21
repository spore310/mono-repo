export interface ErrorOptionsRequiredObject {
  message: string
  funcName: string
  args: any[]
}

export type BaseErrorFeature = "auth" | "db" | "shared"
export type BaseErrorExtendedAppTypes = "@shared/core" | "@prisma" | "@ui"

export interface ErrorOptionsOptionalObject<U> {
  feature?: U
  statusCode?: number
}

export type BaseErrorOptions<T> = ErrorOptionsRequiredObject & ErrorOptionsOptionalObject<T>

export class BaseError<T> extends Error {
  protected app: BaseErrorExtendedAppTypes = "@shared/core"
  private _feature: T
  private _statusCode: number
  private _args: any[]
  private _funcName: string
  private _featureName: string
  constructor(options: BaseErrorOptions<T>) {
    const { message, funcName, args, feature = "shared", statusCode = 520 } = options

    super(message)
    this.name = "BaseError"
    this._statusCode = statusCode
    this._feature = feature as T
    this._args = args
    this._funcName = `[${funcName}]`
    this._featureName = `${this.app}-${this._feature}`
  }

  get statusCode(): number {
    return this._statusCode
  }

  getJson() {
    return JSON.stringify(
      {
        app: this.app,
        feature: this._featureName,
        statusCode: this._statusCode,
        message: this.message,
        funcName: this._funcName,
        args: this._args,
        stack: this.stack,
      },
      null,
      2
    )
  }
}
