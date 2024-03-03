import { Router } from "express";
const router = Router();

router.post("/add-customer");
router.get("/get-customers");
router.post("/add-transaction");
router.get("/get-transactions");

export default router;
