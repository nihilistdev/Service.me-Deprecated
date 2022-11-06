import { Request, Response, NextFunction } from "express";
import HandleError from "@utils/response/errors";
import { Staff } from "@database/entities/staff/ScStaff";

export const isStaff = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const isStaff = await Staff.findOne({
    where: {
      user_id: req.session.userId,
      roles_id: 1,
    },
  });
  if (isStaff?.sc_sc_id !== parseInt(req.headers["x-sc-id"] as string))
    next(new HandleError(400, "Validation", "User is not part of staff"));
  next();
};
