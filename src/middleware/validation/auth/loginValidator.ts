import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { HandleError } from "src/utils/response/errors/Error";

export const loginValidator = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { emailOrUsername, password }: { [key: string]: string } = req.body;
  const errorValidations: ErrorValidation[] = [...new Array()];

  emailOrUsername = !emailOrUsername ? "" : emailOrUsername;
  password = !password ? "" : password;

  if (validator.isEmpty(emailOrUsername))
    errorValidations.push({ email: "Email field is required" });
  if (validator.isEmpty(password))
    errorValidations.push({ password: "Password is required" });
  if (errorValidations.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Login validation error",
      null,
      null,
      errorValidations
    );
    return next(error);
  }
  return next();
};
