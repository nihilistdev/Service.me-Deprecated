import { NextFunction, Request, Response } from "express";
import HandleError from "../../../utils/response/errors";
import validator from "validator";

export const CreateServiceCenter = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let { name, address, city, phone, id_number } = req.body;
  const errorValidations: ErrorValidation[] = [];

  name = !name ? "" : name;
  address = !address ? "" : address;
  city = !city ? "" : city;
  phone = !phone ? "" : phone;
  id_number = !id_number ? "" : id_number;

  if (validator.isEmpty(name))
    errorValidations.push({ name: "Name cannot be empty" });
  if (validator.isEmpty(address))
    errorValidations.push({ address: "Address cannot be empty" });
  if (validator.isEmpty(phone))
    errorValidations.push({ phone: "Phone cannot be empty" });

  if (errorValidations.length !== 0) {
    const error = new HandleError(
      400,
      "Validation",
      "Service center validation error",
      null,
      null,
      errorValidations
    );
    return next(error);
  }
  return next();
};
