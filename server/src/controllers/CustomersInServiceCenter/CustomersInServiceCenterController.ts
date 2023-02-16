import { CustomersInServiceCenter } from "@database/entities/customers_in_service_center/CustomersInServiceCenter";
import { type Request, type Response, type NextFunction } from "express";
import BaseController from "@root/core/BaseController";
import Success from "@utils/response/success";
import HandleError from "@utils/response/errors";

export class CustomersInServiceCenterController {
  constructor(
    private readonly base = new BaseController(CustomersInServiceCenter)
  ) {}

  public async listCustomers(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const where = req.body.where || "";
    const params = req.body.params || {};
    let query;

    try {
      query = await this.base.paginationViewQuery(
        `select first_name, last_name, email, phone, address, pin from v_customer_in_sc ${
          where && where.q !== "" ? `where ${where.q}` : ""
        } limit $1 offset $2`,
        page || 1,
        limit || 10,
        where,
        params
      );
      res.json(new Success(200, "Query success", query).JSON);
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }
}
