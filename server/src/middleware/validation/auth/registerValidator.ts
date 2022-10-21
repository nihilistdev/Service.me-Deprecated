import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { HandleError } from "@utils/response/errors/Error";

export const registerValidator = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { first_name, last_name, email, username, password, confirmPassword } =
    req.body;

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
  if (validator.isEmpty(first_name))
    errorValidator.push({ first_name: "Name cannot be ampty" });
  if (validator.isEmpty(last_name))
    errorValidator.push({ last_name: "Name cannot be ampty" });
  if (validator.isEmpty(username))
    errorValidator.push({ username: "Name cannot be ampty" });
  if (!validator.isLength(password, { min: 6 }))
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
