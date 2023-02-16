import type { NextFunction, Request, Response } from "express";

import ConsoleDebug from "@utils/console";
import HandleError from "@utils/response/errors";
import Success from "@utils/response/success";
import { User } from "@database/entities/user/user";
import { v4 } from "uuid";

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new HandleError(
        400,
        "Raw",
        "User does not exist in database"
      );
      next(error);
    }
    const token = v4();
    const redis_result = await req.redis.setKey(
      token,
      Number(user?.id),
      "Forgot-password"
    );
    if (redis_result === "OK") {
      const success = new Success(
        200,
        "Your verification email has been sent",
        {
          token,
        }
      );
      ConsoleDebug.info(`Generated token is ${token}`);
      res.json(success.JSON);
    }
    const error = new HandleError(400, "Raw", "An error occured");
    res.json(error.JSON);
  } catch (err) {
    const error = new HandleError(400, "Raw", "An error occured", err);
    ConsoleDebug.error(err);
    next(error);
  }
};
