import { Customers } from "@database/entities/customers/customers";
import BaseController from "@root/core/BaseController";
import { Log } from "@utils/logger/logger";
import HandleError from "@utils/response/errors";
import Success from "@utils/response/success";
import { Request, Response, NextFunction } from "express";

export class CustomerController {
  constructor(private base = new BaseController(Customers)) {}

  public async filterCustomer(req: Request, res: Response, next: NextFunction) {
    const { text }: { [key: string]: string } = req.body;
    if (text.length === 0)
      res.json(new Success(200, "Query success", {} as Customers));

    try {
      const query = await this.base.filter(text);
      if (query) res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }

  @Log({ type: "profile" })
  public async listCustomers(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query["page"] as string);
    const limit = parseInt(req.query["limit"] as string);
    const list = req.query["list"] || false;
    const where = req.body["where"] || "";
    const params = req.body["params"] || {};
    let query;

    try {
      if (list === "true") {
        query = await this.base.list(1, 10, where, params, true);
        res.json(new Success(200, "Query Success", query));
        return;
      }
      query = await this.base.list(page || 1, limit || 10, where, params);
      res.json(new Success(200, "Query success", query).JSON);
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }

  public async createCustomers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {
      first_name,
      last_name,
      email,
      pin,
      phone,
    }: { [key: string]: string } = req.body;

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
      res.json(new Success(200, "Query success", query!.raw[0]));
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
    }: { [key: string]: string } = req.body;

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
        { id: id }
      );

      res.json(new Success(200, "Query success", query!.raw[0]));
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
