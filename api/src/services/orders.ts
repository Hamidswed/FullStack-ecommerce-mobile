import { OrderDocument } from "../models/Order";

const createOrder = async(order:OrderDocument):Promise<OrderDocument>=>{
  return order.save()
}

export default {createOrder}