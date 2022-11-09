import { TicketController } from "@controllers/ticket/TicketController";
import TicketStatistics from "@controllers/ticket/TicketStatistics";
import { isAuth } from "@middleware/isAuth";
import { isStaff } from "@middleware/isStaff";
import { Router } from "express";

const router = Router();
const controller = new TicketController();
const stats = new TicketStatistics();

router.get("/get/:id", [isAuth, isStaff], controller.retrive.bind(controller));
router.post("/create", [isAuth, isStaff], controller.create.bind(controller));
router.put(
  "/update/:id",
  [isAuth, isStaff],
  controller.update.bind(controller)
);
router.get(
  "/stats-opened/month",
  [isAuth, isStaff],
  stats.currentMonthOpened.bind(stats)
);
router.get(
  "/stats-closed/month",
  [isAuth, isStaff],
  stats.currentMonthClosed.bind(stats)
);
router.get("/stats/monthly", [isAuth, isStaff], stats.monthlyStats.bind(stats));
router.get("/stats/range", [isAuth, isStaff], stats.range.bind(stats));
router.post("/list", [isAuth, isStaff], controller.list.bind(controller));
router.post("/filter", [isAuth, isStaff], controller.filter.bind(controller));

export default router;
