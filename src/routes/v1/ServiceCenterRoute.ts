import { Router } from "express";
import { UpdateServiceCenter } from "../../middleware/validation/service_center/UpdateServiceCenter";
import { ServiceCenterController } from "../../controllers/service_center";
import { isAuth } from "../../middleware/isAuth";
import { CreateServiceCenter } from "../../middleware/validation/service_center/CreateServiceCenter";

const router = Router();
const controller = new ServiceCenterController();

router.post("/create", [isAuth, CreateServiceCenter], controller.insert);
router.put("/update/:id", [isAuth, UpdateServiceCenter], controller.update);
router.get("/list", [isAuth], controller.list);

export default router;
