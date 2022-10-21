import { Request, Response, NextFunction } from "express";
import validator from "validator";
import HandleError from "@utils/response/errors";

export const updateUserValidator = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { first_name, last_name, email, username } = req.body;
  const errorValidation: ErrorValidation[] = [...new Array()];

  if (!first_name && !last_name && !email && !username) {
    errorValidation.push({ data: "Some of user data is missing" });
  }

  if (validator.contains(first_name, `!@#$%^&*()_+-=[]{}\|;:'",.<>/?`)) {
    errorValidation.push({ first_name: "Name must not contain symbols" });
  }

  if (validator.contains(last_name, `!@#$%^&*()_+-=[]{}\|;:'",.<>/?`)) {
    errorValidation.push({ last_name: "Last nbame must not constain symbols" });
  }

  if (errorValidation.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Validation error",
      null,
      null,
      errorValidation
    );
    return next(error);
  }
  return next();
};
