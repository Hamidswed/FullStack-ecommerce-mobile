// product router here
import { Router } from "express";
import {
  createProductController,
  getProductListController,
  deleteProductByIdController,
  updateProductController,
  getProductByIdController,
} from "./../controllers/products";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductListController);
router.get("/:id", getProductByIdController);
router.delete("/:id", deleteProductByIdController);
router.put("/:id", updateProductController);

export default router;
