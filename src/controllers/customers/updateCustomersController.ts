import { NextFunction, Request, Response } from "express";

import { Customers } from "../../database/entities/customers/customers";
import HandleError from "../../utils/response/errors";
import Success from "../../utils/response/success";
import { getConnection } from "typeorm";

export const UpdateCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const {
    first_name,
    last_name,
    email,
    pin,
    phone,
  }: { [key: string]: string } = req.body;

  try {
    const customer = await Customers.findOne({ where: { id } });
    if (!customer) {
      return next(new HandleError(400, "Raw", "There is no user by this id"));
    }

    const query = await getConnection()
      .createQueryBuilder()
      .update(Customers)
      .set({
        first_name,
        last_name,
        email,
        phone,
        pin: parseInt(pin),
      })
      .where("id = :id", { id })
      .returning("*")
      .execute();
    if (!query.raw[0]) {
      return next(
        new HandleError(
          400,
          "Raw",
          "There was an error while updating customer"
        )
      );
    }
    return res.json(
      new Success(200, "Customer updated successfully", query.raw[0]).JSON
    );
  } catch (err) {
    return next(new HandleError(400, "Raw", "There was an error", err));
  }
};
