// server here
import Express from "express";
import productRouter from "./routes/products";
import userRouter from "./routes/users";
import orderRouter from "./routes/orders";
import cors from "cors";
import passport from "passport";
import { jwtStrategy } from "./config/passport";

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

export default app;
