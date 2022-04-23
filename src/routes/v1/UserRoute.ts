import { Router } from "express";
import { forgotPassword } from "../../controllers/user/forgotPassword";
import { forgotPasswordValidator } from "../../middleware/validation/users/forgotPasswordValidator";

const router = Router();

router.post("/forgot-password", [forgotPasswordValidator], forgotPassword);

export default router;
