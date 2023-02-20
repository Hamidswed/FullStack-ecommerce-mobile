import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  logInWithPassword,
} from "./../controllers/users";

const router = Router();
router.post("/", createUserController);
router.get("/:id", getUserByIdController);
router.post("/login", logInWithPassword);

export default router;
