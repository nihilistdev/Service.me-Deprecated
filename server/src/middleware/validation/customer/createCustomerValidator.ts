import { Request, Response, NextFunction } from "express";
import HandleError from "@utils/response/errors";
import { BaseValidator } from "@root/core/BaseValidator";

export const ValidateCreateCustomer = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { first_name, last_name, email, pin, phone, address } = req.body;
  console.log(pin);
  const base = new BaseValidator([
    { name: "first_name", value: first_name, required: true },
    { name: "last_name", value: last_name, required: true },
    { name: "email", value: email, required: true, email: true },
    { name: "pin", value: pin, required: true },
    { name: "phone", value: phone, required: true },
    { name: "address", value: address, required: true },
  ]).validate();

  if (base.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Validation erorr",
      null,
      null,
      base
    );
    return next(error);
  }
  return next();
};
