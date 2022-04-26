import { Request, Response, NextFunction } from "express";
import { User } from "../../database/entities/user/user";
import { FORGOT_PASSWORD_PREFIX } from "../../utils/constants/constants";
import argon2 from "argon2";
import HandleError from "../../utils/response/errors";
import Success from "../../utils/response/success";
import ConsoleDebug from "../../utils/console";

export const changePasswordNonJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.params.token;
  let { newPassword } = req.body;
  try {
    const userId = await req.redis.getKey(FORGOT_PASSWORD_PREFIX + token);
    if (!userId) {
      const error = new HandleError(400, "Raw", "Token expired");
      return next(error);
    }

    const user = await User.findOne({ where: { id: parseInt(userId) } });
    if (!user) {
      const error = new HandleError(400, "Raw", "There was an error");
      return next(error);
    }

    let hashPassword = await argon2.hash(newPassword);
    await User.update(
      {
        id: user.id,
      },
      { password: hashPassword }
    );
    await req.redis.delete(FORGOT_PASSWORD_PREFIX + token);
    const success = new Success(200, "Your password is successfully updated!");
    return res.json(success.JSON);
  } catch (err) {
    ConsoleDebug.error(err);
    const error = new HandleError(400, "Raw", "There was and error", err);
    return next(error);
  }
};
