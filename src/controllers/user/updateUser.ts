import { Request, Response, NextFunction } from "express";
import { User } from "../../database/entities/user/user";
import { db } from "../../database/config/ormconfig";
import HandleError from "../../utils/response/errors";
import Success from "../../utils/response/success";

export const UpdateUserContrller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  let { name, last_name, email, username } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      const error = new HandleError(400, "Raw", "No user by this id");
      return next(error);
    }

    const query = await db
      .createQueryBuilder()
      .update(User)
      .set({
        name,
        last_name,
        email,
        username,
      })
      .where("id=:id", { id })
      .returning("*")
      .execute();

    if (!query.raw[0]) {
      const error = new HandleError(400, "Raw", "There was an error");
      return next(error);
    }
    const success = new Success(200, "User updated successfully");
    return res.json(success.JSON);
  } catch (err) {
    const error = new HandleError(400, "Raw", "There was an error", err);
    return next(error);
  }
};
