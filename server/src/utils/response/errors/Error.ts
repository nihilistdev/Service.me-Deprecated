export class HandleError extends Error {
  constructor(
    private statusCode: number,
    private errorType: ErrorType,
    message: string,
    private errors: string[] | null = null,
    private errorRaw: any = null,
    private errorValidation: ErrorValidation[] | null = null
  ) {
    super(message);
  }

  get httpStatusCode(): number {
    return this.statusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorType: this.errorType,
      errorMessage: this.message,
      errors: this.errors,
      errorRaw: this.errorRaw,
      errorsValidation: this.errorValidation,
      stack: this.stack,
    };
  }
}
