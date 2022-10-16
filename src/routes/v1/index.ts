import AuthRoute from "./AuthRoute";
import Customer from "./CustomerRoutes";
import { Router } from "express";
import ServiceCenterRoute from "./ServiceCenterRoute";
import UserRoute from "./UserRoute";
import CityRoute from "./CityRoute"
import CountryRoute from "./CountryRoute"
import { __prod__ } from "@utils/constants/constants";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/user", UserRoute);
router.use("/customer", Customer);
router.use("/service-center", ServiceCenterRoute);
router.use("/city", CityRoute);
router.use("/country", CountryRoute);

export default router;
