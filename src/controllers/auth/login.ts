import { Request, Response, NextFunction } from "express";
import { User } from "../../database/entities/user/user";
import argon2 from "argon2";
import HandleError from "../../utils/response/errors";
import { handleJwtToken } from "../../utils/jwt/handleJwtToken";
import { ConsoleDebug } from "../../utils/console/console";
import Success from "../../utils/response/success";

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new HandleError(404, "General", "Not found", [
        "Incorrect email or password",
      ]);
      return next(error);
    }

    let valid = argon2.verify(user.password, password);
    if (!valid) {
      const error = new HandleError(404, "General", "Password", [
        `Password doesn't match one in database`,
      ]);
      return next(error);
    }

    const tokenData: JwtPayload = {
      id: user.id,
      name: user.name,
      surname: user.last_name,
      email: user.email,
      create_at: user.created_at,
    };

    try {
      const token = handleJwtToken(tokenData);
      const success = new Success(200, `Bearer ${token}`);
      req.redis.setKey(token, user.id);
      req.session.userId = user.id;
      return res.json(success.JSON);
    } catch (err) {
      const error = new HandleError(
        400,
        "Raw",
        "Token cannot be created",
        null,
        err
      );
      ConsoleDebug.error(err);
      return next(error);
    }
  } catch (err) {
    const error = new HandleError(400, "Raw", "Error", err);
    ConsoleDebug.error(err);
    return next(error);
  }
};
