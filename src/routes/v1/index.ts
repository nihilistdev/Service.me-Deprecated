import AuthRoute from "./AuthRoute";
import Customer from "./CustomerRoutes";
import { Router } from "express";
import UserRoute from "./UserRoute";
import ServiceCenterRoute from "./ServiceCenterRoute";
import { __prod__ } from "../../utils";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/user", UserRoute);
router.use("/customer", Customer);
router.use("/service-center", ServiceCenterRoute);

export default router;
