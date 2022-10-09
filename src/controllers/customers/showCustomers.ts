import { NextFunction, Request, Response } from "express";

import { Customers } from "@database/entities/customers/customers";
import HandleError from "@utils/response/errors";
import Success from "@utils/response/success";
import { getConnection } from "typeorm";

export const ShowCustomers = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query["page"] as string);
    const limit = parseInt(req.query["limit"] as string);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const customerCount = await Customers.count();
    const pages = Math.ceil(customerCount / limit);

    const data = {
      startIndex,
      endIndex,
      pages,
      next: {},
      previous: {},
      results: {},
    };

    if (endIndex < (await Customers.count())) {
      data.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      data.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      data.results = await getConnection()
        .createQueryBuilder(Customers, "c")
        .skip(startIndex)
        .limit(limit)
        .getMany();
    } catch (err) {
      return next(new HandleError(400, err.field, err.message));
    }
    return _.json(new Success<typeof data>(200, "Customers", data).JSON);
  } catch (err) {
    return next(new HandleError(400, err.field, err.message));
  }
};
