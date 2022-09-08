import { NextFunction, Request, Response } from "express";

import { Customers } from "../../database/entities/customers/customers";
import HandleError from "../../utils/response/errors";
import Success from "../../utils/response/success";
import { getConnection } from "typeorm";

export const DeleteCustomer = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const customer = await Customers.findOne({ where: { id } });

    if (!customer) {
      return next(new HandleError(400, "Raw", "There is no user by this id"));
    }

    const query = await getConnection()
      .createQueryBuilder(Customers, "c")
      .softDelete()
      .execute();

    if (!query)
      return next(
        new HandleError(
          400,
          "Raw",
          "There was an error while deleting customer"
        )
      );

    return next(new Success(200, "Customer deleted successfully").JSON);
  } catch (err) {
    return next(new HandleError(400, err.field, err.message));
  }
};
