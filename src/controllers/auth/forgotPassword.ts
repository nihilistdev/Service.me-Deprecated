import { Request, Response, NextFunction } from "express";
import { User } from "../../database/entities/user/user";
import { v4 } from "uuid";
import HandleError from "../../utils/response/errors";
import Success from "../../utils/response/success";
import ConsoleDebug from "../../utils/console";

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new HandleError(
        400,
        "Raw",
        "User does not exist in database"
      );
      return next(error);
    }
    const token = v4();
    req.redis.setKey(token, user.id, "Forgot-password");
    const success = new Success(200, "Your verification email has been sent");
    ConsoleDebug.info(`Generated token is ${token}`);
    return res.json(success.JSON);
  } catch (err) {
    const error = new HandleError(400, "Raw", "An error occured", err);
    ConsoleDebug.error(err);
    return next(error);
  }
};
