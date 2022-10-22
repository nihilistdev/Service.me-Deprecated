import { NextFunction, Request, Response } from "express";

import { ConsoleDebug } from "@utils/console/console";
import HandleError from "@utils/response/errors";
import Success from "@utils/response/success";
import { User } from "@database/entities/user/user";
import argon2 from "argon2";

export const LoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { emailOrUsername, password }: { [key: string]: string } = req.body;

  try {
    const user = await User.findOne(
      emailOrUsername.includes("@")
        ? { where: { email: emailOrUsername } }
        : { where: { username: emailOrUsername } }
    );
    if (!user) {
      const error = new HandleError(401, "General", "Not found", [
        { field: "emailOrUsername", message: "Wrong username or email" },
      ]);
      return res.status(error.httpStatusCode).send(error);
    }

    let valid = await argon2.verify(user.password, password);
    if (!valid) {
      const error = new HandleError(401, "General", "Password", [
        {
          field: "password",
          message: "Password is not matching one in database",
        },
      ]);
      return res.status(error.httpStatusCode).send(error);
    }

    if (!user.confirmed || user.confirmed === null) {
      const error = new HandleError(
        401,
        "Unauthorized",
        "You must activate your account in order to log in"
      );
      return res.status(error.httpStatusCode).send(error);
    }

    try {
      const success = new Success(200, `Logged in successfuly`, user);
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
      return next(error.JSON);
    }
  } catch (err) {
    const error = new HandleError(400, "Raw", "Error", err);
    ConsoleDebug.error(err);
    return next(error);
  }
};
