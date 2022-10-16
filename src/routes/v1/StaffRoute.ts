import StaffController from "@controllers/staff/StaffController";
import { isAdminOrOwner } from "@middleware/isAdminOrOwner";
import { isAuth } from "@middleware/isAuth";
import { Router } from "express";

const router = Router();
const controller = new StaffController();

router.post("/add", [isAuth, isAdminOrOwner], controller.add.bind(controller));
router.post("/list", [isAuth], controller.list.bind(controller));
router.delete(
  "/delete",
  [isAuth, isAdminOrOwner],
  controller.delete.bind(controller)
);

export default router;
