import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateToken = (id: string, email: string) => {
  dotenv.config();
  const JWT_SECRET = process.env.JWT_SECRET as string;
  return jwt.sign({ email: email, _id: id }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
export default generateToken;
