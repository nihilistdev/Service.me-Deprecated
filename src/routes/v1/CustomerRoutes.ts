import { Router } from "express";
import { ValidateCreateCustomer } from "@middleware/validation/customer";
import { isApiKeyGiven } from "@middleware/isApiKeyGiven";
import { isAuth } from "@middleware/isAuth";
import { CustomerController } from "@controllers/customers/CustomerController";

const router = Router();
const customers = new CustomerController();

router.post(
  "/create",
  [isAuth, isApiKeyGiven, ValidateCreateCustomer],
  customers.createCustomers.bind(customers)
);
router.put(
  "/update/:id",
  [isAuth, isApiKeyGiven, ValidateCreateCustomer],
  customers.updateCustomers.bind(customers)
);
router.delete("/delete/:id", [isAuth, isApiKeyGiven], customers.deleteCustomer.bind(customers));
router.post("/all", [isAuth, isApiKeyGiven], customers.listCustomers.bind(customers));
router.post("/filter", [isAuth, isApiKeyGiven], customers.filterCustomer.bind(customers));

export default router;
