import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  logInWithPassword,
  updateUserController,
} from "./../controllers/users";
import passport from "passport";

const router = Router();
router.post("/", createUserController);
router.get("/:id", getUserByIdController);
router.post("/login", logInWithPassword);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUserController
);

export default router;
