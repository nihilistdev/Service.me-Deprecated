import { Router } from "express";
import AuthRoute from "./AuthRoute";
import UserRoute from "./UserRoute";
import Csrf from "./CsrfRoutes";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/user", UserRoute);
router.use("/csrf", Csrf);

export default router;
