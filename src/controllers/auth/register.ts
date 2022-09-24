import { NextFunction, Request, Response } from "express";

import { HandleError } from "src/utils/response/errors/Error";
import Success from "src/utils/response/success";
import { User } from "src/database/entities/user/user";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import { v4 } from "uuid";

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
      const query = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name,
          last_name,
          email,
          username,
          password: hashPassword,
          api_key: v4(),
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
      const success = new Success(200, "User created successfuly", {
        token: token,
      });
      return res.json(success.JSON);
    } catch (err) {
      const error = new HandleError(400, err.field, err.message, null, err);
      return next(error);
    }
  } catch (err) {
    const error = new HandleError(400, err.field, err.message, null, err);
    return next(error);
  }
};
