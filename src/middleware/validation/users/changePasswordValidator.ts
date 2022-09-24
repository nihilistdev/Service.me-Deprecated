import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { HandleError } from "src/utils/response/errors/Error";

export const validateChangePassword = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { password, passwordNew, confirmPassword } = req.body;
  const errorValidator: ErrorValidation[] = [...new Array()];

  password = !password ? "" : password;
  passwordNew = !passwordNew ? "" : passwordNew;
  confirmPassword = !confirmPassword ? "" : confirmPassword;

  if (validator.isEmpty(password))
    errorValidator.push({ password: "Password is required" });
  if (validator.isEmpty(passwordNew))
    errorValidator.push({ password: "new password is required" });
  if (validator.isEmpty(confirmPassword))
    errorValidator.push({ confirmPassword: "Confirm password is required" });
  if (!validator.isLength(passwordNew, { min: 6 }))
    errorValidator.push({
      passwordNew: "New password must bne at least 6 characters",
    });
  if (!validator.equals(passwordNew, confirmPassword))
    errorValidator.push({ confirmPassword: "Passwords do not match" });

  if (errorValidator.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Validation error",
      null,
      null,
      errorValidator
    );
    return next(error);
  }
  return next();
};
