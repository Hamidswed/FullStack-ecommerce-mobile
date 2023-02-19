import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
} from "./../controllers/users";

const router = Router();
router.post("/", createUserController);
router.get("/:id", getUserByIdController);

export default router;
