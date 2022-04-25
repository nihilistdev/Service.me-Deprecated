import { Router } from "express";
import { isAuth } from "../../middleware/isAuth";
import csurf from "csurf";

// Controllers
import { UpdateUserContrller } from "../../controllers/user";

// Validators
import { updateUserValidator } from "../../middleware/validation/users";

const router = Router();
const csrfMiddleware = csurf({ cookie: true });

router.post(
  "/update/:id",
  [isAuth, csrfMiddleware, updateUserValidator],
  UpdateUserContrller
);

export default router;
