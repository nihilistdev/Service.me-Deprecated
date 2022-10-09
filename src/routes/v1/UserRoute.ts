import { Router } from "express";
import { isAuth } from "@middleware/isAuth";

// Controllers
import { UpdateUserContrller } from "@controllers/user";

// Validators
import { updateUserValidator } from "@middleware/validation/users";

const router = Router();

router.post("/update/:id", [isAuth, updateUserValidator], UpdateUserContrller);

export default router;
