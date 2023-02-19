import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: number;
  address: string;
  image: string;
  DOB: Date;
};
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  DOB: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<UserDocument>("User", UserSchema);
