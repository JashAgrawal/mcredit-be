import { Router } from "express";
import {
  addCustomer,
  getCustomerByUserIdAndCustomerId,
  getCustomersByUserId,
} from "../controller/customer";
import { addTransaction } from "../controller/transaction";
const router = Router();

router.post("/add-customer", addCustomer);
router.get("/get-customers", getCustomersByUserId);
router.post("/add-transaction", addTransaction);
router.get("/get-transactions", getCustomerByUserIdAndCustomerId);

export default router;
