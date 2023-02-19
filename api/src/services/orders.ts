import Order, { OrderDocument } from "../models/Order";

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save();
};

const getOrderByUserId = async (userId: string): Promise<OrderDocument[]> => {
  return Order.find({ userId: userId });
};

export default { createOrder, getOrderByUserId };
