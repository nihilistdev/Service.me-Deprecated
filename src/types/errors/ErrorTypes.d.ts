export declare type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errors: string[] | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
};

export declare type ErrorType =
  | "General"
  | "Raw"
  | "Validation"
  | "Unauthorized";
export declare type ErrorValidation = { [key: string]: string };
