// product thunk here
import { AppDispatch } from "../store";
import { orderActions } from "../slices/order";
import axios from "axios";

export function fetchOrderData(id: string) {
  const url = `http://localhost:8000/orders/${id}`;
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(orderActions.getOrderByUserId(res.data));
      });
   
  };
}