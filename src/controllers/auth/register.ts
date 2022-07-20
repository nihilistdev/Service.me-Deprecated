import { Request, Response, NextFunction } from "express";
import { User } from "../../database/entities/user/user";
import { db } from "../../database/config/ormconfig";
import { HandleError } from "../../utils/response/errors/Error";
import { v4 } from "uuid";
import argon2 from "argon2";
import Success from "../../utils/response/success";

export const RegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, last_name, email, username, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const error = new HandleError(400, "General", "User already exists", [
        `User already exists on ${email}`,
      ]);
      return next(error);
    }
    try {
      let hashPassword = await argon2.hash(password);
      const query = await db()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name,
          last_name,
          email,
          username,
          password: hashPassword,
        })
        .returning("*")
        .execute();

      if (!query.raw[0]) {
        const error = new HandleError(
          404,
          "General",
          "There was an error while creating your account"
        );
        return next(error);
      }
      const token = v4();
      await req.redis.setKey(token, query.raw[0].id, "Verify-Account");
      const success = new Success(200, "User created successfuly");
      return res.json(success.JSON);
    } catch (err) {
      const error = new HandleError(400, "Raw", "Error", null, err);
      return next(error);
    }
  } catch (err) {
    const error = new HandleError(400, "Raw", "Error", null, err);
    return next(error);
  }
};
