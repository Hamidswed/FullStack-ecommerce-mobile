import { Router } from "express";
import { createOrderController } from "./../controllers/orders";

const router = Router();

router.post("/:userId", createOrderController);

export default router;
