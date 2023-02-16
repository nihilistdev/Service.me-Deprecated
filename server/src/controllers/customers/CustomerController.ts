import { Customers } from "@database/entities/customers/customers";
import BaseController from "@root/core/BaseController";
import HandleError from "@utils/response/errors";
import Success from "@utils/response/success";
import { type Request, type Response, type NextFunction } from "express";
export class CustomerController {
  constructor(private readonly base = new BaseController(Customers)) {}

  public async filterCustomer(req: Request, res: Response, next: NextFunction) {
    const { text }: Record<string, string> = req.body;
    if (text.length === 0)
      res.json(new Success(200, "Query success", {} as Customers));

    try {
      const query = await this.base.filter(text);
      if (query) res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }

  public async getCreatedStaff(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const where = req.body.where || undefined;

    try {
      const query = await this.base.query(
        `select staff_name, staff_last_name from public.v_customer_created_by ${
          where && where.q !== "" ? `where ${where}` : ""
        } `
      );
      res.json(new Success(200, "Query Success", query[0]).JSON);
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }

  public async createCustomers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { first_name, last_name, email, pin, phone }: Record<string, string> =
      req.body;

    try {
      const query = await this.base.create(
        {
          first_name,
          last_name,
          email,
          pin,
          phone,
        },
        {
          checkIfAlreadyExists: true,
          checkTypes: true,
        }
      );
      res.json(new Success(200, "Query success", query?.raw[0]));
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }

  public async deleteCustomer(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      const query = await this.base.delete({ id: parseInt(id) });
      if (query) res.json(new Success(200, "Query success"));
    } catch (err) {
      next(new HandleError(400, "Raw", err.message));
    }
  }

  public async updateCustomers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const {
      first_name,
      last_name,
      email,
      pin,
      phone,
      address,
    }: Record<string, string> = req.body;

    const instance = await Customers.findOneOrFail({
      where: { id: parseInt(id) },
    });

    try {
      const query = await this.base.update(
        instance,
        {
          first_name,
          last_name,
          email,
          pin,
          phone,
          address,
        },
        "id = :id",
        { id }
      );

      res.json(new Success(200, "Query success", query?.raw[0]));
    } catch (err) {
      next(new HandleError(400, err.field, err.message));
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    try {
      const query = await this.base.retriveInstance(id);
      res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, err.field, err.message));
    }
  }
}
