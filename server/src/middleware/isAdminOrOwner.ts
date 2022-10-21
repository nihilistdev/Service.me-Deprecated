import { Request, Response, NextFunction } from "express";
import HandleError from "@utils/response/errors";
import { ServiceCenter } from "@database/entities/service_center/ServiceCenter";
import { Staff } from "@database/entities/staff/ScStaff";
import { StaffRoles } from "@database/entities/StaffRoles/StaffRoles";

export const isAdminOrOwner = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const sc = await ServiceCenter.findOne({
    where: { owner_id: req.session.userId },
  });
  if (!sc) {
    const staff = await Staff.findOne({
      where: { user_id: req.session.userId },
    });
    const role = await StaffRoles.findOne({ where: { name: "Admin" } });

    if (staff?.roles_id !== role?.id)
      next(
        new HandleError(
          403,
          "Unauthorized",
          "You don't have permission to do this action!"
        )
      );
    next();
  }
  next();
};
