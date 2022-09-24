import { Router } from "express";
import { isAuth } from "src/middleware/isAuth";

// Controllers
import {
  RegisterController,
  LoginController,
  changePasswordNonJwtToken,
  forgotPassword,
  logoutContoller,
  verifyAccount,
} from "../../controllers/auth";

// Validators
import {
  loginValidator,
  registerValidator,
  changePasswordNonJwtTokenValidator,
  forgotPasswordValidator,
} from "../../middleware/validation/auth";

const router = Router();

router.post("/login", [loginValidator], LoginController);
router.post("/register", [registerValidator], RegisterController);
router.post(
  "/change-password/:token",
  [changePasswordNonJwtTokenValidator],
  changePasswordNonJwtToken
);
router.post("/forgot-password", [forgotPasswordValidator], forgotPassword);
router.post("/verify-account/:token", [], verifyAccount);
router.post("/logout", [isAuth], logoutContoller);

export default router;
