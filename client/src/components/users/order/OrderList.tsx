// import { Button } from "@mui/material";
// import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProductType } from "../../../types/productType";
import OrderItem from "./OrderItem";
import "./orderList.css";

const OrderList = () => {
  const order = useSelector((state: RootState) => state.order.order);
  console.log(order, "order");

  return (
    <div className="order-list">
      {order.map((order, index) => {
        return (
          <div key={order._id} className="order-container">
            <p>
              <strong>
                Order {index + 1} -{" "}
                <span>
                  {Number(order.productOrder.length) === 1
                    ? `${order.productOrder.length} item`
                    : `${order.productOrder.length} items`}{" "}
                </span>
              </strong>
            </p>
            <div className="order-item">
              {order.productOrder.map((product: ProductType) => {
                return <OrderItem key={product._id} product={product} />;
              })}
            </div>
            <p>Total price: ${order.totalPrice}</p>
          </div>
        );
      })}
    </div>
  );
};
export default OrderList;
