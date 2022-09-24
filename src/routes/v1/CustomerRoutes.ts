import { CreateCustomerController } from "src/controllers/customers";
import { DeleteCustomer } from "src/controllers/customers";
import { FilterCustomer } from "src/controllers/customers";
import { Router } from "express";
import { ShowCustomers } from "src/controllers/customers";
import { UpdateCustomerController } from "src/controllers/customers";
import { ValidateCreateCustomer } from "src/middleware/validation/customer";
import { isApiKeyGiven } from "src/middleware/isApiKeyGiven";
import { isAuth } from "src/middleware/isAuth";

const router = Router();

router.post(
  "/create",
  [isAuth, isApiKeyGiven, ValidateCreateCustomer],
  CreateCustomerController
);
router.post(
  "/update/:id",
  [isAuth, isApiKeyGiven, ValidateCreateCustomer],
  UpdateCustomerController
);
router.delete("/delete/:id", [isAuth, isApiKeyGiven], DeleteCustomer);
router.get("/all", [isAuth, isApiKeyGiven], ShowCustomers);
router.post("/filter", [isAuth, isApiKeyGiven], FilterCustomer);

export default router;
