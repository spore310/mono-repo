export interface ErrorOptionsRequiredObject {
  message: string
  funcName: string
  args: any[]
}

export type BaseErrorFeature = "auth" | "db" | "shared"
export type BaseErrorExtendedAppTypes = "@shared/core" | "@ui"
export type ExtendedAppTypes<X> = X | BaseErrorExtendedAppTypes
export interface ErrorOptionsOptionalObject<U> {
  feature?: U | BaseErrorFeature
  statusCode?: number
  cause?: string
  errorCodes?: { [key: string]: string }
}

export type BaseErrorOptions<T> = ErrorOptionsRequiredObject & ErrorOptionsOptionalObject<T>
export class BaseError<ExtendedFeatureTypes> extends Error {
  protected static app: string = "@shared/core"
  protected static errorCodes?: { [key: string]: string } = {}
  private _feature: ExtendedFeatureTypes
  private _statusCode: number
  private _args: any[]
  private _funcName: string
  private _featureName: string
  constructor(options: BaseErrorOptions<ExtendedFeatureTypes>) {
    const { message, funcName, args, feature = "shared", statusCode = 520, cause } = options

    super("")
    this.message = this.getErrorMessage(message)
    this.cause = cause ?? message
    this.name = "BaseError"
    this._statusCode = statusCode
    this._feature = feature as ExtendedFeatureTypes
    this._args = this.getArgs(args)
    this._funcName = `[${funcName}]`
    this._featureName = `${(this.constructor as typeof BaseError).app}-${this._feature}`
  }

  get statusCode(): number {
    return this._statusCode
  }
  protected getErrorMessage(errorCode: string): string {
    const codes = (this.constructor as typeof BaseError).errorCodes
    // eslint-disable-next-line security/detect-object-injection
    const errorMessage = codes?.[errorCode]
    return errorMessage ?? errorCode ?? "Unknown error"
  }
  private getArgs(args: any[]): string[] {
    return args?.map((arg) => `${arg}`) ?? []
  }
  getJson() {
    return JSON.stringify(
      {
        app: (this.constructor as typeof BaseError).app,
        feature: this._featureName,
        statusCode: this._statusCode,
        message: this.message,
        cause: this.cause,
        funcName: this._funcName,
        args: this._args,
        stack: this.stack,
      },
      null,
      2
    )
  }
}
