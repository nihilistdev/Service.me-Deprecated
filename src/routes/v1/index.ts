import { Router } from "express";
import AuthRoute from "./AuthRoute";
import UserRoute from "./UserRoute";
import Csrf from "./CsrfRoutes";
import Customer from "./CustomerRoutes";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/user", UserRoute);
router.use("/csrf", Csrf);
router.use("/customer", Customer);

export default router;
