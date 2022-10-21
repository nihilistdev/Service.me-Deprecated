import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { HandleError } from "@utils/response/errors/Error";

export const forgotPasswordValidator = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { email } = req.body;
  const errorValidator: ErrorValidation[] = [...new Array()];

  email = !email ? "" : email;

  if (!validator.isEmail(email)) {
    errorValidator.push({ email: "Email is required" });
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
