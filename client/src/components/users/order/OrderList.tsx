import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { ProductType } from "../../../types/productType";
import OrderItem from "./OrderItem";
import "./orderList.css";

const OrderList = () => {
  const order = useSelector((state: RootState) => state.order.order);
  console.log(order, "order");

  return (
    <div className="order-list">
      {order.length !== 0 ? (
        order.map((order, index) => {
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
        })
      ) : (
        <div>
          <h1>No Order!</h1>
          <p className="no-order">
            Please go to
            <Link to="/products">
              <Button variant="text" type="button" sx={{ marginTop: "20px" }}>
                product list
              </Button>
            </Link>
            to make your first order!
          </p>
        </div>
      )}
    </div>
  );
};
export default OrderList;
