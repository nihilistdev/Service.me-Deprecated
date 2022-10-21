import { Country } from "@database/entities/country/Country";
import BaseController from "@root/core/BaseController";
import HandleError from "@utils/response/errors";
import Success from "@utils/response/success";
import { Request, Response, NextFunction } from "express";

export class CountryController {
  constructor(private base = new BaseController(Country)) {}

  async list(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query["page"] as string);
    const limit = parseInt(req.query["limit"] as string);
    const where = req.body["where"] || undefined;
    const params = req.body["params"] || undefined;

    try {
      const query = await this.base.paginationViewQuery(
        `select id, name from public.v_country ${
          where && where.q !== "" ? `where ${where.q}` : ""
        } limit $1 offset $2`,
        page,
        limit,
        where,
        params
      );
      res.json(new Success(200, "Query Success", query).JSON);
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }

  public async filter(req: Request, res:Response, next: NextFunction) {
    const { text }: { [key: string]: string } = req.body;
    if (text.length === 0)
      res.json(new Success(200, "Query success", {}));

    try {
      const query = await this.base.filter(text);
      if (query) res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }
}
