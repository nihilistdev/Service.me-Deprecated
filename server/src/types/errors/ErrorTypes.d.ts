declare global {
  type ErrorResponse = {
    errorType: ErrorType;
    errorMessage: string;
    errors: string[] | null;
    errorRaw: any;
    errorsValidation: ErrorValidation[] | null;
    stack?: string;
  };

  type ErrorType = "General" | "Raw" | "Validation" | "Unauthorized";
  type ErrorValidation = { [key: string]: string };
}

export {};
