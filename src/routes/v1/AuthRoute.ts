import { Router } from "express";
import { RegisterController } from "../../controllers/auth/register";
import { LoginController } from "../../controllers/auth/login";
import {
  loginValidator,
  registerValidator,
} from "../../middleware/validation/auth";

const router = Router();

router.post("/login", [loginValidator], LoginController);
router.post("/register", [registerValidator], RegisterController);

export default router;
