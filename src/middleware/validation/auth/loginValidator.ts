import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { HandleError } from "../../../utils/response/errors/Error";

export const loginValidator = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { email, password } = req.body;
  const errorValidations: ErrorValidation[] = [...new Array()];

  email = !email ? "" : email;
  password = !password ? "" : password;

  if (!validator.isEmail(email))
    errorValidations.push({ email: "Email is not valid email" });
  if (validator.isEmpty(email))
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
