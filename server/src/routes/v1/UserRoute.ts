import { Router } from "express";
import { isAuth } from "@middleware/isAuth";

// Controllers
import { UserController } from "@controllers/user/UserController";

// Validators
import { updateUserValidator } from "@middleware/validation/users";

const controller = new UserController();
const router = Router();

router.post(
  "/update/:id",
  [isAuth, updateUserValidator],
  controller.update.bind(controller)
);
router.get("/info", [isAuth], controller.info.bind(controller));

export default router;
