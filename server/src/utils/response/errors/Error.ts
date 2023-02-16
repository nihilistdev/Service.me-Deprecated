export class HandleError extends Error {
  constructor(
    private readonly statusCode: number,
    private readonly errorType: ErrorType,
    message: string,
    private readonly errors: any[] | null = null,
    private readonly errorRaw: any = null,
    private readonly errorValidation: ErrorValidation[] | null = null
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
