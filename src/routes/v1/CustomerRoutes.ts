import { Router } from "express";
import { isAuth } from "../../middleware/isAuth";

import { CreateCustomerController } from "../../controllers/customers";

import { ValidateCreateCustomer } from "../../middleware/validation/customer";

const router = Router();

router.post(
  "/create",
  [isAuth, ValidateCreateCustomer],
  CreateCustomerController
);

export default router;
