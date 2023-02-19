// product router here
import { Router } from "express";
import {
  createProductController,
  getProductListController,
  deleteProductByIdController,
  updateProductController,
} from "./../controllers/products";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductListController);
router.delete("/:id", deleteProductByIdController);
router.put("/:id", updateProductController);

export default router;
