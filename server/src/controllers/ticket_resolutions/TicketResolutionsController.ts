import { TicketResolutions } from "@database/entities/ticket_resolutions/TicketResolutions";
import BaseController from "@root/core/BaseController";
import { HandleError } from "@utils/response/errors/Error";
import { Success } from "@utils/response/success/Success";
import { Request, Response, NextFunction } from "express";

export class TicketResolutionsController {
  constructor(private base = new BaseController(TicketResolutions)) {}

  async getOne(req: Request, res: Response, next: NextFunction) {
    const t_id = parseInt(req.params.ticket_id);

    try {
      const query = await this.base.retriveInstance(undefined, { id: t_id });
      res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
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

  async create(req: Request, res: Response, next: NextFunction) {
    const { ticket_id, comment, staff_id } = req.body;

    try {
      const query = await this.base.create({
        ticket_id,
        comment,
        staff_id,
      });
      res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const { comment } = req.body;

    try {
      const instance = await this.base.retriveInstance(id);
      const query = await this.base.update(
        instance,
        {
          comment,
        },
        "id = :id",
        { id: id }
      );
      res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }
}
