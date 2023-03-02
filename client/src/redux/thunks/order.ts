// product thunk here
import { AppDispatch } from "../store";
import { orderActions } from "../slices/order";
import axios from "axios";
import { url } from "../../App";

export function fetchOrderData(id: string) {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    axios
      .get(`${url}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(orderActions.getOrderByUserId(res.data));
      });
  };
}
