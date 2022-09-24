import { NextFunction, Request, Response } from "express";
import { ServiceCenter } from "../../database/entities/service_center/ServiceCenter";
import HandleError from "../../utils/response/errors";
import { getConnection } from "typeorm";
import { Success } from "../../utils/response/success/Success";

export class ServiceCenterController {
  constructor() {}

  async update(req: Request, res: Response, next: NextFunction) {
    
    const { name, address, city, phone, id_number } = req.body;
    const id = req.params.id;
    try {
      await getConnection()
        .createQueryBuilder()
        .update(ServiceCenter)
        .set({
          name,
          address,
          city,
          phone,
          id_number,
        })
        .where("sc_id = :id", { id: parseInt(id) })
        .returning("*")
        .execute();
      res.json(new Success<ServiceCenter>(200, "Update success"));
    } catch (err) {
      return next(new HandleError(400, err.field, err.message));
    }
  }

  async list(req: Request, _: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query["page"] as string);
      const limit = parseInt(req.query["limit"] as string);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const customerCount = await ServiceCenter.count();
      const pages = Math.ceil(customerCount / limit);

      const data = {
        startIndex,
        endIndex,
        pages,
        next: {},
        previous: {},
        results: {},
      };

      if (endIndex < (await ServiceCenter.count())) {
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
          .createQueryBuilder(ServiceCenter, "s")
          .skip(startIndex)
          .limit(limit)
          .getMany();
      } catch (err) {
        return next(new HandleError(400, err.field, err.message));
      }
      return _.json(new Success<typeof data>(200, "Service center", data).JSON);
    } catch (err) {
      return next(new HandleError(400, err.field, err.message));
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    let response;
    const { name, address, city, phone, id_number } = req.body;
    try {
      response = await getConnection()
        .createQueryBuilder(ServiceCenter, "s")
        .insert()
        .values({
          name,
          address,
          city,
          phone,
          id_number,
        })
        .returning("*")
        .execute();
    } catch (err) {
      return next(new HandleError(400, err.field, err.message));
    }
    res.json(new Success<ServiceCenter>(200, "Query success", response.raw[0]));
  }
}
