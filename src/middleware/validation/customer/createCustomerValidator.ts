import { Request, Response, NextFunction } from "express";
import validator from "validator";

import HandleError from "@utils/response/errors";

export const ValidateCreateCustomer = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { first_name, last_name, email, pin, phone } = req.body;

  first_name = !first_name ? "" : first_name;
  last_name = !last_name ? "" : last_name;
  email = !email ? "" : email;
  pin = !pin ? "" : pin;
  phone = !phone ? "" : phone;

  const errorValidator: ErrorValidation[] = [...new Array()];

  if (validator.isEmpty(first_name))
    errorValidator.push({ first_name: "Name is required" });
  if (validator.isEmpty(last_name))
    errorValidator.push({ last_name: "Last name is required" });
  if (!validator.isEmail(email))
    errorValidator.push({ email: "Valid email must be provided" });
  if (validator.isEmpty(phone))
    errorValidator.push({ phone: "Phone is empty and required" });

  if (errorValidator.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Validation erorr",
      null,
      null,
      errorValidator
    );
    return next(error);
  }
  return next();
};
