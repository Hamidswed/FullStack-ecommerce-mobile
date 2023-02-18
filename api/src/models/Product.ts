// product model here
import mongoose, { Document } from "mongoose";

export type ProductDocument = Document & {
  title: string;
  price: number;
  productImage: string;
  detailImage: string;
  quantity: number;
  description: string;
  DOB: Date;
};

export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    requierd: true,
  },
  price: {
    type: Number,
    requierd: true,
  },
  productImage: {
    type: String,
    requierd: true,
  },
  detailImage: {
    type: String,
    requierd: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    default: "",
  },
  DOB: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<ProductDocument>("Product", ProductSchema);
