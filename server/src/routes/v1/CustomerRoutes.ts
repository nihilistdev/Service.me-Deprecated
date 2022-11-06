import { Router } from "express";
import { ValidateCreateCustomer } from "@middleware/validation/customer";
import { isAuth } from "@middleware/isAuth";
import { CustomerController } from "@controllers/customers/CustomerController";

const router = Router();
const customers = new CustomerController();

router.post(
  "/create",
  [isAuth, ValidateCreateCustomer],
  customers.createCustomers.bind(customers)
);
router.put(
  "/update/:id",
  [isAuth, ValidateCreateCustomer],
  customers.updateCustomers.bind(customers)
);
router.delete(
  "/delete/:id",
  [isAuth],
  customers.deleteCustomer.bind(customers)
);
router.post("/all", [isAuth], customers.listCustomers.bind(customers));
router.post("/filter", [isAuth], customers.filterCustomer.bind(customers));
router.get("/get/:id", [isAuth], customers.get.bind(customers));
router.get("/created-by", [isAuth], customers.getCreatedStaff.bind(customers));

export default router;
