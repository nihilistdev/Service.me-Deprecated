import { Ticket } from "@database/entities/ticket/Ticket";
import { BaseStatisticsController } from "@root/core/BaseStatisticsController";
import { HandleError } from "@utils/response/errors/Error";
import { Success } from "@utils/response/success/Success";
import { type Request, type Response, type NextFunction } from "express";

export default class TicketStatistics {
  constructor(private readonly base = new BaseStatisticsController(Ticket)) {}

  async currentMonthOpened(req: Request, res: Response, next: NextFunction) {
    try {
      const { month } = req.body;
      const sc_id = parseInt(req.headers["x-sc-id"] as string);
      const response = await this.base.monthOpened(month, sc_id);
      res.json(new Success(200, "Query success", response));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field} ${err.message}`));
    }
  }

  async currentMonthClosed(req: Request, res: Response, next: NextFunction) {
    try {
      const { month } = req.body;
      const sc_id = parseInt(req.headers["x-sc-id"] as string);
      const response = await this.base.monthClosed(month, sc_id);
      res.json(new Success(200, "Query success", response));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field} ${err.message}`));
    }
  }

  async range(req: Request, res: Response, next: NextFunction) {
    try {
      const from = new Date(req.body.from);
      const to = new Date(req.body.to);
      const sc_id = parseInt(req.headers["x-sc-id"] as string);
      if (from.toISOString() > to.toISOString()) {
        next(new HandleError(400, "Raw", "Cannot find for this range"));
        return;
      }
      const response = await this.base.range(
        from.toISOString(),
        to.toISOString(),
        sc_id
      );
      res.json(new Success(200, "Query success", response));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field} ${err.message}`));
    }
  }

  async monthlyStats(_: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.base.monthlyStats();
      res.json(new Success(200, "Query success", response));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field} ${err.message}`));
    }
  }
}
