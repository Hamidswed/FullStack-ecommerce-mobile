import { Router } from "express";
import {
  createOrderController,
  getOrderByUserIdController,
} from "./../controllers/orders";

const router = Router();

router.post("/:userId", createOrderController);
router.get("/:userId", getOrderByUserIdController);

export default router;
