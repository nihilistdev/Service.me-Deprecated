import { NextFunction, Request, Response } from "express";

import { ACCOUNT_VERIFICATION_PREFIX } from "../../utils/constants/constants";
import HandleErorr from "../../utils/response/errors";
import Success from "../../utils/response/success";
import { User } from "../../database/entities/user/user";

export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.params.token;

  try {
    let userId = await req.redis.getKey(ACCOUNT_VERIFICATION_PREFIX + token);
    const user = await User.findOne({
      where: { id: parseInt(userId as string) },
    });

    if (!user) {
      const error = new HandleErorr(
        400,
        "Raw",
        "There is no user by this id or token is invalid"
      );
      return next(error);
    }

    await User.update(
      {
        id: user.id,
      },
      { confirmed: true }
    );

    const success = new Success(200, "Account verified successfully");
    res.json(success.JSON);
  } catch (err) {
    const error = new HandleErorr(400, "Raw", "Error", null, err, null);
    return next(error);
  }
};
