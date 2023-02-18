// product router here
import { Router } from "express";
import {
  createProductController,
  getProductListController,
  deleteProductByIdController,
} from "./../controllers/products";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductListController);
router.delete("/:id", deleteProductByIdController);

export default router;
