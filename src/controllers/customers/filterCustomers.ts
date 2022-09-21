import { NextFunction, Request, Response } from "express";

import { Customers } from "../../database/entities/customers/customers";
import { HandleError } from "../../utils/response/errors/Error";
import { Success } from "../../utils/response/success/Success";
import { getConnection } from "typeorm";

export const FilterCustomer = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { text }: { [key: string]: string } = req.body;
  if (text.length === 0)
    return next(new Success<Customers>(200, "Query success", {} as Customers));
  try {
    const query = await getConnection()
      .createQueryBuilder(Customers, "c")
      .select()
      .where(`document_with_weights @@ to_tsquery(concat(:query::text,':*'))`, {
        query: text,
      })
      .orderBy(
        "ts_rank(document_with_weights, to_tsquery(concat(:query::text,':*')))",
        "DESC"
      )
      .getMany();
    return _.json(new Success<Customers>(200, "Query success", query).JSON);
  } catch (err) {
    return next(new HandleError(400, err.field, err.message));
  }
};
