import mongoose, { Document } from "mongoose";
import { ProductSchema } from "./Product";
import User from "./User";

export type OrderDocument = Document & {
  date: Date;
  userId: string;
  productOrder: [];
};
const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  productOrder: [{ type: ProductSchema }],
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
