import { Router } from "express";
import { isAuth } from "src/middleware/isAuth";

// Controllers
import { UpdateUserContrller } from "src/controllers/user";

// Validators
import { updateUserValidator } from "src/middleware/validation/users";

const router = Router();

router.post("/update/:id", [isAuth, updateUserValidator], UpdateUserContrller);

export default router;
