import mongoose, { Document } from "mongoose";
import { ProductSchema } from "./Product";
import User from "./User";

export type OrderDocument = Document & {
  date: Date;
  userId: string;
  productOrder: [];
  shippingAddress: string;
  isDelivered: boolean;
  totalPrice: number;
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
  shippingAddress: {
    type: String,
    default: "Sweden",
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);
