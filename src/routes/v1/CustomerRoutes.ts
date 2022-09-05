import { CreateCustomerController } from "../../controllers/customers";
import { DeleteCustomer } from "../../controllers/customers";
import { FilterCustomer } from "../../controllers/customers";
import { Router } from "express";
import { ShowCustomers } from "../../controllers/customers";
import { UpdateCustomerController } from "../../controllers/customers";
import { ValidateCreateCustomer } from "../../middleware/validation/customer";
import { isApiKeyGiven } from "../../middleware/isApiKeyGiven";
import { isAuth } from "../../middleware/isAuth";

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
router.get("/filter", [isAuth, isApiKeyGiven], FilterCustomer);

export default router;
