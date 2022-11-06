import { Router } from "express";
import { ValidateCreateCustomer } from "@middleware/validation/customer";
import { isAuth } from "@middleware/isAuth";
import { CustomerController } from "@controllers/customers/CustomerController";
import { CustomersInServiceCenterController } from "@controllers/CustomersInServiceCenter/CustomersInServiceCenterController";
import { isStaff } from "@middleware/isStaff";
import { isAdminOrOwner } from "@middleware/isAdminOrOwner";

const router = Router();
const customers = new CustomerController();
const customersInServiceCenter = new CustomersInServiceCenterController();

router.post(
  "/create",
  [isAuth, ValidateCreateCustomer, isStaff],
  customers.createCustomers.bind(customers)
);
router.put(
  "/update/:id",
  [isAuth, ValidateCreateCustomer, isStaff],
  customers.updateCustomers.bind(customers)
);
router.delete(
  "/delete/:id",
  [isAuth, isAdminOrOwner],
  customers.deleteCustomer.bind(customers)
);
router.post(
  "/all",
  [isAuth, isStaff],
  customersInServiceCenter.listCustomers.bind(customersInServiceCenter)
);

// TODO: configure these 3 routes to use customers in service center entity because they are part of sc
router.post("/filter", [isAuth], customers.filterCustomer.bind(customers));
router.get("/get/:id", [isAuth], customers.get.bind(customers));
router.get("/created-by", [isAuth], customers.getCreatedStaff.bind(customers));

export default router;
