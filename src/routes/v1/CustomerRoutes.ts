import { Router } from "express";
import { isAuth } from "../../middleware/isAuth";

import { CreateCustomer } from "../../controllers/customers";

import { ValidateCreateCustomer } from "../../middleware/validation/customer";

const router = Router();

router.post("/create", [isAuth, ValidateCreateCustomer], CreateCustomer);

export default router;
