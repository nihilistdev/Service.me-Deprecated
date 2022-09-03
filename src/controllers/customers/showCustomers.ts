import { NextFunction, Request, Response } from "express";

import { Customers } from "../../database/entities/customers/customers";
import HandleError from "../../utils/response/errors";
import Success from "../../utils/response/success";

export const ShowCustomers = async (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  try {
    const query = await Customers.find();
    return next(new Success<Customers>(200, "Customers", query));
  } catch (err) {
    return next(new HandleError(400, err.field, err.message));
  }
};
