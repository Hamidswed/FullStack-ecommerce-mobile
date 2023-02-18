// server here
import Express from "express";
import productRouter from "./routes/products";

const app = Express();

app.use(Express.json());
app.use("/products", productRouter);

export default app;
