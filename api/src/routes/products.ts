// product router here
import { Router } from "express";
import {
  createProductController,
  getProductListController,
} from "./../controllers/products";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductListController);

export default router;
