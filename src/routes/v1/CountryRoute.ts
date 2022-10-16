import { CountryController } from "@controllers/country/CountryController";
import { isAuth } from "@middleware/isAuth";
import { Router } from "express";


const router = Router();
const controller = new CountryController()

router.post("/list", [isAuth], controller.list.bind(controller));
router.post("/filter", [isAuth], controller.filter.bind(controller));

export default router;