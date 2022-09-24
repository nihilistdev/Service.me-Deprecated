import { Request, Response, NextFunction } from "express";
import HandleError from "src/utils/response/errors";
import validator from "validator";

export const changePasswordNonJwtTokenValidator = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let token = req.params.token;
  let { newPassword, confirmNewPassword } = req.body;
  const errorValidator: ErrorValidation[] = [...new Array()];

  newPassword = !newPassword ? "" : newPassword;
  confirmNewPassword = !confirmNewPassword ? "" : confirmNewPassword;

  if (validator.isEmpty(token)) {
    const error = new HandleError(400, "Validation", "There is no valid token");
    return next(error);
  }

  if (validator.isEmpty(newPassword)) {
    errorValidator.push({ newPassword: "This field cannot be empty" });
  }

  if (validator.isEmpty(confirmNewPassword)) {
    errorValidator.push({ confirmNewPassword: "This field cannot be empty" });
  }

  if (!validator.equals(newPassword, confirmNewPassword)) {
    errorValidator.push({ confirmNewPassword: "Passwords are not matching" });
  }

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
