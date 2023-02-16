import { User } from "@database/entities/user/user";
import BaseController from "@root/core/BaseController";
import { HandleError } from "@utils/response/errors/Error";
import { Success } from "@utils/response/success/Success";
import { type Request, type Response, type NextFunction } from "express";

export class UserController {
  constructor(private readonly base = new BaseController(User)) {}

  async update(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email, username } = req.body;

    if (req.session.userId !== id) {
      next(new HandleError(403, "Unauthorized", "This user is not reachable!"));
      return;
    }

    try {
      const instance = await this.base.retriveInstance(req.session.userId);
      const query = await this.base.update(
        instance,
        {
          first_name,
          last_name,
          email,
          username,
        },
        "id = :id",
        { id: req.session.userId }
      );
      if (query?.raw[0])
        res.json(new Success(200, "Query success", query.raw[0]));
    } catch (err) {
      next(new HandleError(400, "Raw", `${err.field}: ${err.message}`));
    }
  }

  async info(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId)
      next(new HandleError(400, "Unauthorized", "User is not authorized"));

    try {
      const query = await this.base.retriveInstance(req.session.userId);
      delete query?.password;
      delete query?.isActive;
      delete query?.confirmed;
      delete query?.created_at;
      delete query?.updated_at;
      res.json(new Success(200, "Query success", query));
    } catch (err) {
      next(
        new HandleError(400, "Unauthorized", `${err.field}: ${err.message}`)
      );
    }
  }
}
