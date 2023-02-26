import { Router } from "express";
import {
  createOrderController,
  deleteOrderByIdController,
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
router.delete(
  ":/id",
  passport.authenticate("jwt", { session: false }),
  deleteOrderByIdController
);

export default router;
