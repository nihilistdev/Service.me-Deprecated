import { Ticket } from "@database/entities/ticket/Ticket";
import BaseController from "@root/core/BaseController";
import { HandleError } from "@utils/response/errors/Error";
import { Success } from "@utils/response/success/Success";
import { Request, Response, NextFunction } from "express";

export class TicketController {
  constructor(private base = new BaseController(Ticket)) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const { staff_id, title, description, sc_sc_id, customer_id } = req.body;

    try {
      const query = await this.base.create(
        { staff_id, title, description, sc_sc_id, customer_id },
        {
          checkIfAlreadyExists: true,
        }
      );
      if (query!.raw[0]) res.json(new Success(200, "Query success").JSON);
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }

  async filter(req: Request, res: Response, next: NextFunction) {
    const where = req.body["where"] as string;
    const limit = req.body["limit"] as number;

    try {
      const query = await this.base.query(
        `select 
          ticket_title,
          ticket_description,
          service_center_name,
          service_center_address,
          service_center_phone,
          customer_first_name,
          customer_last_name,
          service_center_email,
          customer_phone_number,
          staff_first_name,
          staff_last_name,
          staff_email,
          staff_username
        from v_tickets 
        where 
          to_tsvector(concat_ws(' ', customer_first_name , customer_last_name))
          @@ to_tsquery($1)
        limit $2;
        `,
        [where || "", limit || 10]
      );
      res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query["page"] as string);
    const limit = parseInt(req.query["limit"] as string);
    const where = req.body["where"] || undefined;
    const params = req.body["params"] || undefined;

    try {
      const query = await this.base.paginationViewQuery(
        `select 
          ticket_title,
          ticket_description,
          service_center_name,
          service_center_address,
          service_center_phone,
          customer_first_name,
          customer_last_name,
          service_center_email,
          customer_phone_number,
          staff_first_name,
          staff_last_name,
          staff_email,
          staff_username
        from v_tickets ${
          where && where.q !== "" ? where.q : ""
        } limit $1 offset $2
        `,
        page,
        limit,
        where,
        params
      );
      res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }

  async retrive(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);

    try {
      const query = await this.base.retriveInstance(id);
      res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    try {
      const instance = await this.base.retriveInstance(id);
      const query = await this.base.update(
        instance,
        {
          title,
          description,
        },
        "id = :id",
        { id: id }
      );
      res.json(new Success(200, "Query success", query!.raw[0]));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }
}
