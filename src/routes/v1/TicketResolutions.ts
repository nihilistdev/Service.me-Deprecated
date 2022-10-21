import { TicketResolutionsController } from "@controllers/ticket_resolutions/TicketResolutionsController";
import { isAuth } from "@middleware/isAuth";
import { isStaff } from "@middleware/isStaff";
import { Router } from "express";

const router = Router();
const controller = new TicketResolutionsController();

router.get("/get/:t_id", [isAuth, isStaff], controller.getOne.bind(controller));
router.post("/create", [isAuth, isStaff], controller.create.bind(controller));
router.post("/list", [isAuth, isStaff], controller.list.bind(controller));
router.put(
  "/update/:id",
  [isAuth, isStaff],
  controller.update.bind(controller)
);

export default router;
