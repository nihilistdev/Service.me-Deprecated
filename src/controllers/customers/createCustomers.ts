import { Request, Response, NextFunction } from "express";
import { Customers } from "../../database/entities/customers/customers";
import { db } from "../../database/config/ormconfig";
import HandleError from "../../utils/response/errors";
import Success from "../../utils/response/success";

export const CreateCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, last_name, email, pin, phone }: { [key: string]: string } =
    req.body;

  try {
    const query = await db
      .createQueryBuilder()
      .insert()
      .into(Customers)
      .values({
        name: name,
        last_name: last_name,
        email: email,
        pin: parseInt(pin),
        phone,
      })
      .returning("*")
      .execute();
    if (!query.raw[0]) {
      return next(
        new HandleError(
          400,
          "General",
          "There was an error while creating account"
        )
      );
    }
    return res.json(
      new Success(200, "Customer creation success", query.raw[0]).JSON
    );
  } catch (err) {
    return next(new HandleError(400, "Raw", "Error", null, err));
  }
};
