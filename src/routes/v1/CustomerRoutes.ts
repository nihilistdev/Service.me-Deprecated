import { Router } from "express";
import { isAuth } from "../../middleware/isAuth";

import { CreateCustomerController } from "../../controllers/customers";
import { UpdateCustomerController } from "../../controllers/customers/updateCustomersController";

import { ValidateCreateCustomer } from "../../middleware/validation/customer";

const router = Router();

router.post(
  "/create",
  [isAuth, ValidateCreateCustomer],
  CreateCustomerController
);
router.post(
  "/update/:id",
  [isAuth, ValidateCreateCustomer],
  UpdateCustomerController
);

export default router;
