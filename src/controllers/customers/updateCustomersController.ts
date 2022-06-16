import { Request, Response, NextFunction } from "express";
import { Customers } from "../../database/entities/customers/customers";
import { db } from "../../database/config/ormconfig";
import HandleError from "../../utils/response/errors";
import Success from "../../utils/response/success";

export const UpdateCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const { name, last_name, email, pin, phone }: { [key: string]: string } =
    req.body;
console.log(id);
  try {
    const customer = await Customers.findOne({ where: { id } });
    if (!customer) {
      return next(new HandleError(400, "Raw", "There is no user by this id"));
    }
      
    const query = await db
      .createQueryBuilder()
      .update(Customers)
      .set({
        name,
        last_name,
        email,
        phone,
        pin: parseInt(pin),
      })
      .where("id = :id", { id })
      .returning("*")
      .execute();
    console.log(query);
    if (!query.raw[0]) {
      return next(
        new HandleError(
          400,
          "Raw",
          "There was an error while updating customer"
        )
      );
    }
    return res.json(new Success(200, "Customer updated successfully").JSON);
  } catch (err) {
    return next(new HandleError(400, "Raw", "There was an error", err));
  }
};
