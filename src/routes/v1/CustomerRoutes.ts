import { CreateCustomerController } from "../../controllers/customers";
import { DeleteCustomer } from "../../controllers/customers/deleteCustomer";
import { FilterCustomer } from "../../controllers/customers/filterCustomers";
import { Router } from "express";
import { ShowCustomers } from "../../controllers/customers/showCustomers";
import { UpdateCustomerController } from "../../controllers/customers/updateCustomersController";
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
