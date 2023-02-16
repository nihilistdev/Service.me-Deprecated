import AuthRoute from "./AuthRoute";
import Customer from "./CustomerRoutes";
import { Router } from "express";
import ServiceCenterRoute from "./ServiceCenterRoute";
import UserRoute from "./UserRoute";
import CityRoute from "./CityRoute";
import CountryRoute from "./CountryRoute";
import StaffRoute from "./StaffRoute";
import TicketRoute from "./TicektRoute";
import TicketResolutionsRoute from "./TicketResolutions";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/user", UserRoute);
router.use("/customer", Customer);
router.use("/service-center", ServiceCenterRoute);
router.use("/city", CityRoute);
router.use("/country", CountryRoute);
router.use("/staff", StaffRoute);
router.use("/ticket", TicketRoute);
router.use("/ticket-resolutions", TicketResolutionsRoute);

export default router;
