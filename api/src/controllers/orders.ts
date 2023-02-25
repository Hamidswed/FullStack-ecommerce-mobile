import { Request, Response } from "express";
import Order from "../models/Order";
import OrderServices from "../services/orders";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const newOrder = new Order({
      userId: req.params.userId,
      productOrder: req.body.productOrder,
      totalPrice: req.body.totalPrice,
    });
    const order = await OrderServices.createOrder(newOrder);
    res.json(order);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const foundOrder = await OrderServices.getOrderByUserId(req.params.userId);
    res.json(foundOrder);
  } catch (error) {
    console.log(error);
  }
};
