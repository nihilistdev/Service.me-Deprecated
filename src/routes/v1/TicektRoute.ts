import { TicketController } from "@controllers/ticket/TicketController";
import { isAuth } from "@middleware/isAuth";
import { isStaff } from "@middleware/isStaff";
import { Router } from "express";

const router = Router();
const controller = new TicketController();

router.get("/get/:id", [isAuth, isStaff], controller.retrive.bind(controller));
router.post("/create", [isAuth, isStaff], controller.create.bind(controller));
router.put(
  "/update/:id",
  [isAuth, isStaff],
  controller.update.bind(controller)
);
router.post("/list", [isAuth, isStaff], controller.list.bind(controller));
router.post("/filter", [isAuth, isStaff], controller.filter.bind(controller));

export default router;
