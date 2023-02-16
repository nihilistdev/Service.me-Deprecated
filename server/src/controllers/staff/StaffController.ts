import { Staff } from "@database/entities/staff/ScStaff";
import { type Request, type Response, type NextFunction } from "express";
import BaseController from "@root/core/BaseController";
import { Success } from "@utils/response/success/Success";
import { HandleError } from "@utils/response/errors/Error";

export default class StaffController {
  constructor(private readonly base = new BaseController(Staff)) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const { user_id, sc_sc_id, roles_id } = req.body;

    try {
      const query = await this.base.create(
        { user_id, sc_sc_id, roles_id },
        { checkIfAlreadyExists: true }
      );
      if (query?.raw[0]) res.json(new Success(200, "Query success"));
    } catch (err) {
      next(new HandleError(400, "General", `${err.field}: ${err.message}`));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    try {
      const query = await this.base.delete({ id });
      if (query) res.json(new Success(200, "Query success"));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const where = req.body.where || undefined;
    const params = req.body.params || undefined;

    try {
      const query = await this.base.paginationViewQuery(
        `select id, first_name, last_name, email, role from public.v_staff ${
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
}
