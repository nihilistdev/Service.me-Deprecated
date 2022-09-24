import { Router } from "express";
import { UpdateServiceCenter } from "src/middleware/validation/service_center/UpdateServiceCenter";
import { ServiceCenterController } from "src/controllers/service_center";
import { isAuth } from "src/middleware/isAuth";
import { CreateServiceCenter } from "src/middleware/validation/service_center/CreateServiceCenter";

const router = Router();
const controller = new ServiceCenterController();

router.post("/create", [isAuth, CreateServiceCenter], controller.insert);
router.put("/update/:id", [isAuth, UpdateServiceCenter], controller.update);
router.get("/list", [isAuth], controller.list);

export default router;
