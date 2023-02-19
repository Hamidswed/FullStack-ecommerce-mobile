import { Request, Response } from "express";
import Order from "../models/Order";
import OrderServices from "../services/orders";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      productOrder: req.body.productOrder,
    });
    const order = await OrderServices.createOrder(newOrder);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

