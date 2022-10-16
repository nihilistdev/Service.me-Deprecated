import { NextFunction, Request, Response } from "express";
import { ServiceCenter } from "@database/entities/service_center/ServiceCenter";
import HandleError from "@utils/response/errors";
import { Success } from "@utils/response/success/Success";
import BaseController from "@root/core/BaseController";

export class ServiceCenterController {
  constructor(private base = new BaseController(ServiceCenter)) {}

  async update(req: Request, res: Response, next: NextFunction) {
    const { name, address, city, phone, id_number } = req.body;
    const id = req.params.id;
    try {
      const instance = await ServiceCenter.findOne({
        where: { sc_id: parseInt(id, 10) },
      });
      const query = await this.base.update(
        instance,
        {
          name,
          address,
          city,
          phone,
          id_number,
        },
        "id = :id",
        { id: parseInt(id, 10) }
      );
      if (query!.raw[0]) res.json(new Success(200, "Update success"));
    } catch (err) {
      return next(new HandleError(400, err.field, err.message));
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

  async insert(req: Request, res: Response, next: NextFunction) {
    const { name, address, city, phone, id_number } = req.body;
    try {
      const query = await this.base.create(
        {
          name,
          address,
          city,
          id_number,
          phone,
        },
        {
          checkIfAlreadyExists: true,
        }
      );
      res.json(new Success(200, "Query success", query!.raw[0]));
    } catch (err) {
      next(new HandleError(400, "Raw", err.field, err.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    try {
      const query = await this.base.delete({id: parseInt(id)});
      if(query) res.json(new Success(200, "Query success"))
    } catch(err) {
      next(new HandleError(400, "Raw", err.field, err.message))
    }
  }
}
