import { NextFunction, Request, Response } from "express";

import { Customers } from "../../database/entities/customers/customers";
import { HandleError } from "../../utils/response/errors/Error";
import { Success } from "../../utils/response/success/Success";
import { db } from "../../database/config/ormconfig";

export const FilterCustomer = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { text } = req.body;

  try {
    const query = await db
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
    return next(new Success<Customers>(200, "Query success", query));
  } catch (err) {
    return next(new HandleError(400, err.field, err.message));
  }
};
