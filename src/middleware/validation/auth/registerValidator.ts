import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { HandleError } from "../../../utils/response/errors/Error";
import { ErrorValidation } from "../../../types/errors/ErrorTypes";

export const registerValidator = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { email, password, confirmPassword } = req.body;

  const errorValidator: ErrorValidation[] = [...new Array()];

  email = !email ? "" : email;
  password = !password ? "" : password;
  confirmPassword = !confirmPassword ? "" : confirmPassword;

  if (!validator.isEmail(email))
    errorValidator.push({ email: "Email is invalid" });
  if (validator.isEmpty(email))
    errorValidator.push({ email: "Email is required" });
  if (validator.isEmpty(password))
    errorValidator.push({ password: "Password is required" });
  if (validator.isLength(password, { min: 6 }))
    errorValidator.push({ password: "Password must be at least 6 characters" });
  if (validator.isEmpty(confirmPassword))
    errorValidator.push({ confirmPassword: "Confirm password is reuired" });
  if (!validator.equals(password, confirmPassword))
    errorValidator.push({ confirmPassword: "Password do not match" });

  if (errorValidator.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Register validation error",
      null,
      null,
      errorValidator
    );
    return next(error);
  }
  return next();
};
