import { Router } from "express";
import {
  createOrderController,
  getOrderByUserIdController,
} from "./../controllers/orders";
import passport from "passport";

const router = Router();

router.post(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  createOrderController
);
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  getOrderByUserIdController
);

export default router;
