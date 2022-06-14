import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { HandleError } from "../../../utils/response/errors/Error";

export const ValidateCreateCustomer = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { name, last_name, email, pin } = req.body;

  const errors: ErrorValidation[] = [...new Array()];

  if (validator.isEmpty(name)) errors.push({ name: "Name is required" });
  if (validator.isEmpty(last_name))
    errors.push({ last_name: "Last name is required" });
  if (!validator.isEmail(email))
    errors.push({ email: "Valid email must be provided" });
  if (validator.isNumeric(pin)) errors.push({ pin: "PIN must be number" });

  if (errors.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Validation erorr",
      null,
      null,
      errors
    );
    return next(error);
  }
  return next();
};
